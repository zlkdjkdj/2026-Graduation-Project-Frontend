import { useState } from 'react';
import { Header } from '../../components/section/landing/Header';
import { Mode } from './types';

// 분리한 개별 컨텐츠 임포트
import { EduVibeContent } from './components/Edu/EduVibeContent';
import { FitnessRoutineContent } from './components/Fitness/FitnessRoutineContent';
import { MiracleTimeContent } from './components/MiracleTimeContent';
import { CommunityContent } from './components/CommunityContent';

export function MainPage() {
  const [currentMode, setCurrentMode] = useState<Mode>('miracle');

  const modes = [
    { id: 'edu' as Mode, name: 'Edu Vibe', description: '공부 모드', color: 'blue' },
    { id: 'fitness' as Mode, name: 'Fitness Routine', description: '운동 모드', color: 'purple' },
    { id: 'miracle' as Mode, name: 'Miracle Time', description: '갓생 모드', color: 'green' },
    { id: 'community' as Mode, name: 'Community', description: '자랑하기', color: 'emerald' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <Header />
      <main className="pt-11">
        {/* 네비게이션 바: 4개 버튼 가로 꽉 채움 및 중앙 정렬 */}
        <div className="bg-white border-b border-gray-200 sticky top-11 z-40">
          <div className="max-w-screen-xl mx-auto px-4 md:px-6">
            <div className="flex w-full gap-1 py-4 justify-center">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`
                    flex-1 py-3 px-2 rounded-xl font-medium transition-all duration-200
                    ${currentMode === mode.id
                      ? `bg-${mode.color === 'emerald' ? 'emerald' : mode.color}-600 text-white shadow-lg scale-105 z-10`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={
                    currentMode === mode.id
                      ? {
                          backgroundColor:
                            mode.color === 'blue' ? '#2563eb' : 
                            mode.color === 'purple' ? '#9333ea' : 
                            mode.color === 'green' ? '#16a34a' : '#10b981',
                        }
                      : undefined
                  }
                >
                  <div className="text-sm md:text-lg font-bold truncate">{mode.name}</div>
                  <div className={`text-[10px] md:text-sm mt-1 truncate ${currentMode === mode.id ? 'text-white/90' : 'text-gray-500'}`}>
                    {mode.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 각 모드별 독립 컴포넌트 렌더링 */}
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          {currentMode === 'edu' && <EduVibeContent />}
          {currentMode === 'fitness' && <FitnessRoutineContent />}
          {currentMode === 'miracle' && <MiracleTimeContent />}
          {currentMode === 'community' && <CommunityContent />}
        </div>
      </main>
    </div>
  );
}