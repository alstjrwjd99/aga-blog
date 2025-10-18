import { prisma } from '@/lib/prisma'
import { ImageResponse } from 'next/og'

// 카테고리별 색상 매핑
const categoryColors = {
  '보이스피싱': {
    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
    icon: '📞',
    text: '전화로 시작되는 피해'
  },
  '문자': {
    background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
    icon: '📱',
    text: '문자로 시작되는 피해'
  },
  '링크': {
    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
    icon: '🔗',
    text: '링크로 시작되는 피해'
  },
  'SNS': {
    background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)',
    icon: '📱',
    text: 'SNS로 시작되는 피해'
  },
  '리뷰알바': {
    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
    icon: '💼',
    text: '알바로 시작되는 피해'
  },
  '기타': {
    background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
    icon: '⚠️',
    text: '기타 피싱 피해'
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // 다중 디코딩 처리
    let decodedSlug = slug
    try {
      decodedSlug = decodeURIComponent(slug)
      if (decodedSlug !== slug) {
        decodedSlug = decodeURIComponent(decodedSlug)
      }
    } catch (decodeError) {
      decodedSlug = slug
    }

    // 사례 데이터 조회
    const caseData = await prisma.case.findUnique({
      where: { slug: decodedSlug }
    })

    if (!caseData) {
      // 기본 OG 이미지 반환
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <div style={{ fontSize: 120, marginBottom: 20 }}>🛡️</div>
            <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 20 }}>
              피싱 방지 센터
            </div>
            <div style={{ fontSize: 24, opacity: 0.9 }}>
              사례를 찾을 수 없습니다
            </div>
          </div>
        ),
        { width: 1200, height: 630 }
      )
    }

    // 카테고리별 스타일 가져오기
    const categoryStyle = categoryColors[caseData.category as keyof typeof categoryColors] || categoryColors['기타']

    // 피해 금액 포맷팅
    const formatAmount = (amount: number | null) => {
      if (!amount) return ''
      return new Intl.NumberFormat('ko-KR').format(amount) + '원'
    }

    return new ImageResponse(
      (
        <div
          style={{
            background: categoryStyle.background,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
            padding: '60px',
          }}
        >
          {/* 카테고리 아이콘 */}
          <div style={{ fontSize: 80, marginBottom: 20 }}>
            {categoryStyle.icon}
          </div>

          {/* 사례 제목 */}
          <div style={{
            fontSize: 48,
            fontWeight: 'bold',
            marginBottom: 20,
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '90%'
          }}>
            {caseData.title}
          </div>

          {/* 카테고리 및 피해 금액 */}
          <div style={{
            fontSize: 24,
            opacity: 0.9,
            textAlign: 'center',
            marginBottom: 20
          }}>
            {caseData.category} {formatAmount(caseData.amount)}
          </div>

          {/* 하단 브랜딩 */}
          <div style={{
            position: 'absolute',
            bottom: 40,
            right: 40,
            fontSize: 20,
            opacity: 0.8
          }}>
            phishing-prevention.kr
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (error) {
    console.error('OG 이미지 생성 오류:', error)

    // 에러 시 기본 이미지 반환
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div style={{ fontSize: 120, marginBottom: 20 }}>🛡️</div>
          <div style={{ fontSize: 48, fontWeight: 'bold', marginBottom: 20 }}>
            피싱 방지 센터
          </div>
          <div style={{ fontSize: 24, opacity: 0.9 }}>
            안전한 디지털 환경을 만들어갑니다
          </div>
        </div>
      ),
      { width: 1200, height: 630 }
    )
  }
}
