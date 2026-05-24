"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";

interface ValueCard {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  discBg: string;
  ringColor: string;
  icon: ReactNode;
}

const ROTATION_MS = 8000;
const RING_RADIUS = 26.5;
const RING_INSET = 1.5;
const RING_START_OFFSET = 90;

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
    imageSrc: "/transparent-science.jpeg",
    imageAlt: "Scientist in lab holding petri dish",
    discBg: "bg-purple-100",
    ringColor: "#574092",
    icon: <LeafFlaskIcon />,
  },
  {
    title: "Precision dosing",
    description:
      "Measured, controlled-release delivery so each patch works steadily through your day.",
    imageSrc: "/precision-dosing.jpeg",
    imageAlt: "Robotic arms precision-filling patches on a conveyor belt",
    discBg: "bg-gold-100",
    ringColor: "#FFCD49",
    icon: <TargetIcon />,
  },
  {
    title: "Plant-first formulas",
    description:
      "Botanicals and minerals lead the recipe. Synthetics only when nothing else will do.",
    imageSrc: "/plant-ingredients.jpeg",
    imageAlt: "Botanical herbs and plant extracts laid out on a yellow surface",
    discBg: "bg-teal-100",
    ringColor: "#33957B",
    icon: <LeafIcon />,
  },
  {
    title: "Made for daily life",
    description:
      "Discreet, breathable patches that move with you \u2014 from workouts to long-haul flights.",
    imageSrc: "/flight-sleep.jpeg",
    imageAlt: "Woman sleeping on a plane wearing a pach+ patch",
    discBg: "bg-pink-100",
    ringColor: "#F088B8",
    icon: <ClockIcon />,
  },
];

interface CardProps {
  card: ValueCard;
  isActive: boolean;
  isPaused: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

function Card({ card, isActive, isPaused, onHoverStart, onHoverEnd }: CardProps) {
  return (
    <motion.article
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      variants={revealItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`relative flex h-[420px] flex-col overflow-hidden rounded-[28px] bg-[#F4F2EE] transition-colors duration-300 lg:h-[440px] ${
        isActive ? "bg-[#EFEDE7]" : ""
      }`}
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <Image
          src={card.imageSrc}
          alt={card.imageAlt}
          width={600}
          height={400}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="shrink-0 flex flex-col p-6">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-900 ${card.discBg}`}
            aria-hidden="true"
          >
            {card.icon}
          </span>
          <h3 className="text-[20px] font-black leading-tight tracking-[-0.02em] text-slate-900 lg:text-[22px]">
            {card.title}
          </h3>
        </div>
        <div
          className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
            isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <p
              className={`mt-2 text-[11px] font-medium leading-relaxed text-foreground/68 transition-opacity duration-500 ease-in-out xs:text-xs sm:text-sm ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              {card.description}
            </p>
          </div>
        </div>
      </div>
      {isActive ? (
        <ProgressRing color={card.ringColor} paused={isPaused} />
      ) : null}
    </motion.article>
  );
}

function ProgressRing({ color, paused }: { color: string; paused: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const update = () => {
      const rect = svg.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(svg);
    return () => ro.disconnect();
  }, []);

  const d = (() => {
    if (!size || size.w === 0 || size.h === 0) return "";
    const { w, h } = size;
    const r = RING_RADIUS;
    const i = RING_INSET;
    const startY = Math.min(RING_START_OFFSET, h - i - r - 1);
    return [
      `M ${i} ${startY}`,
      `L ${i} ${i + r}`,
      `A ${r} ${r} 0 0 1 ${i + r} ${i}`,
      `L ${w - i - r} ${i}`,
      `A ${r} ${r} 0 0 1 ${w - i} ${i + r}`,
      `L ${w - i} ${h - i - r}`,
      `A ${r} ${r} 0 0 1 ${w - i - r} ${h - i}`,
      `L ${i + r} ${h - i}`,
      `A ${r} ${r} 0 0 1 ${i} ${h - i - r}`,
      `L ${i} ${startY}`,
    ].join(" ");
  })();

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {d ? (
        <path
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={1}
          style={
            paused
              ? { strokeDasharray: 1, strokeDashoffset: 0 }
              : {
                  strokeDasharray: 1,
                  animation: `pach-progress-ring ${ROTATION_MS}ms linear forwards`,
                }
          }
        />
      ) : null}
      <style>{`
        @keyframes pach-progress-ring {
          from { stroke-dashoffset: 1; }
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </svg>
  );
}

function TitleBlock() {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden rounded-[28px] px-6 pb-12 text-center lg:px-8 lg:py-16">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle,rgba(13,62,50,0.12)_1px,transparent_1px)] bg-size-[18px_18px]"
      />
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4">
        Why pach+
      </p>
      <h2
        className="max-w-[460px] leading-[1.05] tracking-[-0.03em] text-foreground"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        <span className="font-bold">Why</span>{" "}
        <span className="font-extralight">people</span>{" "}
        <span className="font-bold">choose us.</span>
      </h2>
      <p className="mt-5 max-w-[360px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm">
        Four small commitments that add up to a wellness routine you can actually
        feel &mdash; rooted in plants, backed by science.
      </p>
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={{ scale: 0.97 }}
        variants={{
          rest: { y: 0 },
          hover: { y: -2 },
        }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="mt-7 inline-block"
      >
        <Link
          href="/science"
          className="inline-flex items-center gap-1.5 rounded-full border border-teal-900/20 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-teal-900 transition-colors hover:bg-teal-900 hover:text-white"
        >
          Learn more
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3.5 w-3.5"
            aria-hidden="true"
            variants={{
              rest: { x: 0 },
              hover: { x: 3 },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </motion.svg>
        </Link>
      </motion.div>
    </div>
  );
}

export default function AboutWhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const isPaused = hoveredIndex !== null;
  const displayIndex = hoveredIndex ?? activeIndex;

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % CARDS.length);
    }, ROTATION_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, isPaused]);

  const handleHoverStart = (index: number) => {
    setHoveredIndex(index);
    setActiveIndex(index);
  };
  const handleHoverEnd = () => setHoveredIndex(null);

  const renderCard = (cardIndex: number) => {
    const card = CARDS[cardIndex];
    return (
      <Card
        key={card.title}
        card={card}
        isActive={displayIndex === cardIndex}
        isPaused={isPaused}
        onHoverStart={() => handleHoverStart(cardIndex)}
        onHoverEnd={handleHoverEnd}
      />
    );
  };

  return (
    <section className="bg-white px-5 xs:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        {/* Desktop: 3-column layout with title in the center, cards in side columns */}
        <Reveal
          stagger={0.1}
          amount={0.15}
          className="hidden grid-cols-3 gap-6 lg:grid lg:gap-8"
        >
          <motion.div
            variants={revealItem}
            className="flex flex-col gap-10 lg:gap-12"
          >
            {renderCard(0)}
            {renderCard(2)}
          </motion.div>
          <motion.div variants={revealItem}>
            <TitleBlock />
          </motion.div>
          <motion.div
            variants={revealItem}
            className="flex flex-col gap-10 lg:gap-12"
          >
            {renderCard(1)}
            {renderCard(3)}
          </motion.div>
        </Reveal>

        {/* Tablet: title block, then 2-col card grid */}
        <div className="hidden sm:block lg:hidden">
          <TitleBlock />
          <Reveal
            stagger={0.08}
            amount={0.15}
            className="mt-8 grid grid-cols-2 gap-5"
          >
            {CARDS.map((_, index) => renderCard(index))}
          </Reveal>
        </div>

        {/* Mobile: title block, then carousel with arrows */}
        <div className="sm:hidden">
          <TitleBlock />
          <MobileCarousel
            activeIndex={activeIndex}
            displayIndex={displayIndex}
            isPaused={isPaused}
            onSelect={(index) => {
              setActiveIndex(index);
              setHoveredIndex(null);
            }}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
          />
        </div>
      </div>
    </section>
  );
}

interface MobileCarouselProps {
  activeIndex: number;
  displayIndex: number;
  isPaused: boolean;
  onSelect: (index: number) => void;
  onHoverStart: (index: number) => void;
  onHoverEnd: () => void;
}

function MobileCarousel({
  activeIndex,
  displayIndex,
  isPaused,
  onSelect,
  onHoverStart,
  onHoverEnd,
}: MobileCarouselProps) {
  const goPrev = () =>
    onSelect((activeIndex - 1 + CARDS.length) % CARDS.length);
  const goNext = () => onSelect((activeIndex + 1) % CARDS.length);

  return (
    <div className="relative mt-8">
      <div className="overflow-hidden rounded-[28px]">
        <motion.div
          className="flex"
          initial={false}
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 26,
            mass: 0.8,
          }}
        >
          {CARDS.map((card, index) => (
            <div key={card.title} className="w-full shrink-0 px-1">
              <Card
                card={card}
                isActive={displayIndex === index}
                isPaused={isPaused}
                onHoverStart={() => onHoverStart(index)}
                onHoverEnd={onHoverEnd}
              />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <motion.button
          type="button"
          onClick={goPrev}
          aria-label="Previous"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 360, damping: 22 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-900/20 bg-white text-teal-900 transition-colors hover:bg-teal-900 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        <div className="flex items-center gap-2" role="tablist">
          {CARDS.map((card, index) => (
            <button
              key={card.title}
              type="button"
              onClick={() => onSelect(index)}
              aria-label={`Go to ${card.title}`}
              aria-selected={activeIndex === index}
              role="tab"
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 bg-teal-900"
                  : "w-1.5 bg-teal-900/25"
              }`}
            />
          ))}
        </div>

        <motion.button
          type="button"
          onClick={goNext}
          aria-label="Next"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 360, damping: 22 }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-teal-900/20 bg-white text-teal-900 transition-colors hover:bg-teal-900 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}
