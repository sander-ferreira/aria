"use client";

import { useEffect } from "react";

import { markDangersRead, markOnboarding } from "@/lib/progress";

/**
 * Enregistre un acquis du parcours dès l'affichage de la page (gain d'XP).
 * Permet de tracer la progression depuis une page serveur sans la convertir
 * en composant client. Ne rend rien.
 */
export default function ProgressTracker({ event }: { event: "onboarding" | "dangersRead" }) {
  useEffect(() => {
    if (event === "onboarding") markOnboarding();
    else if (event === "dangersRead") markDangersRead();
  }, [event]);

  return null;
}
