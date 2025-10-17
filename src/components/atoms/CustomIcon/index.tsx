'use client'

import Image from 'next/image'

interface CustomIconProps {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  color?: string
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
}

export default function CustomIcon({ name, size = 'md', className = '', color }: CustomIconProps) {
  const iconSize = sizeMap[size]

  return (
    <div
      className={`inline-block ${className}`}
      style={{ color: color || 'inherit' }}
    >
      <Image
        src={`/icons/${name}.svg`}
        alt={`${name} icon`}
        width={iconSize}
        height={iconSize}
        className="inline-block"
      />
    </div>
  )
}
