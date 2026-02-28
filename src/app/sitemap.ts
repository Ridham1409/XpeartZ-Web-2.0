import { MetadataRoute } from 'next'
import { blogPosts } from '@/lib/blog-data'
import { blogContent } from '@/lib/blog-content'

const SITE_URL = 'https://xpeartz.com'

export default function sitemap(): MetadataRoute.Sitemap {
  // Base routes
  const routes = [
    '',
    '/services',
    '/work',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Only include published blog posts in the sitemap
  const publishedPosts = blogPosts
    .filter((post) => !!blogContent[post.slug])
    .map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...routes, ...publishedPosts]
}
