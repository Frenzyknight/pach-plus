import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";
import PageMotionProvider from "@/components/motion/PageMotionProvider";
import { getMergedProducts } from "@/lib/products-server";

export default async function ShopPage() {
  const products = await getMergedProducts();

  return (
    <PageMotionProvider>
      <div className="min-h-screen bg-background relative">
        <Navbar />
        <div className="pt-24">
          <ShopSection products={products} />
        </div>
        <Footer />
      </div>
    </PageMotionProvider>
  );
}
