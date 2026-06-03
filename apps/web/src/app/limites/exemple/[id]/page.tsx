import { notFound } from "next/navigation";

import LimiteExercice from "@/components/limite-exercice";

import { EXERCICES } from "../exercice-data";

export function generateStaticParams() {
  return Object.keys(EXERCICES).map((id) => ({ id }));
}

export default async function LimiteExemplePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = EXERCICES[id];

  if (!data) {
    notFound();
  }

  return <LimiteExercice data={data} />;
}
