import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '2')

    // 현재 사례 정보 가져오기
    const currentCase = await prisma.case.findUnique({
      where: { id },
      select: { category: true, region: true }
    })

    if (!currentCase) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    // 유사한 사례 찾기 (같은 카테고리 또는 같은 지역, 현재 사례 제외)
    const relatedCases = await prisma.case.findMany({
      where: {
        AND: [
          { id: { not: id } }, // 현재 사례 제외
          {
            OR: [
              { category: currentCase.category }, // 같은 카테고리
              { region: currentCase.region } // 같은 지역
            ]
          }
        ]
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      },
      orderBy: [
        { category: 'asc' }, // 같은 카테고리 우선
        { createdAt: 'desc' } // 최신순
      ],
      take: limit
    })

    // 만약 유사한 사례가 부족하면 다른 사례들로 채우기
    if (relatedCases.length < limit) {
      const additionalCases = await prisma.case.findMany({
        where: {
          AND: [
            { id: { not: id } },
            { id: { notIn: relatedCases.map(c => c.id) } }
          ]
        },
        include: {
          _count: {
            select: {
              comments: true,
              likes: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit - relatedCases.length
      })

      relatedCases.push(...additionalCases)
    }

    return NextResponse.json(relatedCases)
  } catch (error) {
    console.error('Failed to fetch related cases:', error)
    return NextResponse.json(
      { error: 'Failed to fetch related cases' },
      { status: 500 }
    )
  }
}
