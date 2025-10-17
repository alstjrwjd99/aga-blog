'use client'
import styles from './styles.module.scss'

import SearchBox from '@/components/molecules/SearchBox'
import CasesList from '@/components/organisms/CasesList'
import { useLogSearch } from '@/hooks/useLogSearch'
import { useLogVisit } from '@/hooks/useLogVisit'
import { useStatistics } from '@/hooks/useQueries'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface CasesPageLayoutProps {
  children?: React.ReactNode
  className?: string
}

export default function CasesPageLayout({
  className = ''
}: CasesPageLayoutProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const tagsRef = useRef<HTMLDivElement>(null)

  const { data: statistics } = useStatistics()

  // 방문 로깅
  useLogVisit({ page: 'cases' })

  // 검색 로깅
  const { logSearch } = useLogSearch()

  // URL 파라미터에서 초기값 설정
  useEffect(() => {
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    setSearchQuery(search)
    setCategoryFilter(category)
  }, [searchParams])

  // 백엔드에서 받아온 카테고리 데이터로 옵션 생성
  const categoryOptions = [
    { value: '', label: '전체 카테고리' },
    ...(statistics?.casesByCategory?.map(category => ({
      value: category.category,
      label: category.category
    })) || [])
  ]

  // URL 업데이트 함수
  const updateURL = (search: string, category: string) => {
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (category) params.set('category', category)

    const queryString = params.toString()
    const newURL = queryString ? `/cases?${queryString}` : '/cases'
    router.push(newURL)
  }

  const filters = {
    search: searchQuery,
    category: categoryFilter,
    sortBy: 'createdAt',
    sortOrder: 'desc' as const
  }

  // 스크롤 가능한 태그 컨테이너
  const scrollTags = (direction: 'left' | 'right') => {
    if (tagsRef.current) {
      const scrollAmount = 200
      tagsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className={`${styles.casesPageLayout} ${className}`}>
      {/* 페이지 헤더 */}
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>피싱 사례 목록</h1>
        <p className={styles.pageDescription}>
          실제 피해 사례들을 확인하고 예방 방법을 알아보세요
        </p>
      </div>

      {/* 검색 및 필터 */}
      <div className={styles.searchFilterSection}>
        <div className={styles.searchFilterGrid}>
          <SearchBox
            placeholder="사례 제목이나 내용을 검색하세요..."
            onSearch={(query) => {
              setSearchQuery(query)
              // 검색 로깅
              logSearch(query)
              updateURL(query, categoryFilter)
            }}
          />
        </div>

        {/* 필터 태그들 */}
        <div className={styles.filterTagsContainer}>
          <button
            className={styles.scrollButton}
            onClick={() => scrollTags('left')}
            aria-label="왼쪽으로 스크롤"
          >
            ‹
          </button>

          <div className={styles.filterTags} ref={tagsRef}>
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                className={`${styles.filterTag} ${
                  categoryFilter === option.value ? styles.filterTagActive : ''
                }`}
                onClick={() => {
                  setCategoryFilter(option.value)
                  updateURL(searchQuery, option.value)
                }}
              >
                {option.label}
              </button>
            ))}
          </div>

          <button
            className={styles.scrollButton}
            onClick={() => scrollTags('right')}
            aria-label="오른쪽으로 스크롤"
          >
            ›
          </button>
        </div>
      </div>

      {/* 사례 목록 */}
      <CasesList
        searchQuery={searchQuery}
        categoryFilter={categoryFilter}
      />
    </div>
  )
}
