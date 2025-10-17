'use client'

import { useDebounce } from '@/hooks/useDebounce'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

interface CategorySelectProps {
  categories: string[]
  value: string[]
  onSelect: (categories: string[]) => void
  placeholder?: string
  className?: string
  multiple?: boolean
}

export default function CategorySelect({
  categories,
  value,
  onSelect,
  placeholder = '카테고리를 선택하거나 입력하세요',
  className = '',
  multiple = true
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentCategories, setRecentCategories] = useState<string[]>([])

  const debouncedQuery = useDebounce(searchQuery, 300)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([])

  // 로컬 스토리지에서 최근 카테고리 불러오기
  useEffect(() => {
    const stored = localStorage.getItem('recent-categories')
    if (stored) {
      try {
        // setTimeout을 사용하여 렌더링 사이클 밖에서 상태 업데이트
        setTimeout(() => {
          setRecentCategories(JSON.parse(stored))
        }, 0)
      } catch (error) {
        console.error('Failed to parse recent categories:', error)
      }
    }
  }, [])

  // 필터링된 옵션 생성
  const filteredOptions = categories.filter(category =>
    category.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  // 검색어가 기존 카테고리에 없으면 "새 카테고리 추가" 옵션 표시
  const showCreateOption = debouncedQuery &&
    !categories.some(cat => cat.toLowerCase() === debouncedQuery.toLowerCase())

  const allOptions = [
    ...filteredOptions,
    ...(showCreateOption ? [`+ 새 카테고리 추가: "${debouncedQuery}"`] : [])
  ]

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setSearchQuery('')
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        e.preventDefault()
        setIsOpen(true)
        setSelectedIndex(0)
      }
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < allOptions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : allOptions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && allOptions[selectedIndex]) {
          handleOptionSelect(allOptions[selectedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        setSearchQuery('')
        setSelectedIndex(-1)
        inputRef.current?.blur()
        break
    }
  }

  // 옵션 선택 처리
  const handleOptionSelect = (option: string) => {
    if (option.startsWith('+ 새 카테고리 추가:')) {
      const newCategory = debouncedQuery
      if (multiple) {
        const updatedCategories = value.includes(newCategory)
          ? value.filter(cat => cat !== newCategory)
          : [...value, newCategory]
        onSelect(updatedCategories)
      } else {
        onSelect([newCategory])
      }

      // 최근 카테고리에 추가
      const updatedRecent = [newCategory, ...recentCategories.filter(cat => cat !== newCategory)].slice(0, 5)
      setRecentCategories(updatedRecent)
      localStorage.setItem('recent-categories', JSON.stringify(updatedRecent))
    } else {
      if (multiple) {
        const updatedCategories = value.includes(option)
          ? value.filter(cat => cat !== option)
          : [...value, option]
        onSelect(updatedCategories)
      } else {
        onSelect([option])
      }

      // 최근 카테고리에 추가
      const updatedRecent = [option, ...recentCategories.filter(cat => cat !== option)].slice(0, 5)
      setRecentCategories(updatedRecent)
      localStorage.setItem('recent-categories', JSON.stringify(updatedRecent))
    }

    if (!multiple) {
      setIsOpen(false)
      setSearchQuery('')
      setSelectedIndex(-1)
      inputRef.current?.blur()
    }
  }

  // 입력값 변경 처리
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    setIsOpen(true)
    setSelectedIndex(-1)
  }

  // 포커스 처리
  const handleFocus = () => {
    setIsOpen(true)
    setSearchQuery('')
  }

  // 선택된 카테고리 표시용 텍스트
  const displayValue = isOpen ? searchQuery : (value.length > 0 ? value.join(', ') : '')

  return (
    <div className={`${styles.categorySelect} ${className}`}>
      {/* 입력 필드 */}
      <div className={styles.inputContainer}>
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={styles.input}
          autoComplete="off"
        />
        <button
          type="button"
          className={styles.dropdownButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="드롭다운 열기/닫기"
        >
          <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>▼</span>
        </button>
      </div>

      {/* 선택된 카테고리 태그들 */}
      {value.length > 0 && !isOpen && (
        <div className={styles.selectedTags}>
          {value.map((category, index) => (
            <div key={index} className={styles.selectedTag}>
              <span className={styles.tagText}>{category}</span>
              <button
                type="button"
                className={styles.removeButton}
                onClick={() => {
                  const updatedCategories = value.filter(cat => cat !== category)
                  onSelect(updatedCategories)
                }}
                aria-label={`${category} 카테고리 제거`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div ref={dropdownRef} className={styles.dropdown}>
          {/* 최근 카테고리 */}
          {recentCategories.length > 0 && !searchQuery && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>최근 카테고리</div>
              {recentCategories.map((category, index) => (
                <button
                  key={`recent-${category}`}
                  ref={el => { optionRefs.current[index] = el }}
                  type="button"
                  className={`${styles.option} ${selectedIndex === index ? styles.optionSelected : ''} ${value.includes(category) ? styles.optionActive : ''}`}
                  onClick={() => handleOptionSelect(category)}
                >
                  <span>{category}</span>
                </button>
              ))}
            </div>
          )}

          {/* 카테고리 목록 */}
          <div className={styles.section}>
            {!searchQuery && recentCategories.length > 0 && (
              <div className={styles.sectionTitle}>모든 카테고리</div>
            )}
            {allOptions.map((option, index) => {
              const actualIndex = recentCategories.length > 0 && !searchQuery
                ? index + recentCategories.length
                : index

              return (
                <button
                  key={option}
                  ref={el => { optionRefs.current[actualIndex] = el }}
                  type="button"
                  className={`${styles.option} ${selectedIndex === actualIndex ? styles.optionSelected : ''} ${
                    option.startsWith('+ 새 카테고리 추가:') ? styles.createOption : ''
                  } ${value.includes(option) ? styles.optionActive : ''}`}
                  onClick={() => handleOptionSelect(option)}
                >
                  <span>{option}</span>
                </button>
              )
            })}
          </div>

          {/* 빈 상태 */}
          {allOptions.length === 0 && searchQuery && (
            <div className={styles.emptyState}>
              <span>일치하는 카테고리가 없습니다</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
