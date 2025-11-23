"use client";

import { usePostsStore } from "@/lib/posts-store";
import { PostEditor } from "@/components/editor/post-editor";

interface EditPostProps {
  postId: string;
}

export function EditPost({ postId }: EditPostProps) {
  const posts = usePostsStore((state) => state.posts);
  const post = posts.find((p) => p.id.toString() === postId);

  return <PostEditor initialPost={post} mode="edit" />;
}
