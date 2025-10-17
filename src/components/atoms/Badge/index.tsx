import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface BadgeProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = ''
}: BadgeProps) {
  const baseClasses = styles.badge

  const variantClasses = {
    primary: styles.badgePrimary,
    secondary: styles.badgeSecondary,
    success: styles.badgeSuccess,
    warning: styles.badgeWarning,
    danger: styles.badgeDanger,
    info: styles.badgeInfo
  }

  const sizeClasses = {
    sm: styles.badgeSm,
    md: styles.badgeMd,
    lg: styles.badgeLg
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  return (
    <span className={classes}>
      {children}
    </span>
  )
}
