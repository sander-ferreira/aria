"use client";

import { motion } from "motion/react";

import { useProgress } from "@/lib/progress";

/**
 * En-tête de progression des écrans de module (Possibilités, Limites…).
 * Barre de N segments dont `step` pleins, libellé "Étape N" et pastille
 * affichant l'XP réellement gagnée au cours du parcours (mise à jour en direct).
 */
export default function ProgressHeader({
  step,
  totalSteps = 5,
}: {
  step: number;
  totalSteps?: number;
}) {
  const { xp } = useProgress();

  return (
    <header className="flex items-center gap-4 px-6 pt-6 pb-2">
      <span className="text-[14px] leading-5 font-black text-aria-violet">Étape {step}</span>
      <div className="flex h-1 flex-1 items-stretch gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-full bg-aria-violet"
            style={{ opacity: i < step ? 1 : 0.2 }}
          />
        ))}
      </div>
      <motion.span
        key={xp.total}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.18, 1] }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-aria-creme px-4 py-2 text-[14px] leading-5 font-black text-aria-violet shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]"
      >
        {xp.total} XP
      </motion.span>
    </header>
  );
}
