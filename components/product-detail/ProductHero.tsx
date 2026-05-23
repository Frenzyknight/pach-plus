"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/products";
import ProductImageCarousel from "@/components/product-detail/ProductImageCarousel";

type Supply = 30 | 60 | 90;
type PurchaseMode = "subscribe" | "single";
type Frequency = "2w" | "1m" | "2m";

const SUPPLY_OPTIONS: { value: Supply; label: string }[] = [
  { value: 30, label: "30 Day Supply" },
  { value: 60, label: "60 Day Supply" },
  { value: 90, label: "90 Day Supply" },
];

const FREQUENCY_OPTIONS: { value: Frequency; label: string }[] = [
  { value: "2w", label: "Delivered every 2 weeks" },
  { value: "1m", label: "Delivered every month" },
  { value: "2m", label: "Delivered every 2 months" },
];

function Rating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-semibold">
      <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 fill-amber-400"
            aria-hidden="true"
          >
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78z" />
          </svg>
        ))}
      </span>
      <span>({reviews})</span>
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3 transition-transform duration-200"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function AccentPill({
  active,
  accent,
  onClick,
  ariaPressed,
  children,
}: {
  active: boolean;
  accent: string;
  onClick: () => void;
  ariaPressed?: boolean;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);
  const filled = active || hover;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-pressed={ariaPressed}
      className="rounded-full border px-3 py-2.5 text-[11px] font-bold transition-colors"
      style={{
        backgroundColor: filled ? (hover ? accent : "#F4F5EF") : "transparent",
        color: hover ? "#fff" : "#000",
        borderColor: filled ? accent : "#000",
      }}
    >
      {children}
    </button>
  );
}

function ModeTab({
  active,
  accent,
  onClick,
  children,
  ariaLabel,
}: {
  active: boolean;
  accent: string;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  const [hover, setHover] = useState(false);
  const filled = active || hover;
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
      aria-pressed={active}
      aria-label={ariaLabel}
      className="py-3 transition-colors"
      style={{
        backgroundColor: filled ? accent : "#fff",
        color: filled ? "#fff" : "rgba(0,0,0,0.55)",
      }}
    >
      {children}
    </button>
  );
}

function FrequencyDropdown({
  value,
  onChange,
}: {
  value: Frequency;
  onChange: (next: Frequency) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = FREQUENCY_OPTIONS.find((option) => option.value === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-2xl border border-black bg-[#F4F5EF] px-4 py-3 text-left text-[12px] font-semibold"
      >
        <span>{selected?.label}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Delivery frequency"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-2xl border border-black bg-[#F4F5EF] p-2 text-[12px] font-semibold shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]"
        >
          {FREQUENCY_OPTIONS.map((option) => {
            const isSelected = option.value === value;
            return (
              <li
                key={option.value}
                role="option"
                aria-selected={isSelected}
                tabIndex={0}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onChange(option.value);
                    setOpen(false);
                  }
                }}
                className="cursor-pointer rounded-xl px-3 py-2.5 outline-none transition-colors hover:bg-black/5 focus-visible:bg-black/5"
                style={{ color: isSelected ? "#000" : "rgba(0,0,0,0.7)" }}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function ProductHero({ product }: { product: Product }) {
  const [supply, setSupply] = useState<Supply>(30);
  const [mode, setMode] = useState<PurchaseMode>("subscribe");
  const [frequency, setFrequency] = useState<Frequency>("2w");

  const multiplier = supply / 30;
  const basePrice = product.price * multiplier;
  const finalPrice = mode === "subscribe" ? basePrice * 0.9 : basePrice;

  const formatPrice = useCallback(
    (value: number) =>
      `₹${value.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
    [],
  );

  return (
    <section className="grid min-h-[calc(100svh-6rem)] grid-cols-1 gap-4 border-b border-black/10 bg-white p-4 lg:grid-cols-[59%_41%] lg:gap-6 lg:p-6">
      <ProductImageCarousel
        productName={product.name}
        productSrc={product.src}
        bg={product.bg}
      />

      <div className="bg-white px-2 py-8 sm:px-6 lg:px-8 lg:py-9">
        <div className="mx-auto max-w-[520px]">
          <div className="mb-3 flex items-start justify-between gap-6">
            <div>
              <p className="text-[12px] font-semibold">{product.type}</p>
              <h1 className="mt-1 text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">
                {product.name}
              </h1>
            </div>
            <div className="text-right">
              <Rating rating={product.rating} reviews={product.reviews} />
              <p className="mt-1 text-2xl font-black">₹{product.price}</p>
            </div>
          </div>

          <div className="mb-7 flex flex-wrap gap-2">
            {product.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full px-3 py-1.5 text-[10px] font-black text-white"
                style={{ backgroundColor: product.accent }}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="space-y-4 text-[13px] font-medium leading-relaxed text-black/78">
            <p>
              <strong>{product.tagline}</strong> {product.heroDescription}
            </p>
            <p>{product.heroSubcopy}</p>
          </div>

          <div className="my-7 border-y border-black/15 py-4 text-[12px] font-black">
            {product.detailLine}
          </div>

          {product.comingSoon ? (
            <div
              className="rounded-2xl border-2 px-6 py-8 text-center"
              style={{ borderColor: product.accent, backgroundColor: `${product.bg}` }}
            >
              <span
                className="inline-block rounded-full px-4 py-1.5 text-[10px] font-black tracking-[0.25em] uppercase text-white mb-4"
                style={{ backgroundColor: product.accent }}
              >
                Coming Soon
              </span>
              <p className="text-sm font-semibold text-black/70 leading-relaxed">
                We&apos;re putting the finishing touches on this one. Join the waitlist to be first to know when it launches.
              </p>
              <button
                type="button"
                className="mt-5 w-full rounded-full py-3.5 text-[11px] font-black tracking-[0.15em] uppercase text-white transition-transform hover:scale-[1.01]"
                style={{ backgroundColor: product.accent }}
              >
                Notify Me
              </button>
            </div>
          ) : (
            <>
              <p className="mb-3 text-[14px] font-black">Daily Use</p>

              <div className="mb-7 grid grid-cols-3 gap-2">
                {SUPPLY_OPTIONS.map((option) => (
                  <AccentPill
                    key={option.value}
                    active={supply === option.value}
                    accent={product.accent}
                    onClick={() => setSupply(option.value)}
                    ariaPressed={supply === option.value}
                  >
                    {option.label}
                  </AccentPill>
                ))}
              </div>

              <div
                className="mb-3 grid grid-cols-2 overflow-hidden rounded-full border text-[11px] font-bold"
                style={{ borderColor: product.accent }}
              >
                <ModeTab
                  active={mode === "subscribe"}
                  accent={product.accent}
                  onClick={() => setMode("subscribe")}
                  ariaLabel="Subscribe and save 10 percent"
                >
                  Subscribe and Save 10%
                </ModeTab>
                <ModeTab
                  active={mode === "single"}
                  accent={product.accent}
                  onClick={() => setMode("single")}
                  ariaLabel="Single purchase"
                >
                  Single Purchase
                </ModeTab>
              </div>

              {mode === "subscribe" && (
                <div className="rounded-2xl border border-black bg-[#F4F5EF] p-4 text-[11px] font-semibold">
                  <FrequencyDropdown value={frequency} onChange={setFrequency} />
                  <ul className="mt-3 space-y-2 border-t border-black/15 pt-3 text-black/70">
                    <li>* Earn loyalty points and share to friends</li>
                    <li>* Seasonal wellness object gift</li>
                    <li>* Edit your frequency or cancel at any time</li>
                  </ul>
                </div>
              )}

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-between rounded-full px-5 py-4 text-[12px] font-black text-white transition-transform hover:scale-[1.01]"
                style={{ backgroundColor: product.accent }}
              >
                <span>Add to Bag</span>
                <span>
                  {mode === "subscribe" ? (
                    <>
                      <span className="mr-2 text-white/55 line-through">
                        {formatPrice(basePrice)}
                      </span>
                      {formatPrice(finalPrice)}
                    </>
                  ) : (
                    formatPrice(basePrice)
                  )}
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
