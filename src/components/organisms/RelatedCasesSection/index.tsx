'use client'

import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Icon from '@/components/atoms/Icon'
import { useRelatedCases } from '@/hooks/useQueries'
import styles from '../../../app/cases/[slug]/page.module.scss'

interface RelatedCasesSectionProps {
  caseId: string
}

export default function RelatedCasesSection({ caseId }: RelatedCasesSectionProps) {
  const { data: relatedCases = [], isLoading } = useRelatedCases(caseId, 2)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getCategoryVariant = (category: string) => {
    const variants: { [key: string]: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' } = {
      '보이스피싱': 'danger',
      '문자': 'warning',
      '피싱': 'primary',
      '스미싱': 'success',
      '링크': 'primary',
      'SNS': 'info',
      '리뷰알바': 'success',
      '기타': 'secondary'
    }
    return variants[category] || 'secondary'
  }

  if (isLoading) {
    return (
      <Card className={styles.caseDetailRelated}>
        <h2 className={styles.caseDetailRelatedTitle}>관련 사례</h2>
        <div className={styles.caseDetailRelatedGrid}>
          {[1, 2].map((i) => (
            <div key={i} className={styles.caseDetailRelatedCard}>
              <div className={styles.caseDetailSkeletonRelatedCard}></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (relatedCases.length === 0) {
    return (
      <Card className={styles.caseDetailRelated}>
        <h2 className={styles.caseDetailRelatedTitle}>관련 사례</h2>
        <div className={styles.caseDetailRelatedEmpty}>
          <Icon name="file-text" size="lg" color="secondary" />
          <p>관련 사례가 없습니다.</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={styles.caseDetailRelated}>
      <h2 className={styles.caseDetailRelatedTitle}>관련 사례</h2>
      <div className={styles.caseDetailRelatedGrid}>
        {relatedCases.map((relatedCase) => (
          <div key={relatedCase.id} className={styles.caseDetailRelatedCard}>
            <div className={styles.caseDetailRelatedHeader}>
              <Badge variant={getCategoryVariant(relatedCase.category)} size="sm">
                {relatedCase.category}
              </Badge>
              <span className={styles.caseDetailRelatedDate}>
                {formatDate(relatedCase.createdAt)}
              </span>
            </div>
            <h3 className={styles.caseDetailRelatedTitle}>{relatedCase.title}</h3>
            <div className={styles.caseDetailRelatedStats}>
              <div className={styles.caseDetailRelatedStat}>
                <Icon name="users" size="sm" className={styles.caseDetailRelatedStatIcon} />
                <span>{relatedCase._count.likes}</span>
              </div>
              <div className={styles.caseDetailRelatedStat}>
                <Icon name="message-circle" size="sm" className={styles.caseDetailRelatedStatIcon} />
                <span>{relatedCase._count.comments}</span>
              </div>
            </div>
            <Button
              href={`/cases/${relatedCase.slug}`}
              variant="outline"
              size="sm"
              className={styles.caseDetailRelatedLink}
            >
              자세히 보기
            </Button>
          </div>
        ))}
      </div>
    </Card>
  )
}
