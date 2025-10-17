// API 함수들
export interface Case {
  id: string
  slug: string
  title: string
  category: string
  amount: number | null
  content: string
  region: string | null
  tip: string | null
  createdAt: string
  updatedAt: string
  _count: {
    comments: number
    likes: number
  }
}

export interface Comment {
  id: string
  nickname: string
  content: string
  createdAt: string
  updatedAt: string
  caseId: string
}

export interface CasesResponse {
  cases: Case[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface StatisticsResponse {
  totalCases: number
  casesByCategory: Array<{
    category: string
    _count: { id: number }
  }>
  amountStats: {
    totalAmount: number
    averageAmount: number
    minAmount: number
    maxAmount: number
  }
  totalComments: number
  totalLikes: number
  recentCases: number
  casesByRegion: Array<{
    region: string
    _count: { id: number }
  }>
}

// Cases API
export const casesApi = {
  // 사례 목록 조회
  getCases: async (filters: {
    search?: string
    category?: string
    region?: string
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
    page?: number
    limit?: number
  } = {}): Promise<CasesResponse> => {
    const params = new URLSearchParams()

    if (filters.search) params.append('search', filters.search)
    if (filters.category) params.append('category', filters.category)
    if (filters.region) params.append('region', filters.region)
    if (filters.sortBy) params.append('sortBy', filters.sortBy)
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)
    if (filters.page) params.append('page', filters.page.toString())
    if (filters.limit) params.append('limit', filters.limit.toString())

    const response = await fetch(`/api/cases?${params.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch cases')
    }
    return response.json()
  },

  // 특정 사례 조회
  getCase: async (id: string): Promise<Case> => {
    const response = await fetch(`/api/cases/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch case')
    }
    return response.json()
  },

  // 사례 등록
  createCase: async (data: {
    title: string
    category: string
    amount?: number
    content: string
    region?: string
    tip?: string
  }): Promise<Case> => {
    const response = await fetch('/api/cases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to create case')
    }
    return response.json()
  },

  // 사례 수정
  updateCase: async (id: string, data: Partial<Case>): Promise<Case> => {
    const response = await fetch(`/api/cases/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to update case')
    }
    return response.json()
  },

  // 사례 삭제
  deleteCase: async (id: string): Promise<void> => {
    const response = await fetch(`/api/cases/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete case')
    }
  },

  // 유사 사례 조회
  getRelatedCases: async (caseId: string, limit: number = 2): Promise<Case[]> => {
    const response = await fetch(`/api/cases/${caseId}/related?limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch related cases')
    }
    return response.json()
  },
}

// Statistics API
export const statisticsApi = {
  getStatistics: async (): Promise<StatisticsResponse> => {
    const response = await fetch('/api/statistics')
    if (!response.ok) {
      throw new Error('Failed to fetch statistics')
    }
    return response.json()
  },
}

// Comments API
export const commentsApi = {
  getComments: async (caseId: string) => {
    const response = await fetch(`/api/cases/${caseId}/comments`)
    if (!response.ok) {
      throw new Error('Failed to fetch comments')
    }
    return response.json()
  },

  createComment: async (caseId: string, data: { nickname: string; content: string }) => {
    const response = await fetch(`/api/cases/${caseId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to create comment')
    }
    return response.json()
  },

  updateComment: async (caseId: string, commentId: string, data: { content: string }) => {
    const response = await fetch(`/api/cases/${caseId}/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      throw new Error('Failed to update comment')
    }
    return response.json()
  },

  deleteComment: async (caseId: string, commentId: string) => {
    const response = await fetch(`/api/cases/${caseId}/comments/${commentId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error('Failed to delete comment')
    }
  },
}

// Likes API
export const likesApi = {
  getLikeStatus: async (caseId: string) => {
    const response = await fetch(`/api/cases/${caseId}/like`)
    if (!response.ok) {
      throw new Error('Failed to fetch like status')
    }
    return response.json()
  },

  toggleLike: async (caseId: string) => {
    const response = await fetch(`/api/cases/${caseId}/like`, {
      method: 'POST',
    })
    if (!response.ok) {
      throw new Error('Failed to toggle like')
    }
    return response.json()
  },
}

// Search API
export const searchApi = {
  // 검색어 추천
  getSearchSuggestions: async (query: string): Promise<string[]> => {
    if (!query || query.length < 2) return []

    const response = await fetch(`/api/search/suggestions?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
      throw new Error('Failed to fetch search suggestions')
    }
    return response.json()
  }
}
