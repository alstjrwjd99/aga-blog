import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// POST /api/cases/[id]/like - 공감(좋아요) 토글
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // 클라이언트 IP 주소 가져오기
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

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

    // 기존 공감 확인
    const existingLike = await prisma.like.findUnique({
      where: {
        caseId_ipAddress: {
          caseId: id,
          ipAddress: ip
        }
      }
    })

    if (existingLike) {
      // 공감 취소
      await prisma.like.delete({
        where: {
          caseId_ipAddress: {
            caseId: id,
            ipAddress: ip
          }
        }
      })
      
      return NextResponse.json({ 
        message: '공감이 취소되었습니다.',
        liked: false 
      })
    } else {
      // 공감 추가
      await prisma.like.create({
        data: {
          caseId: id,
          ipAddress: ip
        }
      })
      
      return NextResponse.json({ 
        message: '공감이 추가되었습니다.',
        liked: true 
      })
    }
  } catch (error) {
    console.error('공감 처리 오류:', error)
    return NextResponse.json(
      { error: '공감 처리에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// GET /api/cases/[id]/like - 공감 상태 확인
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // 클라이언트 IP 주소 가져오기
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown'

    // 공감 상태 확인
    const existingLike = await prisma.like.findUnique({
      where: {
        caseId_ipAddress: {
          caseId: id,
          ipAddress: ip
        }
      }
    })

    // 총 공감 수 조회
    const totalLikes = await prisma.like.count({
      where: { caseId: id }
    })

    return NextResponse.json({
      liked: !!existingLike,
      totalLikes
    })
  } catch (error) {
    console.error('공감 상태 확인 오류:', error)
    return NextResponse.json(
      { error: '공감 상태를 확인하는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
