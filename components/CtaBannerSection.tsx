import Image from "next/image";
import Link from "next/link";

export default function CtaBannerSection() {
  return (
    <section
      className="relative overflow-hidden bg-slate-100"
      aria-label="The Metabolic Trio bundle"
    >
      <div className="relative h-[88svh] min-h-[560px] w-full overflow-hidden sm:h-auto sm:min-h-0">
        <picture className="block sm:hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mobile-cta.jpeg"
            alt="The Metabolic Trio — three plant-powered patches designed for consistent daily wellness routines."
            className="absolute inset-0 h-full w-full object-cover object-center"
            loading="lazy"
          />
        </picture>

        <div className="relative hidden aspect-2/1 w-full sm:block">
          <Image
            src="/cta-desktop.jpeg"
            alt="The Metabolic Trio — three plant-powered patches designed for consistent daily wellness routines."
            fill
            sizes="100vw"
            className="object-cover object-center"
            loading="lazy"
          />
        </div>

        <Link
          href="/shop"
          className="group absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-0 sm:bottom-10 lg:bottom-14"
          aria-label="Shop the Metabolic Trio bundle"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-white transition-transform group-hover:scale-105">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
          <span className="ml-[-14px] rounded-full bg-teal-900 py-3.5 pl-6 pr-7 text-sm font-medium tracking-[0.08em] text-white transition-colors group-hover:bg-teal-700">
            Shop now
          </span>
        </Link>
      </div>
    </section>
  );
}
