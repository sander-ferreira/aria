"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import type { ExerciceData } from "@/app/limites/exemple/exercice-data";
import ProgressHeader from "@/components/progress-header";
import { recordLimites, XP } from "@/lib/progress";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Pastille du compteur d'erreurs : numéro pointillé, ou check une fois trouvée */
function Slot({ index, found }: { index: number; found: boolean }) {
  if (found) {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aria-lavande">
        <CheckIcon className="h-3.5 w-3.5 text-aria-creme" />
      </span>
    );
  }
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-dashed border-aria-lavande text-[14px] font-bold text-aria-lavande">
      {index + 1}
    </span>
  );
}

export default function LimiteExercice({ data }: { data: ExerciceData }) {
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [lastTap, setLastTap] = useState<number | null>(null);
  // "Du premier coup" : une phrase correcte tapée par erreur gèle le bonus d'XP
  const [missed, setMissed] = useState(false);
  // Erreurs trouvées tant qu'aucun mauvais clic n'a été fait (→ 50 XP chacune)
  const [cleanFinds, setCleanFinds] = useState(0);

  const foundCount = [...tapped].filter(
    (i) => data.segments[i]?.isError,
  ).length;
  const complete = foundCount >= data.errorCount;

  // Enregistre l'XP "limites" une fois les erreurs trouvées (badge Responsable)
  useEffect(() => {
    if (complete) recordLimites(cleanFinds * XP.parLimite);
  }, [complete, cleanFinds]);

  const lastSegment = lastTap !== null ? data.segments[lastTap] : null;
  const feedback =
    lastSegment == null
      ? null
      : lastSegment.isError
        ? {
            variant: "right" as const,
            title: "Bonne réponse !",
            text: lastSegment.explanation ?? "",
          }
        : {
            variant: "wrong" as const,
            title: data.wrongFeedback.title,
            text: data.wrongFeedback.text,
          };

  // Mascottes selon l'expression (réflexion par défaut, sourire en bonne réponse)
  const MASCOT_NEUTRE = "/images/aria-mascot-exercice.png";
  const MASCOT_OK = "/images/aria-mascot-exercice-ok.png";

  // La bulle de la mascotte (en haut) porte le feedback : neutre (crème) au départ,
  // orange en cas d'erreur, lime quand l'erreur est trouvée. (maquette 19-2427 / 79-1209)
  const bubble =
    feedback == null
      ? {
          key: "neutral",
          bg: "bg-aria-creme",
          title: data.bubbleTitle,
          titleColor: "text-aria-violet",
          text: data.bubbleText,
          textColor: "text-aria-violet",
          mascot: MASCOT_NEUTRE,
        }
      : feedback.variant === "right"
        ? {
            key: `right-${lastTap}`,
            bg: "bg-aria-lime",
            title: feedback.title,
            titleColor: "text-aria-violet",
            text: feedback.text,
            textColor: "text-aria-violet",
            mascot: MASCOT_OK,
          }
        : {
            key: `wrong-${lastTap}`,
            bg: "bg-aria-orange",
            title: feedback.title,
            titleColor: "text-aria-creme",
            text: feedback.text,
            textColor: "text-aria-creme",
            mascot: MASCOT_NEUTRE,
          };

  function handleTap(i: number) {
    setLastTap(i);
    if (tapped.has(i)) return;
    const seg = data.segments[i];
    if (seg?.isError) {
      // Erreur trouvée : compte pour l'XP si aucun mauvais clic n'a précédé
      if (!missed) setCleanFinds((c) => c + 1);
    } else {
      // Phrase correcte tapée par erreur → plus de bonus "premier coup"
      setMissed(true);
    }
    setTapped((prev) => {
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col bg-aria-creme pb-8">
      <ProgressHeader step={3} />

      {/* Mascotte + bulle (porte le feedback : crème → orange si erreur, lime si trouvé) */}
      <section className="flex items-end gap-5 px-6 pt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={bubble.mascot}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="shrink-0"
          >
            <Image
              src={bubble.mascot}
              alt="Aria"
              width={87}
              height={104}
              priority
              className="h-[104px] w-[87px]"
            />
          </motion.div>
        </AnimatePresence>
        {/* Bulle — drop-shadow (filtre) → ombre unique bulle + pointe */}
        <div className="relative flex-1 drop-shadow-[0px_2px_12px_rgba(0,0,0,0.12)]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={bubble.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative"
            >
              <div
                className={`flex flex-col gap-2 rounded-2xl p-5 ${bubble.bg}`}
              >
                <h2
                  className={`text-[16px] leading-7 font-black ${bubble.titleColor}`}
                >
                  {bubble.title}
                </h2>
                <p
                  className={`text-[14px] leading-[18px] font-medium ${bubble.textColor}`}
                >
                  {bubble.text}
                </p>
              </div>
              {/* Pointe : à l'intérieur du bloc animé → apparaît/disparaît avec la bulle */}
              <div
                aria-hidden
                style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
                className={`absolute top-1/2 right-full -mr-[2px] h-7 w-[18px] -translate-y-1/2 ${bubble.bg}`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Exercice */}
      <section className="flex flex-col gap-7 px-6 pt-7">
        <p className="text-[16px] leading-5 font-black text-aria-violet">
          {data.instruction}
        </p>

        {/* Compteur */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: data.errorCount }).map((_, i) => (
              <Slot key={i} index={i} found={i < foundCount} />
            ))}
          </div>
          <span className="text-[14px] leading-[18px] font-medium text-aria-lavande">
            {foundCount}{" "}
            {foundCount > 1 ? "erreurs trouvées" : "erreur trouvée"} sur{" "}
            {data.errorCount}
          </span>
        </div>

        {/* Carte texte */}
        <div className="rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
          <p className="text-[14px] leading-[26px] font-medium text-aria-violet">
            {data.segments.map((seg, i) =>
              seg.tappable ? (
                <span
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleTap(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleTap(i);
                    }
                  }}
                  className={`cursor-pointer rounded font-black underline decoration-2 underline-offset-2 transition-colors ${
                    tapped.has(i) ? "bg-[rgba(255,105,24,0.12)]" : ""
                  }`}
                >
                  {seg.text}
                </span>
              ) : (
                <span key={i}>{seg.text}</span>
              ),
            )}
          </p>
        </div>

        {/* CTA (une fois les erreurs trouvées) */}
        <AnimatePresence>
          {complete && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={data.continueHref as Route}
                className="flex w-full items-center justify-center rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
              >
                {data.continueLabel}
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
