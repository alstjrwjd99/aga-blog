// src/components/organisms/Footer/Footer.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import Footer from './index'

const meta: Meta<typeof Footer> = {
  title: 'Organisms/Footer',
  component: Footer,
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

export const WithContent: Story = {
  render: () => (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Page Content</h1>
        <p style={{ color: '#6B7280' }}>
          This is the main content area. The footer will be at the bottom.
        </p>
      </div>
      <Footer />
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
    <div style={{ background: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '1rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem', fontSize: '1.5rem' }}>Mobile Footer</h1>
        <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
          This shows how the footer looks on mobile devices.
        </p>
      </div>
      <Footer />
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
    <div style={{ background: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Tablet Footer</h1>
        <p style={{ color: '#6B7280' }}>
          This shows how the footer looks on tablet devices.
        </p>
      </div>
      <Footer />
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
    <div style={{ background: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Desktop Footer</h1>
        <p style={{ color: '#6B7280' }}>
          This shows how the footer looks on desktop devices.
        </p>
      </div>
      <Footer />
    </div>
  ),
}

export const FooterOnly: Story = {
  render: () => (
    <div style={{ background: '#F9FAFB', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Footer Component</h1>
        <p style={{ color: '#6B7280', marginBottom: '2rem' }}>
          This shows just the footer component in isolation.
        </p>
        <Footer />
      </div>
    </div>
  ),
}
