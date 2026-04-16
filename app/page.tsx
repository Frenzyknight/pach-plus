import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WellnessSection from "@/components/WellnessSection";
import ShopSection from "@/components/ShopSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <WellnessSection />
      <ShopSection />
    </div>
  );
}
