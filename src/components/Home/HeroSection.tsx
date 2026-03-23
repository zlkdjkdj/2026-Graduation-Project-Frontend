//메인 타이틀, AI 핵심 기능 요약, 인증(Auth) 카드
import { Sparkles, Brain, Clock, BarChart3 } from 'lucide-react';
import { AuthButtons } from './AuthButton';

// 1. 데이터 상수
const HERO_FEATURES = [
  { icon: Brain, title: 'AI 학습 계획', desc: '인공지능이 맞춤형 학습 계획을 설계합니다', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { icon: Clock, title: '루틴 관리', desc: '효과적인 습관 형성으로 목표를 달성하세요', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: BarChart3, title: '성과 추적', desc: '실시간으로 학습 진도와 성과를 확인합니다', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

export function HeroSection({ isDark }: { isDark: boolean }) {
  // 공통 조건부 스타일 
  const themeText = isDark ? 'text-white' : 'text-[#111]';
  const themeMuted = isDark ? 'text-white/50' : 'text-black/45';

  return (
    <section className={`min-h-screen flex items-center relative pt-20 overflow-hidden transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-[#f0f0f5]'}`}>
      
      {/* 2. 배경 장식 요소 */}
      <div className="absolute top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none blur-[40px] bg-indigo-500/15 opacity-50" />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none blur-[40px] bg-pink-500/15 opacity-50" />
      
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] bg-[size:64px_64px]" />
      )}

      <div className="max-w-screen-xl mx-auto px-6 w-full py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-500/15 text-violet-400 border border-indigo-500/25">
              <Sparkles size={12} /> AI 기반 루틴 & 학습 관리
            </span>

            <div>
              <h1 className={`font-extrabold tracking-tighter leading-tight text-[clamp(3rem,6vw,4.5rem)] ${themeText}`}>
                Learn-Time
              </h1>
              <p className="font-bold mt-2 text-[clamp(1.25rem,2.5vw,1.875rem)] tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Run Toward Success
              </p>
              <p className={`text-base mt-4 leading-relaxed ${themeMuted}`}>
                인공지능을 활용한 공부 및 루틴 성공 지도 웹사이트
              </p>
            </div>

            {/* Feature 리스트 */}
            <div className="space-y-3">
              {HERO_FEATURES.map((f, i) => (
                <div key={i} className={`
                  flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 hover:scale-[1.015] border backdrop-blur-xl
                  ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/65 border-black/5 shadow-sm'}
                `}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${f.bg} ${f.color}`}>
                    <f.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold text-sm ${themeText}`}>{f.title}</p>
                    <p className={`text-xs mt-0.5 ${themeMuted}`}>{f.desc}</p>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-50 ${f.color.replace('text', 'bg')}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Auth Card */}
          <div className="flex justify-center md:justify-end">
            <AuthButtons isDark={isDark} />
          </div>
          
        </div>
      </div>
    </section>
  );
}