import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";
import ProgressTracker from "@/components/progress-tracker";

const POINTS = [
  "Elles les stockent sur leurs serveurs",
  "Elles peuvent les utiliser pour entraîner leurs modèles",
  "Vous n'avez aucun contrôle sur ce qu'il en advient",
];

/**
 * "Nos recommandations" — ce que font les IA grand public avec les données.
 * Dernier écran du sous-module Dangers avant le badge. Mobile-first, sans scroll.
 */
export default function DangersRecommandationsPage() {
  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col overflow-x-hidden bg-aria-creme">
      {/* Dangers lus → +100 XP (badge Responsable) */}
      <ProgressTracker event="dangersRead" />
      <ProgressHeader step={3} />

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
          <div className="flex flex-col gap-2 rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
            <h1 className="text-[16px] leading-7 font-black text-aria-violet">
              Nos recommandations
            </h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              Pas de jugement sur ce que vous utilisiez avant. Voilà juste
              pourquoi on vous recommande autre chose.
            </p>
          </div>
        </div>
      </section>

      {/* Liste : ce que font les IA grand public */}
      <section className="flex flex-col gap-3 px-6 pt-10">
        <h2 className="text-[16px] leading-5 font-black text-aria-violet">
          Ce que font les IA grand public avec vos données
        </h2>
        <div className="flex flex-col gap-4 mt-8">
          {POINTS.map((point) => (
            <div
              key={point}
              className="flex items-center justify-center rounded-2xl bg-aria-violet p-6 text-center text-[14px] leading-[18px] font-medium text-aria-creme"
            >
              {point}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-auto px-6 pb-8">
        <Link
          href={"/dangers/badge" as Route}
          className="flex w-full items-center justify-center rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
        >
          {"J'ai compris !"}
        </Link>
      </div>
    </main>
  );
}
