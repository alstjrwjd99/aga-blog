// src/components/molecules/CaseCard/CaseCard.stories.tsx

import type { Meta, StoryObj } from '@storybook/react'
import CaseCard from './index'

const meta: Meta<typeof CaseCard> = {
  title: 'Molecules/CaseCard',
  component: CaseCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      control: { type: 'select' },
      options: ['보이스피싱', '문자', '링크', 'SNS', '리뷰알바', '기타'],
    },
    amount: {
      control: { type: 'number' },
    },
    region: {
      control: { type: 'text' },
    },
    commentCount: {
      control: { type: 'number' },
    },
    likeCount: {
      control: { type: 'number' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: '1',
    title: '가족 사칭 메신저 피싱 사례',
    category: '보이스피싱',
    amount: 1500000,
    region: '서울',
    createdAt: new Date('2024-01-20').toISOString(),
    commentCount: 10,
    likeCount: 50,
  },
}

export const VoicePhishing: Story = {
  args: {
    id: '2',
    title: '검찰 사칭 보이스피싱 피해 사례',
    category: '보이스피싱',
    amount: 5000000,
    region: '부산',
    createdAt: new Date('2024-02-10').toISOString(),
    commentCount: 25,
    likeCount: 120,
  },
}

export const Smishing: Story = {
  args: {
    id: '3',
    title: '택배 사칭 스미싱 문자 피해',
    category: '문자',
    amount: 0,
    region: '인천',
    createdAt: new Date('2024-03-01').toISOString(),
    commentCount: 8,
    likeCount: 35,
  },
}

export const LinkPhishing: Story = {
  args: {
    id: '4',
    title: '금융기관 사칭 피싱 링크 사례',
    category: '링크',
    amount: 3000000,
    region: '대구',
    createdAt: new Date('2024-03-15').toISOString(),
    commentCount: 15,
    likeCount: 80,
  },
}

export const SNSPhishing: Story = {
  args: {
    id: '5',
    title: 'SNS 계정 탈취를 통한 피싱',
    category: 'SNS',
    amount: 2000000,
    region: '광주',
    createdAt: new Date('2024-04-01').toISOString(),
    commentCount: 12,
    likeCount: 60,
  },
}

export const ReviewJob: Story = {
  args: {
    id: '6',
    title: '리뷰 알바 사칭 피싱 사례',
    category: '리뷰알바',
    amount: 800000,
    region: '대전',
    createdAt: new Date('2024-04-10').toISOString(),
    commentCount: 6,
    likeCount: 30,
  },
}

export const Other: Story = {
  args: {
    id: '7',
    title: '기타 피싱 유형 피해 사례',
    category: '기타',
    amount: 1000000,
    region: '울산',
    createdAt: new Date('2024-04-20').toISOString(),
    commentCount: 4,
    likeCount: 20,
  },
}

export const HighAmount: Story = {
  args: {
    id: '8',
    title: '고액 피해 보이스피싱 사례',
    category: '보이스피싱',
    amount: 15000000,
    region: '서울',
    createdAt: new Date('2024-05-01').toISOString(),
    commentCount: 45,
    likeCount: 200,
  },
}

export const NoAmount: Story = {
  args: {
    id: '9',
    title: '피해금액 없이 예방된 사례',
    category: '문자',
    amount: 0,
    region: '경기',
    createdAt: new Date('2024-05-10').toISOString(),
    commentCount: 20,
    likeCount: 150,
  },
}

export const RecentCase: Story = {
  args: {
    id: '10',
    title: '최근 발생한 피싱 사례',
    category: '링크',
    amount: 2500000,
    region: '서울',
    createdAt: new Date().toISOString(),
    commentCount: 2,
    likeCount: 8,
  },
}

export const PopularCase: Story = {
  args: {
    id: '11',
    title: '많은 관심을 받은 피싱 사례',
    category: '보이스피싱',
    amount: 7000000,
    region: '부산',
    createdAt: new Date('2024-01-15').toISOString(),
    commentCount: 80,
    likeCount: 350,
  },
}

export const AllCategories: Story = {
  render: () => (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1rem',
      maxWidth: '1200px'
    }}>
      <CaseCard
        id="1"
        slug="voice-phishing-case"
        title="보이스피싱 사례"
        category="보이스피싱"
        amount={1500000}
        region="서울"
        createdAt={new Date('2024-01-20').toISOString()}
        commentCount={10}
        likeCount={50}
      />
      <CaseCard
        id="2"
        slug="smishing-case"
        title="스미싱 사례"
        category="문자"
        amount={0}
        region="부산"
        createdAt={new Date('2024-02-10').toISOString()}
        commentCount={8}
        likeCount={35}
      />
      <CaseCard
        id="3"
        slug="link-phishing-case"
        title="링크 피싱 사례"
        category="링크"
        amount={3000000}
        region="인천"
        createdAt={new Date('2024-03-01').toISOString()}
        commentCount={15}
        likeCount={80}
      />
      <CaseCard
        id="4"
        slug="sns-phishing-case"
        title="SNS 피싱 사례"
        category="SNS"
        amount={2000000}
        region="대구"
        createdAt={new Date('2024-03-15').toISOString()}
        commentCount={12}
        likeCount={60}
      />
      <CaseCard
        id="5"
        slug="review-job-scam-case"
        title="리뷰알바 사칭 사례"
        category="리뷰알바"
        amount={800000}
        region="광주"
        createdAt={new Date('2024-04-01').toISOString()}
        commentCount={6}
        likeCount={30}
      />
      <CaseCard
        id="6"
        slug="other-phishing-case"
        title="기타 피싱 사례"
        category="기타"
        amount={1000000}
        region="대전"
        createdAt={new Date('2024-04-10').toISOString()}
        commentCount={4}
        likeCount={20}
      />
    </div>
  ),
}
