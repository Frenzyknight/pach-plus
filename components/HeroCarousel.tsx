"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Slide = {
  src: string;
  srcMobile: string;
  alt: string;
};

const SLIDES: Slide[] = [
  {
    src: "/hero-section-home-girl.jpeg",
    srcMobile: "/hero-section-home-girl-mobile.jpeg",
    alt: "A wearable wellness solution. No pills. No powders. No complicated routines.",
  },
  {
    src: "/hero-section-home-guy.jpeg",
    srcMobile: "/hero-section-home-guy-mobile.jpeg",
    alt: "A wearable wellness solution. No pills. No powders. No complicated routines.",
  },
];

const AUTOPLAY_MS = 6000;

function Arrow({ direction }: { direction: "left" | "right" }) {
  return (
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
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function HeroCarousel() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = SLIDES.length;

  const go = useCallback(
    (next: number) => {
      setActive(((next % total) + total) % total);
    },
    [total],
  );

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || reduce || total <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reduce, total]);

  return (
    <section
      className="relative overflow-hidden bg-slate-100"
      aria-label="A wearable wellness solution"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-square w-full overflow-hidden sm:aspect-2752/1536">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.32, 0.72, 0, 1] }}
            aria-roledescription="slide"
            aria-label={`Slide ${active + 1} of ${total}`}
          >
            <Image
              src={SLIDES[active].srcMobile}
              alt={SLIDES[active].alt}
              fill
              sizes="100vw"
              priority={active === 0}
              className="object-cover object-center sm:hidden"
            />
            <Image
              src={SLIDES[active].src}
              alt={SLIDES[active].alt}
              fill
              sizes="100vw"
              priority={active === 0}
              className="hidden object-cover object-center sm:block"
            />
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          className="absolute bottom-12 left-1/2 z-10 -translate-x-1/2 sm:bottom-14 sm:left-[45%] sm:translate-x-0 lg:bottom-16"
        >
          <motion.div
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <Link
              href="/shop"
              className="inline-block rounded-full bg-[#2E2544] px-5 py-3 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.22)] hover:bg-[#20182F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E2544]"
            >
              Shop Special Sale
            </Link>
          </motion.div>
        </motion.div>

        <button
          type="button"
          onClick={() => go(active - 1)}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-black backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:left-5 sm:h-11 sm:w-11"
        >
          <Arrow direction="left" />
        </button>
        <button
          type="button"
          onClick={() => go(active + 1)}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 text-black backdrop-blur transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 sm:right-5 sm:h-11 sm:w-11"
        >
          <Arrow direction="right" />
        </button>

        <div className="absolute bottom-5 left-5 z-10 flex items-center gap-1.5 sm:bottom-7 sm:left-7">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-selected={index === active}
              className={`h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 ${
                index === active
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
