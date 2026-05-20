import Link from "next/link";
import Image from "next/image";

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { value: "50K+", label: "Patches shipped to wellness routines" },
  { value: "4.8/5", label: "Average customer rating" },
  { value: "12", label: "Hero plant & mineral ingredients" },
  { value: "100%", label: "Plant-based actives, no fillers" },
];


function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default function AboutStatsMission() {
  return (
    <section className="bg-white px-5 py-20 xs:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 border-b border-foreground/10 pb-14 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.value}>
              <p className="text-[2rem] font-black tracking-[-0.04em] text-slate-900 sm:text-4xl lg:text-5xl">
                {stat.value}
              </p>
              <p className="mt-2 max-w-[200px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:mt-24 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4">
              Our mission
            </p>
            <h2
              className="leading-[1.05] tracking-[-0.03em] text-foreground"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              <span className="font-bold">Driving wellness</span>{" "}
              <span className="font-extralight">through</span>{" "}
              <span className="font-bold">smart formulation.</span>
            </h2>
            <p className="mt-5 max-w-[560px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:mt-6 sm:text-sm lg:text-base">
              We exist to make wellness effortless. Every pach+ patch delivers
              precision-dosed botanicals and minerals transdermally &mdash; bypassing
              the gut and going straight to where they&apos;re needed. We pair
              centuries-old plant wisdom with modern delivery science, so your
              daily ritual is one small, considered patch instead of a handful of
              pills.
            </p>

            <div className="mt-8 sm:mt-10">
              <Link
                href="/science"
                className="group flex w-fit items-center gap-0"
                aria-label="Explore the science behind pach+"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-900 text-white transition-transform group-hover:scale-105">
                  <ArrowIcon />
                </span>
                <span className="ml-[-14px] rounded-full bg-teal-900 py-3.5 pl-6 pr-7 text-sm font-medium tracking-[0.08em] text-white transition-colors group-hover:bg-teal-700">
                  Explore the science
                </span>
              </Link>
            </div>
          </div>

          <div className="order-1 overflow-hidden rounded-[28px] lg:order-2">
            <Image
              src="/mission-desktop.jpeg"
              alt="Our mission — athletes wearing pach+ patches"
              width={1024}
              height={576}
              className="hidden w-full object-cover lg:block lg:h-[520px]"
              priority
            />
            <Image
              src="/mission-mobile.jpeg"
              alt="Our mission — athletes wearing pach+ patches"
              width={600}
              height={800}
              className="h-[480px] w-full object-cover lg:hidden"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
