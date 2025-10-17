import { useCallback } from 'react'

export function useVisitTracker() {
  const trackVisit = useCallback(async (page?: string, referrer?: string) => {
    try {
      const currentPage = page || window.location.pathname

      // 1. 세션 스토리지에서 방문 기록 확인 (브라우저 세션 동안)
      const sessionKey = `visit_${currentPage}`
      const hasVisitedSession = sessionStorage.getItem(sessionKey)

      if (hasVisitedSession) {
        // 이미 이 세션에서 방문한 경우 스킵
        return
      }

      // 2. 로컬 스토리지에서 최근 방문 확인 (24시간)
      const localStorageKey = `visit_${currentPage}_${new Date().toDateString()}`
      const hasVisitedToday = localStorage.getItem(localStorageKey)

      if (hasVisitedToday) {
        // 오늘 이미 방문한 경우 스킵
        return
      }

      // 방문 기록 API 호출
      const response = await fetch('/api/visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: currentPage,
          referrer: referrer || document.referrer,
        }),
      })

      if (response.ok) {
        const result = await response.json()

        if (!result.skipped) {
          // 성공적으로 기록된 경우 마킹
          sessionStorage.setItem(sessionKey, 'true')
          localStorage.setItem(localStorageKey, 'true')

          // 로컬 스토리지 정리 (7일 이상 된 기록 삭제)
          const sevenDaysAgo = new Date()
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

          Object.keys(localStorage).forEach(key => {
            if (key.startsWith('visit_') && key.includes('_')) {
              const dateStr = key.split('_').pop()
              if (dateStr) {
                const visitDate = new Date(dateStr)
                if (visitDate < sevenDaysAgo) {
                  localStorage.removeItem(key)
                }
              }
            }
          })
        }
      }
    } catch (error) {
      console.error('방문 기록 실패:', error)
    }
  }, [])

  return { trackVisit }
}
