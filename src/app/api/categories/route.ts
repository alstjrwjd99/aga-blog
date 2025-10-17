import { NextResponse } from 'next/server'

// 카테고리 목록 API
export async function GET() {
  try {
    // 실제 구현에서는 데이터베이스에서 카테고리를 가져와야 합니다
    const categories = [
      '피싱',
      '스미싱',
      '보이스피싱',
      'SNS 피싱',
      '리뷰알바',
      '기타'
    ]

    return NextResponse.json(categories)
  } catch (error) {
    console.error('Categories API error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
