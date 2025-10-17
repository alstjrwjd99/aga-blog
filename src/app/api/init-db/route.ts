import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/init-db - 데이터베이스 초기화 및 연결 테스트
export async function GET(request: NextRequest) {
  try {
    // 데이터베이스 연결 테스트
    await prisma.$connect()

    // 테이블 존재 확인
    const caseCount = await prisma.case.count()
    const commentCount = await prisma.comment.count()
    const likeCount = await prisma.like.count()

    return NextResponse.json({
      success: true,
      message: '데이터베이스 연결 성공',
      data: {
        caseCount,
        commentCount,
        likeCount,
        databaseUrl: process.env.DATABASE_URL ? '설정됨' : '설정되지 않음'
      }
    })
  } catch (error) {
    console.error('데이터베이스 연결 오류:', error)
    return NextResponse.json({
      success: false,
      message: '데이터베이스 연결 실패',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}

// POST /api/init-db - 샘플 데이터 생성
export async function POST(request: NextRequest) {
  try {
    // 샘플 사례 데이터
    const sampleCase = await prisma.case.create({
      data: {
        id: 'test_case_001',
        title: '테스트 피싱 사례',
        slug: 'test-phishing-case',
        category: '보이스피싱',
        amount: 100000,
        content: '테스트용 피싱 사례입니다.',
        region: '서울',
        tip: '테스트용 예방 팁입니다.'
      }
    })

    return NextResponse.json({
      success: true,
      message: '샘플 데이터 생성 성공',
      data: sampleCase
    })
  } catch (error) {
    console.error('샘플 데이터 생성 오류:', error)
    return NextResponse.json({
      success: false,
      message: '샘플 데이터 생성 실패',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  }
}
