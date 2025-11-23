import { useEffect } from 'react'
import { usePostsStore } from '@/lib/posts-store'

export function usePosts() {
  const posts = usePostsStore((state) => state.posts)
  const loading = usePostsStore((state) => state.loading)
  const error = usePostsStore((state) => state.error)
  const fetchPosts = usePostsStore((state) => state.fetchPosts)
  const createPost = usePostsStore((state) => state.createPost)
  const updatePost = usePostsStore((state) => state.updatePost)
  const deletePost = usePostsStore((state) => state.deletePost)

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
  }
}
