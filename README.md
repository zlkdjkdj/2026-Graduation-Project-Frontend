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
| 비동기 상태 관리 | TanStack React Query v5 |
| HTTP 통신 | Axios |
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

## 폴더 구조 및 각 파일의 역할

```
src/
├── api/                          # REST API 클라이언트 모음
│   ├── client.ts                 # Axios 인스턴스 설정 (Bearer JWT 주입, 공통 에러 핸들링)
│   └── study.ts                  # 학습(Todo) API 엔드포인트 통신 모듈
│
├── app/                          # 앱 진입점 및 라우터 설정
│   ├── App.tsx                   # QueryClient 및 RouterProvider 설정 루트 컴포넌트
│   └── routes.tsx                # 클라이언트 사이드 라우팅 정의
│
├── components/
│   ├── common/                   # 재사용되는 공통 UI
│   │   ├── BarChart.tsx          # 세로 막대 차트 (인터랙션 포함)
│   │   ├── Button.tsx            # 공통 버튼 컴포넌트
│   │   ├── Card.tsx              # 카드 프레임 및 카드 타이틀
│   │   ├── FieldInput.tsx        # 레이블 포함 입력 필드
│   │   ├── InfoCard.tsx          # 수평 정보 카드
│   │   ├── Input.tsx             # 기본 인풋 필드
│   │   └── ProgressBar.tsx       # 진행률 바
│   │
│   ├── layout/
│   │   └── MainLayout.tsx        # 전체 레이아웃 (상단 헤더바 + 알림/테마 토글 + 서브 라우트 컨테이너)
│   │
│   ├── section/                  # 각 페이지별 핵심 전용 섹션 컴포넌트
│   │   ├── home/                 # 랜딩 페이지(/home) 전용 컴포넌트
│   │   │   ├── HomeHeader.tsx    # 랜딩 페이지 상단 헤더
│   │   │   ├── HomeFooter.tsx    # 랜딩 페이지 하단 푸터
│   │   │   ├── section/          # 랜딩 페이지 본문 섹션 (Hero, Mode, Preview, Gamification, CTA)
│   │   │   └── preview/          # 기능 프리뷰 컴포넌트 (Study, Health, Calendar, Community, MobileMockup)
│   │   │
│   │   ├── study/                # 학습 스튜디오 전용 섹션 컴포넌트
│   │   │   ├── index.ts          # 배럴 익스포트
│   │   │   ├── SyllabusBox.tsx   # 강의계획서 업로드 + AI 로드맵 생성
│   │   │   ├── ChecklistBox.tsx  # 학습 마일스톤 체크리스트
│   │   │   ├── StopwatchBox.tsx  # 학습 시간 측정 스톱워치
│   │   │   └── StudyWidgets.tsx  # DiaryBox, AiSuggestionBox, DashboardBox 등
│   │   │
│   │   ├── exercise/             # 운동 랩 전용 섹션 컴포넌트
│   │   │   ├── index.ts          # 배럴 익스포트
│   │   │   ├── ExerciseRecordBox.tsx  # 운동 기록 및 사진 업로드
│   │   │   ├── DietBox.tsx            # 식단 관리 (아침/점심/저녁 탭, 칼로리 합산)
│   │   │   └── ExerciseWidgets.tsx    # GuideBox, AiGuideBox, BodyCompositionBox 등
│   │   │
│   │   ├── schedule/             # 일정 생성 전용 섹션 컴포넌트
│   │   │   ├── index.ts          # 배럴 익스포트
│   │   │   ├── CalendarBox.tsx        # 메인 캘린더 컴포넌트
│   │   │   ├── ScheduleLists.tsx      # 일정 목록 및 상태 필터링
│   │   │   ├── AiInsightsBox.tsx      # AI 루틴 추천 및 통계 인사이트
│   │   │   └── ScheduleModal.tsx      # 일정 추가/수정 모달
│   │   │
│   │   └── community/            # 커뮤니티 전용 섹션 컴포넌트
│   │       ├── index.ts          # 배럴 익스포트
│   │       ├── CommunityHeader.tsx    # 커뮤니티 검색 및 헤더
│   │       ├── PostCard.tsx           # 게시글 카드 컴포넌트
│   │       ├── PostDetailModal.tsx    # 게시글 상세 및 댓글 모달
│   │       ├── GlobalRankingBox.tsx   # 유저 랭킹 보드
│   │       └── RewardMilestoneBox.tsx # 등급별 리워드 시각화
│   │
│   └── ui/
│       └── Icons.tsx             # SVG 인라인 아이콘 컴포넌트 모음
│
├── hooks/
│   └── queries/                  # TanStack React Query 커스텀 훅 모음
│       └── useTodos.ts           # Todo 데이터 조회/생성/수정/삭제 캐싱 및 낙관적 업데이트 관리
│
├── pages/                        # 각 라우트별 진입점 컴포넌트
│   ├── home.tsx                  # 서비스 메인 랜딩 페이지 (/home)
│   ├── StudyPage.tsx             # 학습 스튜디오 대시보드 페이지 (/main/study)
│   ├── ExercisePage.tsx          # 운동 랩 대시보드 페이지 (/main/exercise)
│   ├── SchedulePage.tsx          # 일정 생성 대시보드 페이지 (/main/schedule)
│   ├── CommunityPage.tsx         # 커뮤니티 메인 페이지 (/main/community)
│   └── EmptyPage.tsx             # 임시 페이지 (로그인, 회원가입, 설정 등)
│
├── types/
│   └── index.ts                  # 전역 TypeScript 공통 타입 및 API 응답 DTO 규격 정의
│
├── index.css                     # Tailwind v4 설정 + 전역 디자인 토큰 및 클래스
└── main.tsx                      # QueryClient 제공자 설정 및 React DOM 마운트
```

---

## 페이지 및 라우팅

| 경로 | 컴포넌트 | 설명 |
|---|---|---|
| `/` | (redirect) | `/home`으로 자동 리다이렉트 |
| `/home` | `Home` | 서비스 메인 랜딩 페이지 |
| `/login` | `EmptyPage` | 로그인 페이지 (준비 중) |
| `/signup` | `EmptyPage` | 회원가입 페이지 (준비 중) |
| `/main` | (redirect) | `/main/study`로 자동 리다이렉트 |
| `/main/study` | `StudyPage` | 학습 스튜디오 대시보드 |
| `/main/exercise` | `ExercisePage` | 운동 랩 대시보드 |
| `/main/schedule` | `SchedulePage` | 일정 생성 대시보드 (캘린더 및 AI 인사이트) |
| `/main/community` | `CommunityPage` | 커뮤니티 광장 (글 작성, 댓글, 실시간 랭킹 및 리워드) |
| `/main/settings` | `EmptyPage` | 설정 페이지 (준비 중) |

---

## 💻 백엔드 및 DB 연동 가이드라인 (백엔드 담당자 필독)

### 1. HTTP 통신 및 CORS 설정
* **CORS 우회**: 로컬 개발 환경(`pnpm run dev`)에서는 `vite.config.ts` 프록시 설정을 통해 `/api` 경로의 요청을 백엔드 서버(`http://localhost:8080`)로 우회합니다.
* **프로덕션 환경**: 배포 시 `.env.production` 파일 내의 `VITE_API_BASE_URL` 환경 변수에 백엔드 실서버 API 베이스 주소를 설정해야 합니다.

### 2. 인증 및 보안 (JWT)
* 모든 API 요청 헤더에 `Authorization: Bearer <token>` 형태로 JWT Access Token이 주입됩니다 (`src/api/client.ts` 참고).
* 백엔드는 **Spring Security**에서 Filter 또는 Interceptor를 이용해 이 헤더를 파싱하여 검증을 거친 후 사용자를 식별해야 합니다.
* HTTP 응답 코드 `401 Unauthorized` 발생 시 프론트엔드에서는 토큰 초기화 및 로그아웃/로그인 화면 리다이렉트를 처리합니다.

### 3. 공통 API 응답 규격 (DTO)
모든 REST 컨트롤러의 반환값은 아래 규격에 맞추어 JSON 객체로 감싸서 응답해야 합니다.
```typescript
export interface ApiResponse<T> {
  status: number;    // HTTP 상태 코드 또는 서비스 전용 비즈니스 코드
  message: string;   // 응답 메시지 (에러 혹은 성공 메시지)
  data: T;           // 실제 본문 데이터
}
```

### 4. API 엔드포인트 명세

#### 📚 학습(Todo) 도메인 (`/api/study/todos`)
| 기능 | 메서드 | 엔드포인트 | 요청 Body / DTO | 응답 Data (T) |
|---|---|---|---|---|
| Todo 목록 조회 | `GET` | `/study/todos` | 없음 | `Todo[]` |
| Todo 단건 등록 | `POST` | `/study/todos` | `CreateTodoDto` | `Todo` |
| Todo 벌크 등록 | `POST` | `/study/todos/bulk` | `CreateTodoDto[]` | `Todo[]` |
| Todo 수정 | `PUT` | `/study/todos/{id}` | `UpdateTodoDto` | `Todo` |
| Todo 삭제 | `DELETE` | `/study/todos/{id}` | 없음 | 없음 (Void) |

* **낙관적 업데이트 (Optimistic Update)**: `PUT /study/todos/{id}` 호출 시 클라이언트는 서버의 응답 이전에 UI를 우선 반영하고 실패 시 롤백합니다. 백엔드는 신속한 트랜잭션 처리 및 신뢰성 있는 DB 업데이트를 보장해야 합니다.

#### 💬 커뮤니티 도메인 (`/api/community`) - 설계 대상
* **게시판 CRUD API**: 최신 피드 리스트 페이징 조회, 게시글 상세, 게시글 등록/수정/삭제
* **댓글 API**: 게시글별 댓글 CRUD
* **포인트 및 리워드 API**: 랭킹 리스트 조회, 사용자 누적 포인트에 따른 리워드(모빌리티 등급) 정보 갱신

---

### 5. DB 스키마 매핑 가이드

#### A. MySQL 스키마 가이드
```sql
-- USER 테이블 (포인트 및 랭킹 관리)
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    points INT DEFAULT 0
);

-- TODO 테이블 (학습 마일스톤)
CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY, -- FE에서 임시 생성된 UUID 또는 BE 생성 고유키 사용
    text VARCHAR(255) NOT NULL,
    completed TINYINT(1) DEFAULT 0,
    is_ai TINYINT(1) DEFAULT 0,
    order_index INT DEFAULT 0 -- 정렬 순서 보정용 필드 (추후 정렬 기능 활성화 시 사용)
);

-- POST 테이블 (커뮤니티 게시글)
CREATE TABLE posts (
    id VARCHAR(255) PRIMARY KEY,
    author_id VARCHAR(255),
    content TEXT NOT NULL,
    likes INT DEFAULT 0,
    badge VARCHAR(50) DEFAULT 'bronze',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- COMMENT 테이블 (게시글 댓글)
CREATE TABLE comments (
    id VARCHAR(255) PRIMARY KEY,
    post_id VARCHAR(255) NOT NULL,
    author_id VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### B. Oracle DB 스키마 가이드
```sql
-- USER 테이블
CREATE TABLE users (
    id VARCHAR2(255) PRIMARY KEY,
    name VARCHAR2(100) NOT NULL,
    points NUMBER(10) DEFAULT 0
);

-- TODO 테이블
CREATE TABLE todos (
    id VARCHAR2(255) PRIMARY KEY,
    text VARCHAR2(255) NOT NULL,
    completed CHAR(1) DEFAULT 'N' CHECK (completed IN ('Y', 'N')),
    is_ai CHAR(1) DEFAULT 'N' CHECK (is_ai IN ('Y', 'N')),
    order_index NUMBER(6) DEFAULT 0
);

-- POST 테이블
CREATE TABLE posts (
    id VARCHAR2(255) PRIMARY KEY,
    author_id VARCHAR2(255) NOT NULL,
    content CLOB NOT NULL,
    likes NUMBER(10) DEFAULT 0,
    badge VARCHAR2(50) DEFAULT 'bronze',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_post_user FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);

-- COMMENT 테이블
CREATE TABLE comments (
    id VARCHAR2(255) PRIMARY KEY,
    post_id VARCHAR2(255) NOT NULL,
    author_id VARCHAR2(255) NOT NULL,
    content CLOB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comment_post FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_user FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🎨 공통 컴포넌트 안내

UI 개발 편의를 위해 `src/components/common` 디렉토리에 공통 컴포넌트들이 준비되어 있습니다. 신규 마이그레이션이나 기능 확장 시 활용할 수 있습니다.

### 1. `BarChart`
세로 막대 그래프 컴포넌트. hover 효과가 기본 장착되어 있습니다.
```tsx
<BarChart
  data={[40, 70, 45, 90, 60, 85, 30]} // 퍼센트 수치 (0 ~ 100)
  labels={['월', '화', '수', '목', '금', '토', '일']}
  activeColor="group-hover:bg-indigo-600" // 활성 상태 막대 색상
  labelActiveColor="group-hover:text-indigo-600"
  height="h-[250px]"
/>
```

### 2. `ProgressBar`
학습률 및 통계 표현을 위한 선형 프로그레스바입니다.
```tsx
<ProgressBar
  name="집중도"
  progress={82}
  accentColor="bg-indigo-600"
  textColor="text-indigo-500"
  borderHover="hover:border-indigo-300"
/>
```

### 3. `InfoCard`
대시보드의 수치 분석용 정보를 가독성 있게 나타낼 때 사용합니다.
```tsx
<InfoCard
  icon={<TrendIcon size={20} />}
  title="성과 분석"
  text="현재 속도로 계속하면 계획보다 3일 일찍 완료할 수 있습니다."
  iconColor="text-indigo-500"
  hoverBg="hover:bg-indigo-50 dark:hover:bg-indigo-950/20"
/>
```

### 4. `FieldInput`
통합 레이블링과 섀도 효과가 포함된 UI 입력 필드입니다.
```tsx
<FieldInput
  label="체중 (kg)"
  type="number"
  placeholder="0.0"
  step="0.1"
  focusColor="focus:ring-rose-500"
/>
```
