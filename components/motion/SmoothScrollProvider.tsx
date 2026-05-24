"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    // Desktop-only: require a precise pointer (mouse/trackpad) AND a wide
    // viewport. Touch devices keep native momentum scrolling, which feels
    // better than a JS-driven smooth scroll on phones/tablets.
    const desktopQuery = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)",
    );

    type LenisWindow = Window & { __lenis?: Lenis };

    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;
    let handleScroll: (() => void) | null = null;
    let handleAnchorClick: ((event: MouseEvent) => void) | null = null;

    const start = () => {
      if (lenis) return;

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
        syncTouch: false,
      });

      handleScroll = () => ScrollTrigger.update();
      lenis.on("scroll", handleScroll);

      tick = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      handleAnchorClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (!target) return;
        const link = target.closest("a[href^='#']") as HTMLAnchorElement | null;
        if (!link) return;
        const hash = link.getAttribute("href");
        if (!hash || hash === "#") return;
        const el = document.querySelector(hash);
        if (!el) return;
        event.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: 0 });
      };
      document.addEventListener("click", handleAnchorClick);

      (window as LenisWindow).__lenis = lenis;
    };

    const stop = () => {
      if (handleAnchorClick) {
        document.removeEventListener("click", handleAnchorClick);
        handleAnchorClick = null;
      }
      if (lenis && handleScroll) {
        lenis.off("scroll", handleScroll);
        handleScroll = null;
      }
      if (tick) {
        gsap.ticker.remove(tick);
        tick = null;
      }
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      delete (window as LenisWindow).__lenis;
    };

    const handleQueryChange = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) start();
      else stop();
    };

    handleQueryChange(desktopQuery);
    desktopQuery.addEventListener("change", handleQueryChange);

    return () => {
      desktopQuery.removeEventListener("change", handleQueryChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
