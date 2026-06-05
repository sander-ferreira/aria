import type { Route } from "next";
import Link from "next/link";

import ProgressHeader from "@/components/progress-header";

type Risque = { title: string; text: string };

const RISQUES: Risque[] = [
  {
    title: "Violation RGPD",
    text: "Les données d'une personne mineure ont une protection renforcée. Leur transmission à un tiers non autorisé est illégale.",
  },
  {
    title: "Risque pour vous",
    text: "L'enseignant est personnellement responsable des données qu'il communique. Sanction disciplinaire possible.",
  },
  {
    title: "Risque pour l'école",
    text: "L'établissement peut être mis en cause. Atteinte à l'image et procédure CNIL à la clé.",
  },
];

/**
 * "Pourquoi c'est interdit ?" (Étape 3) — maquette node 135-3346.
 * Les 3 risques simultanés d'une donnée nominative dans une IA grand public.
 * Fond orange. CTA → recommandations.
 */
export default function DangersRisquesPage() {
  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col overflow-x-hidden bg-aria-orange">
      <ProgressHeader step={3} totalSteps={4} tone="creme" />

      <div className="flex flex-1 flex-col gap-8 px-6 pt-6">
        <div className="flex flex-col gap-5">
          <span className="text-[16px] leading-7 font-bold text-aria-creme">
            Pourquoi c&apos;est interdit ?
          </span>
          <h1 className="text-[36px] leading-10 font-black text-aria-creme">
            Les données nominatives d&apos;une personne mineure dans une IA grand public,
            c&apos;est trois risques simultanés.
          </h1>
        </div>

        <div className="flex flex-col gap-5">
          {RISQUES.map((risque) => (
            <div key={risque.title} className="flex flex-col gap-2 rounded-2xl bg-aria-creme p-5">
              <h2 className="text-[16px] leading-7 font-black text-aria-violet">{risque.title}</h2>
              <p className="text-[14px] leading-[22px] font-medium text-aria-violet">
                {risque.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pt-8 pb-8">
        <Link
          href={"/dangers/recommandations" as Route}
          className="flex w-full items-center justify-center rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
        >
          Quelle IA utiliser ?
        </Link>
      </div>
    </main>
  );
}
