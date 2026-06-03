import type { Route } from "next";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";

/**
 * Intro du module "Les limites et dangers" (Étape 3).
 * Une grande carte cliquable lance la série d'exemples. Mobile-first, sans scroll.
 */
export default function LimitesPage() {
  return (
    <main className="font-satoshi flex h-dvh w-full flex-col overflow-hidden bg-aria-creme">
      <ProgressHeader step={3} xp="400 XP" />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6">
        {/* Carte cliquable */}
        <Link
          href={"/limites/exemple/1" as Route}
          className="flex aspect-[345/405] w-full max-w-[345px] flex-col gap-7 rounded-2xl bg-aria-violet px-7 py-10 transition-transform active:scale-[0.98]"
        >
          {/* Placeholder visuel (rectangle gris dans la maquette) */}
          <div className="flex-1 rounded-xl bg-[#d9d9d9]" />
          <span className="text-center text-[36px] leading-10 font-black text-aria-lime">
            Les limites
          </span>
        </Link>

        <p className="max-w-[304px] text-center text-[20px] leading-[26px] font-black text-aria-violet">
          Cliquez sur la carte pour découvrir les limites de l&apos;IA
        </p>
      </div>
    </main>
  );
}
