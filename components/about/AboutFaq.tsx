"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";
import { SHARED_FAQS } from "@/lib/products";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white px-5 xs:px-6 lg:px-10">
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
            className="divide-y divide-foreground/15 border-y border-foreground/15"
          >
            {SHARED_FAQS.map((faq, index) => (
              <FaqItem
                key={faq.question}
                id={`about-faq-${index}`}
                question={faq.question}
                answer={faq.answer}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
