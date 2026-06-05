"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";
import { useProgress } from "@/lib/progress";

type CardData = {
  /** Identifiant de route (/possibilites/cas/<id>) */
  id: string;
  num: string;
  text: string;
  /** Couleur de fond de la carte */
  bg: string;
  /** Couleur du texte + intitulé */
  accent: string;
  /** Couleur de fond de la pastille flèche/check */
  circleBg: string;
  /** Couleur de l'icône */
  arrow: string;
};

const CARDS: CardData[] = [
  {
    id: "1",
    num: "Cas 1",
    text: "Expliquer un concept difficile autrement",
    bg: "bg-aria-lavande",
    accent: "text-aria-lime",
    circleBg: "bg-aria-lime",
    arrow: "text-aria-lavande",
  },
  {
    id: "2",
    num: "Cas 2",
    text: "Adapter un exercice à chaque niveau",
    bg: "bg-aria-orange",
    accent: "text-aria-creme",
    circleBg: "bg-aria-creme",
    arrow: "text-aria-orange",
  },
  {
    id: "3",
    num: "Cas 3",
    text: "Préparer une séquence de cours",
    bg: "bg-aria-violet",
    accent: "text-aria-lime",
    circleBg: "bg-aria-lime",
    arrow: "text-aria-violet",
  },
  {
    id: "4",
    num: "Cas 4",
    text: "Rédiger un mail délicat aux parents",
    bg: "bg-aria-lime",
    accent: "text-aria-violet",
    circleBg: "bg-aria-violet",
    arrow: "text-aria-lime",
  },
];

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

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true" width={14} height={14}>
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PossibilitesPage() {
  // Cas déjà ouverts (lus depuis le store de progression, côté client)
  const { state } = useProgress();
  const vus = state.casVus;

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col overflow-x-hidden bg-aria-creme">
      <ProgressHeader step={2} />

      {/* En-tête : mascotte Aria + bulle de dialogue */}
      <section className="flex items-end gap-5 px-6 pt-8">
        <Image
          src="/images/aria-mascot.svg"
          alt="Aria, la mascotte"
          width={79}
          height={94}
          priority
          className="h-[94px] w-[79px] shrink-0"
        />
        {/* Bulle — drop-shadow (filtre) → ombre unique sur bulle + pointe */}
        <div className="relative flex-1 drop-shadow-[0px_2px_12px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-5 rounded-2xl bg-aria-creme p-5">
            <h1 className="text-[16px] leading-7 font-black text-aria-violet">Les possibilités</h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              Et si l&apos;IA vous rendait une heure par jour&nbsp;? Voilà 4 cas concrets qu&apos;elle
              peut faire pour vous.
            </p>
          </div>
          {/* Pointe : vrai triangle pointant vers la mascotte (gauche) */}
          <div
            aria-hidden
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
            className="absolute top-1/2 right-full -mr-[2px] h-7 w-[18px] -translate-y-1/2 bg-aria-creme"
          />
        </div>
      </section>

      <section className="mt-auto flex flex-col">
        {CARDS.map((card, i) => {
          const seen = vus.includes(card.id);
          return (
            <Link
              key={card.id}
              href={`/possibilites/cas/${card.id}` as Route}
              className={`relative flex flex-col gap-4 rounded-t-2xl px-6 pt-6 transition-transform duration-150 active:scale-[0.98] ${card.bg} ${
                i > 0 ? "-mt-5" : ""
              } ${i === CARDS.length - 1 ? "pb-11" : "pb-14"}`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[16px] leading-7 font-bold ${card.accent}`}>{card.num}</span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${card.circleBg}`}
                >
                  {seen ? <CheckIcon className={card.arrow} /> : <ArrowIcon className={card.arrow} />}
                </span>
              </div>
              <p className={`text-[24px] leading-7 font-black ${card.accent}`}>{card.text}</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
