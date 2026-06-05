"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

import { useProgress } from "@/lib/progress";

const BADGES = [
  { src: "/images/badge-curieux.png", label: "Curieux", w: 57 },
  { src: "/images/badge-premiers-pas-mini.png", label: "Premier Pas", w: 53 },
  { src: "/images/badge-responsable-mini.png", label: "Responsable", w: 52 },
  { src: "/images/badge-engage.png", label: "Engagé", w: 58 },
];

type Palier = { niveau: string; score: string; message: string };

/** Palier de résultat selon le nombre de bonnes réponses au quiz. */
function palierFor(correct: number): Palier {
  if (correct >= 5) {
    return {
      niveau: "Niveau Expert",
      score: "Score Parfait",
      message:
        "Vous maîtrisez déjà les bases. La formation va vous donner la pratique pour aller encore plus loin.",
    };
  }
  if (correct >= 3) {
    return {
      niveau: "Niveau Confirmé",
      score: "Score Excellent",
      message:
        "Vous êtes sur la bonne voie. Encore un peu et vous formez vos collègues.",
    };
  }
  return {
    niveau: "Niveau Explorateur",
    score: "Score Prometteur",
    message: "C'est exactement pour ça que la formation existe.",
  };
}

/**
 * Page de résultats du quiz final (récap niveau, score, XP, badges).
 * Le palier (Expert / Confirmé / Explorateur) et l'XP totale dépendent du
 * score réel obtenu au quiz. Mobile-first.
 */
export default function QuizResultatPage() {
  const { state, xp } = useProgress();

  const total = state.quizTotal || 5;
  const correct = state.quizCorrect;
  const palier = palierFor(correct);

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col bg-aria-creme px-6 pt-16 pb-8">
      <motion.div
        className="flex flex-1 flex-col gap-12"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Niveau + score */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 text-center">
            <span className="text-[16px] leading-7 font-black text-aria-lavande">
              {palier.niveau}
            </span>
            <h1 className="text-[36px] leading-10 font-black text-aria-violet">
              {palier.score}
            </h1>
          </div>
          <p className="text-center text-[14px] leading-5 font-medium text-aria-violet">
            {palier.message}
          </p>
        </div>

        {/* Stats + badges */}
        <div className="flex flex-col gap-10">
          <div className="flex items-stretch gap-3">
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-aria-violet px-3 py-5 text-center">
              <span className="text-[24px] leading-10 font-black text-aria-creme">
                {correct}/{total}
              </span>
              <span className="text-[16px] leading-7 font-black text-aria-creme">
                Bonnes réponses
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center rounded-2xl bg-aria-lime px-3 py-5 text-center">
              <span className="text-[24px] leading-10 font-black text-aria-violet">
                {xp.total} XP
              </span>
              <span className="text-[16px] leading-7 font-black text-aria-violet">
                Total
              </span>
            </div>
          </div>

          <div className="flex items-start justify-between">
            {BADGES.map((badge) => (
              <div
                key={badge.label}
                className="flex w-16 flex-col items-center gap-3 text-center"
              >
                <Image
                  src={badge.src}
                  alt={badge.label}
                  width={badge.w}
                  height={53}
                  className="h-[53px] w-auto"
                />
                <span className="text-[14px] leading-[18px] font-medium text-aria-violet">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mascotte + bulle + CTA */}
        <div className="mt-auto flex flex-col gap-12">
          <div className="flex items-start gap-2">
            <Image
              src="/images/aria-mascot-badge.png"
              alt="Aria"
              width={107}
              height={128}
              priority
              className="h-32 w-[107px] shrink-0"
            />
            <div className="relative flex-1">
              <div className="absolute top-[38px] -left-[14px] h-0 w-0 border-y-[14px] border-r-[16px] border-y-transparent border-r-aria-creme" />
              <div className="rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
                <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
                  Vous faites partie de ceux qui ont choisi de comprendre plutôt
                  que d&apos;ignorer. La formation est faite pour des gens comme
                  vous.
                </p>
              </div>
            </div>
          </div>

          <Link
            href={"/fin" as Route}
            className="w-full rounded-lg bg-aria-violet py-5 text-center text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
          >
            Continuer
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
