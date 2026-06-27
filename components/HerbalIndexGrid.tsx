"use client";

import { motion } from "motion/react";
import IngredientFlipCard from "@/components/IngredientFlipCard";
import { Reveal, revealItem } from "@/components/motion/Reveal";
import { INGREDIENTS, PATCH_META } from "@/lib/ingredients";

const VISIBLE_INGREDIENTS = INGREDIENTS.filter((i) => i.patch !== "breathe");
const VISIBLE_PATCH_META = Object.entries(PATCH_META).filter(
  ([key]) => key !== "breathe",
) as Array<
  [keyof typeof PATCH_META, (typeof PATCH_META)[keyof typeof PATCH_META]]
>;

export default function HerbalIndexGrid() {
  return (
    <section className="bg-white px-5 pb-24 xs:px-6 sm:pb-28 lg:px-10 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal
          stagger={0.05}
          amount={0.05}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
        >
          {VISIBLE_INGREDIENTS.map((ingredient, index) => (
            <IngredientFlipCard
              key={ingredient.index}
              ingredient={ingredient}
              priority={index === 0}
              showFlipHint={index === 0}
            />
          ))}
        </Reveal>

        <Reveal
          stagger={0.05}
          amount={0.4}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-foreground/10 pt-7 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/55"
        >
          <motion.span variants={revealItem} className="text-foreground/80">
            Legend
          </motion.span>
          {VISIBLE_PATCH_META.map(([key, meta]) => (
            <motion.span
              key={key}
              variants={revealItem}
              className="flex items-center gap-2"
            >
              <span
                className="block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: meta.accent }}
              />
              {meta.label}
            </motion.span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
