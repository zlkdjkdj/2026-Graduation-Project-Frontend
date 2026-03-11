export function FeaturesSection() {
  return (
    <section className="bg-white max-w-screen-xl mx-auto px-6 py-16 md:py-24">
      <div className="text-center mb-12 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-3 md:mb-4">주요 기능</h2>
        <p className="text-base md:text-xl text-gray-600">Learn-Time이 제공하는 강력한 학습 도구들</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        {/* AI 스마트 플래너 */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-3xl p-6 md:p-10 border border-blue-200/50">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">AI 스마트 플래너</h3>
          <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>진도 자동 생성</strong> - 책 제목이나 학습주제 입력시 AI가 분량 파악 후 일일 학습량 제안</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>AI 추천 시스템</strong> - 사용자의 수행 데이터를 분석해 성취도가 낮은 부분이나 어려운 부분 보강 제안</span>
            </li>
          </ul>
        </div>

        {/* Stack Up 시스템 */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-3xl p-6 md:p-10 border border-purple-200/50">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">Stack Up 시스템</h3>
          <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>과업 완료 시 XP 부여 및 레벨 승급</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>지속적인 활동 + 좋은 참여율이면 성취 배지 제공</span>
            </li>
          </ul>
        </div>

        {/* 학습 유틸리티 도구 */}
        <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl p-6 md:p-10 border border-green-200/50">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">학습 유틸리티 도구</h3>
          <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>뽀모도로 타이머</strong> - 집중 효율을 위한 타이머</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>공부 시간 측정</strong> - Start, Stop으로 총 공부시간 측정</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>투두리스트 기능</strong> - 루틴으로 반복 지정 or 일회성 일정 삽입</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
              <span><strong>메모</strong> - 즉각적인 아이디어 작성</span>
            </li>
          </ul>
        </div>

        {/* 데이터 시각화 */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-3xl p-6 md:p-10 border border-orange-200/50">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
            <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">데이터 시각화</h3>
          <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>출석부 (캘린더 기능과 병합)</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>달성률 대시보드</span>
            </li>
            <li className="flex items-start gap-2 md:gap-3">
              <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
              <span>사용자 별 랭킹 시스템</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 기타 기능 */}
      <div className="mt-6 md:mt-8 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-3xl p-6 md:p-10 border border-pink-200/50">
        <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
          <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 md:mb-4">커뮤니티</h3>
        <p className="text-sm md:text-base text-gray-700">사용자 커뮤니티 (익명, 친목 X, 본인 업적 인증)</p>
      </div>
    </section>
  );
}
