'use client'
import styles from './styles.module.scss'

import { useEffect } from 'react'

interface StructuredDataProps {
  type: 'WebSite' | 'Article' | 'Organization' | 'BreadcrumbList'
  data: Record<string, unknown>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': type,
      ...data
    })
    
    document.head.appendChild(script)
    
    return () => {
      document.head.removeChild(script)
    }
  }, [type, data])

  return null
}

// 웹사이트 구조화된 데이터
export function WebsiteStructuredData() {
  return (
    <StructuredData
      type="WebSite"
      data={{
        name: '피싱 방지 센터',
        description: '실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }}
    />
  )
}

// 조직 구조화된 데이터
export function OrganizationStructuredData() {
  return (
    <StructuredData
      type="Organization"
      data={{
        name: '피싱 방지 센터',
        description: '보이스피싱 및 피싱 사기 예방을 위한 사례 공유 플랫폼',
        url: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        logo: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo.png`,
        sameAs: [
          // 소셜 미디어 링크들 (추후 추가)
        ]
      }}
    />
  )
}

// 기사 구조화된 데이터
export function ArticleStructuredData({ 
  caseData 
}: { 
  caseData: {
    id: string
    title: string
    content: string
    category: string
    amount?: number
    region?: string
    createdAt: string
    updatedAt: string
  }
}) {
  return (
    <StructuredData
      type="Article"
      data={{
        headline: caseData.title,
        description: caseData.content.substring(0, 160) + '...',
        author: {
          '@type': 'Organization',
          name: '피싱 방지 센터'
        },
        publisher: {
          '@type': 'Organization',
          name: '피싱 방지 센터',
          logo: {
            '@type': 'ImageObject',
            url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/logo.png`
          }
        },
        datePublished: caseData.createdAt,
        dateModified: caseData.updatedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/cases/${caseData.id}`
        },
        articleSection: caseData.category,
        keywords: ['피싱', '보이스피싱', '사기', '피해사례', caseData.category],
        ...(caseData.amount && {
          mentions: {
            '@type': 'MonetaryAmount',
            currency: 'KRW',
            value: caseData.amount
          }
        })
      }}
    />
  )
}

// 브레드크럼 구조화된 데이터
export function BreadcrumbStructuredData({ 
  items 
}: { 
  items: Array<{ name: string; url: string }> 
}) {
  return (
    <StructuredData
      type="BreadcrumbList"
      data={{
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: item.url
        }))
      }}
    />
  )
}
