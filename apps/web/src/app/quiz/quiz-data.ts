/**
 * Quiz final (Étape 4). Chaque question = un QCM à N options, une seule correcte.
 * Feedback : "Bonne réponse !" (lime) ou "Pas tout à fait…" (orange) + explication.
 */
export type QuizQuestion = {
  num: string;
  statement: string;
  options: string[];
  correctIndex: number;
  bonneText: string;
  fausseText: string;
};

export const QUIZ: QuizQuestion[] = [
  {
    num: "Question 1",
    statement: "L'IA peut remplacer la relation de confiance entre un enseignant et ses élèves ?",
    options: ["Vrai", "Faux"],
    correctIndex: 1,
    bonneText:
      "Exactement. L'IA ne lit pas les émotions, ne juge pas l'effort, ne crée pas le lien humain. Ça, c'est irremplaçable.",
    fausseText:
      "Non, l'IA ne peut pas créer la relation de confiance. Elle ne lit pas les émotions, ne perçoit pas les difficultés réelles. C'est le cœur du métier enseignant.",
  },
  {
    num: "Question 2",
    statement: "Pour différencier un exercice en 3 niveaux, l'IA vous fait gagner environ…",
    options: ["5 minutes", "30 à 40min", "Aucun gain réel"],
    correctIndex: 1,
    bonneText:
      "Bonne estimation ! Ce temps récupéré, c'est du temps pour accompagner vos élèves plutôt que taper sur un clavier.",
    fausseText:
      "En réalité, la différenciation manuelle prend 30 à 40 minutes en moyenne. L'IA ramène ça à quelques minutes de relecture.",
  },
  {
    num: "Question 3",
    statement:
      "Je peux entrer le prénom et les notes d'un élève dans ChatGPT gratuit si c'est pour l'aider.",
    options: ["Vrai", "Faux"],
    correctIndex: 1,
    bonneText:
      "Exact. Les données nominatives d'un mineur dans une IA grand public = violation RGPD + risque professionnel. Toujours anonymiser.",
    fausseText:
      "C'est faux. Même avec de bonnes intentions, entrer des données identifiantes d'un élève mineur dans ChatGPT gratuit est une violation RGPD.",
  },
  {
    num: "Question 4",
    statement: "Quel outil est recommandé pour un usage professionnel en établissement scolaire ?",
    options: ["Gemini (Google)", "ChatGPT gratuit", "Euria"],
    correctIndex: 2,
    bonneText:
      "Parfait. Euria garantit la non-fuite des données. Vos élèves et vous êtes protégés. En plus, Euria est une alternative écologique.",
    fausseText:
      "Ni Gemini ni ChatGPT gratuit ne protègent correctement vos données. Euria, Mistral Le Chat Pro et MIA Seconde sont les outils recommandés.",
  },
  {
    num: "Question 5",
    // NOTE : énoncé repris de Q4 dans la maquette (copier-coller designer), à corriger.
    statement: "Quel outil est recommandé pour un usage professionnel en établissement scolaire ?",
    options: [
      "Corriger les copies à sa place",
      "Récupérer du temps sur les tâches répétitives",
      "Remplacer la préparation de cours",
    ],
    correctIndex: 1,
    bonneText:
      "C'est exactement ça. Le temps qu'elle vous rend, c'est du temps pour enseigner. Pas pour déléguer ce qui fait la richesse du métier.",
    fausseText:
      "L'IA ne corrige pas à votre place et ne remplace pas votre préparation. Elle vous libère des tâches répétitives pour que vous puissiez vous concentrer sur l'essentiel.",
  },
];
