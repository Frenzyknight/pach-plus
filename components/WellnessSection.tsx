"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  teal: "#1A715E",
  purple: "#574092",
  pink: "#BA3F82",
};

export default function WellnessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingLineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    headingLineRefs.current.forEach((el) => {
      if (el) gsap.set(el, { opacity: 0, y: 40 });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=180%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      },
    });

    headingLineRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(
        el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        i * 0.15,
      );
    });

    headingLineRefs.current.forEach((el) => {
      if (!el) return;
      tl.to(
        el,
        { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" },
        1.6,
      );
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-6">
        <h2
          className="text-center leading-[1.1] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)" }}
        >
          <span
            ref={(el) => {
              headingLineRefs.current[0] = el;
            }}
            className="block font-black"
            style={{ color: COLORS.teal, opacity: 0 }}
          >
            You deserve to feel good.
          </span>
          <span
            ref={(el) => {
              headingLineRefs.current[1] = el;
            }}
            className="block font-black"
            style={{ color: COLORS.purple, opacity: 0 }}
          >
            You deserve More:
          </span>
          <span
            ref={(el) => {
              headingLineRefs.current[2] = el;
            }}
            className="block font-black"
            style={{ color: COLORS.pink, opacity: 0 }}
          >
            Wellness that sticks.
          </span>
        </h2>
      </div>
    </section>
  );
}
