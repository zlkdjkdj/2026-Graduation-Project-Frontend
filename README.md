# Learn-Time 🎓💪

> **AI 기반 학습 & 운동 통합 관리 플랫폼**
>
> 공부와 운동 루틴을 하나의 세련된 대시보드에서 관리하는 개인화 웹 앱입니다.
> Gemini AI와 연동 예정인 학습 로드맵 생성, 식단 추적, 운동 기록 등의 기능을 제공합니다.

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| 프레임워크 | React 19 + TypeScript |
| 빌드 도구 | Vite |
| 스타일링 | Tailwind CSS v4 |
| 라우팅 | react-router-dom v7 |
| 패키지 매니저 | pnpm |
| 폰트 | Pretendard Variable |

---

## 실행 방법

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행 (http://localhost:5173)
pnpm run dev

# 타입 체크
pnpm tsc --noEmit

# 프로덕션 빌드
pnpm run build
```

---

## 폴더 구조

```
src/
├── app/                          # 앱 진입점 및 라우터 설정
│   ├── App.tsx                   # RouterProvider 루트 컴포넌트
│   └── routes.tsx                # 클라이언트 사이드 라우팅 정의
│
├── components/
│   ├── common/                   # 여러 페이지에서 재사용되는 공통 UI
│   │   ├── BarChart.tsx          # 세로 막대 차트 (호버 인터랙션 포함)
│   │   ├── Button.tsx            # 공통 버튼 컴포넌트
│   │   ├── Card.tsx              # 카드 + 카드 타이틀 컴포넌트
│   │   ├── FieldInput.tsx        # 레이블 포함 입력 필드
│   │   ├── InfoCard.tsx          # 아이콘+제목+설명 수평 정보 카드
│   │   ├── Input.tsx             # 기본 입력 컴포넌트
│   │   └── ProgressBar.tsx       # 진행률 표시 바
│   │
│   ├── layout/
│   │   └── MainLayout.tsx        # 전체 레이아웃 (사이드바 + 모바일 헤더 + 테마 토글)
│   │
│   ├── section/
│   │   ├── study/                # 학습 스튜디오 전용 섹션 컴포넌트
│   │   │   ├── index.ts          # 배럴 익스포트 (StudyPage에서 단일 경로로 임포트)
│   │   │   ├── SyllabusBox.tsx   # 강의계획서 업로드 + AI 로드맵 생성
│   │   │   ├── ChecklistBox.tsx  # 학습 마일스톤 체크리스트 (추가/편집/삭제/정렬)
│   │   │   ├── StopwatchBox.tsx  # 학습 시간 측정 스톱워치
│   │   │   └── StudyWidgets.tsx  # DiaryBox / AiSuggestionBox / DashboardBox / GeminiBox
│   │   │
│   │   └── exercise/             # 운동 랩 전용 섹션 컴포넌트
│   │       ├── index.ts          # 배럴 익스포트
│   │       ├── ExerciseRecordBox.tsx  # 운동 세션 기록 + 오운완 사진 업로드
│   │       ├── DietBox.tsx            # 식단 관리 (아침/점심/저녁 탭, 칼로리 합산)
│   │       └── ExerciseWidgets.tsx    # GuideBox / AiGuideBox / DiaryBox / BodyCompositionBox / DashboardBox
│   │
│   └── ui/
│       └── Icons.tsx             # SVG 인라인 아이콘 컴포넌트 모음
│
├── pages/
│   ├── study/
│   │   └── StudyPage.tsx         # 학습 스튜디오 페이지 (/study)
│   ├── exercise/
│   │   └── ExercisePage.tsx      # 운동 랩 페이지 (/exercise)
│   └── home/
│       └── EmptyPage.tsx         # 준비 중 페이지 (/community, /settings)
│
├── types/
│   └── index.ts                  # 전역 TypeScript 타입 정의 (Todo, Mode)
│
├── index.css                     # Tailwind 설정 + 디자인 토큰 + 유틸리티 클래스
└── main.tsx                      # React DOM 렌더 진입점
```

---

## 페이지 및 라우팅

| 경로 | 컴포넌트 | 설명 |
|---|---|---|
| `/` | (redirect) | `/study`로 자동 이동 |
| `/study` | `StudyPage` | 학습 스튜디오 메인 대시보드 |
| `/exercise` | `ExercisePage` | 운동 랩 메인 대시보드 |
| `/community` | `EmptyPage` | 커뮤니티 (준비 중) |
| `/settings` | `EmptyPage` | 설정 (준비 중) |

---

## 주요 기능

### 📚 학습 스튜디오 (`/study`)

| 컴포넌트 | 기능 |
|---|---|
| `DashboardBox` | 주간 몰입도 차트 + 집중도/완료율/전략 깊이 진행바 |
| `SyllabusBox` | 강의계획서 업로드, 시작/종료일 설정, AI 로드맵 생성 |
| `ChecklistBox` | AI 추천 / 개인 일정 분리 체크리스트 (CRUD + 순서 변경) |
| `StopwatchBox` | hh:mm:ss 스톱워치 (시작/정지/초기화) |
| `DiaryBox` | 학습 일지 작성 + 집중 시간 기록 |
| `AiSuggestionBox` | AI 학습 전략 제안 카드 |
| `GeminiBox` | Gemini AI 외부 링크 |

### 🏋️ 운동 랩 (`/exercise`)

| 컴포넌트 | 기능 |
|---|---|
| `ExerciseDashboardBox` | 주간 근성장 속도 차트 + 지속성 스코어 / 누적 볼륨 지표 |
| `ExerciseRecordBox` | 운동 시간 입력 + 오운완 사진 업로드 |
| `DietBox` | 아침/점심/저녁 식단 관리 + 칼로리 자동 합산 |
| `AiExerciseGuideBox` | AI 운동 전략 분석 (최적화 제안 / 목표 분석 / 신체 변화) |
| `BodyCompositionBox` | 체중 / 체지방률 / 골격근량 입력 |
| `ExerciseDiaryBox` | 트레이닝 로그 + 운동 시간 저장 |
| `ExerciseGuideBox` | 부위별 (가슴/등/어깨 등) 운동 영상 스트림 |

---

## 디자인 시스템

### 테마

- **기본 모드**: 라이트 모드 (`isDarkMode = false`)
- **전환 방식**: `<html>` 태그에 `.dark` 클래스 토글 → Tailwind `dark:` 변수 활성화
- **전환 위치**: 사이드바 하단 / 모바일 헤더 우측 버튼

### 모드별 포인트 컬러

| 모드 | 포인트 컬러 |
|---|---|
| 학습 스튜디오 | **Indigo** (`border-indigo-500`, `bg-indigo-600`) |
| 운동 랩 | **Rose** (`border-rose-500`, `bg-rose-600`) |

기반 팔레트는 흑/백 모노크롬을 유지하며, 각 모드에서 헤더 강조선 · 카드 상단 바 · 그래프 호버 · 포커스 링 등 포인트 요소에만 색상을 적용합니다.

### 공통 CSS 유틸리티 (`index.css`)

| 클래스 | 설명 |
|---|---|
| `.studio-card` | 카드 기본 스타일 (bg, border, rounded-[2.5rem], shadow) |
| `.bento-grid` | 12열 그리드 레이아웃 (gap: 1.5rem) |
| `.glow-indigo` | 인디고 그로우 이펙트 (::after pseudo-element) |
| `.glow-rose` | 로즈 그로우 이펙트 (::after pseudo-element) |
| `.text-glow` | 흰색 텍스트 글로우 그림자 |
| `.custom-scrollbar` | 커스텀 얇은 스크롤바 스타일 |

---

## 공통 컴포넌트 API

### `BarChart`
```tsx
<BarChart
  data={[40, 70, 45, 90, 60, 85, 30]}     // 막대 높이 (%)
  labels={['월', '화', '수', '목', '금', '토', '일']}
  activeColor="group-hover:bg-indigo-600"   // 호버 막대 색
  labelActiveColor="group-hover:text-indigo-600"
  height="h-[250px]"                        // 선택적
/>
```

### `ProgressBar`
```tsx
<ProgressBar
  name="집중도"
  progress={82}
  accentColor="bg-indigo-600"
  textColor="text-indigo-500"
  borderHover="hover:border-indigo-300"
/>
```

### `InfoCard`
```tsx
<InfoCard
  icon={<TrendIcon size={20} />}
  title="성과 분석"
  text="현재 속도로 계속하면 계획보다 3일 일찍 완료할 수 있습니다."
  iconColor="text-indigo-500"
  hoverBg="hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
/>
```

### `FieldInput`
```tsx
<FieldInput
  label="체중 (kg)"
  type="number"
  placeholder="0.0"
  step="0.1"
  focusColor="focus:ring-rose-500"
/>
```

---

## 향후 개발 예정

- [ ] **로컬스토리지 연동**: 체크리스트·일지 데이터 영구 저장
- [ ] **Gemini AI API 연동**: 실제 학습 로드맵 생성
- [ ] **영양 DB 연동**: 음식명 자동완성 및 정확한 칼로리 산출
- [ ] **커뮤니티 페이지**: 학습/운동 기록 공유 피드
- [ ] **설정 페이지**: 프로필, 목표, 알림 설정
- [ ] **모바일 하단 탭 내비게이션**: lg 미만 환경 UX 개선
- [ ] **운동 영상 스트림**: ExerciseGuideBox 실제 영상 연동
