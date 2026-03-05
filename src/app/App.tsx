import { Route, Routes } from 'react-router-dom';

import { routes } from './routes';
import Header from '../componets/layout/Header';
import Footer from '../componets/layout/Footer';

function App() {
  return (
    <>
      <Header /> {/* 헤더 영역 (전역) */}

      {/* routes.tsx 배열에 정의한 설정한 경로로 페이지를 만듦 */}
      <Routes>
        {
          routes.map(route => (
            <Route 
              key={route.path} 
              path={route.path}
              element={
                <main>
                  {route.element} 
                </main>
              } 
            />
          ))
        }
      </Routes>

      <Footer /> {/* 푸터 영역 (전역) */}
    </>
  )
}

export default App
