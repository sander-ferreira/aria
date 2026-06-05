"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import ProgressHeader from "@/components/progress-header";

const TABS = [
  { key: "eviter", label: "À ne pas faire" },
  { key: "faire", label: "À faire" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const REGLES = [
  "Jamais de nom ou prénom",
  "Jamais de note chiffrée",
  "Jamais de donnée identifiante (classe, âge, situation familiale, etc.)",
];

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
      <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" />
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

/**
 * Scénario "Vous rédigez un mail aux parents de Lucas" (Étape 3) —
 * maquette nodes 125-3140 / 135-3277. Toggle À ne pas faire (données
 * identifiantes) / À faire (données anonymisées + règles). Fond violet.
 */
export default function DangersScenarioPage() {
  const [tab, setTab] = useState<TabKey>("eviter");

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col overflow-x-hidden bg-aria-violet">
      <ProgressHeader step={3} totalSteps={4} tone="creme" />

      <div className="flex flex-1 flex-col gap-8 px-6 pt-6">
        {/* Intitulé du scénario */}
        <div className="flex flex-col gap-5">
          <span className="text-[16px] leading-7 font-bold text-aria-lime">Scénario</span>
          <h1 className="text-[36px] leading-10 font-black text-aria-lime">
            Vous rédigez un mail aux parents de Lucas, un élève en difficulté
          </h1>
        </div>

        {/* Toggle À ne pas faire / À faire */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center rounded-full bg-aria-creme">
            {TABS.map(({ key, label }) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  aria-pressed={active}
                  className="relative flex flex-1 items-center justify-center rounded-full px-4 py-3"
                >
                  {active && (
                    <motion.span
                      layoutId="scenario-switch-pill"
                      className={`absolute inset-0 rounded-full ${
                        key === "eviter" ? "bg-aria-orange" : "bg-aria-lime"
                      }`}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span
                    className={`relative z-10 text-[16px] leading-5 font-black ${
                      active && key === "eviter" ? "text-aria-creme" : "text-aria-violet"
                    }`}
                  >
                    {label}
                  </span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col gap-9"
            >
              {tab === "eviter" ? (
                <div className="flex flex-col gap-4 rounded-2xl bg-aria-creme p-5">
                  <div className="flex items-center gap-3">
                    <CrossIcon className="h-6 w-6 shrink-0 text-aria-orange" />
                    <h2 className="text-[18px] leading-6 font-black text-aria-orange">
                      Données identifiantes
                    </h2>
                  </div>
                  <p className="text-[14px] leading-[22px] font-medium text-aria-orange">
                    «&nbsp;Lucas Martin, 4ème B, 13 ans, parents divorcés, 8/20 en français,
                    décrochage depuis octobre&nbsp;»
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-4 rounded-2xl bg-aria-lime p-5">
                    <div className="flex items-center gap-3">
                      <CheckIcon className="h-6 w-6 shrink-0 text-aria-violet" />
                      <h2 className="text-[18px] leading-6 font-black text-aria-violet">
                        Données anonymisées
                      </h2>
                    </div>
                    <p className="text-[14px] leading-[22px] font-medium text-aria-violet">
                      «&nbsp;Un élève de 4ème dont la situation familiale est difficile est en
                      décrochage scolaire depuis la rentrée avec des résultats en baisse&nbsp;»
                    </p>
                  </div>

                  {/* Mascotte + bulle "Les règles à retenir" */}
                  <div className="flex items-end gap-2">
                    <Image
                      src="/images/aria-mascot-tablette.svg"
                      alt="Aria"
                      width={87}
                      height={105}
                      className="h-[105px] w-[87px] shrink-0"
                    />
                    <div className="relative flex-1 drop-shadow-[0px_2px_12px_rgba(0,0,0,0.12)]">
                      <div className="flex flex-col gap-3 rounded-2xl bg-aria-lime p-5">
                        <h3 className="text-[16px] leading-5 font-black text-aria-violet">
                          Les règles à retenir
                        </h3>
                        <ul className="flex flex-col gap-1.5">
                          {REGLES.map((regle) => (
                            <li
                              key={regle}
                              className="flex gap-2 text-[14px] leading-[18px] font-medium text-aria-violet"
                            >
                              <span aria-hidden>•</span>
                              <span>{regle}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div
                        aria-hidden
                        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
                        className="absolute top-1/2 right-full -mr-[2px] h-7 w-[18px] -translate-y-1/2 bg-aria-lime"
                      />
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="px-6 pt-8 pb-8">
        <Link
          href={"/dangers/risques" as Route}
          className="flex w-full items-center justify-center rounded-lg bg-aria-lime px-5 py-5 text-[16px] leading-5 font-black text-aria-violet transition-transform active:scale-[0.98]"
        >
          Quels sont les risques ?
        </Link>
      </div>
    </main>
  );
}
