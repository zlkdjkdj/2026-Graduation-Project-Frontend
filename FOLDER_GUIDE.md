# Learn-Time 프로젝트 폴더 및 파일 역할 가이드

## 📁 전체 구조 개요

```
Learn-Time/
├── src/
│   ├── app/                      # 앱 핵심 설정 및 UI 라이브러리
│   ├── pages/                    # 페이지 컴포넌트
│   ├── components/               # 커스텀 컴포넌트
│   └── styles/                   # 스타일 파일
├── package.json
├── vite.config.ts
└── postcss.config.mjs
```

---

## 🎯 주요 폴더별 상세 역할

### 1️⃣ `/src/app/` - 앱 핵심 설정 폴더

**역할**: 애플리케이션의 시작점과 핵심 설정 파일들이 위치

#### 📄 `App.tsx`
- **역할**: React 앱의 최상위 컴포넌트 (Entry Point)
- **기능**: React Router Provider를 감싸서 전체 라우팅 시스템 활성화
- **코드 예시**:
```tsx
import { RouterProvider } from 'react-router';
import { router } from './routes';

export default function App() {
  return <RouterProvider router={router} />;
}
```

#### 📄 `routes.tsx`
- **역할**: 페이지 라우팅(URL 경로) 설정
- **기능**: 
  - `/` → LandingPage (홈페이지)
  - `/main` → MainPage (메인 대시보드)
- **추가 페이지를 만들 때**: 여기에 경로 추가

#### 📁 `app/components/ui/` - **UI 라이브러리 (시스템 제공)**
- **역할**: 재사용 가능한 기본 UI 컴포넌트 모음 (약 47개)
- **특징**: 
  - shadcn/ui 기반의 완성된 컴포넌트 라이브러리
  - Button, Input, Dialog, Card, Table, Calendar, Chart 등
  - **현재 프로젝트에서는 Button과 Input만 사용 중**
  - 시스템에서 자동 제공되므로 **수정/삭제 불가 (보호 파일)**
  - 나머지 45개는 무시하면 됨 (빌드에 자동 제외)
- **사용 예시**:
```tsx
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';
```

**주요 UI 컴포넌트 목록 (일부)**:
| 컴포넌트 | 역할 | 사용 여부 |
|---------|------|----------|
| `button.tsx` | 버튼 (기본, 아웃라인, 링크 등) | ✅ **사용 중** |
| `input.tsx` | 입력 필드 | ✅ **사용 중** |
| `card.tsx` | 카드 레이아웃 | ⚪ 무시 |
| `dialog.tsx` | 모달/팝업 | ⚪ 무시 |
| `tabs.tsx` | 탭 UI | ⚪ 무시 |
| `calendar.tsx` | 달력 | ⚪ 무시 |
| `chart.tsx` | 차트 | ⚪ 무시 |
| `table.tsx` | 테이블 | ⚪ 무시 |

> 💡 **중요**: 나머지 40개 이상의 컴포넌트는 시스템 파일이라 삭제 불가하지만, **사용하지 않으면 빌드에 포함되지 않아** 성능에 전혀 영향이 없습니다. 필요 시 언제든 사용 가능합니다.

#### 📁 `app/components/figma/`
- **역할**: Figma 연동 관련 컴포넌트
- **파일**: `ImageWithFallback.tsx` - 이미지 로딩 실패 시 대체 이미지 표시
- **특징**: 보호 파일 (수정/삭제 불가)

---

### 2️⃣ `/src/pages/` - 페이지 폴더

**역할**: 각 URL 경로에 해당하는 최상위 페이지 컴포넌트

#### 📁 `pages/home/`
- **파일**: `index.tsx` → `LandingPage` 컴포넌트
- **URL**: `/` (홈페이지)
- **내용**: 
  - Learn-Time 소개
  - 로그인 폼
  - 주요 기능 소개
  - 서비스 카테고리 (Edu Vibe, Fitness Routine, Miracle Time)

#### 📁 `pages/main/`
- **파일**: `index.tsx` → `MainPage` 컴포넌트
- **URL**: `/main`
- **내용**: 
  - 로그인 후 보이는 메인 대시보드
  - 3가지 모드 탭 (Edu Vibe, Fitness Routine, Miracle Time)
  - 타이머, AI 분석 등 실제 기능

---

### 3️⃣ `/src/components/` - 커스텀 컴포넌트 폴더

**역할**: 프로젝트에서 실제 사용하는 커스텀 컴포넌트들

#### 📁 `components/section/` - 섹션 컴포넌트

##### `section/landing/` - 랜딩 페이지 섹션들 (7개)
| 파일 | 역할 |
|------|------|
| `Header.tsx` | 상단 네비게이션 바 |
| `HeroSection.tsx` | 메인 히어로 영역 (큰 제목, 캐치프라이즈) |
| `LoginForm.tsx` | 로그인 폼 (이메일, 비밀번호 입력) |
| `QuoteSection.tsx` | 인용구/슬로건 섹션 |
| `FeaturesSection.tsx` | 주요 기능 소개 (AI 플래너, Stack Up 등) |
| `ServiceCategoriesSection.tsx` | 3가지 서비스 카테고리 소개 |
| `Footer.tsx` | 하단 푸터 (저작권, 링크 등) |

##### `section/main/` - 메인 페이지 섹션들 (4개)
| 파일 | 역할 |
|------|------|
| `StudyTimer.tsx` | 학습시간 추적 타이머 (시작/일시정지/리셋) |
| `PomodoroTimer.tsx` | 뽀모도로 타이머 (25분 공부 + 5분 휴식) |
| `StudyMaterialUpload.tsx` | 공부 주제 설정 + 책 검색 시스템 |
| `AiSuggestions.tsx` | AI 분석 및 학습 제안 (키워드 클릭 시 구글 검색) |
| `FitnessWorkout.tsx` | 운동 부위 체크 및 시간 입력 시스템 |
| `FitnessVideos.tsx` | 선택한 운동 부위별 유튜브 영상 추천 |

---

### 4️⃣ `/src/styles/` - 스타일 폴더

**역할**: 전역 스타일 및 디자인 테마 설정

| 파일 | 역할 |
|------|------|
| `index.css` | 메인 CSS (모든 스타일 import) |
| `tailwind.css` | Tailwind CSS 기본 설정 |
| `theme.css` | 색상, 폰트, 간격 등 디자인 토큰 |
| `fonts.css` | 커스텀 폰트 import |

---

## 🔧 설정 파일들

### 루트 폴더의 파일들

#### 📄 `package.json`
- **역할**: 프로젝트 설정 및 의존성 관리
- **내용**:
  - 프로젝트 이름, 버전
  - 설치된 패키지 목록 (React, TypeScript, Tailwind 등)
  - npm 스크립트 (`npm run dev`, `npm run build`)

#### 📄 `vite.config.ts`
- **역할**: Vite 빌드 도구 설정
- **기능**: 개발 서버, 빌드 최적화, 경로 alias 설정

#### 📄 `postcss.config.mjs`
- **역할**: CSS 후처리 설정
- **기능**: Tailwind CSS 처리

---

## 📊 컴포넌트 계층 구조

```
App.tsx (루트)
  └── RouterProvider
        │
        ├── LandingPage (/pages/home/index.tsx)
        │     ├── Header
        │     ├── HeroSection
        │     ├── LoginForm (Button, Input 사용)
        │     ├── QuoteSection
        │     ├── FeaturesSection
        │     ├── ServiceCategoriesSection
        │     └── Footer
        │
        └── MainPage (/pages/main/index.tsx)
              ├── Header
              └── 모드별 탭
                    ├── Edu Vibe 탭
                    │     ├── StudyTimer
                    │     ├── PomodoroTimer
                    │     ├── StudyMaterialUpload
                    │     └── AiSuggestions
                    │
                    ├── Fitness Routine 탭
                    └── Miracle Time 탭
```

---

## 🎨 UI 컴포넌트 사용 예시

### 예시: Button과 Input 사용
```tsx
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';

export function LoginForm() {
  return (
    <form>
      <Input 
        type="email" 
        placeholder="이메일을 입력하세요"
      />
      <Input 
        type="password" 
        placeholder="비밀번호를 입력하세요"
      />
      <Button type="submit">
        로그인
      </Button>
    </form>
  );
}
```

---

## 🚀 새로운 기능 추가 시 가이드

### 1. 새로운 페이지 추가
1. `/src/pages/새페이지/index.tsx` 생성
2. `/src/app/routes.tsx`에 경로 추가
```tsx
{
  path: "/새페이지",
  Component: 새페이지컴포넌트,
}
```

### 2. 새로운 섹션 추가 (기존 페이지 내)
1. `/src/components/section/페이지명/새섹션.tsx` 생성
2. 해당 페이지에서 import하여 사용

### 3. UI 컴포넌트 사용
- `/src/app/components/ui/`에 이미 47개의 컴포넌트 준비됨
- 필요한 것을 찾아서 import하여 사용
```tsx
import { Card } from '../../../app/components/ui/card';
import { Dialog } from '../../../app/components/ui/dialog';
import { Calendar } from '../../../app/components/ui/calendar';
```

---

## 💡 핵심 요약

| 폴더/파일 | 역할 | 수정 빈도 |
|-----------|------|-----------|
| `/src/app/App.tsx` | 앱 시작점 | 거의 안  |
| `/src/app/routes.tsx` | 페이지 라우팅 | 페이지 추가 시 |
| `/src/app/components/ui/` | UI 라이브러리 (47개) | **수정 불가 (시스템 제공)** |
| `/src/pages/` | 페이지 컴포넌트 | 자주 |
| `/src/components/section/` | 섹션 컴포넌트 (11개) | 매우 자주 |
| `/src/styles/` | 스타일 설정 | 가끔 |

---

## 🔍 자주 묻는 질문

**Q: UI 컴포넌트를 직접 만들어야 하나요?**  
A: 아니요! `/src/app/components/ui/`에 이미 47개의 완성된 컴포넌트가 있습니다. 필요한 것을 찾아서 import만 하면 됩니다. 현재는 Button과 Input만 사용 중입니다.

**Q: 새로운 페이지를 어디에 만들어야 하나요?**  
A: `/src/pages/`에 새 폴더를 만들고 `index.tsx` 파일을 생성하세요. 그리고 `/src/app/routes.tsx`에 경로를 추가하세요.

**Q: 공통으로 사용되는 작은 컴포넌트는 어디에?**  
A: `/src/components/section/`에 적절한 페이지 폴더를 만들거나, 여러 페이지에서 사용된다면 `/src/components/common/` 폴더를 만들어 활용하세요.

**Q: import 경로가 너무 길어요 (`../../../`)**  
A: 이는 정확한 경로를 명시하기 위함입니다. 향후 `vite.config.ts`에서 경로 alias를 설정하면 `@/app/components/ui/button`처럼 짧게 사용할 수 있습니다.

**Q: `/src/app/components/ui/`의 나머지 45개 컴포넌트는?**  
A: 현재는 사용하지 않지만 향후 기능 추가 시 바로 활용할 수 있습니다. 예를 들어:
- 데이터 표시 → `Table`, `Card`
- 날짜 선택 → `Calendar`
- 통계 → `Chart`
- 팝업 → `Dialog`, `Sheet`