import BadgeScreen from "@/components/badge-screen";

/**
 * Badge "Engagé" — récompense de fin de quiz (maquette node 91-1782).
 * NB : la maquette réutilise le visuel + les textes du Badge Responsable ;
 * on remplace par le bon badge (avion) et un message/CTA adaptés au post-quiz.
 */
export default function BadgeEngagePage() {
  return (
    <BadgeScreen
      badgeImage="/images/badge-engage.svg"
      badgeWidth={140}
      badgeLabel="Badge Engagé"
      xp="200 XP"
      mascotImage="/images/aria-mascot-premierpas.png"
      mascotWidth={117}
      mascotSide="right"
      mascotMessage={
        "Bravo, tu es allé jusqu'au bout !\nTu as maintenant les clés pour utiliser l'IA en classe, sereinement."
      }
      ctaLabel="Voir mes résultats"
      ctaHref="/quiz/resultat"
    />
  );
}
