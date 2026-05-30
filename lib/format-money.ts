import type { Money } from "@/lib/shopify/types";

export function formatMoney(money: Money | undefined | null, locale: string = "en-IN"): string {
  if (!money) return "";
  const amount = Number(money.amount);
  const isInteger = Number.isInteger(amount);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: money.currencyCode,
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPriceRange(money: Money | undefined | null, locale: string = "en-IN"): string {
  return formatMoney(money, locale);
}
