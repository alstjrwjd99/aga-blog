-- Neon DB 새 테이블 생성
-- Prisma 스키마와 완전히 일치하는 테이블 구조

-- 사이트 방문 통계 테이블
CREATE TABLE "site_visits" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "page" TEXT,
    "referrer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "site_visits_pkey" PRIMARY KEY ("id")
);

-- 피해 사례 테이블
CREATE TABLE "cases" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" INTEGER,
    "content" TEXT NOT NULL,
    "region" TEXT,
    "tip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "cases_pkey" PRIMARY KEY ("id")
);

-- 댓글 테이블
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- 공감(좋아요) 테이블
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- 검색 통계 테이블
CREATE TABLE "search_queries" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "search_queries_pkey" PRIMARY KEY ("id")
);

-- 인덱스 생성
CREATE UNIQUE INDEX "cases_slug_key" ON "cases"("slug");
CREATE UNIQUE INDEX "site_visits_ipAddress_page_createdAt_key" ON "site_visits"("ipAddress", "page", "createdAt");
CREATE UNIQUE INDEX "likes_caseId_ipAddress_key" ON "likes"("caseId", "ipAddress");

-- 외래키 제약조건
ALTER TABLE "comments" ADD CONSTRAINT "comments_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "likes" ADD CONSTRAINT "likes_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE;
