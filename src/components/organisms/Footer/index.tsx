import Icon from '@/components/atoms/Icon'
import Link from 'next/link'
import styles from './styles.module.scss'

export default function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>
          {/* 브랜드 정보 */}
          <div className={styles.footerBrand}>
            <div className={styles.brandLogo}>
              <Icon name="shield" size="lg" className="text-primary" />
              <span className={styles.brandTitle}>IT Guy | 아가</span>
            </div>
            <p className={styles.brandDescription}>
              피싱으로 더이상 피해자가 나오지 않길 바라며,<br />
              실제 피해 사례를 공유하고 예방 정보를 제공합니다.
            </p>
          </div>

          {/* 빠른 링크 */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>빠른 링크</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/" className={styles.footerLink}>
                  홈
                </Link>
              </li>
              <li>
                <Link href="/cases" className={styles.footerLink}>
                  사례 목록
                </Link>
              </li>
              <li>
                <Link href="/cases/submit" className={styles.footerLink}>
                  사례 제보
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.footerLink}>
                  소개
                </Link>
              </li>
            </ul>
          </div>

          {/* 문의 및 신고 */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>문의 및 신고</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/contact" className={styles.footerLink}>
                  문의하기
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.footerLink}>
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className={styles.footerLink}>
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/report" className={styles.footerLink}>
                  신고요청
                </Link>
              </li>
            </ul>
          </div>

          {/* 긴급 신고 */}
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>긴급 신고</h3>
            <div className={styles.emergencyContacts}>
              <div className={styles.emergencyItem}>
                <Icon name="phone" size="sm" className="text-accent-yellow" />
                <span>112 (경찰)</span>
              </div>
              <div className={styles.emergencyItem}>
                <Icon name="phone" size="sm" className="text-accent-yellow" />
                <span>1332 (금융감독원)</span>
              </div>
              <div className={styles.emergencyItem}>
                <Icon name="phone" size="sm" className="text-accent-yellow" />
                <span>1588-1234 (피싱센터)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 저작권 */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; 2024 IT Guy | 아가. All rights reserved.
          </p>
          <p className={styles.warningText}>
            <Icon name="alert-triangle" size="sm" className="text-accent-yellow" />
            피싱 사기로 인한 피해를 당하셨다면 즉시 경찰서나 금융감독원에 신고하세요.
          </p>
        </div>
      </div>
    </footer>
  )
}
