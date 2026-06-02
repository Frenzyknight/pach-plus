"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import IngredientFlipCard from "@/components/IngredientFlipCard";
import { INGREDIENTS, type Ingredient } from "@/lib/ingredients";
import type { Product } from "@/lib/products";

function CarouselArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

function ArrowButton({
  direction,
  accent,
  disabled,
  onClick,
  label,
}: {
  direction: "left" | "right";
  accent: string;
  disabled: boolean;
  onClick: () => void;
  label: string;
}) {
  const [hover, setHover] = useState(false);
  const filled = hover && !disabled;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-label={label}
      disabled={disabled}
      className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
      style={{
        borderColor: filled ? accent : "rgba(0,0,0,0.15)",
        backgroundColor: filled ? accent : "#fff",
        color: filled ? "#fff" : "#000",
      }}
    >
      <CarouselArrowIcon direction={direction} />
    </button>
  );
}

function ExploreScienceButton({ accent }: { accent: string }) {
  const [hover, setHover] = useState(false);
  return (
    <Link
      href="/science#herbal-index"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      className="rounded-full border px-8 py-3 text-[11px] font-bold transition-colors"
      style={{
        borderColor: hover ? accent : "#000",
        backgroundColor: hover ? accent : "transparent",
        color: hover ? "#fff" : "#000",
      }}
    >
      Explore the Science
    </Link>
  );
}

function IngredientsCarousel({
  items,
  accent,
}: {
  items: Ingredient[];
  accent: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const updateScrollState = () => {
      setCanScrollPrev(scroller.scrollLeft > 1);
      setCanScrollNext(
        scroller.scrollLeft < scroller.scrollWidth - scroller.clientWidth - 1,
      );
    };

    updateScrollState();
    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items.length]);

  const scrollByCard = (direction: "prev" | "next") => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const first = scroller.children[0] as HTMLElement | undefined;
    const second = scroller.children[1] as HTMLElement | undefined;
    if (!first) return;

    const distance = second
      ? second.offsetLeft - first.offsetLeft
      : first.clientWidth;
    scroller.scrollBy({
      left: direction === "prev" ? -distance : distance,
      behavior: "smooth",
    });
  };

  const goPrev = () => scrollByCard("prev");
  const goNext = () => scrollByCard("next");

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 lg:gap-6 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((ingredient, index) => (
          <div
            key={ingredient.index}
            className="w-full shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3rem)/3)]"
          >
            <IngredientFlipCard
              ingredient={ingredient}
              showFlipHint={index === 0}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <ArrowButton
          direction="left"
          accent={accent}
          disabled={!canScrollPrev}
          onClick={goPrev}
          label="Previous ingredient"
        />

        <ExploreScienceButton accent={accent} />

        <ArrowButton
          direction="right"
          accent={accent}
          disabled={!canScrollNext}
          onClick={goNext}
          label="Next ingredient"
        />
      </div>
    </div>
  );
}

export default function ProductIngredients({ product }: { product: Product }) {
  const items = INGREDIENTS.filter((i) => i.patch === product.patch);

  return (
    <section className="overflow-hidden bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <h2 className="text-2xl font-black leading-[0.98] tracking-[-0.055em] sm:text-3xl">
          {product.ingredientsHeading}
        </h2>
        <p className="mt-6 text-[15px] font-medium leading-relaxed text-black/62">
          {product.ingredientsCopy}
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-[1400px] px-5 xs:px-6 lg:px-10">
        <IngredientsCarousel items={items} accent={product.accent} />
      </div>
    </section>
  );
}
