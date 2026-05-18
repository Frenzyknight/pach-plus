import Image from "next/image";

export default function AboutValues() {
  return (
    <section className="bg-white px-5 py-20 xs:px-6 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <p className="mb-3 text-[10px] font-black uppercase tracking-[0.24em] text-teal-800/60 sm:mb-4 sm:text-xs">
            Our value
          </p>
          <h2 className="mx-auto max-w-[820px] text-[1.9rem] font-black leading-[0.95] tracking-[-0.055em] text-slate-900 xs:text-[2.35rem] sm:text-5xl lg:text-[clamp(2.5rem,3.4vw,3.5rem)]">
            Our commitment to values-driven wellness.
          </h2>
        </div>

        <div className="relative mt-10 aspect-4/3 w-full overflow-hidden rounded-2xl sm:mt-12 sm:rounded-3xl lg:aspect-[2.2/1]">
          <Image
            src="/about-section.jpeg"
            alt="Two pach+ customers sharing a patch in a plant-filled apothecary."
            fill
            sizes="(min-width: 1400px) 1400px, 100vw"
            className="object-cover object-center"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-14">
          <p className="text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm lg:text-base">
            Our values shape every formulation decision we make. We prioritise
            integrity &mdash; sourcing botanicals from growers we know by name,
            publishing our doses, and pricing patches honestly. Transparency
            isn&apos;t a campaign for us; it&apos;s a quiet, daily practice that
            you&apos;ll feel in the product long before you read about it.
          </p>
          <p className="text-[11px] font-medium leading-relaxed text-foreground/68 xs:text-xs sm:text-sm lg:text-base">
            We pair that honesty with innovation. Clinical-grade actives,
            transdermal delivery research and an obsession with long-term
            wellness outcomes mean each patch is engineered to do real work over
            time &mdash; not just deliver a quick hit. The goal is simple: a
            routine you&apos;ll actually keep, that keeps giving back.
          </p>
        </div>
      </div>
    </section>
  );
}
