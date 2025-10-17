'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
}

// 기본 에러 폴백 컴포넌트
function DefaultErrorFallback({ error, resetError }: ErrorFallbackProps) {
  const router = useRouter()

  return (
    <div className="error-boundary-container">
      <Card className="error-boundary-card">
        <div className="error-boundary-content">
          <div className="error-boundary-icon-container">
            <AlertTriangle className="error-boundary-icon" />
          </div>

          <div className="error-boundary-text">
            <h1 className="error-boundary-title">문제가 발생했습니다</h1>
            <p className="error-boundary-description">
              예상치 못한 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
            </p>

            {process.env.NODE_ENV === 'development' && (
              <details className="error-boundary-details">
                <summary className="error-boundary-summary">개발자 정보</summary>
                <pre className="error-boundary-stack">
                  {error.message}
                  {error.stack}
                </pre>
              </details>
            )}
          </div>

          <div className="error-boundary-actions">
            <Button
              variant="primary"
              onClick={resetError}
              className="error-boundary-button"
            >
              <RefreshCw className="error-boundary-button-icon" />
              다시 시도
            </Button>

            <Button
              variant="secondary"
              onClick={() => router.push('/')}
              className="error-boundary-button"
            >
              <Home className="error-boundary-button-icon" />
              홈으로 이동
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

// 에러 바운더리 클래스 컴포넌트
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // 에러 로깅 (실제 프로덕션에서는 에러 리포팅 서비스 사용)
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // 에러 리포팅 서비스로 전송 (예: Sentry, LogRocket 등)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false,
      })
    }
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback

      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      )
    }

    return this.props.children
  }
}

// 페이지별 에러 바운더리
export function PageErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ resetError }) => (
        <div className="page-error-container">
          <Card className="page-error-card">
            <div className="page-error-content">
              <AlertTriangle className="page-error-icon" />
              <h2 className="page-error-title">페이지를 불러올 수 없습니다</h2>
              <p className="page-error-description">
                페이지 로딩 중 문제가 발생했습니다. 다시 시도해주세요.
              </p>
              <Button variant="primary" onClick={resetError}>
                다시 시도
              </Button>
            </div>
          </Card>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

// API 에러 바운더리
export function ApiErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={({ resetError }) => (
        <div className="api-error-container">
          <Card className="api-error-card">
            <div className="api-error-content">
              <AlertTriangle className="api-error-icon" />
              <h3 className="api-error-title">데이터를 불러올 수 없습니다</h3>
              <p className="api-error-description">
                서버와의 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
              </p>
              <Button variant="primary" onClick={resetError}>
                다시 시도
              </Button>
            </div>
          </Card>
        </div>
      )}
    >
      {children}
    </ErrorBoundary>
  )
}

// 글로벌 에러 핸들러
export function setupGlobalErrorHandlers() {
  if (typeof window !== 'undefined') {
    // 처리되지 않은 JavaScript 에러
    window.addEventListener('error', (event) => {
      console.error('Global error:', event.error)

      // 에러 리포팅 서비스로 전송
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: event.error?.message || 'Unknown error',
          fatal: true,
        })
      }
    })

    // 처리되지 않은 Promise 거부
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason)

      // 에러 리포팅 서비스로 전송
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: event.reason?.message || 'Unhandled promise rejection',
          fatal: false,
        })
      }
    })
  }
}

// 타입 확장
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
