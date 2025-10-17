'use client'

import { useState } from 'react'
import styles from './styles.module.scss'

interface RegionSelectProps {
  value: string
  onChange: (value: string) => void
  error?: string
  className?: string
}

const REGIONS = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원특별자치도',
  '충청북도',
  '충청남도',
  '전북특별자치도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
  '기타 (해외)'
]

export default function RegionSelect({
  value,
  onChange,
  error,
  className = ''
}: RegionSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (region: string) => {
    onChange(region)
    setIsOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setIsOpen(!isOpen)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className={`${styles.regionSelect} ${className}`}>
      <label className={styles.label}>
        발생 지역 <span className={styles.required}>*</span>
      </label>

      <div className={styles.selectContainer}>
        <button
          type="button"
          className={`${styles.selectButton} ${error ? styles.error : ''} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={styles.selectText}>
            {value || '지역을 선택해주세요'}
          </span>
          <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
            ▼
          </span>
        </button>

        {isOpen && (
          <div className={styles.dropdown}>
            <ul className={styles.optionsList} role="listbox">
              {REGIONS.map((region) => (
                <li
                  key={region}
                  className={`${styles.option} ${value === region ? styles.selected : ''}`}
                  onClick={() => handleSelect(region)}
                  role="option"
                  aria-selected={value === region}
                >
                  {region}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
    </div>
  )
}
