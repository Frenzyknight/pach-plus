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

export default function BannerSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  const imageScale = useTransform(smoothed, [0, 1], [1.06, 1.12]);
  const imageY = useTransform(smoothed, [0, 1], ["0%", "-6%"]);

  return (
    <section
      className="relative overflow-hidden bg-slate-100"
      aria-label="Buy 2, get 1 free promotion"
    >
      <div
        ref={sectionRef}
        className="relative h-[80svh] min-h-[520px] w-full overflow-hidden md:h-[80vh]"
      >
        <motion.div
          className="absolute inset-0"
          style={
            reduce
              ? undefined
              : {
                  scale: imageScale,
                  y: imageY,
                  willChange: "transform",
                }
          }
        >
          <picture className="absolute inset-0 block">
            <source media="(max-width: 639px)" srcSet="/banner-mobile-final.jpeg" />
            <source media="(max-width: 1023px)" srcSet="/banner-tablet-complete.jpeg" />
            <Image
              src="/girl-banner.jpeg"
              alt="No pills. No powders. Just results. Buy 2, get 1 free."
              fill
              loading="eager"
              fetchPriority="high"
              sizes="100vw"
              className="object-cover object-center sm:object-bottom-left lg:object-center"
            />
          </picture>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.35,
          }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 sm:bottom-14 sm:left-[45%] sm:translate-x-0 lg:bottom-16"
        >
          <motion.div
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <Link
              href="/shop"
              className="inline-block rounded-full bg-[#2E2544] px-5 py-3 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.22)] hover:bg-[#20182F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E2544]"
            >
              Shop Special Sale
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
