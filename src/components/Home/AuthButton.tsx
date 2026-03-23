// 랜딩 페이지 전용 인증(회원가입/로그인) 액션 카드 컴포넌트,  회원가입·로그인 버튼, 소셜 로그인 연동, 이용약관 안내
import { Link } from 'react-router'; 
import { Sparkles, ArrowRight } from 'lucide-react';
import { SocialLogin } from '../section/Button/SocialLogin';

export function AuthButtons({ isDark }: { isDark: boolean }) {

  const primaryGradient = "bg-gradient-to-br from-[#6366f1] to-[#ec4899]";
  const primaryShadow = "shadow-[0_8px_28px_rgba(99,102,241,0.45)]";

  return (
    <div className={`
      flex flex-col items-center space-y-4 p-10 rounded-[2.5rem]
      backdrop-blur-[40px] border transition-all duration-300
      ${isDark 
        ? 'bg-white/5 border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)] text-white' 
        : 'bg-white/75 border-black/5 shadow-[0_20px_60px_rgba(0,0,0,0.1)] text-[#111]'}
    `}>

      {/* 아이콘 + 타이틀 */}
      <div className="text-center mb-1">
        <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 ${primaryGradient} ${primaryShadow}`}>
          <Sparkles className="text-white" size={22} />
        </div>
        <h2 className="text-2xl font-bold">시작하기</h2>
        <p className={`text-sm mt-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
          Learn-Time과 함께 성공을 향해 달려보세요
        </p>
      </div>

      {/* 회원가입 / 로그인 버튼 */}
      <Link to="/signup"
        className={`w-full py-4 px-6 rounded-2xl text-white font-bold text-center transition-all hover:scale-[1.02] hover:brightness-110 flex items-center justify-center gap-2 ${primaryGradient} ${primaryShadow}`}>
        회원가입 <ArrowRight size={17} />
      </Link>

      <Link to="/login"
        className={`
          w-full py-4 px-6 rounded-2xl font-semibold text-center transition-all hover:scale-[1.02] border-[1.5px]
          ${isDark 
            ? 'bg-white/5 border-white/10 hover:bg-white/10' 
            : 'bg-black/5 border-black/5 hover:bg-black/10'}
        `}>
        로그인
      </Link>

      {/* 소셜 로그인 */}
      <SocialLogin isDark={isDark} />

      <p className={`text-xs text-center pt-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}>
        계정 생성 시{' '}
        <a href="#" className="text-violet-400 underline decoration-violet-400/50 hover:text-violet-300">이용약관</a>과{' '}
        <a href="#" className="text-violet-400 underline decoration-violet-400/50 hover:text-violet-300">개인정보처리방침</a>에 동의합니다
      </p>
    </div>
  );
}