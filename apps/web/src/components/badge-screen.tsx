"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export type BadgeScreenProps = {
  badgeImage: string;
  badgeLabel: string;
  /** Texte de la bulle de la mascotte (les "\n" deviennent des retours à la ligne) */
  mascotMessage: string;
  ctaLabel: string;
  ctaHref: string;
  xp?: string;
};

/**
 * Écran de récompense "Nouveau Badge débloqué !" (fin de module).
 * Réutilisé par chaque badge (Premier Pas, Responsable…). Mobile-first, sans scroll.
 */
export default function BadgeScreen({
  badgeImage,
  badgeLabel,
  mascotMessage,
  ctaLabel,
  ctaHref,
  xp = "200 XP",
}: BadgeScreenProps) {
  return (
    <main className="font-satoshi flex h-dvh w-full flex-col bg-aria-creme px-6">
      {/* Badge + textes (centrés) */}
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Image src={badgeImage} alt={badgeLabel} width={128} height={128} priority className="h-32 w-32" />
          <span className="text-[16px] leading-7 font-black text-aria-orange">{badgeLabel}</span>
        </motion.div>

        <motion.div
          className="flex flex-col gap-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[36px] leading-10 font-black text-aria-violet">
            {"Nouveau Badge débloqué !"}
          </h1>
          <p className="text-[16px] leading-7 font-black text-aria-lavande">Vous avez gagné {xp}</p>
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
              <p className="text-[14px] leading-[18px] font-medium whitespace-pre-line text-aria-violet">
                {mascotMessage}
              </p>
            </div>
          </div>
        </div>

        <Link
          href={ctaHref as Route}
          className="w-full rounded-lg bg-aria-violet py-5 text-center text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98]"
        >
          {ctaLabel}
        </Link>
      </motion.div>
    </main>
  );
}
