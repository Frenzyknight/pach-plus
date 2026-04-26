"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap from "gsap";

const R = 120;

interface PackageImage {
  src: string;
  alt: string;
}

interface PackageCarouselProps {
  images: PackageImage[];
  currentIndex: number;
  onDotClick: (index: number) => void;
  accentColor: string;
}

export default function PackageCarousel({
  images,
  currentIndex,
  onDotClick,
  accentColor,
}: PackageCarouselProps) {
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevIndex = useRef(currentIndex);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const prev = prevIndex.current;
    if (prev === currentIndex) return;

    if (tlRef.current) tlRef.current.kill();

    const exitEl = wrapperRefs.current[prev];
    const enterEl = wrapperRefs.current[currentIndex];

    if (exitEl) {
      gsap.set(exitEl, { x: 0, y: 0, scale: 1, filter: "blur(0px)" });
    }
    if (enterEl) {
      gsap.set(enterEl, { x: R, y: R, scale: 0.6, opacity: 0, filter: "blur(12px)" });
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (exitEl) gsap.set(exitEl, { filter: "none" });
        if (enterEl) gsap.set(enterEl, { filter: "none" });
      },
    });
    tlRef.current = tl;

    if (exitEl) {
      tl.to(exitEl, { x: -R, ease: "sine.out", duration: 0.9 }, 0)
        .to(exitEl, { y: R, ease: "sine.in", duration: 0.9 }, 0)
        .to(exitEl, { scale: 0.6, opacity: 0, filter: "blur(12px)", ease: "power2.inOut", duration: 0.9 }, 0);
    }

    if (enterEl) {
      tl.to(enterEl, { x: 0, ease: "sine.in", duration: 0.9 }, 0)
        .to(enterEl, { y: 0, ease: "sine.out", duration: 0.9 }, 0)
        .to(enterEl, { scale: 1, opacity: 1, filter: "blur(0px)", ease: "power2.inOut", duration: 0.9 }, 0);
    }

    prevIndex.current = currentIndex;

    return () => {
      tl.kill();
    };
  }, [currentIndex, images.length]);

  return (
    <div className="relative z-10 flex flex-col items-center">
      <div className="relative w-[43vw] min-w-[150px] max-w-[220px] aspect-300/430 sm:w-[34vw] sm:max-w-[260px] md:w-[22vw] md:min-w-[180px] md:max-w-[300px]">
        {images.map((img, i) => (
          <div
            key={img.src}
            ref={(el) => {
              wrapperRefs.current[i] = el;
            }}
            className={`absolute inset-0 ${i === 0 ? "" : "opacity-0"}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={300}
              height={430}
              className="w-full h-full object-contain rounded-xl"
              style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.3))" }}
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-2.5 mt-5 md:mt-6 z-20">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => onDotClick(i)}
            className="w-2.5 h-2.5 rounded-full transition-all duration-500 cursor-pointer"
            style={{
              backgroundColor:
                i === currentIndex ? accentColor : "rgba(255,255,255,0.5)",
              transform: i === currentIndex ? "scale(1.3)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
