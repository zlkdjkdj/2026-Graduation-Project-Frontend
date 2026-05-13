// ============================================================
// app/routes.tsx
// 클라이언트 사이드 라우팅 설정.
// ============================================================
import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { StudyPage } from '../pages/study/StudyPage';
import { ExercisePage } from '../pages/exercise/ExercisePage';
import { SchedulePage } from '../pages/schedule/SchedulePage';
import { CommunityPage } from '../pages/community/CommunityPage';
import { EmptyPage } from '../pages/home/EmptyPage';
import { Home } from '../pages/home/home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // 랜딩 페이지
  },
  {
    path: '/login',
    element: <EmptyPage title="로그인" />,
  },
  {
    path: '/signup',
    element: <EmptyPage title="회원가입" />,
  },
  {
    path: '/',
    element: <MainLayout />, // 사이드바 + 모바일 헤더 공통 레이아웃
    children: [
      { path: 'study',     element: <StudyPage /> },
      { path: 'exercise',  element: <ExercisePage /> },
      { path: 'schedule',  element: <SchedulePage /> },
      { path: 'community', element: <CommunityPage /> },
      { path: 'settings',  element: <EmptyPage title="설정" /> },
    ],
  },
]);
