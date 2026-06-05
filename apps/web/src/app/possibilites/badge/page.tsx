import BadgeScreen from "@/components/badge-screen";

/**
 * Badge "Premier Pas" — récompense de fin du module "Les possibilités".
 * Continuer → module "Les limites et dangers".
 */
export default function BadgePremierPasPage() {
  return (
    <BadgeScreen
      badgeImage="/images/badge-premiers-pas.svg"
      badgeLabel="Badge Premier Pas"
      xp="200 XP"
      mascotImage="/images/aria-mascot-premierpas.png"
      mascotWidth={117}
      mascotSide="right"
      mascotMessage={
        "Vous voyez ce que je veux dire maintenant ? \n Cependant, nous n'avons pas encore évoqué les règles, et nous allons voir ça ensemble de manière claire et sereine."
      }
      ctaLabel="Continuer"
      ctaHref="/limites"
    />
  );
}
