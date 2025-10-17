import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div className={styles.pageLayout}>
      <Header />
      <main className={styles.mainContent}>
        <div className={`${styles.container} ${className}`}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
