import Image from "next/image";
import Link from "next/link";

export default function BannerSection() {
  return (
    <section
      className="relative overflow-hidden bg-slate-100"
      aria-label="Buy 2, get 1 free promotion"
    >
      <div className="relative h-[80svh] min-h-[520px] w-full overflow-hidden md:h-[80vh]">
        <picture className="absolute inset-0 block">
          <source media="(max-width: 639px)" srcSet="/banner-mobile-final.jpeg" />
          <source media="(max-width: 1023px)" srcSet="/banner-tablet-complete.jpeg" />
          <Image
            src="/girl-banner.jpeg"
            alt="No pills. No powders. Just results. Buy 2, get 1 free."
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center sm:object-bottom-left lg:object-center"
          />
        </picture>
        <Link
          href="/shop"
          className="absolute bottom-12 left-1/2 -translate-x-1/2 rounded-full bg-[#2E2544] px-5 py-3 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(0,0,0,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#20182F] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E2544] sm:bottom-14 sm:left-[45%] sm:translate-x-0 lg:bottom-16"
        >
          Shop Mother&apos;s Day Sale
        </Link>
      </div>
    </section>
  );
}
