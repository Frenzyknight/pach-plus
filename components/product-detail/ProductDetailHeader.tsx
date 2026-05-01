import Image from "next/image";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Shop All", href: "/shop" },
  { label: "The Science", href: "/#science" },
  { label: "Our Ethos", href: "/#ethos" },
  { label: "Patch Index", href: "/shop" },
  { label: "Find Us", href: "/#find-us" },
];

export default function ProductDetailHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="overflow-hidden bg-[#22211f] py-2 text-[10px] font-semibold text-white">
        <div className="flex w-max animate-[marquee_26s_linear_infinite] gap-12 whitespace-nowrap px-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <span key={index}>
              Free US Shipping over $90 - Subscribe & Save 15%
            </span>
          ))}
        </div>
      </div>

      <nav className="flex h-[74px] items-center justify-between border-b border-black/10 px-5 lg:px-8">
        <div className="flex items-center gap-7">
          <Link href="/" aria-label="pach+ home">
            <Image
              src="/logo-full.png"
              alt="pach+"
              width={110}
              height={44}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <div className="hidden items-center rounded-full bg-[#F0F0ED] px-4 py-2 text-[11px] font-semibold lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-1 transition-colors hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-semibold">
          <Link href="#" className="hidden transition-opacity hover:opacity-60 sm:block">
            Account
          </Link>
          <Link href="#" className="transition-opacity hover:opacity-60">
            Cart (0)
          </Link>
        </div>
      </nav>
    </header>
  );
}
