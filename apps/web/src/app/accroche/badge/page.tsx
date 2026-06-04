import BadgeScreen from "@/components/badge-screen";
import ProgressTracker from "@/components/progress-tracker";

/**
 * Badge "Curieux" — récompense de fin d'onboarding (+50 XP), avant les possibilités.
 */
export default function BadgeCurieuxPage() {
  return (
    <>
      {/* Onboarding terminé → +50 XP */}
      <ProgressTracker event="onboarding" />
      <BadgeScreen
        badgeImage="/images/badge-curieux-grand.png"
        badgeWidth={138}
        badgeLabel="Badge Curieux"
        xp="50 XP"
        mascotImage="/images/aria-mascot-pointe.png"
        mascotWidth={143}
        mascotSide="right"
        mascotMessage={
          "Merci pour votre honnêteté. C'est par là qu'on commence.\nC'est parti pour l'aventure ! Commençons par voir les possibilités avec l'IA"
        }
        ctaLabel="Continuer"
        ctaHref="/possibilites"
      />
    </>
  );
}
