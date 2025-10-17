'use client'
import styles from './styles.module.scss'

import Button from '@/components/atoms/Button'
import CaseCard from '@/components/molecules/CaseCard'
import { useCases } from '@/hooks/useQueries'
import { useState } from 'react'

interface CasesListProps {
  searchQuery?: string
  categoryFilter?: string
}

// 사례 목록 컴포넌트 (React Query 사용)
export default function CasesList({
  searchQuery = '',
  categoryFilter = ''
}: CasesListProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = useCases({
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: currentPage,
    limit: 6,
    search: searchQuery,
    category: categoryFilter
  })

  if (isLoading) {
    return <CasesListSkeleton />
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>사례를 불러오는데 실패했습니다.</p>
      </div>
    )
  }

  if (!data?.cases || data.cases.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <p className={styles.emptyMessage}>등록된 사례가 없습니다.</p>
        <Button href="/cases/submit" className={styles.emptyButton}>첫 번째 사례 등록하기</Button>
      </div>
    )
  }

  const { cases, pagination } = data
  const { page, totalPages, total } = pagination

  // 페이지네이션 버튼 생성
  const generatePageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5

    if (totalPages <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // 현재 페이지를 중심으로 앞뒤 2페이지씩 표시
      const start = Math.max(1, page - 2)
      const end = Math.min(totalPages, page + 2)

      if (start > 1) {
        pages.push(1)
        if (start > 2) {
          pages.push('...')
        }
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...')
        }
        pages.push(totalPages)
      }
    }

    return pages
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      setCurrentPage(newPage)
      // 페이지 변경 시 스크롤을 맨 위로
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className={styles.casesList}>
      {/* 결과 개수 및 정렬 정보 */}
      <div className={styles.casesListHeader}>
        <span className={styles.casesCount}>총 {total}개의 사례</span>
        <span className={styles.sortInfo}>최신순으로 정렬됨</span>
      </div>

      {/* 사례 카드 그리드 */}
      <div className={styles.casesGrid}>
        {cases.map((caseData) => (
          <CaseCard
            key={caseData.id}
            id={caseData.id}
            slug={caseData.slug}
            title={caseData.title}
            category={caseData.category}
            amount={caseData.amount}
            region={caseData.region}
            createdAt={caseData.createdAt}
            commentCount={caseData._count.comments}
            likeCount={caseData._count.likes}
          />
        ))}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className={styles.paginationContainer}>
          <div className={styles.pagination}>
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
            >
              이전
            </Button>

            {generatePageNumbers().map((pageNum, index) => (
              pageNum === '...' ? (
                <span key={`ellipsis-${index}`} className={styles.paginationEllipsis}>
                  ...
                </span>
              ) : (
                <Button
                  key={pageNum}
                  variant={pageNum === page ? "primary" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum as number)}
                >
                  {pageNum}
                </Button>
              )
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              다음
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// 로딩 스켈레톤 컴포넌트
function CasesListSkeleton() {
  return (
    <div className={styles.casesList}>
      <div className={styles.casesListHeader}>
        <div className={styles.skeletonText}></div>
        <div className={styles.skeletonText}></div>
      </div>

      <div className={styles.casesGrid}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className={styles.skeletonCard}>
            <div className={styles.skeletonCardContent}>
              <div className={styles.skeletonCardHeader}>
                <div className={styles.skeletonBadge}></div>
                <div className={styles.skeletonDate}></div>
              </div>
              <div className={styles.skeletonTitle}></div>
              <div className={styles.skeletonAmount}></div>
              <div className={styles.skeletonLocation}></div>
              <div className={styles.skeletonFooter}>
                <div className={styles.skeletonStats}></div>
                <div className={styles.skeletonActions}>
                  <div className={styles.skeletonIcon}></div>
                  <div className={styles.skeletonIcon}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
