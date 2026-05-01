"use client";

import { useEffect, useRef } from "react";
import { Clock, Cloud, Droplets, ShieldCheck } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LAYER_IMAGE_VERSION = "2026-04-27-transparent";

const LAYERS = [
  {
    src: `/layer 1.png?v=${LAYER_IMAGE_VERSION}`,
    alt: "pach+ printed top layer",
    callout: {
      title: "Soft Foam",
      className: "items-end text-right -left-[58%] xs:-left-[42%] lg:-left-[44%] 2xl:-left-[42%]",
    },
  },
  {
    src: `/layer2.png?v=${LAYER_IMAGE_VERSION}`,
    alt: "Blue middle layer",
    callout: {
      title: "Vitamin Reservoir",
      className: "items-start text-left right-[-58%] xs:right-[-42%] lg:right-[-44%] 2xl:right-[-42%]",
    },
  },
  {
    src: `/layer3.png?v=${LAYER_IMAGE_VERSION}`,
    alt: "White absorbent layer",
    callout: {
      title: "Porous Liner",
      body: "for 8 hour extended release",
      className: "items-end text-right -left-[58%] xs:-left-[42%] lg:-left-[44%] 2xl:-left-[44%]",
    },
  },
  {
    src: `/layer4.png?v=${LAYER_IMAGE_VERSION}`,
    alt: "Pink backing layer",
    callout: {
      title: "Skin-Friendly, Gentle Adhesive",
      className: "items-start text-left right-[-62%] xs:right-[-46%] lg:right-[-48%] 2xl:right-[-48%]",
    },
  },
];

const PATCH_DETAILS = [
  {
    label: "Soft Foam",
    body: "Gives you the fluffy feel",
    color: "text-purple-500",
    accent: "bg-purple-500/12 text-purple-700",
    icon: Cloud,
  },
  {
    label: "Nutrient Reservoir",
    body: "Infused with lipophilic vitamins and minerals",
    color: "text-teal-700",
    accent: "bg-teal-700/12 text-teal-800",
    icon: Droplets,
  },
  {
    label: "Porous Liner",
    body: "Ensures controlled, extended release over 8 hours",
    color: "text-[#1E3A8A]",
    accent: "bg-[#DBEAFE] text-[#1E3A8A]",
    icon: Clock,
  },
  {
    label: "Adhesive",
    body: "Skin-friendly layer that keeps the patch in place",
    color: "text-pink-700",
    accent: "bg-pink-700/12 text-pink-800",
    icon: ShieldCheck,
  },
];

function LayerDetailCards({ className }: { className?: string }) {
  return (
    <div className={className}>
      {PATCH_DETAILS.map((detail, index) => {
        const Icon = detail.icon;

        return (
          <article
            key={detail.label}
            className="layer-stack-card rounded-[1.15rem] border border-foreground/6 bg-white p-2.5 shadow-[0_18px_48px_rgba(87,64,146,0.08)] xs:rounded-[1.35rem] xs:p-3 lg:min-h-[150px] lg:rounded-3xl lg:p-4 xl:min-h-[165px] 2xl:min-h-[190px] 2xl:p-5"
          >
            <div
              className={`layer-stack-card-icon mb-2 flex size-8 items-center justify-center rounded-xl xs:mb-3 xs:size-9 lg:mb-4 lg:size-10 lg:rounded-2xl 2xl:mb-6 2xl:size-12 ${detail.accent}`}
            >
              <Icon className="size-4.5 xs:size-5 lg:size-6 2xl:size-7" aria-hidden="true" />
            </div>
            <h3
              className={`layer-stack-card-title text-[11px] font-black leading-tight xs:text-[13px] lg:text-base 2xl:text-lg ${detail.color}`}
            >
              {index + 1}. {detail.label}
            </h3>
            <p className="layer-stack-card-copy mt-1.5 text-[10px] font-medium leading-snug text-foreground/62 xs:mt-2 xs:text-[11px] lg:mt-3 lg:text-sm lg:leading-relaxed 2xl:text-base">
              {detail.body}
            </p>
          </article>
        );
      })}
    </div>
  );
}

export default function LayerStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 640px) and (max-width: 1023px)",
        isMobile: "(max-width: 639px)",
        isShortMobile: "(max-width: 639px) and (max-height: 700px)",
      },
      (context) => {
        const { isDesktop, isTablet, isShortMobile } =
          context.conditions ?? {};
        const spread = isDesktop
          ? [0, 108, 214, 320]
          : isTablet
            ? [0, 70, 138, 206]
            : isShortMobile
              ? [0, 32, 64, 96]
              : [0, 40, 80, 120];
        const settledScale = isDesktop
          ? 0.7
          : isTablet
            ? 0.52
            : isShortMobile
              ? 0.42
              : 0.48;
        const layerScales = [
          settledScale * 1.08,
          settledScale,
          settledScale * 0.96,
          settledScale * 0.96,
        ];

        const layers = layerRefs.current;
        const callouts = calloutRefs.current;

        layers.forEach((layer, index) => {
          if (!layer) return;

          gsap.set(layer, {
            xPercent: isDesktop ? 0 : -50,
            yPercent: -50,
            y: 0,
            scale: layerScales[index],
            opacity: 1,
            zIndex: LAYERS.length - index,
            transformOrigin: "50% 50%",
          });
        });
        callouts.forEach((callout) => {
          if (!callout) return;

          gsap.set(callout, {
            opacity: 0,
            y: 10,
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
        if (callouts[0]) {
          tl.to(
            callouts[0],
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out",
            },
            0.15,
          );
        }

        LAYERS.slice(1).forEach((_, index) => {
          const layerIndex = index + 1;
          const startTime = index * 0.9 + 0.15;
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
            startTime,
          );
          if (callouts[layerIndex]) {
            tl.to(
              callouts[layerIndex],
              {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              },
              startTime + 0.35,
            );
          }
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
      id="science"
      ref={sectionRef}
      className="layer-stack-section relative h-svh min-h-[640px] w-full overflow-hidden bg-white lg:h-screen lg:min-h-0"
      aria-label="pach+ patch layer breakdown"
    >
      <div className="layer-stack-frame absolute inset-0 px-6 pb-5 pt-24 lg:px-10 lg:py-20">
        <div className="layer-stack-layout relative mx-auto grid h-full max-w-[1400px] grid-rows-[auto_minmax(172px,1fr)_auto] gap-3 lg:block">
          <div className="relative z-20 max-w-[680px] lg:absolute lg:left-0 lg:top-1/2 lg:max-w-[620px] lg:-translate-y-1/2 xl:max-w-[700px] 2xl:max-w-[860px]">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.24em] text-teal-800/60 sm:mb-3 sm:text-xs">
              Patch anatomy
            </p>
            <h2 className="layer-stack-title text-[1.9rem] font-black leading-[0.95] tracking-[-0.055em] text-slate-900 xs:text-4xl sm:text-5xl xl:text-6xl">
              Built for steady{" "}
              <span className="block sm:inline">skin delivery</span>
            </h2>
            <div className="layer-stack-copy mt-2.5 max-w-[500px] text-[10px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:mt-5 sm:text-sm lg:text-base">
              The matrix is carefully infused with lipophilic vitamins and
              minerals, then layered for comfort, hold, and steady transdermal
              release.
            </div>
            <LayerDetailCards className="mt-9 hidden max-w-[560px] grid-cols-2 gap-5 lg:grid lg:gap-4 xl:max-w-[620px] xl:gap-5 2xl:max-w-none" />
          </div>

          <div className="layer-stack-stage relative z-10 min-h-0 overflow-hidden lg:contents lg:overflow-visible">
            {LAYERS.map((layer, index) => (
              <div
                key={layer.src}
                ref={(el) => {
                  layerRefs.current[index] = el;
                }}
                className="layer-stack-layer absolute left-1/2 top-[30%] aspect-746/455 w-[min(64vw,240px)] will-change-transform sm:top-[34%] sm:w-[min(44vw,340px)] lg:left-auto lg:right-28 lg:top-[34%] lg:w-[min(24vw,330px)] xl:right-32 xl:w-[min(24vw,360px)] 2xl:right-0 2xl:w-[min(26vw,390px)]"
              >
                <div
                  className={`pointer-events-none absolute top-1/2 z-20 flex w-28 -translate-y-1/2 flex-col text-[13px] font-black uppercase leading-tight tracking-[-0.02em] text-foreground sm:w-32 2xl:w-40 ${layer.callout.className}`}
                >
                  <div
                    ref={(el) => {
                      calloutRefs.current[index] = el;
                    }}
                    className="flex flex-col"
                  >
                    <span>{layer.callout.title}</span>
                    {layer.callout.body ? (
                      <span className="mt-1 text-[10px] font-bold normal-case leading-snug tracking-normal">
                        {layer.callout.body}
                      </span>
                    ) : null}
                  </div>
                </div>
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

          <LayerDetailCards className="layer-stack-cards relative z-20 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden" />
        </div>
      </div>
    </section>
  );
}
