"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";

type ParallaxProps = {
  /** Translation in pixels at the end of the scroll range. */
  translateY?: [number, number];
  /** Scale range across the scroll range. */
  scale?: [number, number];
  /** Offset config passed to useScroll. */
  offset?: ["start end" | "start start", "end start" | "end end"];
  className?: string;
  children: React.ReactNode;
} & Omit<HTMLMotionProps<"div">, "style" | "ref">;

/**
 * Wraps children with a scroll-linked translate/scale tied to the wrapper's
 * scroll progress inside the viewport. Honors reduced-motion by rendering a
 * static element.
 */
export function Parallax({
  translateY,
  scale,
  offset = ["start end", "end start"],
  className,
  children,
  ...rest
}: ParallaxProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  const y = useTransform(smoothed, [0, 1], translateY ?? [0, 0]);
  const s = useTransform(smoothed, [0, 1], scale ?? [1, 1]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: translateY ? y : undefined,
        scale: scale ? s : undefined,
        willChange: "transform",
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
