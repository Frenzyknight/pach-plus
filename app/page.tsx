import Navbar from "@/components/Navbar";
import BannerSection from "@/components/BannerSection";
import HeroSection from "@/components/HeroSection";
import WellnessSection from "@/components/WellnessSection";
import CommunitySection from "@/components/CommunitySection";
import LayerStackSection from "@/components/LayerStackSection";
import PouchGridSection from "@/components/PouchGridSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <BannerSection />
      <HeroSection />
      <WellnessSection />
      <LayerStackSection />
      <CommunitySection />
      <PouchGridSection />
      <Footer />
    </div>
  );
}
