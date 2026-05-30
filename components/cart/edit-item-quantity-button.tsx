"use client";

import { useActionState, useTransition } from "react";
import { motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import type { CartItem } from "@/lib/shopify/types";
import { updateItemQuantity } from "@/components/cart/actions";
import { useCart } from "@/components/cart/cart-context";

type EditAction = "plus" | "minus";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: EditAction;
}) {
  const { updateCartItem } = useCart();
  const [, formAction] = useActionState(updateItemQuantity, null);
  const [isPending, startTransition] = useTransition();

  const nextQuantity = type === "plus" ? item.quantity + 1 : item.quantity - 1;

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 360, damping: 22 }}
      onClick={() => {
        startTransition(() => {
          updateCartItem(item.merchandise.id, type);
          formAction({
            merchandiseId: item.merchandise.id,
            quantity: nextQuantity,
          });
        });
      }}
      disabled={isPending}
      aria-label={type === "plus" ? "Increase quantity" : "Decrease quantity"}
      className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-colors hover:bg-foreground/5 disabled:opacity-50"
    >
      {type === "plus" ? (
        <Plus className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Minus className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      )}
    </motion.button>
  );
}
