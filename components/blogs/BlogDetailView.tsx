"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageMotionProvider from "@/components/motion/PageMotionProvider";
import { Reveal, revealItem } from "@/components/motion/Reveal";
import { getRelatedBlogs, type Blog, type BlogBlock } from "@/lib/blogs";

function splitTitleIntoThirds(title: string): [string, string, string] {
  const words = title.trim().split(/\s+/);
  if (words.length <= 2) {
    return [title, "", ""];
  }

  const total = words.length;
  const firstEnd = Math.max(1, Math.round(total / 3));
  const secondEnd = Math.max(firstEnd + 1, Math.round((total * 2) / 3));

  const first = words.slice(0, firstEnd).join(" ");
  const middle = words.slice(firstEnd, secondEnd).join(" ");
  const last = words.slice(secondEnd).join(" ");

  return [first, middle, last];
}

function BackArrow() {
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
      <path d="M9.5 12L5 8l4.5-4" />
    </svg>
  );
}

function ForwardArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M3 8h10" />
      <path d="M9 4l4 4-4 4" />
    </svg>
  );
}

function CompactArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3 w-3"
      aria-hidden="true"
    >
      <path d="M4 12L12 4" />
      <path d="M5.5 4H12V10.5" />
    </svg>
  );
}

function BlogBody({ blocks, accent }: { blocks: BlogBlock[]; accent: string }) {
  return (
    <div>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={key}
                className="mb-6 text-[14px] leading-[1.75] text-foreground/80 sm:text-[15px]"
              >
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2
                key={key}
                className="mt-12 mb-4 text-[20px] font-bold tracking-[-0.02em] text-foreground sm:text-[24px]"
              >
                {block.text}
              </h2>
            );
          case "quote":
            return (
              <figure
                key={key}
                className="my-10 border-l-2 pl-5 sm:pl-6"
                style={{ borderColor: accent }}
              >
                <blockquote className="text-[18px] font-extralight italic leading-[1.4] text-foreground/90 sm:text-[22px]">
                  &ldquo;{block.text}&rdquo;
                </blockquote>
                {block.attribution ? (
                  <figcaption className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/55">
                    {block.attribution}
                  </figcaption>
                ) : null}
              </figure>
            );
          case "list":
            return (
              <ul key={key} className="mb-6 space-y-3">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[14px] leading-[1.65] text-foreground/80 sm:text-[15px]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: accent }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

function RelatedCard({ blog }: { blog: Blog }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="h-full"
    >
      <Link
        href={`/blogs/${blog.slug}`}
        className="group flex h-full flex-col justify-between gap-6 rounded-2xl border border-foreground/10 bg-white p-5 transition-colors hover:border-foreground/25 sm:p-6"
        aria-label={`Read ${blog.title}`}
      >
        <div>
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.18em]"
            style={{ backgroundColor: blog.badgeColor, color: blog.badgeFg }}
          >
            {blog.category}
          </span>
          <h3 className="mt-4 text-[15px] font-bold leading-[1.2] tracking-[-0.01em] text-foreground sm:text-[17px]">
            {blog.title}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/50">
            {blog.date}
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full border border-foreground/15 text-foreground/65 transition-colors group-hover:border-foreground/40 group-hover:text-foreground">
            <CompactArrow />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogDetailView({ blog }: { blog: Blog }) {
  const [titleFirst, titleMiddle, titleLast] = splitTitleIntoThirds(blog.title);
  const related = getRelatedBlogs(blog.slug, 3);

  return (
    <PageMotionProvider>
      <div className="relative min-h-screen bg-background">
        <Navbar />

        <article className="bg-white px-5 pt-24 pb-16 xs:px-6 sm:pt-28 sm:pb-20 lg:px-10 lg:pt-32 lg:pb-28">
          <div className="mx-auto max-w-[760px]">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:border-foreground/40 hover:bg-foreground/5 hover:text-foreground"
              >
                <BackArrow />
                All blogs
              </Link>
            </motion.div>

            <Reveal stagger={0.08} amount={0.2} className="mt-10 sm:mt-12">
              <motion.div variants={revealItem}>
                <span
                  className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]"
                  style={{
                    backgroundColor: blog.badgeColor,
                    color: blog.badgeFg,
                  }}
                >
                  {blog.category}
                </span>
              </motion.div>

              <motion.h1
                variants={revealItem}
                className="mt-5 leading-[1.05] tracking-[-0.03em] text-foreground sm:mt-6"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                <span className="font-bold">{titleFirst}</span>
                {titleMiddle ? (
                  <>
                    {" "}
                    <span className="font-extralight">{titleMiddle}</span>
                  </>
                ) : null}
                {titleLast ? (
                  <>
                    {" "}
                    <span className="font-bold">{titleLast}</span>
                  </>
                ) : null}
              </motion.h1>

              <motion.div
                variants={revealItem}
                className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/55 sm:mt-7"
              >
                <span>{blog.date}</span>
                <span aria-hidden="true" className="text-foreground/30">
                  &middot;
                </span>
                <span>{blog.readTime}</span>
                <span aria-hidden="true" className="text-foreground/30">
                  &middot;
                </span>
                <span>{blog.author}</span>
              </motion.div>

              <motion.div
                variants={revealItem}
                className="mt-8 border-l-[3px] pl-4 sm:mt-10 sm:pl-5"
                style={{ borderColor: blog.accent }}
              >
                <p className="max-w-[640px] text-[14px] font-medium leading-relaxed text-foreground/68 sm:text-base">
                  {blog.heroSubtitle}
                </p>
              </motion.div>
            </Reveal>

            <Reveal amount={0.05} className="mt-12 sm:mt-16">
              <motion.div variants={revealItem}>
                <BlogBody blocks={blog.body} accent={blog.accent} />
              </motion.div>
            </Reveal>

            <div className="mt-14 border-t border-foreground/15 pt-10 sm:mt-20 sm:pt-12">
              <motion.div
                whileHover="hover"
                whileTap={{ scale: 0.97 }}
                initial="rest"
                animate="rest"
                className="inline-block"
              >
                <Link
                  href="/blogs"
                  className="group flex items-center gap-0"
                  aria-label="Read more blogs"
                >
                  <motion.span
                    variants={{
                      rest: { scale: 1, rotate: 0 },
                      hover: { scale: 1.08, rotate: 8 },
                    }}
                    transition={{ type: "spring", stiffness: 320, damping: 18 }}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-white"
                  >
                    <ForwardArrow />
                  </motion.span>
                  <motion.span
                    variants={{
                      rest: { paddingLeft: 24, paddingRight: 28 },
                      hover: { paddingLeft: 28, paddingRight: 32 },
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="ml-[-14px] rounded-full bg-teal-900 py-3.5 text-sm font-medium tracking-[0.08em] text-white group-hover:bg-teal-700"
                  >
                    Read more blogs
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </article>

        {related.length > 0 ? (
          <section className="bg-white px-5 pb-16 xs:px-6 sm:pb-20 lg:px-10 lg:pb-28">
            <div className="mx-auto max-w-[1400px]">
              <Reveal stagger={0.08} amount={0.2}>
                <motion.p
                  variants={revealItem}
                  className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4"
                >
                  Keep reading
                </motion.p>
                <motion.h2
                  variants={revealItem}
                  className="leading-[1.05] tracking-[-0.03em] text-foreground"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                  <span className="font-bold">More</span>{" "}
                  <span className="font-extralight">from the</span>{" "}
                  <span className="font-bold">pach+ lab.</span>
                </motion.h2>

                <motion.div
                  variants={revealItem}
                  className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
                >
                  {related.map((item) => (
                    <RelatedCard key={item.slug} blog={item} />
                  ))}
                </motion.div>
              </Reveal>
            </div>
          </section>
        ) : null}

        <Footer />
      </div>
    </PageMotionProvider>
  );
}
