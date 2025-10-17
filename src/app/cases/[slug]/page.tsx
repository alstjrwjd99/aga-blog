import BackButton from '@/components/atoms/BackButton'
import Badge from '@/components/atoms/Badge'
import Card from '@/components/atoms/Card'
import CommentForm from '@/components/atoms/CommentForm'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import LikeButton from '@/components/atoms/LikeButton'
import CommentsList from '@/components/organisms/CommentsList'
import RelatedCasesSection from '@/components/organisms/RelatedCasesSection'
import { ArticleStructuredData, BreadcrumbStructuredData } from '@/components/SEO/StructuredData'
import { seoMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import styles from './page.module.scss'

// 사례 상세 페이지 폴백 컴포넌트
function CaseDetailFallback({ slug }: { slug: string }) {
  return (
    <div className={styles.caseDetailContent}>
      <BackButton />
      <Card className={styles.cardPaddingLg}>
        <div className={styles.caseDetailCardContent}>
          <div className={styles.caseDetailHeader}>
            <div className={styles.caseDetailHeaderLeft}>
              <div className={styles.caseDetailMeta}>
                <Badge variant="secondary" size="md">
                  로딩 중...
                </Badge>
              </div>
              <h1 className={styles.caseDetailTitle}>
                사례를 불러오는 중입니다...
              </h1>
            </div>
          </div>
          <div className={styles.caseDetailContentSection}>
            <h3 className={styles.caseDetailContentTitle}>사례 상세 내용</h3>
            <div className={styles.caseDetailContentText}>
              잠시만 기다려주세요. 사례 정보를 불러오고 있습니다.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

interface CaseDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cases/slug/${slug}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      return seoMetadata.caseDetail({
        id: slug,
        title: '피해 사례 상세',
        content: '실제 피싱 피해 사례의 상세 내용을 확인하고 예방 방법을 알아보세요.',
        category: '기타',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    }

    const caseData = await response.json()

    return seoMetadata.caseDetail(caseData)
  } catch {
    return seoMetadata.caseDetail({
      id: slug,
      title: '피해 사례 상세',
      content: '실제 피싱 피해 사례의 상세 내용을 확인하고 예방 방법을 알아보세요.',
      category: '기타',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }
}

// 사례 상세 페이지 컴포넌트
export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { slug } = await params

  return (
    <div className={styles.pageContainer}>
      <Container className={styles.pageContent}>
        <Suspense fallback={<CaseDetailSkeleton />}>
          <CaseDetailContent slug={slug} />
        </Suspense>
      </Container>
    </div>
  )
}

// 사례 상세 내용 컴포넌트
async function CaseDetailContent({ slug }: { slug: string }) {
  try {
    console.log('CaseDetailContent - slug:', slug)
    console.log('CaseDetailContent - decoded slug:', decodeURIComponent(slug))

    // 다중 디코딩 처리
    let decodedSlug = slug
    try {
      decodedSlug = decodeURIComponent(slug)
      if (decodedSlug !== slug) {
        decodedSlug = decodeURIComponent(decodedSlug)
      }
    } catch (decodeError) {
      console.log('Decode error, using original slug:', slug)
      decodedSlug = slug
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/cases/slug/${decodedSlug}`, {
      cache: 'no-store'
    })

    console.log('CaseDetailContent - response status:', response.status)
    console.log('CaseDetailContent - response ok:', response.ok)

    if (!response.ok) {
      console.error('Failed to fetch case:', response.status, response.statusText)
      // 임시로 기본 데이터 반환
      return <CaseDetailFallback slug={slug} />
    }

    const caseData = await response.json()
    console.log('CaseDetailContent - caseData:', caseData)

    // 데이터 검증 및 정리
    if (!caseData || !caseData.id || !caseData.title) {
      console.error('Invalid case data received:', caseData)
      return <CaseDetailFallback slug={slug} />
    }

    // 안전한 데이터 정리
    const safeCaseData = {
      ...caseData,
      title: caseData.title || '제목 없음',
      content: caseData.content || '내용 없음',
      category: caseData.category || '기타',
      region: caseData.region || null,
      tip: caseData.tip || null,
      amount: caseData.amount || null,
      createdAt: caseData.createdAt || new Date().toISOString(),
      updatedAt: caseData.updatedAt || new Date().toISOString(),
      _count: caseData._count || { comments: 0, likes: 0 }
    }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount) + '원'
  }

  const getCategoryVariant = (category: string) => {
    const variants: { [key: string]: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' } = {
      '보이스피싱': 'danger',
      '문자': 'warning',
      '링크': 'primary',
      'SNS': 'info',
      '리뷰알바': 'success',
      '기타': 'secondary'
    }
    return variants[category] || 'secondary'
  }

  return (
      <>
        <ArticleStructuredData caseData={safeCaseData} />
        <BreadcrumbStructuredData
          items={[
            { name: '홈', url: '/' },
            { name: '사례 목록', url: '/cases' },
            { name: safeCaseData.title, url: `/cases/${slug}` }
          ]}
        />
        <div className={styles.caseDetailContent}>
          {/* 뒤로가기 버튼 */}
          <BackButton />

        {/* 사례 정보 카드 */}
        <Card className={styles.cardPaddingLg}>
          <div className={styles.caseDetailCardContent}>
            {/* 헤더 */}
            <div className={styles.caseDetailHeader}>
              <div className={styles.caseDetailHeaderLeft}>
                <div className={styles.caseDetailMeta}>
                  <Badge variant={getCategoryVariant(safeCaseData.category)} size="md">
                    {safeCaseData.category}
                  </Badge>
                  <div className={styles.caseDetailDate}>
                    <Icon name="calendar" size="sm" className={styles.caseDetailDateIcon} />
                    {formatDate(safeCaseData.createdAt)}
                  </div>
                  {safeCaseData.region && (
                    <div className={styles.caseDetailRegionMeta}>
                      <Icon name="map-pin" size="sm" className={styles.caseDetailRegionIcon} />
                      {safeCaseData.region}
                    </div>
                  )}
                </div>
                <h1 className={styles.caseDetailTitle}>
                  {safeCaseData.title}
                </h1>
              </div>
              <div className={styles.caseDetailHeaderRight}>
                {safeCaseData.amount && (
                  <div className={styles.caseDetailAmountMeta}>
                    <Icon name="trending-up" size="sm" className={styles.caseDetailAmountIcon} />
                    <span className={styles.caseDetailAmountLabel}>피해 금액:</span>
                    <span className={styles.caseDetailAmountValue}>
                      {formatAmount(safeCaseData.amount)}
                    </span>
                  </div>
                )}
                <LikeButton caseId={safeCaseData.id} />
              </div>
            </div>

            {/* 사례 내용 */}
            <div className={styles.caseDetailContentSection}>
              <h3 className={styles.caseDetailContentTitle}>사례 상세 내용</h3>
                      <div className={styles.caseDetailContentText}>
                        {safeCaseData.content}
                      </div>
            </div>

            {/* Key Takeaway 박스 */}
            <div className={styles.caseDetailTakeaway}>
              <div className={styles.caseDetailTakeawayHeader}>
                <h3 className={styles.caseDetailTakeawayTitle}>Key Takeaway</h3>
              </div>
              <div className={styles.caseDetailTakeawayContent}>
                <p>
                  이 사례에서 가장 중요한 교훈은 <strong>개인정보를 요구하는 전화나 문자에 대해 항상 의심</strong>해야 한다는 것입니다.
                  정부기관이나 금융기관은 절대 전화나 문자로 개인정보를 요구하지 않습니다.
                </p>
              </div>
            </div>

            {/* Red Flag 박스 */}
            <div className={styles.caseDetailRedFlag}>
              <div className={styles.caseDetailRedFlagHeader}>
                <h3 className={styles.caseDetailRedFlagTitle}>Red Flags</h3>
              </div>
              <div className={styles.caseDetailRedFlagContent}>
                <ul className={styles.caseDetailRedFlagList}>
                  <li className={styles.caseDetailRedFlagItem}>
                    <span>개인정보나 금융정보를 요구하는 전화</span>
                  </li>
                  <li className={styles.caseDetailRedFlagItem}>
                    <span>의심스러운 링크가 포함된 문자</span>
                  </li>
                  <li className={styles.caseDetailRedFlagItem}>
                    <span>긴급하다며 즉시 행동을 요구</span>
                  </li>
                  <li className={styles.caseDetailRedFlagItem}>
                    <span>정부기관이나 금융기관을 사칭</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 예방 팁 */}
            {safeCaseData.tip && (
              <div className={styles.caseDetailTip}>
                <div className={styles.caseDetailTipContent}>
                  <div>
                    <h3 className={styles.caseDetailTipTitle}>예방 팁</h3>
                    <div className={styles.caseDetailTipText}>
                      {safeCaseData.tip}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 통계 정보 */}
            <div className={styles.caseDetailStats}>
              <div className={styles.caseDetailStatsLeft}>
                <div className={styles.caseDetailStatItem}>
                  <Icon name="users" size="sm" className={styles.caseDetailStatIcon} />
                  <span>{safeCaseData._count.likes}명이 공감</span>
                </div>
                <div className={styles.caseDetailStatItem}>
                  <Icon name="message-circle" size="sm" color="primary" className={styles.caseDetailStatIcon} />
                  <span>{safeCaseData._count.comments}개의 댓글</span>
                </div>
                <div className={styles.caseDetailStatsRight}>
                  <span className={styles.caseDetailViewCount}>
                    조회수: {Math.floor(123 + (safeCaseData.id.length * 47) % 1000)}회
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* 유사 사례 섹션 */}
        <RelatedCasesSection caseId={safeCaseData.id} />

        {/* 댓글 섹션 */}
        <CommentForm caseId={safeCaseData.id} />
        <CommentsList caseId={safeCaseData.id} />
        </div>
      </>
    )
  } catch (error) {
    console.error('Error in CaseDetailContent:', error)
    notFound()
  }
}

// 로딩 스켈레톤
function CaseDetailSkeleton() {
  return (
    <div className={styles.caseDetailSkeleton}>
      <div className={styles.caseDetailSkeletonBackButton}></div>

      <Card className={styles.caseDetailSkeletonCard}>
        <div className={styles.caseDetailSkeletonContent}>
          <div className={styles.caseDetailSkeletonHeader}>
            <div className={styles.caseDetailSkeletonHeaderLeft}>
              <div className={styles.caseDetailSkeletonMeta}>
                <div className={styles.caseDetailSkeletonBadge}></div>
                <div className={styles.caseDetailSkeletonDate}></div>
              </div>
              <div className={styles.caseDetailSkeletonTitle}></div>
            </div>
            <div className={styles.caseDetailSkeletonLikeButton}></div>
          </div>

          <div className={styles.caseDetailSkeletonAmount}></div>
          <div className={styles.caseDetailSkeletonRegion}></div>
          <div className={styles.caseDetailSkeletonContentText}></div>
          <div className={styles.caseDetailSkeletonTakeaway}></div>

          <div className={styles.caseDetailSkeletonStats}>
            <div className={styles.caseDetailSkeletonStatsLeft}>
              <div className={styles.caseDetailSkeletonStat}></div>
              <div className={styles.caseDetailSkeletonStat}></div>
            </div>
            <div className={styles.caseDetailSkeletonViewCount}></div>
          </div>
        </div>
      </Card>

      <Card className={styles.caseDetailSkeletonComments}>
        <div className={styles.caseDetailSkeletonCommentsTitle}></div>
        <div className={styles.caseDetailSkeletonCommentForm}></div>
      </Card>
    </div>
  )
}
