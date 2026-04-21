import Image from "next/image";
import Link from "next/link";

function Star({ filled = true }: { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={`w-4 h-4 ${filled ? "fill-teal-900" : "fill-teal-900/20"}`}
    >
      <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

interface Polaroid {
  src: string;
  alt: string;
  className: string;
  rotation: string;
  tint?: string;
}

const POLAROIDS: Polaroid[] = [
  {
    src: "/girl-guy.png",
    alt: "Couple wearing pach+ patches",
    className: "left-[-5%] top-[8%] w-[62%] z-10",
    rotation: "-7deg",
  },
  {
    src: "/girl-pach.png",
    alt: "Woman with pach+ Happy Hormones patch",
    className: "right-[-2%] top-[0%] w-[52%] z-30",
    rotation: "6deg",
  },
  {
    src: "/package.png",
    alt: "pach+ Recovery patch",
    className: "left-[18%] bottom-[-4%] w-[40%] z-20",
    rotation: "-4deg",
    tint: "#E9D5FF",
  },
  {
    src: "/package3.png",
    alt: "pach+ Happy Hormones patch",
    className: "right-[10%] bottom-[2%] w-[36%] z-40",
    rotation: "8deg",
    tint: "#FCE7F3",
  },
];

export default function CommunitySection() {
  return (
    <section className="relative bg-teal-100/50 py-20 lg:py-28 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Polaroid photo collage */}
        <div className="relative w-full h-[500px] lg:h-[620px] order-2 lg:order-1">
          {POLAROIDS.map((p) => (
            <div
              key={p.src}
              className={`absolute ${p.className} bg-white pt-3 px-3 pb-3 rounded-sm`}
              style={{
                transform: `rotate(${p.rotation})`,
                boxShadow:
                  "0 12px 40px -8px rgba(13, 62, 50, 0.25), 0 4px 12px -4px rgba(13, 62, 50, 0.15)",
              }}
            >
              <div
                className="relative w-full aspect-4/5 overflow-hidden"
                style={p.tint ? { backgroundColor: p.tint } : undefined}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  className={p.tint ? "object-contain p-4" : "object-cover"}
                  sizes="(max-width: 1024px) 50vw, 30vw"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right: Content */}
        <div className="relative order-1 lg:order-2">
          <h2
            className="font-bold tracking-tight leading-[1.1] text-teal-900"
            style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)" }}
          >
            We want to make wellness{" "}
            <span className="text-teal-700">simple, science-backed</span> and
            effortless &mdash; so you can feel good, live better, and enjoy every
            single day.
          </h2>

          <p className="mt-6 text-base lg:text-lg text-teal-900/70 leading-relaxed max-w-[540px]">
            Loved by thousands of community members, our plant-based transdermal
            patches deliver targeted, precision-dosed ingredients right where you
            need them. No pills. No mess. Just real relief while you live.
          </p>

          <div className="mt-10 flex items-center gap-5 flex-wrap">
            <Link
              href="/shop"
              className="group flex items-center gap-0"
              aria-label="Shop pach+ patches"
            >
              <span className="w-12 h-12 rounded-full bg-teal-900 text-white flex items-center justify-center transition-transform group-hover:scale-105">
                <ArrowIcon />
              </span>
              <span className="ml-[-14px] pl-6 pr-7 py-3.5 rounded-full bg-teal-900 text-white text-sm font-medium tracking-[0.08em] transition-colors group-hover:bg-teal-700">
                Shop now
              </span>
            </Link>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <Star />
                <Star />
                <Star />
                <Star />
                <Star filled={false} />
              </div>
              <a
                href="#"
                className="text-sm text-teal-900 underline underline-offset-4 hover:text-teal-700 transition-colors"
              >
                3,168 Reviews
              </a>
            </div>
          </div>

          <div className="mt-14 flex items-end gap-3">
            <p
              className="text-3xl lg:text-4xl text-teal-900/80"
              style={{
                fontFamily: "'Brush Script MT', 'Lucida Handwriting', cursive",
                fontStyle: "italic",
              }}
            >
              Why people love it
            </p>
            <svg
              viewBox="0 0 60 40"
              className="w-14 h-10 text-teal-900/60 mb-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <path d="M2 30 C 15 10, 35 8, 55 18" />
              <path d="M48 12 L 55 18 L 50 26" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
