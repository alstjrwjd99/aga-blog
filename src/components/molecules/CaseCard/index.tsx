'use client'

import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import CustomIcon from '@/components/atoms/CustomIcon'
import Link from 'next/link'
import styles from './styles.module.scss'

interface CaseCardProps {
  id: string
  slug: string
  title: string
  category: string
  amount?: number | null
  region?: string | null
  createdAt: string | Date
  commentCount: number
  likeCount: number
}

export default function CaseCard({
  slug,
  title,
  category,
  amount,
  region,
  createdAt,
  commentCount,
  likeCount
}: CaseCardProps) {
  const formatDate = (dateString: string | Date) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원'
  }

  const getCategoryVariant = (category: string): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' => {
    return 'primary'
  }

  return (
    <article
      className={styles.caseCard}
      aria-label={`${category} 피싱 사례: ${title}`}
    >

      {/* 카테고리 배지 */}
      <div className={styles.categorySection}>
        <Badge variant={getCategoryVariant(category)} size="sm">
          {category}
        </Badge>
      </div>

      {/* 상단 메타 정보 */}
      <div className={styles.metaSection}>
        <div className={styles.metaItem}>
          <CustomIcon name="calendar" size="sm" color="#6B7280" />
          <span>{formatDate(createdAt)}</span>
        </div>
        {region && (
          <>
            <div className={styles.metaItem}>
              <CustomIcon name="map-pin" size="sm" color="#6B7280" />
              <span>{region}</span>
            </div>
          </>
        )}
      </div>

      {/* 제목 */}
      <h3 className={styles.titleSection}>
        <Link href={`/cases/${slug}`} className={styles.titleLink}>
          {title}
        </Link>
      </h3>

      {/* 피해 금액 */}
      <div className={styles.amountSection}>
        <div className={styles.amountItem}>
          <span className={styles.amountLabel}>피해 금액</span>
          <span className={styles.amountValue}>
            {amount && amount > 0 ? formatAmount(amount) : '미정'}
          </span>
        </div>
      </div>

      {/* 참여 정보 */}
      <div className={styles.statsSection}>
        <div className={styles.statItem}>
          <CustomIcon name="users" size="sm" color="#6B7280" />
          <span>{likeCount}명이 피해를 입었어요</span>
        </div>
        <div className={styles.statItem}>
          <CustomIcon name="message-circle" size="sm" color="#6B7280" />
          <span>{commentCount} 댓글</span>
        </div>
      </div>

      {/* CTA 버튼 */}
      <div className={styles.actionSection}>
        <Button
          href={`/cases/${slug}`}
          variant="primary"
          size="md"
          className={styles.ctaButton}
        >
          자세히 보기 →
        </Button>
      </div>
    </article>
  )
}
