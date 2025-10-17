'use client'
import styles from './styles.module.scss'

import { useEffect } from 'react'

interface StructuredDataLDJSONProps {
  structuredData: Array<Record<string, unknown>>
}

const StructuredDataLDJSON = ({ structuredData }: StructuredDataLDJSONProps) => {
  useEffect(() => {
    // 기존 구조화된 데이터 스크립트 제거
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
    existingScripts.forEach(script => script.remove())

    // 새로운 구조화된 데이터 스크립트 추가
    structuredData.forEach((data, index) => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = `structured-data-${index}`
      script.text = JSON.stringify(data)
      document.head.appendChild(script)
    })

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      structuredData.forEach((_, index) => {
        const script = document.getElementById(`structured-data-${index}`)
        if (script) {
          script.remove()
        }
      })
    }
  }, [structuredData])

  return null
}

export default StructuredDataLDJSON
