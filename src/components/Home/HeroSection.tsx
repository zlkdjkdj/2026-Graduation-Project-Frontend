// ── home 전용 Hero Section ──────────────────────────────────────────────────────────────
import { AuthButtons } from './AuthButton';
import {
  Sun, Moon, BookOpen, Dumbbell, Sunrise, BarChart3,
  Sparkles, Users, CheckCircle, ArrowRight,
  Brain, Clock, ListTodo, Trophy
} from 'lucide-react';

export function HeroSection({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.65)';
  const border = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)';
  const text   = isDark ? '#fff' : '#111';
  const muted  = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';

  const features = [
    { icon: <Brain size={20} />,    title: 'AI 학습 계획', desc: '인공지능이 맞춤형 학습 계획을 설계합니다',    color: '#6366f1' },
    { icon: <Clock size={20} />,    title: '루틴 관리',    desc: '효과적인 습관 형성으로 목표를 달성하세요',    color: '#a855f7' },
    { icon: <BarChart3 size={20} />, title: '성과 추적',   desc: '실시간으로 학습 진도와 성과를 확인합니다',   color: '#10b981' },
  ];

  return (
    <section className="min-h-screen flex items-center relative pt-20 overflow-hidden"
      style={{ background: isDark ? '#000' : '#f0f0f5' }}>

      <div className="absolute top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)', filter: 'blur(40px)' }} />
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      )}

      <div className="max-w-screen-xl mx-auto px-6 w-full py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="space-y-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
              style={{ background: 'rgba(99,102,241,0.15)', color: '#a78bfa', border: '1px solid rgba(99,102,241,0.25)' }}>
              <Sparkles size={12} /> AI 기반 루틴 &amp; 학습 관리
            </span>

            <div>
              <h1 className="font-extrabold tracking-tight leading-tight"
                style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', color: text, letterSpacing: '-0.04em' }}>
                Learn-Time
              </h1>
              <p className="font-bold mt-2"
                style={{
                  fontSize: 'clamp(1.25rem, 2.5vw, 1.875rem)',
                  background: 'linear-gradient(90deg,#818cf8,#c084fc,#f472b6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.02em',
                }}>
                Run Toward Success
              </p>
              <p className="text-base mt-4 leading-relaxed" style={{ color: muted }}>
                인공지능을 활용한 공부 및 루틴 성공 지도 웹사이트
              </p>
            </div>

            <div className="space-y-3">
              {features.map((f, i) => (
                <div key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:scale-[1.015] cursor-default"
                  style={{ background: cardBg, backdropFilter: 'blur(20px)', border: `1px solid ${border}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: f.color + '1a', color: f.color }}>
                    {f.icon}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm" style={{ color: text }}>{f.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: muted }}>{f.desc}</p>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: f.color, opacity: 0.5 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right – Auth Card */}
          <AuthButtons isDark={isDark} />
        </div>
      </div>
    </section>
  );
}