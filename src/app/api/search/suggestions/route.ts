import { NextRequest, NextResponse } from 'next/server'

// 실제 구현에서는 데이터베이스에서 검색어를 가져와야 합니다
const mockSuggestions = [
  '보이스피싱',
  '문자 피싱',
  '링크 피싱',
  'SNS 피싱',
  '리뷰알바 피싱',
  '택배 피싱',
  '금융 피싱',
  '쇼핑몰 피싱',
  '게임 피싱',
  '투자 피싱',
  '대출 피싱',
  '보험 피싱',
  '통신 피싱',
  '교육 피싱',
  '의료 피싱',
  '카카오톡 피싱',
  '네이버 피싱',
  '구글 피싱',
  '아마존 피싱',
  '쿠팡 피싱',
  '배달의민족 피싱',
  '요기요 피싱',
  '우버 피싱',
  '그랩 피싱',
  '비트코인 피싱',
  '이더리움 피싱',
  'NFT 피싱',
  '메타버스 피싱',
  '인스타그램 피싱',
  '페이스북 피싱',
  '틱톡 피싱',
  '유튜브 피싱',
  '트위터 피싱',
  '디스코드 피싱',
  '텔레그램 피싱',
  '왓츠앱 피싱',
  '라인 피싱',
  '위챗 피싱',
  '알리바바 피싱',
  '테슬라 피싱',
  '애플 피싱',
  '삼성 피싱',
  'LG 피싱',
  '현대 피싱',
  '기아 피싱',
  'SK 피싱',
  'KT 피싱',
  'LG유플러스 피싱'
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.length < 2) {
      return NextResponse.json([])
    }

    // 더 정교한 검색 알고리즘
    const filteredSuggestions = mockSuggestions
      .filter(suggestion => {
        const lowerSuggestion = suggestion.toLowerCase()
        const lowerQuery = query.toLowerCase()

        // 정확히 일치하는 경우 우선순위 높음
        if (lowerSuggestion === lowerQuery) return true

        // 시작하는 경우 우선순위 높음
        if (lowerSuggestion.startsWith(lowerQuery)) return true

        // 포함하는 경우
        if (lowerSuggestion.includes(lowerQuery)) return true

        return false
      })
      .sort((a, b) => {
        const lowerA = a.toLowerCase()
        const lowerB = b.toLowerCase()
        const lowerQuery = query.toLowerCase()

        // 정확히 일치하는 것을 맨 앞으로
        if (lowerA === lowerQuery) return -1
        if (lowerB === lowerQuery) return 1

        // 시작하는 것을 우선순위로
        if (lowerA.startsWith(lowerQuery) && !lowerB.startsWith(lowerQuery)) return -1
        if (lowerB.startsWith(lowerQuery) && !lowerA.startsWith(lowerQuery)) return 1

        // 알파벳 순으로 정렬
        return lowerA.localeCompare(lowerB)
      })
      .slice(0, 8) // 최대 8개 반환

    return NextResponse.json(filteredSuggestions)
  } catch (error) {
    console.error('Search suggestions error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
