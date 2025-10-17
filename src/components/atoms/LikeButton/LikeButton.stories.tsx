// src/components/atoms/LikeButton/LikeButton.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import LikeButton from './index'

const meta: Meta<typeof LikeButton> = {
  title: 'Atoms/LikeButton',
  component: LikeButton,
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

export const Case2: Story = {
  args: {
    caseId: '2',
  },
}

export const Case3: Story = {
  args: {
    caseId: '3',
  },
}

export const Case4: Story = {
  args: {
    caseId: '4',
  },
}

export const Case5: Story = {
  args: {
    caseId: '5',
  },
}

export const Case6: Story = {
  args: {
    caseId: '6',
  },
}

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LikeButton caseId="1" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Case 1</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LikeButton caseId="2" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Case 2</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LikeButton caseId="3" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Case 3</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LikeButton caseId="4" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Case 4</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LikeButton caseId="5" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Case 5</span>
      </div>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <LikeButton caseId="6" />
        <span style={{ fontSize: '0.875rem', color: '#6B7280' }}>Case 6</span>
      </div>
    </div>
  ),
}
