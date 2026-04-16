"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const PouchScene = dynamic(() => import("./PouchScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  teal: { main: "#1A715E", light: "#B8E4DA", bg: "#EAF5F1" },
  purple: { main: "#574092", light: "#D8C9FF", bg: "#F0EBF8" },
  pink: { main: "#BA3F82", light: "#FFC0E2", bg: "#FDF0F6" },
};

const CARDS = [
  {
    color: COLORS.teal,
    heading: "RECOVERY",
    body: "Targeted transdermal delivery. 24-hour muscle recovery through your skin.",
  },
  {
    color: COLORS.purple,
    heading: "SCIENCE",
    body: "Clinically-backed ingredients. Precision-dosed for maximum bioavailability.",
  },
  {
    color: COLORS.pink,
    heading: "BALANCE",
    body: "Hormonal harmony, naturally. Plant-based support that works while you live.",
  },
];

const BEZIER_PATHS = [
  "M -50 750 C 200 250, 500 900, 720 450 C 940 0, 1150 600, 1490 200",
  "M 1490 150 C 1200 650, 900 -50, 720 500 C 540 950, 250 200, -50 550",
  "M -50 850 C 300 350, 550 950, 720 550 C 890 150, 1100 800, 1490 400",
];

const PATH_COLORS = [COLORS.teal.main, COLORS.purple.main, COLORS.pink.main];

function SmileyIcon({ color, size = 56 }: { color: string; size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} fill="none">
      <circle cx="30" cy="30" r="28" stroke={color} strokeWidth="2" />
      <circle cx="22" cy="24" r="2.5" fill={color} />
      <circle cx="38" cy="24" r="2.5" fill={color} />
      <path
        d="M 20 36 Q 30 46 40 36"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function WellnessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingLineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pouchWrapperRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const pathLengths = useRef<number[]>([0, 0, 0]);
  const pathProxies = useRef([
    { draw: 0, erase: 0 },
    { draw: 0, erase: 0 },
    { draw: 0, erase: 0 },
  ]);

  useEffect(() => {
    pathRefs.current.forEach((el, i) => {
      if (!el) return;
      const len = el.getTotalLength();
      pathLengths.current[i] = len;
      el.style.strokeDasharray = `0 ${len}`;
      el.style.strokeDashoffset = "0";
    });

    headingLineRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 40 });
    });
    cardRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 80 });
    });
    if (pouchWrapperRef.current) {
      gsap.set(pouchWrapperRef.current, { opacity: 0 });
    }

    const updatePaths = () => {
      pathProxies.current.forEach((proxy, i) => {
        const el = pathRefs.current[i];
        if (!el) return;
        const len = pathLengths.current[i];
        const V = Math.max(0, (proxy.draw - proxy.erase) * len);
        const S = proxy.erase * len;
        el.style.strokeDasharray = `${V} ${len}`;
        el.style.strokeDashoffset = `${-S}`;
      });
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          updatePaths();
        },
      },
    });

    // --- Heading: staggered reveal then fade out ---
    headingLineRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(
        el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        i * 0.15,
      );
    });
    headingLineRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(
        el,
        { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" },
        1.5,
      );
    });

    // --- Pouch fade in alongside heading fade out ---
    if (pouchWrapperRef.current) {
      tl.fromTo(
        pouchWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.4,
      );
    }

    // --- Cards + bezier path draw/erase ---
    const cardStart = 2.2;
    const cardSpacing = 2.8;

    CARDS.forEach((_, i) => {
      const t = cardStart + i * cardSpacing;
      const cardEl = cardRefs.current[i];
      const proxy = pathProxies.current[i];
      if (!cardEl) return;

      tl.fromTo(
        cardEl,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        t,
      );
      tl.to(proxy, { draw: 1, duration: 1.4, ease: "power1.inOut" }, t);

      tl.to(
        cardEl,
        { opacity: 0, y: -60, duration: 0.8, ease: "power2.in" },
        t + 1.6,
      );
      tl.to(
        proxy,
        { erase: 1, duration: 1.0, ease: "power1.inOut" },
        t + 1.6,
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Heading */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-6">
        <h2
          className="text-center leading-[1.1] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)" }}
        >
          <span
            ref={(el) => {
              headingLineRefs.current[0] = el;
            }}
            className="block font-black"
            style={{ color: COLORS.teal.main, opacity: 0 }}
          >
            You deserve to feel good.
          </span>
          <span
            ref={(el) => {
              headingLineRefs.current[1] = el;
            }}
            className="block font-black"
            style={{ color: COLORS.purple.main, opacity: 0 }}
          >
            You deserve More:
          </span>
          <span
            ref={(el) => {
              headingLineRefs.current[2] = el;
            }}
            className="block font-black"
            style={{ color: COLORS.pink.main, opacity: 0 }}
          >
            Wellness that sticks.
          </span>
        </h2>
      </div>

      {/* SVG bezier paths */}
      <svg
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {BEZIER_PATHS.map((d, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={d}
            stroke={PATH_COLORS[i]}
            strokeWidth="36"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>

      {/* Cards */}
      {CARDS.map((card, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center z-20 pointer-events-none"
          style={{
            justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
            padding: "0 8%",
          }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="rounded-3xl p-10 md:p-12 w-full max-w-[440px]"
            style={{ backgroundColor: card.color.bg, opacity: 0 }}
          >
            <SmileyIcon color={card.color.main} />
            <h3
              className="text-4xl md:text-5xl font-black mt-5 uppercase tracking-tight leading-[1.1]"
              style={{ color: card.color.main }}
            >
              {card.heading}
            </h3>
            <p
              className="mt-4 text-base md:text-lg leading-relaxed"
              style={{ color: card.color.main, opacity: 0.75 }}
            >
              {card.body}
            </p>
          </div>
        </div>
      ))}

      {/* 3D Pouch overlay */}
      <div
        ref={pouchWrapperRef}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <PouchScene scrollProgress={scrollProgress} />
      </div>
    </section>
  );
}
