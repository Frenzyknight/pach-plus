"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";
import { PRODUCTS, type Product } from "@/lib/products";
import { formatMoney } from "@/lib/format-money";

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.3;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex gap-px">
        {Array.from({ length: fullStars }).map((_, i) => (
          <svg key={`f${i}`} viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-amber-400">
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78z" />
          </svg>
        ))}
        {hasHalf && (
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5">
            <defs>
              <linearGradient id="halfStar">
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path
              d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78z"
              fill="url(#halfStar)"
            />
          </svg>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <svg key={`e${i}`} viewBox="0 0 20 20" className="w-3.5 h-3.5 fill-gray-300">
            <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78z" />
          </svg>
        ))}
      </span>
      <span className="text-[11px] text-foreground/40">({reviews})</span>
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const priceLabel = formatMoney({
    amount: product.price.toString(),
    currencyCode: product.currencyCode,
  });

  return (
    <motion.div
      className="group flex flex-col"
      variants={revealItem}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
    >
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name}`}
        className="relative aspect-square rounded-2xl overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundColor: product.bg }}
      >
        <Image
          src={product.src}
          alt={product.name}
          fill
          className="object-contain p-8 transition-[transform,opacity] duration-500 group-hover:scale-105 group-hover:opacity-0"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {product.hoverSrc && (
          <div className="absolute inset-0 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0">
            <Image
              src={product.hoverSrc}
              alt=""
              fill
              className="object-contain object-bottom"
              sizes="(max-width: 768px) 100vw, 33vw"
              aria-hidden
            />
          </div>
        )}
        {product.comingSoon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="rounded-full bg-white px-4 py-1.5 text-[10px] font-black tracking-[0.25em] uppercase text-black shadow-lg">
              Coming Soon
            </span>
          </div>
        )}
      </Link>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {product.name}
            <span className="text-foreground/40 font-normal">
              {" "}&bull; {priceLabel}
            </span>
          </p>
          <p className="text-xs text-foreground/50 mt-0.5">{product.tagline}</p>
        </div>
        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>
      {product.comingSoon ? (
        <Link
          href={`/products/${product.slug}`}
          className="mt-4 w-full rounded-full py-3.5 text-center text-[11px] font-medium uppercase tracking-[0.15em] text-white/80 transition-opacity"
          style={{ backgroundColor: product.accent, opacity: 0.65 }}
          aria-label={`${product.name} coming soon — view details`}
        >
          Coming Soon
        </Link>
      ) : (
        <motion.div
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 360, damping: 22 }}
        >
          <Link
            href={`/products/${product.slug}`}
            className="mt-4 flex w-full items-center justify-center rounded-full py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: product.accent,
              outlineColor: product.accent,
            }}
            aria-label={`Shop ${product.name}`}
          >
            Shop Now
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * Wraps a fill <Image> with a scroll-linked vertical parallax. The inner
 * element is scaled up slightly so the translation never reveals empty edges.
 */
function LifestyleImage({
  src,
  alt,
  wrapperClassName,
  priority,
  sizes,
}: {
  src: string;
  alt: string;
  wrapperClassName: string;
  priority?: boolean;
  sizes: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });
  const y = useTransform(smoothed, [0, 1], ["-4%", "4%"]);

  return (
    <motion.div
      ref={ref}
      variants={revealItem}
      whileHover={{ scale: 1.005 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      className={`${wrapperClassName} group`}
    >
      <motion.div
        className="absolute inset-0"
        style={
          reduce
            ? undefined
            : { y, scale: 1.08, willChange: "transform" }
        }
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes={sizes}
          priority={priority}
        />
      </motion.div>
    </motion.div>
  );
}

type ShopSectionProps = {
  /** When provided, used in place of the static PRODUCTS list (e.g. with Shopify-merged data on /shop). */
  products?: Product[];
};

export default function ShopSection({ products }: ShopSectionProps = {}) {
  const items = products ?? PRODUCTS;

  return (
    <section className="bg-white pt-6 pb-20 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/*
          Single grid so the DOM order controls layout on mobile (1 col): all
          4 product cards appear first, then both lifestyle images. On md+ we
          place items into specific rows/cols to keep the original desktop
          layout (3 prods / image+prod / image+image).
        */}
        <Reveal
          stagger={0.08}
          amount={0.12}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {items[0] ? <ProductCard product={items[0]} /> : null}
          {items[1] ? <ProductCard product={items[1]} /> : null}
          {items[2] ? <ProductCard product={items[2]} /> : null}

          {items[3] ? (
            <motion.div
              variants={revealItem}
              className="md:col-start-3 md:row-start-2"
            >
              <ProductCard product={items[3]} />
            </motion.div>
          ) : null}

          <LifestyleImage
            src="/girl-guy.png"
            alt="Man and woman wearing pach+ transdermal patches"
            wrapperClassName="md:col-span-2 md:col-start-1 md:row-start-2 relative rounded-2xl overflow-hidden aspect-video md:aspect-auto md:min-h-[420px]"
            sizes="(max-width: 768px) 100vw, 66vw"
            priority
          />

          <LifestyleImage
            src="/girl-pach.png"
            alt="Woman using pach+ Happy Hormones patch"
            wrapperClassName="md:col-span-2 md:col-start-1 md:row-start-3 relative rounded-2xl overflow-hidden aspect-4/5 md:aspect-auto md:min-h-[520px]"
            sizes="(max-width: 768px) 100vw, 66vw"
          />

          {/* Starter Kit bundle deferred to v2 of the Shopify integration. */}
        </Reveal>
      </div>
    </section>
  );
}
