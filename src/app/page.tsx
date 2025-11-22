import { PublicHeader } from '@/components/layout/public-header'
import { FeaturedSection } from '@/components/home/featured-section'
import { PopularArticlesSection } from '@/components/home/popular-articles-section'
import type { BlogCardProps } from '@/components/blog/blog-grid'

// dummy blogs fetch from jsonplaceholder
async function getBlogs(): Promise<BlogCardProps[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=12', {
      cache: 'no-store'
    })
    const data = await response.json()
    
    //to transformt the dummy api to our format.
    return data.map((post: any, index: number) => ({
      id: post.id,
      title: post.title,
      excerpt: post.body.substring(0, 100) + '...',
      body: post.body,
      category: ['BUSINESS', 'TECHNOLOGY', 'LIFESTYLE', 'MARKETING'][index % 4],
      author: {
        name: `Author ${post.userId}`,
      },
      image: [
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=300&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=300&fit=crop',
        'https://images.unsplash.com/photo-1761839257946-4616bcfafec7?w=600&h=300&fit=crop',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=300&fit=crop',
      ][index % 4],
      readTime: 5 + (index % 5),
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    }))
  } catch (error) {
    console.error('Failed to fetch blogs:', error)
    return []
  }
}

export default async function HomePage() {
  const blogs = await getBlogs()
  const featuredBlogs = blogs.slice(0, 2)
  const popularBlogs = blogs.slice(0, 6)

  return (
    <div className="main-container flex flex-col bg-background">
      <PublicHeader />
      
      <main className="flex-1 space-y-16 px-4 sm:px-6 lg:px-8 py-12">
        

        {/* Featured */}
        <FeaturedSection blogs={featuredBlogs} />

        {/* Popular Article */}
        <PopularArticlesSection blogs={popularBlogs} />
      </main>
    </div>
  )
}