import { Link } from 'react-router';

export function AuthButtons() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 px-4 md:px-8">
      {/* 환영 메시지 */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          시작하기
        </h2>
        <p className="text-lg text-gray-300">
          Learn-Time과 함께 성공을 향해 달려보세요
        </p>
      </div>

      {/* 버튼 컨테이너 */}
      <div className="w-full max-w-sm space-y-4">
        {/* 회원가입 버튼 */}
        <Link 
          to="/register"
          className="block w-full py-5 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 text-center text-lg"
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            <span>회원가입</span>
          </div>
        </Link>

        {/* 로그인 버튼 */}
        <Link 
          to="/login"
          className="block w-full py-5 px-6 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white font-semibold rounded-2xl shadow-xl hover:bg-white/20 hover:border-white/30 transform hover:scale-105 transition-all duration-200 text-center text-lg"
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span>로그인</span>
          </div>
        </Link>
      </div>

      {/* 구분선 */}
      <div className="w-full max-w-sm flex items-center gap-4 my-8">
        <div className="flex-1 h-px bg-white/20"></div>
        <span className="text-sm text-gray-400">또는</span>
        <div className="flex-1 h-px bg-white/20"></div>
      </div>

      {/* 소셜 로그인 */}
      <div className="w-full max-w-sm space-y-3">
        <button className="w-full py-4 px-6 bg-white text-gray-700 font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Google로 계속하기</span>
        </button>

        <button className="w-full py-4 px-6 bg-gray-800 text-white font-medium rounded-xl shadow-lg hover:bg-gray-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>GitHub로 계속하기</span>
        </button>
      </div>

      {/* 추가 정보 */}
      <p className="text-sm text-gray-400 text-center max-w-sm mt-6">
        계정을 생성하면{' '}
        <a href="#" className="text-purple-400 hover:text-purple-300 underline">이용약관</a>과{' '}
        <a href="#" className="text-purple-400 hover:text-purple-300 underline">개인정보 처리방침</a>에 동의하게 됩니다.
      </p>
    </div>
  );
}
