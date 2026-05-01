"use client";

import Image from "next/image";
import Link from "next/link";

const FOOTER_COLUMNS = [
  {
    heading: "About Us",
    links: [
      { label: "Mission", href: "#" },
      { label: "Team", href: "#" },
      { label: "Newsletter", href: "#" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "FAQ's", href: "#" },
    ],
  },
  {
    heading: "Social",
    links: [
      { label: "Instagram", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "YouTube", href: "#" },
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
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-black bg-white px-4 pt-16 pb-6 text-foreground lg:px-16">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left: p+ logo mark */}
          <div className="hidden justify-start lg:col-span-4 lg:flex lg:pt-4">
            <Image
              src="/logo mark - black@2x.png"
              alt="pach+"
              width={260}
              height={260}
              className="w-[180px] h-auto lg:w-[240px]"
              priority={false}
            />
          </div>

          {/* Right: wordmark + link columns */}
          <div className="lg:col-span-8">
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
                <div
                  key={column.heading}
                  className={index === 2 ? "col-span-2 sm:col-span-1" : undefined}
                >
                  <h3 className="mb-4 text-lg font-semibold tracking-tight text-foreground">
                    {column.heading}
                  </h3>
                  <ul className="space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 border-t border-foreground/20 lg:mt-20" />

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 pt-5 text-[13px] text-foreground sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-16 gap-y-2">
            <span>Copyright &copy; pach+</span>
            <Link
              href="#"
              className="transition-colors hover:text-foreground/65"
            >
              Terms of Service
            </Link>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="group flex items-center gap-2 transition-colors hover:text-foreground/65"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-[2px] border border-foreground/60 transition-colors group-hover:border-foreground/65">
              <BackToTopArrow />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
