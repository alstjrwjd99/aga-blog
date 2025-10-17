// src/components/atoms/Icon/Icon.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import Icon from './index'

const meta: Meta<typeof Icon> = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: [
        'shield', 'home', 'file-text', 'plus', 'bar-chart-3', 'search', 'user',
        'heart', 'message-circle', 'share-2', 'flag', 'alert-triangle', 'check',
        'x', 'chevron-down', 'chevron-up', 'chevron-left', 'chevron-right',
        'menu', 'close', 'edit', 'trash', 'copy', 'external-link', 'download',
        'upload', 'refresh-cw', 'settings', 'bell', 'mail', 'phone', 'map-pin',
        'calendar', 'clock', 'star', 'bookmark', 'eye', 'eye-off', 'lock',
        'unlock', 'key', 'wallet', 'credit-card', 'banknote', 'trending-up',
        'trending-down', 'activity', 'zap', 'sun', 'moon', 'cloud', 'cloud-rain'
      ],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Shield: Story = {
  args: {
    name: 'shield',
    size: 'md',
    color: 'primary',
  },
}

export const Home: Story = {
  args: {
    name: 'home',
    size: 'md',
    color: 'primary',
  },
}

export const FileText: Story = {
  args: {
    name: 'file-text',
    size: 'md',
    color: 'primary',
  },
}

export const Plus: Story = {
  args: {
    name: 'plus',
    size: 'md',
    color: 'primary',
  },
}

export const Search: Story = {
  args: {
    name: 'search',
    size: 'md',
    color: 'primary',
  },
}

export const Heart: Story = {
  args: {
    name: 'heart',
    size: 'md',
    color: 'danger',
  },
}

export const MessageCircle: Story = {
  args: {
    name: 'message-circle',
    size: 'md',
    color: 'primary',
  },
}

export const AlertTriangle: Story = {
  args: {
    name: 'alert-triangle',
    size: 'md',
    color: 'warning',
  },
}

export const Check: Story = {
  args: {
    name: 'check',
    size: 'md',
    color: 'success',
  },
}

export const X: Story = {
  args: {
    name: 'x',
    size: 'md',
    color: 'danger',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Icon name="shield" size="xs" />
      <Icon name="shield" size="sm" />
      <Icon name="shield" size="md" />
      <Icon name="shield" size="lg" />
      <Icon name="shield" size="xl" />
    </div>
  ),
}

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <Icon name="shield" color="primary" />
      <Icon name="shield" color="secondary" />
      <Icon name="shield" color="success" />
      <Icon name="shield" color="warning" />
      <Icon name="shield" color="danger" />
      <Icon name="shield" color="info" />
    </div>
  ),
}

export const CommonIcons: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <Icon name="shield" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Shield</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="home" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Home</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="file-text" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>File</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="plus" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Plus</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="search" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Search</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="heart" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Heart</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="message-circle" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Message</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="share-2" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Share</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="flag" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Flag</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Icon name="alert-triangle" size="lg" />
        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>Alert</div>
      </div>
    </div>
  ),
}
