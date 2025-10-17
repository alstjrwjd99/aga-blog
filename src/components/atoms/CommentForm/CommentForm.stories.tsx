// src/components/atoms/CommentForm/CommentForm.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import CommentForm from './index'

const meta: Meta<typeof CommentForm> = {
  title: 'Atoms/CommentForm',
  component: CommentForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    caseId: {
      control: { type: 'text' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    caseId: '1',
  },
}

export const WithCaseId: Story = {
  args: {
    caseId: 'case-123',
  },
}

export const LongCaseId: Story = {
  args: {
    caseId: 'very-long-case-id-that-might-cause-layout-issues',
  },
}

export const MultipleForms: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '600px' }}>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Case 1 Comment Form</h3>
        <CommentForm caseId="case-1" />
      </div>
      <div>
        <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Case 2 Comment Form</h3>
        <CommentForm caseId="case-2" />
      </div>
    </div>
  ),
}

export const InCard: Story = {
  render: () => (
    <div style={{
      background: 'white',
      border: '1px solid #E5E7EB',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      maxWidth: '600px'
    }}>
      <h2 style={{ margin: '0 0 1rem 0', color: '#111827' }}>피싱 사례 상세</h2>
      <p style={{ margin: '0 0 2rem 0', color: '#6B7280' }}>
        이 사례에 대한 댓글을 남겨주세요. 다른 사용자들과 정보를 공유할 수 있습니다.
      </p>
      <CommentForm caseId="case-detail-123" />
    </div>
  ),
}
