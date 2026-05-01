"use client";

import Image from "next/image";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import gsap from "gsap";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logoUrl?: string;
  /** When true, only the menu toggle is shown in a fixed strip aligned with a top pill navbar (logo lives in the navbar). */
  hideLogo?: boolean;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  isFixed?: boolean;
  changeMenuColorOnOpen?: boolean;
  closeOnClickAway?: boolean;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const isExternalLink = (href: string) => /^https?:\/\//.test(href);

export default function StaggeredMenu({
  position = "right",
  colors = ["#D8C9FF", "#574092"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = "/logo-full.png",
  hideLogo = false,
  menuButtonColor = "#111",
  openMenuButtonColor = "#111",
  changeMenuColorOnOpen = true,
  accentColor = "#574092",
  isFixed = false,
  closeOnClickAway = true,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);
  const openRef = useRef(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;

      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      const preLayers = preContainer
        ? (Array.from(
            preContainer.querySelectorAll(".sm-prelayer"),
          ) as HTMLElement[])
        : [];
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) {
        gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      }

      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current) {
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
      }
    });

    return () => ctx.revert();
  }, [menuButtonColor, position]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];
    const numberEls = Array.from(
      panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    const offscreen = position === "left" ? -100 : 100;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) {
      gsap.set(numberEls, { "--sm-num-opacity": 0 } as gsap.TweenVars);
    }
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        index * 0.07,
      );
    });

    const lastLayerTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastLayerTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;

      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: "power2.out",
            "--sm-num-opacity": 1,
            stagger: { each: 0.08, from: "start" },
          } as gsap.TweenVars,
          itemsStart + 0.1,
        );
      }
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;

      if (socialTitle) {
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      }

      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
            onComplete: () => {
              gsap.set(socialLinks, { clearProps: "opacity" });
            },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  const playOpen = useCallback(() => {
    busyRef.current = true;
    const tl = buildOpenTimeline();

    if (!tl) {
      busyRef.current = false;
      return;
    }

    tl.eventCallback("onComplete", () => {
      busyRef.current = false;
    });
    tl.play(0);
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    itemEntranceTweenRef.current?.kill();

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const offscreen = position === "left" ? -100 : 100;
    busyRef.current = true;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel"),
        ) as HTMLElement[];
        const numberEls = Array.from(
          panel.querySelectorAll(".sm-panel-list[data-numbering] .sm-panel-item"),
        ) as HTMLElement[];
        const socialTitle = panel.querySelector(
          ".sm-socials-title",
        ) as HTMLElement | null;
        const socialLinks = Array.from(
          panel.querySelectorAll(".sm-socials-link"),
        ) as HTMLElement[];

        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        if (numberEls.length) {
          gsap.set(numberEls, { "--sm-num-opacity": 0 } as gsap.TweenVars);
        }
        if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
        if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;

      colorTweenRef.current?.kill();

      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor],
  );

  useEffect(() => {
    if (!toggleBtnRef.current) return;

    if (changeMenuColorOnOpen) {
      const targetColor = openRef.current
        ? openMenuButtonColor
        : menuButtonColor;
      gsap.set(toggleBtnRef.current, { color: targetColor });
    } else {
      gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    }
  }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    const targetLabel = opening ? "Close" : "Menu";
    const cycles = 3;
    const seq: string[] = [currentLabel];
    let last = currentLabel;

    for (let i = 0; i < cycles; i += 1) {
      last = last === "Menu" ? "Close" : "Menu";
      seq.push(last);
    }

    if (last !== targetLabel) seq.push(targetLabel);
    seq.push(targetLabel);

    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5 + lineCount * 0.07,
      ease: "power4.out",
    });
  }, []);

  const closeMenu = useCallback(() => {
    if (!openRef.current || busyRef.current) return;

    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
    playClose();
    animateIcon(false);
    animateColor(false);
    animateText(false);
  }, [animateColor, animateIcon, animateText, onMenuClose, playClose]);

  const toggleMenu = useCallback(() => {
    if (busyRef.current) return;

    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    animateColor,
    animateIcon,
    animateText,
    onMenuClose,
    onMenuOpen,
    playClose,
    playOpen,
  ]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeMenu, closeOnClickAway, open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, open]);

  const accentStyle = accentColor
    ? ({ "--sm-accent": accentColor } as React.CSSProperties)
    : undefined;

  return (
    <div
      className={`sm-scope z-60 pointer-events-none ${
        isFixed
          ? "fixed top-0 left-0 h-screen w-screen overflow-hidden"
          : "h-full w-full"
      }`}
    >
      <div
        className={`${
          className ? `${className} ` : ""
        }staggered-menu-wrapper pointer-events-none relative z-60 h-full w-full`}
        style={accentStyle}
        data-position={position}
        data-open={open || undefined}
        data-embed-toggle={hideLogo || undefined}
      >
        <div
          ref={preLayersRef}
          className="sm-prelayers pointer-events-none absolute top-0 right-0 bottom-0 z-5"
          aria-hidden="true"
        >
          {colors.slice(0, 4).map((color) => (
            <div
              key={color}
              className="sm-prelayer absolute top-0 right-0 h-full w-full translate-x-0"
              style={{ background: color }}
            />
          ))}
        </div>

        <header
          className={
            hideLogo
              ? "staggered-menu-header pointer-events-none fixed top-5 left-6 right-6 z-[61] flex h-14 items-center justify-end bg-transparent px-5 lg:left-10 lg:right-10"
              : "staggered-menu-header pointer-events-none absolute top-0 left-0 z-20 flex w-full items-center justify-between bg-transparent p-[2em]"
          }
          aria-label="Main navigation header"
        >
          {!hideLogo && (
            <Link
              href="/"
              className="sm-logo pointer-events-auto flex items-center select-none"
              aria-label="pach+ home"
              onClick={closeMenu}
            >
              <Image
                src={logoUrl}
                alt="pach+"
                className="sm-logo-img block h-8 w-auto object-contain"
                width={110}
                height={32}
                priority
              />
            </Link>
          )}

          <button
            ref={toggleBtnRef}
            className={`sm-toggle pointer-events-auto relative inline-flex cursor-pointer items-center gap-[0.3rem] overflow-visible border-0 bg-transparent font-medium leading-none ${
              open ? "text-black" : "text-foreground"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span
              className="sm-toggle-textWrap relative mr-2 inline-block h-[1em] overflow-hidden whitespace-nowrap"
              aria-hidden="true"
            >
              <span
                ref={textInnerRef}
                className="sm-toggle-textInner flex flex-col leading-none"
              >
                {textLines.map((line, index) => (
                  <span
                    className="sm-toggle-line block h-[1em] leading-none"
                    key={`${line}-${index}`}
                  >
                    {line}
                  </span>
                ))}
              </span>
            </span>

            <span
              ref={iconRef}
              className="sm-icon relative inline-flex h-[14px] w-[14px] shrink-0 items-center justify-center will-change-transform"
              aria-hidden="true"
            >
              <span
                ref={plusHRef}
                className="sm-icon-line absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-current will-change-transform"
              />
              <span
                ref={plusVRef}
                className="sm-icon-line sm-icon-line-v absolute left-1/2 top-1/2 h-[2px] w-full -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-current will-change-transform"
              />
            </span>
          </button>
        </header>

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="staggered-menu-panel pointer-events-auto absolute top-0 right-0 z-10 flex h-full flex-col overflow-y-auto bg-white p-[6em_2em_2em_2em] backdrop-blur-md"
          style={{ WebkitBackdropFilter: "blur(12px)" }}
          aria-hidden={!open}
        >
          <div className="sm-panel-inner flex flex-1 flex-col gap-5">
            <ul
              className="sm-panel-list m-0 flex list-none flex-col gap-2 p-0"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items.length ? (
                items.map((item, index) => (
                  <li
                    className="sm-panel-itemWrap relative overflow-hidden leading-none"
                    key={`${item.label}-${index}`}
                  >
                    {isExternalLink(item.link) ? (
                      <a
                        className="sm-panel-item relative inline-block cursor-pointer pr-[1.4em] text-[4rem] font-semibold leading-none tracking-[-2px] text-black uppercase no-underline transition-[background,color] duration-150 ease-linear"
                        href={item.link}
                        aria-label={item.ariaLabel}
                        data-index={index + 1}
                        tabIndex={open ? undefined : -1}
                        onClick={closeMenu}
                      >
                        <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                          {item.label}
                        </span>
                      </a>
                    ) : (
                      <Link
                        className="sm-panel-item relative inline-block cursor-pointer pr-[1.4em] text-[4rem] font-semibold leading-none tracking-[-2px] text-black uppercase no-underline transition-[background,color] duration-150 ease-linear"
                        href={item.link}
                        aria-label={item.ariaLabel}
                        data-index={index + 1}
                        tabIndex={open ? undefined : -1}
                        onClick={closeMenu}
                      >
                        <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                          {item.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))
              ) : (
                <li
                  className="sm-panel-itemWrap relative overflow-hidden leading-none"
                  aria-hidden="true"
                >
                  <span className="sm-panel-item relative inline-block cursor-pointer pr-[1.4em] text-[4rem] font-semibold leading-none tracking-[-2px] text-black uppercase no-underline transition-[background,color] duration-150 ease-linear">
                    <span className="sm-panel-itemLabel inline-block origin-[50%_100%] will-change-transform">
                      No items
                    </span>
                  </span>
                </li>
              )}
            </ul>

            {displaySocials && socialItems.length > 0 && (
              <div
                className="sm-socials mt-auto flex flex-col gap-3 pt-8"
                aria-label="Social links"
              >
                <h3
                  className="sm-socials-title m-0 text-base font-medium"
                  style={{ color: "var(--sm-accent, #574092)" }}
                >
                  Socials
                </h3>
                <ul
                  className="sm-socials-list m-0 flex list-none flex-row flex-wrap items-center gap-4 p-0"
                  role="list"
                >
                  {socialItems.map((social, index) => (
                    <li
                      key={`${social.label}-${index}`}
                      className="sm-socials-item"
                    >
                      <a
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sm-socials-link relative inline-block py-[2px] text-[1.2rem] font-medium text-[#111] no-underline transition-[color,opacity] duration-300 ease-linear"
                        tabIndex={open ? undefined : -1}
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
.sm-scope .staggered-menu-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 60;
  pointer-events: none;
}
.sm-scope .staggered-menu-header > * {
  pointer-events: auto;
}
.sm-scope .sm-logo-img {
  display: block;
  height: 32px;
  width: auto;
  object-fit: contain;
}
.sm-scope .sm-toggle {
  color: #111;
}
.sm-scope .sm-toggle:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--sm-accent, #574092) 65%, transparent);
  outline-offset: 4px;
  border-radius: 999px;
}
.sm-scope .sm-icon {
  position: relative;
  width: 14px;
  height: 14px;
  flex: 0 0 14px;
}
.sm-scope .sm-icon-line {
  transform: translate(-50%, -50%);
}
.sm-scope .staggered-menu-panel {
  width: clamp(260px, 38vw, 420px);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.sm-scope [data-position='left'] .staggered-menu-panel {
  right: auto;
  left: 0;
}
.sm-scope .sm-prelayers {
  width: clamp(260px, 38vw, 420px);
}
.sm-scope [data-position='left'] .sm-prelayers {
  right: auto;
  left: 0;
}
.sm-scope [data-position='left'] .sm-prelayer {
  right: auto;
  left: 0;
}
.sm-scope .sm-socials-list .sm-socials-link {
  opacity: 1;
  transition: opacity 0.3s ease, color 0.3s ease;
}
.sm-scope .sm-socials-list:hover .sm-socials-link:not(:hover),
.sm-scope .sm-socials-list:focus-within .sm-socials-link:not(:focus-visible) {
  opacity: 0.35;
}
.sm-scope .sm-socials-link:hover,
.sm-scope .sm-socials-link:focus-visible {
  color: var(--sm-accent, #574092);
  opacity: 1;
}
.sm-scope .sm-socials-link:focus-visible {
  outline: 2px solid var(--sm-accent, #574092);
  outline-offset: 3px;
}
.sm-scope .sm-panel-item:hover,
.sm-scope .sm-panel-item:focus-visible {
  color: var(--sm-accent, #574092);
}
.sm-scope .sm-panel-item:focus-visible {
  outline: 2px solid var(--sm-accent, #574092);
  outline-offset: 0.18em;
}
.sm-scope .sm-panel-list[data-numbering] {
  counter-reset: smItem;
}
.sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
  counter-increment: smItem;
  content: counter(smItem, decimal-leading-zero);
  position: absolute;
  top: 0.1em;
  right: 3.2em;
  font-size: 18px;
  font-weight: 400;
  color: var(--sm-accent, #574092);
  letter-spacing: 0;
  pointer-events: none;
  user-select: none;
  opacity: var(--sm-num-opacity, 0);
}
@media (max-width: 1023px) {
  .sm-scope:not([data-embed-toggle]) .staggered-menu-header {
    padding: 1.5rem;
  }
  .sm-scope .staggered-menu-panel,
  .sm-scope .sm-prelayers {
    width: 100%;
    left: 0;
    right: 0;
  }
  .sm-scope .sm-panel-item {
    font-size: clamp(3rem, 14vw, 5.25rem);
  }
  .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
    right: 1.6em;
  }
}
@media (max-width: 640px) {
  .sm-scope:not([data-embed-toggle]) .staggered-menu-header {
    padding: 1.25rem 1.5rem;
  }
  .sm-scope .sm-logo-img {
    height: 24px;
  }
  .sm-scope .staggered-menu-panel {
    padding: 6rem 1.5rem 1.5rem;
  }
  .sm-scope .sm-panel-list[data-numbering] .sm-panel-item::after {
    right: 0.6em;
    font-size: 14px;
  }
}
      `}</style>
    </div>
  );
}
