"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const MATIERES = [
  "Mathématiques",
  "Français",
  "Histoire/Géo",
  "Anglais",
  "SVT",
  "Physique/chimie",
  "Technologie",
  "EPS",
  "Arts plastiques",
  "Musique",
  "Philosophie",
  "Espagnol",
];

/**
 * Accroche 1 — intro du kit : présentation d'ARIA + choix de la matière
 * enseignée. Arrive juste après la page d'entrée (racine). Page scrollable :
 * mascotte + bulle, grille de matières, CTA Continuer actif après sélection.
 * Mobile-first.
 */
export default function AccrochePage() {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col bg-aria-creme px-6">
      {/* Mascotte + bulle */}
      <section className="flex flex-col items-center gap-3 pt-16">
        <Image
          src="/images/aria-mascot-pointe.png"
          alt="Aria, la mascotte"
          width={143}
          height={156}
          priority
          className="h-[156px] w-[143px]"
        />
        <div className="relative w-full max-w-[345px]">
          {/* Queue de la bulle (vers le haut, vers la mascotte) */}
          <div className="absolute -top-[15px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-[16px] border-b-[16px] border-x-transparent border-b-aria-creme" />
          <div className="flex flex-col gap-5 rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
            <h1 className="text-[16px] leading-7 font-black text-aria-violet">
              Bonjour, moi c&apos;est ARIA
            </h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              Je suis votre guide à travers ce kit. Je ne suis pas là pour vous faire peur ou pour
              vous vendre du rêve, je suis juste là pour vous dire la vérité sur l&apos;IA. Ce
              qu&apos;elle peut faire pour vous, et ce qu&apos;elle ne fera jamais à votre place.
            </p>
          </div>
        </div>
      </section>

      {/* Question + matières */}
      <section className="flex flex-col gap-5 pt-12">
        <h2 className="text-[16px] leading-5 font-black text-aria-violet">
          Dans un premier temps, quelle matière enseignez-vous ?
        </h2>
        <div className="grid grid-cols-2 gap-1">
          {MATIERES.map((matiere) => (
            <button
              key={matiere}
              type="button"
              onClick={() => setSelected(matiere)}
              aria-pressed={selected === matiere}
              className={`rounded-lg border-2 px-5 py-6 text-center text-[16px] leading-5 font-black text-aria-violet transition-colors ${
                selected === matiere ? "border-aria-violet bg-aria-violet/5" : "border-aria-lavande"
              }`}
            >
              {matiere}
            </button>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="mt-auto pt-8 pb-12">
        {answered ? (
          <Link
            href={"/accroche/usage" as Route}
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
