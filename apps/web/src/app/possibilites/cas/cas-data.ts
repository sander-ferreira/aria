/**
 * Données des écrans "Cas" du parcours "Les possibilités".
 * Chaque cas conserve la couleur de sa carte (cf. écran intro /possibilites).
 * Les classes Tailwind sont écrites en toutes lettres pour être détectées au build.
 */
export type CasData = {
  num: string;
  /** Titre du cas */
  title: string;
  /** Mise en situation (le problème) */
  context: string;
  /** Fond de l'écran (couleur de la carte) */
  bg: string;
  /** Couleur du titre + mise en situation */
  accent: string;
  /** Fond de l'onglet actif + bulle mascotte (= accent) */
  accentBg: string;
  /** Couleur de l'icône de fermeture (= couleur de l'écran) */
  closeColor: string;
  /** État "Avant IA" */
  avant: { image: string; text: string };
  /** État "Après IA" */
  apres: { image: string; text: string; mascotMessage: string };
};

export const CAS_DATA: Record<string, CasData> = {
  "1": {
    num: "Cas 1",
    title: "Expliquer un concept difficile autrement",
    context:
      "Vous avez expliqué la même notion trois fois. Une partie de la classe ne comprend toujours pas. Vous ne savez plus comment reformuler.",
    bg: "bg-aria-lavande",
    accent: "text-aria-lime",
    accentBg: "bg-aria-lime",
    closeColor: "text-aria-lavande",
    avant: {
      image: "/images/cas-photo.png",
      text: "Vous cherchez dans vos anciens cours, vous improvisez une analogie, vous espérez que ça passe.",
    },
    apres: {
      image: "/images/cas-photo.png",
      text: "« Explique la notion de photosynthèse à un élève de 4ème qui aime le football » → analogie sur mesure en 20 secondes → vous la testez, vous la gardez ou vous en demandez une autre.",
      mascotMessage: "Vous ne manquez plus de mots. Vous choisissez juste le meilleur.",
    },
  },
};
