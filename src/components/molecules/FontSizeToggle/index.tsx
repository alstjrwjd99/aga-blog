'use client'

import CustomIcon from '@/components/atoms/CustomIcon'
import { useState } from 'react'
import styles from './styles.module.scss'

export default function FontSizeToggle() {
  const [fontSize, setFontSize] = useState('normal')

  const toggleFontSize = () => {
    const newSize = fontSize === 'normal' ? 'large' : 'normal'
    setFontSize(newSize)
    document.documentElement.setAttribute('data-font-size', newSize)
  }

  return (
    <button
      onClick={toggleFontSize}
      className={styles.floatingButton}
      title={fontSize === 'normal' ? '큰 글씨로 보기' : '일반 글씨로 보기'}
    >
      <CustomIcon name={fontSize === 'normal' ? 'zoom-in' : 'zoom-out'} size="lg" color="#ffffff" />
    </button>
  )
}
