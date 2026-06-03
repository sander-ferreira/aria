import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

type CardData = {
  num: string;
  text: string;
  /** Lien vers l'écran de détail du cas */
  href: string;
  /** Couleur de fond de la carte */
  bg: string;
  /** Couleur du texte + intitulé */
  accent: string;
  /** Couleur de fond de la pastille flèche */
  circleBg: string;
  /** Couleur de la flèche */
  arrow: string;
};

const CARDS: CardData[] = [
  {
    num: "Cas 1",
    text: "Expliquer un concept difficile autrement",
    href: "/possibilites/cas/1",
    bg: "bg-aria-lavande",
    accent: "text-aria-lime",
    circleBg: "bg-aria-lime",
    arrow: "text-aria-lavande",
  },
  {
    num: "Cas 2",
    text: "Différencier un exercice selon les niveaux",
    href: "/possibilites/cas/2",
    bg: "bg-aria-orange",
    accent: "text-aria-creme",
    circleBg: "bg-aria-creme",
    arrow: "text-aria-orange",
  },
  {
    num: "Cas 3",
    text: "Préparer une séquence de cours",
    href: "/possibilites/cas/3",
    bg: "bg-aria-violet",
    accent: "text-aria-lime",
    circleBg: "bg-aria-lime",
    arrow: "text-aria-violet",
  },
  {
    num: "Cas 4",
    text: "Rédiger un mail délicat aux parents",
    href: "/possibilites/cas/4",
    bg: "bg-aria-lime",
    accent: "text-aria-violet",
    circleBg: "bg-aria-violet",
    arrow: "text-aria-lime",
  },
];

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 13 13"
      fill="none"
      className={className}
      aria-hidden="true"
      width={13}
      height={13}
    >
      <path
        d="M6.15719 0.248322C6.48828 -0.0827731 7.02497 -0.0827731 7.35606 0.248322L12.7515 5.6438C13.0826 5.97489 13.0826 6.51157 12.7515 6.84267L7.35606 12.2381C7.02496 12.5692 6.48828 12.5692 6.15719 12.2381C5.82609 11.907 5.82609 11.3704 6.15719 11.0393L10.1054 7.09105L0.84782 7.09105C0.379582 7.09105 0 6.71147 0 6.24323C0 5.77499 0.379582 5.39541 0.84782 5.39541L10.1054 5.39541L6.15719 1.44719C5.82609 1.1161 5.82609 0.579416 6.15719 0.248322Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ProgressHeader() {
  return (
    <header className="flex items-center gap-4 px-6 pt-6 pb-2">
      <span className="text-[14px] leading-5 font-black text-aria-violet">
        Étape 2
      </span>
      {/* Barre de progression */}
      <div className="flex h-1 flex-1 items-stretch gap-2">
        {[1, 0.2, 0.2, 0.2].map((opacity, i) => (
          <span
            key={i}
            className="flex-1 rounded-full bg-aria-violet"
            style={{ opacity }}
          />
        ))}
      </div>
      <span className="flex shrink-0 items-center justify-center whitespace-nowrap rounded-full bg-aria-creme px-4 py-2 text-[14px] leading-5 font-black text-aria-violet shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
        200 XP
      </span>
    </header>
  );
}

export default function PossibilitesPage() {
  return (
    <main className="font-satoshi flex h-dvh w-full flex-col overflow-hidden bg-aria-creme">
      <ProgressHeader />

      {/* En-tête : mascotte Aria + bulle de dialogue */}
      <section className="flex items-end gap-2 px-6 pt-8">
        <Image
          src="/images/aria-mascot.svg"
          alt="Aria, la mascotte"
          width={79}
          height={94}
          priority
          className="h-[94px] w-[79px] shrink-0"
        />
        {/* Bulle */}
        <div className="relative flex-1">
          <div className="absolute top-1/2 -left-[14px] h-0 w-0 -translate-y-1/2 border-y-[14px] border-r-[16px] border-y-transparent border-r-aria-creme" />
          <div className="flex flex-col gap-5 rounded-2xl bg-aria-creme p-5 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.12)]">
            <h1 className="text-[16px] leading-7 font-black text-aria-violet">
              Les possibilités
            </h1>
            <p className="text-[14px] leading-[18px] font-medium text-aria-violet">
              Et si l&apos;IA vous rendait une heure par jour&nbsp;? Voilà 4 cas
              concrets qu&apos;elle peut faire pour vous.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-auto flex flex-col">
        {CARDS.map((card, i) => (
          <Link
            key={card.num}
            href={card.href as Route}
            className={`relative flex flex-col gap-4 rounded-t-2xl px-6 pt-6 pb-11 transition-transform duration-150 active:scale-[0.98] ${card.bg} ${
              i > 0 ? "-mt-5" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-[16px] leading-7 font-bold ${card.accent}`}
              >
                {card.num}
              </span>
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full ${card.circleBg}`}
              >
                <ArrowIcon className={card.arrow} />
              </span>
            </div>
            <p className={`text-[24px] leading-7 font-black ${card.accent}`}>
              {card.text}
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
