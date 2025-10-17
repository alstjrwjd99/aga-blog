'use client'

import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleBack}
      className="mb-4"
    >
      <Icon name="chevron-down" size="sm" className="mr-2 rotate-90" />
      뒤로가기
    </Button>
  )
}
