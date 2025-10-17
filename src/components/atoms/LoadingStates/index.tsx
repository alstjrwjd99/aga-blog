'use client'

import React from 'react'
import { Loader2, RefreshCw } from 'lucide-react'
import Card from '@/components/atoms/Card'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  className = '', 
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={`loading-spinner ${className}`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
      {text && (
        <span className="loading-spinner-text">{text}</span>
      )}
    </div>
  )
}

interface LoadingCardProps {
  className?: string
  title?: string
  description?: string
}

export function LoadingCard({ 
  className = '', 
  title = '로딩 중...',
  description = '데이터를 불러오고 있습니다.'
}: LoadingCardProps) {
  return (
    <Card className={`loading-card ${className}`}>
      <div className="loading-card-content">
        <LoadingSpinner size="lg" />
        <h3 className="loading-card-title">{title}</h3>
        <p className="loading-card-description">{description}</p>
      </div>
    </Card>
  )
}

interface LoadingSkeletonProps {
  lines?: number
  className?: string
}

export function LoadingSkeleton({ 
  lines = 3, 
  className = '' 
}: LoadingSkeletonProps) {
  return (
    <div className={`loading-skeleton ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div 
          key={index} 
          className={`loading-skeleton-line ${index === lines - 1 ? 'loading-skeleton-line-short' : ''}`}
        />
      ))}
    </div>
  )
}

interface LoadingButtonProps {
  isLoading: boolean
  children: React.ReactNode
  className?: string
  disabled?: boolean
  onClick?: () => void
}

export function LoadingButton({ 
  isLoading, 
  children, 
  className = '',
  disabled = false,
  onClick 
}: LoadingButtonProps) {
  return (
    <button
      className={`loading-button ${isLoading ? 'loading-button-loading' : ''} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <Loader2 className="loading-button-spinner" />
          <span>처리 중...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

interface LoadingPageProps {
  title?: string
  description?: string
}

export function LoadingPage({ 
  title = '페이지를 불러오는 중...',
  description = '잠시만 기다려주세요.'
}: LoadingPageProps) {
  return (
    <div className="loading-page">
      <Card className="loading-page-card">
        <div className="loading-page-content">
          <div className="loading-page-icon">
            <RefreshCw className="loading-page-spinner" />
          </div>
          <h2 className="loading-page-title">{title}</h2>
          <p className="loading-page-description">{description}</p>
          <LoadingSkeleton lines={3} className="loading-page-skeleton" />
        </div>
      </Card>
    </div>
  )
}

interface LoadingListProps {
  count?: number
  className?: string
}

export function LoadingList({ 
  count = 5, 
  className = '' 
}: LoadingListProps) {
  return (
    <div className={`loading-list ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="loading-list-item">
          <div className="loading-list-item-content">
            <LoadingSkeleton lines={2} />
            <div className="loading-list-item-meta">
              <LoadingSkeleton lines={1} className="loading-skeleton-short" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

interface LoadingOverlayProps {
  isVisible: boolean
  children?: React.ReactNode
  className?: string
}

export function LoadingOverlay({ 
  isVisible, 
  children,
  className = '' 
}: LoadingOverlayProps) {
  if (!isVisible) return null

  return (
    <div className={`loading-overlay ${className}`}>
      <div className="loading-overlay-content">
        <LoadingSpinner size="lg" />
        {children}
      </div>
    </div>
  )
}

// 스켈레톤 컴포넌트들
export function CaseCardSkeleton() {
  return (
    <Card className="case-card-skeleton">
      <div className="case-card-skeleton-content">
        <div className="case-card-skeleton-header">
          <LoadingSkeleton lines={1} className="loading-skeleton-short" />
          <LoadingSkeleton lines={1} className="loading-skeleton-very-short" />
        </div>
        <LoadingSkeleton lines={2} />
        <div className="case-card-skeleton-footer">
          <LoadingSkeleton lines={1} className="loading-skeleton-short" />
          <LoadingSkeleton lines={1} className="loading-skeleton-short" />
        </div>
      </div>
    </Card>
  )
}

export function StatisticsSkeleton() {
  return (
    <div className="statistics-skeleton">
      <Card className="statistics-skeleton-card">
        <div className="statistics-skeleton-content">
          <LoadingSkeleton lines={1} className="loading-skeleton-short" />
          <div className="statistics-skeleton-chart">
            <LoadingSkeleton lines={4} />
          </div>
        </div>
      </Card>
    </div>
  )
}

export function CommentSkeleton() {
  return (
    <Card className="comment-skeleton">
      <div className="comment-skeleton-content">
        <div className="comment-skeleton-header">
          <LoadingSkeleton lines={1} className="loading-skeleton-short" />
          <LoadingSkeleton lines={1} className="loading-skeleton-very-short" />
        </div>
        <LoadingSkeleton lines={2} />
      </div>
    </Card>
  )
}
