'use client'

import StructuredDataLDJSON from '@/components/atoms/StructuredDataLDJSON'
import { AGA_LOGO_IMAGE_ALT, AGA_LOGO_IMAGE_URL } from '@/constants/globals'
import { NextSeo } from 'next-seo'
import { useMemo } from 'react'

// 상수는 constants/globals.ts에서 import

interface SEOComponentProps {
  title?: string
  description?: string
  canonical?: string
  noindex?: boolean
  openGraph?: {
    title?: string
    description?: string
    url?: string
    images?: Array<{
      url: string
      alt: string
    }>
    type?: string
  }
  structuredData?: Array<Record<string, unknown>>
  cases?: Array<{
    id: string
    title: string
    category: string
    amount?: number | null
    region?: string | null
    createdAt: string
    commentCount?: number
    likeCount?: number
  }>
  category?: string
  searchQuery?: string
}

const SEOComponent = ({
  title,
  description,
  canonical,
  noindex = false,
  openGraph,
  structuredData,
  cases = [],
  category,
  searchQuery
}: SEOComponentProps) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/'

  // 기본 SEO 데이터 생성
  const defaultOpenGraph = useMemo(() => {
    const defaultTitle = title || 'IT Guy | 아가 - 피싱 방지 센터'
    const defaultDescription = description || '실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.'

    return {
      title: defaultTitle,
      description: defaultDescription,
      url: `${baseUrl}${currentPath}`,
      images: [
        {
          url: AGA_LOGO_IMAGE_URL,
          alt: AGA_LOGO_IMAGE_ALT,
        },
      ],
      type: 'website',
      ...openGraph
    }
  }, [title, description, openGraph, baseUrl, currentPath])

  // 기본 구조화된 데이터 생성
  const defaultStructuredData = useMemo(() => {
    const baseStructuredData = [
      {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            name: 'IT Guy | 아가',
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            description: '피싱 및 보이스피싱 사기 예방을 위한 사례 공유 플랫폼',
            contactPoint: [
              {
                '@type': 'ContactPoint',
                telephone: '+82-10-0000-0000',
                email: 'itguyaga@gmail.com',
                contactType: 'customer service',
              },
            ],
            sameAs: [
              // 소셜 미디어 링크들 (추후 추가)
            ]
          },
          {
            '@type': 'WebSite',
            name: 'IT Guy | 아가',
            url: baseUrl,
            description: '실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/search?q={search_term_string}`
              },
              'query-input': 'required name=search_term_string'
            }
          }
        ]
      }
    ]

    // 사례 데이터가 있는 경우 추가
    if (cases.length > 0) {
      (baseStructuredData[0]['@graph'] as Array<Record<string, unknown>>).push({
        '@type': 'ItemList',
        name: category ? `${category} 피싱 사례` : '피싱 사례',
        description: category ? `${category} 관련 피싱 사례 목록` : '피싱 사례 목록',
        itemListElement: cases.map((caseItem, index) => ({
          '@type': 'Article',
          position: index + 1,
          headline: caseItem.title,
          description: `${caseItem.category} 피싱 사례 - ${caseItem.region || '지역 미상'}`,
          author: {
            '@type': 'Organization',
            name: 'IT Guy | 아가'
          },
          publisher: {
            '@type': 'Organization',
            name: 'IT Guy | 아가',
            logo: {
              '@type': 'ImageObject',
              url: `${baseUrl}/logo.png`
            }
          },
          datePublished: caseItem.createdAt,
          articleSection: caseItem.category,
          keywords: ['피싱', '보이스피싱', '사기', '피해사례', caseItem.category],
          url: `${baseUrl}/cases/${caseItem.id}`,
          ...(caseItem.amount && {
            mentions: {
              '@type': 'MonetaryAmount',
              currency: 'KRW',
              value: caseItem.amount
            }
          })
        }))
      })
    }

    // 검색 결과가 있는 경우 추가
    if (searchQuery) {
      (baseStructuredData[0]['@graph'] as Array<Record<string, unknown>>).push({
        '@type': 'SearchResultsPage',
        name: `"${searchQuery}" 검색 결과`,
        description: `"${searchQuery}"에 대한 피싱 사례 검색 결과`,
        url: `${baseUrl}/search?q=${encodeURIComponent(searchQuery)}`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: cases.length,
          itemListElement: cases.map((caseItem, index) => ({
            '@type': 'Article',
            position: index + 1,
            headline: caseItem.title,
            url: `${baseUrl}/cases/${caseItem.id}`
          }))
        }
      })
    }

    return baseStructuredData
  }, [cases, category, searchQuery, baseUrl])

  // 최종 구조화된 데이터
  const finalStructuredData = structuredData || defaultStructuredData

  return (
    <>
      <NextSeo
        noindex={noindex}
        canonical={canonical || `${baseUrl}${currentPath}`}
        title={defaultOpenGraph.title}
        description={defaultOpenGraph.description}
        openGraph={defaultOpenGraph}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@aga_blog',
          site: baseUrl,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: '피싱, 보이스피싱, 사기, 피해사례, 예방, IT Guy, 아가, 피싱방지센터'
          },
          {
            name: 'author',
            content: 'IT Guy | 아가'
          },
          {
            name: 'robots',
            content: noindex ? 'noindex,nofollow' : 'index,follow'
          }
        ]}
      />

      <StructuredDataLDJSON structuredData={finalStructuredData} />
    </>
  )
}

export default SEOComponent
