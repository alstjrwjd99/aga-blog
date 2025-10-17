import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/search/log - 검색 로깅
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { query } = body

    if (!query || query.trim().length < 2) {
      return NextResponse.json({ success: false, error: '검색어가 너무 짧습니다.' })
    }

    // 클라이언트 IP 주소 추출
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     '127.0.0.1'

    // User-Agent 추출
    const userAgent = request.headers.get('user-agent')

    // 검색 로그 저장
    await prisma.searchQuery.create({
      data: {
        query: query.trim(),
        ipAddress,
        userAgent
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('검색 로깅 오류:', error)
    return NextResponse.json(
      { error: '검색 로깅에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// GET /api/search/stats - 검색 통계 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d' // 7일, 30일, 전체
    const limit = parseInt(searchParams.get('limit') || '10')

    let startDate: Date
    const now = new Date()

    switch (period) {
      case '1d':
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      default:
        startDate = new Date(0) // 전체 기간
    }

    // 검색어별 통계
    const searchStats = await prisma.searchQuery.groupBy({
      by: ['query'],
      where: {
        createdAt: {
          gte: startDate
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
      take: limit
    })

    // 전체 검색 수
    const totalSearches = await prisma.searchQuery.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // 고유 검색어 수
    const uniqueQueries = await prisma.searchQuery.groupBy({
      by: ['query'],
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // 최근 검색어 (최근 10개)
    const recentSearches = await prisma.searchQuery.findMany({
      where: {
        createdAt: {
          gte: startDate
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10,
      select: {
        query: true,
        createdAt: true
      }
    })

    return NextResponse.json({
      period,
      totalSearches,
      uniqueQueries: uniqueQueries.length,
      topSearches: searchStats.map(stat => ({
        query: stat.query,
        count: stat._count.id
      })),
      recentSearches: recentSearches.map(search => ({
        query: search.query,
        createdAt: search.createdAt
      }))
    })
  } catch (error) {
    console.error('검색 통계 조회 오류:', error)
    return NextResponse.json(
      { error: '검색 통계를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
