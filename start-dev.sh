#!/bin/bash

# 포트 3000에서 실행 중인 프로세스 종료
echo "포트 3000에서 실행 중인 프로세스를 종료합니다..."

# 포트 3000을 사용하는 프로세스 찾기 및 종료
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "포트 3000에서 실행 중인 프로세스가 없습니다."

# 추가로 node 프로세스들도 정리 (선택사항)
# pkill -f "next dev" 2>/dev/null || echo "Next.js 개발 서버가 실행 중이지 않습니다."

echo "기존 프로세스 정리 완료!"
echo "포트 3000에서 개발 서버를 시작합니다..."

# 개발 서버 시작
yarn dev --port 3000
