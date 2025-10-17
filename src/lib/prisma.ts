import { PrismaClient } from '@prisma/client'

// Prisma 클라이언트 인스턴스 생성
// 개발 환경에서는 글로벌 변수로 재사용하여 연결 풀 최적화
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
