// src/components/templates/PageLayout/PageLayout.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import PageLayout from './index'

const meta: Meta<typeof PageLayout> = {
  title: 'Templates/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Page Layout</h1>
        <p style={{ color: '#6B7280' }}>
          This is the default page layout with header and footer.
        </p>
      </div>
    ),
  },
}

export const WithContent: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem'
        }}>
          <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Main Content</h1>
          <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>
            This is the main content area of the page. It includes header and footer components.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              background: '#EFF6FF',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #DBEAFE'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#1E40AF' }}>Feature 1</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#3B82F6' }}>Description</p>
            </div>
            <div style={{
              background: '#F0FDF4',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #BBF7D0'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#166534' }}>Feature 2</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#16A34A' }}>Description</p>
            </div>
            <div style={{
              background: '#FEF3C7',
              padding: '1rem',
              borderRadius: '0.5rem',
              border: '1px solid #FDE68A'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#92400E' }}>Feature 3</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#D97706' }}>Description</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
}

export const LongContent: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            marginBottom: '1rem'
          }}>
            <h2 style={{ color: '#111827', marginBottom: '0.5rem' }}>
              Section {i + 1}
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '1rem' }}>
              This is section {i + 1} content. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div style={{
              background: '#F9FAFB',
              padding: '1rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              color: '#6B7280'
            }}>
              Additional content for section {i + 1}
            </div>
          </div>
        ))}
      </div>
    ),
  },
}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    children: (
      <div style={{ padding: '1rem' }}>
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: '#111827', marginBottom: '1rem', fontSize: '1.5rem' }}>Mobile Layout</h1>
          <p style={{ color: '#6B7280', fontSize: '0.875rem' }}>
            This shows how the page layout looks on mobile devices.
          </p>
        </div>
      </div>
    ),
  },
}

export const TabletView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
  },
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Tablet Layout</h1>
          <p style={{ color: '#6B7280' }}>
            This shows how the page layout looks on tablet devices.
          </p>
        </div>
      </div>
    ),
  },
}

export const DesktopView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
  args: {
    children: (
      <div style={{ padding: '2rem' }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <h1 style={{ color: '#111827', marginBottom: '1rem' }}>Desktop Layout</h1>
          <p style={{ color: '#6B7280' }}>
            This shows how the page layout looks on desktop devices.
          </p>
        </div>
      </div>
    ),
  },
}
