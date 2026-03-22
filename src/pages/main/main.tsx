import React, { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { getTheme } from '../../components/Main/Mode'; 
import { Mode } from '../../components/Main/Types'; 
import { Header } from '../../components/Main/Header'; // 분리한 헤더
import { Education } from '../../components/Main/Education';
import { Fitness } from '../../components/Main/Fitness';
import { Community } from '../../components/Main/Community';

export function MainPage() {
  const [mode, setMode] = useState<Mode>('edu');
  const [dark, setDark] = useState(false);
  const [userPoints, setUserPoints] = useState(720);
  const t = useMemo(() => getTheme(dark), [dark]);

  const earnPoints = () => setUserPoints(prev => prev + 10);

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${t.bg}`}>
      <Header mode={mode} setMode={setMode} dark={dark} setDark={setDark} userPoints={userPoints} t={t} />

      <main className="max-w-6xl mx-auto pt-36 pb-28 px-6">
        {/* Page Hero Section */}
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

        {/* Sections */}
        {mode === 'edu' && <Education dark={dark} earnPoints={earnPoints} />}
        {mode === 'fitness' && <Fitness dark={dark} earnPoints={earnPoints} />}
        {mode === 'community' && <Community dark={dark} userPoints={userPoints} />}
      </main>

      <style>{`@keyframes slideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } } .animate-slideUp { animation: slideUp 0.55s ease-out forwards; }`}</style>
    </div>
  );
}