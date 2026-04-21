import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WellnessSection from "@/components/WellnessSection";
import CommunitySection from "@/components/CommunitySection";
import PouchShowcaseSection from "@/components/PouchShowcaseSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <HeroSection />
      <WellnessSection />
      <PouchShowcaseSection />
      <CommunitySection />
      <Footer />
    </div>
  );
}
