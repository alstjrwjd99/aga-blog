import { kv } from '@vercel/kv'

// 캐시 키 상수
export const CACHE_KEYS = {
  POPULAR_CASES: 'popular_cases',
  RECENT_CASES: 'recent_cases',
  STATISTICS: 'statistics',
  SEARCH_SUGGESTIONS: 'search_suggestions',
  CATEGORY_COUNTS: 'category_counts',
} as const

// 캐시 TTL (Time To Live) 상수 (초 단위)
export const CACHE_TTL = {
  POPULAR_CASES: 3600, // 1시간
  RECENT_CASES: 1800,  // 30분
  STATISTICS: 3600,    // 1시간
  SEARCH_SUGGESTIONS: 7200, // 2시간
  CATEGORY_COUNTS: 3600,    // 1시간
} as const

// 캐시 유틸리티 함수들
export class CacheService {
  // 데이터 가져오기 (캐시 우선)
  static async get<T>(key: string): Promise<T | null> {
    try {
      const cached = await kv.get<T>(key)
      return cached
    } catch (error) {
      console.error(`캐시 조회 오류 (${key}):`, error)
      return null
    }
  }

  // 데이터 저장하기
  static async set<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      if (ttl) {
        await kv.setex(key, ttl, value)
      } else {
        await kv.set(key, value)
      }
      return true
    } catch (error) {
      console.error(`캐시 저장 오류 (${key}):`, error)
      return false
    }
  }

  // 데이터 삭제하기
  static async del(key: string): Promise<boolean> {
    try {
      await kv.del(key)
      return true
    } catch (error) {
      console.error(`캐시 삭제 오류 (${key}):`, error)
      return false
    }
  }

  // 여러 키 삭제하기
  static async delMultiple(keys: string[]): Promise<boolean> {
    try {
      await kv.del(...keys)
      return true
    } catch (error) {
      console.error(`캐시 다중 삭제 오류:`, error)
      return false
    }
  }

  // 캐시 존재 여부 확인
  static async exists(key: string): Promise<boolean> {
    try {
      const result = await kv.exists(key)
      return result === 1
    } catch (error) {
      console.error(`캐시 존재 확인 오류 (${key}):`, error)
      return false
    }
  }

  // TTL 확인
  static async ttl(key: string): Promise<number> {
    try {
      return await kv.ttl(key)
    } catch (error) {
      console.error(`TTL 확인 오류 (${key}):`, error)
      return -1
    }
  }
}

// 특정 기능별 캐시 함수들
export class CaseCache {
  // 인기 사례 캐시
  static async getPopularCases() {
    return CacheService.get(CACHE_KEYS.POPULAR_CASES)
  }

  static async setPopularCases(cases: any[], ttl = CACHE_TTL.POPULAR_CASES) {
    return CacheService.set(CACHE_KEYS.POPULAR_CASES, cases, ttl)
  }

  // 최근 사례 캐시
  static async getRecentCases() {
    return CacheService.get(CACHE_KEYS.RECENT_CASES)
  }

  static async setRecentCases(data: any, ttl = CACHE_TTL.RECENT_CASES) {
    return CacheService.set(CACHE_KEYS.RECENT_CASES, data, ttl)
  }
}

export class StatisticsCache {
  // 통계 데이터 캐시
  static async getStatistics() {
    return CacheService.get(CACHE_KEYS.STATISTICS)
  }

  static async setStatistics(stats: any, ttl = CACHE_TTL.STATISTICS) {
    return CacheService.set(CACHE_KEYS.STATISTICS, stats, ttl)
  }

  // 카테고리별 카운트 캐시
  static async getCategoryCounts() {
    return CacheService.get(CACHE_KEYS.CATEGORY_COUNTS)
  }

  static async setCategoryCounts(counts: any, ttl = CACHE_TTL.CATEGORY_COUNTS) {
    return CacheService.set(CACHE_KEYS.CATEGORY_COUNTS, counts, ttl)
  }
}

export class SearchCache {
  // 검색 제안 캐시
  static async getSearchSuggestions() {
    return CacheService.get(CACHE_KEYS.SEARCH_SUGGESTIONS)
  }

  static async setSearchSuggestions(suggestions: string[], ttl = CACHE_TTL.SEARCH_SUGGESTIONS) {
    return CacheService.set(CACHE_KEYS.SEARCH_SUGGESTIONS, suggestions, ttl)
  }
}
