import Navbar from "@/components/Navbar";
import BannerSection from "@/components/BannerSection";
import HeroSection from "@/components/HeroSection";
// import WellnessSection from "@/components/WellnessSection";
import LayerStackSection from "@/components/LayerStackSection";
import CtaBannerSection from "@/components/CtaBannerSection";
import PouchGridSection from "@/components/PouchGridSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <BannerSection />
      <HeroSection />
      {/* <WellnessSection /> */}
      <LayerStackSection />
      <CtaBannerSection />
      <PouchGridSection />
      <Footer />
    </div>
  );
}
