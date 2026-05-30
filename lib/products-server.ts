import {
  getProduct as getShopifyProduct,
  getProducts as getShopifyProducts,
} from "@/lib/shopify";
import { PRODUCT_CONTENT, getProductContent } from "@/lib/content/products";
import { buildProductFromContent, type Product } from "@/lib/products";

/** Async, Shopify-merged list. Use in server components. Falls back to local content when Shopify is not configured. */
export async function getMergedProducts(): Promise<Product[]> {
  const shopifyProducts = await getShopifyProducts();
  const byHandle = new Map(shopifyProducts.map((p) => [p.handle, p]));

  return PRODUCT_CONTENT.map((content) =>
    buildProductFromContent(content, byHandle.get(content.slug)),
  );
}

/** Async, Shopify-merged single product. Use in server components. Falls back to local content. */
export async function getMergedProduct(slug: string): Promise<Product | undefined> {
  const content = getProductContent(slug);
  if (!content) return undefined;
  const shopify = await getShopifyProduct(slug);
  return buildProductFromContent(content, shopify);
}

export async function getRelatedMergedProducts(product: Product): Promise<Product[]> {
  const all = await getMergedProducts();
  return product.relatedSlugs
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}
