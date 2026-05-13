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
  BookIcon, DumbbellIcon, UsersIcon, SettingsIcon, SunIcon, MoonIcon, CalendarIcon,
  ChevronLeftIcon, ChevronRightIcon
} from '../ui/Icons';

export function MainLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isStudyExpanded, setIsStudyExpanded] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  // isDarkMode 변경 시 <html> 클래스를 업데이트하여 Tailwind dark 변수 적용
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const currentPath = location.pathname;

  /**
   * 사이드바 단일 네비게이션 항목 컴포넌트 (인라인 정의)
   */
  const NavItem = ({ to, icon, label, active, onClickOverride, hasToggle, isExpanded }: { to: string; icon: React.ReactNode; label: string; active: boolean; onClickOverride?: () => void; hasToggle?: boolean; isExpanded?: boolean }) => (
    <div
      onClick={() => onClickOverride ? onClickOverride() : navigate(to)}
      className={`flex items-center justify-between px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 group ${
        active
          ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/10 dark:shadow-white/10'
          : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a]'
      } ${isSidebarCollapsed ? 'justify-center px-0 w-12 mx-auto' : ''}`}
      title={isSidebarCollapsed ? label : ''}
    >
      <div className="flex items-center gap-4">
        <div className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-inherit' : 'text-gray-400 group-hover:text-inherit'}`}>
          {icon}
        </div>
        {!isSidebarCollapsed && <span className="text-[0.95rem] font-bold tracking-tight whitespace-nowrap">{label}</span>}
      </div>
      {hasToggle && !isSidebarCollapsed && (
        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''} ${active ? 'text-inherit' : 'text-gray-400'}`}>
          <ChevronRightIcon size={16} />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#000000] text-gray-900 dark:text-[#ededed] flex transition-colors duration-500 font-sans selection:bg-indigo-500/30">

      {/* ── 데스크탑 사이드바 (lg 이상에서만 표시) ── */}
      <aside className={`hidden lg:flex flex-col border-r border-gray-200 dark:border-[#1a1a1a] p-6 sticky top-0 h-screen transition-all duration-500 ${isSidebarCollapsed ? 'w-24' : 'w-72'}`}>
        {/* 로고 */}
        <div className={`flex items-center gap-3 px-2 mb-10 cursor-pointer ${isSidebarCollapsed ? 'justify-center' : ''}`} onClick={() => navigate('/main/study')}>
          <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-black text-sm shadow-xl flex-shrink-0">LT</div>
          {!isSidebarCollapsed && <h1 className="text-xl font-black tracking-tighter uppercase animate-in fade-in duration-500">Learn-Time</h1>}
        </div>

        {/* 네비게이션 메뉴 */}
        <div className="space-y-2 flex-grow">
          <NavItem to="/main/schedule"  icon={<CalendarIcon size={20} />} label="일정 생성"     active={currentPath.includes('schedule')} />
          <div>
            <NavItem 
              to="/main/study" 
              icon={<BookIcon size={20} />} 
              label="학습 스튜디오" 
              active={currentPath.includes('study')} 
              hasToggle={true}
              isExpanded={isStudyExpanded}
              onClickOverride={() => {
                if (currentPath.includes('study')) {
                  setIsStudyExpanded(!isStudyExpanded);
                } else {
                  setIsStudyExpanded(true);
                  navigate('/main/study');
                }
              }} 
            />
            {/* 과목 토글 */}
            {isStudyExpanded && !isSidebarCollapsed && (
              <div className="ml-12 mt-2 space-y-1 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                {[
                  { id: 'math', name: '수학' },
                  { id: 'english', name: '영어' },
                  { id: 'science', name: '과학' },
                  { id: 'history', name: '역사' },
                ].map(sub => (
                  <div 
                    key={sub.id}
                    onClick={() => setSelectedSubject(sub.id)}
                    className={`text-sm py-2 px-4 rounded-xl cursor-pointer font-medium transition-all ${
                      selectedSubject === sub.id 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold' 
                      : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1a1a1a]'
                    }`}
                  >
                    {sub.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <NavItem to="/main/exercise"  icon={<DumbbellIcon size={20} />} label="운동 랩"       active={currentPath.includes('exercise')} />
          <NavItem to="/main/community" icon={<UsersIcon size={20} />}   label="커뮤니티"      active={currentPath.includes('community')} />
          <NavItem to="/main/settings"  icon={<SettingsIcon size={20} />} label="설정"          active={currentPath.includes('settings')} />
        </div>

        {/* 테마 토글 및 사이드바 토글 버튼 */}
        <div className="pt-6 border-t border-gray-200 dark:border-[#1a1a1a] space-y-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#151515] transition-all duration-300 group ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
          >
            <div className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
              {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </div>
            {!isSidebarCollapsed && <span className="text-[0.95rem] font-bold tracking-tight whitespace-nowrap">{isDarkMode ? '라이트 모드' : '다크 모드'}</span>}
          </button>

          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border border-dashed border-gray-200 dark:border-[#1a1a1a] text-gray-400 hover:text-black dark:hover:text-white hover:border-gray-400 transition-all duration-300 group ${isSidebarCollapsed ? 'justify-center px-0' : ''}`}
          >
            <div className="group-hover:scale-110 transition-transform">
              {isSidebarCollapsed ? <ChevronRightIcon size={20} /> : <ChevronLeftIcon size={20} />}
            </div>
            {!isSidebarCollapsed && <span className="text-[0.95rem] font-bold tracking-tight">사이드바 접기</span>}
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
      <main className="flex-grow p-6 lg:p-10 pt-24 lg:pt-10 overflow-y-auto max-w-[1800px] mx-auto w-full transition-all duration-500">
        <Outlet context={{ selectedSubject }} />
      </main>
    </div>
  );
}
