import { useEffect } from "react";
import { usePostsStore } from "@/lib/posts-store";

export function usePosts(page: number = 1, limit: number = 10) {
  const posts = usePostsStore((state) => state.posts);
  const totalPosts = usePostsStore((state) => state.totalPosts);
  const loading = usePostsStore((state) => state.loading);
  const error = usePostsStore((state) => state.error);
  const fetchPosts = usePostsStore((state) => state.fetchPosts);
  const createPost = usePostsStore((state) => state.createPost);
  const updatePost = usePostsStore((state) => state.updatePost);
  const deletePost = usePostsStore((state) => state.deletePost);

  useEffect(() => {
    fetchPosts(page, limit);
  }, [page, limit, fetchPosts]);

  return {
    posts,
    totalPosts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  };
}
