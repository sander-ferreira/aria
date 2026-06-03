/**
 * En-tête de progression des écrans "intro" de module (Possibilités, Limites…).
 * Barre de 5 segments dont `step` pleins, libellé "Étape N" et pastille XP.
 */
export default function ProgressHeader({
  step,
  xp,
  totalSteps = 5,
}: {
  step: number;
  xp: string;
  totalSteps?: number;
}) {
  return (
    <header className="flex items-center gap-4 px-6 pt-6 pb-2">
      <span className="text-[14px] leading-5 font-black text-aria-violet">Étape {step}</span>
      <div className="flex h-1 flex-1 items-stretch gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-full bg-aria-violet"
            style={{ opacity: i < step ? 1 : 0.2 }}
          />
        ))}
      </div>
      <span className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-aria-creme px-4 py-2 text-[14px] leading-5 font-black text-aria-violet shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
        {xp}
      </span>
    </header>
  );
}
