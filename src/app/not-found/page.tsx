import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import styles from './not-found.module.scss'

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <Container className={styles.textCenter}>
        <Card className={styles.notFoundCard}>
          <div className={styles.notFoundContent}>
            {/* 404 아이콘 */}
            <div className={styles.notFoundIconContainer}>
              <div className={styles.notFoundIcon}>
                <Icon name="alert-triangle" size="xl" color="danger" />
              </div>
            </div>

            <div className={styles.notFoundText}>
              <h1 className={styles.notFoundTitle}>404</h1>
              <h2 className={styles.notFoundSubtitle}>페이지를 찾을 수 없습니다</h2>
              <p className={styles.notFoundDescription}>
                요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
              </p>
            </div>

            <div className={styles.notFoundActions}>
              <Button href="/" variant="primary" size="lg">
                <Icon name="home" size="sm" />
                홈으로 돌아가기
              </Button>
              <Button href="/cases" variant="outline" size="lg">
                <Icon name="file-text" size="sm" />
                사례 목록 보기
              </Button>
            </div>

            <div className={styles.notFoundHelp}>
              <div className={styles.notFoundHelpContent}>
                <Icon name="alert-triangle" size="lg" color="primary" className={styles.notFoundHelpIcon} />
                <div className={styles.notFoundHelpText}>
                  <h3 className={styles.notFoundHelpTitle}>도움이 필요하신가요?</h3>
                  <p className={styles.notFoundHelpDescription}>
                    원하시는 정보를 찾지 못하셨다면 다음을 시도해보세요:
                  </p>
                  <ul className={styles.notFoundHelpList}>
                    <li>• URL을 다시 확인해보세요</li>
                    <li>• 검색 기능을 이용해보세요</li>
                    <li>• 사례 목록에서 원하는 내용을 찾아보세요</li>
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
