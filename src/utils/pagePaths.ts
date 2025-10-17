// Page Path Utilities
// ===================

import { SITE_URL } from '@/constants/globals'

/**
 * 페이지 경로 상수
 */
export const pagePath = {
  // 기본 경로
  home: () => '/',
  about: () => '/about',
  guide: () => '/guide',
  search: () => '/search',

  // 사례 관련
  cases: () => '/cases',
  caseDetail: (id: string) => `/cases/${id}`,
  caseSubmit: () => '/cases/submit',

  // 통계
  statistics: () => '/statistics',

  // API 경로
  api: {
    cases: () => '/api/cases',
    caseDetail: (id: string) => `/api/cases/${id}`,
    caseComments: (id: string) => `/api/cases/${id}/comments`,
    caseLike: (id: string) => `/api/cases/${id}/like`,
    statistics: () => '/api/statistics'
  }
} as const

/**
 * 전체 URL 생성
 * @param path - 상대 경로
 * @returns 전체 URL
 */
export const getFullUrl = (path: string): string => {
  return `${SITE_URL}${path}`
}

/**
 * 쿼리 파라미터를 문자열로 변환
 * @param params - 쿼리 파라미터 객체
 * @returns 쿼리 문자열
 */
export const buildQueryString = (params: Record<string, string | number | boolean | undefined>): string => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value))
    }
  })

  return searchParams.toString()
}

/**
 * URL에서 쿼리 파라미터 파싱
 * @param search - 쿼리 문자열
 * @returns 파싱된 파라미터 객체
 */
export const parseQueryString = (search: string): Record<string, string> => {
  const params = new URLSearchParams(search)
  const result: Record<string, string> = {}

  for (const [key, value] of params.entries()) {
    result[key] = value
  }

  return result
}

/**
 * 정규화된 URL 생성 (canonical URL)
 * @param path - 경로
 * @param query - 쿼리 파라미터
 * @returns 정규화된 URL
 */
export const getCanonicalUrl = (path: string, query?: Record<string, string | number | boolean | undefined>): string => {
  const baseUrl = getFullUrl(path)

  if (query) {
    const queryString = buildQueryString(query)
    return queryString ? `${baseUrl}?${queryString}` : baseUrl
  }

  return baseUrl
}

/**
 * SEO 친화적인 URL 생성
 * @param path - 경로
 * @param query - 쿼리 파라미터
 * @returns SEO 친화적인 URL
 */
export const getSeoFriendlyUrl = (path: string, query?: Record<string, string | number | boolean | undefined>): string => {
  return getCanonicalUrl(path, query)
}
