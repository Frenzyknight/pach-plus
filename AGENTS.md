<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# pach+ Design System

This is the **pach+** site — a plant-based transdermal wellness patch brand. Every new component MUST follow the conventions below. Match the tone, motion, and visual language of existing sections (`components/HeroProductShowcase.tsx`, `components/CtaBannerSection.tsx`, `components/about/*`, `components/Footer.tsx`).

## Voice & Tone
- Calm, premium, plant-forward, science-backed. Lowercase brand: **pach+** (never "Pach+" or "PACH+").
- Eyebrows are short ALL-CAPS labels ("Our mission", "Why pach+", "Shop the Pouches").
- Titles are 2–3 short clauses, often mixing weights for emphasis (see "Hero Title Pattern").
- Copy is short, sensory, never clinical. Asterisks (`*`) mark wellness disclaimers — keep them.

## Tech Stack (use these — do not introduce alternatives)
- **Next.js 16 (App Router)** with React 19. Read `node_modules/next/dist/docs/` before assuming any API.
- **TypeScript** everywhere. Strict types — no `any`.
- **Tailwind CSS v4** (config lives in `app/globals.css` via `@theme inline`, NOT `tailwind.config.js`).
- **shadcn** style `radix-luma`, base color `neutral`, lucide icons. Aliases: `@/components`, `@/lib`, `@/components/ui`.
- **`motion/react`** (the new Motion package) — NOT `framer-motion`. Import `motion`, `useScroll`, `useSpring`, `useTransform`, `useReducedMotion`, `LayoutGroup`, `MotionConfig` from `motion/react`.
- **GSAP + ScrollTrigger** only for complex pinned/scrubbed scroll choreography (see `LayerStackSection.tsx`). Default to `motion/react` for everything else.
- **React Three Fiber + drei** for 3D scenes (`PouchScene.tsx`).
- `clsx` + `tailwind-merge` via `cn()` from `@/lib/utils` for conditional classes.

## Typography
- **Primary font:** `Inter` via `next/font/google`, exposed as the CSS variable `--font-sans` and wired into Tailwind's `font-sans` (see `app/layout.tsx`). Use `font-sans` (default) — do NOT import other Google fonts.
- **Body fallback:** `'Helvetica Neue', Helvetica, Arial, sans-serif` (set in `app/globals.css`).
- **Decorative script** (rare, for handwritten accents like "Why people love it"): inline `fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive"`, italic.
- **Weights used:** `font-extralight` (200), `font-medium` (500), `font-semibold` (600), `font-bold` (700), `font-black` (900). Mix `font-bold` + `font-extralight` in the same headline for the signature pach+ rhythm.

### Hero Title Pattern (the pach+ signature headline)
Three spans with alternating weights, fluid sizing via `clamp()`, tight negative tracking, very tight line-height:

```tsx
<h2
  className="leading-[1.05] tracking-[-0.03em] text-foreground"
  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
>
  <span className="font-bold">Driving wellness</span>{" "}
  <span className="font-extralight">through</span>{" "}
  <span className="font-bold">smart formulation.</span>
</h2>
```

Hero-scale variant (used in `HeroProductShowcase`): `fontSize: "clamp(2.25rem, 7vw, 5.5rem)"`.

### Eyebrow Label (use above every section title)
```tsx
<p className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60">
  Our mission
</p>
```
- Size: `text-[10px]` (mobile) → `text-[11px]` when used as a section title eyebrow.
- Tracking: `tracking-[0.25em]` for eyebrows, `tracking-[0.15em]` for nav/CTA labels, `tracking-[0.22em]`–`tracking-[0.18em]` for buttons.
- Color: `text-foreground/60` or `text-teal-800/60`.

### Body Copy
- Standard paragraph: `text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm lg:text-base`.
- Captions / muted: `text-foreground/50` or `text-foreground/40`.

## Color Tokens (defined in `app/globals.css` via `@theme inline`)
Use Tailwind utility classes (`bg-teal-900`, `text-purple-500`, etc.) — these resolve to the tokens below. Do NOT inline hex values for brand colors when a token exists.

| Family | 900 | 700 | 500 | 300 | 100 |
|--------|------|------|------|------|------|
| **teal** (primary brand) | `#0D3E32` | `#1A715E` | `#33957B` | `#86C9B9` | `#B8E4DA` |
| **purple** (Happy Muscles) | `#12013C` | `#381E79` | `#574092` | `#896CC4` | `#D8C9FF` |
| **pink** (Happy Hormones) | `#7A1F31` | `#BA3F82` | `#F088B8` | `#FF9FD3` | `#FFC0E2` |
| **gold** (accents) | — | — | `#FFCD49` | `#FFD671` | `#FFEBB8` |

Plus shadcn neutrals: `bg-background`, `text-foreground`, `bg-card`, `border-border`, `bg-muted`, `text-muted-foreground`, etc. — see `globals.css` for the full list (light + `.dark` variants).

### Per-Product Accents (from `lib/products.ts`)
Each product carries its own `accent` / `accentLight` / `bg` that should be applied via inline `style={{ backgroundColor: product.accent }}` on product-specific CTAs, rings, and card backgrounds. Do not hardcode — read from the product object.

| Product | accent | accentLight | bg |
|---------|--------|-------------|-----|
| Happy Muscles | `#574092` | `#896CC4` | `#E9D5FF` |
| Happy Breathe | `#1E3A8A` | `#93C5FD` | `#DBEAFE` |
| Happy Hormones | `#BE185D` | `#F9A8D4` | `#FCE7F3` |
| Happy Gut | `#065F46` | `#6EE7B7` | `#D1FAE5` |

## Spacing & Layout System
- **Page container:** `mx-auto max-w-[1400px]`.
- **Horizontal padding (responsive ladder):** `px-5 xs:px-6 lg:px-10`. Some sections use `px-6 lg:px-16` for footer-style breathing room.
- **Vertical section padding:** `py-16 sm:py-20 lg:py-28` (standard), `pt-24 sm:pt-28 lg:pt-32` for first-section heroes.
- **Custom `xs` breakpoint:** `500px` (defined in `globals.css` as `--breakpoint-xs`). Use it for tight tweaks between mobile and `sm` (640px).
- **Border radii:** `rounded-2xl` (cards, image wrappers), `rounded-3xl` / `rounded-[28px]` (hero image frames, large feature cards), `rounded-full` (pills, CTAs, thumbnails). The `--radius` token is `0.625rem` with `radius-sm` through `radius-4xl` derived from it.
- **Grids:** product/feature grids are `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5`. Mission/values use `lg:grid-cols-2 gap-12 lg:gap-16`. About stats: `grid-cols-2 lg:grid-cols-4`.

## Motion Conventions

Always wrap pages in `<PageMotionProvider>` (already in `app/page.tsx`). It sets `reducedMotion="user"` and a default spring of `{ stiffness: 140, damping: 22, mass: 0.9 }`.

### Standard imports
```tsx
"use client";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { Reveal, revealItem } from "@/components/motion/Reveal";
```

### Reveal-on-scroll (preferred for all sections)
Use the shared `Reveal` component from `@/components/motion/Reveal`. It handles `useReducedMotion`, `viewport={{ once: true }}`, and the canonical easing `[0.22, 1, 0.36, 1]`. Stagger children with `revealItem`.

```tsx
<Reveal stagger={0.08} amount={0.2} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <motion.div variants={revealItem}>...</motion.div>
  <motion.div variants={revealItem}>...</motion.div>
</Reveal>
```

### Scroll-linked parallax (images, banners)
Pattern used across `BannerSection`, `CtaBannerSection`, `AboutHero`, `ScienceHero`:
```tsx
const ref = useRef<HTMLDivElement | null>(null);
const reduce = useReducedMotion();
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
const smoothed = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
const scale = useTransform(smoothed, [0, 1], [1.04, 1.12]);
const y = useTransform(smoothed, [0, 1], ["2%", "-6%"]);
```
Or import `<Parallax translateY={[-40, 40]} />` from `@/components/motion/Parallax`. **Always honor `useReducedMotion()`** by skipping transforms (`style={reduce ? undefined : { ... }}`).

### Hover / tap micro-interactions
- Buttons: `whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }}`
- Cards / thumbnails: `whileHover={{ y: -4 }} whileTap={{ scale: 0.99 }}`
- Spring presets: `{ type: "spring", stiffness: 280, damping: 22 }` (cards) or `{ stiffness: 320–360, damping: 18–22 }` (buttons / icons).
- Nav links: `whileHover={{ y: -1, opacity: 0.7 }} whileTap={{ scale: 0.96 }}`.

### Canonical easing
- Reveal / parallax: `cubic-bezier(0.22, 1, 0.36, 1)` ≡ `[0.22, 1, 0.36, 1]`.
- Carousel slides: `cubic-bezier(0.32, 0.72, 0, 1)`.

## Component Patterns

### Pill CTA with leading icon (the signature pach+ button)
```tsx
<motion.div whileHover="hover" whileTap={{ scale: 0.97 }} initial="rest" animate="rest">
  <Link href="/shop" className="group flex items-center gap-0" aria-label="Shop now">
    <motion.span
      variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.08, rotate: 8 } }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-white"
    >
      <ArrowIcon />
    </motion.span>
    <motion.span
      variants={{ rest: { paddingLeft: 24, paddingRight: 28 }, hover: { paddingLeft: 28, paddingRight: 32 } }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="ml-[-14px] rounded-full bg-teal-900 py-3.5 text-sm font-medium tracking-[0.08em] text-white group-hover:bg-teal-700"
    >
      Shop now
    </motion.span>
  </Link>
</motion.div>
```

### Outline pill (secondary)
```tsx
<Link
  href="/science"
  className="inline-flex items-center gap-1.5 rounded-full border border-teal-900/20 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.15em] text-teal-900 transition-colors hover:bg-teal-900 hover:text-white"
>
  Learn more
</Link>
```

### Product CTA (color-coded by product)
```tsx
className="rounded-full py-3.5 text-[11px] font-medium uppercase tracking-[0.15em] text-white"
style={{ backgroundColor: product.accent }}
```

### Sticky glass navbar
Use `GlassSurface` (`components/GlassSurface.tsx`) — height 56px, `borderRadius={999}`, `blur={14}`. Mobile menu uses `StaggeredMenu` with brand `colors={["#D8C9FF", "#86C9B9", "#FFEBB8"]}` and `accentColor="#574092"`.

### Section skeleton
```tsx
<section className="bg-white px-5 py-20 xs:px-6 lg:px-10 lg:py-28">
  <div className="mx-auto max-w-[1400px]">
    <Reveal stagger={0.08} amount={0.2}>
      <motion.p variants={revealItem} className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4">
        Eyebrow
      </motion.p>
      <motion.h2
        variants={revealItem}
        className="leading-[1.05] tracking-[-0.03em] text-foreground"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        <span className="font-bold">First</span>{" "}
        <span className="font-extralight">middle</span>{" "}
        <span className="font-bold">last.</span>
      </motion.h2>
      {/* ...content */}
    </Reveal>
  </div>
</section>
```

## Imagery
- Use `next/image` (`<Image>`) for ALL raster assets — never raw `<img>` except inside `<picture>` for art-direction (mobile vs desktop crops as in `BannerSection`).
- Always provide `alt`, `sizes`, and `priority` for above-the-fold imagery.
- Hero photography lives in `/public` (e.g. `/banner-mobile-final.jpeg`, `/about-hero.jpeg`).
- Decorative botanical stencils (`/eucalyptus-stencil.png`, `/chamomille-stencil.png`, etc.) float behind hero copy at low opacity — wrap in `motion.div` with subtle infinite `y: [0, -6, 0]` floats.
- Image wrappers use `rounded-2xl sm:rounded-3xl` with parallax inner `scale: 1.08` so translation never reveals edges.

## Accessibility (non-negotiable)
- Every interactive element needs `aria-label` (or visible text).
- Decorative SVGs and images: `aria-hidden="true"` and empty `alt=""`.
- Focus rings: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30` (or `focus-visible:outline-2 focus-visible:outline-offset-2` matching the accent).
- Honor `useReducedMotion()` — always provide a static fallback for parallax and infinite loops.
- Carousels: include arrow buttons, dot indicators with `aria-selected`, and keyboard-reachable controls.

## File & Code Conventions
- Components: `PascalCase.tsx` in `components/`. Section-scoped subfolders: `components/about/`, `components/science/`, `components/product-detail/`, `components/motion/`.
- Client components MUST start with `"use client";`. Server components are the default.
- Shared data lives in `lib/` (`lib/products.ts`, `lib/ingredients.ts`). Add new typed entries there instead of inlining inside components.
- Use the path alias `@/` (e.g. `@/components/...`, `@/lib/products`) — never relative `../../`.
- No comments narrating obvious code. Comments only explain non-obvious intent (the existing codebase follows this — match it).
- Keep components self-contained; extract sub-components (e.g. icon helpers like `ArrowIcon`, `BackToTopArrow`) at the top of the file when reused twice or more.

## What NOT to do
- Don't import `framer-motion` — it's `motion/react`.
- Don't add a `tailwind.config.js` — config is in `app/globals.css` under `@theme inline`.
- Don't introduce new font families without updating `app/layout.tsx` and the `--font-sans` variable.
- Don't hardcode brand hex codes when a Tailwind token exists (`bg-teal-900` not `bg-[#0D3E32]`).
- Don't skip the `Reveal` wrapper on new sections — it's how scroll-in animation stays consistent.
- Don't ignore `useReducedMotion`.
- Don't use `<img>` for first-party imagery — use `next/image`.
