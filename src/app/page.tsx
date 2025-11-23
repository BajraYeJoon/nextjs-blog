import { PublicHeader } from "@/components/layout/public-header";
import { FeaturedSection } from "@/components/home/featured-section";
import { PopularArticlesSection } from "@/components/home/popular-articles-section";
import type { BlogCardProps } from "@/components/blog/blog-grid";
import { BlogPost } from "@/types/blog";

function transformJSONPlaceholderPosts(posts: BlogPost[]): BlogCardProps[] {
  return posts.map((post: BlogPost, index: number) => ({
    id: Number(post.id),
    title: post.title,
    excerpt: post.body.substring(0, 100) + "...",
    body: post.body,
    category: ["BUSINESS", "TECHNOLOGY", "LIFESTYLE", "MARKETING"][index % 4],
    author: {
      name: `Author ${post.userId}`,
    },
    image: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1761839257946-4616bcfafec7?w=600&h=300&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=300&fit=crop",
    ][index % 4],
    createdAt: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  }));
}

async function getBlogs(): Promise<BlogCardProps[]> {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=12",
      {
        cache: "no-store",
      },
    );
    const data = await response.json();
    return transformJSONPlaceholderPosts(data);
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

async function getLocalPosts(): Promise<BlogCardProps[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/posts`, {
      cache: "no-store",
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.map((post: BlogPost) => ({
      id: Number(post.id),
      title: post.title,
      excerpt: post.body.substring(0, 100) + "...",
      body: post.body,
      category: post.category?.toUpperCase() || "GENERAL",
      author: { name: `Author ${post.userId}` },
      image: post.image || "https://picsum.photos/600/300",
      createdAt: post.createdAt,
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const [apiBlogs, localBlogs] = await Promise.all([
    getBlogs(),
    getLocalPosts(),
  ]);
  const blogs = [...localBlogs, ...apiBlogs];
  const featuredBlogs = blogs.slice(0, 2);
  const popularBlogs = blogs.slice(0, 6);

  return (
    <div className="main-container max-w-5xl px-4 sm:px-6 lg:px-8 py-4 mx-auto flex flex-col bg-background">
      <PublicHeader />

      <main className="flex-1 space-y-16">
        <FeaturedSection blogs={featuredBlogs} />
        <PopularArticlesSection blogs={popularBlogs} />
      </main>
    </div>
  );
}
