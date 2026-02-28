import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // No need to disallow specific placeholder slugs here since they have noindex meta tags
    },
    sitemap: 'https://xpeartz.com/sitemap.xml',
  }
}
