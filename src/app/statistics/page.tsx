'use client'

import Container from '@/components/atoms/Container'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'

interface VisitStats {
  period: string
  totalVisits: number
  uniqueVisitors: number
  pageStats: Array<{
    page: string
    visits: number
  }>
}

interface SearchStats {
  period: string
  totalSearches: number
  uniqueQueries: number
  topSearches: Array<{
    query: string
    count: number
  }>
  recentSearches: Array<{
    query: string
    createdAt: string
  }>
}

export default function StatisticsPage() {
  const router = useRouter()
  const [visitStats, setVisitStats] = useState<VisitStats | null>(null)
  const [searchStats, setSearchStats] = useState<SearchStats | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [loading, setLoading] = useState(true)
  const [accessDenied, setAccessDenied] = useState(false)

  // 접근 권한 확인
  useEffect(() => {
    const checkAccess = () => {
      // 간단한 접근 제한: 특정 키워드나 패스워드 확인
      const urlParams = new URLSearchParams(window.location.search)
      const accessKey = urlParams.get('key')

      // 개발 환경에서는 'admin' 키로 접근 가능
      // 프로덕션에서는 더 강력한 인증 시스템 사용 권장
      if (accessKey !== 'admin') {
        setAccessDenied(true)
        setLoading(false)
        return
      }

      // 접근 권한이 있으면 통계 데이터 로드
      fetchStats(selectedPeriod)
    }

    checkAccess()
  }, []) // 빈 의존성 배열로 한 번만 실행

  // 기간 변경 시 통계 데이터 다시 로드
  useEffect(() => {
    if (!accessDenied) {
      fetchStats(selectedPeriod)
    }
  }, [selectedPeriod, accessDenied])

  const fetchStats = async (period: string) => {
    setLoading(true)
    try {
      const [visitsResponse, searchResponse] = await Promise.all([
        fetch(`/api/visits?period=${period}`),
        fetch(`/api/search/stats?period=${period}`)
      ])

      const visitsData = await visitsResponse.json()
      const searchData = await searchResponse.json()

      setVisitStats(visitsData)
      setSearchStats(searchData)
    } catch (error) {
      console.error('통계 데이터 로딩 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const periodLabels = {
    '1d': '오늘',
    '7d': '최근 7일',
    '30d': '최근 30일',
    'all': '전체'
  }

  // 접근 거부 화면
  if (accessDenied) {
    return (
      <div className={styles.pageContainer}>
        <Container className={styles.pageContent}>
          <div className={styles.accessDenied}>
            <h1 className={styles.accessDeniedTitle}>접근 권한이 없습니다</h1>
            <p className={styles.accessDeniedMessage}>
              이 페이지는 관리자만 접근할 수 있습니다.
            </p>
            <button
              className={styles.backButton}
              onClick={() => router.push('/')}
            >
              홈으로 돌아가기
            </button>
          </div>
        </Container>
      </div>
    )
  }

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <Container className={styles.pageContent}>
          <div className={styles.loading}>통계 데이터를 불러오는 중...</div>
        </Container>
      </div>
    )
  }

  return (
    <div className={styles.pageContainer}>
      <Container className={styles.pageContent}>
        <div className={styles.statsHeader}>
          <h1 className={styles.pageTitle}>사이트 통계</h1>
          <p className={styles.pageDescription}>
            방문자 통계와 검색 분석을 확인할 수 있습니다
          </p>

          <div className={styles.periodSelector}>
            {Object.entries(periodLabels).map(([value, label]) => (
              <button
                key={value}
                className={`${styles.periodButton} ${
                  selectedPeriod === value ? styles.periodButtonActive : ''
                }`}
                onClick={() => setSelectedPeriod(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.statsGrid}>
          {/* 방문 통계 */}
          <div className={styles.statsCard}>
            <h2 className={styles.statsCardTitle}>방문 통계</h2>
            <div className={styles.statsCardContent}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{visitStats?.totalVisits || 0}</div>
                <div className={styles.statLabel}>총 방문 수</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{visitStats?.uniqueVisitors || 0}</div>
                <div className={styles.statLabel}>고유 방문자</div>
              </div>
            </div>

            <div className={styles.pageStats}>
              <h3 className={styles.pageStatsTitle}>페이지별 방문 수</h3>
              <div className={styles.pageStatsList}>
                {visitStats?.pageStats.map((page) => (
                  <div key={page.page} className={styles.pageStatItem}>
                    <span className={styles.pageName}>{page.page}</span>
                    <span className={styles.pageVisits}>{page.visits}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 검색 통계 */}
          <div className={styles.statsCard}>
            <h2 className={styles.statsCardTitle}>검색 통계</h2>
            <div className={styles.statsCardContent}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{searchStats?.totalSearches || 0}</div>
                <div className={styles.statLabel}>총 검색 수</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>{searchStats?.uniqueQueries || 0}</div>
                <div className={styles.statLabel}>고유 검색어</div>
              </div>
            </div>

            <div className={styles.searchStats}>
              <h3 className={styles.searchStatsTitle}>인기 검색어</h3>
              <div className={styles.searchStatsList}>
                {searchStats?.topSearches.map((search, index) => (
                  <div key={search.query} className={styles.searchStatItem}>
                    <span className={styles.searchRank}>#{index + 1}</span>
                    <span className={styles.searchQuery}>{search.query}</span>
                    <span className={styles.searchCount}>{search.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 최근 검색어 */}
        {searchStats?.recentSearches && searchStats.recentSearches.length > 0 && (
          <div className={styles.recentSearches}>
            <h2 className={styles.recentSearchesTitle}>최근 검색어</h2>
            <div className={styles.recentSearchesList}>
              {searchStats.recentSearches.map((search, index) => (
                <div key={index} className={styles.recentSearchItem}>
                  <span className={styles.recentSearchQuery}>{search.query}</span>
                  <span className={styles.recentSearchTime}>
                    {new Date(search.createdAt).toLocaleString('ko-KR')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
