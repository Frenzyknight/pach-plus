"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";

const DOT_COLORS = ["#896CC4", "#1E3A8A", "#BE185D", "#34D399"];

const BARRIERS = [
  {
    title: "Stomach Degradation",
    body: "Most nutrients are exposed to harsh stomach acid and digestive enzymes that break down or destroy a large portion before they ever reach the intestine.",
  },
  {
    title: "Intestinal Barriers",
    body: "To be absorbed, ingredients must pass through microscopic structures in the small intestine. Most supplements are too large, unstable, or poorly formulated to make it through.",
  },
  {
    title: "First-Pass Metabolism",
    body: "Even after absorption, the liver and kidneys rapidly filter and deactivate many compounds, preventing them from ever reaching the cells that need them.",
  },
];

export default function BioavailabilitySection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionInView = useInView(useRef(null), { once: true });
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(containerRef, { once: true, amount: 0.15 });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {});
  }, []);

  return (
    <section
      id="bioavailability"
      ref={containerRef}
      className="bg-white px-5 pt-20 xs:px-6 lg:px-10 lg:pt-28"
      aria-label="Bioavailability and nutrient absorption"
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
            <span className="font-bold">Breaking Down</span>{" "}
            <span className="font-extralight">Bioavailability</span>{" "}
            <span className="font-bold">and Nutrient Absorption.</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-[720px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:mt-6 sm:text-sm lg:text-base"
          >
            Bioavailability measures how much of the consumed bioactives are
            available for absorption and can be used by the body. Once ingested,
            the effectiveness of supplements is largely determined by their
            bioavailability.
          </motion.p>
        </Reveal>

        <Reveal
          stagger={0.12}
          amount={0.15}
          className="mt-12 lg:mt-20"
        >
          <motion.div
            variants={revealItem}
            className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-24"
          >
            {/* Video */}
            <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
              <video
                ref={videoRef}
                src="/new.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full rounded-2xl sm:rounded-3xl"
              />
            </div>

            {/* Text content */}
            <div>
              <div className="space-y-8 sm:space-y-10">
                {BARRIERS.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: reduce ? 0 : 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : undefined}
                    transition={{
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.15 + i * 0.15,
                    }}
                    className="flex gap-4 sm:gap-5"
                  >
                    <span
                      className="mt-0.5 shrink-0 text-xl sm:text-2xl lg:text-3xl"
                      style={{ color: DOT_COLORS[i] }}
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                    <div>
                      <h3 className="text-sm font-black leading-tight tracking-[-0.01em] text-foreground sm:text-base lg:text-lg">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-[440px] text-[11px] font-medium leading-relaxed text-foreground/62 xs:text-xs sm:mt-2 sm:text-sm lg:text-[15px]">
                        {item.body}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
