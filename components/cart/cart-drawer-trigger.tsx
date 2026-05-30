"use client";

import { motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

export function CartDrawerTrigger({
  variant = "light",
  className,
}: {
  variant?: "light" | "dark";
  className?: string;
}) {
  const { cart, toggleCart } = useCart();
  const count = cart?.totalQuantity ?? 0;
  const hasItems = count > 0;

  const colorClass = variant === "dark" ? "text-white" : "text-foreground";

  return (
    <motion.button
      type="button"
      onClick={toggleCart}
      whileHover={{ y: -1, opacity: 0.8 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30",
        colorClass,
        className,
      )}
      aria-label={
        hasItems ? `Open bag with ${count} item${count === 1 ? "" : "s"}` : "Open bag"
      }
    >
      <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
      {hasItems ? (
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold leading-none text-white"
        >
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </motion.button>
  );
}
