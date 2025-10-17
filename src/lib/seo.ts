import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  openGraph?: {
    images?: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
  }
}

export function generateSEOMetadata({
  title = '피싱 방지 센터 - 보이스피싱 사례 공유',
  description = '실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.',
  keywords = ['보이스피싱', '피싱', '사기', '피해사례', '예방', '사이버보안'],
  image,
  url,
  openGraph,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = '피싱 방지 센터',
  section
}: SEOProps = {}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const defaultImage = `${baseUrl}/og-image.png`

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: '피싱 방지 센터',

    // Open Graph
    openGraph: {
      title,
      description,
      type,
      locale: 'ko_KR',
      siteName: '피싱 방지 센터',
      url: url || baseUrl,
      images: openGraph?.images || [
        {
          url: image || defaultImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image || defaultImage],
      creator: '@phishing_prevention', // 실제 트위터 계정으로 변경
      site: '@phishing_prevention',
    },

    // 추가 메타 태그
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // 캐노니컬 URL
    alternates: {
      canonical: url || baseUrl,
    },

    // 언어 및 지역
    other: {
      'geo.region': 'KR',
      'geo.country': 'South Korea',
      'language': 'ko',
      'revisit-after': '1 day',
      'distribution': 'global',
      'rating': 'general',
    },
  }
}

// 페이지별 SEO 메타데이터 생성 함수들
export const seoMetadata = {
  // 홈페이지
  home: () => generateSEOMetadata({
    title: '피싱 방지 센터 - 보이스피싱 사례 공유',
    description: '실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.',
    keywords: ['보이스피싱', '피싱', '사기', '피해사례', '예방', '사이버보안', '피싱방지'],
  }),

  // 사례 목록
  cases: () => generateSEOMetadata({
    title: '피싱 피해 사례 목록 - 피싱 방지 센터',
    description: '실제 피싱 피해 사례들을 확인하고 예방 방법을 알아보세요. 다양한 피싱 유형별 사례를 제공합니다.',
    keywords: ['피싱사례', '보이스피싱사례', '피해사례', '피싱유형', '사기사례'],
    url: '/cases',
  }),

  // 사례 상세
  caseDetail: (caseData: {
    title: string
    content: string
    category: string
    amount?: number
    region?: string
    createdAt: string
    updatedAt: string
    id: string
    openGraph?: {
      images?: Array<{
        url: string
        width: number
        height: number
        alt: string
      }>
    }
  }) => generateSEOMetadata({
    title: `${caseData.title} - 피싱 방지 센터`,
    description: caseData.content.substring(0, 160) + '...',
    keywords: ['피싱', '보이스피싱', '사기', '피해사례', caseData.category, caseData.region || ''],
    url: `/cases/${caseData.id}`,
    type: 'article',
    publishedTime: caseData.createdAt,
    modifiedTime: caseData.updatedAt,
    section: caseData.category,
    openGraph: caseData.openGraph,
  }),

  // 사례 등록
  submit: () => generateSEOMetadata({
    title: '피싱 피해 사례 등록 - 피싱 방지 센터',
    description: '피싱 피해를 당하신 경험을 공유해주세요. 다른 사람들의 피해를 예방하는 데 도움이 됩니다.',
    keywords: ['피싱신고', '피해신고', '피싱등록', '사례등록'],
    url: '/cases/submit',
  }),

  // 통계
  statistics: () => generateSEOMetadata({
    title: '피싱 피해 통계 - 피싱 방지 센터',
    description: '피싱 피해 현황과 통계를 확인하고 피싱의 심각성을 알아보세요.',
    keywords: ['피싱통계', '피해통계', '피싱현황', '사기통계'],
    url: '/statistics',
  }),

  // 예방 가이드
  guide: () => generateSEOMetadata({
    title: '피싱 예방 가이드 - 피싱 방지 센터',
    description: '피싱을 예방하는 방법과 피싱에 당하지 않기 위한 실용적인 가이드를 제공합니다.',
    keywords: ['피싱예방', '피싱가이드', '예방방법', '피싱대처'],
    url: '/guide',
  }),

  // 검색
  search: (query?: string) => generateSEOMetadata({
    title: query ? `"${query}" 검색 결과 - 피싱 방지 센터` : '피싱 사례 검색 - 피싱 방지 센터',
    description: query ? `"${query}"에 대한 피싱 사례 검색 결과입니다.` : '피싱 사례를 검색하고 관련 정보를 찾아보세요.',
    keywords: ['피싱검색', '사례검색', query || ''],
    url: query ? `/search?q=${encodeURIComponent(query)}` : '/search',
  }),

  // 소개
  about: () => generateSEOMetadata({
    title: '피싱 방지 센터 소개 | 실제 피해 사례 공유로 안전한 디지털 환경 만들기',
    description: '피싱 방지 센터는 보이스피싱, 문자피싱, 링크피싱 등 다양한 피싱 유형의 실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다. 피해 사례 등록, 예방 교육, 긴급 신고 안내를 제공합니다.',
    keywords: [
      '피싱방지센터', '피싱예방', '보이스피싱', '문자피싱', '링크피싱', 'SNS피싱',
      '피해사례공유', '사이버보안교육', '피싱신고', '금융사기예방', '개인정보보호',
      '사이버범죄신고', '피싱피해예방', '디지털보안', '온라인안전'
    ],
    url: '/about',
  }),
}
