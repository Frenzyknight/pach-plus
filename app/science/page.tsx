import Navbar from "@/components/Navbar";
import LayerStackSection from "@/components/LayerStackSection";
import HerbalIndexHero from "@/components/HerbalIndexHero";
import HerbalIndexGrid from "@/components/HerbalIndexGrid";
import Footer from "@/components/Footer";
import ScienceHero from "@/components/science/ScienceHero";
import BioavailabilitySection from "@/components/science/BioavailabilitySection";
import PageMotionProvider from "@/components/motion/PageMotionProvider";

export const metadata = {
  title: "Herbal Index | pach+",
  description:
    "The hero ingredients behind every pach+ patch \u2014 plants, minerals and adaptogens, precision-dosed and delivered transdermally.",
};

export default function SciencePage() {
  return (
    <PageMotionProvider>
      <div className="min-h-screen bg-background relative">
        <Navbar />
        <ScienceHero />
        <BioavailabilitySection />
        <LayerStackSection />
        <HerbalIndexHero />
        <HerbalIndexGrid />
        <Footer />
      </div>
    </PageMotionProvider>
  );
}
