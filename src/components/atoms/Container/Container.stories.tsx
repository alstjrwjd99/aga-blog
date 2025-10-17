// src/components/atoms/Container/Container.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import Container from './index'

const meta: Meta<typeof Container> = {
  title: 'Atoms/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
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
      <div style={{
        background: '#F3F4F6',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Container Content</h2>
        <p style={{ margin: 0, color: '#6B7280' }}>
          This is content inside a default container.
        </p>
      </div>
    ),
  },
}

export const Small: Story = {
  args: {
    maxWidth: 'sm',
    children: (
      <div style={{
        background: '#EFF6FF',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#1E40AF' }}>Small Container</h2>
        <p style={{ margin: 0, color: '#3B82F6' }}>
          This container has a small max width.
        </p>
      </div>
    ),
  },
}

export const Medium: Story = {
  args: {
    maxWidth: 'md',
    children: (
      <div style={{
        background: '#F0FDF4',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#166534' }}>Medium Container</h2>
        <p style={{ margin: 0, color: '#16A34A' }}>
          This container has a medium max width.
        </p>
      </div>
    ),
  },
}

export const Large: Story = {
  args: {
    maxWidth: 'lg',
    children: (
      <div style={{
        background: '#FEF3C7',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#92400E' }}>Large Container</h2>
        <p style={{ margin: 0, color: '#D97706' }}>
          This container has a large max width.
        </p>
      </div>
    ),
  },
}

export const ExtraLarge: Story = {
  args: {
    maxWidth: 'xl',
    children: (
      <div style={{
        background: '#FCE7F3',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#BE185D' }}>Extra Large Container</h2>
        <p style={{ margin: 0, color: '#EC4899' }}>
          This container has an extra large max width.
        </p>
      </div>
    ),
  },
}

export const TwoXLarge: Story = {
  args: {
    maxWidth: '2xl',
    children: (
      <div style={{
        background: '#E0E7FF',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#3730A3' }}>2X Large Container</h2>
        <p style={{ margin: 0, color: '#6366F1' }}>
          This container has a 2X large max width.
        </p>
      </div>
    ),
  },
}

export const FullWidth: Story = {
  args: {
    maxWidth: 'full',
    children: (
      <div style={{
        background: '#F3F4F6',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#374151' }}>Full Width Container</h2>
        <p style={{ margin: 0, color: '#6B7280' }}>
          This container takes the full width of its parent.
        </p>
      </div>
    ),
  },
}

export const WithCustomClass: Story = {
  args: {
    className: 'custom-container',
    children: (
      <div style={{
        background: '#FEF2F2',
        padding: '2rem',
        textAlign: 'center',
        borderRadius: '0.5rem',
        border: '2px solid #FECACA'
      }}>
        <h2 style={{ margin: '0 0 1rem 0', color: '#991B1B' }}>Custom Styled Container</h2>
        <p style={{ margin: 0, color: '#DC2626' }}>
          This container has custom styling applied.
        </p>
      </div>
    ),
  },
}

export const ResponsiveExample: Story = {
  render: () => (
    <div style={{ background: '#F9FAFB', padding: '2rem', minHeight: '400px' }}>
      <Container maxWidth="lg">
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '0.75rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Responsive Container</h2>
          <p style={{ margin: '0 0 1.5rem 0', color: '#6B7280' }}>
            This container will adjust its width based on the screen size.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '2rem'
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
      </Container>
    </div>
  ),
}
