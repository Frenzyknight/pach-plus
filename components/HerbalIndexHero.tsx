export default function HerbalIndexHero() {
  return (
    <section className="bg-white px-5 pb-12 pt-10 xs:px-6 sm:pb-16 lg:px-10 lg:pb-20">
      <div className="mx-auto max-w-[1400px]">
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.25em] text-foreground/60 sm:mb-4">
          Hero Ingredients
        </p>
        <h1
          className="max-w-[1100px] leading-[1.05] tracking-[-0.03em] text-foreground"
          style={{ fontSize: "clamp(2rem, 5.2vw, 3.75rem)" }}
        >
          <span className="font-bold">A whole world of</span>{" "}
          <span className="font-extralight">plants, minerals and adaptogens</span>{" "}
          <span className="font-bold">that work better, together.</span>
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
