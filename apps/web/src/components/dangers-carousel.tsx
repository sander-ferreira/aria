"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import ProgressHeader from "@/components/progress-header";

type Risque = { title: string; text: string; bg: string; fg: string };

const RISQUES: Risque[] = [
  {
    title: "Violation RGPD",
    text: "Les données d'un mineur ont une protection renforcée. Leur transmission à un tiers non autorisé est illégale.",
    bg: "bg-aria-orange",
    fg: "text-aria-creme",
  },
  {
    title: "Risque pour vous",
    text: "L'enseignant est personnellement responsable des données qu'il communique. Sanction disciplinaire possible.",
    bg: "bg-aria-lime",
    fg: "text-aria-violet",
  },
  {
    title: "Risque pour l'école",
    text: "L'établissement peut être mis en cause. Atteinte à l'image et procédure CNIL à la clé.",
    bg: "bg-aria-violet",
    fg: "text-aria-creme",
  },
];

const CONTINUE_HREF = "/dangers/recommandations";

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 13 13" fill="none" className={className} aria-hidden="true" width={13} height={13}>
      <path
        d="M6.15719 0.248322C6.48828 -0.0827731 7.02497 -0.0827731 7.35606 0.248322L12.7515 5.6438C13.0826 5.97489 13.0826 6.51157 12.7515 6.84267L7.35606 12.2381C7.02496 12.5692 6.48828 12.5692 6.15719 12.2381C5.82609 11.907 5.82609 11.3704 6.15719 11.0393L10.1054 7.09105L0.84782 7.09105C0.379582 7.09105 0 6.71147 0 6.24323C0 5.77499 0.379582 5.39541 0.84782 5.39541L10.1054 5.39541L6.15719 1.44719C5.82609 1.1161 5.82609 0.579416 6.15719 0.248322Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Risque précédent" : "Risque suivant"}
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
        disabled ? "bg-aria-violet/20" : "bg-aria-violet"
      }`}
    >
      <ArrowIcon className={`text-aria-creme ${direction === "left" ? "rotate-180" : ""}`} />
    </button>
  );
}

export default function DangersCarousel() {
  const [index, setIndex] = useState(0);

  const last = RISQUES.length - 1;
  // Le CTA ne s'active que sur la dernière slide ("Risque pour l'école")
  const onLastSlide = index === last;

  function go(next: number) {
    setIndex(Math.max(0, Math.min(last, next)));
  }

  const risque = RISQUES[index];

  return (
    <main className="font-satoshi flex h-dvh w-full flex-col overflow-hidden bg-aria-creme">
      <ProgressHeader step={3} xp="400 XP" />

      {/* Mascotte + bulle */}
      <section className="flex items-end gap-2 px-6 pt-6">
        <Image
          src="/images/aria-mascot-exercice.png"
          alt="Aria"
          width={87}
          height={104}
          priority
          className="h-[104px] w-[87px] shrink-0"
        />
        <div className="relative flex-1">
          <div className="absolute top-1/2 -left-[14px] h-0 w-0 -translate-y-1/2 border-y-[14px] border-r-[16px] border-y-transparent border-r-aria-creme" />
          <div className="flex flex-col gap-5 rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
            <h1 className="text-[16px] leading-7 font-black text-aria-violet">
              {"Pourquoi c'est interdit ?"}
            </h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              Ce n&apos;est pas une question de paranoïa. C&apos;est une question de responsabilité
              professionnelle.
            </p>
          </div>
        </div>
      </section>

      {/* Contenu : intro + carrousel */}
      <section className="flex flex-col gap-10 px-6 pt-10">
        <p className="text-[16px] leading-5 font-black text-aria-violet">
          Les données nominatives d&apos;un mineur dans une IA grand public, c&apos;est trois
          risques simultanés.
        </p>

        <div className="flex items-center gap-[18px]">
          <ArrowButton direction="left" disabled={index === 0} onClick={() => go(index - 1)} />

          <div className="relative min-h-[180px] flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className={`flex flex-col gap-5 rounded-2xl px-6 py-7 ${risque.bg}`}
              >
                <span className={`text-center text-[16px] leading-5 font-black ${risque.fg}`}>
                  {risque.title}
                </span>
                <p className={`text-center text-[14px] leading-[18px] font-medium ${risque.fg}`}>
                  {risque.text}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <ArrowButton direction="right" disabled={index === last} onClick={() => go(index + 1)} />
        </div>
      </section>

      {/* CTA : actif une fois les 3 risques vus */}
      <div className="mt-auto px-6 pb-8">
        {onLastSlide ? (
          <Link
            href={CONTINUE_HREF as Route}
            className="flex w-full items-center justify-center rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
          >
            {"Quel outils utiliser ?"}
          </Link>
        ) : (
          <div
            aria-disabled="true"
            className="flex w-full items-center justify-center rounded-lg bg-aria-violet/20 px-5 py-5 text-[16px] leading-5 font-black text-aria-creme"
          >
            {"Quel outils utiliser ?"}
          </div>
        )}
      </div>
    </main>
  );
}
