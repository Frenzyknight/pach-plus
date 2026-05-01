import Image from "next/image";
import Link from "next/link";
import { getRelatedProducts, type Product } from "@/lib/products";

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
        aria-label={`View ${product.name}`}
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
            className="object-contain p-10 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      <h3 className="mt-4 text-[12px] font-black">
        {product.name} <span className="text-black/45">- ${product.price}</span>
      </h3>
      <p className="mt-1 text-[11px] font-medium text-black/45">
        {product.tagline}
      </p>
      <button
        type="button"
        className="mt-4 w-full rounded-full px-5 py-3 text-[11px] font-black text-white transition-transform hover:scale-[1.01]"
        style={{ backgroundColor: product.accent }}
        aria-label={`Add ${product.name} to cart`}
      >
        Add to Cart
      </button>
    </article>
  );
}

export default function ProductFaqRelated({ product }: { product: Product }) {
  const relatedProducts = getRelatedProducts(product);

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
            Goes Well With
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
