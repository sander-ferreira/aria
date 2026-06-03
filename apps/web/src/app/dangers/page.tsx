import type { Route } from "next";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";

/**
 * Intro du sous-module "Les dangers" (Étape 3).
 * Deux cartes empilées : "Les limites" (terminée, en arrière) et "Les dangers"
 * (active, devant et cliquable). Mobile-first, sans scroll.
 */
export default function DangersPage() {
  return (
    <main className="font-satoshi flex h-dvh w-full flex-col overflow-hidden bg-aria-creme">
      <ProgressHeader step={3} xp="400 XP" />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
        <div className="relative aspect-[345/405] w-full max-w-[345px]">
          {/* Carte arrière : Les limites (terminée) */}
          <div className="absolute inset-0 -translate-x-1.5 -translate-y-2.5 scale-[1.03] flex flex-col gap-7 rounded-2xl bg-aria-violet px-7 py-10">
            <div className="flex-1 rounded-xl bg-[#d9d9d9]" />
            <span className="text-center text-[36px] leading-10 font-black text-aria-lime">
              Les limites
            </span>
          </div>

          {/* Carte avant : Les dangers (active, cliquable) */}
          <Link
            href={"/dangers/regles" as Route}
            className="absolute inset-0 flex flex-col gap-7 rounded-2xl bg-aria-orange px-7 py-10 transition-transform active:scale-[0.98]"
          >
            <div className="flex-1 rounded-xl bg-[#d9d9d9]" />
            <span className="text-center text-[36px] leading-10 font-black text-aria-creme">
              Les dangers
            </span>
          </Link>
        </div>

        <p className="max-w-[304px] text-center text-[20px] leading-[26px] font-black text-aria-violet">
          Cliquez sur la carte pour découvrir les dangers de l&apos;IA
        </p>
      </div>
    </main>
  );
}
