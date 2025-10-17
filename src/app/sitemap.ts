import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // 기본 페이지들
    const staticPages = [
      {
        url: 'https://aga-blog.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: 'https://aga-blog.vercel.app/cases',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
      {
        url: 'https://aga-blog.vercel.app/cases/submit',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
      {
        url: 'https://aga-blog.vercel.app/about',
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      },
      {
        url: 'https://aga-blog.vercel.app/guide',
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      },
      {
        url: 'https://aga-blog.vercel.app/search',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.6,
      },
    ]

    // 모든 사례 페이지들 가져오기
    const cases = await prisma.case.findMany({
      select: {
        slug: true,
        updatedAt: true,
        createdAt: true,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })

    // 사례 페이지들 생성
    const casePages = cases.map((caseItem) => ({
      url: `https://aga-blog.vercel.app/cases/${caseItem.slug}`,
      lastModified: new Date(caseItem.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    const allPages = [...staticPages, ...casePages]

    return allPages
  } catch (error) {
    console.error('사이트맵 생성 오류:', error)
    
    // 오류 발생 시 기본 페이지만 반환
    return [
      {
        url: 'https://aga-blog.vercel.app',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 1,
      },
      {
        url: 'https://aga-blog.vercel.app/cases',
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: 0.9,
      },
    ]
  }
}
