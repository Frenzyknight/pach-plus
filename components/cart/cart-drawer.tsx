"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { useCart } from "@/components/cart/cart-context";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { CartEmptyState } from "@/components/cart/cart-empty-state";
import { CheckoutButton } from "@/components/cart/checkout-button";
import { formatMoney } from "@/lib/format-money";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;

export function CartDrawer() {
  const { cart, isOpen, closeCart } = useCart();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  const lines = cart?.lines ?? [];
  const hasItems = lines.length > 0;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="cart-drawer-root"
          className="fixed inset-0 z-70"
          aria-hidden={!isOpen}
        >
          <motion.button
            type="button"
            onClick={closeCart}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: REVEAL_EASE }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            aria-label="Close bag"
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your bag"
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 32,
              mass: 0.9,
            }}
            className="absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-white shadow-[-12px_0_60px_-30px_rgba(13,62,50,0.45)]"
          >
            <header className="flex items-center justify-between border-b border-foreground/10 px-6 py-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60">
                Your bag
                {hasItems ? (
                  <span className="ml-2 text-foreground/90">
                    ({cart?.totalQuantity})
                  </span>
                ) : null}
              </p>
              <motion.button
                type="button"
                onClick={closeCart}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="flex h-8 w-8 items-center justify-center rounded-full text-foreground/60 transition-colors hover:bg-foreground/5 hover:text-foreground"
                aria-label="Close bag"
              >
                <X className="h-4 w-4" strokeWidth={1.6} aria-hidden="true" />
              </motion.button>
            </header>

            {hasItems ? (
              <div className="flex flex-1 flex-col overflow-hidden">
                <ul className="flex-1 divide-y divide-foreground/10 overflow-y-auto px-6">
                  {lines.map((item) => (
                    <CartLineItem
                      key={item.id ?? item.merchandise.id}
                      item={item}
                    />
                  ))}
                </ul>

                <footer className="border-t border-foreground/10 px-6 py-5">
                  <div className="space-y-2 pb-4 text-[12px] font-medium">
                    <div className="flex items-center justify-between text-foreground/60">
                      <span>Subtotal</span>
                      <span className="text-foreground">
                        {formatMoney(cart?.cost.subtotalAmount)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-foreground/60">
                      <span>Taxes</span>
                      <span className="text-foreground/55">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>
                  <CheckoutButton />
                  <p className="mt-3 text-center text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/45">
                    Shipping calculated at checkout
                  </p>
                </footer>
              </div>
            ) : (
              <CartEmptyState />
            )}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
