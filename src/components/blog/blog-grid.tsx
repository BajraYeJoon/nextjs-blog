import { BlogCard, type BlogCardProps } from './blog-card'

export type { BlogCardProps }

interface BlogGridProps {
  blogs: BlogCardProps[]
  columns?: 2 | 3 | 4
  title?: string
  description?: string
}

export function BlogGrid({
  blogs,
  columns = 3,
  title,
  description,
}: BlogGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No blogs found</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Grid */}
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
    </div>
  )
}
