'use client'
import styles from './styles.module.scss'

import SearchFilter from '@/components/molecules/SearchFilter'

export default function SearchFilterWrapper() {
  const handleSearch = (query: string) => {
    // 검색 로직 구현 예정
    console.log('검색:', query)
  }

  const handleCategoryFilter = (category: string) => {
    // 카테고리 필터 로직 구현 예정
    console.log('카테고리 필터:', category)
  }

  const handleSortChange = (sortBy: string, sortOrder: string) => {
    // 정렬 로직 구현 예정
    console.log('정렬:', sortBy, sortOrder)
  }

  return (
    <SearchFilter
      onSearch={handleSearch}
      onCategoryFilter={handleCategoryFilter}
      onSortChange={handleSortChange}
    />
  )
}
