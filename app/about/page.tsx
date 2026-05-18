import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStatsMission from "@/components/about/AboutStatsMission";
import AboutWhyUs from "@/components/about/AboutWhyUs";
import AboutValues from "@/components/about/AboutValues";
import PouchGridSection from "@/components/PouchGridSection";

export const metadata = {
  title: "About | pach+",
  description:
    "The story, science and values behind pach+ \u2014 plant-powered transdermal patches built for everyday wellness.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <AboutHero />
      <AboutStatsMission />
      <AboutWhyUs />
      <AboutValues />
      <PouchGridSection />
      <Footer />
    </div>
  );
}
