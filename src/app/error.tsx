'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import { useEffect } from 'react'
import styles from './error.module.scss'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // 에러 로깅
    console.error('Application error:', error)
  }, [error])

  return (
    <div className={styles.errorContainer}>
      <Container className={styles.textCenter}>
        <Card className={styles.errorCard}>
          <div className={styles.errorContent}>
            {/* 에러 아이콘 */}
            <div className={styles.errorIconContainer}>
              <div className={styles.errorIcon}>
                <Icon name="alert-triangle" size="xl" color="danger" />
              </div>
            </div>

            {/* 에러 메시지 */}
            <div className={styles.errorMessage}>
              <h1 className={styles.errorTitle}>오류가 발생했습니다</h1>
              <p className={styles.errorDescription}>
                예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
              </p>
              {process.env.NODE_ENV === 'development' && (
                <div className={styles.errorDetails}>
                  <p className={styles.errorDetailsText}>
                    {error.message}
                  </p>
                </div>
              )}
            </div>

            {/* 액션 버튼들 */}
            <div className={styles.errorActions}>
              <Button onClick={reset} variant="primary" size="lg">
                <Icon name="refresh-cw" size="sm" />
                다시 시도
              </Button>
              <Button href="/" variant="outline" size="lg">
                <Icon name="home" size="sm" />
                홈으로 돌아가기
              </Button>
            </div>

            {/* 도움말 */}
            <div className={styles.errorHelp}>
              <div className={styles.errorHelpContent}>
                <Icon name="alert-triangle" size="lg" color="warning" className={styles.errorHelpIcon} />
                <div className={styles.errorHelpText}>
                  <h3 className={styles.errorHelpTitle}>문제가 지속되나요?</h3>
                  <p className={styles.errorHelpDescription}>
                    문제가 계속 발생한다면 다음을 확인해보세요:
                  </p>
                  <ul className={styles.errorHelpList}>
                    <li>• 인터넷 연결 상태를 확인해보세요</li>
                    <li>• 브라우저를 새로고침해보세요</li>
                    <li>• 잠시 후 다시 시도해보세요</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  )
}
