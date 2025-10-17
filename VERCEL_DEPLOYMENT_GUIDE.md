# Vercel 배포 가이드

## 🚀 Neon DB 연결 설정

### 1. Neon DB 연결 문자열 형식
```
postgresql://username:password@hostname:port/neondb?sslmode=require
```

**중요**: 데이터베이스 이름이 `neondb`인 경우 연결 문자열 마지막에 `/neondb`가 포함되어야 합니다.

#### 예시:
```
postgresql://myuser:mypassword@ep-cool-name-123456.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 2. Vercel 환경변수 설정
Vercel 대시보드에서 다음 환경변수를 설정하세요:

#### 필수 환경변수:
- **DATABASE_URL**: Neon DB 연결 문자열
- **NEXT_PUBLIC_BASE_URL**: `https://aga-blog.vercel.app`

#### 설정 방법:
1. Vercel 프로젝트 대시보드 접속
2. Settings → Environment Variables
3. 다음 변수들 추가:
   ```
   DATABASE_URL = postgresql://[username]:[password]@[hostname]:[port]/neondb?sslmode=require
   NEXT_PUBLIC_BASE_URL = https://aga-blog.vercel.app
   ```

### 3. Neon DB 설정 확인사항
- ✅ PostgreSQL 16 사용
- ✅ SSL 연결 활성화 (`sslmode=require`)
- ✅ 데이터베이스 생성 완료
- ✅ 연결 문자열 복사 완료

### 4. 배포 후 확인사항
- `/api/init-db` 엔드포인트 테스트
- 데이터베이스 연결 상태 확인
- 샘플 데이터 추가 (필요시)

## 🔧 문제 해결

### PostgreSQL 연결 오류 시:
1. **데이터베이스 이름 확인**: 연결 문자열에 `/neondb`가 포함되어 있는지 확인
2. **연결 문자열 형식 확인**: `postgresql://`로 시작하는지 확인
3. **SSL 설정 확인**: `sslmode=require`가 포함되어 있는지 확인
4. **Neon DB 상태 확인**: 데이터베이스가 활성 상태인지 확인
5. **Vercel 환경변수 재설정**: 올바른 연결 문자열로 다시 설정

### 데이터베이스 초기화:
```bash
# 로컬에서 실행 (Neon DB 연결 후)
npx prisma db push
npx prisma db seed
```
