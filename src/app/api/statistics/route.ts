import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { StatisticsCache } from '@/lib/kv'

// GET /api/statistics - 사이트 통계 정보
export async function GET() {
  try {
    // 캐시에서 통계 데이터 조회 시도
    const cachedStats = await StatisticsCache.getStatistics()
    if (cachedStats) {
      return NextResponse.json(cachedStats)
    }

    // 전체 사례 수
    const totalCases = await prisma.case.count()
    
    // 카테고리별 사례 수
    const casesByCategory = await prisma.case.groupBy({
      by: ['category'],
      _count: {
        id: true
      }
    })
    
    // 피해 금액 통계
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
    
    // 전체 댓글 수
    const totalComments = await prisma.comment.count()
    
    // 전체 공감 수
    const totalLikes = await prisma.like.count()
    
    // 최근 7일간 등록된 사례 수
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    
    const recentCases = await prisma.case.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      }
    })
    
    // 지역별 사례 수 (상위 10개)
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

    // 캐시에 통계 데이터 저장
    await StatisticsCache.setStatistics(result)

    return NextResponse.json(result)
  } catch (error) {
    console.error('통계 조회 오류:', error)
    return NextResponse.json(
      { error: '통계 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
