"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

const PouchScene = dynamic(() => import("./PouchScene"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  teal: { main: "#1A715E", light: "#B8E4DA", bg: "#EAF5F1", deep: "#0D3E32", soft: "#86C9B9" },
  purple: { main: "#574092", light: "#D8C9FF", bg: "#F0EBF8", soft: "#AD9BDB" },
  pink: { main: "#BA3F82", light: "#FFC0E2", bg: "#FDF0F6", soft: "#E895C2" },
};

const CARDS = [
  {
    color: COLORS.teal,
    heading: "RECOVERY",
    body:
      "24-hour muscle relief delivered straight through your skin \u2014 no pills, no waiting. Each pouch targets soreness where it lives so you bounce back faster.",
  },
  {
    color: COLORS.purple,
    heading: "SCIENCE",
    body:
      "Clinically-dosed actives, precision-measured for maximum bioavailability. Every batch is third-party tested \u2014 what's on the label is what reaches your bloodstream.",
  },
  {
    color: COLORS.pink,
    heading: "BALANCE",
    body:
      "Plant-based hormonal support that works while you live your life. Gentle, consistent harmony for your cycle, mood, and energy \u2014 no crash, no compromise.",
  },
];

const BEZIER_PATHS = [
  "M -50 750 C 200 250, 500 900, 720 450 C 940 0, 1150 600, 1490 200",
  "M 1490 150 C 1200 650, 900 -50, 720 500 C 540 950, 250 200, -50 550",
  "M -50 850 C 300 350, 550 950, 720 550 C 890 150, 1100 800, 1490 400",
];

const PATH_COLOR = "#FFFFFF";

const SIDE_LABELS = [
  {
    text: "Happy Muscles",
    position: "top-[22%] left-[6%] lg:left-[11%]",
    arrowPath: "M 6 4 C 20 14, 34 26, 22 44",
    arrowHead: "M 16 38 L 22 44 L 30 40",
    arrowClass: "ml-1",
  },
  {
    text: "Happy Hormones",
    position: "top-[22%] right-[6%] lg:right-[11%]",
    arrowPath: "M 34 4 C 20 14, 6 26, 18 44",
    arrowHead: "M 12 38 L 18 44 L 26 40",
    arrowClass: "mr-1 order-first",
  },
];

export default function PouchShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pouchWrapperRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLSpanElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollProgress = useRef(0);
  const sidePouchProgress = useRef(0);
  const sideProxy = useRef({ p: 0 });

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

    cardRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 80 });
    });
    if (sectionRef.current) {
      gsap.set(sectionRef.current, { backgroundColor: COLORS.teal.bg });
    }
    if (pouchWrapperRef.current) {
      gsap.set(pouchWrapperRef.current, { opacity: 0 });
    }
    if (textWrapperRef.current) {
      gsap.set(textWrapperRef.current, { opacity: 0, y: 180 });
    }
    if (subTextRef.current) {
      gsap.set(subTextRef.current, { opacity: 0, y: 60 });
    }
    labelRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 20 });
    });

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
        end: "+=660%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          updatePaths();
        },
      },
    });

    if (pouchWrapperRef.current) {
      tl.fromTo(
        pouchWrapperRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        0,
      );
    }

    const cardStart = 0.8;
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

    // Cycle the section background between the three pastel tints so the
    // theme color trails whichever card is on screen.
    if (sectionRef.current) {
      tl.to(
        sectionRef.current,
        {
          backgroundColor: COLORS.purple.bg,
          duration: 0.6,
          ease: "power1.inOut",
        },
        3.0,
      );
      tl.to(
        sectionRef.current,
        {
          backgroundColor: COLORS.pink.bg,
          duration: 0.6,
          ease: "power1.inOut",
        },
        5.8,
      );
    }

    // Text reveal + trio formation phase
    const textPhase = 9.3;

    if (textWrapperRef.current) {
      tl.to(
        textWrapperRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
        },
        textPhase,
      );
    }

    if (subTextRef.current) {
      tl.to(
        subTextRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        textPhase + 0.5,
      );
    }

    // Side pouches rise from below
    tl.to(
      sideProxy.current,
      {
        p: 1,
        duration: 1.4,
        ease: "power2.out",
        onUpdate: () => {
          sidePouchProgress.current = sideProxy.current.p;
        },
      },
      textPhase + 0.4,
    );

    // Handwritten labels fade in after the side pouches settle
    labelRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.to(
        el,
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
        },
        textPhase + 1.4 + i * 0.12,
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
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: COLORS.teal.bg }}
    >
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
            stroke={PATH_COLOR}
            strokeWidth="36"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>

      {/* Cards (Recovery / Science / Balance) */}
      {CARDS.map((card, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center z-20 pointer-events-none"
          style={{
            justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
            padding: "0 3%",
          }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="relative rounded-3xl pt-14 pb-8 px-10 md:pt-16 md:pb-10 md:px-14 w-full max-w-[620px] text-center shadow-[0_20px_60px_-20px_rgba(0,0,0,0.2)]"
            style={{ backgroundColor: card.color.soft, opacity: 0 }}
          >
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] flex items-center justify-center z-10">
              <Image
                src="/logo mark - black@2x.png"
                alt="Pach+"
                width={44}
                height={44}
                className="object-contain"
              />
            </div>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-[0.95] text-white">
              {card.heading}
            </h3>
            <p
              className="mt-4 text-base md:text-lg font-medium leading-relaxed"
              style={{ color: card.color.main }}
            >
              {card.body}
            </p>
          </div>
        </div>
      ))}

      {/* Text reveal */}
      <div
        ref={textWrapperRef}
        className="absolute inset-0 flex flex-col items-center z-25 pointer-events-none px-6"
        style={{ opacity: 0, paddingTop: "10vh" }}
      >
        <h2
          className="text-center leading-[0.95] tracking-[-0.035em]"
          style={{ fontSize: "clamp(2rem, 6.2vw, 5.75rem)" }}
        >
          <span className="block font-black" style={{ color: COLORS.teal.deep }}>
            Happy, just the
          </span>
          <span className="block font-black" style={{ color: COLORS.teal.deep }}>
            way you need it.
          </span>
          <span
            ref={subTextRef}
            className="block font-black mt-2"
            style={{ color: COLORS.teal.soft, opacity: 0 }}
          >
            What&apos;s your vibe?
          </span>
        </h2>
      </div>

      {/* Handwritten labels pointing to the rising side pouches */}
      {SIDE_LABELS.map((label, i) => (
        <div
          key={label.text}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className={`absolute ${label.position} z-30 pointer-events-none flex items-center gap-1`}
          style={{ opacity: 0 }}
        >
          {i === 0 ? (
            <>
              <p
                className="text-xl lg:text-2xl whitespace-nowrap"
                style={{
                  fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                  fontStyle: "italic",
                  color: COLORS.teal.deep,
                }}
              >
                {label.text}
              </p>
              <svg
                viewBox="0 0 40 48"
                className={`w-10 h-12 ${label.arrowClass}`}
                fill="none"
                stroke={COLORS.teal.deep}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.7 }}
              >
                <path d={label.arrowPath} />
                <path d={label.arrowHead} />
              </svg>
            </>
          ) : (
            <>
              <svg
                viewBox="0 0 40 48"
                className={`w-10 h-12 ${label.arrowClass}`}
                fill="none"
                stroke={COLORS.teal.deep}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ opacity: 0.7 }}
              >
                <path d={label.arrowPath} />
                <path d={label.arrowHead} />
              </svg>
              <p
                className="text-xl lg:text-2xl whitespace-nowrap"
                style={{
                  fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                  fontStyle: "italic",
                  color: COLORS.teal.deep,
                }}
              >
                {label.text}
              </p>
            </>
          )}
        </div>
      ))}

      {/* 3D Pouch trio overlay */}
      <div
        ref={pouchWrapperRef}
        className="absolute inset-0 z-40 pointer-events-none"
        style={{ opacity: 0 }}
      >
        <PouchScene
          scrollProgress={scrollProgress}
          sideProgress={sidePouchProgress}
        />
      </div>
    </section>
  );
}
