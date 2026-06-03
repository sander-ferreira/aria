"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

/**
 * Écran "Badge Premier Pas" — récompense de fin du module "Les possibilités",
 * affiché une fois les 4 cas parcourus. Le bouton Continuer ouvre le module suivant
 * ("Les limites et dangers"). Mobile-first, plein écran sans scroll.
 */
export default function BadgePage() {
  return (
    <main className="font-satoshi flex h-dvh w-full flex-col bg-aria-creme px-6">
      {/* Badge + textes (centrés dans l'espace disponible) */}
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          {/* Visuel du badge */}
          <Image
            src="/images/badge-premiers-pas.svg"
            alt="Badge Premier Pas"
            width={128}
            height={128}
            priority
            className="h-32 w-32"
          />
          <span className="text-[16px] leading-7 font-black text-aria-orange">
            Badge Premier Pas
          </span>
        </motion.div>

        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[36px] leading-10 font-black text-aria-violet">
            Nouveau Badge débloqué&nbsp;!
          </h1>
          <p className="text-[16px] leading-7 font-black text-aria-lavande">
            Vous avez gagné 200 XP
          </p>
        </motion.div>
      </div>

      {/* Bas : mascotte + bulle + CTA */}
      <motion.div
        className="flex flex-col gap-12 pb-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-start gap-2">
          <Image
            src="/images/aria-mascot-badge.png"
            alt="Aria"
            width={107}
            height={128}
            priority
            className="h-32 w-[107px] shrink-0"
          />
          <div className="relative flex-1">
            <div className="absolute top-[38px] -left-[14px] h-0 w-0 border-y-[14px] border-r-[16px] border-y-transparent border-r-aria-creme" />
            <div className="rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
              <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
                Tu vois ce que je veux dire maintenant&nbsp;?
                <br />
                Mais on n&apos;a pas encore parlé des règles…
              </p>
            </div>
          </div>
        </div>

        <Link
          href={"/limites" as Route}
          className="w-full rounded-lg bg-aria-violet py-5 text-center text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
        >
          Continuer
        </Link>
      </motion.div>
    </main>
  );
}
