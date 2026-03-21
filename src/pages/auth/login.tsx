import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { login } from '../../utils/api';
import { SocialLogin } from '../../components/section/Button/SocialLogin.tsx';

export function LoginPage() {
  const navigate = useNavigate();

  const [username,     setUsername]     = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError,   setLoginError]   = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setLoginError('닉네임과 비밀번호를 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    setLoginError('');

    try {
      const token = await login(username, password);
      if (token) {
        navigate('/main');
      } else {
        setLoginError('닉네임 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch {
      setLoginError('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">

        {/* ── 헤더 ── */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Learn-Time
            </h1>
          </Link>
          <p className="mt-2 text-sm text-gray-600">Run Toward Success with Learn-Time</p>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">로그인</h2>
          <p className="mt-2 text-sm text-gray-600">
            계정이 없으신가요?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 transition">
              회원가입하기
            </Link>
          </p>
        </div>

        {/* ── 폼 카드 ── */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit}>

            {/* 닉네임 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                닉네임
              </label>
              <input
                id="username" name="username" type="text" autoComplete="username" required
                value={username} onChange={e => setUsername(e.target.value)}
                placeholder="닉네임을 입력하세요"
                className="appearance-none block w-full px-4 py-3 border-2 border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
              />
            </div>

            {/* 비밀번호 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <div className="relative">
                <input
                  id="password" name="password" autoComplete="current-password" required
                  type={showPassword ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="appearance-none block w-full px-4 py-3 pr-12 border-2 border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  {showPassword ? (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* 로그인 상태 유지 / 비밀번호 찾기 */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  id="remember-me" name="remember-me" type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">로그인 상태 유지</span>
              </label>
              <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition">
                비밀번호 찾기
              </a>
            </div>

            {/* 에러 메시지 */}
            {loginError && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-4 flex items-center gap-2">
                <svg className="h-5 w-5 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-red-600">{loginError}</p>
              </div>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all
                ${isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'}`}>
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  로그인 중...
                </>
              ) : '로그인'}
            </button>
          </form>

          {/* ↓ 소셜 로그인 – SocialLoginButtons 공용 컴포넌트 사용 */}
          <div className="mt-6">
            <SocialLogin isDark={false} />
          </div>
        </div>

      </div>
    </div>
  );
}