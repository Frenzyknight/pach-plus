/**
 * Client-safe product surface. Carries marketing content + a fallback price
 * with no runtime dependency on `@/lib/shopify` (which uses `next/headers`).
 *
 * Server-only helpers that fetch from Shopify live in `lib/products-server.ts`.
 */

import { COMING_SOON_TAG } from "@/lib/shopify/constants";
import type { Product as ShopifyProductType, ProductVariant } from "@/lib/shopify/types";
import {
  PRODUCT_CONTENT,
  getProductContent,
  type ProductContent,
} from "@/lib/content/products";

export type {
  ProductFaq,
  ProductIngredient,
  ProductTestimonial,
  ProductComparisonRow,
} from "@/lib/content/products";

export { SHARED_FAQS } from "@/lib/content/products";

export type Product = ProductContent & {
  /** Numeric price in store currency for display in cards. From Shopify when configured. */
  price: number;
  /** Currency code from Shopify; falls back to INR. */
  currencyCode: string;
  /** Variants from Shopify. Empty when Shopify is not configured. */
  variants: ProductVariant[];
  /** True when the product is unavailable (Shopify "coming-soon" tag or local fallback). */
  comingSoon: boolean;
  /** Underlying Shopify product when available. */
  shopify?: ShopifyProductType;
};

const FALLBACK_CURRENCY = "INR";

export function buildProductFromContent(
  content: ProductContent,
  shopify: ShopifyProductType | undefined,
): Product {
  if (shopify) {
    const minVariantPrice = shopify.priceRange.minVariantPrice;
    return {
      ...content,
      price: Number(minVariantPrice.amount),
      currencyCode: minVariantPrice.currencyCode,
      variants: shopify.variants,
      comingSoon: shopify.tags.includes(COMING_SOON_TAG) || !shopify.availableForSale,
      shopify,
    };
  }

  return {
    ...content,
    price: content.fallbackPrice,
    currencyCode: FALLBACK_CURRENCY,
    variants: [],
    comingSoon: Boolean(content.fallbackComingSoon),
  };
}

/** Synchronous list using local content + fallback prices only. Safe for client components. */
export const PRODUCTS: Product[] = PRODUCT_CONTENT.map((content) =>
  buildProductFromContent(content, undefined),
);

/** Synchronous lookup using local content. Safe for client components. */
export function getProductBySlug(slug: string): Product | undefined {
  const content = getProductContent(slug);
  return content ? buildProductFromContent(content, undefined) : undefined;
}

/** Synchronous related products from local content. Safe for client components. */
export function getRelatedProducts(product: Product): Product[] {
  return product.relatedSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((p): p is Product => Boolean(p));
}
