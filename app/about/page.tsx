import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import AboutStatsMission from "@/components/about/AboutStatsMission";
import AboutWhyUs from "@/components/about/AboutWhyUs";
import AboutValues from "@/components/about/AboutValues";
import AboutFaq from "@/components/about/AboutFaq";
import AboutContactForm from "@/components/about/AboutContactForm";
import PouchGridSection from "@/components/PouchGridSection";
import PageMotionProvider from "@/components/motion/PageMotionProvider";

export const metadata = {
  title: "About | pach+",
  description:
    "The story, science and values behind pach+ \u2014 plant-based transdermal patches built for everyday wellness.",
};

export default function AboutPage() {
  return (
    <PageMotionProvider>
      <div className="min-h-screen bg-background relative">
        <Navbar />
        <AboutHero />
        <AboutStatsMission />
        <AboutWhyUs />
        <AboutValues />
        <AboutFaq />
        <AboutContactForm />
        <PouchGridSection />
        <Footer />
      </div>
    </PageMotionProvider>
  );
}
