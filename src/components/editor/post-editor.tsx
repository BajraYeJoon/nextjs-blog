'use client'

import { useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import { usePosts } from '@/hooks/usePosts'
import { useToast } from '@/hooks/useToast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { createPostSchema } from '@/schemas/blog'
import { Loader2, ArrowLeft } from 'lucide-react'
import type { BlogPost } from '@/types/blog'
import type { CreatePostInput } from '@/schemas/blog'

interface PostEditorProps {
  initialPost?: BlogPost | null
  mode?: 'create' | 'edit'
}

export function PostEditor({ initialPost, mode = 'create' }: PostEditorProps) {
  const router = useRouter()
  const toast = useToast()
  const { createPost, updatePost, loading } = usePosts()

  const isEditMode = mode === 'edit' && !!initialPost

  const form = useForm<CreatePostInput>({
    resolver: yupResolver(createPostSchema),
    defaultValues: {
      title: '',
      category: '',
      body: '',
    },
  })

  const { watch, control, setValue } = form

  useEffect(() => {
    if (isEditMode && initialPost) {
      setValue('title', initialPost.title)
      setValue('category', initialPost.category || '')
      setValue('body', initialPost.body)
    }
  }, [initialPost, isEditMode, setValue])

  const bodyValue = watch('body')

  const onSubmit = async (data: CreatePostInput) => {
    try {
      if (isEditMode) {
        // Edit
        await updatePost(initialPost.id, {
          title: data.title,
          body: data.body,
          category: data.category,
        })
        toast.success('Post updated successfully!')
      } else {
        await createPost({
          title: data.title,
          body: data.body,
          category: data.category,
          userId: 'current-user',
        })
        toast.success('Post created successfully!')
      }

      router.push('/dashboard')
    } catch (error) {
      const errorMessage = isEditMode ? 'Failed to update post' : 'Failed to create post'
      toast.error(`${errorMessage}. Please try again.`)
    }
  }

  const pageTitle = isEditMode ? 'Edit Post' : 'Create New Post'
  const pageSubtitle = isEditMode ? 'Update your post content' : 'Share your thoughts with the world'
  const submitButtonText = isEditMode ? 'Save Changes' : 'Create Post'
  const submittingText = isEditMode ? 'Saving...' : 'Creating...'

  return (
    <div className="blog-editor-main bg-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">{pageTitle}</h1>
            <p className="text-muted-foreground">{pageSubtitle}</p>
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

        
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
             
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

              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={loading}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="lifestyle">Lifestyle</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="health">Health</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

             
              <FormField
                control={control}
                name="body"
                render={({ fieldState: { error } }) => (
                  <FormItem>
                    <FormLabel>Post Content</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={bodyValue}
                        onChange={(content) => setValue('body', content)}
                        placeholder="Write your post here..."
                      />
                    </FormControl>
                    {error && <FormMessage>{error.message}</FormMessage>}
                  </FormItem>
                )}
              />

             
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
                      {submittingText}
                    </>
                  ) : (
                    submitButtonText
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
