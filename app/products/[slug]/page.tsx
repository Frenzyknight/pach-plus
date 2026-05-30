import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/product-detail/ProductDetailPage";
import { getMergedProduct } from "@/lib/products-server";
import { PRODUCT_CONTENT } from "@/lib/content/products";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return PRODUCT_CONTENT.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getMergedProduct(slug);

  if (!product) {
    return {
      title: "Product not found | pach+",
    };
  }

  return {
    title: `${product.name} | pach+`,
    description: product.heroDescription,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getMergedProduct(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}
