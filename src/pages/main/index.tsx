import { useState } from 'react';
import { Header } from '../../components/section/landing/Header';
import { StudyTimer } from '../../components/section/main/StudyTimer';
import { PomodoroTimer } from '../../components/section/main/PomodoroTimer';
import { StudyMaterialUpload } from '../../components/section/main/StudyMaterialUpload';
import { AiSuggestions } from '../../components/section/main/AiSuggestions';
import { FitnessWorkout } from '../../components/section/main/FitnessWorkout';
import { FitnessVideos } from '../../components/section/main/FitnessVideos';

type Mode = 'edu' | 'fitness' | 'miracle';

export function MainPage() {
  const [currentMode, setCurrentMode] = useState<Mode>('edu');

  const modes = [
    { id: 'edu' as Mode, name: 'Edu Vibe', description: '공부 모드', color: 'blue' },
    { id: 'fitness' as Mode, name: 'Fitness Routine', description: '운동 모드', color: 'purple' },
    { id: 'miracle' as Mode, name: 'Miracle Time', description: '갓생 모드', color: 'green' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />

      <main className="pt-11">
        {/* 모드 선택 탭 */}
        <div className="bg-white border-b border-gray-200 sticky top-11 z-40">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex gap-1 py-4">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`
                    flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200
                    ${currentMode === mode.id
                      ? `bg-${mode.color}-600 text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={
                    currentMode === mode.id
                      ? {
                          backgroundColor:
                            mode.color === 'blue'
                              ? '#2563eb'
                              : mode.color === 'purple'
                              ? '#9333ea'
                              : '#16a34a',
                        }
                      : undefined
                  }
                >
                  <div className="text-base md:text-lg font-semibold">{mode.name}</div>
                  <div className={`text-xs md:text-sm mt-1 ${currentMode === mode.id ? 'text-white/90' : 'text-gray-500'}`}>
                    {mode.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 모드별 컨텐츠 */}
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          {currentMode === 'edu' && <EduVibeContent />}
          {currentMode === 'fitness' && <FitnessRoutineContent />}
          {currentMode === 'miracle' && <MiracleTimeContent />}
        </div>
      </main>
    </div>
  );
}

// Edu Vibe 모드 컨텐츠
function EduVibeContent() {
  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Edu Vibe</h2>
            <p className="text-gray-600">AI 기반 학습 계획 및 진도 관리</p>
          </div>
        </div>
      </div>

      {/* 공부 주제 설정 */}
      <StudyMaterialUpload />

      {/* 타이머 섹션 */}
      <div className="grid md:grid-cols-2 gap-6">
        <StudyTimer />
        <PomodoroTimer />
      </div>

      {/* AI 제안 섹션 */}
      <AiSuggestions />
    </div>
  );
}

// Fitness Routine 모드 컨텐츠
function FitnessRoutineContent() {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      {/* 페이지 헤더 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Fitness Routine</h2>
            <p className="text-gray-600">개인 맞춤형 운동 루틴 관리</p>
          </div>
        </div>
      </div>

      {/* 운동 체크 및 시간 입력 */}
      <FitnessWorkout onSelectedPartsChange={setSelectedParts} />

      {/* 유튜브 영상 */}
      <FitnessVideos selectedParts={selectedParts} />
    </div>
  );
}

// Miracle Time 모드 컨텐츠
function MiracleTimeContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Miracle Time</h2>
            <p className="text-gray-600">미라클모닝 및 자기개발 습관 관리</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">오늘의 루틴</h3>
            <p className="text-3xl font-bold text-green-600">0 / 0</p>
            <p className="text-sm text-gray-600 mt-2">완료된 습관</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">연속 일수</h3>
            <p className="text-3xl font-bold text-green-600">0일</p>
            <p className="text-sm text-gray-600 mt-2">최장 기록</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">달성률</h3>
            <p className="text-3xl font-bold text-green-600">0%</p>
            <p className="text-sm text-gray-600 mt-2">이번 주</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-500 mb-4">아직 미라클 루틴이 없습니다</p>
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition">
            새 미라클 루틴 만들기
          </button>
        </div>
      </div>
    </div>
  );
}