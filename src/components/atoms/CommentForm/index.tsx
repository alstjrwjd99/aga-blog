'use client'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import { useCreateComment } from '@/hooks/useQueries'
import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

interface CommentFormProps {
  caseId: string
}

export default function CommentForm({ caseId }: CommentFormProps) {
  const [nickname, setNickname] = useState('')
  const [content, setContent] = useState('')
  const [isNicknameLocked, setIsNicknameLocked] = useState(false)
  const createCommentMutation = useCreateComment()

  // Load nickname from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aga_comment_nickname')
      if (saved) {
        setNickname(saved)
        setIsNicknameLocked(true)
      }
    }
  }, [])

  // Save nickname on change
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNicknameLocked) return // 닉네임이 잠긴 경우 변경 불가

    const value = e.target.value.trim()
    setNickname(e.target.value) // Keep the raw value for input display
    if (typeof window !== 'undefined') {
      localStorage.setItem('aga_comment_nickname', value)
      if (value) {
        setIsNicknameLocked(true) // 닉네임이 입력되면 잠금
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nickname.trim() || !content.trim()) {
      alert('닉네임과 댓글 내용을 모두 입력해주세요.')
      return
    }

    try {
      await createCommentMutation.mutateAsync({
        caseId,
        data: {
          nickname: nickname.trim(),
          content: content.trim()
        }
      })

      setContent('')
      alert('댓글이 등록되었습니다.')
    } catch (error) {
      console.error('댓글 등록 오류:', error)
      alert('댓글 등록 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className={styles.commentForm}>
      <div className={styles.commentFormHeader}>
        <Icon name="message-circle" size="sm" color="primary" className={styles.commentFormIcon} />
        <h3 className={styles.commentFormTitle}>댓글 작성</h3>
      </div>

      <form onSubmit={handleSubmit} className={styles.commentFormContent}>
        <Input
          label="닉네임"
          name="nickname"
          placeholder={isNicknameLocked ? "닉네임이 설정되었습니다" : "닉네임을 입력하세요"}
          value={nickname}
          onChange={handleNicknameChange}
          icon={<Icon name="user" size="sm" color="secondary" />}
          required
          disabled={isNicknameLocked}
          className={`${styles.commentFormInput} ${isNicknameLocked ? styles.commentFormInputLocked : ''}`}
        />

        <div className={styles.commentFormTextareaGroup}>
          <label className={styles.commentFormLabel}>
            댓글 내용
          </label>
          <textarea
            name="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="댓글을 입력하세요"
            className={styles.commentFormTextarea}
            autoFocus={false}
            required
          />
        </div>

        <div className={styles.commentFormActions}>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={createCommentMutation.isPending}
            disabled={!nickname.trim() || !content.trim()}
            className={styles.commentFormButton}
          >
            <Icon name="message-circle" size="sm" className={styles.commentFormButtonIcon} />
            댓글 작성
          </Button>
        </div>
      </form>
    </div>
  )
}
