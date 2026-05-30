"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import type { CartItem } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/format-money";
import { useCart } from "@/components/cart/cart-context";
import { DeleteItemButton } from "@/components/cart/delete-item-button";
import { EditItemQuantityButton } from "@/components/cart/edit-item-quantity-button";

export function CartLineItem({ item }: { item: CartItem }) {
  const { closeCart } = useCart();
  const variantLabel = item.merchandise.selectedOptions
    .filter((option) => option.value && option.value !== "Default Title")
    .map((option) => option.value)
    .join(" / ");

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-4 py-5"
    >
      <Link
        href={`/products/${item.merchandise.product.handle}`}
        onClick={closeCart}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-foreground/5"
        aria-label={`View ${item.merchandise.product.title}`}
      >
        {item.merchandise.product.featuredImage ? (
          <Image
            src={item.merchandise.product.featuredImage.url}
            alt={item.merchandise.product.featuredImage.altText || item.merchandise.product.title}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${item.merchandise.product.handle}`}
              onClick={closeCart}
              className="block truncate text-sm font-semibold text-foreground hover:underline"
            >
              {item.merchandise.product.title}
            </Link>
            {variantLabel ? (
              <p className="mt-0.5 truncate text-[11px] font-medium text-foreground/55">
                {variantLabel}
              </p>
            ) : null}
          </div>
          <DeleteItemButton item={item} />
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex items-center gap-2 rounded-full">
            <EditItemQuantityButton item={item} type="minus" />
            <span className="min-w-[1.5ch] text-center text-[12px] font-semibold tabular-nums">
              {item.quantity}
            </span>
            <EditItemQuantityButton item={item} type="plus" />
          </div>
          <p className="text-sm font-bold text-foreground">
            {formatMoney(item.cost.totalAmount)}
          </p>
        </div>
      </div>
    </motion.li>
  );
}
