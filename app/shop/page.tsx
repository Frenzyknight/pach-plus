import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />
      <div className="pt-24">
        <ShopSection />
      </div>
    </div>
  );
}
