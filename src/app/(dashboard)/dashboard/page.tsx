import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DashboardPostsList } from "@/components/dashboard/dashboard-posts-list";
import DashboardLayout from "@/components/layout/dashboard-layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">My Posts</h1>
          <p className="text-muted-foreground">Manage your blog posts</p>
        </div>
        <Link href="/posts/create">
          <Button className="gap-2">
            <Plus className="size-4" />
            New Post
          </Button>
        </Link>
      </div>

      <DashboardPostsList />
    </DashboardLayout>
  );
}
