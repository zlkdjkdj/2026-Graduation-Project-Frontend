import { useState, useMemo } from 'react';
import { FitnessWorkout } from './FitnessWorkout';
import { FitnessVideos } from './FitnessVideos';

export function FitnessRoutineContent() {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [workoutLog, setWorkoutLog] = useState("");
  const [workoutHistory, setWorkoutHistory] = useState<string[]>([
    "스쿼트와 데드리프트 중심의 하체 훈련 진행.",
    "러닝머신 5km 수행. 심박수 안정적."
  ]);

  const aiAnalysis = useMemo(() => {
    const historyText = workoutHistory.join(" ");
    if (historyText.includes("하체")) return "🔥 하체 훈련 빈도가 이상적입니다. 큰 근육 위주 훈련은 대사량 증진에 효과적입니다.";
    return "💡 균형 있는 성장을 위해 하체 루틴 비중을 조금 더 늘려보세요.";
  }, [workoutHistory]);

  const handleSaveLog = () => {
    if (!workoutLog.trim()) return;
    setWorkoutHistory([workoutLog, ...workoutHistory]);
    setWorkoutLog("");
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-100 text-white font-bold text-xs uppercase">FIT</div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fitness Routine</h2>
          <p className="text-gray-500">누적 데이터를 통한 스마트 운동 분석</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="text-3xl font-black text-purple-600 mb-1">{workoutHistory.length}회</div>
            <span className="text-xs font-bold text-gray-400 uppercase">누적 운동 기록</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="text-lg font-black text-gray-700 mb-1 truncate px-2">{selectedParts.length > 0 ? selectedParts.join(", ") : "전신"}</div>
            <span className="text-xs font-bold text-gray-400 uppercase">집중 부위</span>
        </div>
        <div className="bg-gray-900 p-6 rounded-3xl shadow-lg text-white">
          <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-purple-400">SCORE</span><span className="text-xl font-bold">Good</span></div>
          <div className="w-full h-1 bg-white/20 rounded-full"><div className="h-full bg-purple-500 w-[70%]" /></div>
        </div>
      </div>
      <div className="bg-white rounded-3xl border-2 border-purple-50 p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3"><span className="p-1 bg-purple-100 rounded text-purple-600">📊</span> AI 트레이너 피드백</h3>
        <p className="text-gray-600 text-sm leading-relaxed bg-purple-50/30 p-4 rounded-xl italic">"{aiAnalysis}"</p>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <FitnessWorkout onSelectedPartsChange={setSelectedParts} />
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <textarea className="w-full h-40 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none resize-none" placeholder="오늘의 운동 내용을 기록하세요..." value={workoutLog} onChange={(e) => setWorkoutLog(e.target.value)} />
            <button onClick={handleSaveLog} className="w-full mt-4 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg active:scale-95">기록 저장</button>
          </div>
        </div>
        <div className="space-y-6">
          <FitnessVideos selectedParts={selectedParts} />
          <div className="space-y-2">
             <h4 className="text-[10px] font-black text-gray-400 uppercase px-2 tracking-widest">Recent Logs</h4>
             {workoutHistory.slice(0, 3).map((log, i) => (
               <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 text-sm text-gray-500 shadow-sm">{log}</div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}