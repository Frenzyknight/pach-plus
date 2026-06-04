import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { formatMoney } from "@/lib/format-money";

function Chevron() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 transition-transform group-open:rotate-180"
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function RelatedProductCard({ product }: { product: Product }) {
  return (
    <article className="group">
      <Link
        href={`/products/${product.slug}`}
        aria-label={
          product.comingSoon
            ? `${product.name} coming soon`
            : `View ${product.name}`
        }
        className="block"
      >
        <div
          className="relative aspect-square overflow-hidden rounded-2xl"
          style={{ backgroundColor: product.bg }}
        >
          <Image
            src={product.src}
            alt={`${product.name} package`}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-contain p-10 transition-[transform,opacity] duration-500 group-hover:scale-105 group-hover:opacity-0"
          />
          {product.hoverSrc && (
            <div className="absolute inset-0 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0">
              <Image
                src={product.hoverSrc}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-contain object-bottom"
                aria-hidden
              />
            </div>
          )}
          {product.comingSoon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
              <span className="rounded-full bg-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-black shadow-lg">
                Coming Soon
              </span>
            </div>
          )}
        </div>
      </Link>
      <h3 className="mt-4 text-[12px] font-black">
        {product.name}{" "}
        <span className="text-black/45">
          -{" "}
          {formatMoney({
            amount: product.price.toString(),
            currencyCode: product.currencyCode,
          })}
        </span>
      </h3>
      <p className="mt-1 text-[11px] font-medium text-black/45">
        {product.tagline}
      </p>
      {product.comingSoon ? (
        <button
          type="button"
          disabled
          className="mt-4 w-full cursor-not-allowed rounded-full px-5 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-white/70"
          style={{ backgroundColor: product.accent, opacity: 0.5 }}
          aria-label={`${product.name} coming soon`}
        >
          Coming Soon
        </button>
      ) : (
        <Link
          href={`/products/${product.slug}`}
          className="mt-4 flex w-full items-center justify-center rounded-full px-5 py-3 text-[11px] font-black uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.01]"
          style={{ backgroundColor: product.accent }}
          aria-label={`Shop ${product.name}`}
        >
          Shop Now
        </Link>
      )}
    </article>
  );
}

export default function ProductFaqRelated({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  return (
    <section
      id="faqs"
      className="bg-white px-6 py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto grid max-w-[1180px] gap-14 lg:grid-cols-[48%_52%]">
        <div>
          <h2 className="mb-6 text-xl font-black uppercase tracking-[-0.04em]">
            FAQS
          </h2>
          <div className="divide-y divide-black/15 border-y border-black/15">
            {product.faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group py-5"
                open={index === 0}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-black">
                  {faq.question}
                  <Chevron />
                </summary>
                <p className="mt-4 max-w-[620px] text-[13px] font-medium leading-relaxed text-black/60">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-6 text-xl font-black uppercase tracking-[-0.04em]">
            Also Try
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {relatedProducts.map((relatedProduct) => (
              <RelatedProductCard
                key={relatedProduct.slug}
                product={relatedProduct}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
