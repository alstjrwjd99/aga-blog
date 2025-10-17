'use client'
import styles from './styles.module.scss'

import {
    AlertTriangle,
    BarChart3,
    Calendar,
    ChevronDown,
    ChevronUp,
    FileText,
    Filter,
    Funnel,
    Heart,
    Home,
    MapPin,
    Menu,
    MessageCircle,
    Plus,
    Search,
    Shield,
    TrendingUp,
    TriangleAlert,
    User,
    Users
} from 'lucide-react'
import React from 'react'

interface IconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
}

export default function Icon({
  name,
  size = 'md',
  className = '',
  color = 'secondary'
}: IconProps) {
  const sizeClasses = {
    xs: styles.iconXs,
    sm: styles.iconSm,
    md: styles.iconMd,
    lg: styles.iconLg,
    xl: styles.iconXl
  }

  const colorClasses = {
    primary: styles.iconPrimary,
    secondary: styles.iconSecondary,
    success: styles.iconSuccess,
    warning: styles.iconWarning,
    danger: styles.iconDanger,
    info: styles.iconInfo
  }

  const classes = `${sizeClasses[size]} ${colorClasses[color]} ${className}`

  // Lucide React 아이콘들을 매핑
  const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
    'shield': Shield,
    'home': Home,
    'file-text': FileText,
    'plus': Plus,
    'bar-chart': BarChart3,
    'search': Search,
    'filter': Filter,
    'heart': Heart,
    'message-circle': MessageCircle,
    'calendar': Calendar,
    'map-pin': MapPin,
    'user': User,
    'alert-triangle': AlertTriangle,
    'trending-up': TrendingUp,
    'users': Users,
    'funnel': Funnel,
    'triangle-alert': TriangleAlert,
    'chevron-down': ChevronDown,
    'chevron-up': ChevronUp,
    'menu': Menu
  }

  const IconComponent = iconMap[name]

  if (!IconComponent) {
    return <div className={classes}>?</div>
  }

  return <IconComponent className={classes} />
}
