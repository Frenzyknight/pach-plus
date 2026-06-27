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

function ValuesImage() {
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
  const y = useTransform(smoothed, [0, 1], ["-4%", "4%"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-10 aspect-4/3 w-full overflow-hidden rounded-2xl sm:mt-12 sm:rounded-3xl lg:aspect-[2.2/1]"
    >
      <motion.div
        className="absolute inset-0"
        style={
          reduce ? undefined : { y, scale: 1.08, willChange: "transform" }
        }
      >
        <Image
          src="/about-mobile-final.jpeg"
          alt="Two pach+ customers sharing a patch in a plant-filled apothecary."
          fill
          sizes="(max-width: 1023px) 100vw, 0px"
          className="object-cover object-center lg:hidden"
        />
        <Image
          src="/about-desktop-final.jpeg"
          alt="Two pach+ customers sharing a patch in a plant-filled apothecary."
          fill
          sizes="(min-width: 1400px) 1400px, (min-width: 1024px) 100vw, 0px"
          className="hidden object-cover object-center lg:block"
        />
      </motion.div>
    </motion.div>
  );
}

export default function AboutValues() {
  return (
    <section className="bg-white px-5 py-20 xs:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <Reveal
          stagger={0.08}
          amount={0.4}
          className="flex flex-col items-center text-center"
        >
          <motion.p
            variants={revealItem}
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4"
          >
            Our value
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="mx-auto max-w-[920px] leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            <span className="font-bold">Our commitment to</span>{" "}
            <span className="font-extralight">values-driven</span>{" "}
            <span className="font-bold">wellness.</span>
          </motion.h2>
        </Reveal>

        <ValuesImage />

        <Reveal
          stagger={0.1}
          amount={0.2}
          className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-14"
        >
          <motion.p
            variants={revealItem}
            className="text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm lg:text-base"
          >
            Our values shape every formulation decision we make. We prioritise
            integrity. Be it sourcing botanicals from growers we know by name,
            publishing our doses, or pricing patches honestly. Transparency
            isn&apos;t a campaign for us, it&apos;s a daily practice that
            you&apos;ll feel in the product long before you read about it.
          </motion.p>
          <motion.p
            variants={revealItem}
            className="text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm lg:text-base"
          >
            We pair this honesty with innovation. Clinical-grade ingredients,
            transdermal delivery research and an obsession with long-term
            wellness outcomes. As a result, each patch is engineered to do real
            work over time, not just deliver a quick hit. The goal is simple: a
            routine you&apos;ll actually keep, that keeps giving back.
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}
