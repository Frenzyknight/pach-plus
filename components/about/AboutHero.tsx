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
  const y = useTransform(smoothed, [0, 1], ["3%", "-3%"]);

  return (
    <section
      id="team"
      className="bg-white px-5 pt-24 xs:px-6 sm:pt-28 lg:px-10 lg:pt-32"
    >
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
          className="relative mt-10 w-full overflow-hidden rounded-2xl aspect-4/5 sm:mt-14 sm:aspect-video sm:rounded-3xl"
        >
          <motion.div
            className="absolute inset-0"
            style={reduce ? undefined : { scale: 1.08, y, willChange: "transform" }}
          >
            <Image
              src="/mobile-about.jpeg"
              alt="The pach+ team collaborating on plant-powered transdermal patches."
              fill
              sizes="(max-width: 640px) calc(100vw - 48px), 0px"
              priority
              className="object-contain object-center sm:hidden"
            />
            <Image
              src="/desktop-about.jpeg"
              alt="The pach+ team collaborating on plant-powered transdermal patches."
              fill
              sizes="(min-width: 1024px) calc(100vw - 80px), (min-width: 640px) calc(100vw - 48px), 0px"
              priority
              className="hidden object-contain object-center sm:block"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
