'use client'

import { useCallback, useEffect, useRef } from 'react'

// 메모리 캐시 인터페이스
interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

class MemoryCache {
  private cache = new Map<string, CacheItem<unknown>>()
  private maxSize = 100

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // 캐시 크기 제한
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value
      if (firstKey !== undefined) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key)

    if (!item) {
      return null
    }

    // TTL 확인
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key)
      return null
    }

    return item.data as T | null
  }

  delete(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  size(): number {
    return this.cache.size
  }
}

// 전역 캐시 인스턴스
const memoryCache = new MemoryCache()

// 캐시 키 생성기
export function generateCacheKey(prefix: string, params: Record<string, unknown>): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${JSON.stringify(params[key])}`)
    .join('&')

  return `${prefix}:${sortedParams}`
}

// 캐시된 데이터 페칭 훅
export function useCachedFetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: {
    ttl?: number
    staleWhileRevalidate?: boolean
    revalidateOnFocus?: boolean
  } = {}
) {
  const {
    ttl = 5 * 60 * 1000, // 5분
    staleWhileRevalidate = true,
    revalidateOnFocus = false,
  } = options

  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchData = useCallback(async (): Promise<T> => {
    // 기존 요청 취소
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    // 새로운 AbortController 생성
    abortControllerRef.current = new AbortController()

    try {
      const data = await fetchFn()

      // 캐시에 저장
      memoryCache.set(key, data, ttl)

      return data
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw error
      }

      // 에러 발생 시 캐시된 데이터 반환 (stale-while-revalidate)
      if (staleWhileRevalidate) {
        const cachedData = memoryCache.get<T>(key)
        if (cachedData) {
          return cachedData
        }
      }

      throw error
    }
  }, [key, fetchFn, ttl, staleWhileRevalidate])

  const getCachedData = useCallback((): T | null => {
    return memoryCache.get<T>(key)
  }, [key])

  const invalidateCache = useCallback((): void => {
    memoryCache.delete(key)
  }, [key])

  // 포커스 시 재검증
  useEffect(() => {
    if (!revalidateOnFocus) return

    const handleFocus = () => {
      const cachedData = memoryCache.get<T>(key)
      if (cachedData) {
        // 백그라운드에서 재검증
        fetchData().catch(() => {
          // 에러 무시 (캐시된 데이터 사용)
        })
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [key, fetchData, revalidateOnFocus])

  return {
    fetchData,
    getCachedData,
    invalidateCache,
  }
}

// API 응답 캐싱 훅
export function useApiCache<T>(
  endpoint: string,
  params: Record<string, unknown> = {},
  options: {
    ttl?: number
    staleWhileRevalidate?: boolean
  } = {}
) {
  const cacheKey = generateCacheKey(`api:${endpoint}`, params)

  const fetchFn = async (): Promise<T> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
    const url = new URL(endpoint, baseUrl)
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value))
      }
    })

    const response = await fetch(url.toString())

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  return useCachedFetch(cacheKey, fetchFn, options)
}

// 로컬 스토리지 캐시
export class LocalStorageCache {
  private prefix: string

  constructor(prefix: string = 'aga-blog-cache') {
    this.prefix = prefix
  }

  private getKey(key: string): string {
    return `${this.prefix}:${key}`
  }

  set<T>(key: string, data: T, ttl: number = 24 * 60 * 60 * 1000): void {
    try {
      const item = {
        data,
        timestamp: Date.now(),
        ttl,
      }
      localStorage.setItem(this.getKey(key), JSON.stringify(item))
    } catch (error) {
      console.warn('로컬 스토리지 저장 실패:', error)
    }
  }

  get<T>(key: string): T | null {
    try {
      const itemStr = localStorage.getItem(this.getKey(key))
      if (!itemStr) return null

      const item = JSON.parse(itemStr)

      // TTL 확인
      if (Date.now() - item.timestamp > item.ttl) {
        this.delete(key)
        return null
      }

      return item.data
    } catch (error) {
      console.warn('로컬 스토리지 읽기 실패:', error)
      return null
    }
  }

  delete(key: string): void {
    try {
      localStorage.removeItem(this.getKey(key))
    } catch (error) {
      console.warn('로컬 스토리지 삭제 실패:', error)
    }
  }

  clear(): void {
    try {
      const keys = Object.keys(localStorage)
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn('로컬 스토리지 초기화 실패:', error)
    }
  }
}

// 전역 로컬 스토리지 캐시 인스턴스
export const localStorageCache = new LocalStorageCache()

// 캐시 통계
export function getCacheStats() {
  return {
    memoryCacheSize: memoryCache.size(),
    localStorageSize: (() => {
      try {
        return Object.keys(localStorage).length
      } catch {
        return 0
      }
    })(),
  }
}
