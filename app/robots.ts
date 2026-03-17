import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.useconverto.com/').replace(/\/$/, '')
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/checkout', '/cadastro', '/confirmacao'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/checkout', '/cadastro', '/confirmacao'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
