import { ImageWithFallback } from '../../../app/components/figma/ImageWithFallback';

export function ServiceCategoriesSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-3 md:mb-4">서비스 카테고리</h2>
          <p className="text-base md:text-xl text-gray-600">당신의 목표에 맞는 모드를 선택하세요</p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {/* Edu Vibe - 공부 모드 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                공부 모드
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 md:mb-4">Edu Vibe</h3>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                AI가 책 목차를 기반으로 일일 공부 범위를 할당하고, 복습 주기를 관리합니다
              </p>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>입력:</strong> 과목, 교재명, 시험날짜, 언어 종류</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI가 책 목차를 기반으로 일일 공부 범위 할당</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>복습 주기 알림 및 학습 시간 통계</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>루틴 완료시 포인트 부여</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1763890869725-83a0af1d0b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwc3R1ZHlpbmclMjBsYXB0b3AlMjBmb2N1c3xlbnwxfHx8fDE3NzMxMDM4OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="공부 모드"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Fitness Routine - 운동 모드 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1662385929980-e4a32fcbb07c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwdHJhaW5pbmclMjBkdW1iYmVsbHMlMjB3b3Jrb3V0fGVufDF8fHx8MTc3MzEzNjYyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="운동 모드"
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>
            <div>
              <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                운동 모드
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 md:mb-4">Fitness Routine</h3>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                개인 맞춤형 운동 루틴을 설정하고 꾸준한 운동 습관을 만들어갑니다
              </p>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong>입력:</strong> 운동목표, 보유 기구, 주간 운동 횟수</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>루틴 설정 및 여율 체크</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>일일 몸무게 입력, 운동 기록</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>운동 완료 시 포인트 부여</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Miracle Time - 갓생 모드 */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
                갓생 모드
              </div>
              <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 md:mb-4">Miracle Time</h3>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                미라클모닝, 독서, 명상 등 자기개발 습관을 형성하여 더 나은 나를 만듭니다
              </p>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>미라클모닝, 독서, 물 마시기, 명상 등 자기개발 습관 설정</span>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>루틴 수행 여부를 체크하는 체크리스트 중심의 UI</span>
                </li>
              </ul>
            </div>
            <div className="order-1 md:order-2">
              <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-200">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758272422634-e8ed8e252a14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3JuaW5nJTIwcm91dGluZSUyMG1lZGl0YXRpb24lMjBwZWFjZWZ1bHxlbnwxfHx8fDE3NzMxMDM4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="갓생 모드"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}