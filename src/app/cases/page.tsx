import CasesPageLayout from '@/components/templates/CasesPageLayout'
import { seoMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import { Suspense } from 'react'
import styles from './page.module.scss'

export const metadata: Metadata = seoMetadata.cases()

// 사례 목록 페이지 컴포넌트
export default function CasesPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <Suspense fallback={<div>로딩 중...</div>}>
          <CasesPageLayout />
        </Suspense>
      </div>
    </div>
  )
}
