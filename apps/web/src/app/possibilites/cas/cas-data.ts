/**
 * Données des écrans "Cas" du parcours "Les possibilités".
 * Chaque cas conserve la couleur de sa carte (cf. écran intro /possibilites).
 * Le switch actif et la bulle de la mascotte varient selon le cas (le Cas 4,
 * sur fond Lime, inverse les accents en Violet).
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
  /** Couleur de l'icône de fermeture */
  closeColor: string;
  /** Fond de l'onglet actif du switch */
  switchActiveBg: string;
  /** Couleur du texte de l'onglet actif */
  switchActiveText: string;
  /** Fond de la bulle de la mascotte */
  bubbleBg: string;
  /** Couleur du texte de la bulle */
  bubbleText: string;
  /** État "Avant IA" */
  avant: { image: string; text: string };
  /** État "Après IA" */
  apres: { image: string; text: string; mascot: string; mascotMessage: string };
};

const PHOTO = "/images/cas-photo.png";
const MASCOT_CAS1 = "/images/aria-mascot-cas1.png";
const MASCOT_CAS2 = "/images/aria-mascot-cas2.png";
const MASCOT_LAVANDE = "/images/aria-mascot-lavande.png";

export const CAS_DATA: Record<string, CasData> = {
  "1": {
    num: "Cas 1",
    title: "Expliquer un concept difficile autrement",
    context:
      "Vous avez expliqué la même notion trois fois. Une partie de la classe ne comprend toujours pas. Vous ne savez plus comment reformuler.",
    bg: "bg-aria-lavande",
    accent: "text-aria-lime",
    closeColor: "text-aria-lavande",
    switchActiveBg: "bg-aria-lime",
    switchActiveText: "text-aria-violet",
    bubbleBg: "bg-aria-lime",
    bubbleText: "text-aria-violet",
    avant: {
      image: PHOTO,
      text: "Vous cherchez dans vos anciens cours, vous improvisez une analogie, vous espérez que ça passe.",
    },
    apres: {
      image: PHOTO,
      text: "« Explique la notion de photosynthèse à un élève de 4ème qui aime le football » → analogie sur mesure en 20 secondes → vous la testez, vous la gardez ou vous en demandez une autre.",
      mascot: MASCOT_CAS1,
      mascotMessage: "Vous ne manquez plus de mots. Vous choisissez juste le meilleur.",
    },
  },
  "2": {
    num: "Cas 2",
    title: "Adapter un exercice à chaque niveau",
    context:
      "Vous avez 28 élèves. 8 sont en difficulté, 6 sont en avance. Vous n'avez pas le temps de faire 3 versions.",
    bg: "bg-aria-orange",
    accent: "text-aria-creme",
    closeColor: "text-aria-orange",
    switchActiveBg: "bg-aria-lavande",
    switchActiveText: "text-aria-creme",
    bubbleBg: "bg-aria-lavande",
    bubbleText: "text-aria-creme",
    avant: {
      image: PHOTO,
      text: "45 min de travail supplémentaire, souvent abandonné faute de temps.",
    },
    apres: {
      image: PHOTO,
      text: "Prompt tapé en 30 secondes → 3 niveaux générés → 10 min de relecture et d'adaptation.",
      mascot: MASCOT_CAS2,
      mascotMessage:
        "Ce temps récupéré, c'est du temps pour accompagner, pas pour taper sur un clavier.",
    },
  },
  "3": {
    num: "Cas 3",
    title: "Préparer une séquence de cours",
    context: "Vous attaquez un nouveau chapitre lundi. Il est vendredi soir.",
    bg: "bg-aria-violet",
    accent: "text-aria-lime",
    closeColor: "text-aria-violet",
    switchActiveBg: "bg-aria-lime",
    switchActiveText: "text-aria-violet",
    bubbleBg: "bg-aria-lime",
    bubbleText: "text-aria-violet",
    avant: {
      image: PHOTO,
      text: "2h de préparation, souvent sur le même modèle de cours que l'an dernier.",
    },
    apres: {
      image: PHOTO,
      text: "Objectifs pédagogiques + niveau de classe → plan de séquence en 1 minute → vous gardez ce qui est juste, vous supprimez ce qui ne vous ressemble pas.",
      mascot: MASCOT_LAVANDE,
      mascotMessage: "Elle propose. Vous décidez. Toujours.",
    },
  },
  "4": {
    num: "Cas 4",
    title: "Rédiger un mail délicat aux parents",
    context:
      "Vous devez contacter les parents d'un élève en décrochage. Vous tournez autour du pot depuis 20 minutes.",
    bg: "bg-aria-lime",
    accent: "text-aria-violet",
    closeColor: "text-aria-violet",
    switchActiveBg: "bg-aria-violet",
    switchActiveText: "text-aria-lime",
    bubbleBg: "bg-aria-violet",
    bubbleText: "text-aria-creme",
    avant: {
      image: PHOTO,
      text: "Mail hésitant, énergie dépensée sur la forme plutôt que le fond.",
    },
    apres: {
      image: PHOTO,
      text: "Décrire la situation de façon anonyme → mail rédigé → vous ajoutez votre ton, votre connaissance de la famille.",
      mascot: MASCOT_LAVANDE,
      mascotMessage: "L'IA fait le squelette. Vous mettez l'humanité.",
    },
  },
};
