import BadgeScreen from "@/components/badge-screen";

/**
 * Badge "Responsable" — récompense de fin du module "Les limites et dangers".
 * Continuer → quiz final (à venir).
 */
export default function BadgeResponsablePage() {
  return (
    <BadgeScreen
      badgeImage="/images/badge-responsable.png"
      badgeLabel="Badge Responsable"
      xp="200 XP"
      mascotMessage={
        "Tu protèges tes élèves et toi-même. C'est ça, un enseignant qui maîtrise l'IA.\nMaintenant, voyons ce que tu as retenu !"
      }
      ctaLabel="Continuer"
      ctaHref="/quiz"
    />
  );
}
