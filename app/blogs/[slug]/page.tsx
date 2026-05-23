import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailView from "@/components/blogs/BlogDetailView";
import { BLOGS, getBlogBySlug } from "@/lib/blogs";

type BlogPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog not found | pach+",
    };
  }

  return {
    title: `${blog.title} | pach+`,
    description: blog.excerpt,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogDetailView blog={blog} />;
}
