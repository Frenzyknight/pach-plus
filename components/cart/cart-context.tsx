"use client";

import {
  createContext,
  use,
  useCallback,
  useContext,
  useMemo,
  useOptimistic,
  useState,
} from "react";
import type {
  Cart,
  CartItem,
  Product as ShopifyProduct,
  ProductVariant,
} from "@/lib/shopify/types";

type UpdateType = "plus" | "minus" | "delete";

type CartAction =
  | {
      type: "UPDATE_ITEM";
      payload: { merchandiseId: string; updateType: UpdateType };
    }
  | {
      type: "ADD_ITEM";
      payload: {
        variant: ProductVariant;
        product: Pick<ShopifyProduct, "id" | "handle" | "title" | "featuredImage">;
        quantity: number;
      };
    };

type AddCartItemArgs = {
  variant: ProductVariant;
  product: Pick<ShopifyProduct, "id" | "handle" | "title" | "featuredImage">;
};

type CartContextType = {
  cart: Cart | undefined;
  updateCartItem: (merchandiseId: string, updateType: UpdateType) => void;
  addCartItem: (
    variant: ProductVariant,
    product: AddCartItemArgs["product"],
    quantity?: number,
  ) => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function calculateLineTotal(quantity: number, unitPrice: string): string {
  return (Number(unitPrice) * quantity).toString();
}

function updateCartLine(item: CartItem, updateType: UpdateType): CartItem | null {
  if (updateType === "delete") return null;
  const nextQty = updateType === "plus" ? item.quantity + 1 : item.quantity - 1;
  if (nextQty === 0) return null;
  const unit = Number(item.cost.totalAmount.amount) / item.quantity;
  return {
    ...item,
    quantity: nextQty,
    cost: {
      ...item.cost,
      totalAmount: {
        ...item.cost.totalAmount,
        amount: calculateLineTotal(nextQty, unit.toString()),
      },
    },
  };
}

function createOrUpdateLine(
  existing: CartItem | undefined,
  variant: ProductVariant,
  product: AddCartItemArgs["product"],
  addQuantity: number,
): CartItem {
  const safeAdd = Math.max(1, Math.floor(addQuantity));
  const quantity = existing ? existing.quantity + safeAdd : safeAdd;
  const totalAmount = calculateLineTotal(quantity, variant.price.amount);
  return {
    id: existing?.id,
    quantity,
    cost: {
      totalAmount: {
        amount: totalAmount,
        currencyCode: variant.price.currencyCode,
      },
    },
    merchandise: {
      id: variant.id,
      title: variant.title,
      selectedOptions: variant.selectedOptions,
      product: {
        id: product.id,
        handle: product.handle,
        title: product.title,
        featuredImage: product.featuredImage,
      },
    },
  };
}

function recomputeTotals(lines: CartItem[]): Pick<Cart, "totalQuantity" | "cost"> {
  const totalQuantity = lines.reduce((sum, line) => sum + line.quantity, 0);
  const totalAmount = lines.reduce(
    (sum, line) => sum + Number(line.cost.totalAmount.amount),
    0,
  );
  const currencyCode = lines[0]?.cost.totalAmount.currencyCode ?? "INR";
  return {
    totalQuantity,
    cost: {
      subtotalAmount: { amount: totalAmount.toString(), currencyCode },
      totalAmount: { amount: totalAmount.toString(), currencyCode },
      totalTaxAmount: { amount: "0", currencyCode },
    },
  };
}

function emptyCart(): Cart {
  return {
    id: undefined,
    checkoutUrl: "",
    totalQuantity: 0,
    lines: [],
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "INR" },
      totalAmount: { amount: "0", currencyCode: "INR" },
      totalTaxAmount: { amount: "0", currencyCode: "INR" },
    },
  };
}

function cartReducer(state: Cart | undefined, action: CartAction): Cart {
  const current = state ?? emptyCart();

  switch (action.type) {
    case "UPDATE_ITEM": {
      const { merchandiseId, updateType } = action.payload;
      const updated = current.lines
        .map((line) =>
          line.merchandise.id === merchandiseId
            ? updateCartLine(line, updateType)
            : line,
        )
        .filter((line): line is CartItem => Boolean(line));

      if (updated.length === 0) {
        return {
          ...current,
          lines: [],
          totalQuantity: 0,
          cost: {
            ...current.cost,
            totalAmount: { ...current.cost.totalAmount, amount: "0" },
          },
        };
      }

      return {
        ...current,
        ...recomputeTotals(updated),
        lines: updated,
      };
    }
    case "ADD_ITEM": {
      const { variant, product, quantity } = action.payload;
      const existing = current.lines.find(
        (line) => line.merchandise.id === variant.id,
      );
      const updatedLine = createOrUpdateLine(existing, variant, product, quantity);
      const lines = existing
        ? current.lines.map((line) =>
            line.merchandise.id === variant.id ? updatedLine : line,
          )
        : [...current.lines, updatedLine];

      return {
        ...current,
        ...recomputeTotals(lines),
        lines,
      };
    }
    default:
      return current;
  }
}

export function CartProvider({
  children,
  cartPromise,
}: {
  children: React.ReactNode;
  cartPromise: Promise<Cart | undefined>;
}) {
  const initialCart = use(cartPromise);
  const [optimisticCart, updateOptimisticCart] = useOptimistic(
    initialCart,
    cartReducer,
  );

  const [isOpen, setIsOpen] = useState(false);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), []);

  const updateCartItem = useCallback(
    (merchandiseId: string, updateType: UpdateType) => {
      updateOptimisticCart({
        type: "UPDATE_ITEM",
        payload: { merchandiseId, updateType },
      });
    },
    [updateOptimisticCart],
  );

  const addCartItem = useCallback(
    (
      variant: ProductVariant,
      product: AddCartItemArgs["product"],
      quantity: number = 1,
    ) => {
      updateOptimisticCart({
        type: "ADD_ITEM",
        payload: { variant, product, quantity },
      });
    },
    [updateOptimisticCart],
  );

  const value = useMemo<CartContextType>(
    () => ({
      cart: optimisticCart,
      updateCartItem,
      addCartItem,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
    }),
    [
      optimisticCart,
      updateCartItem,
      addCartItem,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
