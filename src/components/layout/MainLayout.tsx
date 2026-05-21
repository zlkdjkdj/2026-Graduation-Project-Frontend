// ============================================================
// components/layout/MainLayout.tsx
// 앱 전체의 공통 레이아웃 컴포넌트 (상단 헤더 디자인)
//
// 주요 기능:
//   - 상단 헤더바: 로고, 네비게이션, 다크/라이트 모드 토글
//   - 데스크탑에서는 가로형 네비게이션, 모바일에서는 햄버거 메뉴
//   - isDarkMode 상태로 <html> 태그에 .dark 클래스를 토글하여 테마 전환
//   - <Outlet />을 통해 현재 경로의 페이지 컴포넌트를 렌더링
// ============================================================
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  BookIcon, DumbbellIcon, UsersIcon, SettingsIcon, SunIcon, MoonIcon, CalendarIcon,
  ChevronDownIcon, MenuIcon, XIcon
} from '../ui/Icons';

export function MainLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
   * 상단 네비게이션 항목 컴포넌트 (인라인 정의)
   */
  const NavItem = ({ to, icon, label, active, onClickOverride, hasToggle, isExpanded }: { to: string; icon: React.ReactNode; label: string; active: boolean; onClickOverride?: () => void; hasToggle?: boolean; isExpanded?: boolean }) => (
    <div
      onClick={() => onClickOverride ? onClickOverride() : navigate(to)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 group ${
        active
          ? 'bg-black dark:bg-white text-white dark:text-black shadow-md'
          : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a]'
      }`}
    >
      <div className={`transition-transform duration-300 group-hover:scale-110 ${active ? 'text-inherit' : 'text-gray-400 group-hover:text-inherit'}`}>
        {icon}
      </div>
      <span className="text-[0.95rem] font-bold tracking-tight whitespace-nowrap">{label}</span>
      {hasToggle && (
        <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''} ${active ? 'text-inherit' : 'text-gray-400'}`}>
          <ChevronDownIcon size={16} />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#000000] text-gray-900 dark:text-[#ededed] flex flex-col transition-colors duration-500 font-sans selection:bg-indigo-500/30">
      
      {/* ── 상단 헤더바 (Sticky) ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-gray-200 dark:border-[#1a1a1a] transition-colors duration-500">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          
          {/* 로고 영역 */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/main/study')}>
            <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black font-black text-sm shadow-xl flex-shrink-0">LT</div>
            <h1 className="text-xl font-black tracking-tighter uppercase hidden sm:block animate-in fade-in duration-500">Learn-Time</h1>
          </div>

          {/* 데스크탑 네비게이션 (lg 이상) */}
          <nav className="hidden lg:flex items-center gap-2">
            <NavItem to="/main/schedule" icon={<CalendarIcon size={18} />} label="일정 생성" active={currentPath.includes('schedule')} />
            
            <div className="relative">
              <NavItem 
                to="/main/study" 
                icon={<BookIcon size={18} />} 
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
              {/* 학습 스튜디오 과목 드롭다운 */}
              {isStudyExpanded && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {[
                    { id: 'math', name: '수학' },
                    { id: 'english', name: '영어' },
                    { id: 'science', name: '과학' },
                    { id: 'history', name: '역사' },
                  ].map(sub => (
                    <div 
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubject(sub.id);
                        setIsStudyExpanded(false);
                      }}
                      className={`text-sm py-3 px-4 cursor-pointer font-medium transition-all ${
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

            <NavItem to="/main/exercise" icon={<DumbbellIcon size={18} />} label="운동 랩" active={currentPath.includes('exercise')} />
            <NavItem to="/main/community" icon={<UsersIcon size={18} />} label="커뮤니티" active={currentPath.includes('community')} />
            <NavItem to="/main/settings" icon={<SettingsIcon size={18} />} label="설정" active={currentPath.includes('settings')} />
          </nav>

          {/* 우측 컨트롤 영역 */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 hover:text-black dark:hover:text-white transition-all duration-300"
              title={isDarkMode ? '라이트 모드' : '다크 모드'}
            >
              {isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
            
            {/* 모바일 햄버거 메뉴 토글 버튼 */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 hover:text-black dark:hover:text-white transition-all duration-300"
            >
              {isMobileMenuOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>

        {/* 모바일 네비게이션 드롭다운 (lg 미만) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-[#1a1a1a] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md px-6 py-4 flex flex-col gap-2 animate-in slide-in-from-top-2 duration-300">
            <NavItem to="/main/schedule" icon={<CalendarIcon size={18} />} label="일정 생성" active={currentPath.includes('schedule')} />
            
            <NavItem 
              to="/main/study" 
              icon={<BookIcon size={18} />} 
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
            {/* 모바일 학습 스튜디오 과목 목록 */}
            {isStudyExpanded && (
              <div className="pl-10 pr-4 py-2 space-y-1">
                {[
                  { id: 'math', name: '수학' },
                  { id: 'english', name: '영어' },
                  { id: 'science', name: '과학' },
                  { id: 'history', name: '역사' },
                ].map(sub => (
                  <div 
                    key={sub.id}
                    onClick={() => {
                      setSelectedSubject(sub.id);
                      setIsMobileMenuOpen(false);
                    }}
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

            <NavItem to="/main/exercise" icon={<DumbbellIcon size={18} />} label="운동 랩" active={currentPath.includes('exercise')} />
            <NavItem to="/main/community" icon={<UsersIcon size={18} />} label="커뮤니티" active={currentPath.includes('community')} />
            <NavItem to="/main/settings" icon={<SettingsIcon size={18} />} label="설정" active={currentPath.includes('settings')} />
          </div>
        )}
      </header>

      {/* ── 메인 콘텐츠 영역 ── */}
      <main className="flex-grow p-6 lg:p-10 overflow-y-auto max-w-[1800px] mx-auto w-full transition-all duration-500">
        <Outlet context={{ selectedSubject }} />
      </main>
    </div>
  );
}
