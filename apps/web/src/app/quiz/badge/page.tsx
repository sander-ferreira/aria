"use client";

import BadgeScreen from "@/components/badge-screen";
import { useProgress } from "@/lib/progress";

/**
 * Badge "Engagé" — récompense de fin de quiz (maquette node 91-1782).
 * XP = 50 par bonne réponse au quiz. Continuer → page de résultats.
 */
export default function BadgeEngagePage() {
  const { xp } = useProgress();
  return (
    <BadgeScreen
      badgeImage="/images/badge-engage.svg"
      badgeWidth={140}
      badgeLabel="Badge Engagé"
      xp={`${xp.engage} XP`}
      hideMascot
      ctaLabel="Voir mes résultats"
      ctaHref="/quiz/resultat"
    />
  );
}
