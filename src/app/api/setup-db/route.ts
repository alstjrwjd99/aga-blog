import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    console.log('데이터베이스 스키마를 생성하는 중...')

    // 데이터베이스 연결 테스트
    await prisma.$connect()
    console.log('데이터베이스 연결 성공!')

    // 스키마 푸시 (테이블 생성)
    const { execSync } = require('child_process')
    
    try {
      // Prisma 스키마를 데이터베이스에 푸시
      execSync('npx prisma db push --accept-data-loss', { 
        stdio: 'inherit',
        env: { ...process.env }
      })
      console.log('스키마 푸시 완료!')
    } catch (pushError) {
      console.error('스키마 푸시 오류:', pushError)
      return NextResponse.json({
        success: false,
        message: '스키마 푸시 실패',
        error: pushError instanceof Error ? pushError.message : '알 수 없는 오류'
      }, { status: 500 })
    }

    // 테이블 존재 확인
    const caseCount = await prisma.case.count()
    const commentCount = await prisma.comment.count()
    const likeCount = await prisma.like.count()

    return NextResponse.json({
      success: true,
      message: '데이터베이스 스키마 생성 완료!',
      data: {
        caseCount,
        commentCount,
        likeCount,
        tablesCreated: true
      }
    })

  } catch (error) {
    console.error('데이터베이스 스키마 생성 오류:', error)
    return NextResponse.json({
      success: false,
      message: '데이터베이스 스키마 생성 실패',
      error: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
