import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/components/cart/cart-context";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { getCart } from "@/lib/shopify";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "pach+ | Transdermal Wellness Patches",
  description:
    "Experience the future of wellness with pach+'s tailored transdermal recovery patches.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cartPromise = getCart();

  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", inter.variable)}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <CartProvider cartPromise={cartPromise}>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
