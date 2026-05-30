"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import GlassSurface from "@/components/GlassSurface";
import StaggeredMenu, {
  type StaggeredMenuItem,
} from "@/components/StaggeredMenu";
import { CartDrawerTrigger } from "@/components/cart/cart-drawer-trigger";

const MENU_ITEMS: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "Shop", ariaLabel: "Shop pach+ products", link: "/shop" },
  { label: "About", ariaLabel: "Learn about pach+", link: "/about" },
  { label: "Science", ariaLabel: "The science behind pach+", link: "/science" },
];

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/science", label: "Science" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 26, mass: 0.7 }}
        className="fixed top-5 left-6 right-6 z-50 lg:left-10 lg:right-10"
      >
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
          <nav className="flex w-full items-center px-5 lg:justify-between lg:gap-3 lg:px-8 lg:pr-3">
            <div className="hidden min-w-0 flex-1 items-center gap-8 lg:flex">
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
              <div className="items-center gap-6 text-[11px] font-medium tracking-[0.15em] uppercase lg:flex">
                {NAV_LINKS.map((link) => (
                  <motion.div
                    key={link.href}
                    whileHover={{ y: -1, opacity: 0.7 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  >
                    <Link href={link.href} className="inline-block">
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-1 justify-center lg:hidden">
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
            </div>

            <div className="hidden shrink-0 lg:block">
              <CartDrawerTrigger />
            </div>
          </nav>
        </GlassSurface>
      </motion.div>

      <div
        aria-hidden={menuOpen}
        className={`pointer-events-none fixed top-5 left-6 right-6 z-61 flex h-14 items-center justify-end px-5 transition-opacity duration-200 lg:hidden ${
          menuOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className={menuOpen ? "pointer-events-none" : "pointer-events-auto"}>
          <CartDrawerTrigger className="h-12 w-12" />
        </div>
      </div>

      <div className="lg:hidden">
        <StaggeredMenu
          hideLogo
          isFixed
          position="left"
          items={MENU_ITEMS}
          displayItemNumbering={false}
          displaySocials={false}
          logoUrl="/logo-full.png"
          menuButtonColor="#111111"
          openMenuButtonColor="#111111"
          colors={["#86C9B9", "#896CC4", "#F088B8"]}
          accentColor="#DC2626"
          onMenuOpen={() => setMenuOpen(true)}
          onMenuClose={() => setMenuOpen(false)}
        />
      </div>
    </>
  );
}
