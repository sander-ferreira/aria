/**
 * Données des exercices "Repère les erreurs" du module "Les limites et dangers".
 * Un exercice = une fiche générée par IA dont certaines phrases sont tappables ;
 * quelques-unes sont fausses (isError) et portent une explication.
 */
export type Segment = {
  text: string;
  /** Phrase tappable (en gras + soulignée) */
  tappable?: boolean;
  /** La phrase est une erreur factuelle */
  isError?: boolean;
  /** Explication affichée quand l'erreur est trouvée */
  explanation?: string;
};

export type ExerciceData = {
  bubbleTitle: string;
  bubbleText: string;
  instruction: string;
  errorCount: number;
  segments: Segment[];
  /** Feedback affiché quand on tape une phrase correcte */
  wrongFeedback: { title: string; text: string };
  continueLabel: string;
  continueHref: string;
};

export const EXERCICES: Record<string, ExerciceData> = {
  "1": {
    bubbleTitle: "Repère les 2 erreurs",
    bubbleText:
      "Voici une fiche de révision générée par IA sur la Première Guerre mondiale pour une classe de 3ème.",
    instruction: "Touchez les phrases qui vous semblent incorrectes",
    errorCount: 2,
    segments: [
      { text: "La Première Guerre mondiale débute en août 1914 ", tappable: true },
      {
        text: "après l'assassinat de l'archiduc François-Ferdinand à Sarajevo. Les principales puissances européennes s'affrontent en deux blocs : la Triple-Entente (France, Royaume-Uni, Russie) face aux puissances centrales (Allemagne, Autriche-Hongrie, Ottomans). Le conflit se caractérise par une guerre de tranchées particulièrement meurtrière. ",
      },
      {
        text: "La bataille de Waterloo en 1916",
        tappable: true,
        isError: true,
        explanation:
          "Waterloo c'est 1815, la bataille contre Napoléon. L'IA a confondu avec la bataille de la Somme (1916). Plus qu'une erreur à trouver.",
      },
      {
        text: " est l'une des plus sanglantes de la guerre, avec plus de 700 000 morts en quelques mois. ",
      },
      { text: "Les États-Unis entrent en guerre en 1917", tappable: true },
      { text: " aux côtés des Alliés. " },
      {
        text: "L'armistice est signé le 22 novembre 1918.",
        tappable: true,
        isError: true,
        explanation:
          "L'armistice c'est le 11 novembre, pas le 22. Une date légèrement décalée, crédible pour un élève s'il ne la connaît pas, immédiatement repérée par vous.",
      },
    ],
    wrongFeedback: {
      title: "Pas tout à fait…",
      text: "Cette information est correcte. Cherchez encore ! L'erreur est souvent dans un nom propre ou une date précise.",
    },
    continueLabel: "Continuer vers les dangers",
    continueHref: "/dangers",
  },
};
