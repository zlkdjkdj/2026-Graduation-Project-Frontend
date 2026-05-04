// ============================================================
// components/layout/MainLayout.tsx
// 앱 전체의 공통 레이아웃 컴포넌트.
//
// 주요 기능:
//   - 좌측 사이드바 (데스크탑 lg 이상): 로고, 네비게이션, 다크/라이트 모드 토글
//   - 상단 모바일 네비게이션 (lg 미만): 로고 + 모드 토글 버튼
//   - isDarkMode 상태로 <html> 태그에 .dark 클래스를 토글하여 테마 전환
//   - <Outlet />을 통해 현재 경로의 페이지 컴포넌트를 렌더링
// ============================================================
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  BookIcon, DumbbellIcon, UsersIcon, SettingsIcon, SunIcon, MoonIcon,
} from '../ui/Icons';

export function MainLayout() {
  // 기본값 false = 라이트 모드로 시작
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // isDarkMode 변경 시 <html> 클래스를 업데이트하여 Tailwind dark 변수 적용
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const currentPath = location.pathname;

  /**
   * 사이드바 단일 네비게이션 항목 컴포넌트 (인라인 정의)
   * active 상태일 때 흑/백 배경으로 강조 표시
   */
  const NavItem = ({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) => (
    <div
      onClick={() => navigate(to)}
      className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group ${
        active
          ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10'
          : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a]'
      }`}
    >
      <div className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-inherit' : 'text-gray-400 group-hover:text-inherit'}`}>
        {icon}
      </div>
      <span className="text-[0.95rem] font-bold tracking-tight">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#000000] text-gray-900 dark:text-[#ededed] flex transition-colors duration-500 font-sans selection:bg-indigo-500/30">

      {/* ── 데스크탑 사이드바 (lg 이상에서만 표시) ── */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-gray-200 dark:border-[#1a1a1a] p-6 sticky top-0 h-screen transition-colors duration-300">
        {/* 로고 */}
        <div className="flex items-center gap-3 px-2 mb-10 cursor-pointer" onClick={() => navigate('/study')}>
          <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-black text-sm shadow-xl">LT</div>
          <h1 className="text-xl font-black tracking-tighter uppercase">Learn-Time</h1>
        </div>

        {/* 네비게이션 메뉴 */}
        <div className="space-y-2 flex-grow">
          <NavItem to="/study"     icon={<BookIcon size={20} />}     label="학습 스튜디오" active={currentPath.includes('study')} />
          <NavItem to="/exercise"  icon={<DumbbellIcon size={20} />} label="운동 랩"       active={currentPath.includes('exercise')} />
          <NavItem to="/community" icon={<UsersIcon size={20} />}   label="커뮤니티"      active={currentPath.includes('community')} />
          <NavItem to="/settings"  icon={<SettingsIcon size={20} />} label="설정"          active={currentPath.includes('settings')} />
        </div>

        {/* 테마 토글 버튼 */}
        <div className="pt-6 border-t border-gray-200 dark:border-[#1a1a1a]">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#151515] transition-all duration-300 group"
          >
            <div className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </div>
            <span className="text-[0.95rem] font-bold tracking-tight">{isDarkMode ? '라이트 모드' : '다크 모드'}</span>
          </button>
        </div>
      </aside>

      {/* ── 모바일 상단 네비게이션 (lg 미만에서만 표시) ── */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200 dark:border-[#1a1a1a] px-6 py-4 flex justify-between items-center transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black font-black text-xs">LT</div>
          <h1 className="text-lg font-black tracking-tighter uppercase">LT</h1>
        </div>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 text-gray-500">
          {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
        </button>
      </nav>

      {/* ── 메인 콘텐츠 영역 (라우팅된 페이지가 여기에 렌더링됨) ── */}
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10 overflow-y-auto max-w-[1800px] mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
