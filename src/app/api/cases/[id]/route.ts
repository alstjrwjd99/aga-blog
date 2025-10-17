import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const caseData = await prisma.case.findUnique({
      where: { id },
      include: {
        comments: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            comments: true,
            likes: true
          }
        }
      }
    })

    if (!caseData) {
      return NextResponse.json(
        { error: '사례를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json(caseData)
  } catch (error) {
    console.error('사례 조회 오류:', error)
    return NextResponse.json(
      { error: '사례를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// PUT /api/cases/[id] - 사례 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, category, amount, content, region, tip } = body

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

    // 사례 수정
    const updatedCase = await prisma.case.update({
      where: { id },
      data: {
        title,
        category,
        amount: amount ? parseInt(amount) : null,
        content,
        region,
        tip
      }
    })

    return NextResponse.json(updatedCase)
  } catch (error) {
    console.error('사례 수정 오류:', error)
    return NextResponse.json(
      { error: '사례 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE /api/cases/[id] - 사례 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

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

    // 사례 삭제 (관련 댓글과 공감도 함께 삭제됨 - Cascade)
    await prisma.case.delete({
      where: { id }
    })

    return NextResponse.json({ message: '사례가 삭제되었습니다.' })
  } catch (error) {
    console.error('사례 삭제 오류:', error)
    return NextResponse.json(
      { error: '사례 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
}
