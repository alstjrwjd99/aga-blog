'use client'

import { useVisitTracker } from '@/hooks/useVisitTracker'
import { useEffect } from 'react'

export default function VisitTracker() {
  const { trackVisit } = useVisitTracker()

  useEffect(() => {
    // 페이지 로드 시 방문 기록
    trackVisit()
  }, [trackVisit])

  return null // UI가 없는 컴포넌트
}
