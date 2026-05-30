"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useCart } from "@/components/cart/cart-context";

export function CartEmptyState() {
  const { closeCart } = useCart();

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100/60"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-7 w-7 text-teal-900"
        >
          <path d="M6 2l1.5 4M18 2l-1.5 4M3 6h18l-1.5 12.5a2 2 0 0 1-2 1.5H6.5a2 2 0 0 1-2-1.5L3 6z" />
          <path d="M9 11v3M15 11v3" />
        </svg>
      </div>
      <div className="space-y-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60">
          Your bag
        </p>
        <h3
          className="leading-[1.05] tracking-[-0.03em] text-foreground"
          style={{ fontSize: "clamp(1.5rem, 3.5vw, 2rem)" }}
        >
          <span className="font-bold">Empty</span>{" "}
          <span className="font-extralight">for now.</span>
        </h3>
        <p className="text-[12px] font-medium leading-relaxed text-foreground/60">
          Find a patch that fits your day.
        </p>
      </div>
      <motion.div
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
      >
        <Link
          href="/shop"
          onClick={closeCart}
          className="inline-flex items-center gap-2 rounded-full bg-teal-900 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-teal-700"
        >
          Shop now
        </Link>
      </motion.div>
    </div>
  );
}
