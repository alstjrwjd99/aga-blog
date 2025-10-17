import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const databaseUrl = process.env.DATABASE_URL
    
    // 환경변수 상태 확인
    const status = {
      hasDatabaseUrl: !!databaseUrl,
      urlLength: databaseUrl ? databaseUrl.length : 0,
      urlStartsWithPostgres: databaseUrl ? databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://') : false,
      urlPreview: databaseUrl ? databaseUrl.substring(0, 30) + '...' : 'Not set',
      environment: process.env.NODE_ENV || 'development'
    }

    return NextResponse.json({
      success: true,
      message: '환경변수 디버깅 정보',
      status,
      recommendations: [
        !status.hasDatabaseUrl ? 'DATABASE_URL이 설정되지 않았습니다.' : null,
        !status.urlStartsWithPostgres ? 'DATABASE_URL이 postgresql:// 또는 postgres://로 시작하지 않습니다.' : null,
        status.urlLength < 50 ? 'DATABASE_URL이 너무 짧습니다. 전체 연결 문자열인지 확인하세요.' : null
      ].filter(Boolean)
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: '환경변수 확인 중 오류',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  }
}
