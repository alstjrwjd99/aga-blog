-- Neon DB에 직접 실행할 SQL 스크립트
-- 이 스크립트를 Neon DB 쿼리 에디터에서 실행하세요

-- 사이트 방문 통계 테이블
CREATE TABLE IF NOT EXISTS "site_visits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "page" TEXT,
    "referrer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "site_visits_ipAddress_page_createdAt_key" UNIQUE ("ipAddress", "page", "createdAt")
);

-- 피해 사례 테이블
CREATE TABLE IF NOT EXISTS "cases" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL UNIQUE,
    "category" TEXT NOT NULL,
    "amount" INTEGER,
    "content" TEXT NOT NULL,
    "region" TEXT,
    "tip" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- 댓글 테이블
CREATE TABLE IF NOT EXISTS "comments" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "comments_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 공감(좋아요) 테이블
CREATE TABLE IF NOT EXISTS "likes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ipAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "caseId" TEXT NOT NULL,
    CONSTRAINT "likes_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "cases"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "likes_caseId_ipAddress_key" UNIQUE ("caseId", "ipAddress")
);

-- 검색 통계 테이블
CREATE TABLE IF NOT EXISTS "search_queries" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "query" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS "cases_category_idx" ON "cases"("category");
CREATE INDEX IF NOT EXISTS "cases_createdAt_idx" ON "cases"("createdAt");
CREATE INDEX IF NOT EXISTS "comments_caseId_idx" ON "comments"("caseId");
CREATE INDEX IF NOT EXISTS "likes_caseId_idx" ON "likes"("caseId");
CREATE INDEX IF NOT EXISTS "search_queries_query_idx" ON "search_queries"("query");
CREATE INDEX IF NOT EXISTS "search_queries_createdAt_idx" ON "search_queries"("createdAt");
