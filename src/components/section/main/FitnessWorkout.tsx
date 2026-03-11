import { useState } from 'react';

type WorkoutPart = {
  id: string;
  name: string;
  completed: boolean;
};

type FitnessWorkoutProps = {
  onSelectedPartsChange: (parts: string[]) => void;
};

export function FitnessWorkout({ onSelectedPartsChange }: FitnessWorkoutProps) {
  const [workoutParts, setWorkoutParts] = useState<WorkoutPart[]>([
    { id: 'chest', name: '가슴', completed: false },
    { id: 'back', name: '등', completed: false },
    { id: 'shoulder', name: '어깨', completed: false },
    { id: 'arms', name: '팔', completed: false },
    { id: 'legs', name: '다리', completed: false },
    { id: 'abs', name: '복근', completed: false },
  ]);

  const [workoutTime, setWorkoutTime] = useState('');
  const [savedTime, setSavedTime] = useState(0);

  const handleToggle = (id: string) => {
    const updated = workoutParts.map(part =>
      part.id === id ? { ...part, completed: !part.completed } : part
    );
    setWorkoutParts(updated);
    
    // 선택된 운동 부위를 부모 컴포넌트에 전달
    const selectedParts = updated.filter(p => p.completed).map(p => p.name);
    onSelectedPartsChange(selectedParts);
  };

  const handleSaveTime = () => {
    const time = parseInt(workoutTime);
    if (!isNaN(time) && time > 0) {
      setSavedTime(time);
      setWorkoutTime('');
    }
  };

  const completedCount = workoutParts.filter(p => p.completed).length;
  const totalCount = workoutParts.length;
  const weeklyGoal = 5; // 주간 목표: 5일
  const completedDays = completedCount > 0 ? 1 : 0; // 오늘 운동했으면 1일

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* 오늘의 운동 */}
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">오늘의 운동</h3>
          <p className="text-3xl font-bold text-purple-600">{completedCount} / {totalCount}</p>
          <p className="text-sm text-gray-600 mt-2">완료된 부위</p>
        </div>

        {/* 운동 시간 */}
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">운동 시간</h3>
          <p className="text-3xl font-bold text-purple-600">{savedTime}분</p>
          <p className="text-sm text-gray-600 mt-2">오늘 누적</p>
        </div>

        {/* 주간 달성 */}
        <div className="bg-purple-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">주간 달성</h3>
          <p className="text-3xl font-bold text-purple-600">{completedDays} / {weeklyGoal}</p>
          <p className="text-sm text-gray-600 mt-2">이번 주</p>
        </div>
      </div>

      {/* 운동 부위 선택 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          운동 부위 체크
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {workoutParts.map((part) => (
            <button
              key={part.id}
              onClick={() => handleToggle(part.id)}
              className={`
                p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3
                ${part.completed
                  ? 'bg-purple-100 border-purple-600 shadow-md'
                  : 'bg-white border-gray-200 hover:border-purple-300'
                }
              `}
            >
              <div className={`
                w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all
                ${part.completed
                  ? 'bg-purple-600 border-purple-600'
                  : 'border-gray-300'
                }
              `}>
                {part.completed && (
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className={`font-medium ${part.completed ? 'text-purple-900' : 'text-gray-700'}`}>
                {part.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 운동 시간 입력 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          운동 시간 기록
        </h3>

        <div className="flex gap-3">
          <input
            type="number"
            value={workoutTime}
            onChange={(e) => setWorkoutTime(e.target.value)}
            placeholder="운동 시간 (분)"
            min="1"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={handleSaveTime}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
