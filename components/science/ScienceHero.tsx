"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export default function ScienceHero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });
  const scale = useTransform(smoothed, [0, 1], [1.04, 1.12]);
  const y = useTransform(smoothed, [0, 1], ["2%", "-6%"]);

  return (
    <section className="bg-white px-6 pt-24 sm:pt-28 lg:px-10 lg:pt-32">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: reduce ? 0 : 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl aspect-3/4 sm:aspect-video lg:aspect-21/9"
      >
        <motion.div
          className="absolute inset-0"
          style={
            reduce ? undefined : { scale, y, willChange: "transform" }
          }
        >
          <Image
            src="/science-mobile.jpeg"
            alt="A split visual: microscopic view of plant-derived actives meets a satellite view of clouds — the science behind pach+."
            fill
            sizes="(max-width: 640px) calc(100vw - 48px), 0px"
            priority
            className="object-cover object-center sm:hidden"
          />
          <Image
            src="/science.jpeg"
            alt="A split visual: microscopic view of plant-derived actives meets a satellite view of clouds — the science behind pach+."
            fill
            sizes="(min-width: 1024px) calc(100vw - 80px), (min-width: 640px) calc(100vw - 48px), 0px"
            priority
            className="object-cover object-center hidden sm:block"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
