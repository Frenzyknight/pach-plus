"use client";

import Image from "next/image";
import { useState } from "react";

type Slide = {
  type: "image" | "placeholder";
  src?: string;
  alt?: string;
  label?: string;
};

type Props = {
  productName: string;
  productSrc: string;
  bg: string;
};

function Arrow({ direction }: { direction: "left" | "right" }) {
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
      <path d={direction === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function ProductImageCarousel({ productName, productSrc, bg }: Props) {
  const slides: Slide[] = [
    { type: "image", src: productSrc, alt: `${productName} package` },
    { type: "placeholder", label: "Placeholder 1" },
    { type: "placeholder", label: "Placeholder 2" },
    { type: "placeholder", label: "Placeholder 3" },
  ];

  const [active, setActive] = useState(0);

  const go = (next: number) => {
    const total = slides.length;
    setActive(((next % total) + total) % total);
  };

  const current = slides[active];

  return (
    <div
      className="relative min-h-[520px] overflow-hidden rounded-3xl lg:min-h-[calc(100svh-9rem)]"
      style={{ backgroundColor: bg }}
    >
      {current.type === "image" && current.src ? (
        <Image
          src={current.src}
          alt={current.alt ?? productName}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain p-16 sm:p-24 lg:p-28"
          priority
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[11px] font-black uppercase tracking-[0.25em] text-black/40">
            {current.label}
          </span>
        </div>
      )}

      <button
        type="button"
        onClick={() => go(active - 1)}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black backdrop-blur transition-colors hover:bg-white sm:left-5 sm:h-11 sm:w-11"
      >
        <Arrow direction="left" />
      </button>
      <button
        type="button"
        onClick={() => go(active + 1)}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/70 text-black backdrop-blur transition-colors hover:bg-white sm:right-5 sm:h-11 sm:w-11"
      >
        <Arrow direction="right" />
      </button>

      <div className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/10 px-3 py-2 backdrop-blur">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              index === active ? "w-5 bg-black/45" : "w-1.5 bg-black/20 hover:bg-black/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
