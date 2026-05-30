"use client";

import { useFormStatus } from "react-dom";
import { motion } from "motion/react";
import { redirectToCheckout } from "@/components/cart/actions";

function CheckoutSubmit() {
  const { pending } = useFormStatus();
  return (
    <motion.button
      type="submit"
      disabled={pending}
      whileHover={pending ? undefined : { scale: 1.01, y: -1 }}
      whileTap={pending ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-900 px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
      aria-label="Proceed to checkout"
    >
      <span>{pending ? "Redirecting..." : "Proceed to checkout"}</span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </motion.button>
  );
}

export function CheckoutButton() {
  return (
    <form action={redirectToCheckout}>
      <CheckoutSubmit />
    </form>
  );
}
