import { useState, useMemo } from 'react';
import { Header } from '../../components/section/landing/Header';
import { StudyMaterialUpload } from '../../components/section/main/StudyMaterialUpload';
import { AiSuggestions } from '../../components/section/main/AiSuggestions';
import { FitnessWorkout } from '../../components/section/main/FitnessWorkout';
import { FitnessVideos } from '../../components/section/main/FitnessVideos';

// --- 전역 상수 및 타입 정의 ---
type Mode = 'edu' | 'fitness' | 'miracle';
const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

interface Routine {
  id: number;
  name: string;
  time: string;
  days: string[];
  completed: boolean;
  history: boolean[]; 
}

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

export function MainPage() {
  const [currentMode, setCurrentMode] = useState<Mode>('miracle');

  const modes = [
    { id: 'edu' as Mode, name: 'Edu Vibe', description: '공부 모드', color: 'blue' },
    { id: 'fitness' as Mode, name: 'Fitness Routine', description: '운동 모드', color: 'purple' },
    { id: 'miracle' as Mode, name: 'Miracle Time', description: '갓생 모드', color: 'green' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Header />
      <main className="pt-11">
        {/* 모드 전환 탭 네비게이션 */}
        <div className="bg-white border-b border-gray-200 sticky top-11 z-40">
          <div className="max-w-screen-xl mx-auto px-6">
            <div className="flex gap-1 py-4 overflow-x-auto">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`
                    flex-1 min-w-[120px] py-3 px-6 rounded-xl font-medium transition-all duration-200
                    ${currentMode === mode.id
                      ? `bg-${mode.color}-600 text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                  style={
                    currentMode === mode.id
                      ? {
                          backgroundColor:
                            mode.color === 'blue' ? '#2563eb' : mode.color === 'purple' ? '#9333ea' : '#16a34a',
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

        {/* 콘텐츠 영역 */}
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          {currentMode === 'edu' && <EduVibeContent />}
          {currentMode === 'fitness' && <FitnessRoutineContent />}
          {currentMode === 'miracle' && <MiracleTimeContent />}
        </div>
      </main>
    </div>
  );
}

// --- 1. Edu Vibe Content ---
function EduVibeContent() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-100 text-white font-bold">
           EDU
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Edu Vibe</h2>
          <p className="text-gray-500">AI 기반 학습 계획 및 진도 관리</p>
        </div>
      </div>
      <StudyMaterialUpload />
      <AiSuggestions />
    </div>
  );
}

// --- 2. Fitness Routine Content ---
function FitnessRoutineContent() {
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
      {/* 헤더 섹션 */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-100 text-white font-bold text-xs uppercase">
          FIT
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Fitness Routine</h2>
          <p className="text-gray-500">누적 데이터를 통한 스마트 운동 분석</p>
        </div>
      </div>

      {/* 대시보드 */}
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
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-purple-400">SCORE</span>
            <span className="text-xl font-bold">Good</span>
          </div>
          <div className="w-full h-1 bg-white/20 rounded-full">
            <div className="h-full bg-purple-500 w-[70%]" />
          </div>
        </div>
      </div>

      {/* AI 리포트 */}
      <div className="bg-white rounded-3xl border-2 border-purple-50 p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
          <span className="p-1 bg-purple-100 rounded text-purple-600">📊</span> AI 트레이너 피드백
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed bg-purple-50/30 p-4 rounded-xl italic">"{aiAnalysis}"</p>
      </div>

      {/* 메인 그리드 */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <FitnessWorkout onSelectedPartsChange={setSelectedParts} />
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <h4 className="font-bold text-gray-800 mb-4">운동 일지 작성</h4>
            <textarea
              className="w-full h-40 p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none resize-none"
              placeholder="오늘의 운동 내용을 기록하세요..."
              value={workoutLog} onChange={(e) => setWorkoutLog(e.target.value)}
            />
            <button onClick={handleSaveLog} className="w-full mt-4 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg active:scale-95">
              기록 저장
            </button>
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

// --- 3. Miracle Time Content ---
function MiracleTimeContent() {
  const [routines, setRoutines] = useState<Routine[]>([
    { id: 1, name: '아침 명상 10분', time: '07:00', days: ['월', '화', '수', '목', '금'], completed: true, history: [true, false, true, true, true] },
    { id: 2, name: '테크 아티클 읽기', time: '08:30', days: ['월', '수', '금'], completed: false, history: [true, true, true, false, false] },
  ]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, name: '프로젝트 리팩토링', completed: false },
  ]);

  const [newRoutine, setNewRoutine] = useState({ name: '', time: '07:00', days: [] as string[] });
  const [newTask, setNewTask] = useState('');
  const [editingRoutineId, setEditingRoutineId] = useState<number | null>(null);
  const [editRoutineData, setEditRoutineData] = useState<Partial<Routine>>({});
  const [aiSuggestion, setAiSuggestion] = useState("데이터를 분석하여 오늘 최적의 습관을 추천해 드릴게요.");
  const [geminiQuery, setGeminiQuery] = useState("");
  const [geminiAnswer, setGeminiAnswer] = useState("");

  const toggleDay = (day: string, isEdit: boolean) => {
    if (isEdit) {
      const currentDays = editRoutineData.days || [];
      setEditRoutineData({
        ...editRoutineData,
        days: currentDays.includes(day) ? currentDays.filter(d => d !== day) : [...currentDays, day]
      });
    } else {
      setNewRoutine(prev => ({
        ...prev,
        days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
      }));
    }
  };

  const stats = useMemo(() => {
    const routineRate = routines.length > 0 ? Math.round((routines.filter(r => r.completed).length / routines.length) * 100) : 0;
    const taskRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;
    const historySuccess = routines.reduce((acc, r) => acc + r.history.filter(h => h).length, 0);
    const historyTotal = routines.reduce((acc, r) => acc + r.history.length, 0);
    const totalRateResult = historyTotal > 0 ? Math.round((historySuccess / historyTotal) * 100) : 0;
    return { routineRate, taskRate, totalRate: totalRateResult };
  }, [routines, tasks]);

  const generateAiCoaching = () => {
    if (stats.totalRate > 80) setAiSuggestion("🌟 완벽한 페이스입니다! 현재 루틴에 5분만 더 투자해보세요.");
    else setAiSuggestion("🌱 꾸준함이 갓생의 핵심입니다! 오늘 할 일부터 천천히 시작해보세요.");
  };

  const handleGeminiAsk = () => {
    if (!geminiQuery.trim()) return;
    setGeminiAnswer("분석 중...");
    setTimeout(() => {
      setGeminiAnswer(geminiQuery.includes("입고") ? "오늘은 일교차가 있으니 얇은 외투를 추천해요! 🧣" : "좋은 하루를 위한 루틴에 집중해보세요! ✨");
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* 대시보드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="text-3xl font-black text-green-600 mb-1">{stats.routineRate}%</div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">오늘 루틴</span>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
            <div className="text-3xl font-black text-blue-500 mb-1">{stats.taskRate}%</div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">오늘 할 일</span>
        </div>
        <div className="bg-gray-900 p-6 rounded-3xl shadow-lg text-white">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-green-400 uppercase tracking-tighter">Grade</span>
            <span className="text-xl font-bold">{stats.totalRate}%</span>
          </div>
          <div className="w-full h-1 bg-white/20 rounded-full">
            <div className="h-full bg-green-500 transition-all duration-1000" style={{ width: `${stats.totalRate}%` }} />
          </div>
        </div>
      </div>

      {/* AI & Gemini 영역 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border-2 border-green-50 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">🪄 AI 코칭</h3>
          <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 italic">"{aiSuggestion}"</p>
          <button onClick={generateAiCoaching} className="mt-3 text-[10px] font-bold text-green-600 uppercase">분석 갱신</button>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl border-2 border-indigo-50 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">✨ Gemini Prompt</h3>
          <div className="flex gap-2 mb-3">
            <input 
              className="flex-1 text-sm p-2 bg-white border border-indigo-100 rounded-xl outline-none" 
              placeholder="오늘 뭐 입을까?" value={geminiQuery} onChange={(e) => setGeminiQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGeminiAsk()}
            />
            <button onClick={handleGeminiAsk} className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold">전송</button>
          </div>
          {geminiAnswer && <div className="text-[11px] text-indigo-700 bg-white/50 p-2 rounded-lg">{geminiAnswer}</div>}
        </div>
      </div>

      {/* 루틴 입력 */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h4 className="font-bold text-gray-800">✨ 루틴 추가</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <input className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-1 focus:ring-green-500" placeholder="루틴 이름..." value={newRoutine.name} onChange={e => setNewRoutine({...newRoutine, name: e.target.value})} />
            <input type="time" className="w-full p-2 bg-gray-50 rounded-xl outline-none" value={newRoutine.time} onChange={e => setNewRoutine({...newRoutine, time: e.target.value})} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between gap-1">
              {DAYS_OF_WEEK.map(day => (
                <button key={day} onClick={() => toggleDay(day, false)} className={`flex-1 py-3 rounded-xl text-xs font-bold ${newRoutine.days.includes(day) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{day}</button>
              ))}
            </div>
            <button onClick={() => { if(!newRoutine.name) return; setRoutines([...routines, { ...newRoutine, id: Date.now(), completed: false, history: [] }]); setNewRoutine({ name: '', time: '07:00', days: [] }); }} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl active:scale-95 transition-transform">등록하기</button>
          </div>
        </div>
      </div>

      {/* 목록 그리드 */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
           <h3 className="font-black text-gray-800 px-1 italic uppercase tracking-tighter">Recurring</h3>
           {routines.map(r => (
             <div key={r.id} className="group bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:shadow-md transition-all">
                <div className="flex items-center gap-4">
                  <button onClick={() => setRoutines(routines.map(item => item.id === r.id ? {...item, completed: !item.completed} : item))} className={`w-10 h-10 rounded-xl flex items-center justify-center ${r.completed ? 'bg-green-500 text-white' : 'bg-gray-50 text-gray-300'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  </button>
                  <div>
                    <h4 className={`font-bold ${r.completed ? 'text-gray-300 line-through' : 'text-gray-700'}`}>{r.name}</h4>
                    <span className="text-[10px] font-black text-green-600 uppercase">{r.time} • {r.days.join(', ')}</span>
                  </div>
                </div>
                <button onClick={() => setRoutines(routines.filter(item => item.id !== r.id))} className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
             </div>
           ))}
        </div>
        <div className="space-y-4">
          <h3 className="font-black text-gray-800 px-1 italic uppercase tracking-tighter">One-time</h3>
          <div className="bg-white p-2 rounded-2xl border border-gray-100 flex gap-2">
            <input className="flex-1 px-4 py-2 bg-transparent text-sm" placeholder="할 일..." value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key === 'Enter' && (setTasks([{id:Date.now(), name:newTask, completed:false}, ...tasks]), setNewTask(''))} />
            <button onClick={()=>{ if(newTask) { setTasks([{id:Date.now(), name:newTask, completed:false}, ...tasks]); setNewTask(''); }}} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl text-xs active:scale-95 transition-transform">등록</button>
          </div>
          {tasks.map(t => (
            <div key={t.id} className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <input type="checkbox" checked={t.completed} onChange={()=>setTasks(tasks.map(item => item.id === t.id ? {...item, completed: !item.completed} : item))} className="w-5 h-5 border-gray-300 text-blue-600" />
                <span className={`font-bold ${t.completed ? 'text-gray-300 line-through' : 'text-gray-700'}`}>{t.name}</span>
              </div>
              <button onClick={()=>setTasks(tasks.filter(item => item.id !== t.id))} className="opacity-0 group-hover:opacity-100 p-2 text-gray-300 hover:text-red-500 transition-all"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}