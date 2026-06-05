"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { computeXp, PROGRESS_CHANGE_EVENT, readProgress } from "@/lib/progress";

type Pop = { id: number; amount: number };

/** Petite étoile pétillante (décor du badge d'XP). */
function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2c.5 4.5 2.5 6.5 7 7-4.5.5-6.5 2.5-7 7-.5-4.5-2.5-6.5-7-7 4.5-.5 6.5-2.5 7-7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function totalXp(): number {
  return computeXp(readProgress()).total;
}

/**
 * Overlay global : à chaque gain d'XP au cours du parcours, fait surgir un petit
 * badge animé « +N XP » juste sous le compteur du header. Monté une seule fois
 * dans le layout → survit aux navigations, donc un gain enregistré juste avant
 * un changement de page s'affiche sur l'écran d'arrivée.
 *
 * On écoute directement l'événement du store (et non `useProgress`) pour éviter
 * le faux gain au chargement (snapshot SSR à 0 → vrai total au montage).
 */
export default function XpGainOverlay() {
  const [pops, setPops] = useState<Pop[]>([]);
  const prevTotal = useRef<number | null>(null);
  const nextId = useRef(0);

  useEffect(() => {
    // Base = total réel au montage → aucun pop au chargement / refresh
    prevTotal.current = totalXp();

    function onChange() {
      const total = totalXp();
      const delta = total - (prevTotal.current ?? total);
      prevTotal.current = total;
      if (delta <= 0) return; // reset / aucun gain

      const id = nextId.current++;
      setPops((list) => [...list, { id, amount: delta }]);
      window.setTimeout(
        () => setPops((list) => list.filter((p) => p.id !== id)),
        1300,
      );
    }

    window.addEventListener(PROGRESS_CHANGE_EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(PROGRESS_CHANGE_EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return (
    // Ancré juste sous la pastille XP du header (px-6 / pt-6 → ~64px de haut),
    // aligné sur la colonne centrée (≤480px) pour rester sous le compteur en desktop
    <div className="pointer-events-none fixed top-16 left-1/2 z-60 flex w-full max-w-[480px] -translate-x-1/2 flex-col items-end gap-1.5 px-6">
      <AnimatePresence>
        {pops.map((pop) => (
          <motion.div
            key={pop.id}
            // Sort de sous le compteur (y négatif → descend en place), puis fond vers le bas
            initial={{ opacity: 0, scale: 0.4, y: -10 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              transition: { type: "spring", stiffness: 520, damping: 16 },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 8,
              transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
            }}
            className="flex items-center gap-1 rounded-full bg-aria-lime px-3 py-1.5 text-[14px] leading-none font-black whitespace-nowrap text-aria-violet shadow-[0px_4px_14px_0px_rgba(108,49,205,0.32)]"
          >
            <motion.span
              initial={{ rotate: -25, scale: 0.5 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.05 }}
            >
              <Sparkle className="h-3.5 w-3.5 text-aria-violet" />
            </motion.span>
            +{pop.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
