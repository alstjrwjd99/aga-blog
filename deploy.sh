#!/bin/bash

# 배포 스크립트
echo "🚀 AGA Blog 배포를 시작합니다..."

# 1. 빌드 테스트
echo "📦 빌드 테스트 중..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ 빌드 실패! 배포를 중단합니다."
    exit 1
fi

echo "✅ 빌드 성공!"

# 2. Git 상태 확인
echo "📋 Git 상태 확인 중..."
git status

# 3. 변경사항 커밋
echo "💾 변경사항 커밋 중..."
git add .
git commit -m "Deploy: Prepare for production deployment"

# 4. Vercel 배포 안내
echo ""
echo "🎯 다음 단계를 따라주세요:"
echo ""
echo "1. GitHub에 코드 푸시:"
echo "   git push origin main"
echo ""
echo "2. Vercel에서 배포:"
echo "   - https://vercel.com 접속"
echo "   - GitHub 계정으로 로그인"
echo "   - 'New Project' 클릭"
echo "   - aga-blog 저장소 선택"
echo "   - 환경 변수 설정:"
echo "     DATABASE_URL: Neon에서 복사한 URL"
echo "     NEXT_PUBLIC_BASE_URL: https://your-app-name.vercel.app"
echo "   - 'Deploy' 클릭"
echo ""
echo "3. 데이터베이스 마이그레이션:"
echo "   - Vercel Functions에서 실행:"
echo "     npx prisma migrate deploy"
echo "     npx prisma db seed"
echo ""
echo "✨ 배포 준비 완료!"
