import type { IngredientIllustrationKind } from "@/lib/ingredients";

type Props = {
  kind: IngredientIllustrationKind;
  className?: string;
};

const STROKE = "currentColor";

function Leaf() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M40 12c-14 6-22 18-22 30 0 12 8 22 22 26 14-4 22-14 22-26 0-12-8-24-22-30z" />
      <path d="M40 14v52" />
      <path d="M40 26c-6 1-12 5-15 11" />
      <path d="M40 26c6 1 12 5 15 11" />
      <path d="M40 40c-7 2-13 7-16 14" />
      <path d="M40 40c7 2 13 7 16 14" />
      <path d="M40 54c-4 2-8 6-10 10" />
      <path d="M40 54c4 2 8 6 10 10" />
    </svg>
  );
}

function Flower() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="40" cy="32" r="5" />
      <ellipse cx="40" cy="18" rx="5" ry="9" />
      <ellipse cx="54" cy="26" rx="5" ry="9" transform="rotate(60 54 26)" />
      <ellipse cx="54" cy="40" rx="5" ry="9" transform="rotate(120 54 40)" />
      <ellipse cx="40" cy="46" rx="5" ry="9" />
      <ellipse cx="26" cy="40" rx="5" ry="9" transform="rotate(60 26 40)" />
      <ellipse cx="26" cy="26" rx="5" ry="9" transform="rotate(120 26 26)" />
      <path d="M40 46c0 8 0 16-6 22" />
      <path d="M40 52c4 4 6 10 6 16" />
    </svg>
  );
}

function Root() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M40 10c-3 6-3 12 0 18" />
      <path d="M40 28c-8 4-12 12-10 22" />
      <path d="M40 28c8 4 12 12 10 22" />
      <path d="M30 50c-2 6-6 10-12 14" />
      <path d="M50 50c2 6 6 10 12 14" />
      <path d="M40 28c-1 12-4 22-8 32" />
      <path d="M40 28c1 12 4 22 8 32" />
      <path d="M34 14c-2 2-4 4-4 6" />
      <path d="M46 14c2 2 4 4 4 6" />
    </svg>
  );
}

function Mineral() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M40 12L22 30l8 36h20l8-36L40 12z" />
      <path d="M22 30h36" />
      <path d="M40 12v54" />
      <path d="M30 30l10 36 10-36" />
      <path d="M30 30l10-18 10 18" />
    </svg>
  );
}

function Mushroom() {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 36c0-14 11-22 24-22s24 8 24 22c0 3-2 4-5 4H21c-3 0-5-1-5-4z" />
      <path d="M30 40v18c0 4 4 8 10 8s10-4 10-8V40" />
      <circle cx="30" cy="28" r="2.5" />
      <circle cx="46" cy="24" r="2" />
      <circle cx="52" cy="32" r="1.5" />
      <path d="M34 48c2 4 6 6 12 6" />
    </svg>
  );
}

const REGISTRY: Record<IngredientIllustrationKind, () => React.JSX.Element> = {
  leaf: Leaf,
  flower: Flower,
  root: Root,
  mineral: Mineral,
  mushroom: Mushroom,
};

export default function IngredientIllustration({ kind, className }: Props) {
  const Glyph = REGISTRY[kind];
  return (
    <div className={className} aria-hidden="true">
      <Glyph />
    </div>
  );
}
