"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";
import type { ProductFaq } from "@/lib/products";

type FaqCategory = {
  id: string;
  label: string;
  color: string;
  faqs: ProductFaq[];
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "basics",
    label: "Basics",
    color: "#1A715E",
    faqs: [
      {
        question: "How do pach+ patches work?",
        answer:
          "Each patch is designed to sit comfortably on clean, dry skin while its ingredient layer supports a slow, steady wellness ritual throughout the day.",
      },
      {
        question: "Are pach+ patches plant-based?",
        answer:
          "Yes. Every formula is built around plant-forward botanicals, vitamins, and minerals chosen for daily comfort and a clean wearable ritual.",
      },
      {
        question: "Do the patches replace my supplements?",
        answer:
          "pach+ patches are a wearable addition to your wellness routine, not a substitute for medical care. They can complement balanced meals, hydration, and sleep.",
      },
    ],
  },
  {
    id: "usage",
    label: "Using Patches",
    color: "#381E79",
    faqs: [
      {
        question: "Where should I apply the patch?",
        answer:
          "Apply to a clean, dry, low-friction area such as the upper arm, shoulder, back, or abdomen. Rotate placement daily for best comfort.",
      },
      {
        question: "How long should I wear one?",
        answer:
          "Wear one patch for up to 8 hours, then remove and discard it. Do not apply to irritated or broken skin.",
      },
      {
        question: "Will the patch stay on during workouts or showers?",
        answer:
          "The flexible adhesive is designed for daily movement. For best results, apply to dry skin before activity and avoid prolonged direct water exposure.",
      },
    ],
  },
  {
    id: "routine",
    label: "Daily Ritual",
    color: "#BA3F82",
    faqs: [
      {
        question: "Can I use them daily?",
        answer:
          "Yes. pach+ patches are built for a daily routine. If you are pregnant, nursing, taking medication, or managing a health condition, check with your healthcare provider first.",
      },
      {
        question: "Can I combine different pach+ products?",
        answer:
          "You can build a routine across categories, but start with one patch at a time to understand how each formula fits your day.",
      },
      {
        question: "When is the best time to apply a patch?",
        answer:
          "Most rituals start in the morning so you wear the patch through the day. For sleep-focused formulas, apply about an hour before winding down.",
      },
    ],
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0"
      aria-hidden="true"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <path d="M4 6l4 4 4-4" />
    </motion.svg>
  );
}

function FaqItem({
  question,
  answer,
  open,
  onToggle,
  id,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
  id: string;
}) {
  return (
    <div className="py-5 sm:py-6">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left text-[13px] font-black text-foreground sm:text-[15px]"
      >
        <span>{question}</span>
        <Chevron open={open} />
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="content"
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, ease: "easeOut" },
            }}
            style={{ overflow: "hidden" }}
          >
            <p className="mt-4 max-w-[620px] text-[12px] font-medium leading-relaxed text-foreground/65 sm:text-[13px]">
              {answer}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function AboutFaq() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    FAQ_CATEGORIES[0].id,
  );
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const activeCategory =
    FAQ_CATEGORIES.find((category) => category.id === activeCategoryId) ??
    FAQ_CATEGORIES[0];

  const handleSelectCategory = (id: string) => {
    if (id === activeCategoryId) return;
    setActiveCategoryId(id);
    setOpenIndex(0);
  };

  return (
    <section id="faq" className="bg-white px-5 xs:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[minmax(0,42%)_minmax(0,58%)] lg:gap-20">
        <Reveal stagger={0.08} amount={0.4} className="lg:pr-6">
          <motion.p
            variants={revealItem}
            className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4"
          >
            Answers
          </motion.p>
          <motion.h2
            variants={revealItem}
            className="leading-[1.05] tracking-[-0.03em] text-foreground"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            <span className="font-bold">Frequently</span>{" "}
            <span className="font-extralight">asked</span>{" "}
            <span className="font-bold">questions.</span>
          </motion.h2>
          <motion.p
            variants={revealItem}
            className="mt-5 max-w-[360px] text-[12px] font-medium leading-relaxed text-foreground/65 sm:text-[13px]"
          >
            Common questions about how pach+ patches work, what&apos;s inside,
            and how to build a daily ritual. Can&apos;t find your answer? Reach
            out at{" "}
            <a
              href="mailto:hello@pachplus.com"
              className="underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground"
            >
              hello@pachplus.com
            </a>{" "}
            and we&apos;ll get back to you quickly.
          </motion.p>
        </Reveal>

        <Reveal stagger={0.06} amount={0.2}>
          <motion.div
            variants={revealItem}
            role="tablist"
            aria-label="FAQ categories"
            className="mb-6 flex justify-center sm:mb-8"
          >
            <div className="inline-flex items-center gap-1 rounded-full border border-foreground/10 bg-foreground/4 p-1">
              {FAQ_CATEGORIES.map((category) => {
                const isActive = category.id === activeCategoryId;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`faq-panel-${category.id}`}
                    onClick={() => handleSelectCategory(category.id)}
                    className="relative cursor-pointer rounded-full px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-[11px]"
                    style={{
                      color: isActive ? "#fff" : "rgba(0,0,0,0.55)",
                    }}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="faq-pill-active"
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: category.color }}
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    ) : null}
                    <span className="relative">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={revealItem}
            className="divide-y divide-foreground/15 border-y border-foreground/15"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                id={`faq-panel-${activeCategory.id}`}
                role="tabpanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="divide-y divide-foreground/15"
              >
                {activeCategory.faqs.map((faq, index) => (
                  <FaqItem
                    key={faq.question}
                    id={`about-faq-${activeCategory.id}-${index}`}
                    question={faq.question}
                    answer={faq.answer}
                    open={openIndex === index}
                    onToggle={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index,
                      )
                    }
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
