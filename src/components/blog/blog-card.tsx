import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export interface BlogCardProps {
  id: number
  title: string
  excerpt: string
  category?: string
  author?: {
    name: string
    avatar?: string
  }
  image?: string
  readTime?: number
  createdAt?: string
}

export function BlogCard({
  id,
  title,
  excerpt,
  category,
  author,
  image,
  readTime = 5,
  createdAt,
}: BlogCardProps) {
  return (
    <Link href={`/blog/${id}`}>
      <Card className="group h-full overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer hover:shadow-lg">
        {/* Image Container */}
        {image && (
          <div className="relative w-full h-48 overflow-hidden bg-muted -m-6 mx-auto mb-0">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        {/* Card Header */}
        <CardHeader className="space-y-2">
          {/* Category Badge */}
          {category && (
            <div className="flex gap-2">
              <span className="text-xs font-medium px-3 py-1 rounded-full border border-primary text-primary bg-primary/5 w-fit">
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-lg">
            {title}
          </CardTitle>

          {/* Excerpt */}
          <CardDescription className="line-clamp-2 text-sm">
            {excerpt}
          </CardDescription>
        </CardHeader>

        {/* Card Footer with Meta Info */}
        <CardFooter className="flex items-center justify-between border-t border-border pt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-primary">
                {author?.name?.[0] || 'A'}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {author?.name || 'Author'}
            </span>
          </div>
          {readTime && (
            <span className="text-xs text-muted-foreground">
              {readTime} min read
            </span>
          )}
        </CardFooter>

        {/* Read More Link */}
        <CardContent className="pt-2">
          <div className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
            Read Article <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
