import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WellnessSection from "@/components/WellnessSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <WellnessSection />
    </div>
  );
}
