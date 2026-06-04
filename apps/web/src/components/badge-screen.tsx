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
  /** Ratio d'aspect du visuel du badge (hauteur fixée à 128) */
  badgeWidth?: number;
  mascotImage?: string;
  mascotWidth?: number;
  /** Côté de la mascotte (la bulle est de l'autre côté) */
  mascotSide?: "left" | "right";
};

/**
 * Écran de récompense "Nouveau Badge débloqué !" (fin de module / d'étape).
 * Réutilisé par chaque badge (Curieux, Premier Pas, Responsable…). Mobile-first.
 */
export default function BadgeScreen({
  badgeImage,
  badgeLabel,
  mascotMessage,
  ctaLabel,
  ctaHref,
  xp = "200 XP",
  badgeWidth = 128,
  mascotImage = "/images/aria-mascot-badge.png",
  mascotWidth = 107,
  mascotSide = "left",
}: BadgeScreenProps) {
  const mascot = (
    <Image
      src={mascotImage}
      alt="Aria"
      width={mascotWidth}
      height={128}
      priority
      className="h-32 w-auto shrink-0"
    />
  );
  // Pointe : vrai triangle qui pointe vers la mascotte (cf. maquette, Polygon 32×28)
  const tailClip =
    mascotSide === "left"
      ? "polygon(100% 0, 100% 100%, 0 50%)"
      : "polygon(0 0, 0 100%, 100% 50%)";
  const bubble = (
    // drop-shadow (filtre) → l'ombre suit la silhouette bulle + pointe (une seule ombre)
    <div className="relative flex-1 drop-shadow-[0px_2px_12px_rgba(0,0,0,0.12)]">
      <div className="relative rounded-2xl bg-aria-creme p-5">
        <p className="text-[14px] leading-[18px] font-medium whitespace-pre-line text-aria-violet">
          {mascotMessage}
        </p>
      </div>
      <div
        aria-hidden
        style={{ clipPath: tailClip }}
        className={`absolute top-1/2 h-7 w-[18px] -translate-y-1/2 bg-aria-creme ${
          mascotSide === "left" ? "right-full -mr-[2px]" : "left-full -ml-[2px]"
        }`}
      />
    </div>
  );

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col bg-aria-creme px-6">
      {/* Badge + textes (centrés) */}
      <div className="flex flex-1 flex-col items-center justify-center gap-10 text-center">
        <motion.div
          className="flex flex-col items-center gap-5"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          <Image
            src={badgeImage}
            alt={badgeLabel}
            width={badgeWidth}
            height={128}
            priority
            className="h-32 w-auto"
          />
          <span className="text-[16px] leading-7 font-black text-aria-orange">
            {badgeLabel}
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
            Vous avez gagné {xp}
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
        <div className="flex items-start gap-5">
          {mascotSide === "left" ? (
            <>
              {mascot}
              {bubble}
            </>
          ) : (
            <>
              {bubble}
              {mascot}
            </>
          )}
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
