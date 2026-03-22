// 메인 모드 전용 헤더 (네비게이션 및 테마 시스템)
import { Sparkles, BookOpen, Dumbbell, Users, Sun, Moon } from 'lucide-react';
import { Mode } from './Types';

/**
 * @param mode - 현재 선택된 서비스 모드 ('edu' | 'fitness' | 'community')
 * @param setMode - 모드 전환을 위한 상태 변경 함수
 * @param dark - 다크모드 활성화 여부
 * @param setDark - 테마 전환을 위한 상태 변경 함수
 * @param userPoints - 현재 사용자의 총 포인트
 * @param t - Mode.tsx에서 생성된 현재 테마 스타일 객체
 */
export function Header({ mode, setMode, dark, setDark, userPoints, t }: any) {
  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b ${t.nav}`}>
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* 1. 서비스 로고 영역: Learn-Time AI 브랜드 표시 */}
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg">
            <Sparkles className="text-white" size={22} />
          </div>
          <h1 className="text-xl font-black italic uppercase tracking-tighter opacity-90">
            Learn-Time AI
          </h1>
        </div>
        
        {/* 2. 중앙 네비게이션 메뉴: 학습, 운동, 커뮤니티 탭 스위처 (데스크톱 전용) */}
        <nav className={`hidden md:flex p-1.5 rounded-2xl border ${dark ? 'bg-black/40 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          {(['edu', 'fitness', 'community'] as Mode[]).map(m => (
            <button 
              key={m} 
              onClick={() => setMode(m)} 
              className={`flex items-center gap-2.5 px-7 py-2.5 rounded-xl text-[13px] font-bold uppercase transition-all 
                ${mode === m ? t.tabActive : 'text-slate-400 hover:text-indigo-400'}`}
            >
              {/* 각 모드에 맞는 아이콘 조건부 렌더링 */}
              {m === 'edu' ? <BookOpen size={15} /> : m === 'fitness' ? <Dumbbell size={15} /> : <Users size={15} />} 
              {m}
            </button>
          ))}
        </nav>

        {/* 3. 유틸리티 영역: 사용자 포인트 확인 및 다크/화이트 모드 토글 */}
        <div className="flex items-center gap-3">
          {/* 실시간 포인트 표시 */}
          <span className={`text-xs font-black ${t.accent}`}>{userPoints} PT</span>
          
          {/* 테마 전환 버튼 (다크 <-> 라이트) */}
          <button 
            onClick={() => setDark(!dark)} 
            className={`p-2.5 rounded-xl border transition-all ${dark ? 'text-yellow-400 border-slate-700 hover:bg-slate-800' : 'text-indigo-600 border-slate-200 hover:bg-slate-100'}`}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}