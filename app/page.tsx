import Navbar from "@/components/Navbar";
import BannerSection from "@/components/BannerSection";
import CurvedLoop from "@/components/CurvedLoop";
import HeroProductShowcase from "@/components/HeroProductShowcase";
// import WellnessSection from "@/components/WellnessSection";
import TestimonialReelsSection from "@/components/TestimonialReelsSection";
import CtaBannerSection from "@/components/CtaBannerSection";
import PouchGridSection from "@/components/PouchGridSection";
import Footer from "@/components/Footer";
import PageMotionProvider from "@/components/motion/PageMotionProvider";
import { Reveal } from "@/components/motion/Reveal";

const POUCH_DIAMOND_COLORS = [
  "#896CC4", // Happy Muscles - purple
  "#1E3A8A", // Happy Breathe - blue
  "#BE185D", // Happy Hormones - pink
  "#34D399", // Happy Gut - green
];

export default function Home() {
  return (
    <PageMotionProvider>
      <div className="min-h-screen bg-background relative">
        <Navbar />
        <BannerSection />
        <Reveal
          as="section"
          aria-label="pach+ marquee"
          className="bg-white py-4 sm:py-6 lg:py-8"
          amount={0.2}
        >
          <CurvedLoop
            marqueeText="Please ✦ Always ✦ Choose ✦ Happiness ✦"
            speed={2}
            curveAmount={0}
            accentColors={POUCH_DIAMOND_COLORS}
            className="fill-black"
          />
        </Reveal>
        <HeroProductShowcase />
        {/* <WellnessSection /> */}
        <TestimonialReelsSection />
        <CtaBannerSection />
        <PouchGridSection />
        <Footer />
      </div>
    </PageMotionProvider>
  );
}
