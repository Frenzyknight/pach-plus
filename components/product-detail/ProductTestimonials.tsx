import type { Product } from "@/lib/products";

export default function ProductTestimonials({ product }: { product: Product }) {
  return (
    <section className="bg-white px-6 pb-20 lg:px-10">
      <div className="mx-auto grid max-w-[1180px] gap-4 md:grid-cols-3">
        {product.testimonials.map((testimonial) => (
          <figure
            key={`${testimonial.author}-${testimonial.location}`}
            className="flex min-h-[170px] flex-col justify-between rounded-2xl p-6 text-white"
            style={{ backgroundColor: testimonial.color }}
          >
            <blockquote className="text-[13px] font-semibold leading-relaxed">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-8 text-[10px] font-semibold text-white/70">
              {testimonial.author}, {testimonial.location}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
