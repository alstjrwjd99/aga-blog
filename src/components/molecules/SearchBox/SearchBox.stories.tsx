// src/components/molecules/SearchBox/SearchBox.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import SearchBox from './index'

const meta: Meta<typeof SearchBox> = {
  title: 'Molecules/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '사례 검색...',
  },
}

export const CustomPlaceholder: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
  },
}

export const LongPlaceholder: Story = {
  args: {
    placeholder: '보이스피싱, 스미싱, 피싱 링크 등 다양한 피싱 사례를 검색할 수 있습니다',
  },
}

export const PhishingSearch: Story = {
  args: {
    placeholder: '피싱 사례를 검색해보세요',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const [results, setResults] = useState<string[]>([])

    const handleSearch = (searchValue: string) => {
      // Mock search results
      const mockResults = [
        '보이스피싱 사례 1',
        '스미싱 피해 사례',
        '피싱 링크 사기',
        'SNS 계정 탈취',
        '리뷰알바 사칭'
      ].filter(item =>
        item.toLowerCase().includes(searchValue.toLowerCase())
      )
      setResults(mockResults)
    }

    return (
      <div style={{ width: '400px' }}>
        <SearchBox
          placeholder="사례 검색..."
          onSearch={handleSearch}
        />
        {results.length > 0 && (
          <div style={{
            marginTop: '1rem',
            background: 'white',
            border: '1px solid #E5E7EB',
            borderRadius: '0.5rem',
            padding: '0.5rem'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
              검색 결과 ({results.length}개):
            </div>
            {results.map((result, index) => (
              <div
                key={index}
                style={{
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F3F4F6'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {result}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  },
}

export const WithSuggestions: Story = {
  render: () => {
    const suggestions = [
      '보이스피싱',
      '스미싱',
      '피싱 링크',
      'SNS 피싱',
      '리뷰알바',
      '금융기관 사칭',
      '정부기관 사칭',
      '택배 사칭'
    ]

    return (
      <div style={{ width: '400px' }}>
        <SearchBox
          placeholder="인기 검색어: 보이스피싱, 스미싱..."
        />
        <div style={{
          marginTop: '1rem',
          background: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '1rem'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.75rem', fontWeight: '500' }}>
            인기 검색어
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {suggestions.map((suggestion, index) => (
              <span
                key={index}
                style={{
                  background: '#F3F4F6',
                  color: '#374151',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  border: '1px solid #E5E7EB'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#E5E7EB'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F3F4F6'
                }}
              >
                {suggestion}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  },
}

export const SearchResults: Story = {
  render: () => {
    const mockResults = [
      { title: '검찰 사칭 보이스피싱 피해 사례', category: '보이스피싱', amount: 5000000, date: '2024-01-20' },
      { title: '택배 사칭 스미싱 문자 피해', category: '문자', amount: 0, date: '2024-02-10' },
      { title: '금융기관 사칭 피싱 링크 사례', category: '링크', amount: 3000000, date: '2024-03-01' },
      { title: 'SNS 계정 탈취를 통한 피싱', category: 'SNS', amount: 2000000, date: '2024-03-15' },
    ]

    return (
      <div style={{ width: '500px' }}>
        <SearchBox
          placeholder="사례 검색..."
        />
        <div style={{
          marginTop: '1rem',
          background: 'white',
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '1rem'
        }}>
          <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem', fontWeight: '500' }}>
            검색 결과 (4개)
          </div>
          {mockResults.map((result, index) => (
            <div
              key={index}
              style={{
                padding: '0.75rem',
                borderBottom: index < mockResults.length - 1 ? '1px solid #F3F4F6' : 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827', marginBottom: '0.25rem' }}>
                {result.title}
              </div>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#6B7280' }}>
                <span style={{
                  background: '#EFF6FF',
                  color: '#1E40AF',
                  padding: '0.125rem 0.5rem',
                  borderRadius: '0.25rem'
                }}>
                  {result.category}
                </span>
                <span>피해금액: ₩{result.amount.toLocaleString()}</span>
                <span>{result.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
}
