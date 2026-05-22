"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import IngredientIllustration from "@/components/IngredientIllustration";
import { revealItem } from "@/components/motion/Reveal";
import { PATCH_META, type Ingredient } from "@/lib/ingredients";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerReducedMotion() {
  return false;
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function ArrowDownRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 7 17 17" />
      <path d="M17 8v9H8" />
    </svg>
  );
}

export default function IngredientFlipCard({
  ingredient,
  priority,
}: {
  ingredient: Ingredient;
  priority?: boolean;
}) {
  const patch = PATCH_META[ingredient.patch];
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion,
  );
  useEffect(() => {
    if (!flipped) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFlipped(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped]);

  const toggle = useCallback(() => setFlipped((value) => !value), []);

  const handleCardClick = useCallback(() => {
    toggle();
  }, [toggle]);

  const handleCardKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    },
    [toggle],
  );

  const stopFlip = useCallback((event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation();
  }, []);

  const innerTransform = reducedMotion
    ? undefined
    : flipped
      ? "rotateY(180deg)"
      : "rotateY(0deg)";

  return (
    <motion.div
      variants={revealItem}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="relative h-full min-h-[480px] perspective-distant"
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${ingredient.name} ingredient card. ${flipped ? "Showing research details." : "Showing summary."} Activate to flip.`}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        className="group relative grid h-full w-full cursor-pointer rounded-[28px] outline-none transition-transform duration-700 ease-out transform-3d focus-visible:ring-2 focus-visible:ring-foreground/25 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        style={{ transform: innerTransform }}
      >
        <article
          className={`col-start-1 row-start-1 flex h-full flex-col rounded-[28px] bg-[#F4F2EE] p-6 transition-colors duration-300 backface-hidden lg:p-7 ${reducedMotion && flipped ? "invisible opacity-0" : "group-hover:bg-[#EFEDE7]"}`}
          aria-hidden={flipped}
        >
          <div className="mb-8 flex items-start justify-between">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/55">
              [{pad(ingredient.index)}]
            </span>
            <span
              className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-foreground/55"
              title={patch.label}
            >
              <span className="hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline">
                {patch.label}
              </span>
              <span
                className="block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: patch.accent }}
                aria-label={patch.label}
              />
            </span>
          </div>

          <div className="mb-6 flex h-24 items-center justify-center text-foreground/55">
            {ingredient.stencilImage ? (
              <div className="relative h-20 w-20 lg:h-24 lg:w-24">
                <Image
                  src={ingredient.stencilImage}
                  alt={ingredient.name}
                  fill
                  priority={priority}
                  className="object-contain opacity-60"
                  sizes="96px"
                />
              </div>
            ) : (
              <IngredientIllustration
                kind={ingredient.illustration}
                className="h-20 w-20 lg:h-24 lg:w-24"
              />
            )}
          </div>

          <h3 className="text-[20px] font-black leading-tight tracking-[-0.02em] text-slate-900 lg:text-[22px]">
            {ingredient.name}
          </h3>
          <p className="mt-1 text-[12px] italic leading-snug text-foreground/55">
            {ingredient.latin}
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-foreground/72">
            {ingredient.description}
          </p>

          <div className="relative mt-auto pr-10 pt-7">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-foreground/55">
              Best For
            </p>
            <p className="text-[12px] leading-relaxed text-foreground/85">
              {ingredient.bestFor.join(", ")}
            </p>
            <span
              aria-hidden="true"
              className="absolute bottom-0 right-0 inline-flex h-7 w-7 items-center justify-center text-slate-900"
            >
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </article>

        <article
          className={`relative col-start-1 row-start-1 flex h-full flex-col rounded-[28px] bg-[#F4F2EE] backface-hidden transform-[rotateY(180deg)] ${reducedMotion && !flipped ? "invisible opacity-0" : ""}`}
          aria-hidden={!flipped}
        >
          <div className="flex h-full flex-col overflow-y-auto p-6 pb-16 lg:p-7 lg:pb-20">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div className="flex items-baseline gap-6">
                <span className="text-[13px] font-medium tracking-[0.04em] text-slate-900">
                  [{pad(ingredient.index)}]
                </span>
                <span className="text-[15px] font-black tracking-[-0.01em] text-slate-900 lg:text-[16px]">
                  {ingredient.name}
                </span>
              </div>
              <span
                className="mt-1 block h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: patch.accent }}
                aria-label={patch.label}
              />
            </div>

            <div className="flex-1 space-y-5 text-[13px] leading-relaxed text-slate-900">
              <section>
                <h4 className="mb-1 text-[13px] font-black text-slate-900">Origins</h4>
                <p className="text-foreground/80">{ingredient.origins}</p>
              </section>

              <section>
                <h4 className="mb-1 text-[13px] font-black text-slate-900">
                  Why We Use It
                </h4>
                <p className="text-foreground/80">{ingredient.whyWeUseIt}</p>
              </section>

              <section>
                <h4 className="mb-1 text-[13px] font-black text-slate-900">
                  Key Studies
                </h4>
                <ul className="flex flex-col gap-0.5">
                  {ingredient.keyStudies.map((study) => (
                    <li key={study.url}>
                      <a
                        href={study.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={stopFlip}
                        onKeyDown={stopFlip}
                        className="inline-block text-foreground/85 underline underline-offset-2 transition-colors hover:text-blue-600"
                      >
                        {study.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h4 className="mb-1 text-[13px] font-black text-slate-900">Used In</h4>
                <Link
                  href={`/products/${patch.slug}`}
                  onClick={stopFlip}
                  onKeyDown={stopFlip}
                  className="inline-flex items-center text-foreground/85 underline underline-offset-2 transition-colors hover:text-blue-600"
                >
                  {patch.label}
                </Link>
              </section>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-6 right-6 inline-flex h-7 w-7 items-center justify-center text-slate-900 lg:bottom-7 lg:right-7"
          >
            <ArrowDownRight className="h-5 w-5" />
          </span>
        </article>
      </div>
    </motion.div>
  );
}
