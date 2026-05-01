import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Product } from "@/lib/products";
import ProductFaqRelated from "./ProductFaqRelated";
import ProductHero from "./ProductHero";
import ProductIngredients from "./ProductIngredients";
import ProductLayerComparison from "./ProductLayerComparison";
import ProductStatsAccordion from "./ProductStatsAccordion";
import ProductTestimonials from "./ProductTestimonials";

export default function ProductDetailPage({ product }: { product: Product }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />
      <main className="pt-24">
        <ProductHero product={product} />
        <ProductStatsAccordion product={product} />
        <ProductLayerComparison product={product} />
        <ProductTestimonials product={product} />
        <ProductIngredients product={product} />
        <ProductFaqRelated product={product} />
      </main>
      <Footer />
    </div>
  );
}
