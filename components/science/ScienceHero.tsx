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
import { Reveal, revealItem } from "@/components/motion/Reveal";

export default function ScienceHero() {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });
  const scale = useTransform(smoothed, [0, 1], [1.06, 1.14]);
  const y = useTransform(smoothed, [0, 1], ["2%", "-6%"]);

  return (
    <section className="bg-white px-5 pt-24 xs:px-6 sm:pt-28 lg:px-10 lg:pt-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal stagger={0.08} amount={0.2}>
          <motion.p
            variants={revealItem}
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4"
          >
            Our science
          </motion.p>

          <motion.h1
            variants={revealItem}
            className="max-w-[1180px] leading-[1.04] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2rem, 5.4vw, 4.25rem)" }}
          >
            <span className="font-bold">Bypassing the gut,</span>{" "}
            <span className="font-extralight">engineered for</span>{" "}
            <span className="font-bold">real bioavailability.</span>
          </motion.h1>
        </Reveal>

        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mt-10 w-full overflow-hidden rounded-2xl aspect-3/4 sm:mt-14 sm:aspect-video sm:rounded-3xl lg:aspect-21/9"
        >
          <motion.div
            className="absolute inset-0"
            style={
              reduce ? undefined : { scale, y, willChange: "transform" }
            }
          >
            <Image
              src="/science-mobile.jpeg"
              alt="A split visual of plant-derived actives and a satellite view of clouds, the science behind pach+."
              fill
              sizes="(max-width: 640px) calc(100vw - 48px), 0px"
              priority
              className="object-cover object-center sm:hidden"
            />
            <Image
              src="/science.jpeg"
              alt="A split visual of plant-derived actives and a satellite view of clouds, the science behind pach+."
              fill
              sizes="(min-width: 1024px) calc(100vw - 80px), (min-width: 640px) calc(100vw - 48px), 0px"
              priority
              className="hidden object-cover object-center sm:block"
            />
          </motion.div>
        </motion.div>

        <Reveal
          stagger={0.1}
          amount={0.2}
          className="mt-12 grid grid-cols-1 items-end gap-8 sm:mt-16 lg:grid-cols-12 lg:gap-12"
        >
          <motion.h2
            variants={revealItem}
            className="leading-[1.04] tracking-[-0.03em] text-foreground lg:col-span-7"
            style={{ fontSize: "clamp(1.75rem, 4.2vw, 3rem)" }}
          >
            <span className="font-bold">Centuries of plant wisdom,</span>{" "}
            <span className="font-extralight">delivered with</span>{" "}
            <span className="font-bold">modern precision.</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="max-w-[440px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm lg:col-span-5 lg:ml-auto lg:text-[15px]"
          >
            Pills lose most of their potency before reaching your cells. We
            designed pach+ patches to skip that journey, delivering plant
            actives and minerals through your skin in a slow, steady, fully
            bioavailable dose.
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
