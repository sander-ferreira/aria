import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";

/**
 * "Les choses à ne pas faire" — écran de transition du sous-module Dangers.
 * Mascotte + bulle, puis CTA vers les risques. Mobile-first, sans scroll.
 */
export default function DangersReglesPage() {
  return (
    <main className="font-satoshi flex h-dvh w-full flex-col overflow-hidden bg-aria-creme">
      <ProgressHeader step={3} xp="400 XP" />

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
            <h1 className="text-[16px] leading-7 font-black text-aria-violet">
              Les choses à ne pas faire
            </h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              Voici une fiche de révision générée par IA sur la Première Guerre mondiale pour une
              classe de 3ème.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-auto px-6 pb-8">
        <Link
          href={"/dangers/risques" as Route}
          className="flex w-full items-center justify-center rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
        >
          {"Pourquoi c'est important ?"}
        </Link>
      </div>
    </main>
  );
}
