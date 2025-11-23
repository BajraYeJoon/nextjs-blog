'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePosts } from '@/hooks/usePosts'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Loader2, Plus, Edit, Trash2, AlertCircle, Calendar, Tag } from 'lucide-react'

export function DashboardPostsList() {
  const router = useRouter()
  const { posts, loading, error, deletePost } = usePosts()
  const toast = useToast()
  const [deletingId, setDeletingId] = useState<string | number | null>(null)


  const handleDelete = async (id: string | number) => {
    setDeletingId(id)
    try {
      await deletePost(id)
      toast.success('Post deleted successfully')

    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  return (
    <>
      
      {error && (
        <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 rounded-lg flex items-start gap-3">
          <AlertCircle className="size-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-destructive">Error</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      )}

      
      {loading && posts.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="size-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
          <p className="text-muted-foreground mb-4">Create your first blog post to get started</p>
          <Button className="gap-2" onClick={() => router.push('/posts/new')}>
            <Plus className="size-4" />
            Create Post
          </Button>
        </div>
      ) : (
        <div className="blog-lists grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-foreground">{post.title}</CardTitle>
                    <CardDescription className="mt-2 line-clamp-2">
                      {post.body.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                  {post.category && (
                    <div className="flex items-center gap-1">
                      <Tag className="size-4" />
                      <span className="capitalize">{post.category}</span>
                    </div>
                  )}
                  {post.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="bg-muted/50 border-t border-border flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full gap-2 flex-1" 
                  disabled={deletingId === post.id}
                  onClick={() => router.push(`/posts/${post.id}`, { scroll: false })}
                >
                  <Edit className="size-4" />
                  Edit
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      disabled={deletingId === post.id}
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Post</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{post.title}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(post.id)}
                        disabled={deletingId === post.id}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deletingId === post.id ? (
                          <>
                            <Loader2 className="size-4 animate-spin mr-2" />
                            Deleting...
                          </>
                        ) : (
                          'Delete'
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
