// ── Auth Buttons (home 랜딩 전용 카드 래퍼) ────────────────────────────────────────
import { SocialLogin } from '../section/Button/SocialLogin';
import { Link } from 'react-router';import {
  Sun, Moon, BookOpen, Dumbbell, Sunrise, BarChart3,
  Sparkles, Users, CheckCircle, ArrowRight,
  Brain, Clock, ListTodo, Trophy
} from 'lucide-react';

export function AuthButtons({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.75)';
  const border = isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.07)';
  const text   = isDark ? '#fff' : '#111';
  const muted  = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';

  return (
    <div className="flex flex-col items-center space-y-4 p-10 rounded-[2.5rem]"
      style={{
        background: cardBg,
        backdropFilter: 'blur(40px)',
        border: `1px solid ${border}`,
        boxShadow: isDark ? '0 30px 80px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.1)',
      }}>

      {/* 아이콘 + 타이틀 */}
      <div className="text-center mb-1">
        <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'linear-gradient(135deg,#6366f1,#ec4899)', boxShadow: '0 8px 28px rgba(99,102,241,0.45)' }}>
          <Sparkles className="text-white" size={22} />
        </div>
        <h2 className="text-2xl font-bold" style={{ color: text }}>시작하기</h2>
        <p className="text-sm mt-1" style={{ color: muted }}>Learn-Time과 함께 성공을 향해 달려보세요</p>
      </div>

      {/* 회원가입 / 로그인 버튼 */}
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

      {/* ↓ 소셜 로그인 – SocialLoginButtons 공용 컴포넌트 사용 */}
      <SocialLogin isDark={isDark} />

      <p className="text-xs text-center pt-1" style={{ color: muted }}>
        계정 생성 시{' '}
        <a href="#" style={{ color: '#a78bfa', textDecoration: 'underline' }}>이용약관</a>과{' '}
        <a href="#" style={{ color: '#a78bfa', textDecoration: 'underline' }}>개인정보처리방침</a>에 동의합니다
      </p>
    </div>
  );
}
