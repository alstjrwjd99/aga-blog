'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import CaseCard from '@/components/molecules/CaseCard'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import styles from './SearchPageContent.module.scss'

interface SearchResult {
  id: string
  slug: string
  title: string
  category: string
  content: string
  amount: number | null
  region: string | null
  createdAt: string
  _count: {
    comments: number
    likes: number
  }
}

export default function SearchPageContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const performSearch = useCallback(async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/cases?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.cases || [])
      }
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }, [searchQuery])

  useEffect(() => {
    if (searchParams.get('q')) {
      performSearch()
    }
  }, [searchParams, performSearch])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  return (
    <div className={styles.searchPage}>
      <Container className={styles.searchContainer}>
        <h1 className={styles.searchTitle}>
          사례 검색
        </h1>

        {/* 검색 폼 */}
        <Card className={styles.searchFormCard}>
          <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
            <div className={styles.searchInputGroup}>
              <div className={styles.searchInputWrapper}>
                <Input
                  type="search"
                  placeholder="제목, 내용, 지역, 태그 등으로 검색"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Icon name="search" size="sm" />}
                  className={styles.searchInput}
                />
              </div>
              <Button
                type="submit"
                disabled={!searchQuery.trim() || isLoading}
                className={styles.searchButton}
              >
                <Icon name="search" size="sm" />
                검색
              </Button>
            </div>
          </form>
        </Card>

        {/* 검색 결과 */}
        {hasSearched && (
          <div className={styles.searchResults}>
            {isLoading ? (
              <div className={styles.loadingState}>
                <Icon name="loader" size="lg" className={styles.loadingIcon} />
                <p className={styles.loadingText}>검색 중...</p>
              </div>
            ) : searchResults.length > 0 ? (
              <>
                <div className={styles.resultsHeader}>
                  <h2 className={styles.resultsTitle}>
                    검색 결과 ({searchResults.length}건)
                  </h2>
                  <p className={styles.resultsDescription}>
                    &quot;{searchQuery}&quot;에 대한 검색 결과입니다.
                  </p>
                </div>
                <div className={styles.resultsGrid}>
                  {searchResults.map((result) => (
                    <CaseCard
                      key={result.id}
                      id={result.id}
                      slug={result.slug}
                      title={result.title}
                      category={result.category}
                      amount={result.amount}
                      region={result.region}
                      createdAt={result.createdAt}
                      commentCount={result._count.comments}
                      likeCount={result._count.likes}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className={styles.emptyState}>
                <Icon name="search" size="xl" className={styles.emptyIcon} />
                <h3 className={styles.emptyTitle}>검색 결과가 없습니다</h3>
                <p className={styles.emptyDescription}>
                  다른 검색어로 다시 시도해보세요.
                </p>
                <div className={styles.emptySuggestions}>
                  <h4 className={styles.suggestionsTitle}>검색 팁:</h4>
                  <ul className={styles.suggestionsList}>
                    <li>• 더 간단한 키워드를 사용해보세요</li>
                    <li>• 오타가 없는지 확인해보세요</li>
                    <li>• 다른 카테고리로 검색해보세요</li>
                    <li>• 지역명으로 검색해보세요</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 검색 전 안내 */}
        {!hasSearched && (
          <div className={styles.searchGuide}>
            <Card className={styles.guideCard}>
              <div className={styles.guideContent}>
                <Icon name="search" size="xl" className={styles.guideIcon} />
                <h3 className={styles.guideTitle}>검색 방법</h3>
                <div className={styles.guideTips}>
                  <div className={styles.guideTip}>
                    <Icon name="tag" size="sm" className={styles.tipIcon} />
                    <span>카테고리: 피싱, 스미싱, 보이스피싱 등</span>
                  </div>
                  <div className={styles.guideTip}>
                    <Icon name="map-pin" size="sm" className={styles.tipIcon} />
                    <span>지역: 서울, 경기, 부산 등</span>
                  </div>
                  <div className={styles.guideTip}>
                    <Icon name="dollar-sign" size="sm" className={styles.tipIcon} />
                    <span>금액: 피해 금액 범위</span>
                  </div>
                  <div className={styles.guideTip}>
                    <Icon name="calendar" size="sm" className={styles.tipIcon} />
                    <span>날짜: 최근, 이번 달, 올해 등</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </Container>
    </div>
  )
}
