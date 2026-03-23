/**
 * 메인 페이지(MainPage) 컴포넌트
 */
import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { getTheme } from '../../components/Main/Mode'; 
import type { Mode } from '../../components/Main/Types'; 
import { Header } from '../../components/Main/Header'; // 분리된 전용 헤더 컴포넌트
import { Education } from '../../components/Main/Education';
import { Fitness } from '../../components/Main/Fitness';
import { Community } from '../../components/Main/Community';

export function MainPage() {
  // 현재 선택된 모드 (기본: 학습 모드)
  const [mode, setMode] = useState<Mode>('edu');
  // 테마 상태 (기본: 화이트 모드)
  const [dark, setDark] = useState(false); 
  // 사용자의 총 포인트 상태
  const [userPoints, setUserPoints] = useState(720);

  const t = useMemo(() => getTheme(dark), [dark]);

  // --- 포인트 적립 로직 ---
  const earnPoints = () => setUserPoints(prev => prev + 10);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${t.bg}`}>
      
      {/* 1. 상단 NAV 모드 전환 */}
      <Header mode={mode} setMode={setMode} dark={dark} setDark={setDark} userPoints={userPoints} t={t} />

      <main className="max-w-6xl mx-auto pt-36 pb-28 px-6">
        
        {/* 2. 페이지 히어로 섹션 */}
        <div className="flex items-center gap-6 mb-14">
          <div className={`p-6 rounded-[2rem] border shadow-2xl ${t.card}`}>
            <Sparkles className="text-yellow-400" size={36} />
          </div>
          <div>
            <h2 className={`text-5xl font-black italic uppercase leading-none ${dark ? 'text-white' : 'text-slate-900'}`}>
              {mode === 'edu' ? 'EduVibe' : mode === 'fitness' ? 'Exercise' : 'Community'}
            </h2>
          </div>
        </div>

        {/* 3. 섹션 조건부 렌더링: 선택된 모드에 따라 해당 컴포넌트 노출 */}
        {mode === 'edu' && <Education dark={dark} earnPoints={earnPoints} />}
        {mode === 'fitness' && <Fitness dark={dark} earnPoints={earnPoints} />}
        {mode === 'community' && <Community dark={dark} userPoints={userPoints} />}
      </main>

      <style>{`
        @keyframes slideUp { 
          from { opacity: 0; transform: translateY(18px); } 
          to { opacity: 1; transform: translateY(0); } 
        } 
        .animate-slideUp { animation: slideUp 0.55s ease-out forwards; }
      `}</style>
    </div>
  );
}