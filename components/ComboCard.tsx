"use client";

import { useActionState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { revealItem } from "@/components/motion/Reveal";
import ClinicallyProvenBadge from "@/components/ClinicallyProvenBadge";
import { addItems } from "@/components/cart/actions";
import { useCart } from "@/components/cart/cart-context";
import { formatMoney } from "@/lib/format-money";
import type { Product } from "@/lib/products";

type ComboCardProps = {
  products: Product[];
  name?: string;
  tagline?: string;
  src?: string;
  accent?: string;
  bg?: string;
};

export default function ComboCard({
  products,
  name = "The Happy Trio",
  tagline = "All three patches, one daily ritual*",
  src = "/combo.jpeg",
  accent = "#0D3E32",
  bg = "#F4F5EF",
}: ComboCardProps) {
  const { addCartItem, openCart } = useCart();
  const [errorMessage, formAction, isPending] = useActionState(addItems, null);

  useEffect(() => {
    if (errorMessage) {
      console.warn("Add bundle to cart:", errorMessage);
    }
  }, [errorMessage]);

  const buyable = products.filter(
    (p) => p.variants[0] && p.shopify && !p.comingSoon,
  );
  const canAdd = products.length > 0 && buyable.length === products.length;

  const currencyCode = products[0]?.currencyCode ?? "INR";
  const totalAmount = products.reduce((sum, p) => {
    const variant = p.variants[0];
    return sum + (variant ? Number(variant.price.amount) : p.price);
  }, 0);
  const priceLabel = formatMoney({
    amount: totalAmount.toString(),
    currencyCode,
  });

  return (
    <motion.div
      className="group flex h-full flex-col"
      variants={revealItem}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <div
        className="relative aspect-square overflow-hidden rounded-2xl transition-transform duration-300 group-hover:scale-[1.02] md:aspect-auto md:flex-1"
        style={{ backgroundColor: bg }}
      >
        <ClinicallyProvenBadge
          size={56}
          className="absolute right-3 top-3 z-10 h-12 w-12 lg:h-14 lg:w-14"
        />
        <span
          className="absolute left-3 top-3 z-10 rounded-full px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white"
          style={{ backgroundColor: accent }}
        >
          Bundle
        </span>
        <Image
          src={src}
          alt={`${name} — Happy Gut, Happy Hormones and Happy Muscles pach+ pouches`}
          fill
          className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-4 min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {name}
          <span className="font-normal text-foreground/40"> &bull; {priceLabel}</span>
        </p>
        <p className="mt-0.5 text-xs text-foreground/50">{tagline}</p>
      </div>

      <form
        action={() => {
          if (!canAdd) return;
          for (const p of products) {
            const variant = p.variants[0];
            const shopify = p.shopify;
            if (!variant || !shopify) continue;
            addCartItem(
              variant,
              {
                id: shopify.id,
                handle: shopify.handle,
                title: shopify.title ?? p.name,
                featuredImage: shopify.featuredImage,
              },
              1,
            );
          }
          openCart();
          return formAction({
            lines: products.map((p) => ({
              variantId: p.variants[0]?.id,
              quantity: 1,
            })),
          });
        }}
        className="mt-4"
      >
        <motion.button
          type="submit"
          disabled={!canAdd || isPending}
          whileHover={!canAdd ? undefined : { scale: 1.02, y: -1 }}
          whileTap={!canAdd ? undefined : { scale: 0.97 }}
          transition={{ type: "spring", stiffness: 360, damping: 22 }}
          className="flex w-full items-center justify-center rounded-full py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          style={{ backgroundColor: accent, outlineColor: accent }}
          aria-label={`Add all three patches — ${name} — to bag`}
        >
          {isPending ? "Adding…" : "Add All 3 to Bag"}
        </motion.button>
      </form>

      {!canAdd ? (
        <p className="mt-2 text-[11px] font-medium text-foreground/50">
          Connect the storefront to enable bundle checkout.
        </p>
      ) : errorMessage ? (
        <p className="mt-2 text-[11px] font-medium text-red-700" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </motion.div>
  );
}
