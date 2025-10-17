import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

// POST /api/seed - 샘플 데이터 생성
export async function POST(request: NextRequest) {
  try {
    console.log('샘플 데이터를 추가하는 중...')

    // slug 생성 함수
    const generateSlug = (title: string) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9가-힣\s]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim()
    }

    // 샘플 사례 데이터 (간단한 버전)
    const sampleCases = [
      {
        title: '은행 직원인 척하며 계좌 정보를 요구하는 전화',
        slug: generateSlug('은행 직원인 척하며 계좌 정보를 요구하는 전화'),
        category: '보이스피싱',
        amount: 500000,
        content: '오늘 아침 9시경에 은행 직원이라고 하며 계좌 정보를 확인하겠다고 전화가 왔습니다. 전화를 받은 사람은 "○○은행 고객센터입니다. 고객님의 계좌에 이상 거래가 감지되어 확인이 필요합니다"라고 말했습니다.',
        region: '서울',
        tip: '1. 은행에서는 절대 전화로 개인정보를 요구하지 않습니다. 2. 급하게 재촉하는 전화는 피싱일 가능성이 높습니다.'
      },
      {
        title: '카카오페이 해킹 위험 메시지로 개인정보 요구',
        slug: generateSlug('카카오페이 해킹 위험 메시지로 개인정보 요구'),
        category: '문자',
        amount: 0,
        content: '카카오페이에서 보낸 것처럼 위장한 문자를 받았습니다. "카카오페이 고객님, 계정에 이상 접근이 감지되었습니다. 즉시 확인하시기 바랍니다. [링크]"',
        region: '경기',
        tip: '1. 문자로 온 링크는 절대 클릭하지 마세요. 2. 공식 앱이나 웹사이트에서 직접 확인하세요.'
      },
      {
        title: '가짜 쇼핑몰에서 결제 정보 탈취 시도',
        slug: generateSlug('가짜 쇼핑몰에서 결제 정보 탈취 시도'),
        category: '링크',
        amount: 1200000,
        content: '인터넷에서 쇼핑을 하다가 할인율이 높은 쇼핑몰을 발견했습니다. 상품을 주문하고 결제를 진행했는데, 결제가 완료된 후에도 주문 확인 메일이 오지 않았습니다.',
        region: '부산',
        tip: '1. 너무 저렴한 가격의 상품은 의심하세요. 2. 신뢰할 수 있는 쇼핑몰에서만 구매하세요.'
      }
    ]

    // 사례 데이터 생성
    for (const caseData of sampleCases) {
      const createdCase = await prisma.case.create({
        data: caseData
      })

      // 샘플 댓글 추가
      await prisma.comment.create({
        data: {
          nickname: '안전한사용자',
          content: '정말 위험한 상황이었네요. 다행히 피해를 입지 않으셨다니 다행입니다.',
          caseId: createdCase.id
        }
      })

      // 샘플 공감 추가
      await prisma.like.create({
        data: {
          ipAddress: '192.168.1.1',
          caseId: createdCase.id
        }
      })

      console.log(`사례 생성 완료: ${createdCase.title}`)
    }

    console.log('샘플 데이터 추가 완료!')
    return NextResponse.json({ message: '샘플 데이터가 성공적으로 추가되었습니다.' })

  } catch (error) {
    console.error('데이터 추가 중 오류:', error)
    return NextResponse.json({ 
      error: '데이터 추가 중 오류가 발생했습니다.',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    }, { status: 500 })
  }
}
