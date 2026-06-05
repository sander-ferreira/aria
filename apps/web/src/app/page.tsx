import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import AriaHeroMascot from "@/components/aria-hero-mascot";

/**
 * Page d'entrée du kit (racine) — porte d'entrée avant l'accroche.
 * Fond violet, titre accentué lime, mascotte lavande en pied de page,
 * CTA « Commencer avec ARIA » → /accroche. Mobile-first.
 */
export default function HomePage() {
  return (
    <main className="font-satoshi relative flex h-dvh w-full flex-col overflow-hidden bg-aria-violet">
      {/* Titre + logo ARIA */}
      <div className="flex flex-col gap-10 px-6 pt-28">
        <h1 className="text-[36px] leading-10 font-black text-aria-creme">
          L&apos;IA <span className="text-aria-lime">ne remplace pas</span>
          &nbsp; l&apos;enseignant. Elle lui{" "}
          <span className="text-aria-lime">rend du temps</span> pour enseigner.
        </h1>
        <Image
          src="/images/logo-aria.svg"
          alt="ARIA"
          width={102}
          height={33}
          priority
          className="h-[33px] w-[102px]"
        />
      </div>

      {/* Mascotte lavande, ancrée et débordant en bas (cadrage maquette) */}
      <AriaHeroMascot />

      {/* CTA */}
      <div className="absolute inset-x-0 bottom-0 px-6 pb-12">
        <Link
          href={"/accroche" as Route}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
        >
          Commencer avec ARIA
          <svg
            width={20}
            height={20}
            viewBox="0 0 13 13"
            fill="none"
            aria-hidden
            className="shrink-0"
          >
            <path
              d="M6.15719 0.248322C6.48828 -0.0827731 7.02497 -0.0827731 7.35606 0.248322L12.7515 5.6438C13.0826 5.97489 13.0826 6.51157 12.7515 6.84267L7.35606 12.2381C7.02496 12.5692 6.48828 12.5692 6.15719 12.2381C5.82609 11.907 5.82609 11.3704 6.15719 11.0393L10.1054 7.09105L0.84782 7.09105C0.379582 7.09105 0 6.71147 0 6.24323C0 5.77499 0.379582 5.39541 0.84782 5.39541L10.1054 5.39541L6.15719 1.44719C5.82609 1.1161 5.82609 0.579416 6.15719 0.248322Z"
              fill="currentColor"
            />
          </svg>
        </Link>
      </div>
    </main>
  );
}
