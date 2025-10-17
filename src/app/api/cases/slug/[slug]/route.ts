import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/cases/slug/[slug] - slug로 사례 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const caseData = await prisma.case.findUnique({
      where: {
        slug: slug
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
