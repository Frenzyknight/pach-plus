"use client";

import { useActionState, useTransition } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import type { CartItem } from "@/lib/shopify/types";
import { removeItem } from "@/components/cart/actions";
import { useCart } from "@/components/cart/cart-context";

export function DeleteItemButton({ item }: { item: CartItem }) {
  const { updateCartItem } = useCart();
  const [, formAction] = useActionState(removeItem, null);
  const [isPending, startTransition] = useTransition();

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      onClick={() => {
        startTransition(() => {
          updateCartItem(item.merchandise.id, "delete");
          formAction(item.merchandise.id);
        });
      }}
      disabled={isPending}
      aria-label={`Remove ${item.merchandise.product.title} from bag`}
      className="flex h-6 w-6 items-center justify-center rounded-full text-foreground/40 transition-colors hover:bg-foreground/5 hover:text-foreground/80 disabled:opacity-50"
    >
      <X className="h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
    </motion.button>
  );
}
