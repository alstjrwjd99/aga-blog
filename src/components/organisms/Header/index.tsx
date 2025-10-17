'use client'
import styles from './styles.module.scss'

import CustomIcon from '@/components/atoms/CustomIcon'
import NavigationItem from '@/components/molecules/NavigationItem'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'

export default function Header() {
  const router = useRouter()

  // 네비게이션 아이템을 useMemo로 메모이제이션하여 안정성 확보
  const navigationItems = useMemo(() => [
    { href: '/', label: '홈', icon: 'home' },
    { href: '/cases', label: '사례', icon: 'file-text' },
    { href: '/cases/submit', label: '사례 제보', icon: 'report' },
    { href: '/about', label: '소개', icon: 'info' }
  ], [])

  return (
    <header className={styles.mainHeader}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContent}>
          {/* 로고 */}
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoIcon}>
              <CustomIcon name="check" size="sm" color="#ffffff" />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>IT Guy | 아가</span>
              <span className={styles.logoSubtitle}>피싱 방지 센터</span>
            </div>
          </Link>

          {/* 네비게이션 */}
          <nav className={styles.navigation}>
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>

          {/* 모바일 메뉴 버튼 */}
          <button className={styles.mobileMenuButton}>
            <CustomIcon name="menu" size="md" color="#ffffff" />
          </button>
        </div>
      </div>
    </header>
  )
}
