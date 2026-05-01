"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
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
  const hands1Ref = useRef<HTMLDivElement>(null);
  const hands2Ref = useRef<HTMLDivElement>(null);
  const headingLineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const hands1 = hands1Ref.current;
    const hands2 = hands2Ref.current;

    if (hands1) {
      gsap.set(hands1, {
        xPercent: 0,
        clipPath: "inset(0 100% 0 0)",
      });
    }

    if (hands2) {
      gsap.set(hands2, {
        xPercent: 0,
        clipPath: "inset(0 0 0 100%)",
      });
    }

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

    if (hands1) {
      tl.to(
        hands1,
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power2.out",
        },
        0,
      );
    }

    if (hands2) {
      tl.to(
        hands2,
        {
          clipPath: "inset(0 0 0 0%)",
          duration: 1,
          ease: "power2.out",
        },
        0,
      );
    }

    headingLineRefs.current.forEach((el, i) => {
      if (!el) return;
      tl.fromTo(
        el,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
        i * 0.15,
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
      <div
        ref={hands1Ref}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-5 aspect-952/808 w-[min(52vw,320px)] select-none sm:w-[min(34vw,390px)] lg:w-[min(20vw,360px)]"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        <Image
          src="/hands1.png"
          alt=""
          fill
          sizes="(max-width: 640px) 52vw, (max-width: 1024px) 34vw, 20vw"
          className="object-contain object-top-left"
        />
      </div>
      <div
        ref={hands2Ref}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 z-5 aspect-949/404 w-[min(68vw,390px)] select-none sm:w-[min(44vw,520px)] lg:w-[min(26vw,480px)]"
        style={{ clipPath: "inset(0 0 0 100%)" }}
      >
        <Image
          src="/hands2.png"
          alt=""
          fill
          sizes="(max-width: 640px) 68vw, (max-width: 1024px) 44vw, 26vw"
          className="object-contain object-bottom-right"
        />
      </div>
      <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none px-6">
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
            You deserve More.
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
