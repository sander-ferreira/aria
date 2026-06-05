import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";

type Etape = {
  num: string;
  label: string;
  title: string;
  bg: string;
  accent: string;
  circleBg: string;
  circleText: string;
};

/** Les 3 étapes du sous-module Dangers (sommaire / agenda). */
const ETAPES: Etape[] = [
  {
    num: "1",
    label: "Mise en situation",
    title: "Les choses à ne pas faire",
    bg: "bg-aria-violet",
    accent: "text-aria-lime",
    circleBg: "bg-aria-lime",
    circleText: "text-aria-violet",
  },
  {
    num: "2",
    label: "Que disent les lois ?",
    title: "Pourquoi c'est interdit ?",
    bg: "bg-aria-orange",
    accent: "text-aria-creme",
    circleBg: "bg-aria-creme",
    circleText: "text-aria-orange",
  },
  {
    num: "3",
    label: "Nos recommandations",
    title: "Quels outils utiliser ?",
    bg: "bg-aria-lime",
    accent: "text-aria-violet",
    circleBg: "bg-aria-violet",
    circleText: "text-aria-lime",
  },
];

/**
 * Sommaire du sous-module "Les dangers" (Étape 3) — maquette node 53-540.
 * Mascotte + bulle, puis les 3 étapes à venir, et CTA "C'est parti !".
 */
export default function DangersReglesPage() {
  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col overflow-x-hidden bg-aria-creme">
      <ProgressHeader step={3} totalSteps={4} />

      {/* Mascotte + bulle */}
      <section className="flex items-end gap-2 px-6 pt-6">
        <Image
          src="/images/aria-mascot-tablette.svg"
          alt="Aria"
          width={87}
          height={105}
          priority
          className="h-[105px] w-[87px] shrink-0"
        />
        <div className="relative flex-1 drop-shadow-[0px_2px_12px_rgba(0,0,0,0.12)]">
          <div className="flex flex-col gap-2 rounded-2xl bg-aria-creme p-5">
            <h1 className="text-[16px] leading-7 font-black text-aria-violet">
              Les choses à ne pas faire
            </h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              Nous allons voir ensemble en 3 étapes les dangers liés à l&apos;IA et comment les
              contrer
            </p>
          </div>
          <div
            aria-hidden
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
            className="absolute top-1/2 right-full -mr-[2px] h-7 w-[18px] -translate-y-1/2 bg-aria-creme"
          />
        </div>
      </section>

      {/* Les 3 étapes à venir */}
      <section className="flex flex-col gap-4 px-6 pt-10">
        {ETAPES.map((etape) => (
          <div
            key={etape.num}
            className={`flex flex-col gap-4 rounded-2xl px-6 py-7 ${etape.bg}`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-[16px] leading-7 font-bold ${etape.accent}`}>
                {etape.label}
              </span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[14px] font-black ${etape.circleBg} ${etape.circleText}`}
              >
                {etape.num}
              </span>
            </div>
            <p className={`text-[24px] leading-7 font-black ${etape.accent}`}>{etape.title}</p>
          </div>
        ))}
      </section>

      <div className="mt-auto px-6 pt-8 pb-8">
        <Link
          href={"/dangers/scenario" as Route}
          className="flex w-full items-center justify-center rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
        >
          C&apos;est parti !
        </Link>
      </div>
    </main>
  );
}
