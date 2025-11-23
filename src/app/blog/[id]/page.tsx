import { PublicHeader } from "@/components/layout/public-header";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";

async function getBlog(id: string) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return;
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);

  return {
    title: blog.title,
    description: blog.body.substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.body.substring(0, 160),
      type: "article",
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  const createdDate = new Date();

  return (
    <div className="max-w-4xl mx-auto  py-12 flex flex-col bg-background">
      <PublicHeader />

      <div className="border-b border-border">
        <div className="">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:underline mb-6"
          >
            <ArrowLeft className="size-4" />
            Back to articles
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-6">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="size-4" />
              <span>Author {blog.userId}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4" />
              <span>{createdDate.toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto">
        <p className="text-lg text-muted-foreground">{blog.body}</p>
      </main>
    </div>
  );
}
