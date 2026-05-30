"use client";

import { useActionState, useEffect } from "react";
import { motion } from "motion/react";
import type { ProductVariant, Product as ShopifyProduct } from "@/lib/shopify/types";
import { addItem } from "@/components/cart/actions";
import { useCart } from "@/components/cart/cart-context";
import { formatMoney } from "@/lib/format-money";

type AddToCartFormProps = {
  variant: ProductVariant | undefined;
  shopifyProduct: ShopifyProduct | undefined;
  /** How many of the variant to add per submission (default 1). */
  quantity?: number;
  /** Display label, e.g. "Add to Bag". */
  label?: string;
  /** Brand accent colour for the button background (per-product). */
  accent: string;
  /** Optional fallback name for optimistic UI when Shopify isn't available. */
  fallbackProductName?: string;
};

export function AddToCartForm({
  variant,
  shopifyProduct,
  quantity = 1,
  label = "Add to Bag",
  accent,
  fallbackProductName,
}: AddToCartFormProps) {
  const safeQuantity = Math.max(1, Math.floor(quantity));
  const { addCartItem, openCart } = useCart();
  const [errorMessage, formAction, isPending] = useActionState(addItem, null);

  useEffect(() => {
    if (errorMessage) {
      console.warn("Add to cart:", errorMessage);
    }
  }, [errorMessage]);

  const disabled = !variant || !shopifyProduct;

  const totalPriceLabel = variant
    ? formatMoney({
        amount: (Number(variant.price.amount) * safeQuantity).toString(),
        currencyCode: variant.price.currencyCode,
      })
    : null;

  return (
    <form
      action={async () => {
        if (!variant || !shopifyProduct) return;
        addCartItem(
          variant,
          {
            id: shopifyProduct.id,
            handle: shopifyProduct.handle,
            title: shopifyProduct.title ?? fallbackProductName ?? "",
            featuredImage: shopifyProduct.featuredImage,
          },
          safeQuantity,
        );
        openCart();
        await formAction({ variantId: variant.id, quantity: safeQuantity });
      }}
      className="w-full"
    >
      <motion.button
        type="submit"
        disabled={disabled || isPending}
        whileHover={disabled ? undefined : { scale: 1.01, y: -1 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        className="flex w-full items-center justify-between rounded-full px-5 py-4 text-[12px] font-black text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
        style={{ backgroundColor: accent }}
        aria-label={label}
      >
        <span>{isPending ? "Adding..." : label}</span>
        {totalPriceLabel ? <span>{totalPriceLabel}</span> : null}
      </motion.button>
      {errorMessage ? (
        <p className="mt-2 text-[11px] font-medium text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
