// src/components/atoms/Card/Card.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import Card from './index'

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    interactive: {
      control: { type: 'boolean' },
    },
    className: {
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
          Card Title
        </h3>
        <p style={{ margin: 0, color: '#6B7280' }}>
          This is a basic card with some content inside.
        </p>
      </div>
    ),
  },
}

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <div style={{ padding: '1rem' }}>
        <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600' }}>
          Interactive Card
        </h3>
        <p style={{ margin: 0, color: '#6B7280' }}>
          This card has hover effects and is clickable.
        </p>
      </div>
    ),
  },
}

export const WithStats: Story = {
  args: {
    children: (
      <div style={{ padding: '1.5rem', textAlign: 'center' }}>
        <div style={{
          width: '48px',
          height: '48px',
          background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
          color: '#5A8DEE'
        }}>
          📊
        </div>
        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.5rem', fontWeight: '700' }}>
          1,234
        </h3>
        <p style={{ margin: 0, color: '#6B7280', fontSize: '0.875rem' }}>
          Total Cases
        </p>
      </div>
    ),
  },
}

export const WarningCard: Story = {
  args: {
    children: (
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1rem'
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            background: 'rgba(239, 68, 68, 0.1)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#EF4444'
          }}>
            ⚠️
          </div>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
            Warning Alert
          </h3>
        </div>
        <p style={{ margin: 0, color: '#6B7280' }}>
          This is a warning card with an icon and important information.
        </p>
      </div>
    ),
  },
}

export const CategoryCard: Story = {
  args: {
    children: (
      <div style={{ padding: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '1rem'
        }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>
            보이스피싱
          </h3>
          <span style={{
            padding: '0.25rem 0.75rem',
            background: 'rgba(255, 217, 61, 0.1)',
            color: '#B8860B',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '500',
            border: '1px solid rgba(255, 217, 61, 0.2)'
          }}>
            15건
          </span>
        </div>
        <p style={{ margin: '0 0 1rem 0', color: '#6B7280', fontSize: '0.875rem' }}>
          보이스피싱 관련 피싱 사례입니다.
        </p>
        <div style={{
          width: '100%',
          height: '8px',
          background: '#E5E7EB',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            width: '75%',
            height: '100%',
            background: 'linear-gradient(90deg, #FFD93D, #FFC107)',
            borderRadius: '4px'
          }} />
        </div>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'right' }}>
          전체 대비 75.0%
        </p>
      </div>
    ),
  },
}
