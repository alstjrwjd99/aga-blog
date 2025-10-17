import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/statistics - 사이트 통계 정보
export async function GET() {
  try {
    console.log('=== 통계 API 시작 ===')
    
    // 데이터베이스 연결 테스트
    console.log('Prisma 연결 테스트 중...')
    const connectionTest = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Prisma 연결 성공:', connectionTest)

    // 전체 사례 수
    console.log('전체 사례 수 조회 중...')
    const totalCases = await prisma.case.count()
    console.log('전체 사례 수:', totalCases)
    
    // 카테고리별 사례 수
    console.log('카테고리별 사례 수 조회 중...')
    const casesByCategory = await prisma.case.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    })
    console.log('카테고리별 사례 수:', casesByCategory)
    
    // 피해 금액 통계
    console.log('피해 금액 통계 조회 중...')
    const amountStats = await prisma.case.aggregate({
      where: {
        amount: {
          not: null
        }
      },
      _sum: {
        amount: true
      },
      _avg: {
        amount: true
      },
      _min: {
        amount: true
      },
      _max: {
        amount: true
      }
    })
    console.log('피해 금액 통계:', amountStats)
    
    // 전체 댓글 수
    console.log('전체 댓글 수 조회 중...')
    const totalComments = await prisma.comment.count()
    console.log('전체 댓글 수:', totalComments)
    
    // 전체 공감 수
    console.log('전체 공감 수 조회 중...')
    const totalLikes = await prisma.like.count()
    console.log('전체 공감 수:', totalLikes)
    
    // 최근 7일간 등록된 사례 수
    console.log('최근 7일간 사례 수 조회 중...')
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentCases = await prisma.case.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    })
    console.log('최근 7일간 사례 수:', recentCases)
    
    // 지역별 사례 수 (상위 10개)
    console.log('지역별 사례 수 조회 중...')
    const casesByRegion = await prisma.case.groupBy({
      by: ['region'],
      where: {
        region: {
          not: null
        }
      },
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      },
      take: 10
    })
    console.log('지역별 사례 수:', casesByRegion)

    const result = {
      totalCases,
      casesByCategory,
      amountStats: {
        totalAmount: amountStats._sum.amount || 0,
        averageAmount: amountStats._avg.amount || 0,
        minAmount: amountStats._min.amount || 0,
        maxAmount: amountStats._max.amount || 0
      },
      totalComments,
      totalLikes,
      recentCases,
      casesByRegion
    }

    console.log('=== 통계 API 성공 ===')
    return NextResponse.json(result)
  } catch (error) {
    console.error('=== 통계 API 오류 ===')
    console.error('Error type:', typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    console.error('Full error:', error)
    
    return NextResponse.json(
      { error: '통계 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
