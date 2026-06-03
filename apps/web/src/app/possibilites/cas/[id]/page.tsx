import { notFound } from "next/navigation";

import CasDetail from "@/components/cas-detail";

import { CAS_DATA } from "../cas-data";

export function generateStaticParams() {
  return Object.keys(CAS_DATA).map((id) => ({ id }));
}

export default async function CasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = CAS_DATA[id];

  if (!data) {
    notFound();
  }

  return <CasDetail data={data} />;
}
