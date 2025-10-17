'use client'
import styles from './styles.module.scss'

import { useId } from 'react'

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  'aria-label'?: string
  'aria-describedby'?: string
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  onKeyPress,
  disabled = false,
  error = false,
  errorMessage,
  label,
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  ...props
}: InputProps) {
  const baseClasses = styles.input
  const id = useId()

  const sizeClasses = {
    sm: styles.inputSm,
    md: '',
    lg: styles.inputLg
  }

  const errorClasses = error ? styles.inputError : ''

  const classes = `${baseClasses} ${sizeClasses[size]} ${errorClasses} ${className}`.trim()

  const inputId = props.id || id
  const errorId = errorMessage ? `${inputId}-error` : undefined

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label
          htmlFor={inputId}
          className={styles.inputLabel}
        >
          {label}
        </label>
      )}
      <div className={styles.inputContainer}>
        {icon && iconPosition === 'left' && (
          <div className={`${styles.inputIcon} ${styles.inputIconLeft}`}>
            <div className={styles.inputIconContent}>
              {icon}
            </div>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          disabled={disabled}
          className={classes}
          aria-label={ariaLabel}
          aria-describedby={errorId || ariaDescribedby}
          aria-invalid={error}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className={`${styles.inputIcon} ${styles.inputIconRight}`}>
            <div className={styles.inputIconContent}>
              {icon}
            </div>
          </div>
        )}
      </div>
      {error && errorMessage && (
        <p
          id={errorId}
          className={styles.inputErrorMessage}
          role="alert"
          aria-live="polite"
        >
          {errorMessage}
        </p>
      )}
    </div>
  )
}
