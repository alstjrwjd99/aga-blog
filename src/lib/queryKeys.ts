// Query Keys for React Query
export const queryKeys = {
  // Cases 관련 쿼리 키
  cases: {
    all: ['cases'] as const,
    lists: () => [...queryKeys.cases.all, 'list'] as const,
    list: (filters: CaseFilters) => [...queryKeys.cases.lists(), { filters }] as const,
    details: () => [...queryKeys.cases.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.cases.details(), id] as const,
  },
  
  // Statistics 관련 쿼리 키
  statistics: {
    all: ['statistics'] as const,
    overview: () => [...queryKeys.statistics.all, 'overview'] as const,
    category: () => [...queryKeys.statistics.all, 'category'] as const,
    region: () => [...queryKeys.statistics.all, 'region'] as const,
  },
  
  // Comments 관련 쿼리 키
  comments: {
    all: ['comments'] as const,
    lists: () => [...queryKeys.comments.all, 'list'] as const,
    list: (caseId: string) => [...queryKeys.comments.lists(), caseId] as const,
  },
  
  // Likes 관련 쿼리 키
  likes: {
    all: ['likes'] as const,
    detail: (caseId: string) => [...queryKeys.likes.all, caseId] as const,
  },
} as const

// Case Filters 타입 정의
export interface CaseFilters {
  search?: string
  category?: string
  region?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}
