import AriaHeroMascot from "@/components/aria-hero-mascot";

/**
 * Page finale du parcours (maquette node 144-4635) — après les résultats du quiz.
 * Fond violet, accroche + CTA lime « Télécharger le kit complet », grande
 * mascotte débordant en bas. Mobile-first.
 */
export default function FinPage() {
  return (
    <main className="font-satoshi relative flex h-dvh w-full flex-col overflow-hidden bg-aria-violet">
      <div className="flex flex-col gap-8 px-6 pt-32">
        <h1 className="text-[24px] leading-7 font-black text-aria-creme">
          Prêt à mettre ces outils en pratique avec vos élèves dès aujourd&apos;hui&nbsp;?
          Téléchargez gratuitement l&apos;intégralité des ressources pour structurer vos séances
          dès maintenant.
        </h1>
        {/* TODO : brancher l'URL réelle de téléchargement du kit */}
        <a
          href="#"
          className="flex w-full items-center justify-center rounded-lg bg-aria-lime px-5 py-5 text-center text-[16px] leading-5 font-black text-aria-violet transition-transform active:scale-[0.98]"
        >
          Télécharger le kit complet
        </a>
      </div>

      <AriaHeroMascot />
    </main>
  );
}
