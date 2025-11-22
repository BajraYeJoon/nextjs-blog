'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePosts } from '@/hooks/usePosts'
import { useToast } from '@/hooks/useToast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, Edit, Trash2, AlertCircle, Calendar, Tag } from 'lucide-react'

export function DashboardPostsList() {
  const { posts, loading, error, deletePost } = usePosts()
  const toast = useToast()
  const [deletingId, setDeletingId] = useState<string | number | null>(null)
  const [confirmDelete, setConfirmDelete] = useState<string | number | null>(null)

  const handleDelete = async (id: string | number) => {
    setDeletingId(id)
    try {
      await deletePost(id)
      toast.success('Post deleted successfully')
      setConfirmDelete(null)
    } catch (error) {
      toast.error('Failed to delete post')
    } finally {
      setDeletingId(null)
    }
  }

  // Filter only user posts (exclude JSONPlaceholder posts)
  const userPosts = posts.filter((p) => p.id.toString().startsWith('post-'))

  return (
    <>
      {/* Error State */}
      {error && (
        <div className="mb-6 p-4 border border-destructive/50 bg-destructive/10 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-destructive">Error</p>
            <p className="text-sm text-destructive/80">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && userPosts.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        </div>
      ) : userPosts.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-border rounded-lg">
          <h3 className="text-lg font-medium text-foreground mb-2">No posts yet</h3>
          <p className="text-muted-foreground mb-4">Create your first blog post to get started</p>
          <Link href="/posts/create">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Post
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {userPosts.map((post) => (
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
                      <Tag className="w-4 h-4" />
                      <span className="capitalize">{post.category}</span>
                    </div>
                  )}
                  {post.createdAt && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="bg-muted/50 border-t border-border flex gap-2">
                <Link href={`/posts/${post.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2" disabled={deletingId === post.id}>
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </Link>

                {confirmDelete === post.id ? (
                  <div className="flex gap-2 flex-1">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      disabled={deletingId === post.id}
                      className="flex-1 gap-2"
                    >
                      {deletingId === post.id ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Confirm
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setConfirmDelete(null)}
                      disabled={deletingId === post.id}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    onClick={() => setConfirmDelete(post.id)}
                    disabled={deletingId === post.id}
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
