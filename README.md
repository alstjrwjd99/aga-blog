# 피싱 사기 사례 공유 블로그 (IT Guy | Aga)

실제 피싱 사기 사례를 공유하고 예방 정보를 제공하는 블로그 웹사이트입니다.

## 🎯 프로젝트 개요

이 프로젝트는 피싱 및 사기 사례를 쉽게 탐색하고 신고할 수 있는 웹사이트로, 따뜻하고 신뢰할 수 있는 디자인에 중점을 두어 시니어 사용자도 쉽게 사용할 수 있도록 설계되었습니다.

### 주요 기능

- **사례 탐색**: 카테고리별, 기간별 필터링 및 검색 기능
- **사례 신고**: 피싱 사기 사례 등록 및 공유
- **예방 가이드**: 피싱 예방 방법 및 대응 가이드 제공
- **통계 분석**: 사기 유형별 통계 및 피해 규모 분석
- **댓글 및 좋아요**: 커뮤니티 참여 기능
- **SEO 최적화**: 검색 엔진 최적화 및 구조화된 데이터

## 🛠 기술 스택

### Frontend
- **Next.js 15** (App Router, SSR)
- **TypeScript** - 타입 안전성
- **SCSS** - 스타일링 (Atomic Design 시스템)
- **React Query** - 서버 상태 관리
- **Lucide React** - 아이콘

### Backend
- **Node.js** - 런타임 환경
- **Express** - 웹 프레임워크
- **Prisma** - ORM
- **SQLite** - 데이터베이스 (개발용)

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅
- **Storybook** - 컴포넌트 문서화
- **Chromatic** - 시각적 회귀 테스트

## 🎨 디자인 시스템

### Atomic Design 구조
```
src/components/
├── atoms/          # 기본 컴포넌트 (Button, Input, Card 등)
├── molecules/      # 조합 컴포넌트 (SearchBox, CaseCard 등)
├── organisms/      # 복합 컴포넌트 (Header, CasesList 등)
└── templates/      # 페이지 레이아웃
```

### SCSS 아키텍처
```
src/styles/
├── _aga-theme.scss      # 테마 변수
├── _design-tokens.scss  # 디자인 토큰
├── _layout.scss         # 레이아웃 시스템
├── _typography.scss     # 타이포그래피
├── _components.scss     # 컴포넌트 스타일
└── _globals.scss       # 전역 스타일
```

### 반응형 디자인
- **Mobile**: 480px 이하 (1열 레이아웃)
- **Tablet**: 768px 이하 (2열 레이아웃)
- **Desktop**: 1024px 이상 (3열 레이아웃)

## 🚀 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- Yarn 또는 npm

### 설치 및 실행

1. **저장소 클론**
```bash
git clone <repository-url>
cd aga-blog
```

2. **의존성 설치**
```bash
yarn install
```

3. **데이터베이스 설정**
```bash
# Prisma 마이그레이션 실행
yarn prisma migrate dev

# 시드 데이터 생성 (선택사항)
yarn db:seed
```

4. **개발 서버 시작**
```bash
yarn dev
```

5. **브라우저에서 확인**
```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
yarn build

# 프로덕션 서버 시작
yarn start
```

## 📁 프로젝트 구조

```
aga-blog/
├── src/
│   ├── app/                 # Next.js App Router 페이지
│   │   ├── api/            # API 라우트
│   │   ├── cases/          # 사례 관련 페이지
│   │   ├── guide/          # 예방 가이드 페이지
│   │   └── ...
│   ├── components/         # React 컴포넌트
│   │   ├── atoms/          # 기본 컴포넌트
│   │   ├── molecules/      # 조합 컴포넌트
│   │   ├── organisms/      # 복합 컴포넌트
│   │   └── ...
│   ├── hooks/              # 커스텀 훅
│   ├── lib/                # 유틸리티 함수
│   ├── styles/             # SCSS 스타일
│   └── types/              # TypeScript 타입 정의
├── prisma/                 # 데이터베이스 스키마
├── public/                 # 정적 파일
├── .storybook/             # Storybook 설정
└── ...
```

## 🔧 주요 스크립트

```bash
# 개발
yarn dev              # 개발 서버 시작
yarn dev:clean       # 포트 정리 후 개발 서버 시작
yarn kill:3000       # 포트 3000 프로세스 종료

# 빌드
yarn build           # 프로덕션 빌드
yarn start           # 프로덕션 서버 시작

# 데이터베이스
yarn db:seed         # 시드 데이터 생성
yarn prisma studio   # Prisma Studio 실행

# 테스트
yarn test:visual     # Chromatic 시각적 테스트
yarn storybook       # Storybook 실행
```

## 🎯 주요 페이지

### 홈페이지 (`/`)
- 최신 사례 미리보기
- 통계 정보
- 피싱 유형별 개요
- 긴급 경고 섹션

### 사례 목록 (`/cases`)
- 필터링 및 검색 기능
- 카드 형태의 사례 목록
- 페이지네이션

### 사례 상세 (`/cases/[id]`)
- 상세 내용 및 타임라인
- 핵심 포인트 및 주의사항
- 댓글 및 좋아요 기능
- 관련 사례 추천

### 사례 신고 (`/cases/submit`)
- 사례 등록 폼
- 이미지 업로드
- 개인정보 마스킹
- hCaptcha 보안

### 예방 가이드 (`/guide`)
- 피싱 인식 방법
- 개인정보 보호
- 안전한 결제 습관
- 신고 채널 안내

## 🔒 보안 및 개인정보 보호

- **자동 마스킹**: 전화번호, 주민등록번호 자동 마스킹
- **이미지 처리**: EXIF 데이터 제거
- **Rate Limiting**: API 요청 제한
- **Captcha**: hCaptcha 통합
- **개인정보 보호**: 민감 정보 비공개 처리

## 📊 성능 최적화

- **SSR/SSG**: 서버 사이드 렌더링 및 정적 생성
- **이미지 최적화**: WebP/AVIF 포맷 지원
- **코드 스플리팅**: 동적 임포트
- **캐싱 전략**: React Query 캐싱
- **번들 최적화**: Tree shaking 및 압축

## ♿ 접근성

- **ARIA 라벨**: 스크린 리더 지원
- **키보드 네비게이션**: 탭 키 지원
- **색상 대비**: WCAG AA 준수
- **폰트 크기 조절**: 시니어 사용자 지원
- **의미론적 HTML**: 적절한 HTML 태그 사용

## 🧪 테스트

### 시각적 회귀 테스트
```bash
yarn chromatic
```

### 컴포넌트 문서화
```bash
yarn storybook
```

## 📈 SEO 최적화

### 🎯 완료된 SEO 최적화 사항
- ✅ **동적 사이트맵**: 모든 사례 페이지 자동 포함 (`/sitemap.xml`)
- ✅ **Robots.txt**: 검색엔진 크롤링 최적화 (`/robots.txt`)
- ✅ **메타데이터 대폭 개선**: 14개 핵심 키워드, OpenGraph, Twitter Cards
- ✅ **구조화된 데이터**: Article, Breadcrumb, Organization, WebSite 스키마
- ✅ **구글 서치 콘솔 연동**: 인증 파일 및 메타 태그 설정
- ✅ **페이지별 SEO**: 동적 메타데이터 생성 및 최적화

### 📊 SEO 성능 지표
- **키워드**: 보이스피싱, 피싱, 사기, 피해사례, 예방 등 14개 핵심 키워드
- **기술적 SEO**: 사이트맵, Robots.txt, 메타 태그, 구조화된 데이터 완비
- **모바일 최적화**: 반응형 디자인 및 모바일 친화적 UI
- **페이지 속도**: 최적화된 이미지 및 코드로 빠른 로딩

### 🚀 구글 서치 콘솔 설정
1. **사이트 등록**: `https://aga-blog.vercel.app`
2. **소유권 확인**: `googleb30cc01a3c83afd5.html` 파일 인증
3. **사이트맵 제출**: `sitemap.xml` 자동 생성
4. **URL 인덱싱**: 주요 페이지 개별 인덱싱 요청

> 📋 **자세한 SEO 가이드**: [SEO_OPTIMIZATION_GUIDE.md](./SEO_OPTIMIZATION_GUIDE.md) 참조

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이나 버그 리포트는 GitHub Issues를 통해 제출해주세요.

---

**피싱 사기 사례 공유 블로그** - 함께 만들어가는 안전한 인터넷 환경 🌐
