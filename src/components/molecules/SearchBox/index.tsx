import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Input from '@/components/atoms/Input'
import { useSearchSuggestions } from '@/hooks/useQueries'
import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

interface SearchBoxProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export default function SearchBox({
  placeholder = "검색어를 입력하세요...",
  onSearch,
  className = ""
}: SearchBoxProps) {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchBoxRef = useRef<HTMLDivElement>(null)

  const { data: suggestions = [], isLoading } = useSearchSuggestions(query)

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query
    onSearch?.(finalQuery)
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSearch(suggestions[selectedIndex])
      } else {
        handleSearch()
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
      setSelectedIndex(-1)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setShowSuggestions(true)
    setSelectedIndex(-1)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  // 외부 클릭 시 추천 목록 숨기기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
        setSelectedIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`${styles.searchBox} ${className}`} ref={searchBoxRef}>
      <div className={styles.searchBoxInput}>
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          icon={<Icon name="search" size="sm" />}
          iconPosition="left"
        />

        {/* 검색어 추천 목록 */}
        {showSuggestions && suggestions.length > 0 && (
          <div className={styles.suggestionsList}>
            {suggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                className={`${styles.suggestionItem} ${
                  index === selectedIndex ? styles.suggestionItemActive : ''
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <Icon name="search" size="sm" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        )}

        {/* 로딩 상태 */}
        {showSuggestions && isLoading && (
          <div className={styles.suggestionsList}>
            <div className={styles.suggestionItem}>
              <span>검색 중...</span>
            </div>
          </div>
        )}
      </div>
      <Button onClick={() => handleSearch()} variant="primary" size="md">
        검색
      </Button>
    </div>
  )
}
