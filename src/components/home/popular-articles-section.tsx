import { BlogGrid, type BlogCardProps } from '@/components/blog/blog-grid'

interface PopularArticlesSectionProps {
  blogs: BlogCardProps[]
}

export function PopularArticlesSection({ blogs }: PopularArticlesSectionProps) {
  if (blogs.length === 0) return null

  return (
    <div className="max-w-7xl mx-auto">
      <BlogGrid
        blogs={blogs}
        title="Our most popular articles"
        description="Discover our most read and recommended blog posts from our community of writers."
        columns={3}
      />
    </div>
  )
}
