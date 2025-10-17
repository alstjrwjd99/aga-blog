import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import { OrganizationStructuredData } from '@/components/SEO/StructuredData'
import { seoMetadata } from '@/lib/seo'
import { Metadata } from 'next'
import styles from './page.module.scss'

export const metadata: Metadata = seoMetadata.about()

// 서비스 소개 페이지 컴포넌트 (SSG 최적화)
export default function AboutPage() {
  return (
    <>
      <OrganizationStructuredData />
      <div className={styles.pageContainer}>
        <Container className={styles.pageContent}>
          <div className={styles.aboutContent}>
          {/* 히어로 섹션 */}
          <div className={styles.aboutHero}>
            <div className={styles.aboutIconContainer}>
              <div className={styles.aboutIcon}>
                <Icon name="shield" size="lg" />
              </div>
            </div>

            <h1 className={styles.aboutTitle}>
              피싱 방지 센터
            </h1>
            <p className={styles.aboutSubtitle}>
              실제 피해 사례를 공유하고 예방 정보를 제공하여<br />
              더 안전한 디지털 환경을 만들어갑니다
            </p>
          </div>

          {/* 서비스 목적 */}
          <div className={styles.aboutPurpose}>
            <h2 className={styles.aboutPurposeTitle}>서비스 목적</h2>
            <div className={styles.aboutPurposeGrid}>
              <div className={styles.aboutPurposeItem}>
                <div className={styles.aboutPurposeHeader}>
                  <div className={styles.aboutPurposeIcon}>
                    <Icon name="target" size="md" />
                  </div>
                  <div className={styles.aboutPurposeContent}>
                    <h3 className={styles.aboutPurposeItemTitle}>피해 사례 공유</h3>
                    <p className={styles.aboutPurposeDescription}>
                      실제 피해 사례를 공유하여 다른 사람들이 같은 피해를 입지 않도록 돕습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.aboutPurposeItem}>
                <div className={styles.aboutPurposeHeader}>
                  <div className={styles.aboutPurposeIcon}>
                    <Icon name="users" size="md" />
                  </div>
                  <div className={styles.aboutPurposeContent}>
                    <h3 className={styles.aboutPurposeItemTitle}>커뮤니티 형성</h3>
                    <p className={styles.aboutPurposeDescription}>
                      피해자들이 서로 위로하고 경험을 나누는 안전한 공간을 제공합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.aboutPurposeItem}>
                <div className={styles.aboutPurposeHeader}>
                  <div className={styles.aboutPurposeIcon}>
                    <Icon name="shield" size="md" />
                  </div>
                  <div className={styles.aboutPurposeContent}>
                    <h3 className={styles.aboutPurposeItemTitle}>예방 교육</h3>
                    <p className={styles.aboutPurposeDescription}>
                      다양한 피싱 유형과 예방 방법을 교육하여 시민들의 보안 의식을 높입니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.aboutPurposeItem}>
                <div className={styles.aboutPurposeHeader}>
                  <div className={styles.aboutPurposeIcon}>
                    <Icon name="heart" size="md" />
                  </div>
                  <div className={styles.aboutPurposeContent}>
                    <h3 className={styles.aboutPurposeItemTitle}>사회적 가치</h3>
                    <p className={styles.aboutPurposeDescription}>
                      피싱 피해를 줄여 사회 전체의 디지털 보안 수준을 향상시킵니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 주요 기능 */}
          <div className={styles.aboutFeatures}>
            <h2 className={styles.aboutFeaturesTitle}>주요 기능</h2>
            <div className={styles.aboutFeaturesGrid}>
              <div className={styles.aboutFeatureItem}>
                <div className={`${styles.aboutFeatureIconContainer} ${styles.aboutFeatureIconBlue}`}>
                  <Icon name="users" size="lg" />
                </div>
                <h3 className={styles.aboutFeatureTitle}>사례 공유</h3>
                <p className={styles.aboutFeatureDescription}>
                  실제 피해 사례를 등록하고 공유할 수 있습니다.
                </p>
              </div>

              <div className={styles.aboutFeatureItem}>
                <div className={`${styles.aboutFeatureIconContainer} ${styles.aboutFeatureIconGreen}`}>
                  <Icon name="shield" size="lg" />
                </div>
                <h3 className={styles.aboutFeatureTitle}>예방 정보</h3>
                <p className={styles.aboutFeatureDescription}>
                  각 사례별 예방 팁과 대응 방법을 제공합니다.
                </p>
              </div>

              <div className={styles.aboutFeatureItem}>
                <div className={`${styles.aboutFeatureIconContainer} ${styles.aboutFeatureIconPurple}`}>
                  <Icon name="bar-chart" size="lg" />
                </div>
                <h3 className={styles.aboutFeatureTitle}>통계 분석</h3>
                <p className={styles.aboutFeatureDescription}>
                  피해 유형별 통계와 트렌드를 분석합니다.
                </p>
              </div>
            </div>
          </div>

          {/* 피싱 유형별 안내 */}
          <div className={styles.aboutPhishingTypes}>
            <h2 className={styles.aboutPhishingTypesTitle}>피싱 유형별 안내</h2>
            <div className={styles.aboutPhishingTypesGrid}>
              {[
                {
                  type: '보이스피싱',
                  description: '전화를 통해 개인정보나 금융정보를 요구하는 사기',
                  example: '은행 직원인 척하며 계좌 정보 확인 요구'
                },
                {
                  type: '문자피싱',
                  description: 'SMS를 통해 가짜 링크나 개인정보를 요구하는 사기',
                  example: '카카오페이 해킹 위험 메시지로 개인정보 요구'
                },
                {
                  type: '링크피싱',
                  description: '가짜 웹사이트로 유도하여 개인정보를 탈취하는 사기',
                  example: '가짜 쇼핑몰에서 결제 정보 탈취 시도'
                },
                {
                  type: 'SNS피싱',
                  description: '소셜미디어를 통해 가짜 이벤트나 정보를 유포하는 사기',
                  example: '인스타그램 DM으로 가짜 이벤트 참여 유도'
                },
                {
                  type: '리뷰알바',
                  description: '가짜 리뷰 작성을 명목으로 개인정보를 수집하는 사기',
                  example: '리뷰 작성 알바로 개인정보 수집 시도'
                },
                {
                  type: '기타',
                  description: '기타 다양한 방법으로 개인정보를 탈취하는 사기',
                  example: '택배 배송 문제로 개인정보 확인 요구'
                }
              ].map((item) => (
                <div key={item.type} className={styles.aboutPhishingTypeItem}>
                  <h3 className={styles.aboutPhishingTypeTitle}>{item.type}</h3>
                  <p className={styles.aboutPhishingTypeDescription}>{item.description}</p>
                  <div className={styles.aboutPhishingTypeExample}>
                    예시: {item.example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 교육 콘텐츠 섹션 */}
          <div className={styles.aboutEducationContent}>
            <h2 className={styles.aboutEducationContentTitle}>교육 콘텐츠</h2>
            <div className={styles.aboutEducationContentItem}>
              <div className={styles.aboutEducationContentHeader}>
                <div className={styles.aboutEducationContentInfo}>
                  <p className={styles.aboutEducationContentDescription}>
                    실제 피해 사례를 바탕으로 한 상세한 피싱 예방 교육 콘텐츠를 제공합니다.
                    다양한 피싱 유형별 대응 방법과 예방 팁을 영상으로 쉽게 학습할 수 있습니다.
                  </p>
                  <Button
                    href="https://www.youtube.com/channel/UCpRmmlNYnGKL2zfa63m8Z-Q"
                    variant="outline"
                    size="md"
                    className={styles.aboutEducationContentButton}
                  >
                    유튜브 채널 보기
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* 긴급 신고 안내 */}
          <div className={styles.aboutEmergencyReport}>
            <div className={styles.aboutEmergencyHeader}>
              <div className={styles.aboutEmergencyIcon}>
                <Icon name="alert-triangle" size="md" />
              </div>
              <h2 className={styles.aboutEmergencyTitle}>긴급 피싱 신고 안내</h2>
            </div>

            <div className={styles.aboutEmergencyGrid}>
              <div className={styles.aboutEmergencyItem}>
                <div className={styles.aboutEmergencyItemHeader}>
                  <h3 className={styles.aboutEmergencyItemTitle}>경찰청 사이버범죄신고센터</h3>
                </div>
                <div className={styles.aboutEmergencyItemContent}>
                  <p><strong>웹사이트:</strong> cyberbureau.police.go.kr</p>
                  <p><strong>전화:</strong> 국번없이 182</p>
                  <p><strong>운영시간:</strong> 24시간</p>
                </div>
              </div>

              <div className={styles.aboutEmergencyItem}>
                <div className={styles.aboutEmergencyItemHeader}>
                  <h3 className={styles.aboutEmergencyItemTitle}>금융감독원 피싱신고센터</h3>
                </div>
                <div className={styles.aboutEmergencyItemContent}>
                  <p><strong>웹사이트:</strong> phishing.fss.or.kr</p>
                  <p><strong>전화:</strong> 국번없이 1332</p>
                  <p><strong>운영시간:</strong> 평일 9:00-18:00</p>
                </div>
              </div>
            </div>

            <div className={styles.aboutEmergencyNotice}>
              <p>
                <strong>주의:</strong> 피싱 피해를 당했다면 즉시 해당 기관에 신고하고,
                개인정보 유출이 의심되면 관련 계좌나 카드를 즉시 정지하세요.
              </p>
            </div>
          </div>

          {/* 이용 안내 */}
          <div className={styles.aboutUsageGuide}>
            <h2 className={styles.aboutUsageGuideTitle}>이용 안내</h2>
            <div className={styles.aboutUsageGuideItems}>
              <div className={`${styles.aboutUsageGuideItem} ${styles.aboutUsageGuideBlue}`}>
                <h3 className={styles.aboutUsageGuideItemTitle}>사례 등록 시 주의사항</h3>
                <ul className={styles.aboutUsageGuideList}>
                  <li>개인정보(실명, 전화번호, 계좌번호 등)는 절대 포함하지 마세요</li>
                  <li>정확하고 객관적인 정보만 제공해주세요</li>
                  <li>허위 정보나 악의적인 내용은 삭제될 수 있습니다</li>
                  <li>긴급한 피해 신고는 경찰청(182)에 먼저 연락하세요</li>
                </ul>
              </div>

              <div className={`${styles.aboutUsageGuideItem} ${styles.aboutUsageGuideGreen}`}>
                <h3 className={styles.aboutUsageGuideItemTitle}>댓글 작성 시 주의사항</h3>
                <ul className={styles.aboutUsageGuideList}>
                  <li>건전하고 건설적인 댓글을 작성해주세요</li>
                  <li>개인정보나 민감한 정보는 포함하지 마세요</li>
                  <li>타인을 비방하거나 욕설을 사용하지 마세요</li>
                  <li>스팸이나 광고성 내용은 금지됩니다</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA 섹션 */}
          <div className={styles.aboutCta}>
            <h2 className={styles.aboutCtaTitle}>
              함께 만들어가는 안전한 디지털 환경
            </h2>
            <p className={styles.aboutCtaDescription}>
              여러분의 경험과 정보가 다른 사람들을 보호하는 소중한 자산이 됩니다.
              피해 사례를 공유하고 예방 정보를 제공해주세요.
            </p>
            <div className={styles.aboutCtaActions}>
              <Button href="/cases/submit" size="lg">
                피해 사례 등록하기
              </Button>
              <Button href="/cases" variant="outline" size="lg">
                사례 목록 보기
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
    </>
  )
}
