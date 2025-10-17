'use client'
import styles from './styles.module.scss'

import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  type = 'button',
  'aria-label': ariaLabel
}: ButtonProps) {
  const baseClasses = styles.btn
  const variantClasses = {
    primary: styles.btnPrimary,
    secondary: styles.btnSecondary,
    danger: styles.btnDanger,
    outline: styles.btnOutline,
    ghost: styles.btnGhost
  }
  const sizeClasses = {
    sm: styles.btnSm,
    md: '',
    lg: styles.btnLg
  }

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
        aria-disabled={disabled || loading}
      >
        {loading ? (
          <div className={styles.btnLoading}>
            <div className={styles.spinner} />
            <span>로딩 중...</span>
          </div>
        ) : (
          children
        )}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {loading ? (
        <div className={styles.btnLoading}>
          <div className={styles.spinner} />
          <span>로딩 중...</span>
        </div>
      ) : (
        children
      )}
    </button>
  )
}
