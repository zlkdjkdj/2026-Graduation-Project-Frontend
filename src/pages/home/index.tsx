import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import {
  Sun, Moon, BookOpen, Dumbbell, Sunrise, BarChart3,
  Sparkles, Users, CheckCircle, ArrowRight,
  Brain, Clock, ListTodo, Trophy
} from 'lucide-react';

// ── Header ──────────────────────────────────────────────────────────────────
function Header({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
      style={{
        padding: scrolled ? '10px 36px' : '18px 36px',
        background: scrolled
          ? (isDark ? 'rgba(0,0,0,0.80)' : 'rgba(255,255,255,0.85)')
          : 'transparent',
        backdropFilter: scrolled ? 'blur(28px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 40px rgba(0,0,0,0.2)' : 'none',
      }}>
      {/* Logo – larger, gradient */}
      <span
        className="font-extrabold tracking-tight italic select-none"
        style={{
          fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
          letterSpacing: '-0.03em',
          background: 'linear-gradient(135deg, #a78bfa, #ec4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: isDark ? 'transparent' : undefined,
          color: isDark ? undefined : '#111',
        }}>
        Learn-Time
      </span>

      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="p-2 rounded-xl transition-all hover:bg-white/15"
          style={{ color: isDark ? '#fde68a' : '#4f46e5' }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <Link
          to="/login"
          className="px-5 py-2 rounded-2xl text-sm font-semibold transition-all hover:scale-105"
          style={{
            background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`,
            color: isDark ? '#fff' : '#111',
          }}>
          로그인
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2 rounded-2xl text-sm font-semibold transition-all hover:scale-105 hover:brightness-110"
          style={{
            background: 'linear-gradient(135deg,#6366f1,#ec4899)',
            color: '#fff',
            boxShadow: '0 4px 20px rgba(99,102,241,0.45)',
          }}>
          시작하기
        </Link>
      </div>
    </header>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────
function HeroSection({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.65)';
  const border = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)';
  const text = isDark ? '#fff' : '#111';
  const muted = isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.45)';

  const features = [
    { icon: <Brain size={20} />, title: 'AI 학습 계획', desc: '인공지능이 맞춤형 학습 계획을 설계합니다', color: '#6366f1' },
    { icon: <Clock size={20} />, title: '루틴 관리', desc: '효과적인 습관 형성으로 목표를 달성하세요', color: '#a855f7' },
    { icon: <BarChart3 size={20} />, title: '성과 추적', desc: '실시간으로 학습 진도와 성과를 확인합니다', color: '#10b981' },
  ];

  return (
    <section className="min-h-screen flex items-center relative pt-20 overflow-hidden"
      style={{ background: isDark ? '#000' : '#f0f0f5' }}>

      {/* Ambient glow orbs */}
      <div className="absolute top-24 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-10 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.18), transparent 70%)', filter: 'blur(40px)' }} />
      {/* Subtle grid overlay (dark only) */}
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      )}

      <div className="max-w-screen-xl mx-auto px-6 w-full py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="space-y-8">
            {/* Eyebrow badge */}
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

// ── Auth Buttons ──────────────────────────────────────────────────────────────
function AuthButtons({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)';
  const border = isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.07)';
  const text = isDark ? '#fff' : '#111';
  const muted = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  const divider = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)';

  return (
    <div className="flex flex-col items-center space-y-4 p-10 rounded-[2.5rem]"
      style={{
        background: cardBg,
        backdropFilter: 'blur(40px)',
        border: `1px solid ${border}`,
        boxShadow: isDark ? '0 30px 80px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.1)',
      }}>

      <div className="text-center mb-1">
        <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'linear-gradient(135deg,#6366f1,#ec4899)', boxShadow: '0 8px 28px rgba(99,102,241,0.45)' }}>
          <Sparkles className="text-white" size={22} />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: text }}>시작하기</h2>
        <p className="text-sm mt-1" style={{ color: muted }}>Learn-Time과 함께 성공을 향해 달려보세요</p>
      </div>

      <Link to="/signup"
        className="w-full py-4 px-6 rounded-2xl text-white font-bold text-center transition-all hover:scale-[1.02] hover:brightness-110 flex items-center justify-center gap-2"
        style={{ background: 'linear-gradient(135deg,#6366f1,#ec4899)', boxShadow: '0 8px 28px rgba(99,102,241,0.4)' }}>
        회원가입 <ArrowRight size={17} />
      </Link>

      <Link to="/login"
        className="w-full py-4 px-6 rounded-2xl font-semibold text-center transition-all hover:scale-[1.02]"
        style={{ background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.04)', border: `1.5px solid ${border}`, color: text }}>
        로그인
      </Link>

      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-px" style={{ background: divider }} />
        <span className="text-xs font-medium" style={{ color: muted }}>또는 소셜 계정으로</span>
        <div className="flex-1 h-px" style={{ background: divider }} />
      </div>

      {/* Google */}
      <button
        className="w-full py-3.5 px-6 rounded-2xl font-medium flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:brightness-95"
        style={{ background: '#fff', color: '#374151', boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}>
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span className="text-sm">Google로 계속하기</span>
      </button>

      {/* Naver */}
      <button
        className="w-full py-3.5 px-6 rounded-2xl font-medium flex items-center justify-center gap-3 transition-all hover:scale-[1.02] hover:brightness-110"
        style={{ background: '#03C75A', color: '#fff', boxShadow: '0 4px 16px rgba(3,199,90,0.3)' }}>
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="white">
          <path d="M16.273 12.845L7.376 0H0v24h7.727V11.155L16.624 24H24V0h-7.727z" />
        </svg>
        <span className="text-sm">네이버로 계속하기</span>
      </button>

      <p className="text-xs text-center pt-1" style={{ color: muted }}>
        계정 생성 시{' '}
        <a href="#" style={{ color: '#a78bfa', textDecoration: 'underline' }}>이용약관</a>과{' '}
        <a href="#" style={{ color: '#a78bfa', textDecoration: 'underline' }}>개인정보처리방침</a>에 동의합니다
      </p>
    </div>
  );
}

// ── Quote Section ─────────────────────────────────────────────────────────────
function QuoteSection({ isDark }: { isDark: boolean }) {
  const text = isDark ? '#fff' : '#111';
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
        <p className="font-bold leading-snug" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: text, letterSpacing: '-0.02em' }}>
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
  const text = isDark ? '#fff' : '#111';
  const muted = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';

  const features = [
    {
      icon: <Brain size={26} />, color: '#6366f1', bg: 'rgba(99,102,241,0.12)',
      title: 'AI 스마트 플래너',
      items: ['진도 자동 생성 – 책 제목 입력 시 AI가 일일 학습량 제안', 'AI 추천 시스템 – 성취도 분석 후 보강 구간 제안']
    },
    {
      icon: <Trophy size={26} />, color: '#a855f7', bg: 'rgba(168,85,247,0.12)',
      title: 'Stack Up 시스템',
      items: ['과업 완료 시 XP 부여 및 레벨 승급', '지속적인 활동 + 좋은 참여율이면 성취 배지 제공']
    },
    {
      icon: <ListTodo size={26} />, color: '#10b981', bg: 'rgba(16,185,129,0.12)',
      title: '학습 유틸리티 도구',
      items: ['AI 자동진도 제공', '공부일지, 투두리스트, 메모 기능']
    },
    {
      icon: <BarChart3 size={26} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',
      title: '데이터 시각화',
      items: ['출석부 캘린더, 달성률 대시보드', '사용자 별 랭킹 시스템']
    },
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

        {/* Community */}
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

// ── Service Categories Section ────────────────────────────────────────────────
function ServiceCategoriesSection({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)';
  const border = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)';
  const text = isDark ? '#fff' : '#111';
  const muted = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';

  const categories = [
    {
      icon: <BookOpen size={30} />, color: '#6366f1', bg: 'rgba(99,102,241,0.15)',
      tag: '공부 모드', tagColor: '#818cf8', tagBg: 'rgba(99,102,241,0.12)',
      title: 'Edu Vibe',
      desc: 'AI가 책 목차를 기반으로 일일 공부 범위를 할당하고, 복습 주기를 관리합니다',
      items: ['입력: 과목, 교재명, 시험날짜, 언어 종류', 'AI가 책 목차를 기반으로 일일 공부 범위 할당', '복습 주기 알림 및 학습 시간 통계', '루틴 완료시 포인트 부여'],
    },
    {
      icon: <Dumbbell size={30} />, color: '#a855f7', bg: 'rgba(168,85,247,0.15)',
      tag: '운동 모드', tagColor: '#c084fc', tagBg: 'rgba(168,85,247,0.12)',
      title: 'Fitness Routine',
      desc: '개인 맞춤형 운동 루틴을 설정하고 꾸준한 운동 습관을 만들어갑니다',
      items: ['입력: 운동목표, 보유 기구, 주간 운동 횟수', '루틴 설정 및 여율 체크', '일일 몸무게 입력, 운동 기록', '운동 완료 시 포인트 부여'],
    },
    
  ];

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: isDark ? '#050505' : '#e8e8f0' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.45),transparent)' }} />

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.2)' }}>
            Modes
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: text, letterSpacing: '-0.03em' }}>서비스 카테고리</h2>
          <p className="mt-3 text-base" style={{ color: muted }}>당신의 목표에 맞는 모드를 선택하세요</p>
        </div>

        <div className="space-y-5">
          {categories.map((cat, i) => (
            <div key={i}
              className="group p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start transition-all duration-200 hover:scale-[1.007]"
              style={{ background: cardBg, backdropFilter: 'blur(20px)', border: `1px solid ${border}` }}>

              <div className="flex-shrink-0 flex flex-col items-start gap-3">
                <div className="p-4 rounded-3xl transition-transform duration-200 group-hover:scale-105"
                  style={{ background: cat.bg, color: cat.color }}>
                  {cat.icon}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: cat.tagBg, color: cat.tagColor }}>
                  {cat.tag}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-extrabold mb-2"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: text, letterSpacing: '-0.03em' }}>
                  {cat.title}
                </h3>
                {cat.desc && <p className="text-sm mb-5 leading-relaxed" style={{ color: muted }}>{cat.desc}</p>}
                <ul className="grid sm:grid-cols-2 gap-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: muted }}>
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: cat.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer({ isDark }: { isDark: boolean }) {
  const muted = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)';
  return (
    <footer className="py-12 relative" style={{ background: isDark ? '#000' : '#f0f0f5' }}>
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.3),transparent)' }} />
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col items-center gap-2">
        <span className="font-extrabold text-lg italic" style={{ letterSpacing: '-0.03em', color: muted }}>Learn-Time</span>
        <p className="text-xs" style={{ color: muted }}>© 2025 Learn-Time. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ── Main LandingPage ──────────────────────────────────────────────────────────
export function LandingPage() {
  // 기본값을 false로 변경하여 화이트 모드(라이트 모드)를 기본으로 설정함
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Header isDark={isDark} toggle={() => setIsDark(!isDark)} />
      <HeroSection isDark={isDark} />
      <QuoteSection isDark={isDark} />
      <FeaturesSection isDark={isDark} />
      <ServiceCategoriesSection isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}