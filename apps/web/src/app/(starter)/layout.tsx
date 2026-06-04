import Header from "@/components/header";

/**
 * Layout du starter (pages de démo : home, login).
 * Porte le Header de navigation. Les écrans de l'app (PWA, issus de la maquette)
 * vivent hors de ce groupe et s'affichent en plein écran sans ce header.
 */
export default function StarterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid h-svh grid-rows-[auto_1fr]">
      <Header />
      {children}
    </div>
  );
}
