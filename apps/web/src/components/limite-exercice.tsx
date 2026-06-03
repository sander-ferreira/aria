"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import type { ExerciceData } from "@/app/limites/exemple/exercice-data";
import ProgressHeader from "@/components/progress-header";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
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

  const foundCount = [...tapped].filter((i) => data.segments[i]?.isError).length;
  const complete = foundCount >= data.errorCount;

  const lastSegment = lastTap !== null ? data.segments[lastTap] : null;
  const feedback =
    lastSegment == null
      ? null
      : lastSegment.isError
        ? { variant: "right" as const, title: "Bien vu", text: lastSegment.explanation ?? "" }
        : { variant: "wrong" as const, title: data.wrongFeedback.title, text: data.wrongFeedback.text };

  function handleTap(i: number) {
    setLastTap(i);
    setTapped((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col bg-aria-creme pb-8">
      <ProgressHeader step={3} xp="400 XP" />

      {/* Mascotte + bulle */}
      <section className="flex items-end gap-2 px-6 pt-6">
        <Image
          src="/images/aria-mascot.svg"
          alt="Aria"
          width={79}
          height={94}
          priority
          className="h-[94px] w-[79px] shrink-0"
        />
        <div className="relative flex-1">
          <div className="absolute top-1/2 -left-[14px] h-0 w-0 -translate-y-1/2 border-y-[14px] border-r-[16px] border-y-transparent border-r-aria-creme" />
          <div className="flex flex-col gap-5 rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
            <h1 className="text-[16px] leading-7 font-black text-aria-violet">{data.bubbleTitle}</h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              {data.bubbleText}
            </p>
          </div>
        </div>
      </section>

      {/* Exercice */}
      <section className="flex flex-col gap-7 px-6 pt-7">
        <p className="text-[16px] leading-5 font-black text-aria-violet">{data.instruction}</p>

        {/* Compteur */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: data.errorCount }).map((_, i) => (
              <Slot key={i} index={i} found={i < foundCount} />
            ))}
          </div>
          <span className="text-[14px] leading-[18px] font-medium text-aria-lavande">
            {foundCount} {foundCount > 1 ? "erreurs trouvées" : "erreur trouvée"} sur{" "}
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

        {/* Feedback */}
        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              key={`${feedback.variant}-${lastTap}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={`flex gap-3 rounded-2xl p-4 ${
                feedback.variant === "right" ? "bg-aria-lime" : "bg-aria-orange"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  feedback.variant === "right" ? "text-aria-violet" : "text-aria-lime"
                }`}
              >
                {feedback.variant === "right" ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <CrossIcon className="h-4 w-4" />
                )}
              </span>
              <div className="flex flex-col gap-1">
                <p
                  className={`text-[16px] leading-7 font-black ${
                    feedback.variant === "right" ? "text-aria-violet" : "text-aria-lime"
                  }`}
                >
                  {feedback.title}
                </p>
                <p
                  className={`text-[14px] leading-[18px] font-medium ${
                    feedback.variant === "right" ? "text-aria-violet" : "text-aria-lime"
                  }`}
                >
                  {feedback.text}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
