import { revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from "./constants";
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import { getProductQuery, getProductsQuery } from "./queries/product";
import type {
  Cart,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyConnection,
  ShopifyCreateCartOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation,
} from "./types";

const rawDomain = process.env.SHOPIFY_STORE_DOMAIN ?? "";
const domain = rawDomain
  ? rawDomain.startsWith("https://")
    ? rawDomain
    : `https://${rawDomain}`
  : "";
const endpoint = domain ? `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}` : "";

// Shopify's Storefront API uses different headers for the two token types:
//   - Public token  -> X-Shopify-Storefront-Access-Token
//   - Private token -> Shopify-Storefront-Private-Token
// The Headless channel surfaces both. For server-side calls (this app) the
// private token is preferred; the public one is the fallback.
const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN ?? "";
const publicToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ?? "";
const tokenHeaders: Record<string, string> = privateToken
  ? { "Shopify-Storefront-Private-Token": privateToken }
  : publicToken
    ? { "X-Shopify-Storefront-Access-Token": publicToken }
    : {};

export function isShopifyConfigured(): boolean {
  return Boolean(endpoint && (privateToken || publicToken));
}

type ExtractVariables<T> = T extends { variables: infer V }
  ? V
  : T extends { variables?: infer V }
    ? V | undefined
    : undefined;

type ShopifyFetchOptions<T> = {
  query: string;
  variables?: ExtractVariables<T>;
  tags?: string[];
  cache?: RequestCache;
};

type ShopifyFetchResult<T> = { status: number; body: T };

export async function shopifyFetch<T>({
  query,
  variables,
  tags,
  cache = "force-cache",
}: ShopifyFetchOptions<T>): Promise<ShopifyFetchResult<T>> {
  if (!isShopifyConfigured()) {
    throw new Error(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and either SHOPIFY_STOREFRONT_PRIVATE_TOKEN (recommended) or SHOPIFY_STOREFRONT_ACCESS_TOKEN in .env.local. See SHOPIFY_SETUP.md.",
    );
  }

  const result = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...tokenHeaders,
    },
    body: JSON.stringify({
      ...(query && { query }),
      ...(variables && { variables }),
    }),
    cache,
    ...(tags ? { next: { tags } } : {}),
  });

  const rawText = await result.text();
  let body: { errors?: unknown; data?: T } = {};
  try {
    body = rawText ? JSON.parse(rawText) : {};
  } catch {
    throw new Error(
      `Shopify request failed (${result.status}): non-JSON response — ${rawText.slice(0, 200)}`,
    );
  }

  if (!result.ok) {
    throw new Error(
      `Shopify request failed (${result.status} ${result.statusText}): ${formatErrors(body.errors) || rawText.slice(0, 200) || "no body"}`,
    );
  }

  if (body.errors) {
    throw new Error(`Shopify GraphQL error: ${formatErrors(body.errors)}`);
  }

  return {
    status: result.status,
    body: body as unknown as T,
  };
}

function formatErrors(errors: unknown): string {
  if (!errors) return "";
  if (typeof errors === "string") return errors;
  if (Array.isArray(errors)) {
    return errors
      .map((err) => {
        if (typeof err === "string") return err;
        if (err && typeof err === "object" && "message" in err) {
          return String((err as { message: unknown }).message);
        }
        return JSON.stringify(err);
      })
      .join("; ");
  }
  if (typeof errors === "object" && errors !== null && "message" in errors) {
    return String((errors as { message: unknown }).message);
  }
  return JSON.stringify(errors);
}

const removeEdgesAndNodes = <T>(connection: ShopifyConnection<T>): T[] =>
  connection.edges.map((edge) => edge.node);

function reshapeCart(cart: ShopifyCart): Cart {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: "0.0",
      currencyCode: cart.cost.totalAmount.currencyCode,
    };
  }
  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines),
  };
}

function reshapeProduct(product: ShopifyProduct | null): Product | undefined {
  if (!product) return undefined;
  const { images, variants, ...rest } = product;
  return {
    ...rest,
    images: removeEdgesAndNodes(images),
    variants: removeEdgesAndNodes(variants),
  };
}

function reshapeProducts(products: ShopifyProduct[]): Product[] {
  return products
    .map((p) => reshapeProduct(p))
    .filter((p): p is Product => Boolean(p));
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  if (!isShopifyConfigured()) return undefined;

  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: { handle },
    tags: [TAGS.products],
  });

  return reshapeProduct(res.body.data.product);
}

export async function getProducts(options?: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  if (!isShopifyConfigured()) return [];

  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    variables: options,
    tags: [TAGS.products],
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

export async function getProductHandles(): Promise<string[]> {
  const products = await getProducts();
  return products.map((p) => p.handle);
}

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: "no-store",
  });
  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: { cartId, lines },
    cache: "no-store",
  });
  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(): Promise<Cart | undefined> {
  if (!isShopifyConfigured()) return undefined;

  const cartId = (await cookies()).get("cartId")?.value;
  if (!cartId) return undefined;

  try {
    const res = await shopifyFetch<ShopifyCartOperation>({
      query: getCartQuery,
      variables: { cartId },
      cache: "no-store",
    });
    if (!res.body.data.cart) return undefined;
    return reshapeCart(res.body.data.cart);
  } catch {
    return undefined;
  }
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];
  const topic = (await headers()).get("x-shopify-topic") ?? "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error("Invalid revalidation secret.");
    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections, "max");
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products, "max");
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
