/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://aga-blog.vercel.app',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/404', '/_error', '/api/*', '/statistics'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/statistics', '/api/', '/admin/', '/_next/', '/404', '/500']
      }
    ],
  },
  additionalPaths: async (config) => {
    // 동적 사례 페이지들을 추가
    try {
      // 환경 변수 확인
      if (!process.env.DATABASE_URL || process.env.DATABASE_URL.startsWith('file:')) {
        console.log('로컬 SQLite 환경에서는 사례 페이지를 사이트맵에 추가하지 않습니다.')
        return []
      }

      const { PrismaClient } = await import('@prisma/client')
      const prisma = new PrismaClient()

      const cases = await prisma.case.findMany({
        select: {
          slug: true,
          updatedAt: true,
        },
        orderBy: {
          updatedAt: 'desc'
        }
      })

      await prisma.$disconnect()

      console.log(`사이트맵에 ${cases.length}개의 사례 페이지를 추가합니다.`)

      return cases.map((caseItem) => ({
        loc: `/cases/${caseItem.slug}`,
        lastmod: caseItem.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      }))
    } catch (error) {
      console.error('사이트맵 생성 중 오류:', error)
      return []
    }
  },
}
