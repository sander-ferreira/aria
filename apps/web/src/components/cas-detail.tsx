"use client";

import type { Route } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { CAS_DATA, type CasData } from "@/app/possibilites/cas/cas-data";

/** Cas du parcours "Les possibilités" mémorisés comme vus (par session). */
const STORAGE_KEY = "aria-possibilites-cas-vus";
const TOTAL_CAS = Object.keys(CAS_DATA).length;

function readCasVus(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true" width={14} height={14}>
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" />
    </svg>
  );
}

/** Bloc photo + texte (commun aux états Avant / Après) */
function BlocInfo({ image, text, alt }: { image: string; text: string; alt: string }) {
  return (
    <div className="flex flex-col gap-7 rounded-2xl bg-aria-creme p-4">
      <div className="relative h-32 w-full overflow-hidden rounded-2xl">
        <Image src={image} alt={alt} fill className="object-cover" sizes="100vw" />
      </div>
      <p className="text-[16px] leading-5 font-medium text-aria-violet">{text}</p>
    </div>
  );
}

const TABS = [
  { key: "avant", label: "Avant IA" },
  { key: "apres", label: "Après IA" },
] as const;

export default function CasDetail({ data, id }: { data: CasData; id: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<"avant" | "apres">("avant");

  // Mémorise ce cas comme "vu" dès l'affichage
  useEffect(() => {
    const vus = new Set(readCasVus());
    vus.add(id);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify([...vus]));
  }, [id]);

  // Fermeture : si les 4 cas ont été vus → badge, sinon retour à l'intro (peu importe l'ordre)
  function handleClose() {
    const vus = new Set(readCasVus());
    vus.add(id);
    const next = vus.size >= TOTAL_CAS ? "/possibilites/badge" : "/possibilites";
    router.push(next as Route);
  }

  return (
    <main className={`font-satoshi flex h-dvh w-full flex-col overflow-hidden ${data.bg}`}>
      {/* Barre haute : fermeture */}
      <div className="px-6 pt-6">
        <button
          type="button"
          onClick={handleClose}
          aria-label="Fermer"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-aria-creme transition-transform active:scale-90"
        >
          <CloseIcon className={data.closeColor} />
        </button>
      </div>

      {/* Contenu (entrée animée) */}
      <motion.div
        className="flex flex-col gap-12 px-6 pt-6"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Intitulé + mise en situation */}
        <div className={`flex flex-col gap-5 ${data.accent}`}>
          <span className="text-[16px] leading-7 font-bold">{data.num}</span>
          <h1 className="text-[24px] leading-7 font-black">{data.title}</h1>
          <p className="text-[16px] leading-5 font-medium">{data.context}</p>
        </div>

        {/* Toggle Avant / Après */}
        <motion.div layout className="flex flex-col gap-5">
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
                      layoutId="cas-switch-pill"
                      className={`absolute inset-0 rounded-full ${data.switchActiveBg}`}
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span
                    className={`relative z-10 text-[16px] leading-5 font-black ${
                      active ? data.switchActiveText : "text-aria-violet"
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
            >
              {tab === "avant" ? (
                <BlocInfo image={data.avant.image} text={data.avant.text} alt={data.title} />
              ) : (
                <div className="flex flex-col gap-9">
                  <BlocInfo image={data.apres.image} text={data.apres.text} alt={data.title} />
                  {/* Message de la mascotte */}
                  <div className="flex items-start gap-8">
                    <Image
                      src={data.apres.mascot}
                      alt="Aria"
                      width={76}
                      height={91}
                      className="h-[91px] w-[76px] shrink-0"
                    />
                    {/* drop-shadow (filtre) → ombre unique sur bulle + pointe */}
                    <div className="relative flex-1 drop-shadow-[0px_2px_12px_rgba(0,0,0,0.12)]">
                      <div className={`rounded-2xl p-5 ${data.bubbleBg}`}>
                        <p className={`text-[14px] leading-[18px] font-bold ${data.bubbleText}`}>
                          {data.apres.mascotMessage}
                        </p>
                      </div>
                      {/* Pointe : triangle vers la mascotte (gauche), même couleur que la bulle */}
                      <div
                        aria-hidden
                        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
                        className={`absolute top-1/2 right-full -mr-[2px] h-7 w-[18px] -translate-y-1/2 ${data.bubbleBg}`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </main>
  );
}
