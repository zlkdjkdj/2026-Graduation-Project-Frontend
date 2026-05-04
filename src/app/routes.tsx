// ============================================================
// app/routes.tsx
// 클라이언트 사이드 라우팅 설정.
// MainLayout을 공통 레이아웃으로 사용하고 하위 경로를 페이지로 매핑한다.
//
// 경로 구조:
//   /          → /study 로 자동 리다이렉트
//   /study     → 학습 스튜디오 페이지
//   /exercise  → 운동 랩 페이지
//   /community → 준비 중 페이지
//   /settings  → 준비 중 페이지
// ============================================================
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { StudyPage } from '../pages/study/StudyPage';
import { ExercisePage } from '../pages/exercise/ExercisePage';
import { EmptyPage } from '../pages/home/EmptyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // 사이드바 + 모바일 헤더 공통 레이아웃
    children: [
      {
        index: true,
        element: <Navigate to="/study" replace />, // 루트 접근 시 /study 로 이동
      },
      { path: 'study',     element: <StudyPage /> },
      { path: 'exercise',  element: <ExercisePage /> },
      { path: 'community', element: <EmptyPage title="커뮤니티" /> },
      { path: 'settings',  element: <EmptyPage title="설정" /> },
    ],
  },
]);
