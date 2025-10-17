'use client'

import CustomIcon from '@/components/atoms/CustomIcon'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className = ''
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
    options.find(option => option.value === value) || null
  )
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const option = options.find(option => option.value === value)
    setSelectedOption(option || null)
  }, [value, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleOptionClick = (option: SelectOption) => {
    setSelectedOption(option)
    onChange(option.value)
    setIsOpen(false)
  }

  return (
    <div className={`${styles.customSelect} ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className={`${styles.selectButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <span className={styles.selectText}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <CustomIcon
          name="chevron-down"
          size="sm"
          color="#6b7280"
          className={`${styles.chevron} ${isOpen ? styles.rotated : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`${styles.option} ${selectedOption?.value === option.value ? styles.selected : ''}`}
              onClick={() => handleOptionClick(option)}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <span className={styles.optionText}>{option.label}</span>
              {selectedOption?.value === option.value && (
                <CustomIcon name="check" size="sm" color="#3b82f6" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
