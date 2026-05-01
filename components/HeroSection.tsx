"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import PackageCarousel from "./PackageCarousel";

const PACKAGES = [
  {
    slug: "happy-muscles",
    src: "/package.png",
    alt: "Happy Muscles",
    accent: "#574092",
    accentLight: "#896CC4",
    heading: { bold1: "REC", light: "O", bold2: "VERY" },
    label: "Daily Recovery",
    ingredients: ["Magnesium", "Turmeric", "Arnica"],
    description:
      "Experience the future of wellness with pach+\u2019s tailored transdermal recovery.",
  },
  {
    slug: "happy-breathe",
    src: "/package2.png",
    alt: "Happy Breathe",
    accent: "#1E3A8A",
    accentLight: "#93C5FD",
    heading: { bold1: "BRE", light: "A", bold2: "THE" },
    label: "Nasal Comfort",
    ingredients: ["Eucalyptus", "Menthol", "Peppermint"],
    description:
      "Breathe easy with pach+\u2019s plant-based nasal comfort patch.",
  },
  {
    slug: "happy-hormones",
    src: "/package3.png",
    alt: "Happy Hormones (for Her)",
    accent: "#BE185D",
    accentLight: "#F9A8D4",
    heading: { bold1: "BAL", light: "A", bold2: "NCE" },
    label: "Hormonal Balance",
    ingredients: ["Vitex", "Inositol", "Chasteberry"],
    description:
      "Support your daily hormonal balance with pach+\u2019s PCOS support patch.",
  },
  {
    slug: "happy-gut",
    src: "/package4.png",
    alt: "Happy Gut",
    accent: "#065F46",
    accentLight: "#6EE7B7",
    heading: { bold1: "NO", light: "U", bold2: "RISH" },
    label: "Gut Health",
    ingredients: ["Ginger", "Probiotics", "Peppermint"],
    description:
      "Boost your metabolism and gut health with pach+\u2019s transdermal patch.",
  },
];

const CAROUSEL_IMAGES = PACKAGES.map(({ src, alt, slug }) => ({
  src,
  alt,
  href: `/products/${slug}`,
}));

function FlowerIcon({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 50 50"
      className={className}
      fill="currentColor"
      style={color ? { color } : undefined}
    >
      <g transform="translate(25,25)">
        <ellipse rx="7" ry="14" />
        <ellipse rx="7" ry="14" transform="rotate(72)" />
        <ellipse rx="7" ry="14" transform="rotate(144)" />
        <ellipse rx="7" ry="14" transform="rotate(216)" />
        <ellipse rx="7" ry="14" transform="rotate(288)" />
      </g>
    </svg>
  );
}

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerKey, setTimerKey] = useState(0);

  const [displayIndex, setDisplayIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const prevIndex = useRef(0);
  const currentIndexRef = useRef(0);
  const textSwapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pkg = PACKAGES[currentIndex];
  const displayPkg = PACKAGES[displayIndex];

  const updatePackage = useCallback((index: number) => {
    const nextIndex =
      ((index % PACKAGES.length) + PACKAGES.length) % PACKAGES.length;

    if (currentIndexRef.current === nextIndex) return;

    currentIndexRef.current = nextIndex;
    setCurrentIndex(nextIndex);

    if (textSwapTimeoutRef.current) {
      clearTimeout(textSwapTimeoutRef.current);
    }

    setTextVisible(false);
    textSwapTimeoutRef.current = setTimeout(() => {
      setDisplayIndex(nextIndex);
      setTextVisible(true);
      textSwapTimeoutRef.current = null;
    }, 250);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      updatePackage(index);
      setTimerKey((k) => k + 1);
    },
    [updatePackage],
  );

  // Auto-cycle timer
  useEffect(() => {
    const id = setInterval(() => {
      updatePackage(currentIndexRef.current + 1);
    }, 6000);
    return () => clearInterval(id);
  }, [timerKey, updatePackage]);

  useEffect(() => {
    return () => {
      if (textSwapTimeoutRef.current) {
        clearTimeout(textSwapTimeoutRef.current);
      }
    };
  }, []);

  // GSAP: SVG dot fills on package change
  useEffect(() => {
    const prev = prevIndex.current;
    if (prev === currentIndex) return;

    dotRefs.current.forEach((el) => {
      if (el) gsap.to(el, { attr: { fill: pkg.accent }, duration: 0.7 });
    });

    prevIndex.current = currentIndex;
  }, [currentIndex, pkg.accent]);

  return (
    <section className="relative h-svh min-h-[640px] overflow-hidden bg-background md:h-screen md:min-h-screen">
      {/* Preload all package images (rendered but invisible) */}
      <div aria-hidden className="absolute w-0 h-0 overflow-hidden">
        {PACKAGES.map((p) => (
          <Image key={p.src} src={p.src} alt="" width={300} height={430} />
        ))}
      </div>

      {/* Giant Display Text */}
      <div className="absolute top-[4%] lg:top-[5%] inset-x-0 z-1 pointer-events-none select-none overflow-hidden">
        <div className="flex items-end px-5 xs:px-8">
          <h1
            className="whitespace-nowrap leading-[0.85] tracking-[-0.04em] text-foreground pt-24 xs:pt-20 md:pt-18 transition-all duration-300"
            style={{
              fontSize: "clamp(2.85rem, 15vw, 20rem)",
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <span className="font-bold">{displayPkg.heading.bold1}</span>
            <span className="font-extralight">{displayPkg.heading.light}</span>
            <span className="font-bold">{displayPkg.heading.bold2}</span>
          </h1>
          <FlowerIcon
            className="w-[6vw] h-[6vw] min-w-5 min-h-5 max-w-16 max-h-16 shrink-0 mb-[1.5vw] ml-[0.3vw] transition-colors duration-700"
            color={pkg.accent}
          />
        </div>
        <div
          className="mx-5 mt-3 max-w-[330px] xs:mx-8 md:hidden transition-all duration-300"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(4px)",
          }}
        >
          <p className="text-[10px] font-medium tracking-[0.22em] uppercase text-foreground/80">
            {displayPkg.label}
          </p>
          <div className="mt-2 flex items-start gap-2.5">
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-foreground text-[10px] text-black">
              i
            </span>
            <p className="text-[10px] font-medium uppercase leading-[1.65] tracking-[0.05em] text-foreground/70">
              {displayPkg.description}
            </p>
          </div>
        </div>
      </div>

      {/* Orbital Decoration + Carousel */}
      <div className="absolute inset-0 flex items-center justify-center z-5 translate-y-[6%] sm:translate-y-[8%] md:translate-y-[14%]">
        <svg
          className="absolute w-[82vw] h-[82vw] max-w-[560px] max-h-[560px] text-foreground/15 md:w-[55vw] md:h-[55vw] md:max-w-[700px] md:max-h-[700px]"
          viewBox="0 0 700 700"
          fill="none"
        >
          <circle cx="350" cy="350" r="320" stroke="currentColor" strokeWidth="1" />
          <circle cx="350" cy="350" r="230" stroke="currentColor" strokeWidth="1" />
          <circle cx="350" cy="350" r="140" stroke="currentColor" strokeWidth="1" />

          <line x1="70" y1="150" x2="630" y2="550" stroke="currentColor" strokeWidth="0.8" />
          <line x1="630" y1="150" x2="70" y2="550" stroke="currentColor" strokeWidth="0.8" />
          <line x1="30" y1="350" x2="670" y2="350" stroke="currentColor" strokeWidth="0.8" />

          <circle ref={(el) => { dotRefs.current[0] = el; }} cx="145" cy="228" r="3.5" fill={PACKAGES[0].accent} />
          <circle ref={(el) => { dotRefs.current[1] = el; }} cx="555" cy="228" r="3.5" fill={PACKAGES[0].accent} />
          <circle ref={(el) => { dotRefs.current[2] = el; }} cx="490" cy="498" r="3.5" fill={PACKAGES[0].accent} />
          <circle ref={(el) => { dotRefs.current[3] = el; }} cx="350" cy="30" r="2" fill={PACKAGES[0].accent} opacity={0.4} />
          <circle ref={(el) => { dotRefs.current[4] = el; }} cx="350" cy="670" r="2" fill={PACKAGES[0].accent} opacity={0.4} />
        </svg>

        <PackageCarousel
          images={CAROUSEL_IMAGES}
          currentIndex={currentIndex}
          onDotClick={goTo}
          accentColor={pkg.accent}
        />
      </div>

      {/* Scattered decorative flowers */}
      <FlowerIcon
        className="absolute top-[36%] right-[34%] w-3.5 h-3.5 z-15 opacity-60 hidden lg:block transition-colors duration-700"
        color={pkg.accentLight}
      />
      <FlowerIcon
        className="absolute bottom-[28%] left-[44%] w-2.5 h-2.5 z-15 opacity-40 hidden lg:block transition-colors duration-700"
        color={pkg.accentLight}
      />

      {/* Left: Section Label */}
      <div className="absolute left-6 lg:left-12 top-[40%] z-20 hidden md:block">
        <p
          className="text-[10px] lg:text-[11px] font-medium tracking-[0.25em] uppercase text-foreground/80 transition-all duration-300"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {displayPkg.label}
        </p>
      </div>

      {/* Right: Description + CTA */}
      <div className="absolute right-6 top-[32%] lg:top-[42%] z-20 hidden max-w-[320px] flex-col items-end gap-4 md:flex lg:right-12">
        <div className="flex items-start gap-3">
          <span className="shrink-0 w-[18px] h-[18px] rounded-full border border-foreground flex items-center justify-center text-[12px] mt-0.5 text-black">
            i
          </span>
          <p
            className="text-[10px] lg:text-[11px] tracking-[0.06em] uppercase leading-[1.8] text-foreground/70 text-right transition-all duration-300"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {displayPkg.description}
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="hidden lg:block w-12 h-px bg-foreground/15" />
          <button
            type="button"
            className="px-5 py-2.5 rounded-full text-white text-[10px] font-medium tracking-[0.12em] uppercase cursor-pointer whitespace-nowrap transition-all duration-200 hover:brightness-95 hover:-translate-y-0.5"
            style={{ backgroundColor: pkg.accentLight }}
          >
            Explore Science
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-full text-white text-[10px] font-semibold tracking-[0.12em] uppercase cursor-pointer whitespace-nowrap shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-all duration-200 hover:brightness-90 hover:-translate-y-0.5"
            style={{ backgroundColor: pkg.accent }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Mobile: CTAs */}
      <div className="absolute inset-x-5 bottom-7 z-20 md:hidden">
        <div className="flex w-full flex-col items-center text-center">
          <div className="grid w-full grid-cols-1 gap-2.5 xs:grid-cols-2">
            <button
              type="button"
              className="w-full rounded-full px-4 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.08)] transition-all duration-200 active:scale-[0.98]"
              style={{ backgroundColor: pkg.accentLight }}
            >
              Explore Science
            </button>
            <button
              type="button"
              className="w-full rounded-full px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-all duration-200 active:scale-[0.98]"
              style={{ backgroundColor: pkg.accent }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Ingredient Labels */}
      <div className="absolute left-[8%] lg:left-[11%] top-[52%] z-20 hidden lg:block">
        <p
          className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/80 transition-all duration-300"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {displayPkg.ingredients[0]}
        </p>
      </div>
      <div className="absolute right-[8%] lg:right-[11%] top-[32%] z-20 hidden lg:block">
        <p
          className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/80 transition-all duration-300"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {displayPkg.ingredients[1]}
        </p>
      </div>
      <div className="absolute right-[8%] lg:right-[11%] bottom-[18%] z-20 hidden lg:block">
        <p
          className="text-[10px] font-medium tracking-[0.2em] uppercase text-foreground/80 transition-all duration-300"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {displayPkg.ingredients[2]}
        </p>
      </div>
    </section>
  );
}
