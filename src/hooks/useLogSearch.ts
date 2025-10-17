import { useCallback } from 'react'

export function useLogSearch() {
  const logSearch = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) return

    try {
      await fetch('/api/search/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: query.trim()
        })
      })
    } catch (error) {
      console.error('검색 로깅 실패:', error)
    }
  }, [])

  return { logSearch }
}
