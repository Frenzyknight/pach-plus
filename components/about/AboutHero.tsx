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

export default function AboutHero() {
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
            Who we are
          </motion.p>

          <motion.h1
            variants={revealItem}
            className="max-w-[1180px] leading-[1.04] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2rem, 5.4vw, 4.25rem)" }}
          >
            <span className="font-bold">We&rsquo;re a plant-powered patch company</span>{" "}
            <span className="font-extralight">making everyday wellness</span>{" "}
            <span className="font-bold">effortless.</span>
          </motion.h1>
        </Reveal>

        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative mt-10 aspect-video w-full overflow-hidden rounded-2xl sm:mt-14 sm:rounded-3xl lg:aspect-21/9"
        >
          <motion.div
            className="absolute inset-0"
            style={
              reduce ? undefined : { scale, y, willChange: "transform" }
            }
          >
            <Image
              src="/about-hero.jpeg"
              alt="The pach+ team collaborating on plant-powered transdermal patches."
              fill
              sizes="100vw"
              priority
              className="object-cover object-center"
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
            <span className="font-bold">Skip the pills,</span>{" "}
            <span className="font-extralight">wear your</span>{" "}
            <span className="font-bold">wellness instead.</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="max-w-[440px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm lg:col-span-5 lg:ml-auto lg:text-[15px]"
          >
            Don&rsquo;t just swallow another supplement. Discover a smoother,
            smarter delivery. Our team blends centuries of botanical wisdom
            with modern transdermal science, so your daily ritual fits in a
            single, considered patch.
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
