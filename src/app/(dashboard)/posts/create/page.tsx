'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { usePosts } from '@/hooks/usePosts'
import { useToast } from '@/hooks/useToast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Loader2, ArrowLeft } from 'lucide-react'

const createPostSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  category: yup.string().required('Category is required'),
})

interface CreatePostForm {
  title: string
  category: string
}

export default function CreatePostPage() {
  const router = useRouter()
  const toast = useToast()
  const { createPost, loading } = usePosts()
  const [content, setContent] = useState('')

  const form = useForm<CreatePostForm>({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: '',
      category: '',
    },
  })

  const onSubmit = async (data: CreatePostForm) => {
    if (!content.trim()) {
      toast.error('Please add content to your post')
      return
    }

    try {
      await createPost({
        title: data.title,
        body: content,
        category: data.category,
        userId: 'current-user',
      })

      toast.success('Post created successfully!')
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to create post. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Create New Post</h1>
            <p className="text-muted-foreground">Share your thoughts with the world</p>
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
                      Creating...
                    </>
                  ) : (
                    'Create Post'
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
