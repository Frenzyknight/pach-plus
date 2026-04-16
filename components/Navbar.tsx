"use client";

import Image from "next/image";
import GlassSurface from "@/components/GlassSurface";

export default function Navbar() {
  return (
    <div className="fixed top-5 left-6 right-6 lg:left-10 lg:right-10 z-50">
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
        <nav className="flex items-center justify-between w-full px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Image
              src="/logo-full.png"
              alt="pach+"
              width={100}
              height={40}
              className="h-6 w-auto"
              priority
            />
            <div className="hidden lg:flex items-center gap-6 text-[11px] font-medium tracking-[0.15em] uppercase">
              <a href="#" className="hover:opacity-60 transition-opacity">
                Shop
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity">
                About
              </a>
              <a href="#" className="hover:opacity-60 transition-opacity">
                Bestsellers
              </a>
            </div>
          </div>


          <div className="hidden lg:flex items-center gap-6 text-[11px] font-medium tracking-[0.15em] uppercase">
            <a href="#" className="hover:opacity-60 transition-opacity">
              Help
            </a>
            <a href="#" className="hover:opacity-60 transition-opacity">
              Account
            </a>
            <a
              href="#"
              className="font-semibold underline underline-offset-4 decoration-foreground"
            >
              Cart(0)
            </a>
          </div>
        </nav>
      </GlassSurface>
    </div>
  );
}
