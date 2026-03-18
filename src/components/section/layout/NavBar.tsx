import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Mode } from '../../../pages/main/types';
import { Sun, Moon, Sparkles, BookOpen, Dumbbell, Users } from 'lucide-react';

// 분리한 개별 컨텐츠 임포트
import { EduVibeContent } from '../Edu/EduVibeContent';
import { FitnessRoutineContent } from '../Fitness/FitnessRoutineContent';
import { CommunityContent } from '../CommunityContent';

export function MainPage() {
  const [currentMode, setCurrentMode] = useState<Mode>('edu');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [bgUrl, setBgUrl] = useState('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b');

  const modes = [
    { id: 'edu' as Mode, name: 'Edu Vibe', description: '공부 모드', icon: <BookOpen size={20} />, color: 'blue' },
    { id: 'fitness' as Mode, name: 'Fitness Routine', description: '운동 모드', icon: <Dumbbell size={20} />, color: 'purple' },
    { id: 'community' as Mode, name: 'Community', description: '자랑하기', icon: <Users size={20} />, color: 'emerald' },
  ];

  // 배경 이미지 동적 변경 (모드에 따라 감성적인 배경 전환)
  useEffect(() => {
    const bgMap: Record<string, string> = {
      edu: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
      fitness: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      community: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18',
    };
    setBgUrl(bgMap[currentMode] || bgMap.edu);
  }, [currentMode]);

  const themeClass = isDarkMode 
    ? { bg: "bg-black text-white", nav: "bg-white/10 border-white/20", active: "bg-white/20 border-white/40 shadow-xl" } 
    : { bg: "bg-[#f5f5f7] text-gray-900", nav: "bg-white/70 border-gray-200", active: "bg-white border-gray-300 shadow-lg" };

  return (
    <div className={`min-h-screen w-full relative transition-colors duration-700 ${themeClass.bg}`}>
      {/* 초고화질 동적 배경 */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center transition-all duration-1000 scale-105"
        style={{ backgroundImage: `url('${bgUrl}')` }}
      >
        <div className={`absolute inset-0 backdrop-blur-[3px] ${isDarkMode ? 'bg-black/40' : 'bg-white/20'}`}></div>
      </div>

      <div className="relative z-10">
        <Header />
        
        <main className="pt-20">
          {/* APPLE STYLE GLASS NAVIGATION */}
          <div className="sticky top-20 z-40 px-6">
            <div className={`max-w-4xl mx-auto p-2 rounded-[2rem] border backdrop-blur-3xl transition-all duration-500 ${themeClass.nav}`}>
              <div className="flex w-full gap-2 relative">
                {/* 테마 토글 버튼 */}
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="absolute -left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all"
                >
                  {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-600" />}
                </button>

                {modes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setCurrentMode(mode.id)}
                    className={`
                      flex-1 flex flex-col items-center py-4 px-4 rounded-[1.5rem] transition-all duration-500 border
                      ${currentMode === mode.id 
                        ? themeClass.active 
                        : 'border-transparent opacity-50 hover:opacity-80'
                      }
                    `}
                  >
                    <div className={`mb-1.5 transition-transform duration-500 ${currentMode === mode.id ? 'scale-110' : ''}`}>
                      {mode.icon}
                    </div>
                    <div className="text-sm font-bold tracking-tight">{mode.name}</div>
                    <div className={`text-[10px] mt-0.5 font-medium opacity-60 ${currentMode === mode.id ? 'block' : 'hidden md:block'}`}>
                      {mode.description}
                    </div>
                    {currentMode === mode.id && (
                      <div className={`absolute bottom-[-10px] w-1 h-1 rounded-full bg-white shadow-[0_0_10px_white]`}></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 모드별 컨텐츠 영역 */}
          <div className="max-w-screen-xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className={`p-8 md:p-12 rounded-[3.5rem] border backdrop-blur-3xl shadow-2xl ${themeClass.nav}`}>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-white/10 rounded-2xl border border-white/20 shadow-inner">
                  <Sparkles size={24} className="text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tighter uppercase italic opacity-90">
                    {modes.find(m => m.id === currentMode)?.name}
                  </h2>
                  <p className="text-sm font-bold opacity-40 uppercase tracking-widest">Selected Mode Analysis</p>
                </div>
              </div>

              <div className="min-h-[500px]">
                {currentMode === 'edu' && <EduVibeContent />}
                {currentMode === 'fitness' && <FitnessRoutineContent />}
                {currentMode === 'community' && <CommunityContent />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}