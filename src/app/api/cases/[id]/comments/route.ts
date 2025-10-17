import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/cases/[id]/comments - 댓글 등록
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { nickname, content } = body

    // 필수 필드 검증
    if (!nickname || !content) {
      return NextResponse.json(
        { error: '닉네임과 내용은 필수입니다.' },
        { status: 400 }
      )
    }

    // 사례 존재 확인
    const existingCase = await prisma.case.findUnique({
      where: { id }
    })

    if (!existingCase) {
      return NextResponse.json(
        { error: '사례를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 댓글 생성
    const comment = await prisma.comment.create({
      data: {
        nickname,
        content,
        caseId: id
      }
    })

    return NextResponse.json(comment, { status: 201 })
  } catch (error) {
    console.error('댓글 등록 오류:', error)
    return NextResponse.json(
      { error: '댓글 등록에 실패했습니다.' },
      { status: 500 }
    )
  }
}
