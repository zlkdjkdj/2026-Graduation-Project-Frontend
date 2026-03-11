# Learn-Time 프로젝트 구조

## 📁 새로운 폴더 구조

```
src/
├── app/
│   ├── App.tsx                    # 메인 앱 컴포넌트
│   └── routes.tsx                 # React Router 설정
│
├── pages/                         # 페이지 컴포넌트
│   ├── home/
│   │   └── index.tsx             # LandingPage (홈/랜딩 페이지)
│   └── main/
│       └── index.tsx             # MainPage (메인 대시보드)
│
├── components/                    # 재사용 가능한 컴포넌트
│   ├── ui/                       # UI 기본 컴포넌트
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── utils.ts
│   │
│   ├── common/                   # 공통 컴포넌트 (향후 사용)
│   ├── layout/                   # 레이아웃 컴포넌트 (향후 사용)
│   │
│   ├── section/                  # 섹션별 컴포넌트
│   │   ├── landing/              # 랜딩 페이지 섹션
│   │   │   ├── Header.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── QuoteSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── ServiceCategoriesSection.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   └── main/                 # 메인 페이지 섹션
│   │       ├── StudyTimer.tsx
│   │       ├── PomodoroTimer.tsx
│   │       ├── StudyMaterialUpload.tsx
│   │       └── AiSuggestions.tsx
│   │
│   └── figma/                    # Figma 관련 컴포넌트
│       └── ImageWithFallback.tsx
│
├── assets/                        # 정적 자산 (이미지, 폰트 등)
├── hooks/                         # 커스텀 React Hooks
├── types/                         # TypeScript 타입 정의
├── utils/                         # 유틸리티 함수
│
└── styles/                        # 스타일 파일
    ├── fonts.css
    └── theme.css
```

## 📝 주요 변경사항

### 이전 구조 (AS-IS)
```
src/app/
├── pages/
│   ├── LandingPage.tsx
│   └── MainPage.tsx
└── components/
    ├── landing/
    ├── main/
    ├── ui/
    └── figma/
```

### 새로운 구조 (TO-BE)
```
src/
├── app/
│   ├── App.tsx
│   └── routes.tsx
├── pages/
│   ├── home/
│   └── main/
├── components/
│   ├── section/
│   │   ├── landing/
│   │   └── main/
│   ├── ui/
│   ├── common/
│   ├── layout/
│   └── figma/
├── assets/
├── hooks/
├── types/
├── utils/
└── styles/
```

## 🎯 폴더별 역할

### `/src/app/`
- 애플리케이션의 핵심 설정 파일
- `App.tsx`: 루트 컴포넌트
- `routes.tsx`: React Router 라우팅 설정

### `/src/pages/`
- 각 페이지의 메인 컴포넌트
- `home/`: 랜딩 페이지 (LandingPage)
- `main/`: 메인 대시보드 (MainPage)

### `/src/components/`
#### `section/`
- 페이지별 섹션 컴포넌트
- `landing/`: 랜딩 페이지의 각 섹션 (Header, Hero, Features 등)
- `main/`: 메인 페이지의 각 섹션 (Timer, AI Suggestions 등)

#### `ui/`
- 재사용 가능한 UI 기본 컴포넌트
- Button, Input 등

#### `common/`
- 여러 페이지에서 공통으로 사용되는 컴포넌트 (향후 사용)

#### `layout/`
- 레이아웃 관련 컴포넌트 (향후 사용)

#### `figma/`
- Figma 연동 관련 컴포넌트

### `/src/assets/`
- 이미지, 폰트, 아이콘 등 정적 자산

### `/src/hooks/`
- 커스텀 React Hooks

### `/src/types/`
- TypeScript 타입 정의 파일

### `/src/utils/`
- 유틸리티 함수 및 헬퍼 함수

### `/src/styles/`
- 전역 스타일 및 테마 설정

## 🔄 Import 경로 예시

### 페이지에서 섹션 컴포넌트 import
```typescript
// /src/pages/home/index.tsx
import { Header } from '../../components/section/landing/Header';
import { HeroSection } from '../../components/section/landing/HeroSection';
```

### 섹션 컴포넌트에서 UI 컴포넌트 import
```typescript
// /src/components/section/landing/LoginForm.tsx
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
```

### 섹션 컴포넌트에서 Figma 컴포넌트 import
```typescript
// /src/components/section/landing/ServiceCategoriesSection.tsx
import { ImageWithFallback } from '../../figma/ImageWithFallback';
```

## 🚀 장점

1. **확장성**: 명확한 폴더 구조로 새로운 기능 추가가 용이
2. **유지보수성**: 컴포넌트의 역할과 위치가 명확
3. **재사용성**: UI 컴포넌트와 섹션 컴포넌트의 분리
4. **가독성**: 표준적인 React 프로젝트 구조 패턴
5. **협업**: 팀원들이 쉽게 파일 위치를 찾을 수 있음

## 📌 참고사항

- 모든 디자인과 기능은 그대로 유지됩니다
- 키워드 클릭 시 구글 검색 기능 포함
- 반응형 디자인 적용
- TypeScript + React + TailwindCSS
