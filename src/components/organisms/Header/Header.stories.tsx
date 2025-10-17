// src/components/organisms/Header/Header.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import Header from './index'

const meta: Meta<typeof Header> = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}

export const WithSearch: Story = {
  render: () => (
    <div style={{ background: '#F9FAFB', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Header with Search</h1>
        <p style={{ color: '#6B7280' }}>
          This shows the header with the search functionality.
        </p>
      </div>
    </div>
  ),
}

export const NavigationItems: Story = {
  render: () => (
    <div style={{ background: '#F9FAFB', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '2rem' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Navigation Items</h1>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ color: '#374151', marginBottom: '1rem' }}>Available Navigation:</h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
              <strong>홈</strong> - 메인 페이지
            </li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
              <strong>사례</strong> - 피싱 사례 목록
            </li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
              <strong>가이드</strong> - 피싱 예방 가이드
            </li>
            <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #F3F4F6' }}>
              <strong>소개</strong> - 서비스 소개
            </li>
            <li style={{ padding: '0.5rem 0' }}>
              <strong>사례 제보</strong> - 새로운 피싱 사례 제보
            </li>
          </ul>
        </div>
      </div>
    </div>
  ),
}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: () => (
    <div style={{ background: '#F9FAFB', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '1rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem', fontSize: '1.5rem' }}>Mobile Header</h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
          This shows how the header looks on mobile devices.
        </p>
      </div>
    </div>
  ),
}

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  render: () => (
    <div style={{ background: '#F9FAFB', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Tablet Header</h1>
        <p style={{ color: '#6B7280' }}>
          This shows how the header looks on tablet devices.
        </p>
      </div>
    </div>
  ),
}

export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  render: () => (
    <div style={{ background: '#F9FAFB', minHeight: '100vh' }}>
      <Header />
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Desktop Header</h1>
        <p style={{ color: '#6B7280' }}>
          This shows how the header looks on desktop devices.
        </p>
      </div>
    </div>
  ),
}
