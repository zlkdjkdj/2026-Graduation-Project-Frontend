export function HeroSection() {
  return (
    <div className="space-y-6 md:space-y-8 text-center md:text-left">
      <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white drop-shadow-lg leading-tight">
        Learn-Time
      </h1>
      <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg leading-tight">
        Run Toward Success with Learn-Time
      </p>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mt-6 md:mt-8 leading-relaxed px-2 md:px-0">
        인공지능을 활용한 공부 및 루틴 성공 지도 웹사이트
      </p>
      
      {/* 특징 - 모바일에서 숨김 */}
      <div className="hidden md:flex md:flex-col space-y-6 pt-12">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">AI 학습 계획</h3>
            <p className="text-base text-gray-300 leading-relaxed">인공지능이 맞춤형 학습 계획을 설계합니다</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">루틴 관리</h3>
            <p className="text-base text-gray-300 leading-relaxed">효과적인 습관 형성으로 목표를 달성하세요</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">성과 추적</h3>
            <p className="text-base text-gray-300 leading-relaxed">실시간으로 학습 진도와 성과를 확인합니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}
