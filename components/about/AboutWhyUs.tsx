import Link from "next/link";
import type { ReactNode } from "react";

interface ValueCard {
  title: string;
  description: string;
  discBg: string;
  icon: ReactNode;
}

function LeafFlaskIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M9 3h6" />
      <path d="M10 3v6L5.5 17.5A2.5 2.5 0 0 0 7.75 21h8.5a2.5 2.5 0 0 0 2.25-3.5L14 9V3" />
      <path d="M9 14c1.5-1.5 4-1.5 6 0" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z" />
      <path d="M5 19c3-3 7-6 12-9" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const CARDS: ValueCard[] = [
  {
    title: "Transparent science",
    description:
      "Every active is named, dosed and explained. No proprietary blends, no fine print.",
    discBg: "bg-teal-100",
    icon: <LeafFlaskIcon />,
  },
  {
    title: "Precision dosing",
    description:
      "Measured, controlled-release delivery so each patch works steadily through your day.",
    discBg: "bg-gold-100",
    icon: <TargetIcon />,
  },
  {
    title: "Plant-first formulas",
    description:
      "Botanicals and minerals lead the recipe. Synthetics only when nothing else will do.",
    discBg: "bg-purple-100",
    icon: <LeafIcon />,
  },
  {
    title: "Made for daily life",
    description:
      "Discreet, breathable patches that move with you \u2014 from workouts to long-haul flights.",
    discBg: "bg-pink-100",
    icon: <ClockIcon />,
  },
];

function Card({ card }: { card: ValueCard }) {
  return (
    <article className="flex h-full flex-col rounded-[28px] bg-[#F4F2EE] p-6 transition-colors duration-300 hover:bg-[#EFEDE7] lg:p-7">
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-full text-slate-900 ${card.discBg}`}
        aria-hidden="true"
      >
        {card.icon}
      </span>
      <h3 className="mt-6 text-[20px] font-black leading-tight tracking-[-0.02em] text-slate-900 lg:text-[22px]">
        {card.title}
      </h3>
      <p className="mt-2 text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm">
        {card.description}
      </p>
    </article>
  );
}

function TitleBlock() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[28px] px-6 py-12 text-center lg:px-8 lg:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(13,62,50,0.12)_1px,transparent_1px)] bg-size-[18px_18px]"
      />
      <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-teal-800/60 sm:mb-4 sm:text-xs">
        Why pach+
      </p>
      <h2 className="max-w-[420px] text-[1.9rem] font-black leading-[0.95] tracking-[-0.055em] text-slate-900 xs:text-[2.35rem] sm:text-5xl lg:text-[clamp(2.25rem,2.6vw,3rem)]">
        Why people choose us.
      </h2>
      <p className="mt-5 max-w-[360px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm">
        Four small commitments that add up to a wellness routine you can actually
        feel &mdash; rooted in plants, backed by science.
      </p>
      <Link
        href="/science"
        className="mt-7 inline-flex items-center gap-1.5 rounded-full border border-teal-900/20 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-teal-900 transition-colors hover:bg-teal-900 hover:text-white"
      >
        Learn more
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3.5 w-3.5"
          aria-hidden="true"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </Link>
    </div>
  );
}

export default function AboutWhyUs() {
  return (
    <section className="bg-white px-5 py-20 xs:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Desktop: 3-column layout with title in the center, cards in side columns */}
        <div className="hidden grid-cols-3 gap-6 lg:grid lg:gap-8">
          <div className="flex flex-col gap-6 lg:gap-8">
            <Card card={CARDS[0]} />
            <Card card={CARDS[2]} />
          </div>
          <TitleBlock />
          <div className="flex flex-col gap-6 lg:gap-8">
            <Card card={CARDS[1]} />
            <Card card={CARDS[3]} />
          </div>
        </div>

        {/* Mobile / tablet: title block, then 2-col card grid */}
        <div className="lg:hidden">
          <TitleBlock />
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            {CARDS.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
