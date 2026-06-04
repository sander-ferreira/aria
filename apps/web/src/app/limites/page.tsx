import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";

/**
 * Intro du module "Les limites et dangers" (Étape 3).
 * Cartes empilées : "Les dangers" (violet, en arrière) et "Les limites"
 * (orange, active et cliquable). Mobile-first, sans scroll.
 */
export default function LimitesPage() {
  return (
    <main className="font-satoshi flex h-dvh w-full flex-col overflow-hidden bg-aria-creme">
      <ProgressHeader step={3} xp="400 XP" totalSteps={4} />

      <div className="flex flex-1 flex-col items-center justify-center gap-20 px-6">
        <div className="relative aspect-[345/405] w-full max-w-[345px]">
          {/* Carte arrière : Les dangers (à venir) — légèrement inclinée */}
          <div className="absolute inset-0 flex rotate-4 scale-[1.02] flex-col gap-7 rounded-2xl bg-aria-violet px-7 py-10">
            <div className="relative flex-1">
              <Image
                src="/images/carte-dangers.png"
                alt=""
                fill
                className="object-contain"
                sizes="345px"
              />
            </div>
            <span className="text-center text-[36px] leading-10 font-black text-aria-creme">
              Les dangers
            </span>
          </div>

          {/* Carte avant : Les limites (active, cliquable) */}
          <Link
            href={"/limites/exemple/1" as Route}
            className="absolute inset-0 flex flex-col gap-7 rounded-2xl bg-aria-orange px-7 py-10 transition-transform active:scale-[0.98]"
          >
            <div className="relative flex-1">
              <Image
                src="/images/carte-limites.png"
                alt=""
                fill
                priority
                className="object-contain"
                sizes="345px"
              />
            </div>
            <span className="text-center text-[36px] leading-10 font-black text-aria-lime">
              Les limites
            </span>
          </Link>
        </div>

        <p className="max-w-[304px] text-center text-[20px] leading-[26px] font-black text-aria-violet">
          Cliquez sur la carte pour découvrir les limites de l&apos;IA
        </p>
      </div>
    </main>
  );
}
