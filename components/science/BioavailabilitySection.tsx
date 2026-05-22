"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";

interface DialProps {
  value: number;
  label: string;
  sublabel: string;
  trackColor: string;
  fillColor: string;
  valueColor: string;
  badgeBg: string;
  badgeText: string;
  imageSrc: string;
  imageAlt: string;
  imageClassName?: string;
  delay?: number;
}

function Dial({
  value,
  label,
  sublabel,
  trackColor,
  fillColor,
  valueColor,
  badgeBg,
  badgeText,
  imageSrc,
  imageAlt,
  imageClassName,
  delay = 0,
}: DialProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  const radius = 80;
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - value / 100);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start - delay * 1000) / duration);
      if (t < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, delay]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay,
        }}
        className="relative mb-6 h-56 w-56 sm:mb-8 sm:h-64 sm:w-64 lg:h-72 lg:w-72"
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -8, 0],
                }
          }
          transition={{
            duration: 5,
            ease: "easeInOut",
            repeat: Infinity,
            delay: delay + 0.4,
          }}
          className="relative h-full w-full"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 224px"
            className={`object-contain ${imageClassName ?? ""}`}
          />
        </motion.div>
      </motion.div>
      <span
        className={`mb-5 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${badgeBg} ${badgeText}`}
      >
        {label}
      </span>
      <div className="relative h-28 w-28 sm:h-32 sm:w-32 lg:h-36 lg:w-36">
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full -rotate-90"
          aria-hidden="true"
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={stroke}
          />
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={fillColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={
              inView
                ? { strokeDashoffset: reduce ? targetOffset : targetOffset }
                : undefined
            }
            transition={{
              duration: reduce ? 0 : 1.4,
              ease: [0.22, 1, 0.36, 1],
              delay,
            }}
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span
            className={`text-xl font-black leading-none tracking-[-0.04em] sm:text-2xl lg:text-3xl ${valueColor}`}
          >
            {display}
            <span className="text-sm sm:text-base lg:text-lg">%</span>
          </span>
          <span className="mt-0.5 text-[8px] font-medium uppercase tracking-[0.2em] text-foreground/55 sm:text-[9px]">
            absorbed
          </span>
        </div>
      </div>
      <p className="mt-5 max-w-[220px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm">
        {sublabel}
      </p>
    </div>
  );
}

export default function BioavailabilitySection() {
  return (
    <section
      id="bioavailability"
      className="bg-white px-5 py-20 xs:px-6 lg:px-10 lg:py-28"
      aria-label="Why transdermal absorbs better than pills"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal
          stagger={0.08}
          amount={0.35}
          className="flex flex-col items-center text-center"
        >
          <motion.p
            variants={revealItem}
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4"
          >
            Bioavailability
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mx-auto max-w-[960px] leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <span className="font-bold">More of what works,</span>{" "}
            <span className="font-extralight">actually</span>{" "}
            <span className="font-bold">reaches you.</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-[640px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:mt-6 sm:text-sm lg:text-base"
          >
            Swallow a vitamin and most of it never makes it past your gut and
            liver. A pach+ patch delivers actives straight through the skin into
            your bloodstream &mdash; so a smaller, smarter dose does far more
            real work.
          </motion.p>
        </Reveal>

        <Reveal
          stagger={0.12}
          amount={0.2}
          className="relative mt-12 overflow-hidden rounded-[28px] bg-[#F4F2EE] px-6 py-12 sm:px-10 sm:py-16 lg:mt-16 lg:rounded-[36px] lg:px-16 lg:py-20"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-[radial-gradient(circle,rgba(13,62,50,0.08)_1px,transparent_1px)] bg-size-[18px_18px]"
          />
          <motion.div
            variants={revealItem}
            className="relative grid grid-cols-1 items-center gap-12 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 lg:gap-12"
          >
            <Dial
              value={20}
              label="Oral pill"
              sublabel="Lost to stomach acid, gut bacteria and the liver before it can act."
              trackColor="rgba(13, 62, 50, 0.08)"
              fillColor="#9CA3AF"
              valueColor="text-foreground/50"
              badgeBg="bg-foreground/8"
              badgeText="text-foreground/65"
              imageSrc="/pill.webp"
              imageAlt="A standard oral capsule"
              imageClassName="opacity-90 grayscale"
              delay={0}
            />

            <div
              className="relative flex items-center justify-center sm:py-10"
              aria-hidden="true"
            >
              <div className="hidden h-full w-px bg-foreground/10 sm:block" />
              <span className="absolute rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/55 shadow-[0_2px_10px_rgba(13,62,50,0.06)]">
                vs
              </span>
            </div>

            <Dial
              value={80}
              label="pach+ patch"
              sublabel="Absorbs straight through the skin — bypassing the gut and the liver entirely."
              trackColor="rgba(13, 62, 50, 0.08)"
              fillColor="#1A715E"
              valueColor="text-teal-900"
              badgeBg="bg-teal-100"
              badgeText="text-teal-900"
              imageSrc="/purple-patch.png"
              imageAlt="A pach+ purple patch"
              delay={0.25}
            />
          </motion.div>

          <motion.p
            variants={revealItem}
            className="relative mx-auto mt-10 max-w-[560px] text-center text-[10px] font-medium leading-relaxed text-foreground/55 sm:mt-14 sm:text-[11px]"
          >
            Representative ranges based on transdermal delivery research. Actual
            bioavailability varies by ingredient and formulation &mdash; we
            publish ours per&nbsp;patch.
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
