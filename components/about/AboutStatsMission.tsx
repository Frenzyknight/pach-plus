import Link from "next/link";

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

interface ChartBar {
  label: string;
  height: number;
  color: string;
}

const CHART_BARS: ChartBar[] = [
  { label: "Recovery", height: 82, color: "var(--color-teal-700)" },
  { label: "Breathe", height: 64, color: "var(--color-gold-500)" },
  { label: "Balance", height: 91, color: "var(--color-purple-500)" },
  { label: "Nourish", height: 75, color: "var(--color-pink-500)" },
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
          <div>
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-teal-800/60 sm:mb-4 sm:text-xs">
              Our mission
            </p>
            <h2 className="text-[1.9rem] font-black leading-[0.95] tracking-[-0.055em] text-slate-900 xs:text-[2.35rem] sm:text-5xl lg:text-[clamp(2.5rem,3.4vw,3.5rem)]">
              Driving wellness through smart formulation.
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

          <div className="rounded-[28px] bg-[#F4F2EE] p-7 lg:p-10">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-foreground/55 sm:text-xs">
                Bioavailability index
              </p>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/55">
                Relative %
              </p>
            </div>

            <div className="mt-8 flex h-56 items-end gap-4 sm:h-64 lg:h-72">
              {CHART_BARS.map((bar) => (
                <div
                  key={bar.label}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <span className="text-[10px] font-black tracking-[-0.01em] text-slate-900 sm:text-xs">
                    {bar.height}
                  </span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${bar.height}%`,
                      backgroundColor: bar.color,
                    }}
                    aria-hidden="true"
                  />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/70 sm:text-[11px]">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-foreground/10 pt-5 text-[10px] font-medium uppercase tracking-[0.18em] text-foreground/55 sm:text-[11px]">
              <span className="text-foreground/80">Patch line</span>
              {CHART_BARS.map((bar) => (
                <span key={bar.label} className="flex items-center gap-2">
                  <span
                    className="block h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: bar.color }}
                  />
                  {bar.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
