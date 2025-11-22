'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import { usePosts, BlogPost } from '@/hooks/usePosts'
import { useToast } from '@/hooks/useToast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Loader2, ArrowLeft } from 'lucide-react'

const editPostSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  category: yup.string().required('Category is required'),
})

interface EditPostForm {
  title: string
  category: string
}

export default function EditPostPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id
  const toast = useToast()
  const { posts, updatePost, loading } = usePosts()
  const [content, setContent] = useState('')
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loadingPost, setLoadingPost] = useState(true)

  const form = useForm<EditPostForm>({
    resolver: yupResolver(editPostSchema),
    defaultValues: {
      title: '',
      category: '',
    },
  })

  // Find and load the post
  useEffect(() => {
    const foundPost = posts.find((p) => p.id === postId)
    if (foundPost) {
      setPost(foundPost)
      setContent(foundPost.body)
      form.reset({
        title: foundPost.title,
        category: foundPost.category || '',
      })
      setLoadingPost(false)
    }
  }, [posts, postId, form])

  const onSubmit = async (data: EditPostForm) => {
    if (!post) return

    if (!content.trim()) {
      toast.error('Please add content to your post')
      return
    }

    try {
      await updatePost(post.id, {
        title: data.title,
        body: content,
        category: data.category,
      })

      toast.success('Post updated successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to update post. Please try again.')
    }
  }

  if (loadingPost) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Post Not Found</h1>
          <p className="text-muted-foreground mb-4">The post you're looking for doesn't exist.</p>
          <Button onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Edit Post</h1>
            <p className="text-muted-foreground">Update your post content</p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter post title..."
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Field */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        disabled={loading}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="">Select a category</option>
                        <option value="technology">Technology</option>
                        <option value="lifestyle">Lifestyle</option>
                        <option value="business">Business</option>
                        <option value="health">Health</option>
                        <option value="education">Education</option>
                        <option value="entertainment">Entertainment</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rich Text Editor */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Post Content
                </label>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Write your post here..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 justify-end pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
