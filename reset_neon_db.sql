-- Neon DB 완전 초기화
-- 기존 테이블 모두 삭제

DROP TABLE IF EXISTS "likes" CASCADE;
DROP TABLE IF EXISTS "comments" CASCADE;
DROP TABLE IF EXISTS "cases" CASCADE;
DROP TABLE IF EXISTS "search_queries" CASCADE;
DROP TABLE IF EXISTS "site_visits" CASCADE;

-- 시퀀스도 삭제 (PostgreSQL에서 자동 생성된 경우)
DROP SEQUENCE IF EXISTS "likes_id_seq" CASCADE;
DROP SEQUENCE IF EXISTS "comments_id_seq" CASCADE;
DROP SEQUENCE IF EXISTS "cases_id_seq" CASCADE;
DROP SEQUENCE IF EXISTS "search_queries_id_seq" CASCADE;
DROP SEQUENCE IF EXISTS "site_visits_id_seq" CASCADE;
