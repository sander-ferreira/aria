/**
 * Données des écrans "Cas" du parcours "Les possibilités".
 * Chaque cas conserve la couleur de sa carte (cf. écran intro /possibilites).
 * Le switch actif et la bulle de la mascotte sont toujours Lime (constants),
 * seuls le fond et la couleur de texte (accent) changent selon le cas.
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
  /** Couleur de l'icône de fermeture (= couleur de l'écran) */
  closeColor: string;
  /** État "Avant IA" */
  avant: { image: string; text: string };
  /** État "Après IA" */
  apres: { image: string; text: string; mascot: string; mascotMessage: string };
};

const PHOTO = "/images/cas-photo.png";

export const CAS_DATA: Record<string, CasData> = {
  "1": {
    num: "Cas 1",
    title: "Expliquer un concept difficile autrement",
    context:
      "Vous avez expliqué la même notion trois fois. Une partie de la classe ne comprend toujours pas. Vous ne savez plus comment reformuler.",
    bg: "bg-aria-lavande",
    accent: "text-aria-lime",
    closeColor: "text-aria-lavande",
    avant: {
      image: PHOTO,
      text: "Vous cherchez dans vos anciens cours, vous improvisez une analogie, vous espérez que ça passe.",
    },
    apres: {
      image: PHOTO,
      text: "« Explique la notion de photosynthèse à un élève de 4ème qui aime le football » → analogie sur mesure en 20 secondes → vous la testez, vous la gardez ou vous en demandez une autre.",
      mascot: "/images/aria-mascot-message-cream.png",
      mascotMessage: "Vous ne manquez plus de mots. Vous choisissez juste le meilleur.",
    },
  },
  "2": {
    num: "Cas 2",
    title: "Différencier un exercice selon les niveaux",
    context:
      "Vous avez 28 élèves. 8 sont en difficulté, 6 sont en avance. Vous n'avez pas le temps de faire 3 versions.",
    bg: "bg-aria-orange",
    accent: "text-aria-creme",
    closeColor: "text-aria-orange",
    avant: {
      image: PHOTO,
      text: "45 min de travail supplémentaire, souvent abandonné faute de temps.",
    },
    apres: {
      image: PHOTO,
      text: "Prompt tapé en 30 secondes → 3 niveaux générés → 10 min de relecture et d'adaptation.",
      mascot: "/images/aria-mascot-cas2.png",
      mascotMessage:
        "Ce temps récupéré, c'est du temps pour accompagner, pas pour taper sur un clavier.",
    },
  },
};
