import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogsList from "@/components/blogs/BlogsList";
import PageMotionProvider from "@/components/motion/PageMotionProvider";

export const metadata = {
  title: "Blogs | pach+",
  description:
    "Ingredient deep-dives, ritual ideas, and behind-the-scenes notes on the science of plant-based patches.",
};

export default function BlogsPage() {
  return (
    <PageMotionProvider>
      <div className="relative min-h-screen bg-background">
        <Navbar />
        <BlogsList />
        <Footer />
      </div>
    </PageMotionProvider>
  );
}
