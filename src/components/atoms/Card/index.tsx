'use client'
import styles from './styles.module.scss'

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  'aria-label'?: string
  role?: string
}

export default function Card({
  children,
  className = '',
  interactive = false,
  padding = 'md',
  shadow = 'md',
  'aria-label': ariaLabel,
  role
}: CardProps) {
  const baseClasses = styles.card

  const paddingClasses = {
    none: '',
    sm: styles.cardPaddingSm,
    md: styles.cardPaddingMd,
    lg: styles.cardPaddingLg,
    xl: styles.cardPaddingXl
  }

  const shadowClasses = {
    none: '',
    sm: styles.cardShadowSm,
    md: styles.cardShadowMd,
    lg: styles.cardShadowLg,
    xl: styles.cardShadowXl,
    '2xl': styles.cardShadow2xl
  }

  const interactiveClasses = interactive ? styles.cardInteractive : ''

  const classes = `${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${interactiveClasses} ${className}`.trim()

  return (
    <div
      className={classes}
      aria-label={ariaLabel}
      role={role}
      tabIndex={interactive ? 0 : undefined}
    >
      {children}
    </div>
  )
}
