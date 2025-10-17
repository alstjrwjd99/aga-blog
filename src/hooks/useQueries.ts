import { casesApi, commentsApi, likesApi, searchApi, statisticsApi } from '@/lib/api'
import { CaseFilters, queryKeys } from '@/lib/queryKeys'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Cases 훅들
export const useCases = (filters: CaseFilters = {}) => {
  return useQuery({
    queryKey: queryKeys.cases.list(filters),
    queryFn: () => casesApi.getCases(filters),
    staleTime: 5 * 60 * 1000, // 5분
  })
}

export const useCase = (id: string) => {
  return useQuery({
    queryKey: queryKeys.cases.detail(id),
    queryFn: () => casesApi.getCase(id),
    enabled: !!id,
  })
}

export const useRelatedCases = (caseId: string, limit: number = 2) => {
  return useQuery({
    queryKey: ['relatedCases', caseId, limit],
    queryFn: () => casesApi.getRelatedCases(caseId, limit),
    enabled: !!caseId,
    staleTime: 10 * 60 * 1000, // 10분
  })
}

export const useCreateCase = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: casesApi.createCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.all })
    },
  })
}

export const useUpdateCase = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      casesApi.updateCase(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.all })
    },
  })
}

export const useDeleteCase = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: casesApi.deleteCase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.all })
    },
  })
}

// Statistics 훅들
export const useStatistics = () => {
  return useQuery({
    queryKey: queryKeys.statistics.overview(),
    queryFn: statisticsApi.getStatistics,
    staleTime: 10 * 60 * 1000, // 10분
  })
}

// Comments 훅들
export const useComments = (caseId: string) => {
  return useQuery({
    queryKey: queryKeys.comments.list(caseId),
    queryFn: () => commentsApi.getComments(caseId),
    enabled: !!caseId,
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ caseId, data }: { caseId: string; data: { nickname: string; content: string } }) =>
      commentsApi.createComment(caseId, data),
    onSuccess: (_, { caseId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.list(caseId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) })
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ caseId, commentId, data }: { caseId: string; commentId: string; data: { content: string } }) =>
      commentsApi.updateComment(caseId, commentId, data),
    onSuccess: (_, { caseId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.list(caseId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ caseId, commentId }: { caseId: string; commentId: string }) =>
      commentsApi.deleteComment(caseId, commentId),
    onSuccess: (_, { caseId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.comments.list(caseId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) })
    },
  })
}

// Likes 훅들
export const useLikeStatus = (caseId: string) => {
  return useQuery({
    queryKey: queryKeys.likes.detail(caseId),
    queryFn: () => likesApi.getLikeStatus(caseId),
    enabled: !!caseId,
  })
}

export const useToggleLike = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: likesApi.toggleLike,
    onSuccess: (_, caseId) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.likes.detail(caseId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.detail(caseId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.cases.all })
    },
  })
}

// Search 훅들
export const useSearchSuggestions = (query: string) => {
  return useQuery({
    queryKey: ['search-suggestions', query],
    queryFn: () => searchApi.getSearchSuggestions(query),
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5분
  })
}

// Categories 훅
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await fetch('/api/categories')
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      return response.json()
    },
    staleTime: 30 * 60 * 1000, // 30분
  })
}
