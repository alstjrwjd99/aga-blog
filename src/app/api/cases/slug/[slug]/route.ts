import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/cases/slug/[slug] - slug로 사례 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // 다중 디코딩 처리 (중첩 인코딩된 경우 대비)
    let decodedSlug = slug
    try {
      decodedSlug = decodeURIComponent(slug)
      // 한 번 더 디코딩 시도 (중첩 인코딩된 경우)
      if (decodedSlug !== slug) {
        decodedSlug = decodeURIComponent(decodedSlug)
      }
    } catch (decodeError) {
      decodedSlug = slug
    }

    const caseData = await prisma.case.findUnique({
      where: {
        slug: decodedSlug
      },
      include: {
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    })

    if (!caseData) {
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    return NextResponse.json(caseData)
  } catch (error) {
    console.error('Error fetching case by slug:', error)
    return NextResponse.json({ error: 'Failed to fetch case' }, { status: 500 })
  }
}
