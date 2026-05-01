import Image from "next/image";
import type { Product } from "@/lib/products";

function Rating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-semibold">
      <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 fill-black"
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

function Chevron() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export default function ProductHero({ product }: { product: Product }) {
  return (
    <section className="grid min-h-[calc(100svh-6rem)] grid-cols-1 gap-4 border-b border-black/10 bg-white p-4 lg:grid-cols-[59%_41%] lg:gap-6 lg:p-6">
      <div
        className="relative min-h-[520px] overflow-hidden rounded-3xl lg:min-h-[calc(100svh-9rem)]"
        style={{ backgroundColor: product.bg }}
      >
        <Image
          src={product.src}
          alt={`${product.name} package`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-contain p-16 sm:p-24 lg:p-28"
          priority
        />

        <div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/10 px-3 py-2 backdrop-blur">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full ${index === 0 ? "w-5 bg-black/45" : "w-1.5 bg-black/20"}`}
            />
          ))}
        </div>
      </div>

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
              <p className="mt-1 text-2xl font-black">${product.price}</p>
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

          <div className="mb-7 grid grid-cols-3 gap-2">
            {["30 Day Supply", "60 Day Supply", "90 Day Supply"].map((label) => (
              <button
                key={label}
                type="button"
                className="rounded-full border border-black px-3 py-2.5 text-[11px] font-bold transition-colors hover:bg-black hover:text-white"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mb-3 grid grid-cols-2 overflow-hidden rounded-full border border-black text-[11px] font-bold">
            <button
              type="button"
              className="py-3 text-white"
              style={{ backgroundColor: product.accent }}
            >
              Subscribe and Save 10%
            </button>
            <button type="button" className="bg-white py-3">
              Single Purchase
            </button>
          </div>

          <div className="rounded-2xl border border-black bg-[#F4F5EF] p-4 text-[11px] font-semibold">
            <div className="mb-3 flex items-center justify-between border-b border-black/15 pb-3">
              <span>Delivered every 2 weeks</span>
              <Chevron />
            </div>
            <ul className="space-y-2 text-black/70">
              <li>* Earn loyalty points and share to friends</li>
              <li>* Seasonal wellness object gift</li>
              <li>* Edit your frequency or cancel at any time</li>
            </ul>
          </div>

          <button
            type="button"
            className="mt-4 flex w-full items-center justify-between rounded-full px-5 py-4 text-[12px] font-black text-white transition-transform hover:scale-[1.01]"
            style={{ backgroundColor: product.accent }}
          >
            <span>Add to Bag</span>
            <span>
              <span className="mr-2 text-white/55 line-through">
                ${product.price.toFixed(2)}
              </span>
              ${(product.price * 0.9).toFixed(2)}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
