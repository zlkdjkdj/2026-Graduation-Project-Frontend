import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen, Dumbbell, Users, Sun, Moon, Sparkles,
  Upload, Calendar, Trash2, CheckCircle, Plus, Zap,
  BarChart3, Clock, Flag, Target, Flame,
  Scale, RotateCcw, Brain, AlertCircle,
  Save, RefreshCw, Activity, Award, TrendingUp, Lightbulb,
  Loader2, MessageSquare, Heart
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
interface Post     { id: number; author: string; content: string; points: number; timestamp: string; likes: number }
interface RankUser { rank: number; name: string; points: number; isMe?: boolean }
interface RoutineSuccess { name: string; rate: number; color: string }

// ────────────────────────────────────────
//  Theme
// ────────────────────────────────────────
const getTheme = (dark: boolean) => dark
  ? {
      bg:        'bg-[#0a0a0c] text-slate-200',
      nav:       'bg-[#0a0a0c]/80 border-slate-800 backdrop-blur-2xl',
      tabActive: 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] border-indigo-500',
      card:      'bg-[#161618] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
      input:     'bg-[#1c1c1f] border-slate-700 text-slate-100 focus:border-indigo-500',
      subCard:   'bg-[#1c1c1f] border-slate-800 hover:border-slate-700 hover:bg-[#222225]',
      textMuted: 'text-slate-500',
      accent:    'text-indigo-400',
      divider:   'border-slate-800',
      label:     'text-slate-400',
      sectionBg: 'bg-[#111113]',
    }
  : {
      bg:        'bg-[#f8f9fa] text-[#1d1d1f]',
      nav:       'bg-white/80 border-slate-200 backdrop-blur-2xl',
      tabActive: 'bg-white text-indigo-600 shadow-lg border-slate-200',
      card:      'bg-white border-slate-100 shadow-xl',
      input:     'bg-slate-100 border-transparent text-black focus:bg-white focus:ring-2 focus:ring-indigo-500',
      subCard:   'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-white',
      textMuted: 'text-slate-400',
      accent:    'text-indigo-600',
      divider:   'border-slate-100',
      label:     'text-slate-500',
      sectionBg: 'bg-slate-50',
    };

// ────────────────────────────────────────
//  Constants & Seeds
// ────────────────────────────────────────
const BODY_PARTS: BodyPart[] = ['가슴', '등', '어깨', '이두', '삼두', '하체', '복근'];
const TODAY = new Date().toISOString().slice(0, 10);

const MOCK_NEW_STUDY_SUGGESTIONS: Omit<StudySuggestion, 'id' | 'time' | 'read'>[] = [
  { type: 'tip',   title: '수면 직전 10분의 마법',   body: '자기 전 오늘 공부한 핵심 키워드 3개만 복기해보세요. 수면 중 장기 기억 저장 효율이 2배 높아집니다.' },
  { type: 'boost', title: '연속 학습 5일 돌파!',       body: '정말 대단합니다! 어제보다 집중력이 15% 더 안정적인 패턴을 보이고 있습니다.' },
];

const MOCK_RANKING: RankUser[] = [
  { rank: 1,  name: '김코딩', points: 1540 },
  { rank: 2,  name: '박공부', points: 1420 },
  { rank: 3,  name: '이헬스', points: 1280 },
];

const MOCK_ROUTINES: RoutineSuccess[] = [
  { name: '공부 진도 준수',    rate: 82, color: 'bg-indigo-500' },
  { name: '주 4회 이상 운동', rate: 65, color: 'bg-orange-500' },
  { name: '스케줄 달성률',    rate: 90, color: 'bg-emerald-500' },
];

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
//  Reusable sub-components
// ────────────────────────────────────────

/** 섹션 타이틀 – 아이콘 + 제목 + 보조 설명 */
function SectionHeading({ icon, title, sub, action }: {
  icon: React.ReactNode; title: string; sub?: string; action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-500 border border-indigo-500/20 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight uppercase italic leading-tight">{title}</h3>
          {sub && <p className="text-xs font-semibold mt-0.5 opacity-40">{sub}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** 통계 수치 카드 */
function StatCard({ icon, value, unit, label, dark }: {
  icon: React.ReactNode; value: number | string; unit: string; label: string; dark: boolean
}) {
  const t = getTheme(dark);
  return (
    <div className={`p-7 rounded-[2rem] border ${t.card} flex flex-col gap-3`}>
      <div className="flex items-center justify-between">
        <div>{icon}</div>
      </div>
      <div>
        <p className="text-3xl font-black tracking-tight leading-none">
          {value}<span className="text-base font-semibold ml-1.5 opacity-40">{unit}</span>
        </p>
        <p className="text-[11px] font-bold uppercase tracking-widest opacity-40 mt-2">{label}</p>
      </div>
    </div>
  );
}

/** 프로그레스 바 */
function ProgressBar({ label, value, max, color, dark }: {
  label: string; value: number; max: number; color: string; dark: boolean
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest opacity-50">{label}</span>
        <span className="text-xs font-black tabular-nums">
          {value}<span className="opacity-40">/{max}</span>
        </span>
      </div>
      <div className={`h-2.5 w-full rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-1000 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ────────────────────────────────────────
//  Main Component
// ────────────────────────────────────────
export function MainPage() {
  const [mode, setMode] = useState<Mode>('edu');
  const [dark, setDark] = useState(true);
  const t = useMemo(() => getTheme(dark), [dark]);

  const [isAnalyzing,       setIsAnalyzing]       = useState(false);
  const [isRefreshingSugg,  setIsRefreshingSugg]  = useState(false);

  const [userPoints,      setUserPoints]      = useState(720);
  const [posts,           setPosts]           = useState<Post[]>([
    { id: 1, author: '김코딩', content: '오늘 AI 가이드대로 React 훅 공부 완료! +10 포인트 얻었네요.', points: 1540, timestamp: '10분 전', likes: 4 },
    { id: 2, author: '이헬스', content: '하체 데이 끝내고 오운완 인증합니다.', points: 1280, timestamp: '1시간 전', likes: 7 },
  ]);
  const [newPostContent,  setNewPostContent]  = useState('');

  // ── Edu ──
  const [bookTitle, setBookTitle] = useState('React 완벽 가이드');
  const [startDate, setStartDate] = useState('2026-03-01');
  const [endDate,   setEndDate]   = useState('2026-03-31');
  const [totalDays, setTotalDays] = useState(31);
  const [aiTasks,   setAiTasks]   = useState<AiGuideTask[]>([]);
  const [manTasks,  setManTasks]  = useState<Task[]>([]);
  const [newTask,   setNewTask]   = useState('');
  const [studySugg, setStudySugg] = useState<StudySuggestion[]>([]);

  // ── Fitness ──
  const [selParts,    setSelParts]    = useState<BodyPart[]>([]);
  const [workoutMin,  setWorkoutMin]  = useState('');
  const [workoutMemo, setWorkoutMemo] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [fatInput,    setFatInput]    = useState('');
  const [workouts,    setWorkouts]    = useState<WorkoutLog[]>([]);
  const [weightLog,   setWeightLog]   = useState<WeightEntry[]>([]);
  const [fitSugg,     setFitSugg]     = useState<FitnessSuggestion[]>([]);

  useEffect(() => {
    setAiTasks([
      { id: 1, text: '오후 3시 — 컴포넌트 생명주기 복습', done: false, tag: '우선순위', tagColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20' },
      { id: 2, text: '암기 효율 피크 타임 활용하기',     done: true,  tag: 'AI 추천',  tagColor: 'bg-violet-500/15 text-violet-400 border-violet-500/20' },
    ]);
    setStudySugg([{
      id: 1, type: 'tip', read: false,
      title: '지금이 집중력 피크 타임이에요',
      body:  '오후 2~4시는 골든 타임입니다. 암기 위주 학습을 권장합니다.',
      time: '14:02'
    }]);
    setWeightLog([
      { date: '03-18', weight: 75.2 },
      { date: '03-19', weight: 74.8 },
      { date: '03-20', weight: 74.5 },
      { date: '03-21', weight: 74.3 },
    ]);
    setFitSugg([{
      id: 1, type: 'praise',
      title: '오늘 운동량 충분합니다 💪',
      body:  '소모 칼로리 목표치를 이미 달성했습니다!',
      time: '방금'
    }]);
  }, []);

  // ── Derived values ──
  const elapsedDays = (() => {
    if (!startDate || !totalDays) return 0;
    const d = Math.floor((Date.now() - new Date(startDate).getTime()) / 86400000) + 1;
    return Math.max(0, Math.min(d, totalDays));
  })();
  const remainingDays = (() => {
    if (!endDate) return 0;
    return Math.max(0, Math.floor((new Date(endDate).getTime() - Date.now()) / 86400000));
  })();
  const periodPct  = totalDays > 0 ? Math.round((elapsedDays / totalDays) * 100) : 0;
  const allTasks   = [...aiTasks, ...manTasks];
  const donePct    = allTasks.length > 0 ? Math.round(allTasks.filter(x => x.done).length / allTasks.length * 100) : 0;
  const gap        = donePct - periodPct;
  const aiDone     = aiTasks.filter(x => x.done).length;
  const aiPct      = aiTasks.length > 0 ? Math.round(aiDone / aiTasks.length * 100) : 0;

  const todayWorkouts = workouts.filter(w => w.date === TODAY);
  const burnedCal     = todayWorkouts.reduce((s, w) => s + w.calories, 0);
  const totalMin      = todayWorkouts.reduce((s, w) => s + w.durationMin, 0);
  const latestWeight  = weightLog[weightLog.length - 1]?.weight ?? 0;
  const wMin   = Math.min(...weightLog.map(w => w.weight), 0);
  const wMax   = Math.max(...weightLog.map(w => w.weight), 100);
  const wRange = wMax - wMin || 1;

  // ── Actions ──
  const earnPoints = () => setUserPoints(prev => prev + 10);

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => { setIsAnalyzing(false); alert('AI 분석 완료!'); }, 2000);
  };

  const handleRefreshStudySugg = () => {
    setIsRefreshingSugg(true);
    setTimeout(() => {
      const r = MOCK_NEW_STUDY_SUGGESTIONS[Math.floor(Math.random() * MOCK_NEW_STUDY_SUGGESTIONS.length)];
      setStudySugg(prev => [{ ...r, id: Date.now(), time: '방금', read: false }, ...prev]);
      setIsRefreshingSugg(false);
    }, 1200);
  };

  const toggleAiTask  = (id: number) => setAiTasks(p => p.map(x => { if (x.id === id && !x.done) earnPoints(); return x.id === id ? { ...x, done: !x.done } : x; }));
  const toggleManTask = (id: number) => setManTasks(p => p.map(x => { if (x.id === id && !x.done) earnPoints(); return x.id === id ? { ...x, done: !x.done } : x; }));
  const addManTask    = () => { if (!newTask.trim()) return; setManTasks(p => [...p, { id: Date.now(), text: newTask, done: false, time: '방금' }]); setNewTask(''); };
  const delManTask    = (id: number) => setManTasks(p => p.filter(x => x.id !== id));
  const dismissStudySugg = (id: number) => setStudySugg(p => p.filter(x => x.id !== id));

  const togglePart  = (p: BodyPart) => setSelParts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  const saveWorkout = () => {
    if (!workoutMin) return;
    setWorkouts(p => [...p, { id: Date.now(), date: TODAY, durationMin: Number(workoutMin), calories: Math.round(Number(workoutMin) * 6.5), memo: workoutMemo }]);
    earnPoints();
    setWorkoutMin(''); setWorkoutMemo(''); setSelParts([]);
  };
  const saveWeight = () => {
    if (!weightInput) return;
    setWeightLog(p => [...p, { date: TODAY.slice(5), weight: Number(weightInput), bodyFat: fatInput ? Number(fatInput) : undefined }]);
    setWeightInput(''); setFatInput('');
  };
  const dismissFitSugg = (id: number) => setFitSugg(p => p.filter(x => x.id !== id));
  const handleAddPost  = () => {
    if (!newPostContent.trim()) return;
    setPosts([{ id: Date.now(), author: '나(재현)', content: newPostContent, points: userPoints, timestamp: '방금', likes: 0 }, ...posts]);
    setNewPostContent('');
  };

  // ──────────────────────────────────────
  //  Render
  // ──────────────────────────────────────
  return (
    <div className={`min-h-screen w-full transition-colors duration-500 font-sans ${t.bg}`}>

      {/* ── Header ── */}
      <header className={`fixed top-0 inset-x-0 z-50 border-b ${t.nav}`}>
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg shrink-0">
              <Sparkles className="text-white" size={22} />
            </div>
            <h1 className="text-xl font-black italic tracking-tighter uppercase opacity-90 leading-none">
              Learn-Time AI
            </h1>
          </div>

          <nav className={`hidden md:flex p-1.5 rounded-2xl border ${dark ? 'bg-black/40 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
            {(['edu', 'fitness', 'community'] as Mode[]).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex items-center gap-2.5 px-7 py-2.5 rounded-xl transition-all text-[13px] font-bold uppercase tracking-wide
                  ${mode === m ? t.tabActive : `${t.textMuted} hover:text-indigo-400`}`}>
                {m === 'edu' ? <BookOpen size={15} /> : m === 'fitness' ? <Dumbbell size={15} /> : <Users size={15} />}
                {m === 'edu' ? 'Study' : m === 'fitness' ? 'Workout' : 'Community'}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className={`hidden sm:inline text-xs font-black tabular-nums ${t.accent}`}>{userPoints} PT</span>
            <button onClick={() => setDark(d => !d)}
              className={`p-2.5 rounded-xl border transition-all ${dark ? 'text-yellow-400 border-slate-700 hover:bg-slate-800' : 'text-indigo-600 border-slate-200 hover:bg-slate-100'}`}>
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-6xl mx-auto pt-36 pb-28 px-6 md:px-8">

        {/* Page header */}
        <div className="flex items-center gap-6 mb-14">
          <div className={`p-6 rounded-[2rem] border shadow-2xl shrink-0 ${t.card}`}>
            <Sparkles className="text-yellow-400 animate-pulse" size={36} />
          </div>
          <div>
            <h2 className={`font-black tracking-tight uppercase italic leading-none ${dark ? 'text-white' : 'text-slate-900'}`}
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
              {mode === 'edu' ? 'EduVibe' : mode === 'fitness' ? 'Exercise' : 'Community'}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] font-bold opacity-40 uppercase tracking-[0.35em]">AI Real-time Analysis</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse inline-block" />
              <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">{userPoints} Total Points</span>
            </div>
          </div>
        </div>

        {/* ══ EDU MODE ══ */}
        {mode === 'edu' && (
          <div className="space-y-8 animate-slideUp">

            {/* Study Setup */}
            <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card}`}>
              <SectionHeading icon={<BookOpen size={24} />} title="Study Setup" sub="학습 목표와 기간을 입력하세요" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {[
                  { label: '책 제목',   type: 'text',   val: bookTitle,  set: setBookTitle },
                  { label: '시작일',    type: 'date',   val: startDate,  set: setStartDate },
                  { label: '종료일',    type: 'date',   val: endDate,    set: setEndDate },
                  { label: '총 일수',   type: 'number', val: String(totalDays), set: (v: string) => setTotalDays(Number(v)) },
                ].map(({ label, type, val, set }) => (
                  <div key={label} className="space-y-2">
                    <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>{label}</label>
                    <input type={type} value={val} onChange={e => set(e.target.value)}
                      className={`w-full rounded-2xl px-5 py-3.5 font-semibold text-sm outline-none border-2 transition-all ${t.input}`} />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <label className={`lg:col-span-2 border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center gap-3 group cursor-pointer transition-all
                  ${dark ? 'border-slate-800 hover:border-indigo-500 hover:bg-slate-800/40' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'}`}>
                  <Upload size={32} className={`${t.textMuted} group-hover:text-indigo-500 transition-colors`} />
                  <p className={`font-semibold text-sm ${t.textMuted}`}>자료 업로드 (PDF / 이미지)</p>
                  <p className={`text-xs ${t.textMuted} opacity-60`}>클릭하거나 파일을 드래그하세요</p>
                  <input type="file" className="hidden" />
                </label>
                <button onClick={handleStartAnalysis} disabled={isAnalyzing}
                  className="bg-indigo-600 text-white rounded-[2rem] font-black text-base hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-600/25
                    flex flex-col items-center justify-center gap-3 min-h-[140px]">
                  {isAnalyzing ? <Loader2 className="animate-spin" size={28} /> : <Sparkles size={28} />}
                  <span className="text-sm tracking-widest uppercase">{isAnalyzing ? '분석 중...' : '분석 시작'}</span>
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card}`}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-500 border border-indigo-500/20">
                    <Flag size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black italic uppercase">전체 진도 대비 달성률</h3>
                    <p className={`text-xs font-semibold mt-0.5 opacity-40`}>기간 대비 실제 학습 완료율</p>
                  </div>
                </div>
                {startDate && endDate && (
                  <div className={`px-4 py-2 rounded-2xl border text-xs font-black uppercase tracking-wide
                    ${gap >= 0 ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-400' : 'bg-rose-500/15 border-rose-500/25 text-rose-400'}`}>
                    {gap >= 0 ? `+${gap}% 앞서감` : `${gap}% 뒤처짐`}
                  </div>
                )}
              </div>
              <div className="space-y-6">
                <ProgressBar label="기간 진행" value={elapsedDays} max={totalDays} color="bg-slate-400" dark={dark} />
                <ProgressBar label="실제 달성" value={donePct} max={100} color={gap >= 0 ? 'bg-indigo-500' : 'bg-rose-500'} dark={dark} />
              </div>
              {/* Quick stats */}
              <div className={`grid grid-cols-3 gap-4 mt-8 pt-8 border-t ${t.divider}`}>
                {[
                  { label: '경과 일수', value: `${elapsedDays}일` },
                  { label: '남은 일수', value: `${remainingDays}일` },
                  { label: 'AI 달성률', value: `${aiPct}%` },
                ].map(s => (
                  <div key={s.label} className={`${t.sectionBg} rounded-2xl p-4 text-center`}>
                    <p className="text-xl font-black">{s.value}</p>
                    <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${t.label}`}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* AI Guide */}
              <div className={`p-8 md:p-10 rounded-[3rem] border ${t.card}`}>
                <SectionHeading icon={<Zap size={22} />} title="AI 오늘의 가이드" sub="AI가 분석한 오늘의 추천 학습 항목" />
                <div className="space-y-3">
                  {aiTasks.map(task => (
                    <button key={task.id} onClick={() => toggleAiTask(task.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left
                        ${task.done ? `opacity-40 ${dark ? 'bg-slate-800/30' : 'bg-slate-100'} border-transparent` : t.subCard}`}>
                      <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors
                        ${task.done ? 'bg-indigo-600 text-white' : dark ? 'bg-slate-700 border border-slate-600' : 'bg-slate-200'}`}>
                        {task.done && <CheckCircle size={14} />}
                      </div>
                      <span className={`flex-1 text-sm font-semibold leading-snug ${task.done ? 'line-through' : ''}`}>{task.text}</span>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${task.tagColor}`}>{task.tag}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* My Schedule */}
              <div className={`p-8 md:p-10 rounded-[3rem] border ${t.card}`}>
                <SectionHeading icon={<Calendar size={22} />} title="My Schedule" sub="직접 추가하는 오늘의 할 일" />

                <div className="space-y-2.5 mb-5 max-h-52 overflow-y-auto pr-1">
                  {manTasks.length === 0
                    ? <p className={`text-sm font-semibold py-10 text-center ${t.textMuted}`}>등록된 일정이 없습니다.</p>
                    : manTasks.map(task => (
                        <div key={task.id} className={`flex items-center gap-3 p-4 rounded-2xl border ${dark ? 'bg-slate-800/25 border-slate-800' : 'bg-slate-50 border-slate-100'}`}>
                          <button onClick={() => toggleManTask(task.id)}
                            className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all shrink-0
                              ${task.done ? 'bg-indigo-600 border-indigo-600' : dark ? 'border-slate-600' : 'border-slate-300'}`}>
                            {task.done && <CheckCircle size={12} className="text-white" />}
                          </button>
                          <span className={`flex-1 text-sm font-semibold leading-snug ${task.done ? 'line-through opacity-30' : ''}`}>{task.text}</span>
                          <button onClick={() => delManTask(task.id)} className={`${t.textMuted} hover:text-rose-500 transition-colors p-1`}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))
                  }
                </div>

                <div className="flex gap-2">
                  <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addManTask()}
                    placeholder="새 할 일을 입력하세요..."
                    className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold outline-none border-2 transition-all ${t.input}`} />
                  <button onClick={addManTask} className="bg-indigo-600 px-4 rounded-xl hover:bg-indigo-700 active:scale-95 transition-all text-white">
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* AI Study Suggestions */}
            <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card} space-y-6`}>
              <SectionHeading
                icon={<Brain size={24} />}
                title="AI 학습 제안"
                sub="데이터 기반으로 생성된 맞춤 학습 코칭"
                action={
                  <button onClick={handleRefreshStudySugg} disabled={isRefreshingSugg}
                    className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-bold text-xs transition-all active:scale-95 hover:bg-indigo-700">
                    {isRefreshingSugg ? <Loader2 className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                    새 제안 받기
                  </button>
                }
              />
              <div className="space-y-4">
                {studySugg.map(s => {
                  const style = STUDY_SUGG_STYLE[s.type];
                  return (
                    <div key={s.id} className={`p-5 rounded-3xl border ${style.border} flex items-start gap-4`}>
                      <div className={`p-3 rounded-2xl border shrink-0 ${style.badge}`}>{style.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-sm font-bold leading-tight">{s.title}</span>
                          {!s.read && <span className="bg-indigo-600 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wide shrink-0">NEW</span>}
                        </div>
                        <p className={`text-xs font-medium leading-relaxed ${t.textMuted}`}>{s.body}</p>
                        <p className={`text-[10px] font-bold mt-2 opacity-40 uppercase tracking-widest`}>{s.time}</p>
                      </div>
                      <button onClick={() => dismissStudySugg(s.id)} className={`${t.textMuted} hover:text-rose-400 transition-colors p-1 shrink-0`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══ FITNESS MODE ══ */}
        {mode === 'fitness' && (
          <div className="space-y-8 animate-slideUp">

            {/* Stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <StatCard icon={<Flame className="text-orange-400" size={24} />} value={burnedCal} unit="kcal" label="소모 칼로리" dark={dark} />
              <StatCard icon={<Clock className="text-violet-400" size={24} />} value={totalMin}  unit="분"    label="오늘 운동 시간" dark={dark} />
              <StatCard icon={<Scale className="text-blue-400" size={24} />}  value={latestWeight} unit="kg" label="현재 체중" dark={dark} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Workout log */}
              <div className={`p-8 md:p-10 rounded-[3rem] border ${t.card} space-y-6`}>
                <SectionHeading icon={<Dumbbell size={22} />} title="운동 기록" sub="오늘 진행한 운동을 기록하세요" />

                <div>
                  <p className={`text-[11px] font-black uppercase tracking-widest mb-3 ${t.label}`}>운동 부위 선택</p>
                  <div className="flex flex-wrap gap-2">
                    {BODY_PARTS.map(p => (
                      <button key={p} onClick={() => togglePart(p)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all
                          ${selParts.includes(p) ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' : `border-slate-700 ${t.textMuted} hover:border-orange-500`}`}>
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>운동 시간 (분)</label>
                  <input type="number" value={workoutMin} onChange={e => setWorkoutMin(e.target.value)}
                    placeholder="예: 60"
                    className={`w-full rounded-2xl px-5 py-3.5 font-semibold text-sm outline-none border-2 transition-all ${t.input}`} />
                </div>

                <div className="space-y-3">
                  <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>운동 내용 메모</label>
                  <textarea rows={3} value={workoutMemo} onChange={e => setWorkoutMemo(e.target.value)}
                    placeholder="오늘 한 운동을 간단히 메모해보세요..."
                    className={`w-full rounded-2xl px-5 py-3.5 font-semibold text-sm resize-none outline-none border-2 transition-all ${t.input}`} />
                </div>

                <button onClick={saveWorkout}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2">
                  <Save size={18} /> 운동 저장 (+10 PT)
                </button>

                {/* Today's logs */}
                {todayWorkouts.length > 0 && (
                  <div className={`pt-5 border-t ${t.divider} space-y-3`}>
                    <p className={`text-[11px] font-black uppercase tracking-widest ${t.label}`}>오늘 기록 ({todayWorkouts.length}건)</p>
                    {todayWorkouts.map(w => (
                      <div key={w.id} className={`p-4 rounded-2xl ${t.sectionBg} flex items-center justify-between`}>
                        <div>
                          <p className="text-sm font-bold">{w.durationMin}분 운동</p>
                          {w.memo && <p className={`text-xs mt-0.5 ${t.textMuted}`}>{w.memo}</p>}
                        </div>
                        <span className="text-xs font-black text-orange-400">{w.calories} kcal</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Fitness suggestions */}
                {fitSugg.length > 0 && (
                  <div className={`pt-5 border-t ${t.divider} space-y-3`}>
                    <p className={`text-[11px] font-black uppercase tracking-widest ${t.label}`}>AI 코치 피드백</p>
                    {fitSugg.map(s => {
                      const style = FITNESS_SUGG_STYLE[s.type];
                      return (
                        <div key={s.id} className={`p-4 rounded-2xl border ${style.border} flex items-start gap-3`}>
                          <div className={`p-2.5 rounded-xl border ${style.badge} shrink-0`}>{style.icon}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold leading-tight">{s.title}</p>
                            <p className={`text-xs mt-1 font-medium ${t.textMuted}`}>{s.body}</p>
                          </div>
                          <button onClick={() => dismissFitSugg(s.id)} className={`${t.textMuted} hover:text-rose-400 transition-colors p-1 shrink-0`}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Weight tracking */}
              <div className={`p-8 md:p-10 rounded-[3rem] border ${t.card} space-y-6`}>
                <SectionHeading icon={<Scale size={22} />} title="체중 관리" sub="체중과 체지방률을 꾸준히 기록하세요" />

                <div className="flex gap-3">
                  <div className="flex-1 space-y-2">
                    <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>체중 (kg)</label>
                    <input type="number" step="0.1" value={weightInput} onChange={e => setWeightInput(e.target.value)}
                      placeholder="74.5"
                      className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold outline-none border-2 transition-all ${t.input}`} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>체지방 (%)</label>
                    <input type="number" step="0.1" value={fatInput} onChange={e => setFatInput(e.target.value)}
                      placeholder="선택"
                      className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold outline-none border-2 transition-all ${t.input}`} />
                  </div>
                </div>
                <button onClick={saveWeight}
                  className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2">
                  <Save size={16} /> 체중 저장
                </button>

                {/* Chart */}
                <div className={`pt-5 border-t ${t.divider}`}>
                  <p className={`text-[11px] font-black uppercase tracking-widest ${t.label} mb-4`}>최근 체중 추이</p>
                  <div className="flex items-end justify-between gap-2 h-28">
                    {weightLog.slice(-7).map((w, i) => {
                      const h = ((w.weight - wMin) / wRange) * 100 + 20;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                          <span className="absolute -top-5 text-[10px] font-black text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {w.weight}kg
                          </span>
                          <div className="w-full bg-indigo-600/40 group-hover:bg-indigo-500 rounded-t-xl transition-colors" style={{ height: `${h}%` }} />
                          <span className={`text-[9px] font-bold ${t.textMuted}`}>{w.date}</span>
                        </div>
                      );
                    })}
                  </div>
                  {weightLog.length > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <span className={`text-xs font-semibold ${t.textMuted}`}>최근 변화</span>
                      <span className={`text-sm font-black ${
                        weightLog[weightLog.length - 1].weight < weightLog[weightLog.length - 2].weight
                          ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {(weightLog[weightLog.length - 1].weight - weightLog[weightLog.length - 2].weight).toFixed(1)} kg
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ COMMUNITY MODE ══ */}
        {mode === 'community' && (
          <div className="space-y-8 animate-slideUp">

            {/* Stack Up hero */}
            <div className={`p-8 md:p-12 rounded-[3rem] border ${t.card} bg-gradient-to-br from-indigo-600/10 to-purple-600/10 border-indigo-500/20`}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                <div className="space-y-4">
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-indigo-400">Personal Growth Progress</p>
                  <h3 className="font-black italic uppercase tracking-tighter leading-none"
                    style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
                    Stacking Up Your Worth
                  </h3>
                  <p className={`text-sm font-semibold leading-relaxed max-w-xs ${t.textMuted}`}>
                    학습과 운동을 완료할 때마다 포인트가 쌓이고 레벨이 올라갑니다.
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-1">
                    <div className="px-4 py-2 bg-indigo-600 rounded-xl text-xs font-black shadow-lg shadow-indigo-600/25 text-white">
                      LV. {Math.floor(userPoints / 100)}
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-xs font-black border ${dark ? 'border-slate-700 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
                      {userPoints} Total Points
                    </div>
                  </div>
                </div>
                {/* Point orb */}
                <div className="relative shrink-0">
                  <div className={`w-40 h-40 rounded-full border-8 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(79,70,229,0.3)]
                    ${dark ? 'border-slate-800 bg-[#0a0a0c]' : 'border-slate-100 bg-white'}`}>
                    <span className="text-4xl font-black italic">{userPoints}</span>
                    <span className={`text-[10px] font-black opacity-30 tracking-widest uppercase mt-1`}>Points</span>
                  </div>
                  <div className="absolute -top-2 -right-2 bg-yellow-400 p-2.5 rounded-2xl shadow-xl animate-bounce">
                    <Zap className="text-black fill-black" size={22} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Leaderboard */}
              <div className={`p-8 rounded-[3rem] border ${t.card}`}>
                <SectionHeading icon={<Award size={22} />} title="Challengers" sub="이번 달 포인트 랭킹" />
                <div className="space-y-3">
                  {MOCK_RANKING.concat([{ rank: 14, name: '나(재현)', points: userPoints, isMe: true }]).map(u => (
                    <div key={u.name}
                      className={`flex items-center justify-between p-4 rounded-2xl border transition-all
                        ${u.isMe
                          ? 'bg-indigo-600/20 border-indigo-500/50 ring-1 ring-indigo-500/30'
                          : t.subCard}`}>
                      <div className="flex items-center gap-3.5">
                        <span className={`text-sm font-black w-6 text-center tabular-nums ${u.rank <= 3 ? 'text-yellow-400' : 'opacity-30'}`}>
                          {u.rank}
                        </span>
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black
                          ${dark ? 'bg-slate-800' : 'bg-slate-100'}`}>
                          {u.name[0]}
                        </div>
                        <span className="text-sm font-semibold">{u.name}</span>
                      </div>
                      <span className="text-xs font-black tabular-nums text-indigo-400">{u.points} PT</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Routine Stats */}
              <div className={`p-8 rounded-[3rem] border ${t.card} lg:col-span-2`}>
                <SectionHeading icon={<TrendingUp size={22} />} title="Routine Success Rate" sub="루틴별 달성률 통계" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                  {MOCK_ROUTINES.map(r => (
                    <div key={r.name} className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className={`text-sm font-semibold ${t.textMuted}`}>{r.name}</span>
                        <span className="text-base font-black tabular-nums">{r.rate}%</span>
                      </div>
                      <div className={`h-5 w-full rounded-full overflow-hidden p-1 border ${dark ? 'bg-slate-800/50 border-white/5' : 'bg-slate-100 border-slate-200'}`}>
                        <div className={`h-full rounded-full transition-all duration-1000 ${r.color} shadow-[0_0_10px_rgba(255,255,255,0.1)]`}
                          style={{ width: `${r.rate}%` }} />
                      </div>
                    </div>
                  ))}
                  <div className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-3xl
                    ${dark ? 'border-slate-800 opacity-20' : 'border-slate-200 opacity-30'}`}>
                    <Plus size={18} className="mb-1.5" />
                    <span className="text-[10px] font-black uppercase tracking-wide">Add Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Post composer */}
            <div className={`p-7 rounded-[2.5rem] border ${t.card}`}>
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-[1rem] bg-indigo-600 flex items-center justify-center font-black text-white text-sm shadow-xl shadow-indigo-600/25">
                  나
                </div>
                <div className="flex-1 space-y-4">
                  <textarea value={newPostContent} onChange={e => setNewPostContent(e.target.value)}
                    placeholder="오늘의 열정을 한 줄로 남겨보세요! (인증 시 추가 포인트 지급)"
                    className={`w-full bg-transparent border-none focus:ring-0 text-sm font-semibold resize-none outline-none leading-relaxed
                      ${dark ? 'placeholder:text-slate-600 text-slate-200' : 'placeholder:text-slate-300 text-slate-800'}`}
                    rows={2} />
                  <div className={`flex justify-between items-center pt-4 border-t ${t.divider}`}>
                    <p className={`text-[10px] font-black uppercase tracking-widest italic opacity-30`}>Posting as Challenger</p>
                    <button onClick={handleAddPost}
                      className="px-7 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white rounded-xl font-black text-xs transition-all shadow-lg shadow-indigo-600/20 uppercase tracking-widest">
                      Share Progress
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {posts.map(p => (
                <div key={p.id}
                  className={`p-7 rounded-[2.5rem] border ${t.card} hover:border-indigo-500/40 transition-all group`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs
                        ${dark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
                        {p.author[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold leading-tight">{p.author}</p>
                        <p className={`text-[10px] font-semibold uppercase tracking-wide mt-0.5 ${t.textMuted}`}>{p.timestamp}</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-[9px] font-black uppercase tracking-wide">
                      LV. {Math.floor(p.points / 100)}
                    </div>
                  </div>
                  <p className={`text-sm font-medium leading-relaxed mb-5 ${t.textMuted}`}>{p.content}</p>
                  <div className={`flex items-center gap-5 pt-4 border-t ${t.divider}`}>
                    <button className="flex items-center gap-1.5 text-xs font-bold text-rose-400 group-hover:scale-110 transition-transform">
                      <Heart size={15} className="fill-rose-400" /> {p.likes}
                    </button>
                    <button className={`flex items-center gap-1.5 text-xs font-bold ${t.textMuted} hover:text-indigo-400 transition-colors`}>
                      <MessageSquare size={15} /> Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </main>

      <style>{`
        @keyframes fadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn  { animation: fadeIn  0.7s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.55s ease-out forwards; }
      `}</style>
    </div>
  );
}