// ============================================================
// components/section/study/StopwatchBox.tsx
// 학습 시간 측정 스톱워치 컴포넌트.
//
// 기능:
//   - useEffect + setInterval로 1초마다 경과 시간 갱신
//   - 시작/일시정지 토글 버튼 (PlayIcon ↔ PauseIcon)
//   - 초기화 버튼 (ResetIcon)
//   - hh:mm:ss 형식으로 시간 표시
// ============================================================
import { useState, useEffect } from 'react';
import { PauseIcon, PlayIcon, ResetIcon } from '../../ui/Icons';
import { Card } from '../../common/Card';

export function StopwatchBox() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRunning) interval = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning]);

  const fmt = (n: number) => String(n).padStart(2, '0');
  const h = fmt(Math.floor(time / 3600));
  const m = fmt(Math.floor((time % 3600) / 60));
  const s = fmt(time % 60);

  return (
    <Card className="flex flex-col items-center justify-center h-full border-t-4 border-indigo-500">
      <h2 className="text-gray-400 text-[0.65rem] font-black uppercase tracking-[0.3em] mb-10">스튜디오 타이머</h2>
      <div className="text-7xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter text-glow">
        {h}<span className="text-indigo-500 mx-1">:</span>{m}<span className="text-indigo-500 mx-1">:</span>{s}
      </div>
      <div className="flex gap-6">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="w-20 h-20 bg-black dark:bg-white text-white dark:text-black rounded-3xl flex items-center justify-center active:scale-90 transition-all shadow-2xl shadow-indigo-500/20"
        >
          {isRunning ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
        </button>
        <button
          onClick={() => { setIsRunning(false); setTime(0); }}
          className="w-20 h-20 border-2 border-gray-100 dark:border-[#1a1a1a] rounded-3xl flex items-center justify-center active:scale-90 transition-all text-gray-400 hover:text-indigo-600 hover:border-indigo-600"
        >
          <ResetIcon size={24} />
        </button>
      </div>
    </Card>
  );
}
