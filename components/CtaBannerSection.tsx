"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

export default function CtaBannerSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  const imageScale = useTransform(smoothed, [0, 1], [1.02, 1.08]);
  const imageY = useTransform(smoothed, [0, 1], ["2%", "-4%"]);

  return (
    <section
      className="relative overflow-hidden bg-slate-100"
      aria-label="The Metabolic Trio bundle"
    >
      <div
        ref={sectionRef}
        className="relative h-[88svh] min-h-[560px] w-full overflow-hidden sm:h-auto sm:min-h-0"
      >
        <motion.div
          className="block sm:hidden absolute inset-0"
          style={
            reduce
              ? undefined
              : { scale: imageScale, y: imageY, willChange: "transform" }
          }
        >
          <picture>
            <img
              src="/mobile-cta.jpeg"
              alt="The Metabolic Trio — three plant-powered patches designed for consistent daily wellness routines."
              className="absolute inset-0 h-full w-full object-cover object-top"
              loading="lazy"
            />
          </picture>
        </motion.div>

        <motion.div
          className="relative hidden aspect-2/1 w-full sm:block"
          style={
            reduce
              ? undefined
              : { scale: imageScale, y: imageY, willChange: "transform" }
          }
        >
          <Image
            src="/cta-desktop.jpeg"
            alt="The Metabolic Trio — three plant-powered patches designed for consistent daily wellness routines."
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:bottom-10 lg:bottom-14"
        >
          <motion.div
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            initial="rest"
            animate="rest"
          >
            <Link
              href="/shop"
              className="group flex items-center gap-0"
              aria-label="Shop the Metabolic Trio bundle"
            >
              <motion.span
                variants={{
                  rest: { scale: 1, rotate: 0 },
                  hover: { scale: 1.08, rotate: 8 },
                }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-white"
              >
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                  variants={{
                    rest: { x: 0, y: 0 },
                    hover: { x: 1, y: -1 },
                  }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </motion.svg>
              </motion.span>
              <motion.span
                variants={{
                  rest: { paddingLeft: 24, paddingRight: 28 },
                  hover: { paddingLeft: 28, paddingRight: 32 },
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="ml-[-14px] rounded-full bg-teal-900 py-3.5 text-sm font-medium tracking-[0.08em] text-white group-hover:bg-teal-700"
              >
                Shop now
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
