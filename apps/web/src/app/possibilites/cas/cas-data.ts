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

const PHOTO_CAS1_BEFORE = "/images/photo-cas1-avant.png";
const PHOTO_CAS1_AFTER = "/images/photo-cas1-apres.png";
const PHOTO_CAS2_BEFORE = "/images/photo-cas2-avant.png";
const PHOTO_CAS2_AFTER = "/images/photo-cas2-apres.png";
const PHOTO_CAS3_BEFORE = "/images/photo-cas3-avant.png";
const PHOTO_CAS3_AFTER = "/images/photo-cas3-apres.png";
const PHOTO_CAS4_BEFORE = "/images/photo-cas4-avant.png";
const PHOTO_CAS4_AFTER = "/images/photo-cas4-apres.png";
const MASCOT_CAS1 = "/images/mascotte-cas-1.png";
const MASCOT_CAS2 = "/images/mascotte-cas-2.png";
const MASCOT_CAS3 = "/images/mascotte-cas-3.png";
const MASCOT_CAS4 = "/images/mascotte-cas-4.png";

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
      image: PHOTO_CAS1_BEFORE,
      text: "Vous cherchez dans vos anciens cours, vous improvisez une analogie, vous espérez que ça passe.",
    },
    apres: {
      image: PHOTO_CAS1_AFTER,
      text: "« Vous lancez une demande du type : « Explique la photosynthèse à un élève de 4ème qui adore le foot ». L’IA génère une analogie sur mesure en 20 secondes. Vous la testez : si elle vous plaît, vous gardez ; sinon, vous demandez une autre version. ",
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
      image: PHOTO_CAS2_BEFORE,
      text: "Avec 28 élèves (8 en difficulté, 6 en avance), préparer trois niveaux de cours prenait auparavant 45 minutes, un temps que vous n'aviez souvent pas.",
    },
    apres: {
      image: PHOTO_CAS2_AFTER,
      text: "ll suffit de taper un prompt en 30 secondes, en vous basant sur votre exercice, pour obtenir les trois versions. Il ne vous reste plus qu'une dizaine de minutes pour les relire et les adapter.",
      mascot: MASCOT_CAS2,
      mascotMessage:
        "Ce temps récupéré, c'est du temps pour accompagner vos élèves.",
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
      image: PHOTO_CAS3_BEFORE,
      text: "La préparation prenait deux heures, vous forçant souvent à réutiliser le même cours de l'an dernier. Sans pouvoir améliorer en fonction des retours que vous aviez eu",
    },
    apres: {
      image: PHOTO_CAS3_AFTER,
      text: "Donnez lui vos objectifs et le niveau de votre classe : elle génère un plan de séquence en une minute. À vous ensuite de garder ce qui est pertinent et de modifier ce qui ne vous correspond pas.",
      mascot: MASCOT_CAS3,
      mascotMessage: "L'IA n'est là que pour proposer ; vous restez le seul maître de vos décisions pédagogiques.",
    },
  },
  "4": {
    num: "Cas 4",
    title: "Rédiger un mail délicat aux parents",
    context:
      "Vous devez écrire à la famille d'un élève en décrochage, mais vous bloquez depuis vingt minutes, cherchant les mots justes sans savoir par où commencer.",
    bg: "bg-aria-lime",
    accent: "text-aria-violet",
    closeColor: "text-aria-violet",
    switchActiveBg: "bg-aria-violet",
    switchActiveText: "text-aria-lime",
    bubbleBg: "bg-aria-violet",
    bubbleText: "text-aria-creme",
    avant: {
      image: PHOTO_CAS4_BEFORE,
      text: "Vous produisez un message hésitant, passant beaucoup d'énergie sur la forme au détriment du fond.",
    },
    apres: {
      image: PHOTO_CAS4_AFTER,
      text: "Après avoir décrit brièvement la situation de manière anonyme, l'outil rédige le premier jet que vous enrichissez ensuite de votre ton et de votre connaissance réelle de la famille.",
      mascot: MASCOT_CAS4,
      mascotMessage: "L'IA ne vous remplacera jamais : il fait le squelette, c'est vous qui mettez l'humanité.",
    },
  },
};
