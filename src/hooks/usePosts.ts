import { useState, useCallback, useEffect } from 'react'

export interface BlogPost {
  id: string | number
  title: string
  body: string
  userId: string | number
  category?: string
  image?: string
  excerpt?: string
  createdAt?: string
  updatedAt?: string
}

interface UsePostsState {
  posts: BlogPost[]
  loading: boolean
  error: string | null
}

// Mock in-memory database for blog posts
let mockPosts: BlogPost[] = []

// Load posts from localStorage
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

// Save posts to localStorage
function savePostsToStorage(posts: BlogPost[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('blog_posts', JSON.stringify(posts))
  } catch (error) {
    console.error('Failed to save posts to localStorage:', error)
  }
}

export function usePosts() {
  const [state, setState] = useState<UsePostsState>({
    posts: [],
    loading: false,
    error: null,
  })

  // Initialize posts from localStorage on mount
  useEffect(() => {
    const storedPosts = loadPostsFromStorage()
    mockPosts = storedPosts
    setState((prev) => ({ ...prev, posts: storedPosts }))
  }, [])

  // Fetch all posts
  const fetchPosts = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))
      
      // Load from localStorage
      const storedPosts = loadPostsFromStorage()
      mockPosts = storedPosts

      setState((prev) => ({
        ...prev,
        posts: storedPosts,
        loading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to fetch posts',
        loading: false,
      }))
    }
  }, [])

  // Create new post
  const createPost = useCallback(async (post: Omit<BlogPost, 'id' | 'createdAt'>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newPost: BlogPost = {
        ...post,
        id: `post-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }

      mockPosts.unshift(newPost)
      savePostsToStorage(mockPosts)

      setState((prev) => ({
        ...prev,
        posts: [...mockPosts],
        loading: false,
      }))

      return newPost
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to create post',
        loading: false,
      }))
      throw error
    }
  }, [])

  // Update post
  const updatePost = useCallback(async (id: string | number, updates: Partial<BlogPost>) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const postIndex = mockPosts.findIndex((p) => p.id === id)
      if (postIndex !== -1) {
        mockPosts[postIndex] = {
          ...mockPosts[postIndex],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
      }

      savePostsToStorage(mockPosts)

      setState((prev) => ({
        ...prev,
        posts: [...mockPosts],
        loading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to update post',
        loading: false,
      }))
      throw error
    }
  }, [])

  // Delete post
  const deletePost = useCallback(async (id: string | number) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      await new Promise((resolve) => setTimeout(resolve, 300))

      mockPosts = mockPosts.filter((p) => p.id !== id)
      savePostsToStorage(mockPosts)

      setState((prev) => ({
        ...prev,
        posts: [...mockPosts],
        loading: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to delete post',
        loading: false,
      }))
      throw error
    }
  }, [])

  return {
    posts: state.posts,
    loading: state.loading,
    error: state.error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  }
}
