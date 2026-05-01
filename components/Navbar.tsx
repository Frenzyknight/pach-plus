"use client";

import Image from "next/image";
import Link from "next/link";
import GlassSurface from "@/components/GlassSurface";
import StaggeredMenu, {
  type StaggeredMenuItem,
} from "@/components/StaggeredMenu";

const MENU_ITEMS: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Shop", ariaLabel: "Shop pach+ products", link: "/shop" },
  { label: "About", ariaLabel: "Learn about pach+", link: "/#about" },
  { label: "Science", ariaLabel: "The science behind pach+", link: "/#science" },
];

export default function Navbar() {
  return (
    <>
      <div className="fixed top-5 left-6 right-6 z-50 lg:left-10 lg:right-10">
        <GlassSurface
          width="100%"
          height={56}
          borderRadius={999}
          blur={14}
          brightness={60}
          opacity={0.9}
          backgroundOpacity={0.12}
          saturation={1.3}
        >
          <nav className="flex w-full items-center justify-between px-5 pr-16 lg:px-8 lg:pr-8">
            <div className="flex min-w-0 flex-1 items-center gap-8">
              <Link href="/" aria-label="pach+ home" className="shrink-0">
                <Image
                  src="/logo-full.png"
                  alt="pach+"
                  width={100}
                  height={40}
                  className="h-6 w-auto"
                  priority
                />
              </Link>
              <div className="hidden items-center gap-6 text-[11px] font-medium tracking-[0.15em] uppercase lg:flex">
                <Link href="/" className="transition-opacity hover:opacity-60">
                  Home
                </Link>
                <Link
                  href="/shop"
                  className="transition-opacity hover:opacity-60"
                >
                  Shop
                </Link>
                <Link
                  href="/#about"
                  className="transition-opacity hover:opacity-60"
                >
                  About
                </Link>
                <Link
                  href="/#science"
                  className="transition-opacity hover:opacity-60"
                >
                  Science
                </Link>
              </div>
            </div>
          </nav>
        </GlassSurface>
      </div>

      <div className="lg:hidden">
        <StaggeredMenu
          hideLogo
          isFixed
          position="right"
          items={MENU_ITEMS}
          displayItemNumbering
          displaySocials={false}
          logoUrl="/logo-full.png"
          menuButtonColor="#111111"
          openMenuButtonColor="#111111"
          colors={["#D8C9FF", "#86C9B9", "#FFEBB8"]}
          accentColor="#574092"
        />
      </div>
    </>
  );
}
