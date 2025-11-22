import Image from 'next/image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import type { BlogCardProps } from '@/components/blog/blog-grid'

interface FeaturedSectionProps {
  blogs: BlogCardProps[]
}

export function FeaturedSection({ blogs }: FeaturedSectionProps) {
  if (blogs.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          Featured Stories
        </h2>
        <p className="text-muted-foreground">
          Check out our latest featured articles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card className="group relative overflow-hidden h-80 bg-muted cursor-pointer hover:shadow-lg hover:border-primary transition-all duration-300">
              {/* Background Image */}
              {blog.image && (
                <div className="relative size-full mx-auto">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                {blog.category && (
                  <span className="text-xs font-semibold uppercase tracking-wider mb-2 opacity-90">
                    {blog.category}
                  </span>
                )}
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-200 line-clamp-1">
                  {blog.excerpt}
                </p>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
