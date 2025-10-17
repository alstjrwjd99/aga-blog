import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/statistics',
        '/api/',
        '/admin/',
        '/_next/',
        '/404',
        '/500',
      ],
    },
    sitemap: 'https://aga-blog.vercel.app/sitemap.xml',
    host: 'https://aga-blog.vercel.app',
  }
}