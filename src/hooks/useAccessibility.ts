'use client'

import React, { useEffect, useRef, useState } from 'react'

// 키보드 네비게이션 훅
export function useKeyboardNavigation() {
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef<HTMLElement>(null)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!containerRef.current) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const focusableArray = Array.from(focusableElements) as HTMLElement[]

    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault()
        setFocusedIndex(prev => 
          prev < focusableArray.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault()
        setFocusedIndex(prev => 
          prev > 0 ? prev - 1 : focusableArray.length - 1
        )
        break
      case 'Home':
        event.preventDefault()
        setFocusedIndex(0)
        break
      case 'End':
        event.preventDefault()
        setFocusedIndex(focusableArray.length - 1)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        if (focusedIndex >= 0 && focusableArray[focusedIndex]) {
          focusableArray[focusedIndex].click()
        }
        break
    }
  }

  useEffect(() => {
    if (focusedIndex >= 0 && containerRef.current) {
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const focusableArray = Array.from(focusableElements) as HTMLElement[]
      
      if (focusableArray[focusedIndex]) {
        focusableArray[focusedIndex].focus()
      }
    }
  }, [focusedIndex])

  return {
    containerRef,
    handleKeyDown,
    focusedIndex,
    setFocusedIndex,
  }
}

// 스크린 리더 지원 훅
export function useScreenReader() {
  const [announcements, setAnnouncements] = useState<string[]>([])
  const announcementRef = useRef<HTMLDivElement>(null)

  const announce = (message: string) => {
    setAnnouncements(prev => [...prev, message])
    
    // 3초 후 자동 제거
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1))
    }, 3000)
  }

  const clearAnnouncements = () => {
    setAnnouncements([])
  }

  return {
    announcements,
    announcementRef,
    announce,
    clearAnnouncements,
  }
}

// 접근성 개선 컴포넌트
export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const { announcements, announcementRef } = useScreenReader()

  return React.createElement('div', null, 
    children,
    React.createElement('div', {
      ref: announcementRef,
      className: 'sr-only',
      'aria-live': 'polite',
      'aria-atomic': 'true'
    }, announcements.map((announcement, index) => 
      React.createElement('div', { key: index }, announcement)
    ))
  )
}
