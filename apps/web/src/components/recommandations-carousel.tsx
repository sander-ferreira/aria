"use client";

import type { Route } from "next";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import ProgressHeader from "@/components/progress-header";
import { markDangersRead } from "@/lib/progress";

type Outil = {
  name: string;
  /** Étiquette du haut de carte */
  statusLabel: string;
  /** true = outil recommandé (violet/check), false = à éviter/interdit (orange/croix) */
  recommended: boolean;
  description: string;
  points: string[];
};

const OUTILS: Outil[] = [
  {
    name: "Euria",
    statusLabel: "Recommandée",
    recommended: true,
    description:
      "Cette IA suisse garantit une souveraineté totale avec un hébergement 100% localisé dans des data centers suisses alimentés en énergies renouvelables.",
    points: ["Données non partagées", "Conforme RGPD & données mineurs", "IA éco-responsable"],
  },
  {
    name: "Mistral le Chat pro",
    statusLabel: "Recommandée",
    recommended: true,
    description:
      "Entreprise française innovante qui utilise la puissance de calcul européenne tout en garantissant la confidentialité de vos données.",
    points: [
      "Données non utilisées pour l'entrainement",
      "Transparente sur son fonctionnement",
      "Entreprise Française",
    ],
  },
  {
    name: "Mia Seconde",
    statusLabel: "Recommandée",
    recommended: true,
    description:
      "C'est une intelligence artificielle labellisée par l'Éducation Nationale et conçue spécifiquement pour les besoins des enseignants et le contexte scolaire.",
    points: [
      "Protection renforcée données élèves",
      "Transparente sur son fonctionnement",
      "Entreprise Française",
    ],
  },
  {
    name: "ChatGPT",
    statusLabel: "À éviter",
    recommended: false,
    description:
      "Puissant mais la version gratuite utilise vos conversations pour entraîner ses modèles par défaut.",
    points: [
      "Données utilisées pour l'entraînement",
      "Serveurs hors Europe (États-Unis)",
      "Non conforme pour données élèves",
    ],
  },
  {
    name: "Gemini",
    statusLabel: "Interdit",
    recommended: false,
    description:
      "Outil créé par Google. Vos données alimentent les services publicitaires. Aucune garantie sur leur utilisation.",
    points: [
      "Fuite de données vers Google",
      "Données liées à votre compte Google",
      "Violation RGPD garantie",
    ],
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
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
      <path d="M8 12.5l2.6 2.6L16 9" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
    </svg>
  );
}

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "left" ? "Outil précédent" : "Outil suivant"}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
        disabled ? "bg-aria-violet/20" : "bg-aria-violet"
      }`}
    >
      <ArrowIcon className={`h-4 w-4 text-aria-creme ${direction === "left" ? "rotate-180" : ""}`} />
    </button>
  );
}

/**
 * "Quelle IA utiliser ?" (Étape 3) — maquette nodes 135-3449 → 139-3675.
 * Carrousel des outils : 3 recommandés (Euria, Mistral, Mia Seconde) puis
 * 2 à éviter (ChatGPT, Gemini). Fond lime. CTA → badge Responsable (+100 XP).
 */
export default function RecommandationsCarousel() {
  const [index, setIndex] = useState(0);
  const last = OUTILS.length - 1;
  const outil = OUTILS[index];

  function go(next: number) {
    setIndex(Math.max(0, Math.min(last, next)));
  }

  const tone = outil.recommended ? "text-aria-violet" : "text-aria-orange";

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col overflow-x-hidden bg-aria-lime">
      <ProgressHeader step={3} totalSteps={4} />

      <div className="flex flex-1 flex-col gap-8 px-6 pt-6">
        <div className="flex flex-col gap-5">
          <span className="text-[16px] leading-7 font-bold text-aria-violet">
            Nos recommandations
          </span>
          <h1 className="text-[36px] leading-10 font-black text-aria-violet">
            Quelle IA utiliser ?
          </h1>
        </div>

        {/* Carrousel d'outils */}
        <div className="flex items-center gap-3">
          <NavButton direction="left" disabled={index === 0} onClick={() => go(index - 1)} />

          <div className="relative min-h-[420px] flex-1">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col gap-6 rounded-2xl bg-aria-creme px-6 py-7"
              >
                <div className="flex flex-col gap-1 text-center">
                  <span
                    className={`text-[16px] leading-7 font-black ${
                      outil.recommended ? "text-aria-lavande" : "text-aria-orange"
                    }`}
                  >
                    {outil.statusLabel}
                  </span>
                  <span className={`text-[36px] leading-10 font-black ${tone}`}>{outil.name}</span>
                </div>

                <p className={`text-center text-[16px] leading-5 font-medium ${tone}`}>
                  {outil.description}
                </p>

                <ul className="flex flex-col gap-4">
                  {outil.points.map((point) => (
                    <li key={point} className={`flex items-center gap-3 ${tone}`}>
                      {outil.recommended ? (
                        <CheckIcon className="h-6 w-6 shrink-0" />
                      ) : (
                        <CrossIcon className="h-6 w-6 shrink-0" />
                      )}
                      <span className="text-[16px] leading-5 font-black">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>

          <NavButton direction="right" disabled={index === last} onClick={() => go(index + 1)} />
        </div>
      </div>

      <div className="px-6 pt-8 pb-8">
        <Link
          href={"/dangers/badge" as Route}
          onClick={() => markDangersRead()}
          className="flex w-full items-center justify-center rounded-lg bg-aria-violet px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
        >
          J&apos;ai compris !
        </Link>
      </div>
    </main>
  );
}
