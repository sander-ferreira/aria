"use client";

import BadgeScreen from "@/components/badge-screen";
import { useProgress } from "@/lib/progress";

/**
 * Badge "Responsable" — récompense de fin du module "Les limites et dangers"
 * (maquette node 53-493). XP = erreurs "limites" trouvées + lecture des dangers.
 * Continuer → quiz final.
 */
export default function BadgeResponsablePage() {
  const { xp } = useProgress();
  return (
    <BadgeScreen
      badgeImage="/images/badge-responsable-v2.png"
      badgeWidth={125}
      badgeLabel="Badge Responsable"
      xp={`${xp.responsable} XP`}
      mascotImage="/images/aria-mascot-premierpas.png"
      mascotWidth={117}
      mascotSide="right"
      mascotMessage={
        "Vous protègez vos élèves et vous-même. C'est ça, un enseignant qui maîtrise l'IA.\nMaintenant, voyons ce que vous avez retenu !"
      }
      ctaLabel="Commencer le quiz !"
      ctaHref="/quiz"
    />
  );
}
