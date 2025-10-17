'use client'

import { lazy, Suspense } from 'react'

// 기본 로딩 스피너
const DefaultFallback = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
  </div>
)

// 동적 컴포넌트 로더 함수
export function createLazyComponent(
  importFunc: () => Promise<any>,
  fallback?: React.ReactNode
) {
  const LazyComponent = lazy(importFunc)

  return function LazyWrapper(props: any) {
    const { fallback: propFallback, ...restProps } = props
    const fallbackElement = (propFallback as React.ReactNode) || fallback || <DefaultFallback />

    return (
      <Suspense fallback={fallbackElement}>
        <LazyComponent {...restProps} />
      </Suspense>
    )
  }
}

// 자주 사용되는 컴포넌트들의 지연 로딩
export const LazyStatisticsChart = createLazyComponent(
  () => import('@/app/statistics/page'),
  <div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>
)

export const LazyCaseDetail = createLazyComponent(
  () => import('@/app/cases/[slug]/page'),
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
    <div className="h-32 bg-gray-200 animate-pulse rounded"></div>
  </div>
)

export const LazyCommentsSection = createLazyComponent(
  () => import('@/app/cases/[slug]/page'),
  <div className="space-y-3">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-16 bg-gray-200 animate-pulse rounded"></div>
    ))}
  </div>
)

export const LazyStatisticsPage = createLazyComponent(
  () => import('@/app/statistics/page'),
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
    <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
  </div>
)

export const LazySearchPage = createLazyComponent(
  () => import('@/app/search/page'),
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
    <div className="h-32 bg-gray-200 animate-pulse rounded"></div>
  </div>
)
