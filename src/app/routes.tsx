import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { StudyPage } from '../pages/study/StudyPage';
import { ExercisePage } from '../pages/exercise/ExercisePage';
import { EmptyPage } from '../pages/home/EmptyPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/study" replace />
      },
      {
        path: 'study',
        element: <StudyPage />
      },
      {
        path: 'exercise',
        element: <ExercisePage />
      },
      {
        path: 'community',
        element: <EmptyPage title="커뮤니티" />
      },
      {
        path: 'settings',
        element: <EmptyPage title="설정" />
      }
    ]
  }
]);
