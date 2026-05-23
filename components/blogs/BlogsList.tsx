"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";
import { BLOGS, type Blog } from "@/lib/blogs";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5"
      aria-hidden="true"
    >
      <path d="M4 12L12 4" />
      <path d="M5.5 4H12V10.5" />
    </svg>
  );
}

function BlogRow({ blog }: { blog: Blog }) {
  return (
    <motion.article
      variants={revealItem}
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="py-8 sm:py-10"
    >
      <Link
        href={`/blogs/${blog.slug}`}
        className="group block focus-visible:outline-none"
        aria-label={`Read ${blog.title}`}
      >
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -2 },
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
        >
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
            style={{ backgroundColor: blog.badgeColor, color: blog.badgeFg }}
          >
            {blog.category}
          </span>

          <h3 className="mt-4 text-[18px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground transition-colors group-hover:text-foreground/80 sm:text-[22px] lg:text-[24px]">
            {blog.title}
          </h3>

          <p className="mt-3 line-clamp-2 max-w-[640px] text-[12px] font-medium leading-relaxed text-foreground/65 sm:text-[13px] lg:text-sm">
            {blog.excerpt}
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/50">
              {blog.date}
            </span>
            <motion.span
              variants={{
                rest: { x: 0, y: 0 },
                hover: { x: 3, y: -3 },
              }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 text-foreground/70 transition-colors group-hover:border-foreground/40 group-hover:text-foreground"
            >
              <ArrowIcon />
            </motion.span>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

export default function BlogsList() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-5 pt-24 pb-16 xs:px-6 sm:pt-28 sm:pb-20 lg:h-svh lg:flex-row lg:gap-16 lg:px-10 lg:pt-32 lg:pb-12">
        <div className="lg:flex lg:w-[42%] lg:shrink-0 lg:flex-col lg:justify-center lg:pr-2">
          <Reveal stagger={0.08} amount={0.2}>
            <motion.p
              variants={revealItem}
              className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4"
            >
              Blogs
            </motion.p>

            <motion.h1
              variants={revealItem}
              className="leading-[1.04] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2rem, 4.6vw, 3.75rem)" }}
            >
              <span className="font-bold">Field notes</span>{" "}
              <span className="font-extralight">from the</span>{" "}
              <span className="font-bold">pach+ lab.</span>
            </motion.h1>

            <motion.p
              variants={revealItem}
              className="mt-6 max-w-[460px] text-[12px] font-medium leading-relaxed text-foreground/65 sm:mt-7 sm:text-sm lg:text-[15px]"
            >
              Ingredient deep-dives, ritual ideas, and behind-the-scenes notes
              on the science of plant-powered patches. Short reads for anyone
              who wants their wellness routine to feel a little lighter.
            </motion.p>
          </Reveal>
        </div>

        <div className="lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-2">
          <Reveal
            stagger={0.08}
            amount={0.15}
            className="divide-y divide-foreground/15 border-y border-foreground/15"
          >
            {BLOGS.map((blog) => (
              <BlogRow key={blog.slug} blog={blog} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
