import Image from "next/image";

const PRODUCTS = [
  {
    src: "/package.png",
    name: "Happy Muscles",
    type: "Recovery Patch",
    price: 24,
    rating: 4.8,
    reviews: 16,
    tagline: "For Clean, Targeted Recovery*",
    accent: "#574092",
    bg: "#E9D5FF",
  },
  {
    src: "/package2.png",
    name: "Happy Breathe",
    type: "Nasal Comfort Patch",
    price: 24,
    rating: 4.5,
    reviews: 19,
    tagline: "For Easy, Plant-Based Breathing*",
    accent: "#1E3A8A",
    bg: "#DBEAFE",
  },
  {
    src: "/package3.png",
    name: "Happy Hormones",
    type: "Balance Patch",
    price: 24,
    rating: 5.0,
    reviews: 29,
    tagline: "For Hormonal Harmony & Balance*",
    accent: "#BE185D",
    bg: "#FCE7F3",
  },
  {
    src: "/package4.png",
    name: "Happy Gut",
    type: "Nourish Patch",
    price: 24,
    rating: 4.9,
    reviews: 12,
    tagline: "For Gut Health & Metabolism*",
    accent: "#065F46",
    bg: "#D1FAE5",
  },
];

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

function ProductCard({
  product,
}: {
  product: (typeof PRODUCTS)[number];
}) {
  return (
    <div className="group flex flex-col">
      <div
        className="relative aspect-square rounded-2xl overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ backgroundColor: product.bg }}
      >
        <Image
          src={product.src}
          alt={product.name}
          fill
          className="object-contain p-8 transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {product.name}
            <span className="text-foreground/40 font-normal">
              {" "}&bull; ${product.price}
            </span>
          </p>
          <p className="text-xs text-foreground/50 mt-0.5">{product.tagline}</p>
        </div>
        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>
    </div>
  );
}

export default function ShopSection() {
  return (
    <section className="bg-white py-20 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-[11px] font-medium tracking-[0.25em] uppercase text-foreground/60">
            Shop All
          </h2>
          <a
            href="#"
            className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground/60 hover:text-foreground transition-colors underline underline-offset-4"
          >
            View All
          </a>
        </div>

        {/* Row 1: 3 product cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          {PRODUCTS.slice(0, 3).map((product) => (
            <ProductCard key={product.src} product={product} />
          ))}
        </div>

        {/* Row 2: lifestyle image (2 cols) + product card (1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden aspect-video md:aspect-auto md:min-h-[420px]">
            <Image
              src="/girl-guy.png"
              alt="Man and woman wearing pach+ transdermal patches"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>
          <ProductCard product={PRODUCTS[3]} />
        </div>

        {/* Row 3: lifestyle image (2 cols) + bundle CTA (1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 relative rounded-2xl overflow-hidden aspect-4/5 md:aspect-auto md:min-h-[520px]">
            <Image
              src="/girl-pach.png"
              alt="Woman using pach+ Happy Hormones patch"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
          </div>

          <div className="flex flex-col">
            <div
              className="flex-1 rounded-2xl p-8 lg:p-10 flex flex-col justify-between"
              style={{ backgroundColor: "#EAF5F1" }}
            >
              <div>
                <span className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-teal-700 bg-teal-100 px-3 py-1 rounded-full mb-6">
                  Bestseller
                </span>
                <h3 className="text-3xl lg:text-4xl font-black tracking-tight text-teal-900 leading-[1.1]">
                  The Starter
                  <br />
                  Kit
                </h3>
                <p className="mt-3 text-sm text-teal-700/70 leading-relaxed">
                  The complete wellness trio with 12% savings. Recovery, balance, and breathe
                  — everything you need to get started.
                </p>
              </div>
              <div className="mt-8">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-teal-900">$85</span>
                  <span className="text-sm text-teal-700/50 line-through">$96</span>
                </div>
                <StarRating rating={5.0} reviews={73} />
                <button className="mt-5 w-full bg-teal-700 text-white text-[11px] font-medium tracking-[0.15em] uppercase py-3.5 rounded-full hover:bg-teal-900 transition-colors cursor-pointer">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
