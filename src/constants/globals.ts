// Global Constants
// ===============

// Logo and Brand
export const AGA_LOGO_IMAGE_URL = '/logo.png'
export const AGA_LOGO_IMAGE_ALT = 'IT Guy | 아가 - 피싱 방지 센터'

// Site Information
export const SITE_NAME = 'IT Guy | 아가'
export const SITE_DESCRIPTION = '실제 피해 사례를 공유하고 예방 정보를 제공하여 더 안전한 디지털 환경을 만들어갑니다.'
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

// Contact Information
export const CONTACT_EMAIL = 'info@aga-blog.com'
export const CONTACT_PHONE = '+82-10-0000-0000'

// Social Media
export const TWITTER_HANDLE = '@aga_blog'
export const FACEBOOK_PAGE = 'https://facebook.com/aga-blog'
export const INSTAGRAM_PAGE = 'https://instagram.com/aga_blog'

// Emergency Numbers
export const EMERGENCY_NUMBERS = {
  POLICE: '112',
  FINANCIAL_SUPERVISORY: '1332',
  PHISHING_CENTER: '1588-1234'
} as const

// Categories
export const PHISHING_CATEGORIES = [
  '보이스피싱',
  '문자',
  '링크',
  'SNS',
  '리뷰알바',
  '기타'
] as const

// Pagination
export const ITEMS_PER_PAGE = 12
export const MAX_PAGES = 10

// Cache Settings
export const CACHE_DURATION = {
  STATIC: 24 * 60 * 60, // 24 hours
  DYNAMIC: 5 * 60, // 5 minutes
  API: 10 * 60 // 10 minutes
} as const

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const

// Validation
export const VALIDATION_RULES = {
  TITLE_MIN_LENGTH: 5,
  TITLE_MAX_LENGTH: 100,
  CONTENT_MIN_LENGTH: 20,
  CONTENT_MAX_LENGTH: 5000,
  NICKNAME_MIN_LENGTH: 2,
  NICKNAME_MAX_LENGTH: 20
} as const

// API Endpoints
export const API_ENDPOINTS = {
  CASES: '/api/cases',
  STATISTICS: '/api/statistics',
  COMMENTS: '/api/cases/[id]/comments',
  LIKES: '/api/cases/[id]/like'
} as const

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  SERVER_ERROR: '서버 오류가 발생했습니다. 관리자에게 문의해주세요.',
  VALIDATION_ERROR: '입력한 정보를 다시 확인해주세요.',
  UNAUTHORIZED: '로그인이 필요합니다.',
  FORBIDDEN: '접근 권한이 없습니다.',
  NOT_FOUND: '요청한 페이지를 찾을 수 없습니다.'
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  CASE_CREATED: '사례가 성공적으로 등록되었습니다.',
  CASE_UPDATED: '사례가 성공적으로 수정되었습니다.',
  CASE_DELETED: '사례가 성공적으로 삭제되었습니다.',
  COMMENT_CREATED: '댓글이 성공적으로 등록되었습니다.',
  COMMENT_DELETED: '댓글이 성공적으로 삭제되었습니다.'
} as const
