# Neon PostgreSQL 설정 가이드

## PostgreSQL 버전: 16 (권장)

Neon에서 프로젝트 생성 시:
1. **PostgreSQL Version**: `16` 선택
2. **Region**: `Seoul (ap-northeast-2)` 선택
3. **Database Name**: `aga_blog`

## 연결 문자열 예시
```
postgresql://username:password@ep-xxx.ap-northeast-2.aws.neon.tech/aga_blog?sslmode=require
```

## Prisma 설정
- 현재 스키마는 PostgreSQL 16과 호환됩니다
- 특별한 버전 제약이 없으므로 최신 안정 버전 사용 가능

## 마이그레이션 명령어
```bash
# 프로덕션 환경에서 실행
npx prisma migrate deploy
npx prisma db seed
npx prisma generate
```
