import type { ProductIngredient, Product } from "@/lib/products";

function BotanicalIcon({
  ingredient,
  accent,
}: {
  ingredient: ProductIngredient;
  accent: string;
}) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      stroke={accent}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-10 w-10"
      aria-hidden="true"
    >
      <path d="M28 46V18" />
      <path d="M28 28c-9-2-13-7-13-16 9 2 13 7 13 16Z" />
      <path d="M28 34c10-2 15-8 15-18-10 2-15 8-15 18Z" />
      <circle cx="28" cy="13" r="4" />
      <title>{ingredient.name}</title>
    </svg>
  );
}

export default function ProductIngredients({ product }: { product: Product }) {
  return (
    <section className="overflow-hidden bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <h2 className="text-2xl font-black leading-[0.98] tracking-[-0.055em] sm:text-3xl">
          {product.ingredientsHeading}
        </h2>
        <p className="mt-6 text-[15px] font-medium leading-relaxed text-black/62">
          {product.ingredientsCopy}
        </p>
      </div>

      <div className="mt-14 flex gap-10 overflow-x-auto px-6 pb-4 lg:px-10">
        {product.ingredients.map((ingredient) => (
          <article
            key={ingredient.name}
            className="relative flex min-h-[250px] w-[210px] shrink-0 flex-col justify-end rounded-3xl bg-[#F0F1ED] p-7"
          >
            <span
              className="absolute right-5 top-5 h-4 w-4 rounded-full"
              style={{ backgroundColor: ingredient.accent }}
            />
            <BotanicalIcon ingredient={ingredient} accent={ingredient.accent} />
            <h3 className="mt-8 text-[13px] font-black">
              {ingredient.name}
            </h3>
            <p className="mt-3 text-[12px] font-medium leading-relaxed text-black/65">
              {ingredient.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <a
          href="#faqs"
          className="rounded-full border border-black px-8 py-3 text-[11px] font-bold transition-colors hover:bg-black hover:text-white"
        >
          Explore the Science
        </a>
      </div>
    </section>
  );
}
