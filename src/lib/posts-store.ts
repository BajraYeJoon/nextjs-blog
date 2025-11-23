import { BlogPost } from "@/types/blog";
import { create } from "zustand";

interface PostsStore {
  posts: BlogPost[];
  localPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  totalPosts: number;
  fetchPosts: (page: number, limit: number) => Promise<void>;
  createPost: (post: Omit<BlogPost, "id" | "createdAt">) => Promise<BlogPost>;
  updatePost: (
    id: string | number,
    updates: Partial<BlogPost>,
  ) => Promise<void>;
  deletePost: (id: string | number) => Promise<void>;
}

const API_BASE = "https://jsonplaceholder.typicode.com";
const CACHE_DURATION = 21600; // 6 hours

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  localPosts: [],
  loading: false,
  error: null,
  totalPosts: 0,

  fetchPosts: async (page: number = 1, limit: number = 10) => {
    set({ loading: true, error: null });
    try {
      const start = (page - 1) * limit;
      const response = await fetch(
        `${API_BASE}/posts?_start=${start}&_limit=${limit}`,
        {
          next: { revalidate: CACHE_DURATION },
        },
      );
      if (!response.ok) throw new Error("Failed to fetch posts");
      const apiPosts = await response.json();

      const totalCount = response.headers.get("x-total-count");

      const posts: BlogPost[] = apiPosts.map((post: BlogPost) => ({
        id: post.id,
        title: post.title,
        body: post.body,
        userId: post.userId.toString(),
        category: "general",
        createdAt: new Date().toISOString(),
      }));

      set((state) => ({
        posts: [...state.localPosts, ...posts],
        totalPosts: totalCount ? parseInt(totalCount) : 100,
        loading: false,
      }));
    } catch (error) {
      console.log(error);
      set({
        error: "Failed to fetch posts",
        loading: false,
      });
    }
  },

  createPost: async (post) => {
    set((state) => ({ ...state, loading: true, error: null }));
    try {
      const randomId = Date.now();
      const newPost: BlogPost = {
        ...post,
        id: `local-${randomId}`,
        image: `https://picsum.photos/seed/${randomId}/600/300`,
        createdAt: new Date().toISOString(),
      };

      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });

      set((state) => ({
        localPosts: [newPost, ...state.localPosts],
        posts: [newPost, ...state.posts],
        loading: false,
      }));

      return newPost;
    } catch (error) {
      set({
        error: "Failed to create post",
        loading: false,
      });
      throw error;
    }
  },

  updatePost: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
        next: { revalidate: 0 },
      });

      if (!response.ok) throw new Error("Failed to update post");

      set((state) => {
        const updatedPosts = state.posts.map((p) =>
          p.id.toString() === id.toString()
            ? { ...p, ...updates, updatedAt: new Date().toISOString() }
            : p,
        );
        const updatedLocalPosts = state.localPosts.map((p) =>
          p.id.toString() === id.toString()
            ? { ...p, ...updates, updatedAt: new Date().toISOString() }
            : p,
        );
        return {
          posts: updatedPosts,
          localPosts: updatedLocalPosts,
          loading: false,
        };
      });
    } catch (error) {
      set({
        error: "Failed to update post",
        loading: false,
      });
      throw error;
    }
  },

  deletePost: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: "DELETE",
        next: { revalidate: 0 },
      });

      if (!response.ok) throw new Error("Failed to delete post");

      set((state) => ({
        posts: state.posts.filter((p) => p.id.toString() !== id.toString()),
        localPosts: state.localPosts.filter(
          (p) => p.id.toString() !== id.toString(),
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: "Failed to delete post",
        loading: false,
      });
      throw error;
    }
  },
}));
