import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../../../app/components/ui/button';
import { Input } from '../../../app/components/ui/input';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // 로그인 성공 후 메인 페이지로 이동
    navigate('/main');
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl border border-gray-200 p-8 sm:p-10 md:p-8 shadow-2xl">
        <h2 className="text-2xl sm:text-3xl md:text-2xl font-semibold text-gray-900 mb-2 text-center">로그인</h2>
        <p className="text-center text-gray-600 mb-8 sm:mb-10 md:mb-8 text-sm sm:text-base md:text-sm">당신의 성공을 함께 만들어갑니다</p>

        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5 md:space-y-3">
          <div>
            <Input
              id="email"
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 sm:h-14 md:h-11 bg-gray-50 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 text-base sm:text-lg md:text-sm placeholder:text-gray-500"
              required
            />
          </div>

          <div>
            <Input
              id="password"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 sm:h-14 md:h-11 bg-gray-50 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-gray-900 text-base sm:text-lg md:text-sm placeholder:text-gray-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm sm:text-base md:text-xs pt-2 sm:pt-3 md:pt-1">
            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-400 bg-gray-50 w-4 h-4 sm:w-5 sm:h-5 md:w-3.5 md:h-3.5" />
              <span>로그인 상태 유지</span>
            </label>
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              비밀번호 찾기
            </a>
          </div>

          <Button
            type="submit"
            className="w-full h-12 sm:h-14 md:h-11 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base sm:text-lg md:text-sm font-medium mt-6 sm:mt-8 md:mt-5 shadow-lg transition"
          >
            로그인
          </Button>

          <div className="text-center text-sm sm:text-base md:text-xs text-gray-700 pt-4 sm:pt-5 md:pt-3">
            계정이 없으신가요?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
              계정 만들기
            </a>
          </div>
        </form>

        <p className="text-center text-xs sm:text-sm md:text-xs text-gray-500 mt-6 sm:mt-8 md:mt-5 leading-relaxed">
          로그인함으로써 이용약관 및 개인정보처리방침에 동의합니다
        </p>
      </div>
    </div>
  );
}