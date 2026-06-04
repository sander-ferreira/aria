"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Gestion de l'XP gagné au cours du parcours (persistance par session).
 *
 * 4 badges, 700 XP au total si tout est à 100 % :
 *  - Curieux      : 50 XP  (fin de l'onboarding)
 *  - Premiers Pas : 50 XP / cas vu               → 200 XP max (4 cas)
 *  - Responsable  : 50 XP / erreur "limites" trouvée du premier coup (max 100)
 *                   + 100 XP pour avoir lu tous les dangers           → 200 XP max
 *  - Engagé       : 50 XP / bonne réponse au quiz → 250 XP max (5 questions)
 */

const STORAGE_KEY = "aria-progress";
/** Événement déclenché dans l'onglet à chaque écriture du store (gain d'XP). */
export const PROGRESS_CHANGE_EVENT = "aria-progress-change";

export const XP = {
  curieux: 50,
  parCas: 50,
  parLimite: 50,
  dangers: 100,
  parQuiz: 50,
} as const;

export const MAX_XP = 700;

export type ProgressState = {
  /** Onboarding terminé → badge Curieux */
  onboarding: boolean;
  /** Identifiants des cas "possibilités" consultés */
  casVus: string[];
  /** XP gagnée sur l'exercice "limites" (0, 50 ou 100) */
  limitesXp: number;
  /** Tous les dangers ont été lus */
  dangersRead: boolean;
  /** Bonnes réponses au quiz */
  quizCorrect: number;
  /** Nombre total de questions du quiz (au moment de la réponse) */
  quizTotal: number;
  /** Quiz terminé */
  quizDone: boolean;
};

const DEFAULT_STATE: ProgressState = {
  onboarding: false,
  casVus: [],
  limitesXp: 0,
  dangersRead: false,
  quizCorrect: 0,
  quizTotal: 0,
  quizDone: false,
};

export type XpBreakdown = {
  curieux: number;
  premiersPas: number;
  responsable: number;
  engage: number;
  total: number;
};

export function computeXp(state: ProgressState): XpBreakdown {
  const curieux = state.onboarding ? XP.curieux : 0;
  const premiersPas = state.casVus.length * XP.parCas;
  const responsable = state.limitesXp + (state.dangersRead ? XP.dangers : 0);
  const engage = state.quizCorrect * XP.parQuiz;
  return {
    curieux,
    premiersPas,
    responsable,
    engage,
    total: curieux + premiersPas + responsable + engage,
  };
}

/* --- Lecture / écriture brute (client uniquement) --- */

function rawValue(): string {
  if (typeof window === "undefined") return "";
  return window.sessionStorage.getItem(STORAGE_KEY) ?? "";
}

function parse(raw: string): ProgressState {
  if (!raw) return DEFAULT_STATE;
  try {
    return { ...DEFAULT_STATE, ...(JSON.parse(raw) as Partial<ProgressState>) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function readProgress(): ProgressState {
  return parse(rawValue());
}

function commit(state: ProgressState) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Notifie les abonnés du même onglet (l'event "storage" ne se déclenche qu'entre onglets)
  window.dispatchEvent(new Event(PROGRESS_CHANGE_EVENT));
}

function update(patch: (state: ProgressState) => ProgressState) {
  commit(patch(readProgress()));
}

/* --- Mutations métier --- */

export function markOnboarding() {
  update((s) => (s.onboarding ? s : { ...s, onboarding: true }));
}

export function addCasVu(id: string) {
  update((s) => (s.casVus.includes(id) ? s : { ...s, casVus: [...s.casVus, id] }));
}

export function getCasVus(): string[] {
  return readProgress().casVus;
}

/** Enregistre l'XP "limites" (on garde le meilleur résultat). */
export function recordLimites(xp: number) {
  update((s) => ({ ...s, limitesXp: Math.max(s.limitesXp, xp) }));
}

export function markDangersRead() {
  update((s) => (s.dangersRead ? s : { ...s, dangersRead: true }));
}

/** Démarre (ou recommence) le quiz : remet le score à zéro. */
export function startQuiz(total: number) {
  update((s) => ({ ...s, quizTotal: total, quizCorrect: 0, quizDone: false }));
}

/** Comptabilise une bonne réponse (+50 XP, déclenche l'animation). */
export function addQuizCorrect() {
  update((s) => ({ ...s, quizCorrect: s.quizCorrect + 1 }));
}

/** Marque le quiz comme terminé (sans modifier le score). */
export function finishQuiz() {
  update((s) => ({ ...s, quizDone: true }));
}

export function resetProgress() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(PROGRESS_CHANGE_EVENT));
}

/* --- Hook React --- */

function subscribe(callback: () => void): () => void {
  window.addEventListener(PROGRESS_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(PROGRESS_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/**
 * État de progression réactif. Côté serveur (et au 1er rendu d'hydratation),
 * renvoie l'état par défaut (XP à 0), puis se met à jour avec la valeur réelle.
 */
export function useProgress(): { state: ProgressState; xp: XpBreakdown } {
  const raw = useSyncExternalStore(subscribe, rawValue, () => "");
  const state = useMemo(() => parse(raw), [raw]);
  const xp = useMemo(() => computeXp(state), [state]);
  return { state, xp };
}
