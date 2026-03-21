import { useState } from 'react';
import {
  Sun, Moon, BookOpen, Dumbbell, Sunrise, BarChart3,
  Sparkles, Users, CheckCircle, ArrowRight,
  Brain, Clock, ListTodo, Trophy
} from 'lucide-react';
import { Header } from '../../../src/components/section/layout/Header';
import { Footer } from '../../../src/components/section/layout/Footer';
import { HeroSection } from '../../components/Home/HeroSection.tsx';
import { ServiceCategory} from '../../components/Home/ServiceCategory.tsx';


// ── Quote Section ─────────────────────────────────────────────────────────────
function QuoteSection({ isDark }: { isDark: boolean }) {
  const text  = isDark ? '#fff' : '#111';
  const muted = isDark ? 'rgba(255,255,255,0.38)' : 'rgba(0,0,0,0.38)';

  return (
    <section className="py-20 relative overflow-hidden"
      style={{ background: isDark ? '#080808' : '#e8e8f0' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.5),transparent)' }} />
      <div className="max-w-2xl mx-auto px-6 text-center">
        <svg className="w-9 h-9 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24"
          style={{ color: isDark ? 'rgba(168,85,247,0.4)' : 'rgba(168,85,247,0.35)' }}>
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <p className="font-bold leading-snug"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: text, letterSpacing: '-0.02em' }}>
          "성공은 매일 반복되는 작은 노력의 합이다"
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: muted }}>— Robert Collier</p>
      </div>
    </section>
  );
}

// ── Features Section ──────────────────────────────────────────────────────────
function FeaturesSection({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)';
  const border = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)';
  const text   = isDark ? '#fff' : '#111';
  const muted  = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';

  const features = [
    { icon: <Brain size={26} />,    color: '#6366f1', bg: 'rgba(99,102,241,0.12)',  title: 'AI 스마트 플래너',   items: ['진도 자동 생성 – 책 제목 입력 시 AI가 일일 학습량 제안', 'AI 추천 시스템 – 성취도 분석 후 보강 구간 제안'] },
    { icon: <Trophy size={26} />,   color: '#a855f7', bg: 'rgba(168,85,247,0.12)',  title: 'Stack Up 시스템',   items: ['과업 완료 시 XP 부여 및 레벨 승급', '지속적인 활동 + 좋은 참여율이면 성취 배지 제공'] },
    { icon: <ListTodo size={26} />, color: '#10b981', bg: 'rgba(16,185,129,0.12)',  title: '학습 유틸리티 도구', items: ['AI 자동진도 제공', '공부일지, 투두리스트, 메모 기능'] },
    { icon: <BarChart3 size={26} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', title: '데이터 시각화',     items: ['출석부 캘린더, 달성률 대시보드', '사용자 별 랭킹 시스템'] },
  ];

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: isDark ? '#000' : '#f0f0f5' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.45),transparent)' }} />

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.2)' }}>
            Features
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: text, letterSpacing: '-0.03em' }}>주요 기능</h2>
          <p className="mt-3 text-base" style={{ color: muted }}>Learn-Time이 제공하는 강력한 학습 도구들</p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {features.map((f, i) => (
            <div key={i}
              className="group p-8 rounded-[2rem] transition-all duration-200 hover:scale-[1.012] cursor-default"
              style={{ background: cardBg, backdropFilter: 'blur(20px)', border: `1px solid ${border}` }}>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: f.bg, color: f.color }}>
                  {f.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-3" style={{ color: text }}>{f.title}</h3>
                  <ul className="space-y-2">
                    {f.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: muted }}>
                        <div className="w-1 h-1 rounded-full mt-[7px] flex-shrink-0" style={{ background: f.color, opacity: 0.7 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-7 rounded-[2rem] flex items-center gap-6 transition-all duration-200 hover:scale-[1.005]"
          style={{ background: isDark ? 'rgba(236,72,153,0.07)' : 'rgba(236,72,153,0.06)', border: `1px solid rgba(236,72,153,${isDark ? '0.18' : '0.12'})` }}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(236,72,153,0.14)', color: '#ec4899' }}>
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-0.5" style={{ color: text }}>커뮤니티</h3>
            <p className="text-sm" style={{ color: muted }}>사용자 커뮤니티 (익명, 친목 X, 본인 업적 인증)</p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ── Main LandingPage ──────────────────────────────────────────────────────────
export function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Header isDark={isDark} toggle={() => setIsDark(!isDark)} />
      <HeroSection isDark={isDark} />
      <QuoteSection isDark={isDark} />
      <FeaturesSection isDark={isDark} />
      <ServiceCategory isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}