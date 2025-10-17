'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Icon from '@/components/atoms/Icon'
import { useComments, useDeleteComment, useUpdateComment } from '@/hooks/useQueries'
import { Comment } from '@/lib/api'
import { useState } from 'react'
import styles from './styles.module.scss'

interface CommentsListProps {
  caseId: string
}

export default function CommentsList({ caseId }: CommentsListProps) {
  const { data: comments = [], isLoading } = useComments(caseId)
  const updateCommentMutation = useUpdateComment()
  const deleteCommentMutation = useDeleteComment()
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id)
    setEditContent(comment.content)
  }

  const handleSaveEdit = async (commentId: string) => {
    if (!editContent.trim()) return

    try {
      await updateCommentMutation.mutateAsync({
        caseId,
        commentId,
        data: { content: editContent.trim() }
      })
      setEditingCommentId(null)
      setEditContent('')
    } catch (error) {
      console.error('Failed to update comment:', error)
      alert('댓글 수정에 실패했습니다.')
    }
  }

  const handleCancelEdit = () => {
    setEditingCommentId(null)
    setEditContent('')
  }

  const handleDelete = async (commentId: string) => {
    if (!confirm('정말로 이 댓글을 삭제하시겠습니까?')) return

    try {
      await deleteCommentMutation.mutateAsync({ caseId, commentId })
    } catch (error) {
      console.error('Failed to delete comment:', error)
      alert('댓글 삭제에 실패했습니다.')
    }
  }

  if (isLoading) {
    return (
      <Card className={styles.commentsList}>
        <h2 className={styles.commentsListTitle}>댓글</h2>
        <div className={styles.commentsListLoading}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.commentSkeleton}>
              <div className={styles.commentSkeletonHeader}>
                <div className={styles.commentSkeletonNickname}></div>
                <div className={styles.commentSkeletonDate}></div>
              </div>
              <div className={styles.commentSkeletonContent}></div>
            </div>
          ))}
        </div>
      </Card>
    )
  }

  if (comments.length === 0) {
    return (
      <Card className={styles.commentsList}>
        <h2 className={styles.commentsListTitle}>댓글</h2>
        <div className={styles.commentsListEmpty}>
          <Icon name="message-circle" size="lg" color="secondary" />
          <p>아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!</p>
        </div>
      </Card>
    )
  }

  return (
    <Card className={styles.commentsList}>
      <h2 className={styles.commentsListTitle}>댓글 ({comments.length})</h2>
      <div className={styles.commentsListContent}>
        {comments.map((comment: Comment) => (
          <div key={comment.id} className={styles.commentItem}>
            <div className={styles.commentHeader}>
              <div className={styles.commentAuthor}>
                <Icon name="user" size="sm" color="primary" className={styles.commentAuthorIcon} />
                <span className={styles.commentNickname}>{comment.nickname}</span>
              </div>
              <div className={styles.commentMeta}>
                <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
                {comment.updatedAt !== comment.createdAt && (
                  <span className={styles.commentEdited}>(수정됨)</span>
                )}
              </div>
            </div>

            <div className={styles.commentContent}>
              {editingCommentId === comment.id ? (
                <div className={styles.commentEditForm}>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className={styles.commentEditTextarea}
                    rows={3}
                    placeholder="댓글 내용을 입력하세요"
                  />
                  <div className={styles.commentEditActions}>
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleSaveEdit(comment.id)}
                      loading={updateCommentMutation.isPending}
                      disabled={!editContent.trim()}
                    >
                      저장
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCancelEdit}
                    >
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <div className={styles.commentText}>
                  {comment.content}
                </div>
              )}
            </div>

            {editingCommentId !== comment.id && (
              <div className={styles.commentActions}>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleEdit(comment)}
                  className={styles.commentActionButton}
                >
                  <Icon name="edit" size="sm" />
                  수정
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(comment.id)}
                  loading={deleteCommentMutation.isPending}
                  className={styles.commentActionButton}
                >
                  <Icon name="trash" size="sm" />
                  삭제
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
