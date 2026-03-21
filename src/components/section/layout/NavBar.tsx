import React, { useState, useMemo } from 'react';
import {
  BookOpen, Dumbbell, Users, Sun, Moon, Sparkles,
  Upload, Calendar, Trash2, CheckCircle, Plus, Zap,
  BarChart3, Clock, Flag, Target, Flame,
  Scale, RotateCcw, Brain, AlertCircle,
  Save, RefreshCw, Activity, Award, TrendingUp, Lightbulb,
} from 'lucide-react';

// ────────────────────────────────────────
//  Types
// ────────────────────────────────────────
type Mode = 'edu' | 'fitness' | 'community';
type BodyPart = '가슴' | '등' | '어깨' | '이두' | '삼두' | '하체' | '복근';

interface Task           { id: number; text: string; done: boolean; time?: string }
interface AiGuideTask    { id: number; text: string; done: boolean; tag: string; tagColor: string }
interface WorkoutLog     { id: number; date: string; durationMin: number; calories: number; memo: string }
interface WeightEntry    { date: string; weight: number; bodyFat?: number }

interface StudySuggestion {
  id: number;
  type: 'tip' | 'warning' | 'boost' | 'schedule';
  title: string; body: string; time: string; read: boolean;
}
interface FitnessSuggestion {
  id: number;
  type: 'praise' | 'improve' | 'recovery' | 'caution';
  title: string; body: string; time: string;
}

// ────────────────────────────────────────
//  Theme
// ────────────────────────────────────────
const getTheme = (dark: boolean) => dark
  ? {
      bg: 'bg-[#0a0a0c] text-slate-200',
      nav: 'bg-[#0a0a0c]/80 border-slate-800 backdrop-blur-2xl',
      tabActive: 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] border-indigo-500',
      card: 'bg-[#161618] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
      input: 'bg-[#1c1c1f] border-slate-700 text-slate-100 focus:border-indigo-500',
      subCard: 'bg-[#1c1c1f] border-slate-800 hover:border-slate-700 hover:bg-[#222225]',
      textMuted: 'text-slate-500', accent: 'text-indigo-400', divider: 'border-slate-800',
    }
  : {
      bg: 'bg-[#f8f9fa] text-[#1d1d1f]',
      nav: 'bg-white/80 border-slate-200 backdrop-blur-2xl',
      tabActive: 'bg-white text-indigo-600 shadow-lg border-slate-200',
      card: 'bg-white border-slate-100 shadow-xl',
      input: 'bg-slate-100 border-transparent text-black focus:bg-white focus:ring-2 focus:ring-indigo-500',
      subCard: 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-white',
      textMuted: 'text-slate-400', accent: 'text-indigo-600', divider: 'border-slate-100',
    };

// ────────────────────────────────────────
//  Static seed data  (실제 구현 시 API/props로 교체)
// ────────────────────────────────────────
const BODY_PARTS: BodyPart[] = ['가슴', '등', '어깨', '이두', '삼두', '하체', '복근'];
const TODAY = new Date().toISOString().slice(0, 10);

const SEED_AI_TASKS: AiGuideTask[] = [
  { id: 1, text: '오후 3시 — 2단원 핵심 개념 복습 시작',      done: false, tag: '우선순위', tagColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20' },
  { id: 2, text: '암기 효율 피크 타임(14:00~16:00) 집중 활용', done: false, tag: 'AI 추천',  tagColor: 'bg-violet-500/15 text-violet-400 border-violet-500/20' },
  { id: 3, text: '공부 주제 핵심 키워드 5개 요약 완료',         done: false, tag: '오늘 목표', tagColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
  { id: 4, text: '학습 후 오답 노트 10분 작성',                 done: false, tag: '루틴',     tagColor: 'bg-amber-500/15 text-amber-400 border-amber-500/20' },
];

const SEED_MANUAL_TASKS: Task[] = [
  { id: 101, text: '오전 10시 실시간 강의 시청', done: true, time: '10:00' },
];

const SEED_WORKOUT_LOGS: WorkoutLog[] = [
  { id: 1, date: TODAY, durationMin: 60, calories: 390, memo: '벤치프레스 5×5\n스쿼트 4×8\n런닝 20분' },
  { id: 2, date: TODAY, durationMin: 45, calories: 293, memo: '덤벨 컬 3×12\n케이블 로우 4×10' },
];

const SEED_WEIGHT_LOG: WeightEntry[] = [
  { date: '03-12', weight: 75.2 }, { date: '03-13', weight: 75.0 },
  { date: '03-14', weight: 74.8, bodyFat: 18.2 }, { date: '03-15', weight: 75.1 },
  { date: '03-16', weight: 74.6 }, { date: '03-17', weight: 74.5, bodyFat: 17.9 },
  { date: '03-18', weight: 74.3 },
];

const SEED_STUDY_SUGGESTIONS: StudySuggestion[] = [
  { id: 1, type: 'tip',      read: false, title: '지금이 집중력 피크 타임이에요', body: '오후 2~4시는 단기 기억이 장기 기억으로 전환되는 골든 타임입니다. 암기 위주 학습을 이 시간대에 배치하면 효율이 최대 40% 상승합니다.', time: '14:02' },
  { id: 2, type: 'schedule', read: false, title: '오늘 진도 패턴 분석 완료',      body: '3일 연속 오전 태스크를 미루고 있습니다. 내일은 가장 중요한 항목을 오전 9시 블록에 먼저 배치해보세요.', time: '11:30' },
  { id: 3, type: 'boost',    read: true,  title: '이번 주 달성률 +12% 상승 🎉',   body: '지난주 대비 학습 완료율이 크게 올랐습니다. 현재 페이스를 유지하면 설정한 목표일보다 3일 빠르게 완료 가능합니다.', time: '09:00' },
  { id: 4, type: 'warning',  read: true,  title: '집중 세션이 너무 짧아요',       body: '오늘 평균 집중 지속 시간이 18분으로, 권장치(25분)에 미치지 못하고 있습니다. 포모도로 타이머 사용을 추천합니다.', time: '어제' },
];

const SEED_FITNESS_SUGGESTIONS: FitnessSuggestion[] = [
  { id: 1, type: 'praise',   title: '오늘 운동량 충분합니다 💪',   body: '소모 칼로리 683kcal로 오늘 목표를 달성했습니다. 지금은 단백질 보충과 스트레칭에 집중하세요.', time: '방금' },
  { id: 2, type: 'improve',  title: '하체 운동 3일째 없음',        body: '최근 기록에 하체 운동이 보이지 않습니다. 내일 스쿼트 or 런지 20분만 추가해도 대사율이 유지됩니다.', time: '1시간 전' },
  { id: 3, type: 'recovery', title: '수면 회복 우선순위 권장',     body: '이번 주 5일 연속 운동 중입니다. 내일은 액티브 리커버리(가벼운 스트레칭·산책)로 근육 회복을 도와주세요.', time: '오늘 오전' },
  { id: 4, type: 'caution',  title: '체중 2일 연속 증가 감지',    body: '74.3 → 74.8 → 75.1kg으로 증가 추세입니다. 수분 섭취나 수면 부족이 원인일 수 있으니 수면을 먼저 점검하세요.', time: '어제' },
];

// 제안 카드 스타일 맵
const STUDY_SUGG_STYLE: Record<StudySuggestion['type'], { icon: React.ReactNode; border: string; badge: string; label: string }> = {
  tip:      { icon: <Lightbulb size={16} className="text-yellow-400" />, border: 'border-yellow-500/20 bg-yellow-500/5',   badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',   label: '학습 팁' },
  warning:  { icon: <AlertCircle size={16} className="text-rose-400" />, border: 'border-rose-500/20 bg-rose-500/5',       badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20',         label: '주의' },
  boost:    { icon: <Zap size={16} className="text-emerald-400" />,      border: 'border-emerald-500/20 bg-emerald-500/5', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', label: '성과' },
  schedule: { icon: <Calendar size={16} className="text-blue-400" />,    border: 'border-blue-500/20 bg-blue-500/5',       badge: 'bg-blue-500/15 text-blue-400 border-blue-500/20',         label: '일정' },
};

const FITNESS_SUGG_STYLE: Record<FitnessSuggestion['type'], { icon: React.ReactNode; border: string; badge: string; label: string }> = {
  praise:   { icon: <Award size={16} className="text-yellow-400" />,      border: 'border-yellow-500/20 bg-yellow-500/5',   badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',   label: '칭찬' },
  improve:  { icon: <TrendingUp size={16} className="text-indigo-400" />, border: 'border-indigo-500/20 bg-indigo-500/5',   badge: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20',   label: '개선' },
  recovery: { icon: <Activity size={16} className="text-green-400" />,   border: 'border-green-500/20 bg-green-500/5',     badge: 'bg-green-500/15 text-green-400 border-green-500/20',      label: '회복' },
  caution:  { icon: <AlertCircle size={16} className="text-rose-400" />, border: 'border-rose-500/20 bg-rose-500/5',       badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20',         label: '주의' },
};

// ────────────────────────────────────────
//  Component
// ────────────────────────────────────────
export function MainPage() {
  const [mode, setMode]   = useState<Mode>('edu');
  const [dark, setDark]   = useState(false);
  const t = useMemo(() => getTheme(dark), [dark]);

  // ── Edu state ──
  const [bookTitle, setBookTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate,   setEndDate]   = useState('');
  const [totalDays, setTotalDays] = useState(0);
  const [aiTasks,   setAiTasks]   = useState<AiGuideTask[]>(SEED_AI_TASKS);
  const [manTasks,  setManTasks]  = useState<Task[]>(SEED_MANUAL_TASKS);
  const [newTask,   setNewTask]   = useState('');
  const [studySugg, setStudySugg] = useState<StudySuggestion[]>(SEED_STUDY_SUGGESTIONS);

  // Edu derived
  const elapsedDays   = (() => { if (!startDate || !totalDays) return 0; const d = Math.floor((Date.now() - new Date(startDate).getTime()) / 86400000) + 1; return Math.max(0, Math.min(d, totalDays)); })();
  const remainingDays = (() => { if (!endDate) return 0; const d = Math.floor((new Date(endDate).getTime() - Date.now()) / 86400000); return Math.max(0, d); })();
  const periodPct     = totalDays > 0 ? Math.round((elapsedDays / totalDays) * 100) : 0;
  const allTasks      = [...aiTasks, ...manTasks];
  const donePct       = allTasks.length > 0 ? Math.round(allTasks.filter(t => t.done).length / allTasks.length * 100) : 0;
  const gap           = donePct - periodPct;
  const aiDone        = aiTasks.filter(t => t.done).length;
  const aiPct         = Math.round(aiDone / aiTasks.length * 100);
  const unreadCount   = studySugg.filter(s => !s.read).length;

  // ── Fitness state ──
  const [selParts,    setSelParts]    = useState<BodyPart[]>([]);
  const [workoutMin,  setWorkoutMin]  = useState('');
  const [workoutMemo, setWorkoutMemo] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [fatInput,    setFatInput]    = useState('');
  const [workouts,    setWorkouts]    = useState<WorkoutLog[]>(SEED_WORKOUT_LOGS);
  const [weightLog,   setWeightLog]   = useState<WeightEntry[]>(SEED_WEIGHT_LOG);
  const [fitSugg,     setFitSugg]     = useState<FitnessSuggestion[]>(SEED_FITNESS_SUGGESTIONS);

  // Fitness derived
  const todayWorkouts  = workouts.filter(w => w.date === TODAY);
  const burnedCal      = todayWorkouts.reduce((s, w) => s + w.calories, 0);
  const totalMin       = todayWorkouts.reduce((s, w) => s + w.durationMin, 0);
  const latestWeight   = weightLog[weightLog.length - 1]?.weight ?? 0;
  const wMin = Math.min(...weightLog.map(w => w.weight));
  const wMax = Math.max(...weightLog.map(w => w.weight));
  const wRange = wMax - wMin || 1;

  // ── Handlers (UI interaction only — replace with API calls) ──
  const toggleAiTask  = (id: number) => setAiTasks(p  => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const toggleManTask = (id: number) => setManTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const addManTask    = () => { if (!newTask.trim()) return; setManTasks(p => [...p, { id: Date.now(), text: newTask, done: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }]); setNewTask(''); };
  const delManTask    = (id: number) => setManTasks(p => p.filter(t => t.id !== id));

  const markStudyRead    = (id: number) => setStudySugg(p => p.map(s => s.id === id ? { ...s, read: true } : s));
  const dismissStudySugg = (id: number) => setStudySugg(p => p.filter(s => s.id !== id));

  const togglePart  = (p: BodyPart) => setSelParts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  const saveWorkout = () => {
    if (!workoutMin) return;
    const min = Number(workoutMin);
    const cal = Math.round(min * 6.5);
    setWorkouts(p => [...p, { id: Date.now(), date: TODAY, durationMin: min, calories: cal, memo: workoutMemo }]);
    setWorkoutMin(''); setWorkoutMemo(''); setSelParts([]);
  };
  const delWorkout = (id: number) => setWorkouts(p => p.filter(w => w.id !== id));
  const resetToday = () => setWorkouts(p => p.filter(w => w.date !== TODAY));
  const saveWeight = () => {
    if (!weightInput) return;
    setWeightLog(p => [...p.slice(-6), { date: TODAY.slice(5), weight: Number(weightInput), bodyFat: fatInput ? Number(fatInput) : undefined }]);
    setWeightInput(''); setFatInput('');
  };
  const dismissFitSugg = (id: number) => setFitSugg(p => p.filter(s => s.id !== id));

  // ────────────────────────────────────────
  //  Render
  // ────────────────────────────────────────
  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${t.bg}`}>

      {/* ── Header ── */}
      <header className={`fixed top-0 inset-x-0 z-50 border-b ${t.nav}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg">
              <Sparkles className="text-white" size={22} />
            </div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase opacity-90">AI Manager</h1>
          </div>
          <nav className={`hidden md:flex p-1.5 rounded-2xl border ${dark ? 'bg-black/40 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
            {(['edu', 'fitness', 'community'] as Mode[]).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex items-center gap-2.5 px-8 py-2.5 rounded-xl transition-all text-[13px] font-bold uppercase
                  ${mode === m ? t.tabActive : 'text-slate-500'}`}>
                {m === 'edu' ? <BookOpen size={16} /> : m === 'fitness' ? <Dumbbell size={16} /> : <Users size={16} />}
                {m}
              </button>
            ))}
          </nav>
          <button onClick={() => setDark(d => !d)} className={`p-2.5 rounded-xl border transition-all ${dark ? 'text-yellow-400' : 'text-indigo-600'}`}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto pt-36 pb-24 px-8">

        {/* 페이지 타이틀 */}
        <div className="flex items-center gap-8 mb-16">
          <div className={`p-7 rounded-[2.5rem] border shadow-2xl ${t.card}`}>
            <Sparkles className="text-yellow-400 animate-pulse" size={42} />
          </div>
          <div>
            <h2 className={`text-5xl font-black tracking-tight uppercase italic leading-none ${dark ? 'text-white' : 'text-slate-900'}`}>
              {mode === 'edu' ? 'EduVibe' : mode === 'fitness' ? 'Exercise' : 'Community'}
            </h2>
            <p className="text-[11px] font-bold opacity-40 uppercase tracking-[0.5em] mt-1">AI Real-time {mode} Analysis</p>
          </div>
        </div>

        {/* ══════════════════════════════
            EDU MODE
        ══════════════════════════════ */}
        {mode === 'edu' && (
          <div className="space-y-10">

            {/* 1. Study Setup */}
            <div className={`p-10 md:p-14 rounded-[3.5rem] border ${t.card}`}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-indigo-600/10 rounded-2xl text-indigo-500 border border-indigo-500/20"><BookOpen size={26} /></div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight uppercase italic">Study Setup</h3>
                  <p className={`text-xs font-bold mt-0.5 ${t.textMuted}`}>학습 대상과 기간을 먼저 설정하세요</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                  { label: '책 제목',      val: bookTitle, set: setBookTitle, type: 'text',   ph: '주제 입력' },
                  { label: '시작 날짜',    val: startDate, set: setStartDate, type: 'date' },
                  { label: '종료 날짜',    val: endDate,   set: setEndDate,   type: 'date' },
                  { label: '총 공부 일수', val: totalDays, set: setTotalDays, type: 'number' },
                ].map((inp, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[11px] font-black uppercase opacity-40 tracking-widest ml-1">{inp.label}</label>
                    <input
                      type={inp.type} value={inp.val}
                      onChange={e => (inp.set as any)(inp.type === 'number' ? Number(e.target.value) : e.target.value)}
                      placeholder={(inp as any).ph}
                      className={`w-full rounded-2xl px-5 py-4 font-bold text-sm outline-none border-2 transition-all ${t.input}`}
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <label className={`lg:col-span-2 border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-3 group cursor-pointer transition-all
                  ${dark ? 'border-slate-800 hover:border-indigo-500' : 'border-slate-200 hover:border-indigo-400'}`}>
                  <Upload size={36} className="text-slate-400 group-hover:text-indigo-500 transition-all" />
                  <p className="font-bold text-slate-500 text-sm">AI 공부 자료 업로드 (PDF, 이미지 지원)</p>
                  <input type="file" className="hidden" />
                </label>
                <button className="bg-indigo-600 text-white rounded-[2rem] font-black text-sm hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 min-h-[120px]">
                  분석 시작
                </button>
              </div>
            </div>

            {/* 2. 전체 진도 대비 달성률 */}
            <div className={`p-10 rounded-[3.5rem] border ${t.card}`}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-500 border border-indigo-500/20"><Flag size={22} /></div>
                <div>
                  <h3 className="text-xl font-black italic uppercase">전체 진도 대비 달성률</h3>
                  <p className={`text-xs font-bold mt-0.5 ${t.textMuted}`}>
                    {startDate && endDate ? `${startDate} ~ ${endDate} · 총 ${totalDays}일` : 'Study Setup에서 기간을 설정하면 자동 계산됩니다'}
                  </p>
                </div>
                {startDate && endDate && totalDays > 0 && (
                  <div className={`ml-auto px-4 py-2 rounded-2xl border text-xs font-black uppercase tracking-wider
                    ${gap >= 0 ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400' : 'bg-rose-500/15 border-rose-500/25 text-rose-400'}`}>
                    {gap >= 0 ? `+${gap}% 앞서감` : `${gap}% 뒤처짐`}
                  </div>
                )}
              </div>

              <div className="space-y-5 mb-10">
                {[
                  { label: '기간 경과', pct: periodPct, color: 'bg-slate-400', right: `${elapsedDays}/${totalDays}일${remainingDays > 0 ? ` (${remainingDays}일 남음)` : ''}` },
                  { label: '실제 달성률', pct: donePct, color: gap >= 0 ? 'bg-indigo-500' : 'bg-rose-500', right: `${donePct}%` },
                ].map(bar => (
                  <div key={bar.label} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-black uppercase tracking-widest ${t.textMuted}`}>{bar.label}</span>
                      <span className={`text-xs font-black tabular-nums ${t.textMuted}`}>{bar.right}</span>
                    </div>
                    <div className={`h-3 w-full rounded-full overflow-hidden ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                      <div className={`h-full rounded-full transition-all duration-1000 ${bar.color}`} style={{ width: `${bar.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: '경과 일수',   value: totalDays > 0 ? `${elapsedDays}일` : '—',  color: 'text-blue-400',    icon: <Clock size={18} className="text-blue-400" /> },
                  { label: '남은 일수',   value: endDate ? `${remainingDays}일` : '—',       color: 'text-amber-400',   icon: <Target size={18} className="text-amber-400" /> },
                  { label: '기간 진행률', value: totalDays > 0 ? `${periodPct}%` : '—',      color: 'text-slate-400',   icon: <BarChart3 size={18} className="text-slate-400" /> },
                  { label: '실제 달성률', value: `${donePct}%`, color: gap >= 0 ? 'text-emerald-400' : 'text-rose-400', icon: <Flame size={18} className={gap >= 0 ? 'text-emerald-400' : 'text-rose-400'} /> },
                ].map(s => (
                  <div key={s.label} className={`p-5 rounded-[1.75rem] border space-y-3 ${t.subCard}`}>
                    {s.icon}
                    <p className={`text-2xl font-black tabular-nums tracking-tight ${s.color}`}>{s.value}</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. AI 진도 체크리스트 + My Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* AI 체크리스트 */}
              <div className={`p-10 rounded-[3.5rem] border ${t.card}`}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${t.textMuted}`}>
                      <Zap size={12} className="text-indigo-400 fill-indigo-400" />
                      Today's AI Guide
                    </p>
                    <h4 className="text-xl font-black italic uppercase">AI 오늘의 진도</h4>
                  </div>
                  <div className={`shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-2xl border-2
                    ${aiPct === 100 ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400' : dark ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-indigo-50 border-indigo-200 text-indigo-600'}`}>
                    <span className="text-xl font-black leading-none">{aiPct}</span>
                    <span className="text-[9px] font-black opacity-60">%</span>
                  </div>
                </div>
                <div className={`h-1.5 w-full rounded-full mb-6 overflow-hidden ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                  <div className="h-full rounded-full bg-indigo-500 transition-all duration-700" style={{ width: `${aiPct}%` }} />
                </div>
                <div className="space-y-3">
                  {aiTasks.map((task, idx) => (
                    <button key={task.id} onClick={() => toggleAiTask(task.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-[1.25rem] border text-left transition-all
                        ${task.done ? (dark ? 'bg-emerald-500/8 border-emerald-500/15 opacity-50' : 'bg-emerald-50 border-emerald-100 opacity-50') : t.subCard}`}>
                      <div className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black transition-all
                        ${task.done ? 'bg-emerald-500 text-white' : dark ? 'bg-slate-800 text-slate-500 border border-slate-700' : 'bg-slate-100 text-slate-400'}`}>
                        {task.done ? <CheckCircle size={14} /> : idx + 1}
                      </div>
                      <p className={`flex-1 text-sm font-bold ${task.done ? 'line-through opacity-40' : ''}`}>{task.text}</p>
                      <span className={`shrink-0 px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase ${task.tagColor}`}>{task.tag}</span>
                    </button>
                  ))}
                </div>
                <p className={`mt-5 text-xs font-bold ${t.textMuted}`}>
                  {aiDone}/{aiTasks.length} 완료
                  {aiPct === 100 && <span className="ml-2 text-emerald-400">🎉 오늘 목표 달성!</span>}
                </p>
              </div>

              {/* My Schedule */}
              <div className={`p-10 rounded-[3.5rem] border ${t.card}`}>
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="text-blue-400" size={22} />
                  <h4 className="text-xl font-black italic uppercase">My Schedule</h4>
                </div>
                <div className="space-y-3 max-h-[300px] overflow-y-auto mb-6">
                  {manTasks.map(task => (
                    <div key={task.id} className={`flex items-center gap-4 p-4 rounded-[1.25rem] border group transition-all ${t.subCard}`}>
                      <button onClick={() => toggleManTask(task.id)}
                        className={`shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all
                          ${task.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-600 text-transparent'}`}>
                        <CheckCircle size={14} />
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold truncate ${task.done ? 'opacity-30 line-through' : ''}`}>{task.text}</p>
                        {task.time && <p className={`text-[10px] font-bold mt-0.5 ${t.textMuted}`}>{task.time}</p>}
                      </div>
                      <button onClick={() => delManTask(task.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-500 transition-all">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className={`pt-5 border-t flex gap-3 ${t.divider}`}>
                  <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addManTask()} placeholder="일정 입력 후 Enter"
                    className={`flex-1 rounded-2xl px-5 py-3.5 text-sm font-bold outline-none border-2 transition-all ${t.input}`} />
                  <button onClick={addManTask} className="bg-indigo-600 text-white px-6 rounded-2xl hover:bg-indigo-700 transition-all">
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. AI 학습 제안 스택 */}
            <div className={`p-10 rounded-[3.5rem] border ${t.card} space-y-7`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                    <Brain size={26} className="text-indigo-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-2xl font-black italic uppercase">AI 학습 제안</h4>
                      {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black">{unreadCount}</span>
                      )}
                    </div>
                    <p className={`text-xs font-bold mt-0.5 ${t.textMuted}`}>학습 패턴을 분석해 실시간으로 제안을 드립니다</p>
                  </div>
                </div>
                {/* 새 제안 받기 — onClick은 실제 구현 시 API 연결 */}
                <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs flex items-center gap-2 transition-all active:scale-[0.98]">
                  <Zap size={13} /> 새 제안 받기
                </button>
              </div>

              <div className="space-y-4">
                {studySugg.length === 0 && (
                  <div className={`flex flex-col items-center justify-center py-12 gap-3 rounded-3xl border border-dashed ${dark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <Brain size={28} className="opacity-20" />
                    <p className={`text-sm font-bold opacity-40 ${t.textMuted}`}>제안이 모두 확인되었습니다</p>
                  </div>
                )}
                {studySugg.map(s => {
                  const st = STUDY_SUGG_STYLE[s.type];
                  return (
                    <div key={s.id} className={`p-6 rounded-3xl border transition-all ${st.border} ${!s.read ? 'ring-1 ring-indigo-500/20' : ''}`}>
                      <div className="flex items-start gap-4">
                        <div className={`shrink-0 w-9 h-9 rounded-2xl border flex items-center justify-center ${st.badge}`}>{st.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <p className="text-sm font-black">{s.title}</p>
                            {!s.read && <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-[9px] font-black uppercase">NEW</span>}
                            <span className={`px-2.5 py-0.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${st.badge}`}>{st.label}</span>
                          </div>
                          <p className={`text-xs font-bold leading-relaxed ${t.textMuted}`}>{s.body}</p>
                          <p className={`text-[10px] font-bold mt-2 opacity-40 ${t.textMuted}`}>{s.time}</p>
                        </div>
                        <div className="shrink-0 flex flex-col gap-1.5">
                          {!s.read && (
                            <button onClick={() => markStudyRead(s.id)}
                              className={`px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all ${t.subCard} ${t.textMuted} hover:border-indigo-400 hover:text-indigo-400`}>
                              확인
                            </button>
                          )}
                          <button onClick={() => dismissStudySugg(s.id)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all ${t.subCard} ${t.textMuted} hover:border-rose-400 hover:text-rose-400`}>
                            닫기
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════
            FITNESS MODE
        ══════════════════════════════ */}
        {mode === 'fitness' && (
          <div className="space-y-10">

            {/* 상단 요약 */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[
                { label: '소모 칼로리', value: burnedCal,    unit: 'kcal', icon: <Flame size={20} className="text-orange-400" />, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
                { label: '운동 시간',   value: totalMin,     unit: '분',   icon: <Clock size={20} className="text-violet-400" />, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
                { label: '현재 체중',   value: latestWeight, unit: 'kg',   icon: <Scale size={20} className="text-blue-400" />,   color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20' },
              ].map(s => (
                <div key={s.label} className={`p-6 rounded-[2rem] border ${t.card} space-y-3`}>
                  <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center ${s.bg}`}>{s.icon}</div>
                  <p className={`text-2xl font-black tabular-nums tracking-tight ${s.color}`}>
                    {s.value}<span className="text-sm font-bold opacity-60 ml-1">{s.unit}</span>
                  </p>
                  <p className={`text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* 운동 기록 + 체중 기록 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* 운동 기록 */}
              <div className={`p-10 rounded-[3.5rem] border ${t.card} space-y-6`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20"><Dumbbell size={22} className="text-orange-400" /></div>
                  <div>
                    <h3 className="text-xl font-black italic uppercase">운동 기록</h3>
                    <p className={`text-xs font-bold ${t.textMuted}`}>오늘 한 운동을 자유롭게 기록하세요</p>
                  </div>
                </div>

                {/* 부위 선택 */}
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>부위 선택 (선택)</label>
                  <div className="flex flex-wrap gap-2">
                    {BODY_PARTS.map(p => (
                      <button key={p} onClick={() => togglePart(p)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-black border transition-all active:scale-95
                          ${selParts.includes(p) ? 'bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-500/25' : `${t.subCard} ${t.textMuted} hover:border-orange-400`}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 시간 */}
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>전체 운동 시간 (분)</label>
                  <input type="number" value={workoutMin} onChange={e => setWorkoutMin(e.target.value)} placeholder="예) 60"
                    className={`w-full rounded-2xl px-5 py-4 font-bold text-sm outline-none border-2 transition-all ${t.input}`} />
                  {workoutMin && (
                    <p className={`text-[11px] font-bold ${t.textMuted}`}>
                      예상 소모: <span className="text-orange-400 font-black">{Math.round(Number(workoutMin) * 6.5)} kcal</span>
                    </p>
                  )}
                </div>

                {/* 메모 */}
                <div className="space-y-2">
                  <label className={`text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>운동 내용</label>
                  <textarea rows={3} value={workoutMemo} onChange={e => setWorkoutMemo(e.target.value)}
                    placeholder={'예) 벤치프레스 5×5, 스쿼트 4×8\n런닝 20분...'}
                    className={`w-full rounded-2xl px-5 py-4 font-bold text-sm outline-none border-2 transition-all resize-none ${t.input}`} />
                </div>

                <div className="flex gap-3">
                  <button onClick={saveWorkout} disabled={!workoutMin}
                    className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 disabled:opacity-30 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-orange-500/20">
                    <Save size={16} /> 운동 저장
                  </button>
                  <button onClick={resetToday}
                    className={`px-5 py-4 rounded-2xl border font-black text-xs flex items-center gap-2 transition-all hover:border-rose-400 hover:text-rose-400 ${t.subCard} ${t.textMuted}`}>
                    <RefreshCw size={15} />
                  </button>
                </div>

                {todayWorkouts.length > 0 && (
                  <div className="space-y-3">
                    <p className={`text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>오늘 운동 내역</p>
                    {todayWorkouts.map(w => (
                      <div key={w.id} className={`flex items-start gap-4 p-4 rounded-2xl border group transition-all ${t.subCard}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={12} className="text-orange-400 shrink-0" />
                            <span className="text-xs font-black text-orange-400">{w.durationMin}분</span>
                            <span className={`text-xs font-bold ${t.textMuted}`}>· {w.calories}kcal</span>
                          </div>
                          {w.memo && <p className={`text-xs font-bold leading-relaxed whitespace-pre-line ${t.textMuted}`}>{w.memo}</p>}
                        </div>
                        <button onClick={() => delWorkout(w.id)}
                          className="shrink-0 p-2 opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 체중 기록 */}
              <div className={`p-10 rounded-[3.5rem] border ${t.card} space-y-6`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20"><Scale size={22} className="text-blue-400" /></div>
                  <div>
                    <h3 className="text-xl font-black italic uppercase">체중 기록</h3>
                    <p className={`text-xs font-bold ${t.textMuted}`}>오늘의 체중과 체지방률을 기록하세요</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: '체중 (kg)', val: weightInput, set: setWeightInput, ph: `최근 ${latestWeight}kg` },
                    { label: '체지방률 (%)', val: fatInput, set: setFatInput, ph: '예) 18.5' },
                  ].map(inp => (
                    <div key={inp.label} className="space-y-2">
                      <label className={`text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>{inp.label}</label>
                      <input type="number" step="0.1" value={inp.val} onChange={e => inp.set(e.target.value)} placeholder={inp.ph}
                        className={`w-full rounded-2xl px-5 py-4 font-bold text-sm outline-none border-2 transition-all ${t.input}`} />
                    </div>
                  ))}
                </div>

                <button onClick={saveWeight} disabled={!weightInput}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-30 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20">
                  <Save size={16} /> 체중 저장
                </button>

                {/* 체중 추이 */}
                <div className="space-y-3">
                  <p className={`text-[10px] font-black uppercase tracking-widest ${t.textMuted}`}>최근 체중 추이</p>
                  <div className="flex items-end gap-1.5 h-20">
                    {weightLog.map((w, i) => {
                      const h = 20 + ((w.weight - wMin) / wRange) * 80;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                          <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-black bg-slate-900 text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {w.weight}kg
                          </div>
                          <div className="w-full rounded-md bg-blue-500 transition-all duration-700" style={{ height: `${h}%` }} />
                          <span className={`text-[8px] font-bold ${t.textMuted}`}>{w.date.slice(-2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* AI 맞춤 제안 스택 */}
            <div className={`p-10 rounded-[3.5rem] border ${t.card} space-y-7`}>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-4 bg-violet-500/10 rounded-2xl border border-violet-500/20"><Brain size={26} className="text-violet-400" /></div>
                  <div>
                    <h4 className="text-2xl font-black italic uppercase">AI 맞춤 제안</h4>
                    <p className={`text-xs font-bold mt-0.5 ${t.textMuted}`}>운동·체중 데이터를 바탕으로 실시간 제안이 쌓입니다</p>
                  </div>
                </div>
                {/* onClick은 실제 구현 시 API 연결 */}
                <button className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-2xl font-black text-xs flex items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20">
                  <Zap size={13} /> 새 분석 요청
                </button>
              </div>

              <div className="space-y-4">
                {fitSugg.length === 0 && (
                  <div className={`flex flex-col items-center justify-center py-12 gap-3 rounded-3xl border border-dashed ${dark ? 'border-slate-800' : 'border-slate-200'}`}>
                    <Brain size={28} className="opacity-20" />
                    <p className={`text-sm font-bold opacity-40 ${t.textMuted}`}>운동을 기록하면 AI가 분석해드립니다</p>
                  </div>
                )}
                {fitSugg.map(s => {
                  const st = FITNESS_SUGG_STYLE[s.type];
                  return (
                    <div key={s.id} className={`p-6 rounded-3xl border transition-all ${st.border}`}>
                      <div className="flex items-start gap-4">
                        <div className={`shrink-0 w-9 h-9 rounded-2xl border flex items-center justify-center ${st.badge}`}>{st.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1.5">
                            <p className="text-sm font-black">{s.title}</p>
                            <span className={`px-2.5 py-0.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${st.badge}`}>{st.label}</span>
                          </div>
                          <p className={`text-xs font-bold leading-relaxed ${t.textMuted}`}>{s.body}</p>
                          <p className={`text-[10px] font-bold mt-2 opacity-40 ${t.textMuted}`}>{s.time}</p>
                        </div>
                        <button onClick={() => dismissFitSugg(s.id)}
                          className={`shrink-0 px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all ${t.subCard} ${t.textMuted} hover:border-rose-400 hover:text-rose-400`}>
                          닫기
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* Community placeholder */}
        {mode === 'community' && (
          <div className="text-center py-20 opacity-20 font-black uppercase tracking-widest text-indigo-500">
            Community Feed (Coming Soon)
          </div>
        )}

      </main>
    </div>
  );
}