"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";
import { getProductBySlug, type Product } from "@/lib/products";

type Reel = {
  src: string;
  product: Product;
};

const REEL_SOURCES: { src: string; slug: string }[] = [
  { src: "/product-1.mp4", slug: "happy-muscles" },
  { src: "/product2.mp4", slug: "happy-breathe" },
  { src: "/product3.mp4", slug: "happy-hormones" },
  { src: "/product4.mp4", slug: "happy-gut" },
  { src: "/product-5.mp4", slug: "happy-muscles" },
  { src: "/product6.mp4", slug: "happy-breathe" },
  { src: "/product7.mp4", slug: "happy-hormones" },
  { src: "/product8.mp4", slug: "happy-gut" },
];

const REELS: Reel[] = REEL_SOURCES.map(({ src, slug }) => {
  const product = getProductBySlug(slug);
  if (!product) {
    throw new Error(`Missing product for slug: ${slug}`);
  }
  return { src, product };
});

const HALF = Math.floor(REELS.length / 2);
const ACTIVE_RATIO = 16 / 9;

const GLOW_PRODUCTS = Array.from(
  new Map(REELS.map((r) => [r.product.slug, r.product])).values(),
);
const INACTIVE_RATIO = 1.2;
const MAX_CARD_W = 340;

function computeOffset(index: number, active: number): number {
  const diff = index - active;
  return ((diff + REELS.length + HALF) % REELS.length) - HALF;
}

function getLayout(width: number) {
  if (width >= 1280) return { cardVw: 20, gapVw: 22 };
  if (width >= 1024) return { cardVw: 24, gapVw: 26 };
  if (width >= 768) return { cardVw: 28, gapVw: 30 };
  if (width >= 640) return { cardVw: 38, gapVw: 41 };
  return { cardVw: 66, gapVw: 70 };
}

function ChevronIcon({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

function MuteIcon({ muted, className }: { muted: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5L6 9H3v6h3l5 4V5z" />
      {muted ? (
        <>
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 010 7.07" />
          <path d="M18.36 5.64a9 9 0 010 12.73" />
        </>
      )}
    </svg>
  );
}

function PlayPauseIcon({
  playing,
  className,
}: {
  playing: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      {playing ? (
        <>
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </>
      ) : (
        <path d="M8 5v14l11-7z" />
      )}
    </svg>
  );
}

export default function TestimonialReelsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [layout, setLayout] = useState({ cardVw: 13, gapVw: 14.5 });
  const [inView, setInView] = useState(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const pointerStart = useRef<{ x: number; id: number } | null>(null);
  const prevOffsetsRef = useRef<number[]>([]);

  useEffect(() => {
    const update = () => setLayout(getLayout(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const node = trackRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((index: number) => {
    const next = ((index % REELS.length) + REELS.length) % REELS.length;
    setActiveIndex(next);
    setPlaying(true);
  }, []);

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        video.muted = muted;
        if (playing && inView) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {
              video.muted = true;
              setMuted(true);
              video.play().catch(() => {});
            });
          }
        } else {
          video.pause();
        }
      } else {
        video.pause();
        video.muted = true;
        try {
          video.currentTime = 0;
        } catch {
          // some browsers throw before metadata loads; safe to ignore
        }
      }
    });
  }, [activeIndex, muted, playing, inView]);

  useEffect(() => {
    prevOffsetsRef.current = REELS.map((_, i) => computeOffset(i, activeIndex));
  }, [activeIndex]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, id: event.pointerId };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;
    const delta = event.clientX - start.x;
    const threshold = 40;
    if (delta > threshold) {
      goPrev();
    } else if (delta < -threshold) {
      goNext();
    }
  };

  const { cardVw, gapVw } = layout;
  const activeProduct = REELS[activeIndex].product;
  const wrapperWidth = `min(${cardVw}vw, ${MAX_CARD_W}px)`;
  const wrapperHeight = `min(${cardVw * ACTIVE_RATIO}vw, ${MAX_CARD_W * ACTIVE_RATIO}px)`;
  const trackHeight = `calc(${wrapperHeight} + 84px)`;

  return (
    <section
      className="relative overflow-x-clip bg-white py-16 sm:py-20 lg:py-24"
      aria-label="Customer reels"
    >
      {/* Product-tinted ambient glow — cross-fades with active card */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {GLOW_PRODUCTS.map((product) => (
          <div
            key={product.slug}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{
              opacity: activeProduct.slug === product.slug ? 1 : 0,
              background: [
                `radial-gradient(ellipse 68% 55% at 50% 54%, ${product.accentLight}70 0%, ${product.accentLight}30 42%, ${product.accentLight}0a 68%, transparent 83%)`,
                `radial-gradient(ellipse 110% 88% at 50% 54%, ${product.accentLight}22 0%, transparent 72%)`,
              ].join(", "),
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-5 xs:px-6 lg:px-10">
        <div className="mx-auto max-w-[1400px]">
          <Reveal
            stagger={0.08}
            amount={0.4}
            className="mb-12 flex flex-col items-center text-center sm:mb-16"
          >
            <motion.p
              variants={revealItem}
              className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60"
            >
              Real Routines
            </motion.p>
            <motion.h2
              variants={revealItem}
              className="mt-3 leading-[1.05] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              <span className="font-bold">Real people.</span>{" "}
              <span className="font-extralight">Real</span>{" "}
              <span className="font-bold">rituals.</span>
            </motion.h2>
            <motion.p
              variants={revealItem}
              className="mt-4 max-w-md text-sm text-foreground/60 sm:text-base"
            >
              See how pach+ fits into everyday wellness routines.
            </motion.p>
          </Reveal>
        </div>
      </div>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
        className="relative z-10 w-full touch-pan-y select-none"
        style={{ height: trackHeight, minHeight: 460 }}
      >
        {REELS.map((reel, i) => {
          const offset = computeOffset(i, activeIndex);
          const distance = Math.abs(offset);
          const isActive = offset === 0;
          const isAntipode = distance === HALF;

          const prevOffset = prevOffsetsRef.current[i];
          const isLargeJump =
            prevOffset != null && Math.abs(offset - prevOffset) > 1;

          const opacity = isAntipode
            ? 0
            : distance === 0
              ? 1
              : distance === 1
                ? 0.96
                : distance === 2
                  ? 0.62
                  : 0.32;

          const ratio = isActive ? ACTIVE_RATIO : INACTIVE_RATIO;
          const videoHeight = `min(${cardVw * ratio}vw, ${MAX_CARD_W * ratio}px)`;

          return (
            <div
              key={reel.src}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: 20 - distance }}
            >
              <motion.div
                className={`relative ${isAntipode ? "pointer-events-none" : ""}`}
                style={{
                  width: wrapperWidth,
                  height: wrapperHeight,
                }}
                initial={false}
                animate={{
                  x: `${offset * gapVw}vw`,
                  opacity,
                }}
                transition={
                  isLargeJump
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 160,
                        damping: 26,
                        mass: 0.8,
                      }
                }
                aria-hidden={!isActive}
              >
              <div
                className="absolute left-0 right-0 top-1/2 -translate-y-1/2 transition-[height] duration-500 ease-out"
                style={{ height: videoHeight }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (isActive) return;
                    goTo(i);
                  }}
                  aria-label={
                    isActive
                      ? `${reel.product.name} reel`
                      : `Show ${reel.product.name} reel`
                  }
                  className="relative block h-full w-full overflow-hidden rounded-2xl bg-foreground/5 shadow-[0_30px_60px_-20px_rgba(13,62,50,0.35)] focus:outline-none"
                  tabIndex={isActive || isAntipode ? -1 : 0}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    className="absolute inset-0 h-full w-full object-cover"
                    playsInline
                    loop
                    muted
                    preload="metadata"
                    aria-label={`${reel.product.name} customer reel`}
                  >
                    <source src={reel.src} type="video/mp4" />
                  </video>

                  {isActive && (
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/30" />
                  )}
                </button>

                {isActive && (
                  <div className="pointer-events-none absolute right-3 top-3 z-10 flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setMuted((m) => !m);
                      }}
                      className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/85 text-foreground shadow-[0_8px_20px_rgba(13,62,50,0.18)] backdrop-blur-sm transition-colors hover:bg-white"
                      aria-pressed={muted}
                      aria-label={muted ? "Unmute video" : "Mute video"}
                    >
                      <MuteIcon muted={muted} className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPlaying((p) => !p);
                      }}
                      className="pointer-events-auto flex size-9 items-center justify-center rounded-full bg-white/85 text-foreground shadow-[0_8px_20px_rgba(13,62,50,0.18)] backdrop-blur-sm transition-colors hover:bg-white"
                      aria-pressed={!playing}
                      aria-label={playing ? "Pause video" : "Play video"}
                    >
                      <PlayPauseIcon playing={playing} className="size-3.5" />
                    </button>
                  </div>
                )}

                <div className="pointer-events-auto absolute -bottom-7 left-1/2 w-[94%] -translate-x-1/2">
                  <div className="flex items-center gap-3 rounded-2xl bg-white p-2 pr-2.5 shadow-[0_18px_40px_rgba(13,62,50,0.18)]">
                    <Link
                      href={`/products/${reel.product.slug}`}
                      aria-label={`View ${reel.product.name}`}
                      className="relative size-11 shrink-0 overflow-hidden rounded-lg"
                      style={{ backgroundColor: reel.product.bg }}
                      tabIndex={isActive ? 0 : -1}
                    >
                      <Image
                        src={reel.product.src}
                        alt=""
                        fill
                        sizes="44px"
                        className="object-contain p-1"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-semibold text-foreground">
                        {reel.product.name}
                      </p>
                      <p className="text-[11px] text-foreground/55">
                        ₹{reel.product.price}
                      </p>
                    </div>
                    {reel.product.comingSoon ? (
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold uppercase tracking-[0.15em] text-white/80"
                        style={{ backgroundColor: reel.product.accent, opacity: 0.6 }}
                        aria-label={`${reel.product.name} coming soon`}
                      >
                        Soon
                      </span>
                    ) : (
                      <Link
                        href={`/products/${reel.product.slug}`}
                        aria-label={`Add ${reel.product.name} to cart`}
                        className="flex size-9 shrink-0 items-center justify-center rounded-full text-white shadow-[0_6px_14px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5"
                        style={{ backgroundColor: reel.product.accent }}
                        tabIndex={isActive ? 0 : -1}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          aria-hidden="true"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div className="relative z-10 mt-12 flex items-center justify-center gap-6 px-5 sm:mt-14">
        <button
          type="button"
          onClick={goPrev}
          className="flex size-11 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground shadow-[0_12px_30px_rgba(13,62,50,0.12)] transition-colors hover:bg-teal-900 hover:text-white"
          aria-label="Show previous reel"
        >
          <ChevronIcon direction="left" className="size-5" />
        </button>

        <div className="flex items-center gap-2" aria-hidden="true">
          {REELS.map((reel, i) => (
            <span
              key={reel.src}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 bg-teal-900"
                  : "w-1.5 bg-foreground/15"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="flex size-11 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground shadow-[0_12px_30px_rgba(13,62,50,0.12)] transition-colors hover:bg-teal-900 hover:text-white"
          aria-label="Show next reel"
        >
          <ChevronIcon direction="right" className="size-5" />
        </button>
      </div>
    </section>
  );
}
