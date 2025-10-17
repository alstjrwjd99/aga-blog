'use client'

import React, { useEffect, useState } from 'react'

interface PerformanceMetrics {
  fcp: number | null // First Contentful Paint
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
}

export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
  })

  useEffect(() => {
    // Web Vitals 측정
    const measureWebVitals = () => {
      // FCP (First Contentful Paint)
      if ('PerformanceObserver' in window) {
        const fcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
          if (fcpEntry) {
            setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }))
          }
        })
        fcpObserver.observe({ entryTypes: ['paint'] })

        // LCP (Largest Contentful Paint)
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          if (lastEntry) {
            setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
          }
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // CLS (Cumulative Layout Shift)
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput: boolean; value: number }
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value
            }
          }
          setMetrics(prev => ({ ...prev, cls: clsValue }))
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        // FID (First Input Delay)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const fidEntry = entries[0] as PerformanceEventTiming
          if (fidEntry) {
            setMetrics(prev => ({ ...prev, fid: fidEntry.processingStart - fidEntry.startTime }))
          }
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // TTFB (Time to First Byte)
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        if (navigationEntry) {
          const ttfb = navigationEntry.responseStart - navigationEntry.requestStart
          setMetrics(prev => ({ ...prev, ttfb }))
        }
      }
    }

    // 페이지 로드 완료 후 측정
    if (document.readyState === 'complete') {
      measureWebVitals()
    } else {
      window.addEventListener('load', measureWebVitals)
    }

    return () => {
      window.removeEventListener('load', measureWebVitals)
    }
  }, [])

  return metrics
}

// 성능 점수 계산
export function calculatePerformanceScore(metrics: PerformanceMetrics): {
  score: number
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  recommendations: string[]
} {
  const recommendations: string[] = []
  let score = 100

  // FCP 점수 (0-25점)
  if (metrics.fcp !== null) {
    if (metrics.fcp <= 1800) {
      score -= 0
    } else if (metrics.fcp <= 3000) {
      score -= 5
      recommendations.push('First Contentful Paint를 개선하세요 (현재: ' + Math.round(metrics.fcp) + 'ms)')
    } else {
      score -= 15
      recommendations.push('First Contentful Paint가 너무 느립니다 (현재: ' + Math.round(metrics.fcp) + 'ms)')
    }
  }

  // LCP 점수 (0-25점)
  if (metrics.lcp !== null) {
    if (metrics.lcp <= 2500) {
      score -= 0
    } else if (metrics.lcp <= 4000) {
      score -= 5
      recommendations.push('Largest Contentful Paint를 개선하세요 (현재: ' + Math.round(metrics.lcp) + 'ms)')
    } else {
      score -= 15
      recommendations.push('Largest Contentful Paint가 너무 느립니다 (현재: ' + Math.round(metrics.lcp) + 'ms)')
    }
  }

  // FID 점수 (0-25점)
  if (metrics.fid !== null) {
    if (metrics.fid <= 100) {
      score -= 0
    } else if (metrics.fid <= 300) {
      score -= 5
      recommendations.push('First Input Delay를 개선하세요 (현재: ' + Math.round(metrics.fid) + 'ms)')
    } else {
      score -= 15
      recommendations.push('First Input Delay가 너무 느립니다 (현재: ' + Math.round(metrics.fid) + 'ms)')
    }
  }

  // CLS 점수 (0-25점)
  if (metrics.cls !== null) {
    if (metrics.cls <= 0.1) {
      score -= 0
    } else if (metrics.cls <= 0.25) {
      score -= 5
      recommendations.push('Cumulative Layout Shift를 개선하세요 (현재: ' + metrics.cls.toFixed(3) + ')')
    } else {
      score -= 15
      recommendations.push('Cumulative Layout Shift가 너무 큽니다 (현재: ' + metrics.cls.toFixed(3) + ')')
    }
  }

  // 등급 결정
  let grade: 'A' | 'B' | 'C' | 'D' | 'F'
  if (score >= 90) grade = 'A'
  else if (score >= 80) grade = 'B'
  else if (score >= 70) grade = 'C'
  else if (score >= 60) grade = 'D'
  else grade = 'F'

  return { score, grade, recommendations }
}

// 성능 모니터링 컴포넌트
export function PerformanceMonitor() {
  const metrics = usePerformanceMetrics()
  const { score, grade, recommendations } = calculatePerformanceScore(metrics)

  return React.createElement('div', { className: 'performance-monitor' },
    React.createElement('h3', null, `성능 점수: ${score}점 (${grade}등급)`),
    React.createElement('div', { className: 'metrics-grid' },
      React.createElement('div', { className: 'metric' },
        React.createElement('span', null, `FCP: ${metrics.fcp ? Math.round(metrics.fcp) + 'ms' : '측정 중...'}`)
      ),
      React.createElement('div', { className: 'metric' },
        React.createElement('span', null, `LCP: ${metrics.lcp ? Math.round(metrics.lcp) + 'ms' : '측정 중...'}`)
      ),
      React.createElement('div', { className: 'metric' },
        React.createElement('span', null, `FID: ${metrics.fid ? Math.round(metrics.fid) + 'ms' : '측정 중...'}`)
      ),
      React.createElement('div', { className: 'metric' },
        React.createElement('span', null, `CLS: ${metrics.cls ? metrics.cls.toFixed(3) : '측정 중...'}`)
      ),
      React.createElement('div', { className: 'metric' },
        React.createElement('span', null, `TTFB: ${metrics.ttfb ? Math.round(metrics.ttfb) + 'ms' : '측정 중...'}`)
      )
    ),
    recommendations.length > 0 && React.createElement('div', { className: 'recommendations' },
      React.createElement('h4', null, '개선 권장사항:'),
      React.createElement('ul', null,
        recommendations.map((rec, index) =>
          React.createElement('li', { key: index }, rec)
        )
      )
    )
  )
}
