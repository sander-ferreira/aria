import BadgeScreen from "@/components/badge-screen";

/**
 * Badge "Responsable" — récompense de fin du module "Les limites et dangers"
 * (maquette node 53-493). Continuer → quiz final.
 */
export default function BadgeResponsablePage() {
  return (
    <BadgeScreen
      badgeImage="/images/badge-responsable-v2.png"
      badgeWidth={125}
      badgeLabel="Badge Responsable"
      xp="200 XP"
      mascotImage="/images/aria-mascot-premierpas.png"
      mascotWidth={117}
      mascotSide="right"
      mascotMessage={
        "Tu protèges tes élèves et toi-même. C'est ça, un enseignant qui maîtrise l'IA.\nMaintenant, voyons ce que tu as retenu !"
      }
      ctaLabel="Commencer le quiz !"
      ctaHref="/quiz"
    />
  );
}
