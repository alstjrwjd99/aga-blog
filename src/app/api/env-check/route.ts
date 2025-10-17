import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    // 환경변수 검증
    const validation = {
      hasDatabaseUrl: !!databaseUrl,
      databaseUrlFormat: databaseUrl ? databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://') : false,
      hasBaseUrl: !!baseUrl,
      databaseUrlLength: databaseUrl ? databaseUrl.length : 0,
      databaseUrlPreview: databaseUrl ? databaseUrl.substring(0, 20) + '...' : 'Not set'
    }

    return NextResponse.json({
      success: true,
      message: '환경변수 상태 확인',
      validation,
      recommendations: [
        !validation.hasDatabaseUrl ? 'DATABASE_URL 환경변수가 설정되지 않았습니다.' : null,
        !validation.databaseUrlFormat ? 'DATABASE_URL이 postgresql:// 또는 postgres://로 시작하지 않습니다.' : null,
        !validation.hasBaseUrl ? 'NEXT_PUBLIC_BASE_URL 환경변수가 설정되지 않았습니다.' : null
      ].filter(Boolean)
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '환경변수 확인 중 오류 발생',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  }
}
