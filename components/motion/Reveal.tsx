"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";

type RevealTag = "div" | "section" | "h2" | "p" | "ul" | "li" | "span";

type RevealProps = {
  as?: RevealTag;
  delay?: number;
  y?: number;
  stagger?: number;
  amount?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<
  HTMLMotionProps<"div">,
  "variants" | "initial" | "whileInView" | "viewport"
>;

export function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  stagger,
  amount = 0.25,
  className,
  children,
  ...rest
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
        ...(stagger
          ? { staggerChildren: stagger, delayChildren: delay }
          : {}),
      },
    },
  };

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const revealItemFromReduced: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};
