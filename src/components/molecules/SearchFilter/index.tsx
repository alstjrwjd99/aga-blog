'use client'
import styles from './styles.module.scss'

import Button from '@/components/atoms/Button'
import { Filter, Search } from 'lucide-react'
import { useState } from 'react'

interface SearchFilterProps {
  onSearch: (query: string) => void
  onCategoryFilter: (category: string) => void
  onSortChange: (sortBy: string, sortOrder: string) => void
  currentCategory?: string
  currentSort?: { sortBy: string; sortOrder: string }
}

const categories = [
  { value: '', label: '전체' },
  { value: '보이스피싱', label: '보이스피싱' },
  { value: '문자', label: '문자' },
  { value: '링크', label: '링크' },
  { value: 'SNS', label: 'SNS' },
  { value: '리뷰알바', label: '리뷰알바' },
  { value: '기타', label: '기타' }
]

const sortOptions = [
  { value: 'createdAt_desc', label: '최신순', sortBy: 'createdAt', sortOrder: 'desc' },
  { value: 'createdAt_asc', label: '오래된순', sortBy: 'createdAt', sortOrder: 'asc' },
  { value: 'amount_desc', label: '피해금액 높은순', sortBy: 'amount', sortOrder: 'desc' },
  { value: 'amount_asc', label: '피해금액 낮은순', sortBy: 'amount', sortOrder: 'asc' }
]

export default function SearchFilter({
  onSearch,
  onCategoryFilter,
  onSortChange,
  currentCategory = '',
  currentSort = { sortBy: 'createdAt', sortOrder: 'desc' }
}: SearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleCategoryChange = (category: string) => {
    onCategoryFilter(category)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [sortBy, sortOrder] = e.target.value.split('_')
    onSortChange(sortBy, sortOrder)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      {/* 검색 바 */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="사례 제목, 내용, 지역으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <Button type="submit" variant="primary">
          검색
        </Button>
      </form>

      {/* 필터 토글 버튼 */}
      <div className="flex items-center justify-between">
        <Button
          onClick={() => setShowFilters(!showFilters)}
          variant="outline"
          size="sm"
        >
          <Filter className="w-4 h-4 mr-2" />
          필터
        </Button>

        <div className="text-sm text-gray-500">
          현재 정렬: {sortOptions.find(opt =>
            opt.sortBy === currentSort.sortBy && opt.sortOrder === currentSort.sortOrder
          )?.label}
        </div>
      </div>

      {/* 필터 옵션들 */}
      {showFilters && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          {/* 카테고리 필터 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              피해 유형
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    currentCategory === category.value
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* 정렬 옵션 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              정렬 기준
            </label>
            <select
              value={`${currentSort.sortBy}_${currentSort.sortOrder}`}
              onChange={handleSortChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  )
}
