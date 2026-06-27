import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Circular "clinically proven · natural ingredients" seal. Positioned by the
 * caller (typically absolute top-right of a product showcase / card).
 */
export default function ClinicallyProvenBadge({
  className,
  size = 64,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src="/clinically-proven.png"
      alt="Clinically proven · natural ingredients"
      width={size}
      height={size}
      sizes={`${size}px`}
      className={cn("pointer-events-none select-none", className)}
      draggable={false}
    />
  );
}
