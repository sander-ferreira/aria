"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { CasData } from "@/app/possibilites/cas/cas-data";

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true" width={14} height={14}>
      <path
        d="M1 1l12 12M13 1L1 13"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
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

export default function CasDetail({ data }: { data: CasData }) {
  const [tab, setTab] = useState<"avant" | "apres">("avant");

  return (
    <main className={`font-satoshi flex h-dvh w-full flex-col overflow-hidden ${data.bg}`}>
      {/* Barre haute : fermeture */}
      <div className="px-6 pt-6">
        <Link
          href="/possibilites"
          aria-label="Fermer"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-aria-creme"
        >
          <CloseIcon className={data.closeColor} />
        </Link>
      </div>

      {/* Contenu */}
      <div className="flex flex-col gap-12 px-6 pt-6">
        {/* Intitulé + mise en situation */}
        <div className={`flex flex-col gap-5 ${data.accent}`}>
          <span className="text-[16px] leading-7 font-bold">{data.num}</span>
          <h1 className="text-[24px] leading-7 font-black">{data.title}</h1>
          <p className="text-[16px] leading-5 font-medium">{data.context}</p>
        </div>

        {/* Toggle Avant / Après */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center rounded-full bg-aria-creme">
            {(["avant", "apres"] as const).map((key) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  aria-pressed={active}
                  className={`flex flex-1 items-center justify-center rounded-full px-4 py-3 text-[16px] leading-5 font-black text-aria-violet transition-colors ${
                    active ? data.accentBg : "bg-transparent"
                  }`}
                >
                  {key === "avant" ? "Avant IA" : "Après IA"}
                </button>
              );
            })}
          </div>

          {tab === "avant" ? (
            <BlocInfo image={data.avant.image} text={data.avant.text} alt={data.title} />
          ) : (
            <div className="flex flex-col gap-9">
              <BlocInfo image={data.apres.image} text={data.apres.text} alt={data.title} />
              {/* Message de la mascotte */}
              <div className="flex items-start gap-2">
                <Image
                  src="/images/aria-mascot-message-cream.png"
                  alt="Aria"
                  width={76}
                  height={91}
                  className="h-[91px] w-[76px] shrink-0"
                />
                <div className="relative flex-1">
                  <div className="absolute top-[18px] -left-[14px] h-0 w-0 border-y-[14px] border-r-[16px] border-y-transparent border-r-aria-lime" />
                  <div className="rounded-2xl bg-aria-lime p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
                    <p className="text-[14px] leading-[18px] font-bold text-aria-violet">
                      {data.apres.mascotMessage}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
