import Image from "next/image";
import IngredientIllustration from "@/components/IngredientIllustration";
import { INGREDIENTS, PATCH_META, type Ingredient } from "@/lib/ingredients";

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function IngredientCard({ ingredient, priority }: { ingredient: Ingredient; priority?: boolean }) {
  const patch = PATCH_META[ingredient.patch];

  return (
    <article className="group relative flex h-full flex-col rounded-[28px] bg-[#F4F2EE] p-6 transition-colors duration-300 hover:bg-[#EFEDE7] lg:p-7">
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

      <div className="mt-auto pt-7">
        <p className="mb-2 text-[10px] font-black uppercase tracking-[0.22em] text-foreground/55">
          Best For
        </p>
        <p className="text-[12px] leading-relaxed text-foreground/85">
          {ingredient.bestFor.join(", ")}
        </p>
      </div>
    </article>
  );
}

export default function HerbalIndexGrid() {
  return (
    <section className="bg-white px-5 pb-24 xs:px-6 sm:pb-28 lg:px-10 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {INGREDIENTS.map((ingredient) => (
            <IngredientCard key={ingredient.index} ingredient={ingredient} priority={ingredient.index === 1} />
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/10 pt-7 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/55">
          <span className="text-foreground/80">Legend</span>
          {(
            Object.entries(PATCH_META) as Array<
              [keyof typeof PATCH_META, (typeof PATCH_META)[keyof typeof PATCH_META]]
            >
          ).map(([key, meta]) => (
            <span key={key} className="flex items-center gap-2">
              <span
                className="block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: meta.accent }}
              />
              {meta.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
