"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const OPTIONS = ["Jamais", "Quelques essais", "Oui, je l'utilise souvent"];

/**
 * Accroche 2/3 — "Avez-vous déjà utilisé une IA ?" (profil de l'utilisateur).
 * Sélection d'une option → CTA Continuer actif. Mobile-first.
 */
export default function AccrocheUsagePage() {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col bg-aria-creme px-6">
      {/* Mascotte + bulle */}
      <section className="flex items-end gap-2 pt-8">
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
            <h1 className="text-[16px] leading-5 font-black text-aria-violet">
              {"J'aurais une question pour toi !"}
            </h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              Avant de commencer, j&apos;aurais besoin de connaître votre rapport à l&apos;IA.
            </p>
          </div>
        </div>
      </section>

      {/* Question + options */}
      <section className="flex flex-col gap-8 pt-12">
        <h2 className="text-[24px] leading-7 font-black text-aria-violet">
          {"Vos élèves utilisent l'IA pour leurs devoirs. Et vous, avez-vous déjà utilisé une IA ?"}
        </h2>
        <div className="flex flex-col gap-3">
          {OPTIONS.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => setSelected(i)}
              aria-pressed={selected === i}
              className={`rounded-lg border-2 px-5 py-8 text-left text-[16px] leading-5 font-black text-aria-violet transition-colors ${
                selected === i ? "border-aria-violet bg-aria-violet/5" : "border-aria-lavande"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-auto pt-6 pb-12">
        {answered ? (
          <Link
            href={"/accroche/craintes" as Route}
            className="flex w-full items-center justify-center rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
          >
            Continuer
          </Link>
        ) : (
          <div
            aria-disabled="true"
            className="flex w-full items-center justify-center rounded-lg bg-aria-violet/20 px-5 py-5 text-[16px] leading-5 font-black text-aria-creme"
          >
            Continuer
          </div>
        )}
      </div>
    </main>
  );
}
