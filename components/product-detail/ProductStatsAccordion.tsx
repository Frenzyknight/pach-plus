import type { Product } from "@/lib/products";

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-3.5 w-3.5 shrink-0 transition-transform group-open:rotate-45"
      aria-hidden="true"
    >
      <path d="M8 3v10" />
      <path d="M3 8h10" />
    </svg>
  );
}

export default function ProductStatsAccordion({
  product,
}: {
  product: Product;
}) {
  const accordions = [
    {
      title: "Best For",
      content: product.bestFor,
    },
    {
      title: "What's Inside",
      content: [product.whatsInside],
    },
    {
      title: "How to Take",
      content: [product.howToTake],
    },
  ];

  return (
    <section className="bg-white px-4 py-5 lg:px-6">
      <div className="grid gap-8 rounded-3xl bg-[#F0F1ED] px-6 py-8 lg:grid-cols-[48%_52%] lg:px-10 lg:py-10">
        <div>
          <h2 className="max-w-[560px] text-3xl font-black leading-[0.95] tracking-[-0.055em] sm:text-5xl">
            {product.stat}
          </h2>
          <p className="mt-8 text-[11px] font-black">{product.statFootnote}</p>
        </div>

        <div className="divide-y divide-black/15 overflow-hidden">
          {accordions.map((item, index) => (
            <details
              key={item.title}
              className="group py-4 pr-3 sm:pr-5"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[13px] font-black">
                {item.title}
                <PlusIcon />
              </summary>
              <div className="mt-4 space-y-2 text-[12px] font-medium leading-relaxed text-black/55">
                {item.content.map((line) => (
                  <p key={line} className={index === 0 ? "pl-4" : undefined}>
                    {index === 0 ? "* " : ""}
                    {line}
                  </p>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
