import { useEffect } from 'react'

interface LogVisitParams {
  page: string
  referrer?: string
}

export function useLogVisit({ page, referrer }: LogVisitParams) {
  useEffect(() => {
    const logVisit = async () => {
      try {
        await fetch('/api/visits', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            page,
            referrer: referrer || document.referrer || null
          })
        })
      } catch (error) {
        console.error('방문 로깅 실패:', error)
      }
    }

    logVisit()
  }, [page, referrer])
}
