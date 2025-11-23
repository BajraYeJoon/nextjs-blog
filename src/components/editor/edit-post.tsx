'use client'

import { usePosts } from '@/hooks/usePosts'
import { PostEditor } from '@/components/editor/post-editor'
import { useRouter } from 'next/navigation'

interface EditPostProps {
  postId: string
}

export function EditPost({ postId }: EditPostProps) {
  const router = useRouter();
  const { posts } = usePosts();
  const post = posts.find((p) => p.id === postId);

  return <PostEditor initialPost={post} mode="edit" />
}
