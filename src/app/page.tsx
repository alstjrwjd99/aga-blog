'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Container from '@/components/atoms/Container'
import CustomIcon from '@/components/atoms/CustomIcon'
import CaseCard from '@/components/molecules/CaseCard'
import HeroSearchBox from '@/components/molecules/HeroSearchBox'
import { useLogSearch } from '@/hooks/useLogSearch'
import { useLogVisit } from '@/hooks/useLogVisit'
import { useCases, useStatistics } from '@/hooks/useQueries'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import styles from './page.module.scss'

// 홈페이지 컴포넌트
export default function Home() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedSort, setSelectedSort] = useState('latest')
  const [searchQuery, setSearchQuery] = useState('')
  const { data: statistics, isLoading: statisticsLoading, error: statisticsError } = useStatistics()
  const { data: casesData, isLoading: casesLoading, error: casesError } = useCases({ sortBy: 'createdAt', sortOrder: 'desc', limit: 3 })

  // 방문 로깅
  useLogVisit({ page: 'home' })

  // 검색 로깅
  const { logSearch } = useLogSearch()

  // 필터 옵션들
  const categoryOptions = [
    { value: '', label: '전체' },
    { value: '보이스피싱', label: '보이스피싱' },
    { value: 'SNS', label: 'SNS' },
    { value: '리뷰알바', label: '리뷰알바' },
    { value: '링크', label: '링크' },
    { value: '기타', label: '기타' }
  ]

  const periodOptions = [
    { value: '', label: '전체' },
    { value: 'today', label: '오늘' },
    { value: 'week', label: '최근 1주' },
    { value: 'month', label: '최근 1개월' },
    { value: 'year', label: '최근 1년' }
  ]

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'popular', label: '인기순' },
    { value: 'amount', label: '피해금액순' }
  ]

  // 텍스트 드래그 방지
  useEffect(() => {
    const preventDrag = (e: Event) => {
      e.preventDefault()
    }

    const preventSelect = (e: Event) => {
      e.preventDefault()
    }

    // 텍스트 선택 방지
    document.addEventListener('selectstart', preventSelect)
    document.addEventListener('dragstart', preventDrag)

    // CSS로도 방지
    document.body.style.userSelect = 'none'
    ;(document.body.style as any).webkitUserSelect = 'none'
    ;(document.body.style as any).mozUserSelect = 'none'
    ;(document.body.style as any).msUserSelect = 'none'

    return () => {
      document.removeEventListener('selectstart', preventSelect)
      document.removeEventListener('dragstart', preventDrag)
      document.body.style.userSelect = ''
      ;(document.body.style as any).webkitUserSelect = ''
      ;(document.body.style as any).mozUserSelect = ''
      ;(document.body.style as any).msUserSelect = ''
    }
  }, [])

  // 검색 핸들러
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim()) {
      // 검색 로깅
      logSearch(query)
      router.push(`/cases?search=${encodeURIComponent(query.trim())}`)
    }
  }

  // 카테고리별 아이콘 매핑
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      'SNS': 'social-media',
      '리뷰알바': 'review',
      '링크': 'link',
      '문자': 'message',
      '보이스피싱': 'phone',
      '기타': 'more'
    }
    return iconMap[category] || 'shield'
  }

  return (
    <>
      <div className={styles.homePage}>
        {/* 히어로 섹션 */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              피싱으로 더이상 피해자가<br/>나오지 않길 바랍니다
            </h1>
            {/* 검색 입력 필드 */}
            <div className={styles.heroSearchContainer}>
              <HeroSearchBox
                placeholder="사례를 검색해보세요..."
                onSearch={handleSearch}
                className={styles.heroSearchInput}
              />
            </div>
            <div className={styles.heroDescription}>
              <p className={styles.heroDescriptionText1}>당신의 이야기를 공유하여</p>
              <p className={styles.heroDescriptionText2}>다른 사람들을 도와주세요</p>
            </div>

            <div className={styles.heroButtons}>
              <Button href="/cases" size="lg" className={styles.heroButtonPrimary}>
                사례 보기
              </Button>
              <Button href="/cases/submit" variant="secondary" size="lg" className={styles.heroButtonSecondary}>
                제보하기
              </Button>
            </div>
          </div>
        </section>
        {/* 카테고리 섹션 */}
        <section className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>피싱 유형별 현황</h2>
              <p className={styles.sectionDescription}>
                다양한 피싱 유형별로 발생한 사례를 확인해보세요
              </p>
            </div>

            <div className={styles.categoryGrid}>
              {statistics?.casesByCategory.map((category) => (
                <Card key={category.category} className={styles.categoryCard}>
                  <div className={styles.categoryContent}>
                    <h3 className={styles.categoryTitle}>{category.category}</h3>
                    <div className={styles.categoryStats}>
                      <span className={styles.categoryCount}>{category._count.id}건</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
        </section>

        {/* 최근 등록된 사례 섹션 */}
        <section className={styles.recentCasesSection}>

            <div className={styles.sectionHeader}>
              <div>
                <h2 className={styles.sectionTitle}>최근 등록된 사례</h2>
                <p className={styles.sectionDescription}>
                  최근에 등록된 피싱 사례들을 확인해보세요
                </p>
              </div>
              <div className={styles.sectionHeaderAction}>
                <Button href="/cases" size="lg" className={styles.viewAllButton}>
                  모든 사례 보기
                </Button>
              </div>
            </div>

            {casesLoading ? (
              <div className={styles.loadingState}>
                <CustomIcon name="loader" size="xl" color="#6B7280" />
                <p className={styles.loadingText}>최신 사례를 불러오는 중...</p>
              </div>
            ) : casesError ? (
              <div className={styles.errorState}>
                <CustomIcon name="alert-circle" size="xl" color="#EF4444" />
                <h3 className={styles.errorTitle}>데이터를 불러올 수 없습니다</h3>
                <p className={styles.errorDescription}>
                  네트워크 연결을 확인하고 다시 시도해주세요.
                </p>
                <Button onClick={() => window.location.reload()} variant="outline">
                  다시 시도
                </Button>
              </div>
            ) : casesData?.cases && casesData.cases.length > 0 ? (
              <div className={styles.caseGrid}>
                {casesData.cases.map((caseItem) => (
                        <CaseCard
                          key={caseItem.id}
                          id={caseItem.id}
                          slug={caseItem.slug}
                          title={caseItem.title}
                          category={caseItem.category}
                          amount={caseItem.amount}
                          region={caseItem.region}
                          createdAt={caseItem.createdAt}
                          commentCount={caseItem._count.comments}
                          likeCount={caseItem._count.likes}
                        />
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                <CustomIcon name="file-text" size="xl" color="#9ca3af" />
                <h3 className={styles.emptyTitle}>등록된 사례가 없습니다</h3>
                <p className={styles.emptyDescription}>
                  첫 번째 피싱 사례를 등록해보세요
                </p>
                <Button href="/cases/submit" size="lg">
                  사례 등록하기
                </Button>
              </div>
            )}
        </section>

        {/* 긴급 경고 섹션 */}
        <section className={styles.warningSection}>
          <Container>
            <Card className={styles.warningCard}>
              <div className={styles.warningContent}>
                <div className={styles.warningText}>
                  <h3 className={styles.warningTitle}>경고</h3>
                  <p className={styles.warningSubtitle}>
                    최근 피싱 사기가 급증하고 있습니다. 아래 사항을 반드시 확인하세요.
                  </p>

                  <div className={styles.warningGrid}>
                    <div className={styles.warningItem}>
                      <h4 className={styles.warningItemTitle}>개인정보 요구</h4>
                      <p className={styles.warningItemText}>
                        전화나 메시지로 개인정보를 요구하는 경우는 모두 사기입니다.
                      </p>
                    </div>

                    <div className={styles.warningItem}>
                      <h4 className={styles.warningItemTitle}>급한 돈 요구</h4>
                      <p className={styles.warningItemText}>
                        급하게 돈을 요구하거나 계좌 정보를 묻는 경우는 피싱입니다.
                      </p>
                    </div>

                    <div className={styles.warningItem}>
                      <h4 className={styles.warningItemTitle}>의심스러운 링크</h4>
                      <p className={styles.warningItemText}>
                        알 수 없는 링크나 첨부파일은 절대 클릭하지 마세요.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Container>
        </section>
      </div>
    </>
  )
}
