import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { NavButton } from '../common/NavButton';
import { 
  BookIcon, DumbbellIcon, UsersIcon, SettingsIcon, SunIcon, MoonIcon 
} from '../ui/Icons';

export function MainLayout() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#121212] text-gray-800 dark:text-gray-200 font-sans selection:bg-blue-500/30 transition-colors duration-300">
      <nav className="bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-[#2A2A2A] px-4 md:px-6 py-4 flex flex-wrap items-center justify-between sticky top-0 z-50 gap-4 shrink-0 transition-colors">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/study')}>
          <div className="w-8 h-8 bg-blue-600 dark:bg-gray-800 rounded flex items-center justify-center font-bold text-white text-sm shadow-sm">LT</div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-wide">Learn-Time</h1>
        </div>
        
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar order-3 sm:order-none w-full sm:w-auto">
          <NavButton active={currentPath.includes('study')} onClick={() => navigate('/study')} icon={<BookIcon />} label="공부 모드" />
          <NavButton active={currentPath.includes('exercise')} onClick={() => navigate('/exercise')} icon={<DumbbellIcon />} label="운동 모드" />
          <NavButton active={currentPath.includes('community')} onClick={() => navigate('/community')} icon={<UsersIcon />} label="커뮤니티" />
          <NavButton active={currentPath.includes('settings')} onClick={() => navigate('/settings')} icon={<SettingsIcon />} label="설정" />
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full bg-gray-100 dark:bg-[#1e1e1e] border border-gray-200 dark:border-[#2a2a2a] text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-all shadow-sm"
          >
            {isDarkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </nav>

      <main className="max-w-[1600px] w-full mx-auto p-4 md:p-6 flex-grow flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
