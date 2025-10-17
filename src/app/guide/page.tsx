'use client'

import Button from '@/components/atoms/Button'
import Card from '@/components/atoms/Card'
import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import { useState } from 'react'
import styles from './page.module.scss'

export default function GuidePage() {
  const [activeSection, setActiveSection] = useState('signs')

  const sections = [
    { id: 'signs', title: '피싱 징후 인지', icon: 'eye' },
    { id: 'privacy', title: '개인정보 보호', icon: 'shield' },
    { id: 'payment', title: '안전한 결제 습관', icon: 'credit-card' },
    { id: 'action', title: '의심 시 행동 절차', icon: 'alert-triangle' },
    { id: 'report', title: '신고 채널', icon: 'phone' }
  ]

  const phishingSigns = [
    {
      title: '긴급함을 강조하는 메시지',
      description: '즉시 행동하라고 요구하거나 시간 제한을 두는 메시지',
      icon: 'clock',
      color: 'danger'
    },
    {
      title: '개인정보 요구',
      description: '전화나 문자로 비밀번호, 계좌번호, 주민번호 등을 요구',
      icon: 'user',
      color: 'warning'
    },
    {
      title: '의심스러운 링크',
      description: '짧은 URL이나 오타가 있는 도메인명의 링크',
      icon: 'link',
      color: 'primary'
    },
    {
      title: '기관 사칭',
      description: '정부기관, 금융기관, 통신사 등을 사칭하는 연락',
      icon: 'building',
      color: 'secondary'
    }
  ]

  const privacyTips = [
    {
      title: '2단계 인증 활성화',
      description: '모든 중요한 계정에 2단계 인증을 설정하세요',
      icon: 'shield-check',
      color: 'success'
    },
    {
      title: '정기적인 비밀번호 변경',
      description: '3-6개월마다 비밀번호를 변경하고 강력한 비밀번호를 사용하세요',
      icon: 'key',
      color: 'primary'
    },
    {
      title: '개인정보 최소화',
      description: '온라인에서 필요한 최소한의 정보만 공개하세요',
      icon: 'eye-off',
      color: 'warning'
    },
    {
      title: '소셜미디어 보안 설정',
      description: 'SNS 계정의 공개 범위를 제한하고 친구 요청을 신중히 검토하세요',
      icon: 'users',
      color: 'secondary'
    }
  ]

  const paymentTips = [
    {
      title: '공식 사이트 확인',
      description: 'URL과 SSL 인증서를 확인하고 공식 사이트인지 검증하세요',
      icon: 'globe',
      color: 'success'
    },
    {
      title: '안전한 결제 수단 사용',
      description: '신용카드나 안전한 결제 서비스를 이용하고 계좌이체는 피하세요',
      icon: 'credit-card',
      color: 'primary'
    },
    {
      title: '거래 내역 확인',
      description: '정기적으로 계좌와 카드 사용 내역을 확인하세요',
      icon: 'file-text',
      color: 'warning'
    },
    {
      title: '의심스러운 결제 요청 거부',
      description: '예상치 못한 결제 요청이나 추가 비용 요구를 거부하세요',
      icon: 'x-circle',
      color: 'danger'
    }
  ]

  const actionSteps = [
    {
      step: 1,
      title: '즉시 연락 중단',
      description: '의심스러운 전화나 메시지에 즉시 응답하지 마세요',
      icon: 'phone-off',
      color: 'danger'
    },
    {
      step: 2,
      title: '공식 채널로 확인',
      description: '해당 기관의 공식 웹사이트나 전화번호로 직접 문의하세요',
      icon: 'phone',
      color: 'primary'
    },
    {
      step: 3,
      title: '계정 보안 강화',
      description: '비밀번호를 변경하고 2단계 인증을 설정하세요',
      icon: 'shield',
      color: 'success'
    },
    {
      step: 4,
      title: '신고 및 차단',
      description: '피싱 신고센터에 신고하고 해당 번호나 계정을 차단하세요',
      icon: 'flag',
      color: 'warning'
    }
  ]

  const reportChannels = [
    {
      title: '경찰청 사이버범죄신고센터',
      phone: '182',
      website: 'cyberbureau.police.go.kr',
      description: '사이버 범죄 전반에 대한 신고',
      icon: 'shield',
      color: 'primary'
    },
    {
      title: '금융감독원 피싱신고센터',
      phone: '1332',
      website: 'phishing.fss.or.kr',
      description: '금융 관련 피싱 사기 신고',
      icon: 'banknote',
      color: 'success'
    },
    {
      title: 'KISA 피싱신고센터',
      phone: '1588-1234',
      website: 'phishing.kisa.or.kr',
      description: '피싱 사이트 및 악성코드 신고',
      icon: 'monitor',
      color: 'secondary'
    },
    {
      title: '국번없이 112',
      phone: '112',
      website: 'police.go.kr',
      description: '긴급상황 시 즉시 신고',
      icon: 'alert-triangle',
      color: 'danger'
    }
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'signs':
        return (
          <div className="guide-section">
            <h2 className="guide-section-title">피싱 징후를 미리 알아두세요</h2>
            <p className="guide-section-description">
              피싱 사기범들이 사용하는 일반적인 수법들을 알아두면 피해를 예방할 수 있습니다.
            </p>
            <div className="tips-grid">
              {phishingSigns.map((sign, index) => (
                <Card key={index} className="tip-card">
                  <div className="tip-header">
                    <div className={`tip-icon tip-icon-${sign.color}`}>
                      <Icon name={sign.icon} size="lg" />
                    </div>
                    <h3 className="tip-title">{sign.title}</h3>
                  </div>
                  <p className="tip-description">{sign.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'privacy':
        return (
          <div className="guide-section">
            <h2 className="guide-section-title">개인정보를 안전하게 보호하세요</h2>
            <p className="guide-section-description">
              개인정보 보호를 위한 기본적인 보안 수칙들을 실천해보세요.
            </p>
            <div className="tips-grid">
              {privacyTips.map((tip, index) => (
                <Card key={index} className="tip-card">
                  <div className="tip-header">
                    <div className={`tip-icon tip-icon-${tip.color}`}>
                      <Icon name={tip.icon} size="lg" />
                    </div>
                    <h3 className="tip-title">{tip.title}</h3>
                  </div>
                  <p className="tip-description">{tip.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'payment':
        return (
          <div className="guide-section">
            <h2 className="guide-section-title">안전한 온라인 결제 습관</h2>
            <p className="guide-section-description">
              온라인 쇼핑이나 결제 시 주의해야 할 사항들을 확인하세요.
            </p>
            <div className="tips-grid">
              {paymentTips.map((tip, index) => (
                <Card key={index} className="tip-card">
                  <div className="tip-header">
                    <div className={`tip-icon tip-icon-${tip.color}`}>
                      <Icon name={tip.icon} size="lg" />
                    </div>
                    <h3 className="tip-title">{tip.title}</h3>
                  </div>
                  <p className="tip-description">{tip.description}</p>
                </Card>
              ))}
            </div>
          </div>
        )

      case 'action':
        return (
          <div className="guide-section">
            <h2 className="guide-section-title">의심스러운 상황 발생 시 행동 절차</h2>
            <p className="guide-section-description">
              피싱을 의심할 때 따라야 할 단계별 행동 가이드입니다.
            </p>
            <div className="steps-container">
              {actionSteps.map((step, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{step.step}</div>
                  <Card className="step-card">
                    <div className="step-header">
                      <div className={`step-icon step-icon-${step.color}`}>
                        <Icon name={step.icon} size="lg" />
                      </div>
                      <h3 className="step-title">{step.title}</h3>
                    </div>
                    <p className="step-description">{step.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )

      case 'report':
        return (
          <div className="guide-section">
            <h2 className="guide-section-title">피싱 신고 채널</h2>
            <p className="guide-section-description">
              피싱 피해를 당했거나 의심스러운 사이트를 발견했을 때 신고할 수 있는 기관들입니다.
            </p>
            <div className="report-grid">
              {reportChannels.map((channel, index) => (
                <Card key={index} className="report-item">
                  <div className="report-header">
                    <div className={`report-icon report-icon-${channel.color}`}>
                      <Icon name={channel.icon} size="lg" />
                    </div>
                    <h3 className="report-title">{channel.title}</h3>
                  </div>
                  <div className="report-info">
                    <div className="report-phone">
                      <Icon name="phone" size="sm" />
                      <span>{channel.phone}</span>
                    </div>
                    <div className="report-website">
                      <Icon name="globe" size="sm" />
                      <a href={`https://${channel.website}`} target="_blank" rel="noopener noreferrer">
                        {channel.website}
                      </a>
                    </div>
                  </div>
                  <p className="report-description">{channel.description}</p>
                  <Button
                    href={`tel:${channel.phone}`}
                    variant="outline"
                    size="sm"
                    className="report-button"
                  >
                    <Icon name="phone" size="sm" />
                    전화하기
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={styles.pageContainer}>
      <Container className={styles.pageContent}>
        <div className={styles.guideContent}>
          <div className={styles.guideHero}>
            <h1 className={styles.guideTitle}>
              피싱 예방 가이드
            </h1>
            <p className={styles.guideSubtitle}>
              피싱 사기로부터 안전하게 보호받을 수 있는 방법들을 알아보세요
            </p>
          </div>

          <div className="guide-layout">
            <div className="guide-sidebar">
            <Card className="card-padding-lg sticky-sidebar">
              <h3 className="sidebar-title">목차</h3>
              <nav className="sidebar-nav">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                  >
                    <Icon name={section.icon} size="sm" />
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>

              {/* PDF 다운로드 버튼 */}
              <div className="download-section">
                <Button
                  variant="outline"
                  size="sm"
                  className="download-button"
                >
                  <Icon name="download" size="sm" />
                  PDF 다운로드
                </Button>
              </div>
            </Card>
          </div>

          {/* 메인 콘텐츠 */}
          <div className="guide-main">
            <Card className="card-padding-lg">
              {renderContent()}
            </Card>
          </div>
        </div>
        </div>
      </Container>
    </div>
  )
}
