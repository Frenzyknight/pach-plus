export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
  variants: ProductVariant[];
  featuredImage: Image | null;
  images: Image[];
  tags: string[];
  updatedAt: string;
};

export type CartItem = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: SelectedOption[];
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: Image | null;
    };
  };
};

export type Cart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: CartItem[];
  totalQuantity: number;
};

export type ShopifyConnection<T> = {
  edges: Array<{ node: T }>;
};

export type ShopifyProduct = Omit<Product, "variants" | "images"> & {
  variants: ShopifyConnection<ProductVariant>;
  images: ShopifyConnection<Image>;
};

export type ShopifyCart = Omit<Cart, "lines"> & {
  lines: ShopifyConnection<CartItem>;
};

export type ShopifyCartOperation = {
  data: { cart: ShopifyCart | null };
  variables: { cartId: string };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: { cartLinesAdd: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: Array<{ merchandiseId: string; quantity: number }>;
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: { cartLinesRemove: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: { cartLinesUpdate: { cart: ShopifyCart } };
  variables: {
    cartId: string;
    lines: Array<{ id: string; merchandiseId: string; quantity: number }>;
  };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct | null };
  variables: { handle: string };
};

export type ShopifyProductsOperation = {
  data: { products: ShopifyConnection<ShopifyProduct> };
  variables?: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyError = {
  status: number;
  message: Error;
  cause?: Error;
};
