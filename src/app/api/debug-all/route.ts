import { NextResponse } from 'next/server'

// GET /api/debug-all - 전체 디버깅 정보
export async function GET() {
  try {
    console.log('=== 전체 디버깅 API 시작 ===')
    
    // 환경변수 확인
    const envInfo = {
      hasDatabaseUrl: !!process.env.DATABASE_URL,
      urlLength: process.env.DATABASE_URL?.length || 0,
      urlStartsWithPostgres: process.env.DATABASE_URL?.startsWith('postgresql://') || false,
      urlPreview: process.env.DATABASE_URL?.substring(0, 50) + '...' || 'undefined',
      hasNextPublicBaseUrl: !!process.env.NEXT_PUBLIC_BASE_URL,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'undefined',
      environment: process.env.NODE_ENV || 'undefined',
      vercelEnv: process.env.VERCEL_ENV || 'undefined'
    }
    
    console.log('환경변수 정보:', envInfo)
    
    // Prisma 연결 테스트
    let prismaTest = null
    try {
      const { prisma } = await import('@/lib/prisma')
      prismaTest = await prisma.$queryRaw`SELECT 1 as test`
      console.log('Prisma 연결 성공:', prismaTest)
    } catch (prismaError) {
      console.error('Prisma 연결 실패:', prismaError)
      prismaTest = { error: prismaError instanceof Error ? prismaError.message : String(prismaError) }
    }
    
    // 테이블 존재 확인
    let tableInfo = null
    try {
      const { prisma } = await import('@/lib/prisma')
      const tables = await prisma.$queryRaw`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `
      console.log('테이블 목록:', tables)
      tableInfo = tables
    } catch (tableError) {
      console.error('테이블 조회 실패:', tableError)
      tableInfo = { error: tableError instanceof Error ? tableError.message : String(tableError) }
    }
    
    // 사례 데이터 확인
    let caseData = null
    try {
      const { prisma } = await import('@/lib/prisma')
      const cases = await prisma.case.findMany({
        select: { id: true, title: true, slug: true },
        take: 5
      })
      console.log('사례 데이터:', cases)
      caseData = cases
    } catch (caseError) {
      console.error('사례 조회 실패:', caseError)
      caseData = { error: caseError instanceof Error ? caseError.message : String(caseError) }
    }
    
    const result = {
      timestamp: new Date().toISOString(),
      environment: envInfo,
      prismaConnection: prismaTest,
      tables: tableInfo,
      sampleCases: caseData,
      recommendations: [] as string[]
    }
    
    // 권장사항 추가
    if (!envInfo.hasDatabaseUrl) {
      result.recommendations.push('DATABASE_URL 환경변수가 설정되지 않았습니다.')
    }
    if (!envInfo.urlStartsWithPostgres) {
      result.recommendations.push('DATABASE_URL이 postgresql:// 또는 postgres://로 시작하지 않습니다.')
    }
    if (!envInfo.hasNextPublicBaseUrl) {
      result.recommendations.push('NEXT_PUBLIC_BASE_URL 환경변수가 설정되지 않았습니다.')
    }
    
    console.log('=== 전체 디버깅 API 성공 ===')
    return NextResponse.json(result)
  } catch (error) {
    console.error('=== 전체 디버깅 API 오류 ===')
    console.error('Error:', error)
    
    return NextResponse.json({
      error: '디버깅 정보를 가져오는데 실패했습니다.',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
}
