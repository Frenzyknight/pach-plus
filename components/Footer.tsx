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
    <footer className="bg-pink-300 text-pink-900 pt-16 pb-6 px-4 lg:px-16">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          {/* Left: p+ logo mark */}
          <div className="lg:col-span-4 flex justify-start lg:pt-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
              {FOOTER_COLUMNS.map((column) => (
                <div key={column.heading}>
                  <h3 className="text-lg font-semibold tracking-tight text-pink-900 mb-4">
                    {column.heading}
                  </h3>
                  <ul className="space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-[15px] text-pink-900/90 hover:text-pink-700 transition-colors"
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
        <div className="mt-14 lg:mt-20 border-t border-pink-900/25" />

        {/* Bottom bar */}
        <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px] text-pink-900">
          <div className="flex flex-wrap items-center gap-x-16 gap-y-2">
            <span>Copyright &copy; pach+</span>
            <Link
              href="#"
              className="hover:text-pink-700 transition-colors"
            >
              Terms of Service
            </Link>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            className="flex items-center gap-2 hover:text-pink-700 transition-colors group"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <span className="w-6 h-6 border border-pink-900/60 rounded-[2px] flex items-center justify-center group-hover:border-pink-700 transition-colors">
              <BackToTopArrow />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
