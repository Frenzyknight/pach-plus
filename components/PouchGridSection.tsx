"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductCard } from "@/components/ShopSection";
import { PRODUCTS } from "@/lib/products";

export default function PouchGridSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const productCount = PRODUCTS.length;

  const goToPrevious = () => {
    setCurrentIndex((index) => (index - 1 + productCount) % productCount);
  };

  const goToNext = () => {
    setCurrentIndex((index) => (index + 1) % productCount);
  };

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-[11px] font-medium uppercase tracking-[0.25em] text-foreground/60">
            Shop the Pouches
          </h2>
          <Link
            href="/shop"
            className="text-[11px] font-medium uppercase tracking-[0.15em] text-foreground/60 underline underline-offset-4 transition-colors hover:text-foreground"
          >
            View All
          </Link>
        </div>

        <div className="sm:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {PRODUCTS.map((product) => (
                <div key={product.src} className="min-w-full">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={goToPrevious}
              className="flex size-11 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground shadow-[0_12px_30px_rgba(13,62,50,0.12)] transition-colors hover:bg-teal-900 hover:text-white"
              aria-label="Show previous product"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="flex items-center gap-2" aria-hidden="true">
              {PRODUCTS.map((product, index) => (
                <span
                  key={product.src}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-6 bg-teal-900"
                      : "w-2 bg-foreground/15"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              className="flex size-11 items-center justify-center rounded-full border border-foreground/10 bg-white text-foreground shadow-[0_12px_30px_rgba(13,62,50,0.12)] transition-colors hover:bg-teal-900 hover:text-white"
              aria-label="Show next product"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.src} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
