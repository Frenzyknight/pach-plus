import Image from "next/image";
import Navbar from "@/components/Navbar";
import HerbalIndexHero from "@/components/HerbalIndexHero";
import HerbalIndexGrid from "@/components/HerbalIndexGrid";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Herbal Index | pach+",
  description:
    "The hero ingredients behind every pach+ patch \u2014 plants, minerals and adaptogens, precision-dosed and delivered transdermally.",
};

export default function SciencePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <section className="bg-white px-6 pt-24 sm:pt-28 lg:px-10 lg:pt-32">
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl lg:aspect-21/9">
          <Image
            src="/science.jpeg"
            alt="A split visual: microscopic view of plant-derived actives meets a satellite view of clouds — the science behind pach+."
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
        </div>
      </section>
      <HerbalIndexHero />
      <HerbalIndexGrid />
      <Footer />
    </div>
  );
}
