"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import ProgressHeader from "@/components/progress-header";
import { QUIZ } from "@/app/quiz/quiz-data";
import { addQuizCorrect, finishQuiz, startQuiz } from "@/lib/progress";

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" />
    </svg>
  );
}

const FINISH_HREF = "/quiz/badge";

export default function Quiz() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const q = QUIZ[current];
  const answered = selected !== null;
  const isCorrect = selected === q.correctIndex;
  const isLast = current === QUIZ.length - 1;

  // Démarre le quiz (score remis à zéro) → 50 XP comptabilisés à chaque bonne réponse
  useEffect(() => {
    startQuiz(QUIZ.length);
  }, []);

  // Répond à la question : une bonne réponse rapporte +50 XP (animation immédiate)
  function answer(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === q.correctIndex) addQuizCorrect();
  }

  function next() {
    if (!answered) return;
    if (isLast) {
      finishQuiz();
      router.push(FINISH_HREF);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
  }

  return (
    <main className="font-satoshi flex min-h-dvh w-full flex-col bg-aria-creme pb-8">
      <ProgressHeader step={4} totalSteps={4} />

      <div className="flex flex-1 flex-col gap-8 px-6 pt-6">
        {/* Intitulé */}
        <div className="flex flex-col gap-5">
          <span className="text-[16px] leading-7 font-bold text-aria-lavande">{q.num}</span>
          <h1 className="text-[24px] leading-7 font-black text-aria-violet">{q.statement}</h1>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {q.options.map((opt, i) => {
            const correct = i === q.correctIndex;
            const wrongPick = answered && i === selected && !correct;
            let cls = "border-2 border-aria-lavande text-aria-violet";
            if (answered && correct) cls = "bg-aria-lime text-aria-violet";
            else if (wrongPick) cls = "bg-aria-orange text-aria-creme";
            else if (answered) cls = "border-2 border-aria-lavande text-aria-violet opacity-50";
            return (
              <button
                key={opt}
                type="button"
                disabled={answered}
                onClick={() => answer(i)}
                className={`flex items-center justify-between rounded-lg px-5 py-8 text-left text-[16px] leading-5 font-black transition-colors ${cls}`}
              >
                <span>{opt}</span>
                {answered && correct && <CheckIcon className="h-5 w-5 shrink-0" />}
                {wrongPick && <CrossIcon className="h-5 w-5 shrink-0" />}
              </button>
            );
          })}
        </div>

        {/* Feedback : mascotte + bulle (maquette 79-1353) */}
        <AnimatePresence>
          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex items-end gap-5"
            >
              <Image
                src={isCorrect ? "/images/aria-mascot-exercice-ok.png" : "/images/aria-mascot-faux.png"}
                alt="Aria"
                width={87}
                height={104}
                priority
                className="h-[104px] w-[87px] shrink-0"
              />
              {/* Bulle — drop-shadow (filtre) → ombre unique bulle + pointe */}
              <div className="relative flex-1 drop-shadow-[0px_2px_12px_rgba(0,0,0,0.12)]">
                <div
                  className={`flex flex-col gap-2 rounded-2xl p-5 ${
                    isCorrect ? "bg-aria-lime" : "bg-aria-orange"
                  }`}
                >
                  <p
                    className={`text-[16px] leading-7 font-black ${
                      isCorrect ? "text-aria-violet" : "text-aria-creme"
                    }`}
                  >
                    {isCorrect ? "Bonne réponse !" : "Pas tout à fait…"}
                  </p>
                  <p
                    className={`text-[14px] leading-[18px] font-medium ${
                      isCorrect ? "text-aria-violet" : "text-aria-creme"
                    }`}
                  >
                    {isCorrect ? q.bonneText : q.fausseText}
                  </p>
                </div>
                {/* Pointe : triangle vers la mascotte (gauche), même couleur que la bulle */}
                <div
                  aria-hidden
                  style={{ clipPath: "polygon(100% 0, 100% 100%, 0 50%)" }}
                  className={`absolute top-1/2 right-full -mr-[2px] h-7 w-[18px] -translate-y-1/2 ${
                    isCorrect ? "bg-aria-lime" : "bg-aria-orange"
                  }`}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA */}
      <div className="px-6 pt-6">
        <button
          type="button"
          onClick={next}
          disabled={!answered}
          className={`flex w-full items-center justify-center rounded-lg px-5 py-5 text-[16px] leading-5 font-black text-aria-creme transition-transform active:scale-[0.98] ${
            answered ? "bg-aria-violet" : "bg-aria-violet/20"
          }`}
        >
          {isLast ? "Voir mes résultats" : "Question suivante"}
        </button>
      </div>
    </main>
  );
}
