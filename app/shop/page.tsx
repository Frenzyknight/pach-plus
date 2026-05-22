import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import PageMotionProvider from "@/components/motion/PageMotionProvider";

export default function ShopPage() {
  return (
    <PageMotionProvider>
      <div className="min-h-screen bg-background relative">
        <Navbar />
        <div className="pt-24">
          <ShopSection />
        </div>
        <Footer />
      </div>
    </PageMotionProvider>
  );
}
