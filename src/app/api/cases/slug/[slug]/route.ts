import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/cases/slug/[slug] - slug로 사례 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    console.log('=== 슬러그 API 시작 ===')
    const { slug } = await params
    
    console.log('Original slug:', slug)
    console.log('Request URL:', request.url)
    
    // 다중 디코딩 처리 (중첩 인코딩된 경우 대비)
    let decodedSlug = slug
    try {
      decodedSlug = decodeURIComponent(slug)
      console.log('First decode:', decodedSlug)
      // 한 번 더 디코딩 시도 (중첩 인코딩된 경우)
      if (decodedSlug !== slug) {
        decodedSlug = decodeURIComponent(decodedSlug)
        console.log('Second decode:', decodedSlug)
      }
    } catch (decodeError) {
      console.log('Decode error, using original slug:', slug)
      decodedSlug = slug
    }
    
    console.log('Final decoded slug:', decodedSlug)

    // 데이터베이스 연결 테스트
    console.log('Prisma 연결 테스트 중...')
    const connectionTest = await prisma.$queryRaw`SELECT 1 as test`
    console.log('Prisma 연결 성공:', connectionTest)

    // 모든 사례의 슬러그 확인
    console.log('모든 사례의 슬러그 확인 중...')
    const allCases = await prisma.case.findMany({
      select: { id: true, title: true, slug: true }
    })
    console.log('DB에 있는 모든 슬러그:', allCases.map(c => c.slug))

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

    console.log('Found case data:', caseData ? { id: caseData.id, title: caseData.title, slug: caseData.slug } : 'null')

    if (!caseData) {
      console.log('Case not found for slug:', decodedSlug)
      return NextResponse.json({ error: 'Case not found' }, { status: 404 })
    }

    console.log('=== 슬러그 API 성공 ===')
    return NextResponse.json(caseData)
  } catch (error) {
    console.error('=== 슬러그 API 오류 ===')
    console.error('Error type:', typeof error)
    console.error('Error message:', error instanceof Error ? error.message : String(error))
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    console.error('Full error:', error)
    
    return NextResponse.json({ error: 'Failed to fetch case' }, { status: 500 })
  }
}
