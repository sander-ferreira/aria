import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";

/**
 * Intro du sous-module "Les dangers" (Étape 3) — maquette node 60-813.
 *
 * Effet "éventail" (cf. maquette) : carte arrière orange INCLINÉE, carte avant
 * violette droite.
 *  - arrière "Les limites" (orange, terminée) : tournée de ~4° ;
 *  - avant "Les dangers" (violet, active et cliquable) : 345×405, droite.
 * Mobile-first, sans scroll.
 */
export default function DangersPage() {
  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col overflow-x-hidden bg-aria-creme">
      <ProgressHeader step={3} totalSteps={4} />

      <div className="flex flex-1 flex-col items-center justify-center gap-20 px-6">
        {/* Pile de cartes — la boîte fait la taille de la carte avant (345×405) */}
        <div className="relative aspect-[345/405] w-full max-w-[345px]">
          {/* Arrière : Les limites (orange) — même taille, tournée de 4° */}
          <div className="absolute inset-0 flex rotate-4 flex-col gap-7 rounded-2xl bg-aria-orange px-7 py-10">
            <div className="relative flex-1">
              <Image
                src="/images/carte-limites.png"
                alt=""
                fill
                className="object-contain"
                sizes="345px"
              />
            </div>
            <span className="text-center text-[36px] leading-10 font-black text-aria-lime">
              Les limites
            </span>
          </div>

          {/* Avant : Les dangers (violet) — droite, cliquable */}
          <Link
            href={"/dangers/regles" as Route}
            className="absolute inset-0 flex flex-col gap-7 rounded-2xl bg-aria-violet px-7 py-10 transition-transform active:scale-[0.98]"
          >
            <div className="relative flex-1 -rotate-4">
              <Image
                src="/images/carte-dangers.png"
                alt=""
                fill
                priority
                className="object-contain"
                sizes="345px"
              />
            </div>
            <span className="text-center text-[36px] leading-10 font-black text-aria-creme">
              Les dangers
            </span>
          </Link>
        </div>

        <p className="max-w-76 text-center text-[20px] leading-6.5 font-black text-aria-violet">
          Cliquez sur la carte pour découvrir les dangers de l&apos;IA
        </p>
      </div>
    </main>
  );
}
