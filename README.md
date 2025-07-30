# 인터랙티브 웹개발 기초 인터랙션 실습 프로젝트

패스트캠퍼스 인터랙티브 웹개발 기초 인터랙션 실습 프로젝트입니다.

## 🚀 시작하기

### 1. 프로젝트 클론

```bash
git clone https://github.com/your-username/fastcampus-interactive-vibecoding01.git
cd fastcampus-interactive-vibecoding01
```

### 2. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 빌드

```bash
npm run build
```

### 4. 프로덕션 실행

```bash
npm start
```

## 🎯 브랜치별 학습 방법

main 브런치에서 각 섹션별로 인터랙션을 생성해보세요.

각 브랜치를 체크아웃하여 단계별로 결과물을 확인할 수 있습니다.

```bash
# 기본 플레이그라운드 (main 브랜치)
git checkout main

# 텍스트 애니메이션 기초
git checkout feat/clip03

# 스크롤 애니메이션 심화
git checkout feat/clip04

# 고급 인터랙션
git checkout feat/clip05

# 이미지 스테이지 애니메이션
git checkout feat/clip06

# 고급 3D 및 커스텀 인터랙션
git checkout feat/clip07
```

## 📖 브랜치별 학습 내용

각 브랜치는 특정 챕터의 구현 내용을 포함합니다:

### 🎯 `main` 브랜치

- **기본 플레이그라운드**: 기본적인 인터랙티브 웹사이트 구조
- **주요 컴포넌트**: Navigation, ParticleField, WorkCard, ServiceCard, BlogCard, Footer
- **학습 포인트**: 기본적인 React 컴포넌트 구조와 Tailwind CSS 활용

### 🎯 `feat/clip03` 브랜치 - 텍스트 애니메이션 기초

- **추가 컴포넌트**:
  - `CountUp.tsx`: 숫자 카운트업 애니메이션
  - `Marquee.tsx`: 마퀴 텍스트 효과
  - `ScrambleText.tsx`: 텍스트 스크램블 효과
  - `ScrollTriggerText.tsx`: 스크롤 트리거 텍스트 애니메이션
  - `TypingAnimation.tsx`: 타이핑 애니메이션
- **학습 포인트**: 텍스트 기반 인터랙티브 애니메이션 구현

### 🎯 `feat/clip04` 브랜치 - 스크롤 애니메이션 심화

- **추가 컴포넌트**:
  - `Header.tsx`: 고급 헤더 컴포넌트
  - `ParticleField.tsx`: 3D 파티클 시스템
  - `SlideUp.tsx`: 슬라이드업 애니메이션
- **학습 포인트**: 스크롤 기반 애니메이션과 3D 파티클 시스템

### 🎯 `feat/clip05` 브랜치 - 고급 인터랙션

- **추가 컴포넌트**:
  - `Header.tsx`: 개선된 헤더
  - `ParticleField.tsx`: 향상된 파티클 시스템
  - `ScrambleText.tsx`: 고급 텍스트 스크램블
  - `SlideUp.tsx`: 개선된 슬라이드업
  - `WorkCard.tsx`: 고급 워크카드 (3604 bytes)
- **학습 포인트**: 복합적인 인터랙션과 애니메이션 조합

### 🎯 `feat/clip06` 브랜치 - 이미지 스테이지 애니메이션

- **추가 컴포넌트**:
  - `ImageStageAnimation.tsx`: 이미지 스테이지 애니메이션
  - `IntroAnimation.tsx`: 인트로 애니메이션
- **학습 포인트**: 이미지 기반 스테이지 애니메이션과 인트로 효과

### 🎯 `feat/clip07` 브랜치 - 고급 3D 및 커스텀 인터랙션

- **추가 컴포넌트**:
  - `CustomCursor.tsx`: 커스텀 커서
  - `ThreeBackground.tsx`: 3D 배경 시스템
  - `TiltProfileCard.tsx`: 틸트 효과 프로필 카드
  - `ImageStageAnimation.tsx`: 고급 이미지 스테이지
  - `IntroAnimation.tsx`: 개선된 인트로 애니메이션
- **학습 포인트**: 3D 배경, 커스텀 커서, 틸트 효과 등 고급 인터랙션
