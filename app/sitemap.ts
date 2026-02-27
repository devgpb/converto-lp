import type { MetadataRoute } from 'next'
import { getAllBlogPosts, toBlogDate } from '@/lib/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://converto-gilt.vercel.app').replace(/\/$/, '')
  const now = new Date()
  const blogPosts = await getAllBlogPosts()

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: blogPosts[0] ? toBlogDate(blogPosts[0].updatedAt ?? blogPosts[0].publishedAt) : now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: toBlogDate(post.updatedAt ?? post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${siteUrl}/politica-de-privacidade`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/termos-de-uso`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
