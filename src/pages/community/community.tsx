import { useState, useMemo } from 'react';
import { Header } from '../../components/section/landing/Header';
import { StudyMaterialUpload } from '../../components/section/main/StudyMaterialUpload';
import { AiSuggestions } from '../../components/section/main/AiSuggestions';
import { FitnessWorkout } from '../../components/section/main/FitnessWorkout';
import { FitnessVideos } from '../../components/section/main/FitnessVideos';

// --- 전역 타입 정의 ---
type Mode = 'edu' | 'fitness' | 'miracle' | 'community';
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

interface Post {
  id: number;
  userName: string;
  userRank: number;
  content: string;
  completedRoutines: string[];
  successRate: number;
  likes: number;
  reactions: { [key: string]: number };
  category: string;
  streakDays: number;
  createdAt: string;
}

// ==========================================
// 1. MainPage (컨트롤러 컴포넌트)
// ==========================================
export function MainPage() {
  const [currentMode, setCurrentMode] = useState<Mode>('community');

  const modes = [
    { id: 'edu' as Mode, name: 'Edu Vibe', description: '공부 모드', color: 'blue' },
    { id: 'fitness' as Mode, name: 'Fitness Routine', description: '운동 모드', color: 'purple' },
    { id: 'miracle' as Mode, name: 'Miracle Time', description: '갓생 모드', color: 'green' },
    { id: 'community' as Mode, name: 'Community', description: '자랑하기', color: 'emerald' },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900 font-sans">
      <Header />
      <main className="pt-11">
        {/* 네비게이션 바 */}
        <nav className="bg-white border-b border-gray-200 sticky top-11 z-40">
          <div className="max-w-screen-xl mx-auto px-6 py-4">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setCurrentMode(mode.id)}
                  className={`flex-1 min-w-[140px] py-4 px-6 rounded-2xl font-bold transition-all duration-300 ${
                    currentMode === mode.id
                      ? `bg-${mode.color === 'emerald' ? 'emerald' : mode.color}-600 text-white shadow-lg scale-105`
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  style={currentMode === mode.id ? { 
                    backgroundColor: mode.color === 'blue' ? '#2563eb' : mode.color === 'purple' ? '#9333ea' : mode.color === 'green' ? '#16a34a' : '#10b981' 
                  } : {}}
                >
                  <div className="text-lg">{mode.name}</div>
                  <div className="text-xs opacity-80">{mode.description}</div>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* 모드별 콘텐츠 렌더링 */}
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

// ==========================================
// 2. EduVibeContent 컴포넌트
// ==========================================
function EduVibeContent() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg text-white font-bold">EDU</div>
        <div>
          <h2 className="text-2xl font-bold">Edu Vibe</h2>
          <p className="text-gray-600">AI 기반 학습 계획 및 진도 관리</p>
        </div>
      </div>
      <StudyMaterialUpload />
      <AiSuggestions />
    </div>
  );
}

// ==========================================
// 3. FitnessRoutineContent 컴포넌트
// ==========================================
function FitnessRoutineContent() {
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [workoutLog, setWorkoutLog] = useState("");
  const [workoutHistory, setWorkoutHistory] = useState<string[]>(["스쿼트 5세트", "러닝 5km"]);

  const aiAnalysis = useMemo(() => {
    return workoutHistory.some(log => log.includes("하체") || log.includes("스쿼트")) 
      ? "🔥 하체 훈련 빈도가 훌륭합니다! 근성장의 지름길입니다." 
      : "💡 전신 밸런스를 위해 하체 루틴을 추가해보세요.";
  }, [workoutHistory]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="bg-white rounded-2xl border border-gray-200 p-6 flex items-center gap-4 shadow-sm">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg text-white font-bold">FIT</div>
        <div>
          <h2 className="text-2xl font-bold">Fitness Routine</h2>
          <p className="text-gray-500">누적 데이터를 통한 스마트 운동 분석</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="누적 기록" value={`${workoutHistory.length}회`} color="text-purple-600" />
        <StatCard title="집중 부위" value={selectedParts.length > 0 ? selectedParts[0] : "전신"} color="text-gray-700" />
        <div className="bg-gray-900 p-6 rounded-3xl shadow-lg text-white">
          <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-purple-400">SCORE</span><span className="text-xl font-bold">Good</span></div>
          <div className="w-full h-1 bg-white/20 rounded-full"><div className="h-full bg-purple-500 w-[70%]" /></div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border-2 border-purple-50 p-6 shadow-sm">
        <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3"><span className="p-1 bg-purple-100 rounded text-purple-600">📊</span> AI 피드백</h3>
        <p className="text-gray-600 text-sm leading-relaxed bg-purple-50/30 p-4 rounded-xl italic">"{aiAnalysis}"</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="space-y-6">
          <FitnessWorkout onSelectedPartsChange={setSelectedParts} />
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <textarea className="w-full h-40 p-4 bg-gray-50 border-none rounded-2xl outline-none" placeholder="운동 기록 입력..." value={workoutLog} onChange={(e) => setWorkoutLog(e.target.value)} />
            <button onClick={() => { setWorkoutHistory([workoutLog, ...workoutHistory]); setWorkoutLog(""); }} className="w-full mt-4 py-4 bg-purple-600 text-white font-bold rounded-2xl hover:bg-purple-700 shadow-lg active:scale-95">기록 저장</button>
          </div>
        </div>
        <FitnessVideos selectedParts={selectedParts} />
      </div>
    </div>
  );
}

// ==========================================
// 4. MiracleTimeContent 컴포넌트
// ==========================================
function MiracleTimeContent() {
  const [routines, setRoutines] = useState<Routine[]>([
    { id: 1, name: '아침 명상', time: '07:00', days: ['월', '수', '금'], completed: true, history: [true, false, true] },
  ]);
  const [tasks, setTasks] = useState<Task[]>([{ id: 1, name: '프로젝트 기획', completed: false }]);
  const [newRoutine, setNewRoutine] = useState({ name: '', time: '07:00', days: [] as string[] });
  const [geminiQuery, setGeminiQuery] = useState("");
  const [geminiAnswer, setGeminiAnswer] = useState("");

  const stats = useMemo(() => {
    const routineRate = routines.length > 0 ? Math.round((routines.filter(r => r.completed).length / routines.length) * 100) : 0;
    const taskRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;
    return { routineRate, taskRate };
  }, [routines, tasks]);

  const toggleDay = (day: string) => {
    setNewRoutine(prev => ({ ...prev, days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day] }));
  };

  const handleGeminiAsk = () => {
    setGeminiAnswer("분석 중...");
    setTimeout(() => setGeminiAnswer(geminiQuery.includes("입고") ? "일교차가 있으니 얇은 외투를 챙기세요! 🧣" : "오늘도 멋진 갓생을 응원합니다! ✨"), 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="오늘 루틴 달성" value={`${stats.routineRate}%`} color="text-green-600" />
        <StatCard title="할 일 달성" value={`${stats.taskRate}%`} color="text-blue-500" />
        <div className="bg-gray-900 p-6 rounded-3xl shadow-lg text-white">
          <div className="flex justify-between items-center mb-2"><span className="text-xs font-bold text-green-400">GRADE</span><span className="text-xl font-bold">A+</span></div>
          <div className="w-full h-1 bg-white/20 rounded-full"><div className="h-full bg-green-500 w-[85%]" /></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border-2 border-green-50 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-4">🪄 AI 코칭</h3>
          <p className="text-gray-600 text-sm italic bg-gray-50 p-4 rounded-xl border">"성취도가 높습니다! 현재 루틴에 5분만 더 투자해보세요."</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-3xl border-2 border-indigo-50 p-6 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">✨ Gemini Prompt</h3>
          <div className="flex gap-2">
            <input className="flex-1 text-sm p-2 bg-white border border-indigo-100 rounded-xl outline-none" placeholder="오늘 뭐 입을까?" value={geminiQuery} onChange={(e)=>setGeminiQuery(e.target.value)} onKeyDown={(e)=>e.key === 'Enter' && handleGeminiAsk()} />
            <button onClick={handleGeminiAsk} className="bg-indigo-600 text-white px-3 py-2 rounded-xl text-xs font-bold">전송</button>
          </div>
          {geminiAnswer && <div className="text-[11px] text-indigo-700 bg-white/50 p-2 mt-2 rounded-lg">{geminiAnswer}</div>}
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
        <h4 className="font-bold text-gray-800 tracking-tight">✨ 새로운 루틴 추가</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <input className="w-full p-3 bg-gray-50 border-none rounded-xl outline-none focus:ring-1 focus:ring-green-500" placeholder="루틴 이름..." value={newRoutine.name} onChange={e => setNewRoutine({...newRoutine, name: e.target.value})} />
            <input type="time" className="w-full p-2 bg-gray-50 rounded-xl outline-none" value={newRoutine.time} onChange={e => setNewRoutine({...newRoutine, time: e.target.value})} />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between gap-1">{DAYS_OF_WEEK.map(day => (<button key={day} onClick={() => toggleDay(day)} className={`flex-1 py-3 rounded-xl text-xs font-bold ${newRoutine.days.includes(day) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{day}</button>))}</div>
            <button onClick={() => { if(!newRoutine.name) return; setRoutines([...routines, { ...newRoutine, id: Date.now(), completed: false, history: [] }]); setNewRoutine({ name: '', time: '07:00', days: [] }); }} className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl active:scale-95 transition-transform">등록하기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. CommunityContent 컴포넌트
// ==========================================
function CommunityContent() {
  const [posts, setPosts] = useState<Post[]>([
    { id: 1, userName: '갓생마스터', userRank: 1, content: '오늘도 명상으로 하루를 열었습니다. 완벽 성공!', completedRoutines: ['새벽 명상', '독서'], successRate: 100, likes: 25, reactions: {'🔥': 12, '👏': 8}, category: '#미라클모닝', streakDays: 30, createdAt: '2시간 전' },
    { id: 2, userName: '꾸준함이무기', userRank: 2, content: '하체 운동 끝! 내일은 근육통이 심할 것 같네요 ㅎㅎ', completedRoutines: ['스쿼트', '런지'], successRate: 98, likes: 18, reactions: {'🔥': 15}, category: '#운동', streakDays: 21, createdAt: '4시간 전' },
  ]);

  const handleReaction = (postId: number, emoji: string) => {
    setPosts(posts.map(p => p.id === postId ? { ...p, reactions: { ...p.reactions, [emoji]: (p.reactions[emoji] || 0) + 1 } } : p));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* 🏅 명예의 전당 (Top 3) */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold flex items-center gap-2 px-1"><span className="p-1.5 bg-emerald-100 rounded-lg text-emerald-600">🏆</span> 명예의 전당</h3>
        <div className="grid md:grid-cols-3 gap-6 items-end">
          {[1, 2, 3].map((rank) => (
            <div key={rank} className={`bg-white rounded-3xl border border-gray-100 shadow-lg p-6 flex flex-col items-center text-center ${rank === 1 ? 'border-emerald-200 scale-105 md:order-2' : rank === 2 ? 'md:order-1 opacity-80' : 'md:order-3 opacity-80'}`}>
              <div className={`w-20 h-20 rounded-full border-4 mb-4 ${rank === 1 ? 'border-emerald-500' : 'border-gray-200'} bg-gray-100 flex items-center justify-center font-black text-2xl`}>{rank}</div>
              <h4 className="font-black text-gray-800">사용자 {rank}</h4>
              <div className="mt-3 text-emerald-600 bg-emerald-50 px-4 py-1 rounded-full font-bold text-sm">성공률 100%</div>
            </div>
          ))}
        </div>
      </section>

      {/* 🪄 오늘의 명언 */}
      <section className="bg-emerald-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 italic font-medium leading-relaxed">"성공의 비결은 매일 반복되는 우리의 루틴 속에 있습니다. 오늘도 당신의 갓생을 응원합니다! ✨"</div>
        <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black">QUOTE</div>
      </section>

      {/* 📋 실시간 인증 피드 */}
      <section className="space-y-6">
        <h3 className="text-xl font-bold px-1 italic uppercase tracking-tighter">🔥 Real-time Feed</h3>
        <div className="space-y-6">
          {posts.map(p => (
            <div key={p.id} className="group bg-white p-6 rounded-3xl border border-gray-100 hover:border-emerald-100 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-5">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center font-bold text-emerald-600">{p.userName[0]}</div>
                    <div>
                        <div className="flex items-center gap-2"><span className="font-black text-gray-800">{p.userName}</span><span className="text-[10px] text-gray-400 font-bold uppercase">{p.createdAt}</span></div>
                        <span className="text-xs text-green-600 font-bold bg-green-50 px-2.5 py-0.5 rounded-full mt-1 inline-block">🔥 {p.streakDays}일 연속 달성</span>
                    </div>
                 </div>
                 <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">{p.category}</span>
              </div>
              <p className="text-gray-700 font-medium mb-4 pl-2 border-l-4 border-emerald-50">{p.content}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                  {p.completedRoutines.map(r => (<span key={r} className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg"># {r}</span>))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button onClick={() => handleReaction(p.id, '❤️')} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500">❤️ {p.likes}</button>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {['🔥', '👏', '🫡'].map(emoji => (
                        <button key={emoji} onClick={() => handleReaction(p.id, emoji)} className="text-sm p-1.5 hover:bg-gray-100 rounded-lg">{emoji} {p.reactions[emoji] || 0}</button>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// --- 공용 헬퍼 컴포넌트 ---
function StatCard({ title, value, color }: { title: string, value: string, color: string }) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center">
        <div className={`text-3xl font-black ${color} mb-1`}>{value}</div>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{title}</span>
    </div>
  );
}