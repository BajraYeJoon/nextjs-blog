'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { PublicHeader } from '@/components/layout/public-header'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  body: string
  userId: number
}

export default function BlogDetailPage() {
  const params = useParams()
  const blogId = params.id as string
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`)
        if (!response.ok) throw new Error('Blog not found')
        const data = await response.json()
        setBlog(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load blog')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [blogId])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <PublicHeader />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading blog...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <PublicHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold text-foreground mb-4">Oops!</h1>
            <p className="text-muted-foreground mb-6">{error || 'Blog not found'}</p>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const readTime = Math.ceil(blog.body.split(' ').length / 200)
  const createdDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicHeader />

      {/* Hero/Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to articles
          </Link>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Author {blog.userId}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{createdDate.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-invert max-w-none">
            {blog.body.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-lg text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Author Card */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-semibold text-primary">
                  A{blog.userId}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Author {blog.userId}</h3>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link href="/">
              <Button size="lg" className="w-full sm:w-auto">
                Back to all articles
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
