import Image from "next/image";

export default function AboutHero() {
  return (
    <section className="bg-white px-6 pt-24 sm:pt-28 lg:px-10 lg:pt-32">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:aspect-21/9">
        <Image
          src="/about-hero.jpeg"
          alt="The pach+ team collaborating on plant-powered transdermal patches."
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
