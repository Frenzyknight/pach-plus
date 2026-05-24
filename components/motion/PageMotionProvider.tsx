"use client";

import { MotionConfig } from "motion/react";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";

export default function PageMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", stiffness: 140, damping: 22, mass: 0.9 }}
    >
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionConfig>
  );
}
