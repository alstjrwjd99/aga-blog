import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/cases/slug/[slug] - slug로 사례 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // URL 디코딩된 슬러그 사용
    const decodedSlug = decodeURIComponent(slug)
    console.log('Original slug:', slug)
    console.log('Decoded slug:', decodedSlug)

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
      console.log('Case not found for slug:', decodedSlug)
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    return NextResponse.json(caseData)
  } catch (error) {
    console.error('Error fetching case by slug:', error)
    return NextResponse.json({ error: 'Failed to fetch case' }, { status: 500 })
  }
}
