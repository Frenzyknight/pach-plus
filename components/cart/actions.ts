"use server";

import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  addToCart,
  createCart,
  getCart,
  isShopifyConfigured,
  removeFromCart,
  updateCart,
} from "@/lib/shopify";

const ONE_YEAR = 60 * 60 * 24 * 365;

async function getOrCreateCartId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get("cartId")?.value;
  if (existing) {
    const cart = await getCart();
    if (cart?.id) return cart.id;
  }
  const fresh = await createCart();
  if (!fresh.id) {
    throw new Error("Failed to create cart in Shopify");
  }
  cookieStore.set("cartId", fresh.id, {
    maxAge: ONE_YEAR,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  return fresh.id;
}

type AddItemPayload = {
  variantId: string | undefined;
  quantity?: number;
};

export async function addItem(
  _prevState: unknown,
  payload: AddItemPayload,
): Promise<string | undefined> {
  if (!isShopifyConfigured()) {
    return "Shopify is not configured. See SHOPIFY_SETUP.md.";
  }
  if (!payload.variantId) {
    return "Please select a variant before adding to bag.";
  }

  const quantity = Math.max(1, Math.floor(payload.quantity ?? 1));

  try {
    const cartId = await getOrCreateCartId();
    await addToCart(cartId, [{ merchandiseId: payload.variantId, quantity }]);
    refresh();
  } catch (error) {
    console.error("addItem failed", error);
    return "We couldn't add this to your bag. Please try again.";
  }
}

type AddItemsPayload = {
  lines: { variantId: string | undefined; quantity?: number }[];
};

export async function addItems(
  _prevState: unknown,
  payload: AddItemsPayload,
): Promise<string | undefined> {
  if (!isShopifyConfigured()) {
    return "Shopify is not configured. See SHOPIFY_SETUP.md.";
  }

  const lines = (payload.lines ?? [])
    .filter((line): line is { variantId: string; quantity?: number } =>
      Boolean(line.variantId),
    )
    .map((line) => ({
      merchandiseId: line.variantId,
      quantity: Math.max(1, Math.floor(line.quantity ?? 1)),
    }));

  if (lines.length === 0) {
    return "Please select items before adding to bag.";
  }

  try {
    const cartId = await getOrCreateCartId();
    await addToCart(cartId, lines);
    refresh();
  } catch (error) {
    console.error("addItems failed", error);
    return "We couldn't add these to your bag. Please try again.";
  }
}

export async function removeItem(
  _prevState: unknown,
  merchandiseId: string,
): Promise<string | undefined> {
  if (!isShopifyConfigured()) return "Shopify is not configured.";

  try {
    const cart = await getCart();
    if (!cart?.id) return "Your bag is empty.";

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );
    if (lineItem?.id) {
      await removeFromCart(cart.id, [lineItem.id]);
      refresh();
    }
  } catch (error) {
    console.error("removeItem failed", error);
    return "We couldn't remove that item. Please try again.";
  }
}

export async function updateItemQuantity(
  _prevState: unknown,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
): Promise<string | undefined> {
  if (!isShopifyConfigured()) return "Shopify is not configured.";

  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart();
    if (!cart?.id) return "Your bag is empty.";

    const lineItem = cart.lines.find(
      (line) => line.merchandise.id === merchandiseId,
    );

    if (lineItem?.id) {
      if (quantity === 0) {
        await removeFromCart(cart.id, [lineItem.id]);
      } else {
        await updateCart(cart.id, [
          { id: lineItem.id, merchandiseId, quantity },
        ]);
      }
    } else if (quantity > 0) {
      await addToCart(cart.id, [{ merchandiseId, quantity }]);
    }

    refresh();
  } catch (error) {
    console.error("updateItemQuantity failed", error);
    return "We couldn't update your bag. Please try again.";
  }
}

export async function redirectToCheckout(): Promise<void> {
  if (!isShopifyConfigured()) {
    redirect("/shop");
  }

  const cart = await getCart();
  if (!cart?.checkoutUrl) {
    redirect("/shop");
  }
  redirect(cart.checkoutUrl);
}
