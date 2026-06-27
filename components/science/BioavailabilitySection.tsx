"use client";

import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";

export default function BioavailabilitySection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const containerRef = useRef<HTMLDivElement>(null);

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
            <span className="font-bold">Most nutrients</span>{" "}
            <span className="font-extralight">never reach</span>{" "}
            <span className="font-bold">the cells that need them.</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-[760px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:mt-6 sm:text-sm lg:text-base"
          >
            Bioavailability measures how much of what you consume is actually
            absorbed and usable by the body. Swallowed supplements face a brutal
            journey — harsh stomach acid degrades them, the intestinal wall
            blocks all but the smallest molecules, and first-pass metabolism in
            the liver deactivates much of what remains. By the time anything
            reaches your cells, only a fraction is left.
          </motion.p>
        </Reveal>

        <Reveal stagger={0.12} amount={0.15} className="mt-12 lg:mt-20">
          <motion.div
            variants={revealItem}
            className="relative mx-auto w-full max-w-[900px]"
          >
            <video
              ref={videoRef}
              src="/new.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-2xl sm:rounded-3xl"
            />
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
