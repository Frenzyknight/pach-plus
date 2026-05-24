"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import RotatingText, {
  type RotatingTextRef,
} from "@/components/RotatingText";

type Package = {
  slug: string;
  src: string;
  alt: string;
  accent: string;
  accentLight: string;
  name: string;
  label: string;
  description: string;
  comingSoon?: boolean;
};

type HerbalAccent = {
  name: string;
  latin: string;
  src: string;
  /** Tailwind positioning classes only — rotation is animated separately. */
  positionClass: string;
  rotate: number;
  size: number;
  /** Idle float duration (seconds) — varied so accents desync. */
  floatDuration: number;
};

// Decorative ingredients scattered in the hero's white space.
const HERBAL_ACCENTS: HerbalAccent[] = [
  {
    name: "Eucalyptus",
    latin: "Eucalyptus globulus",
    src: "/stencil-eucalyptus.png",
    positionClass: "left-[3%] top-[10%] lg:left-[5%] lg:top-[12%]",
    rotate: -14,
    size: 88,
    floatDuration: 6.4,
  },
  {
    name: "Chamomile",
    latin: "Matricaria chamomilla",
    src: "/chamomille-stencil.png",
    positionClass: "right-[3%] top-[8%] lg:right-[5%] lg:top-[10%]",
    rotate: 12,
    size: 92,
    floatDuration: 7.1,
  },
  {
    name: "Peppermint",
    latin: "Mentha piperita",
    src: "/peppermint-stencil.png",
    positionClass: "left-[14%] top-[34%] lg:left-[18%] lg:top-[30%]",
    rotate: -6,
    size: 72,
    floatDuration: 5.6,
  },
  {
    name: "Boswellia",
    latin: "Boswellia serrata",
    src: "/boswelia-stencil.png",
    positionClass: "right-[14%] top-[36%] lg:right-[18%] lg:top-[32%]",
    rotate: 8,
    size: 76,
    floatDuration: 6.8,
  },
  {
    name: "Ashwagandha",
    latin: "Withania somnifera",
    src: "/ashwagandha-stencil.png",
    positionClass: "left-[4%] bottom-[24%] lg:left-[7%] lg:bottom-[28%]",
    rotate: -8,
    size: 84,
    floatDuration: 7.6,
  },
  {
    name: "Ginger",
    latin: "Zingiber officinale",
    src: "/ginger-stencil.png",
    positionClass: "right-[4%] bottom-[26%] lg:right-[7%] lg:bottom-[30%]",
    rotate: 10,
    size: 84,
    floatDuration: 6.2,
  },
];

const PACKAGES: Package[] = [
  {
    slug: "happy-muscles",
    src: "/package.png",
    alt: "Happy Muscles",
    accent: "#574092",
    accentLight: "#896CC4",
    name: "Happy Muscles",
    label: "Daily Recovery",
    description:
      "Experience the future of wellness with pach+\u2019s tailored transdermal recovery patch.",
  },
  {
    slug: "happy-breathe",
    src: "/package2.png",
    alt: "Happy Breathe",
    accent: "#1E3A8A",
    accentLight: "#93C5FD",
    name: "Happy Breathe",
    label: "Nasal Comfort",
    description:
      "Breathe easy with pach+\u2019s plant-based nasal comfort patch built for fresh, open days.",
    comingSoon: true,
  },
  {
    slug: "happy-hormones",
    src: "/package3.png",
    alt: "Happy Hormones",
    accent: "#BE185D",
    accentLight: "#F9A8D4",
    name: "Happy Hormones",
    label: "Hormonal Balance",
    description:
      "Support your daily hormonal balance with pach+\u2019s wearable PCOS support patch.",
  },
  {
    slug: "happy-gut",
    src: "/package4.png",
    alt: "Happy Gut",
    accent: "#065F46",
    accentLight: "#6EE7B7",
    name: "Happy Gut",
    label: "Gut Health",
    description:
      "Boost your metabolism and gut health with pach+\u2019s transdermal nourish patch.",
  },
];

const AUTO_ROTATE_MS = 6000;
const TEXT_SWAP_MS = 320;
const SLIDE_TRANSITION =
  "transform 850ms cubic-bezier(0.32, 0.72, 0, 1), opacity 850ms cubic-bezier(0.32, 0.72, 0, 1)";
// Drag tuning.
const SWIPE_THRESHOLD_PX = 60; // distance past which a drag triggers nav
const DRAG_FOLLOW_FACTOR = 0.35; // how much pouches follow the cursor
const CLICK_SUPPRESS_PX = 6; // movement above which we treat as drag, not click

type Role = "farLeft" | "left" | "center" | "right" | "farRight";

const ROLE_STYLES: Record<
  Role,
  { x: number; scale: number; opacity: number; zIndex: number }
> = {
  farLeft: { x: -320, scale: 0.4, opacity: 0, zIndex: 1 },
  left: { x: -170, scale: 0.55, opacity: 0.65, zIndex: 5 },
  center: { x: -50, scale: 1.0, opacity: 1.0, zIndex: 10 },
  right: { x: 70, scale: 0.55, opacity: 0.65, zIndex: 5 },
  farRight: { x: 220, scale: 0.4, opacity: 0, zIndex: 1 },
};

type VisibleRole = "left" | "center" | "right" | "hidden";

function getVisibleRole(
  idx: number,
  active: number,
  total: number,
): VisibleRole {
  let diff = (idx - active) % total;
  if (diff > total / 2) diff -= total;
  if (diff <= -total / 2) diff += total;
  if (diff === 0) return "center";
  if (diff === 1) return "right";
  if (diff === -1) return "left";
  return "hidden";
}

function getDirection(prev: number, next: number, total: number): 1 | -1 {
  let diff = next - prev;
  if (diff > total / 2) diff -= total;
  if (diff <= -total / 2) diff += total;
  return diff >= 0 ? 1 : -1;
}

function applyRole(
  el: HTMLElement,
  role: Role,
  options?: { animate?: boolean },
) {
  const { x, scale, opacity, zIndex } = ROLE_STYLES[role];
  el.style.transition = options?.animate === false ? "none" : SLIDE_TRANSITION;
  el.style.transform = `translateX(${x}%) scale(${scale})`;
  el.style.opacity = String(opacity);
  el.style.zIndex = String(zIndex);
}

// Second words rotate in the title while "Happy" stays constant.
const ROTATING_WORDS = PACKAGES.map((p) =>
  p.name.replace(/^Happy\s+/i, "").trim(),
);

export default function HeroProductShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  const activeIndexRef = useRef(0);
  const prevActiveRef = useRef(0);
  const initializedRef = useRef(false);
  const pouchRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const textSwapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    currentX: 0,
    moved: false,
    pointerId: 0,
  });
  const pausedRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const total = PACKAGES.length;
  const pkg = PACKAGES[activeIndex];
  const displayPkg = PACKAGES[displayIndex];
  const rotatingTextRef = useRef<RotatingTextRef | null>(null);

  useEffect(() => {
    rotatingTextRef.current?.jumpTo(activeIndex);
  }, [activeIndex]);

  const updatePackage = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      if (activeIndexRef.current === next) return;

      activeIndexRef.current = next;
      setActiveIndex(next);

      if (textSwapTimeoutRef.current) clearTimeout(textSwapTimeoutRef.current);
      setTextVisible(false);
      textSwapTimeoutRef.current = setTimeout(() => {
        setDisplayIndex(next);
        setTextVisible(true);
        textSwapTimeoutRef.current = null;
      }, TEXT_SWAP_MS);
    },
    [total],
  );

  const goTo = useCallback(
    (index: number) => {
      updatePackage(index);
      setTimerKey((k) => k + 1);
    },
    [updatePackage],
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (pausedRef.current) return;
      updatePackage(activeIndexRef.current + 1);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [timerKey, updatePackage]);

  // Apply a horizontal pixel offset to all visible pouches without changing
  // the active index. Used for live feedback while dragging.
  const applyDragOffset = useCallback(
    (offsetPx: number) => {
      PACKAGES.forEach((_, idx) => {
        const el = pouchRefs.current[idx];
        if (!el) return;
        const visible = getVisibleRole(idx, activeIndexRef.current, total);
        const role: Role = visible === "hidden" ? "farRight" : visible;
        const { x, scale, opacity, zIndex } = ROLE_STYLES[role];
        el.style.transition = "none";
        el.style.transform = `translateX(calc(${x}% + ${offsetPx}px)) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
      });
    },
    [total],
  );

  // Restore pouches to their natural role positions with animation.
  const snapBackToRoles = useCallback(() => {
    PACKAGES.forEach((_, idx) => {
      const el = pouchRefs.current[idx];
      if (!el) return;
      const visible = getVisibleRole(idx, activeIndexRef.current, total);
      const role: Role = visible === "hidden" ? "farRight" : visible;
      applyRole(el, role, { animate: true });
    });
  }, [total]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      currentX: e.clientX,
      moved: false,
      pointerId: e.pointerId,
    };
    pausedRef.current = true;
    setIsDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const state = dragRef.current;
      if (!state.active) return;
      const dx = e.clientX - state.startX;
      state.currentX = e.clientX;
      if (!state.moved && Math.abs(dx) > CLICK_SUPPRESS_PX) {
        state.moved = true;
      }
      applyDragOffset(dx * DRAG_FOLLOW_FACTOR);
    },
    [applyDragOffset],
  );

  const finishDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const state = dragRef.current;
      if (!state.active) return;
      const dx = state.currentX - state.startX;
      state.active = false;
      setIsDragging(false);
      pausedRef.current = false;
      try {
        e.currentTarget.releasePointerCapture?.(state.pointerId);
      } catch {
        // ignore if already released
      }

      if (Math.abs(dx) >= SWIPE_THRESHOLD_PX) {
        if (dx < 0) {
          goTo(activeIndexRef.current + 1);
        } else {
          goTo(activeIndexRef.current - 1);
        }
      } else {
        snapBackToRoles();
      }
    },
    [goTo, snapBackToRoles],
  );

  useEffect(() => {
    return () => {
      if (textSwapTimeoutRef.current) clearTimeout(textSwapTimeoutRef.current);
    };
  }, []);

  // Initial positioning - no animation
  useLayoutEffect(() => {
    PACKAGES.forEach((_, idx) => {
      const el = pouchRefs.current[idx];
      if (!el) return;
      const visible = getVisibleRole(idx, 0, total);
      const role: Role = visible === "hidden" ? "farRight" : visible;
      applyRole(el, role, { animate: false });
    });
    initializedRef.current = true;
  }, [total]);

  // On activeIndex change - animate to new roles
  useLayoutEffect(() => {
    if (!initializedRef.current) return;
    const prev = prevActiveRef.current;
    if (prev === activeIndex) return;

    const direction = getDirection(prev, activeIndex, total);

    PACKAGES.forEach((_, idx) => {
      const el = pouchRefs.current[idx];
      if (!el) return;

      const oldVisible = getVisibleRole(idx, prev, total);
      const newVisible = getVisibleRole(idx, activeIndex, total);

      if (oldVisible === newVisible) return;

      if (oldVisible === "hidden" && newVisible !== "hidden") {
        // Entering: snap to entry side (no transition), then animate to target
        const entrySide: Role = direction === 1 ? "farRight" : "farLeft";
        applyRole(el, entrySide, { animate: false });
        // Force reflow so the next style change kicks off a transition
        void el.offsetWidth;
        applyRole(el, newVisible, { animate: true });
      } else if (newVisible === "hidden") {
        // Exiting: animate toward the exit side
        const exitSide: Role = direction === 1 ? "farLeft" : "farRight";
        applyRole(el, exitSide, { animate: true });
      } else {
        applyRole(el, newVisible, { animate: true });
      }
    });

    prevActiveRef.current = activeIndex;
  }, [activeIndex, total]);

  return (
    <section className="relative isolate overflow-hidden bg-background py-12 lg:py-20">
      {/* Preload all pouch images */}
      <div aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden">
        {PACKAGES.map((p) => (
          <Image key={p.src} src={p.src} alt="" width={300} height={430} />
        ))}
      </div>

      {/* Decorative herbal accents scattered in the hero whitespace.
          Sits behind the pouch carousel via z-0 (carousel wrapper is z-10). */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden sm:block"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08, delayChildren: 0.1 },
          },
        }}
      >
        {HERBAL_ACCENTS.map((herb) => (
          <motion.div
            key={herb.name}
            className={`absolute flex flex-col items-center gap-1 ${herb.positionClass}`}
            style={{ width: herb.size }}
            variants={{
              hidden: {
                opacity: 0,
                y: reduceMotion ? 0 : 14,
                rotate: reduceMotion ? herb.rotate : herb.rotate * 0.4,
              },
              visible: {
                opacity: 0.6,
                y: 0,
                rotate: herb.rotate,
                transition: {
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            <motion.div
              className="relative w-full"
              style={{ height: herb.size }}
              animate={
                reduceMotion
                  ? undefined
                  : { y: [0, -6, 0] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: herb.floatDuration,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }
              }
            >
              <Image
                src={herb.src}
                alt=""
                fill
                sizes={`${herb.size}px`}
                className="object-contain"
                draggable={false}
              />
            </motion.div>
            <div className="text-center">
              <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-foreground/55">
                {herb.name}
              </p>
              <p className="mt-0.5 font-serif text-[8px] italic leading-tight text-foreground/40">
                {herb.latin}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-5 xs:px-6 lg:px-10">
        {/* Eyebrow */}
        <p
          className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 transition-all duration-500"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(4px)",
          }}
        >
          {displayPkg.label}
        </p>

        {/* Title */}
        <LayoutGroup>
          <motion.h1
            layout
            className="mt-3 flex flex-wrap items-baseline justify-center text-center leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2.25rem, 7vw, 5.5rem)" }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
          >
            <motion.span layout className="font-bold">
              Happy&nbsp;
            </motion.span>
            <motion.span
              layout
              className="inline-flex items-baseline font-extralight"
            >
              <RotatingText
                ref={rotatingTextRef}
                texts={ROTATING_WORDS}
                auto={false}
                loop
                staggerFrom="last"
                staggerDuration={0.025}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                mainClassName="!inline-flex overflow-hidden"
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              />
              <span aria-hidden="true">.</span>
            </motion.span>
          </motion.h1>
        </LayoutGroup>

        {/* Pouch carousel: each pouch is a single element translating across positions.
            `isolate z-20` guarantees every pouch (active + side) paints above the
            decorative herbal stencils which sit at z-0 on the section. */}
        <div
          className="relative isolate z-20 mt-10 w-full touch-pan-y select-none lg:mt-14"
          style={{
            height: "clamp(280px, 38vw, 540px)",
            cursor: isDragging ? "grabbing" : "grab",
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          {PACKAGES.map((p, idx) => {
            const initialVisible = getVisibleRole(idx, 0, total);
            const initialRole: Role =
              initialVisible === "hidden" ? "farRight" : initialVisible;
            const initial = ROLE_STYLES[initialRole];
            return (
              <button
                key={p.slug}
                ref={(el) => {
                  pouchRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => {
                  // Suppress click that was actually a drag.
                  if (dragRef.current.moved) {
                    dragRef.current.moved = false;
                    return;
                  }
                  goTo(idx);
                }}
                onDragStart={(e) => e.preventDefault()}
                aria-label={`Show ${p.alt}`}
                aria-pressed={idx === activeIndex}
                className="absolute bottom-0 left-1/2 will-change-transform focus-visible:outline-none"
                style={{
                  width: "clamp(180px, 26vw, 360px)",
                  height: "100%",
                  transformOrigin: "50% 100%",
                  transform: `translateX(${initial.x}%) scale(${initial.scale})`,
                  opacity: initial.opacity,
                  zIndex: initial.zIndex,
                }}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={500}
                  height={720}
                  className="h-full w-full object-contain object-bottom"
                  priority={idx === 0}
                  draggable={false}
                />
              </button>
            );
          })}
        </div>

        {/* Bottom strip: thumbnails + CTA + description in a single row */}
        <div className="mt-8 grid w-full max-w-5xl grid-cols-1 items-center gap-6 lg:mt-24 lg:grid-cols-3 lg:gap-12">
          {/* Thumbnails */}
          <LayoutGroup id="hero-thumbnails">
            <div className="flex justify-center gap-3 lg:justify-start">
              {PACKAGES.map((p, idx) => {
                const focused = idx === activeIndex;
                return (
                  <motion.button
                    key={`thumb-${p.slug}`}
                    type="button"
                    onClick={() => goTo(idx)}
                    aria-label={`Show ${p.alt}`}
                    aria-pressed={focused}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="relative h-14 w-14 overflow-hidden rounded-xl bg-foreground/4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 lg:h-16 lg:w-16"
                  >
                    {focused && (
                      <motion.span
                        layoutId="active-thumb-ring"
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-xl"
                        style={{
                          border: `1.5px solid ${p.accent}`,
                          boxShadow: `0 0 0 3px ${p.accent}14`,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 360,
                          damping: 30,
                        }}
                      />
                    )}
                    <Image
                      src={p.src}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-1.5"
                    />
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>

          {/* CTA */}
          <div className="order-3 flex justify-center lg:order-0">
            {pkg.comingSoon ? (
              <span
                aria-disabled
                className="inline-flex items-center rounded-full px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/50"
                style={{
                  backgroundColor: "transparent",
                  border: "1px solid var(--color-border)",
                }}
              >
                Coming Soon
              </span>
            ) : (
              <Link
                href={`/products/${pkg.slug}`}
                className="inline-flex items-center rounded-full px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-background transition-all duration-500 ease-out hover:-translate-y-0.5 hover:brightness-110"
                style={{ backgroundColor: pkg.accent }}
              >
                Explore
              </Link>
            )}
          </div>

          {/* Description */}
          <p
            className="order-2 mx-auto max-w-sm text-center text-[11px] font-medium leading-relaxed text-foreground/68 transition-all duration-500 xs:text-xs sm:text-sm lg:order-0 lg:text-base"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(4px)",
            }}
          >
            {displayPkg.description}
          </p>
        </div>
      </div>
    </section>
  );
}
