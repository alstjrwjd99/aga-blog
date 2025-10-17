// Number Utilities
// ================

/**
 * 숫자를 천 단위 콤마로 구분하여 포맷팅
 * @param num - 포맷팅할 숫자
 * @returns 콤마로 구분된 문자열
 */
export const formatToCommaSeparatedNumber = (num: number): string => {
  return new Intl.NumberFormat('ko-KR').format(num)
}

/**
 * 숫자를 한국어 단위로 포맷팅 (만, 억, 조)
 * @param num - 포맷팅할 숫자
 * @returns 한국어 단위로 포맷팅된 문자열
 */
export const formatToKoreanUnit = (num: number): string => {
  if (num >= 1000000000000) {
    return `${(num / 1000000000000).toFixed(1)}조`
  } else if (num >= 100000000) {
    return `${(num / 100000000).toFixed(1)}억`
  } else if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}만`
  } else {
    return formatToCommaSeparatedNumber(num)
  }
}

/**
 * 금액을 원화로 포맷팅
 * @param amount - 금액
 * @returns 원화로 포맷팅된 문자열
 */
export const formatCurrency = (amount: number): string => {
  return `${formatToCommaSeparatedNumber(amount)}원`
}

/**
 * 숫자를 퍼센트로 포맷팅
 * @param num - 숫자 (0-1 사이의 소수)
 * @param decimals - 소수점 자릿수
 * @returns 퍼센트로 포맷팅된 문자열
 */
export const formatPercentage = (num: number, decimals: number = 1): string => {
  return `${(num * 100).toFixed(decimals)}%`
}

/**
 * 숫자를 K, M, B 단위로 축약
 * @param num - 숫자
 * @returns 축약된 문자열
 */
export const formatCompactNumber = (num: number): string => {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)}B`
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`
  } else {
    return num.toString()
  }
}
