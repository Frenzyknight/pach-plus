"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import ProductImageCarousel from "@/components/product-detail/ProductImageCarousel";
import { AddToCartForm } from "@/components/cart/add-to-cart-form";
import { formatMoney } from "@/lib/format-money";

type SupplyKey = 24 | 48 | 72;

type SupplyOption = {
  value: SupplyKey;
  label: string;
  /** Quantity multiplier — single Shopify variant; supply selection just adds N. */
  multiplier: number;
};

const SUPPLY_OPTIONS: SupplyOption[] = [
  { value: 24, label: "24 Day Supply", multiplier: 1 },
  { value: 48, label: "48 Day Supply", multiplier: 2 },
  { value: 72, label: "72 Day Supply", multiplier: 3 },
];

function AccentPill({
  active,
  accent,
  onClick,
  ariaPressed,
  children,
  disabled,
}: {
  active: boolean;
  accent: string;
  onClick: () => void;
  ariaPressed?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  const [hover, setHover] = useState(false);
  const filled = active || hover;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-pressed={ariaPressed}
      disabled={disabled}
      className="rounded-full border px-3 py-2.5 text-[11px] font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      style={{
        backgroundColor: disabled
          ? "transparent"
          : filled
            ? hover
              ? accent
              : "#F4F5EF"
            : "transparent",
        color: disabled ? "rgba(0,0,0,0.4)" : hover ? "#fff" : "#000",
        borderColor: disabled
          ? "rgba(0,0,0,0.2)"
          : filled
            ? accent
            : "#000",
      }}
    >
      {children}
    </button>
  );
}

export default function ProductHero({ product }: { product: Product }) {
  const [supply, setSupply] = useState<SupplyKey>(24);

  // Single Shopify variant per product. Supply selection becomes a quantity
  // multiplier (24 = 1x, 48 = 2x, 72 = 3x) on top of that variant.
  const baseVariant = product.variants[0];
  const selectedOption =
    SUPPLY_OPTIONS.find((option) => option.value === supply) ?? SUPPLY_OPTIONS[0];
  const multiplier = selectedOption.multiplier;

  const headlineUnitPrice = baseVariant
    ? Number(baseVariant.price.amount)
    : product.price;
  const headlineCurrency = baseVariant
    ? baseVariant.price.currencyCode
    : product.currencyCode;
  const headlinePrice = formatMoney({
    amount: (headlineUnitPrice * multiplier).toString(),
    currencyCode: headlineCurrency,
  });

  return (
    <section className="grid min-h-[calc(100svh-6rem)] grid-cols-1 gap-4 border-b border-black/10 bg-white p-4 lg:grid-cols-[59%_41%] lg:gap-6 lg:p-6">
      <ProductImageCarousel
        productName={product.name}
        productSrc={product.src}
        bg={product.bg}
        gallerySlides={product.gallerySlides}
      />

      <div className="bg-white px-2 py-8 sm:px-6 lg:px-8 lg:py-9">
        <div className="mx-auto max-w-[520px]">
          <div className="mb-3 flex items-start justify-between gap-6">
            <div>
              <p className="text-[12px] font-semibold">{product.type}</p>
              <h1 className="mt-1 text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
                {product.name}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black">{headlinePrice}</p>
            </div>
          </div>

          <div className="mb-7 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full px-3 py-1.5 text-[10px] font-black text-white"
                style={{ backgroundColor: product.accent }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="space-y-4 text-[13px] font-medium leading-relaxed text-black/78">
            <p>
              <strong>{product.tagline}</strong> {product.heroDescription}
            </p>
            <p>{product.heroSubcopy}</p>
          </div>

          <div className="my-7 border-y border-black/15 py-4 text-[12px] font-black">
            {product.detailLine}
          </div>

          {product.comingSoon ? (
            <div
              className="rounded-2xl border-2 px-6 py-8 text-center"
              style={{ borderColor: product.accent, backgroundColor: product.bg }}
            >
              <span
                className="inline-block rounded-full px-4 py-1.5 text-[10px] font-black tracking-[0.25em] uppercase text-white mb-4"
                style={{ backgroundColor: product.accent }}
              >
                Coming Soon
              </span>
              <p className="text-sm font-semibold text-black/70 leading-relaxed">
                We&apos;re putting the finishing touches on this one. Check back soon to be first to try it.
              </p>
              <button
                type="button"
                disabled
                className="mt-5 w-full rounded-full py-3.5 text-[11px] font-black tracking-[0.15em] uppercase text-white opacity-70 cursor-not-allowed"
                style={{ backgroundColor: product.accent }}
              >
                Notify Me
              </button>
            </div>
          ) : (
            <>
              <p className="mb-3 text-[14px] font-black">Daily Use</p>

              <div className="mb-7 grid grid-cols-3 gap-2">
                {SUPPLY_OPTIONS.map((option) => (
                  <AccentPill
                    key={option.value}
                    active={supply === option.value}
                    accent={product.accent}
                    onClick={() => setSupply(option.value)}
                    ariaPressed={supply === option.value}
                  >
                    {option.label}
                  </AccentPill>
                ))}
              </div>

              <AddToCartForm
                variant={baseVariant}
                shopifyProduct={product.shopify}
                accent={product.accent}
                quantity={multiplier}
                fallbackProductName={product.name}
                label="Add to Bag"
              />

              {!product.shopify ? (
                <p className="mt-3 text-[11px] font-medium text-black/50">
                  Storefront not yet connected. See{" "}
                  <code className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[10px]">
                    SHOPIFY_SETUP.md
                  </code>{" "}
                  to enable purchases.
                </p>
              ) : null}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
