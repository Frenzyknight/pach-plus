"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LAYER_IMAGE_VERSION = "2026-04-27-transparent";

const LAYERS = [
  {
    src: `/layer 1.png?v=${LAYER_IMAGE_VERSION}`,
    alt: "pach+ printed top layer",
  },
  {
    src: `/layer2.png?v=${LAYER_IMAGE_VERSION}`,
    alt: "Blue middle layer",
  },
  {
    src: `/layer3.png?v=${LAYER_IMAGE_VERSION}`,
    alt: "White absorbent layer",
  },
  {
    src: `/layer4.png?v=${LAYER_IMAGE_VERSION}`,
    alt: "Pink backing layer",
  },
];

export default function LayerStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isMobile: "(max-width: 639px)",
      },
      (context) => {
        const { isDesktop, isTablet } = context.conditions ?? {};
        const spread = isDesktop
          ? [0, 195, 385, 575]
          : isTablet
            ? [0, 162, 320, 478]
            : [0, 122, 240, 358];
        const settledScale = isDesktop ? 0.58 : isTablet ? 0.56 : 0.54;
        const layerScales = [
          settledScale * 1.08,
          settledScale,
          settledScale * 0.96,
          settledScale * 0.96,
        ];

        const layers = layerRefs.current;

        layers.forEach((layer, index) => {
          if (!layer) return;

          gsap.set(layer, {
            xPercent: -50,
            yPercent: -50,
            y: 0,
            scale: layerScales[index],
            opacity: 1,
            zIndex: LAYERS.length - index,
            transformOrigin: "50% 50%",
          });
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=320%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.to(
          layers[0],
          {
            y: 0,
            scale: layerScales[0],
            duration: 0.4,
            ease: "none",
          },
          0,
        );

        LAYERS.slice(1).forEach((_, index) => {
          const layerIndex = index + 1;
          const movingLayers = layers
            .slice(layerIndex)
            .filter((layer): layer is HTMLDivElement => Boolean(layer));
          if (movingLayers.length === 0) return;

          tl.to(
            movingLayers,
            {
              y: spread[layerIndex],
              duration: 1,
              ease: "power2.out",
            },
            index * 0.9 + 0.15,
          );
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{ backgroundColor: "#fff" }}
      aria-label="pach+ patch layer breakdown"
    >
      <div className="absolute inset-0">
        {LAYERS.map((layer, index) => (
          <div
            key={layer.src}
            ref={(el) => {
              layerRefs.current[index] = el;
            }}
            className="absolute left-1/2 top-[20%] aspect-746/455 w-[min(58vw,360px)] will-change-transform sm:top-[16%] sm:w-[min(46vw,420px)] lg:top-[15%] lg:w-[min(30vw,420px)]"
          >
            {/* Use a native image here so the versioned local URL can bypass stale optimized-image cache. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={layer.src}
              alt={layer.alt}
              className="h-full w-full object-contain"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
