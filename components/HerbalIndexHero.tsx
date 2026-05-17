export default function HerbalIndexHero() {
  return (
    <section className="bg-white px-5 pb-12 pt-28 xs:px-6 sm:pb-16 sm:pt-32 lg:px-10 lg:pt-36 lg:pb-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-teal-800/60 sm:mb-4 sm:text-xs">
          Hero Ingredients
        </p>
        <h1 className="max-w-[1100px] text-[1.9rem] font-black leading-[0.95] tracking-[-0.055em] text-slate-900 xs:text-[2.35rem] sm:text-5xl lg:text-[clamp(2.75rem,3.8vw,3.75rem)] xl:text-6xl">
          A whole world of plants, minerals and adaptogens that work better,
          together.
        </h1>
        <p className="mt-5 max-w-[640px] text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:mt-7 sm:text-sm lg:text-base">
          Every pach+ patch is built around a small, considered set of hero
          ingredients. No filler, no fluff &mdash; just precision-dosed botanicals
          and minerals delivered transdermally, exactly where you need them.
        </p>
      </div>
    </section>
  );
}
