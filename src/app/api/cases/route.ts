import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/cases - 사례 목록 조회 (검색, 필터링, 페이지네이션 지원)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    const skip = (page - 1) * limit

    // 검색 및 필터링 조건 구성
    const where: {
      category?: string
      OR?: Array<{
        title?: { contains: string }
        content?: { contains: string }
        region?: { contains: string }
        category?: { contains: string }
      }>
    } = {}

    if (category) {
      where.category = category
    }

    if (search) {
      where.OR = [
        // 제목에서 검색 (가장 높은 우선순위)
        { title: { contains: search } },
        // 카테고리에서 검색 (높은 우선순위)
        { category: { contains: search } },
        // 내용에서 검색 (중간 우선순위)
        { content: { contains: search } },
        // 지역에서 검색 (낮은 우선순위)
        { region: { contains: search } }
      ]
    }

    // 정렬 조건 구성
    const orderBy: Record<string, string> = {}
    orderBy[sortBy] = sortOrder

    // 사례 목록 조회 (댓글 수와 공감 수 포함)
    const cases = await prisma.case.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    })

    // 전체 개수 조회
    const total = await prisma.case.count({ where })

    const result = {
      cases,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('사례 목록 조회 오류:', error)
    return NextResponse.json(
      { error: '사례 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// POST /api/cases - 새 사례 등록
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, category, amount, content, region, tip } = body

    // 입력 데이터 검증 강화
    if (!title || title.trim().length < 5) {
      return NextResponse.json(
        { error: '제목은 최소 5자 이상 입력해주세요.' },
        { status: 400 }
      )
    }

    if (title.length > 200) {
      return NextResponse.json(
        { error: '제목은 200자를 초과할 수 없습니다.' },
        { status: 400 }
      )
    }

    if (!category || !['보이스피싱', '문자', '링크', 'SNS', '리뷰알바', '기타'].includes(category)) {
      return NextResponse.json(
        { error: '올바른 피싱 유형을 선택해주세요.' },
        { status: 400 }
      )
    }

    if (!content || content.trim().length < 20) {
      return NextResponse.json(
        { error: '내용은 최소 20자 이상 입력해주세요.' },
        { status: 400 }
      )
    }

    if (content.length > 5000) {
      return NextResponse.json(
        { error: '내용은 5000자를 초과할 수 없습니다.' },
        { status: 400 }
      )
    }

    if (amount && (isNaN(parseInt(amount)) || parseInt(amount) < 0 || parseInt(amount) > 10000000000)) {
      return NextResponse.json(
        { error: '피해 금액은 0원 이상 100억원 이하로 입력해주세요.' },
        { status: 400 }
      )
    }

    // SEO 최적화된 slug 생성 함수
    const generateSlug = (title: string, category: string) => {
      // 카테고리별 SEO 키워드 매핑
      const categoryKeywords = {
        '보이스피싱': 'voice-phishing',
        '문자': 'smishing',
        '링크': 'phishing-link',
        'SNS': 'social-media-phishing',
        '리뷰알바': 'review-job-scam',
        '기타': 'phishing-scam'
      }

      // 제목에서 SEO 키워드 추출 및 정리
      let slug = title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s]/g, '') // 특수문자 제거
        .replace(/\s+/g, '-') // 공백을 하이픈으로
        .replace(/--+/g, '-') // 연속 하이픈 제거
        .trim()

      // 카테고리 키워드 추가
      const categoryKeyword = categoryKeywords[category as keyof typeof categoryKeywords] || 'phishing'

      // slug가 너무 길면 자르고 카테고리 키워드 추가
      if (slug.length > 50) {
        slug = slug.substring(0, 50).replace(/-$/, '')
      }

      // 최종 slug: 카테고리-제목-사례
      const finalSlug = `${categoryKeyword}-${slug}-case`

      // 중복 방지를 위한 타임스탬프 추가 (필요시)
      return finalSlug
    }

    // 중복 slug 방지 함수
    const ensureUniqueSlug = async (baseSlug: string) => {
      let slug = baseSlug
      let counter = 1

      while (true) {
        const existingCase = await prisma.case.findUnique({
          where: { slug }
        })

        if (!existingCase) {
          return slug
        }

        slug = `${baseSlug}-${counter}`
        counter++
      }
    }

    // 새 사례 생성
    const baseSlug = generateSlug(title, category)
    const uniqueSlug = await ensureUniqueSlug(baseSlug)

    const newCase = await prisma.case.create({
      data: {
        title,
        slug: uniqueSlug,
        category,
        amount: amount ? parseInt(amount) : null,
        content,
        region,
        tip
      }
    })

    return NextResponse.json(newCase, { status: 201 })
  } catch (error) {
    console.error('사례 등록 오류:', error)

    // Prisma 에러 처리
    if (error instanceof Error) {
      if (error.message.includes('Unique constraint')) {
        return NextResponse.json(
          { error: '이미 존재하는 사례입니다. 제목을 변경해주세요.' },
          { status: 409 }
        )
      }
      if (error.message.includes('Invalid input')) {
        return NextResponse.json(
          { error: '입력 데이터가 올바르지 않습니다.' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}
