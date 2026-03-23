// ── Home 사용 Header ──────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { Link } from 'react-router'; // 사용 중인 라이브러리에 따라 'react-router-dom'일 수 있습니다.
import { Sun, Moon } from 'lucide-react';

export function Header({ isDark, toggle }: { isDark: boolean; toggle: () => void }) {
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