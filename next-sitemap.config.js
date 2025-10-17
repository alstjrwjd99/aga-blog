/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://aga-blog.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/statistics',
    '/api/*',
    '/admin/*',
    '/_next/*',
    '/404',
    '/500'
  ],
  additionalPaths: async (config) => {
    const result = []

    // 동적 사례 페이지들을 위한 추가 경로
    try {
      // API에서 모든 사례의 slug를 가져와서 sitemap에 추가
      const response = await fetch(`${config.siteUrl}/api/cases?limit=1000`)
      if (response.ok) {
        const data = await response.json()
        if (data.cases) {
          data.cases.forEach((caseItem) => {
            result.push({
              loc: `/cases/${caseItem.slug}`,
              lastmod: new Date(caseItem.updatedAt || caseItem.createdAt).toISOString(),
              changefreq: 'weekly',
              priority: 0.8,
            })
          })
        }
      }
    } catch (error) {
      console.warn('Failed to fetch cases for sitemap:', error)
    }

    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/statistics',
          '/api/',
          '/admin/',
          '/_next/',
          '/404',
          '/500'
        ],
      },
    ],
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://aga-blog.vercel.app'}/sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    // 기본 변환 설정
    const defaultTransform = {
      loc: path,
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }

    // 특정 페이지별 우선순위 및 빈도 설정
    if (path === '/') {
      return {
        ...defaultTransform,
        priority: 1.0,
        changefreq: 'daily',
      }
    }

    if (path.startsWith('/cases/')) {
      return {
        ...defaultTransform,
        priority: 0.9,
        changefreq: 'weekly',
      }
    }

    if (path === '/cases') {
      return {
        ...defaultTransform,
        priority: 0.9,
        changefreq: 'daily',
      }
    }

    if (path === '/about') {
      return {
        ...defaultTransform,
        priority: 0.8,
        changefreq: 'monthly',
      }
    }

    if (path === '/cases/submit') {
      return {
        ...defaultTransform,
        priority: 0.8,
        changefreq: 'monthly',
      }
    }

    return defaultTransform
  },
}
