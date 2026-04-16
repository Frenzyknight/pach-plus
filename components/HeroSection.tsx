"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import PackageCarousel from "./PackageCarousel";

const PACKAGES = [
  {
    src: "/package.png",
    alt: "Happy Muscles",
    bg: "#E9D5FF",
    accent: "#574092",
    accentLight: "#896CC4",
    heading: { bold1: "REC", light: "O", bold2: "VERY" },
    label: "Daily Recovery",
    ingredients: ["Magnesium", "Turmeric", "Arnica"],
    description:
      "Experience the future of wellness with pach+\u2019s tailored transdermal recovery.",
  },
  {
    src: "/package2.png",
    alt: "Happy Breathe",
    bg: "#DBEAFE",
    accent: "#1E3A8A",
    accentLight: "#93C5FD",
    heading: { bold1: "BRE", light: "A", bold2: "THE" },
    label: "Nasal Comfort",
    ingredients: ["Eucalyptus", "Menthol", "Peppermint"],
    description:
      "Breathe easy with pach+\u2019s plant-based nasal comfort patch.",
  },
  {
    src: "/package3.png",
    alt: "Happy Hormones (for Her)",
    bg: "#FCE7F3",
    accent: "#BE185D",
    accentLight: "#F9A8D4",
    heading: { bold1: "BAL", light: "A", bold2: "NCE" },
    label: "Hormonal Balance",
    ingredients: ["Vitex", "Inositol", "Chasteberry"],
    description:
      "Support your daily hormonal balance with pach+\u2019s PCOS support patch.",
  },
  {
    src: "/package4.png",
    alt: "Happy Gut",
    bg: "#D1FAE5",
    accent: "#065F46",
    accentLight: "#6EE7B7",
    heading: { bold1: "NO", light: "U", bold2: "RISH" },
    label: "Gut Health",
    ingredients: ["Ginger", "Probiotics", "Peppermint"],
    description:
      "Boost your metabolism and gut health with pach+\u2019s transdermal patch.",
  },
];

const CAROUSEL_IMAGES = PACKAGES.map(({ src, alt }) => ({ src, alt }));

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

  const sectionRef = useRef<HTMLElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevIndex = useRef(0);

  const pkg = PACKAGES[currentIndex];
  const displayPkg = PACKAGES[displayIndex];

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
    setTimerKey((k) => k + 1);
  }, []);

  // Auto-cycle timer
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % PACKAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, [timerKey]);

  // Text crossfade: hide text, swap content after fade-out, then reveal
  useEffect(() => {
    if (displayIndex === currentIndex) return;
    setTextVisible(false);
    const timeout = setTimeout(() => {
      setDisplayIndex(currentIndex);
      setTextVisible(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, [currentIndex, displayIndex]);

  // GSAP: background color + SVG dot fills + button base color
  useEffect(() => {
    const prev = prevIndex.current;
    if (prev === currentIndex) return;

    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundColor: pkg.bg,
        duration: 0.8,
        ease: "power2.inOut",
      });
    }

    dotRefs.current.forEach((el) => {
      if (el) gsap.to(el, { attr: { fill: pkg.accent }, duration: 0.7 });
    });

    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        backgroundColor: pkg.accentLight,
        duration: 0.5,
      });
    }

    prevIndex.current = currentIndex;
  }, [currentIndex, pkg.bg, pkg.accent, pkg.accentLight]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: PACKAGES[0].bg }}
    >
      {/* Preload all package images (rendered but invisible) */}
      <div aria-hidden className="absolute w-0 h-0 overflow-hidden">
        {PACKAGES.map((p) => (
          <Image key={p.src} src={p.src} alt="" width={300} height={430} />
        ))}
      </div>

      {/* Giant Display Text */}
      <div className="absolute top-[3%] lg:top-[5%] inset-x-0 z-1 pointer-events-none select-none overflow-hidden">
        <div className="flex items-end px-8">
          <h1
            className="whitespace-nowrap leading-[0.85] tracking-[-0.04em] text-foreground pt-18 transition-all duration-300"
            style={{
              fontSize: "clamp(5rem, 15.5vw, 20rem)",
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(8px)",
            }}
          >
            <span className="font-bold">{displayPkg.heading.bold1}</span>
            <span className="font-extralight">{displayPkg.heading.light}</span>
            <span className="font-bold">{displayPkg.heading.bold2}</span>
          </h1>
          <FlowerIcon
            className="w-[4.5vw] h-[4.5vw] min-w-7 min-h-7 shrink-0 mb-[1.5vw] ml-[0.3vw] transition-colors duration-700"
            color={pkg.accent}
          />
        </div>
      </div>

      {/* Orbital Decoration + Carousel */}
      <div className="absolute inset-0 flex items-center justify-center z-5 translate-y-[14%]">
        <svg
          className="absolute w-[55vw] h-[55vw] max-w-[700px] max-h-[700px]"
          viewBox="0 0 700 700"
          fill="none"
        >
          <circle cx="350" cy="350" r="320" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <circle cx="350" cy="350" r="230" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <circle cx="350" cy="350" r="140" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />

          <line x1="70" y1="150" x2="630" y2="550" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
          <line x1="630" y1="150" x2="70" y2="550" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />
          <line x1="30" y1="350" x2="670" y2="350" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" />

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
      <div className="absolute right-6 lg:right-12 top-[22%] lg:top-[42%] z-20 max-w-[240px] hidden md:flex flex-col items-end gap-4">
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
        <div className="flex items-center gap-3">
          <span className="block w-20 h-px bg-foreground/15" />
          <button
            ref={buttonRef}
            className="px-5 py-2.5 rounded-full text-white text-[10px] font-medium tracking-[0.12em] uppercase cursor-pointer whitespace-nowrap transition-colors duration-200"
            style={{ backgroundColor: PACKAGES[0].accentLight }}
            onMouseEnter={() => {
              if (buttonRef.current)
                gsap.to(buttonRef.current, {
                  backgroundColor: PACKAGES[currentIndex].accent,
                  duration: 0.2,
                });
            }}
            onMouseLeave={() => {
              if (buttonRef.current)
                gsap.to(buttonRef.current, {
                  backgroundColor: PACKAGES[currentIndex].accentLight,
                  duration: 0.2,
                });
            }}
          >
            Explore Science
          </button>
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
