"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";

const FOOTER_COLUMNS = [
  {
    heading: "About Us",
    links: [
      { label: "Mission", href: "/about#mission" },
      { label: "Team", href: "/about#team" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact", href: "/about#contact" },
      { label: "Refund Policy", href: "#" },
      { label: "FAQ's", href: "/about#faq" },
    ],
  },
  {
    heading: "Social",
    links: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/pach-wellness-pvt-ltd/" },
    ],
  },
];

function BackToTopArrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3.5 h-3.5"
      aria-hidden
    >
      <path d="M4 12L12 4" />
      <path d="M5.5 4H12V10.5" />
    </svg>
  );
}

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const handleBackToTop = () => {
    type LenisLike = {
      scrollTo: (
        target: number | string | HTMLElement,
        options?: { offset?: number; duration?: number },
      ) => void;
    };
    const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-black bg-white px-4 pt-16 pb-6 text-foreground lg:px-16">
      <div className="mx-auto">
        <Reveal
          stagger={0.06}
          amount={0.2}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start"
        >
          {/* Left: p+ logo mark */}
          <motion.div
            variants={revealItem}
            className="hidden justify-start lg:col-span-4 lg:flex lg:pt-4"
          >
            <Image
              src="/logo mark - black@2x.png"
              alt="pach+"
              width={260}
              height={260}
              className="w-[180px] h-auto lg:w-[240px]"
              priority={false}
            />
          </motion.div>

          {/* Right: wordmark + link columns */}
          <motion.div variants={revealItem} className="lg:col-span-8">
            <div className="mb-12 lg:mb-16">
              <Image
                src="/logo-full.png"
                alt="pach+"
                width={600}
                height={200}
                className="h-14 md:h-16 lg:h-20 w-auto"
                priority={false}
              />
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-8">
              {FOOTER_COLUMNS.map((column, index) => (
                <motion.div
                  key={column.heading}
                  variants={revealItem}
                  className={index === 2 ? "col-span-2 sm:col-span-1" : undefined}
                >
                  <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
                    {column.heading}
                  </h3>
                  <ul className="space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <motion.span
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 320, damping: 22 }}
                          className="inline-block"
                        >
                          <Link
                            href={link.href}
                            className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
                          >
                            {link.label}
                          </Link>
                        </motion.span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Reveal>

        {/* Footer illustration — full width at its natural aspect ratio */}
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 120 }}
          whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            reduceMotion
              ? { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
              : { type: "spring", stiffness: 260, damping: 12, mass: 0.9 }
          }
          className="mt-14 -mx-4 lg:-mx-16 lg:mt-20"
        >
          <Image
            src="/footer-last.jpeg"
            alt=""
            width={2752}
            height={733}
            sizes="100vw"
            className="h-auto w-full"
            aria-hidden="true"
          />
        </motion.div>

        {/* Wellness disclaimer — explains the * used across the site */}
        <p className="mt-6 border-t border-black/10 pt-5 text-[10px] leading-relaxed text-foreground/45 xs:text-[11px]">
          *These are wellness statements and have not been evaluated by the FDA.
          pach+ products are not intended to diagnose, treat, cure, or prevent
          any disease.
        </p>

        {/* Bottom bar */}
        <div className="grid grid-cols-3 items-center gap-2 pt-5 text-[11px] text-foreground xs:text-[12px] sm:gap-4 sm:text-[13px]">
          <span className="justify-self-start">
            Copyright &copy; pach+
          </span>

          <Link
            href="#"
            className="justify-self-center text-center transition-colors hover:text-foreground/65"
          >
            Terms of Service
          </Link>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group flex items-center gap-1.5 justify-self-end transition-colors hover:text-foreground/65 sm:gap-2"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-[2px] border border-foreground/60 transition-colors group-hover:border-foreground/65 sm:h-6 sm:w-6">
              <BackToTopArrow />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
