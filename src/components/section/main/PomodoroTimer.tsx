import { useState, useEffect } from 'react';

type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

export function PomodoroTimer() {
  const [mode, setMode] = useState<PomodoroMode>('focus');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25분 기본값
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const timers = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // 타이머 완료
      setIsRunning(false);
      if (mode === 'focus') {
        setCompletedPomodoros((prev) => prev + 1);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleModeChange = (newMode: PomodoroMode) => {
    setMode(newMode);
    setTimeLeft(timers[newMode]);
    setIsRunning(false);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(timers[mode]);
  };

  const progress = ((timers[mode] - timeLeft) / timers[mode]) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl p-6 border border-purple-200/50">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        뽀모도로 타이머
      </h3>

      {/* 모드 선택 탭 */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => handleModeChange('focus')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
            mode === 'focus'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          집중 (25분)
        </button>
        <button
          onClick={() => handleModeChange('shortBreak')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
            mode === 'shortBreak'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          휴식 (5분)
        </button>
        <button
          onClick={() => handleModeChange('longBreak')}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition ${
            mode === 'longBreak'
              ? 'bg-purple-600 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100'
          }`}
        >
          긴 휴식 (15분)
        </button>
      </div>

      {/* 원형 프로그레스 바 */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="transform -rotate-90 w-48 h-48">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-purple-200"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
            className="text-purple-600 transition-all duration-1000"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-purple-600 font-mono">
            {formatTime(timeLeft)}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {mode === 'focus' ? '집중 시간' : mode === 'shortBreak' ? '짧은 휴식' : '긴 휴식'}
          </div>
        </div>
      </div>

      {/* 완료된 뽀모도로 */}
      <div className="text-center mb-4">
        <div className="text-sm text-gray-600 mb-2">완료한 뽀모도로</div>
        <div className="flex justify-center gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < completedPomodoros % 4 ? 'bg-purple-600' : 'bg-purple-200'
              }`}
            />
          ))}
        </div>
        <div className="text-xs text-gray-500 mt-1">오늘: {completedPomodoros}개</div>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="flex gap-3">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 ${
            isRunning
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              일시정지
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              시작
            </>
          )}
        </button>
        <button
          onClick={resetTimer}
          className="px-6 bg-white hover:bg-gray-100 text-gray-700 py-3 rounded-xl font-medium transition flex items-center justify-center gap-2 border border-purple-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          초기화
        </button>
      </div>
    </div>
  );
}
