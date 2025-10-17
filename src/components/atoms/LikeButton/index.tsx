'use client'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import { useLikeStatus, useToggleLike } from '@/hooks/useQueries'

interface LikeButtonProps {
  caseId: string
}

export default function LikeButton({ caseId }: LikeButtonProps) {
  const { data: likeStatus, isLoading } = useLikeStatus(caseId)
  const toggleLikeMutation = useToggleLike()

  const handleLike = async () => {
    try {
      await toggleLikeMutation.mutateAsync(caseId)
    } catch (error) {
      console.error('공감 처리 오류:', error)
    }
  }

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Icon name="users" size="sm" color="secondary" />
        <span className="ml-2">로딩 중...</span>
      </Button>
    )
  }

  const isLiked = likeStatus?.liked || false
  const count = likeStatus?.totalLikes || 0

  return (
    <Button
      variant={isLiked ? "danger" : "outline"}
      size="sm"
      onClick={handleLike}
      loading={toggleLikeMutation.isPending}
      className="flex items-center space-x-2"
    >
      <Icon
        name="users"
        size="sm"
        color={isLiked ? "danger" : "secondary"}
        className={isLiked ? "fill-current" : ""}
      />
      <span>{count}</span>
    </Button>
  )
}
