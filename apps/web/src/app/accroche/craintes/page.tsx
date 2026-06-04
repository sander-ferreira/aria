"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Message = { from: "aria" | "prof"; title?: string; text: string };

const MESSAGES: Message[] = [
  {
    from: "aria",
    title: "C'est exactement pour ça qu'on est là !",
    text: "Avez-vous des questions, des craintes ou des aprioris avant de commencer ?",
  },
  { from: "prof", text: "L'IA va remplacer les profs ?" },
  {
    from: "aria",
    text: "Non. Elle ne lit pas les émotions, ne juge pas l'effort, ne crée pas la relation de confiance. Ça, c'est vous.",
  },
  { from: "prof", text: "Mes élèves vont tricher encore plus ?" },
  {
    from: "aria",
    text: "Ils trichent déjà. Ce kit vous donne les outils pour être en avance sur eux.",
  },
  { from: "prof", text: "C'est trop compliqué pour moi, je me sens dépassé…" },
  {
    from: "aria",
    text: "Pas de panique ! Dans 8 minutes vous aurez fait votre première action concrète.",
  },
];

/** Délai (ms) avant l'apparition de chaque message (effet conversation) */
const STEP_DELAY = 1000;

/**
 * Accroche 4 — chat des craintes (ARIA ↔ Prof) sur fond violet.
 * Les bulles arrivent une à une comme une vraie conversation, le chat scrolle,
 * et le CTA apparaît une fois l'échange terminé. Mobile-first.
 */
export default function AccrocheCraintesPage() {
  const [visible, setVisible] = useState(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const done = visible >= MESSAGES.length;

  // Révèle les messages un par un
  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setVisible((v) => v + 1), STEP_DELAY);
    return () => clearTimeout(t);
  }, [visible, done]);

  // Scroll en bas à chaque nouveau message
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [visible]);

  return (
    <main className="font-satoshi flex h-dvh w-full flex-col bg-aria-violet">
      <div ref={scrollRef} className="flex flex-1 flex-col gap-7 overflow-y-auto px-6 pt-14 pb-4">
        {MESSAGES.slice(0, visible).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {m.from === "aria" ? (
              <div className="flex items-end gap-2">
                <Image
                  src="/images/aria-mascot.svg"
                  alt="Aria"
                  width={79}
                  height={94}
                  className="h-[94px] w-[79px] shrink-0"
                />
                <div className="relative flex-1">
                  <div className="absolute top-[18px] -left-[14px] h-0 w-0 border-y-[14px] border-r-[16px] border-y-transparent border-r-aria-creme" />
                  <div className="flex flex-col gap-5 rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
                    {m.title && (
                      <h2 className="text-[16px] leading-5 font-black text-aria-violet">{m.title}</h2>
                    )}
                    <p className="text-[14px] leading-[18px] font-medium text-aria-violet">{m.text}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-end gap-3">
                <div className="relative flex-1">
                  <div className="absolute top-[18px] -right-[14px] h-0 w-0 border-y-[14px] border-l-[16px] border-y-transparent border-l-aria-creme" />
                  <div className="rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
                    <p className="text-[14px] leading-[18px] font-black text-aria-violet">{m.text}</p>
                  </div>
                </div>
                <Image
                  src="/images/badge-curieux.png"
                  alt=""
                  width={60}
                  height={56}
                  className="h-[56px] w-[60px] shrink-0"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="px-6 pt-6 pb-12">
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={"/accroche/badge" as Route}
                className="flex w-full items-center justify-center rounded-lg bg-aria-lime px-5 py-5 text-[16px] leading-5 font-black text-aria-violet transition-transform active:scale-[0.98]"
              >
                {"Commencer mon aventure !"}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
