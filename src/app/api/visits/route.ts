import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/visits - 페이지 방문 로깅
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { page, referrer } = body

    // 클라이언트 IP 주소 추출
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     '127.0.0.1'

    // User-Agent 추출
    const userAgent = request.headers.get('user-agent')

    // 방문 로그 저장
    await prisma.siteVisit.create({
      data: {
        ipAddress,
        userAgent,
        page: page || 'unknown',
        referrer: referrer || null
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('방문 로깅 오류:', error)
    return NextResponse.json(
      { error: '방문 로깅에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// GET /api/visits - 방문 통계 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '7d' // 7일, 30일, 전체

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

    // 페이지별 방문 통계
    const pageStats = await prisma.siteVisit.groupBy({
      by: ['page'],
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
      }
    })

    // 전체 방문 수
    const totalVisits = await prisma.siteVisit.count({
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    // 고유 방문자 수 (IP 기준)
    const uniqueVisitors = await prisma.siteVisit.groupBy({
      by: ['ipAddress'],
      where: {
        createdAt: {
          gte: startDate
        }
      }
    })

    return NextResponse.json({
      period,
      totalVisits,
      uniqueVisitors: uniqueVisitors.length,
      pageStats: pageStats.map(stat => ({
        page: stat.page,
        visits: stat._count.id
      }))
    })
  } catch (error) {
    console.error('방문 통계 조회 오류:', error)
    return NextResponse.json(
      { error: '방문 통계를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
