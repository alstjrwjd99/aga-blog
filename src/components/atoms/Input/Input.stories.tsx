// src/components/atoms/Input/Input.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Input from './index'

const meta: Meta<typeof Input> = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    type: 'email',
    size: 'md',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    type: 'search',
    size: 'md',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.35-4.35"/>
      </svg>
    ),
  },
}

export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    size: 'md',
  },
}

export const Number: Story = {
  args: {
    label: 'Amount',
    placeholder: 'Enter amount',
    type: 'number',
    size: 'md',
  },
}

export const Tel: Story = {
  args: {
    label: 'Phone Number',
    placeholder: 'Enter phone number',
    type: 'tel',
    size: 'md',
  },
}

export const URL: Story = {
  args: {
    label: 'Website URL',
    placeholder: 'https://example.com',
    type: 'url',
    size: 'md',
  },
}

export const Date: Story = {
  args: {
    label: 'Date',
    type: 'date',
    size: 'md',
  },
}

export const Small: Story = {
  args: {
    label: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    placeholder: 'Medium size',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    label: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This is disabled',
    disabled: true,
    size: 'md',
  },
}

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    size: 'md',
  },
}

export const WithError: Story = {
  args: {
    label: 'Input with Error',
    placeholder: 'This has an error',
    size: 'md',
    error: true,
    errorMessage: 'This field is required',
  },
}

export const WithHelpText: Story = {
  args: {
    label: 'Input with Help',
    placeholder: 'Enter your information',
    size: 'md',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState('')
    return (
      <div style={{ width: '300px' }}>
        <Input
          label="Controlled Input"
          placeholder="Type something..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="md"
        />
        <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6B7280' }}>
          Value: {value}
        </div>
      </div>
    )
  },
}

export const FormExample: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          required
          size="md"
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          required
          size="md"
        />
        <Input
          label="Phone"
          placeholder="Enter your phone number"
          type="tel"
          size="md"
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          required
          size="md"
        />
      </form>
    </div>
  ),
}
