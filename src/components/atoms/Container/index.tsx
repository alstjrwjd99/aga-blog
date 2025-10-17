import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface ContainerProps {
  children: ReactNode
  className?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export default function Container({
  children,
  className = '',
  maxWidth = 'xl'
}: ContainerProps) {
  const maxWidthClasses = {
    sm: styles.containerSm,
    md: styles.containerMd,
    lg: styles.containerLg,
    xl: styles.containerXl,
    '2xl': styles.container2xl,
    full: styles.containerFull
  }

  return (
    <div className={`${styles.container} ${maxWidthClasses[maxWidth]} ${className}`}>
      {children}
    </div>
  )
}
