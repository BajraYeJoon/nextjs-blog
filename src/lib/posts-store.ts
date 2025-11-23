import { BlogPost } from '@/types/blog'
import { create } from 'zustand'


interface PostsStore {
  posts: BlogPost[]
  loading: boolean
  error: string | null
  fetchPosts: () => Promise<void>
  createPost: (post: Omit<BlogPost, 'id' | 'createdAt'>) => Promise<BlogPost>
  updatePost: (id: string | number, updates: Partial<BlogPost>) => Promise<void>
  deletePost: (id: string | number) => Promise<void>
}

// get posts from localStorage
function loadPostsFromStorage(): BlogPost[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem('blog_posts')
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load posts from localStorage:', error)
    return []
  }
}

// save posts to localStorage
function savePostsToStorage(posts: BlogPost[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('blog_posts', JSON.stringify(posts))
  } catch (error) {
    console.error('Failed to save posts to localStorage:', error)
  }
}

export const usePostsStore = create<PostsStore>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null })
    try {
      const storedPosts = loadPostsFromStorage()
      set({ posts: storedPosts, loading: false })
    } catch (error) {
      set({
        error: 'Failed to fetch posts',
        loading: false,
      })
    }
  },

  createPost: async (post) => {
    set((state) => ({ ...state, loading: true, error: null }))
    try {
      const newPost: BlogPost = {
        ...post,
        id: `post-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }

      set((state) => {
        const updatedPosts = [newPost, ...state.posts]
        savePostsToStorage(updatedPosts)
        return { posts: updatedPosts, loading: false }
      })

      return newPost
    } catch (error) {
      set({
        error: 'Failed to create post',
        loading: false,
      })
      throw error
    }
  },

  updatePost: async (id, updates) => {
    set({ loading: true, error: null })
    try {
      set((state) => {
        const updatedPosts = state.posts.map((p) =>
          p.id === id
            ? {
                ...p,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : p
        )
        savePostsToStorage(updatedPosts)
        return { posts: updatedPosts, loading: false }
      })
    } catch (error) {
      set({
        error: 'Failed to update post',
        loading: false,
      })
      throw error
    }
  },

  deletePost: async (id) => {
    set({ loading: true, error: null })
    try {
      set((state) => {
        const updatedPosts = state.posts.filter((p) => p.id !== id)
        savePostsToStorage(updatedPosts)
        return { posts: updatedPosts, loading: false }
      })
    } catch (error) {
      set({
        error: 'Failed to delete post',
        loading: false,
      })
      throw error
    }
  },
}))
