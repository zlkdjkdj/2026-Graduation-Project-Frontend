import { useState, useEffect } from 'react';
import type { Todo } from '../../types';
import { 
  SparklesIcon, UploadIcon, EditIcon, CheckIcon, BookIcon, 
  DumbbellIcon, PauseIcon, PlayIcon, ResetIcon, TrendIcon, 
  AlertIcon, ExternalLinkIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon
} from '../ui/Icons';

export function SyllabusBox({ onGenerate }: { onGenerate: (items: Todo[]) => void }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-5 shadow-sm dark:shadow-lg transition-colors">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2"><SparklesIcon /> 학습 정보 입력</h2>
      <div className="mb-4 border-2 border-dashed border-gray-300 dark:border-[#3A3A3C] bg-gray-50 dark:bg-[#1E1E20] rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-all group">
        <UploadIcon color="stroke-blue-500" /><p className="mt-2 text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-500">목차 이미지 업로드</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="bg-gray-50 dark:bg-[#1E1E20] border border-gray-200 dark:border-[#3A3A3C] rounded-lg p-2 text-sm text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
        <input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="bg-gray-50 dark:bg-[#1E1E20] border border-gray-200 dark:border-[#3A3A3C] rounded-lg p-2 text-sm text-gray-700 dark:text-gray-200 outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <button onClick={() => onGenerate([{id:Date.now().toString(), text:'AI가 분배한 학습 진도입니다.', completed: false, isAi: true}])} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md transition-all active:scale-95">AI 진도 자동 생성</button>
    </div>
  );
}

export function ChecklistBox({ todos, setTodos, themeColor }: { todos: Todo[], setTodos: (todos: Todo[]) => void, themeColor: 'blue' | 'red' }) {
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const toggle = (id: string) => setTodos(todos.map((t: Todo) => t.id === id ? {...t, completed: !t.completed} : t));
  const add = (e: React.FormEvent) => { e.preventDefault(); if(!input.trim()) return; setTodos([...todos, {id: Date.now().toString(), text: input, completed: false, isAi: false}]); setInput(''); };
  const remove = (id: string) => setTodos(todos.filter((t: Todo) => t.id !== id));
  const startEdit = (todo: Todo) => { setEditingId(todo.id); setEditValue(todo.text); };
  const saveEdit = (id: string) => { setTodos(todos.map((t: Todo) => t.id === id ? {...t, text: editValue} : t)); setEditingId(null); };
  
  const move = (id: string, dir: -1 | 1) => {
    const idx = todos.findIndex((t: Todo) => t.id === id);
    if (idx < 0) return;
    const todo = todos[idx];
    let targetIdx = -1;
    if (dir === -1) {
      for (let i = idx - 1; i >= 0; i--) { if (todos[i].isAi === todo.isAi) { targetIdx = i; break; } }
    } else {
      for (let i = idx + 1; i < todos.length; i++) { if (todos[i].isAi === todo.isAi) { targetIdx = i; break; } }
    }
    if (targetIdx !== -1) {
      const newTodos = [...todos];
      [newTodos[idx], newTodos[targetIdx]] = [newTodos[targetIdx], newTodos[idx]];
      setTodos(newTodos);
    }
  };

  const accentBg = themeColor === 'blue' ? 'bg-blue-600' : 'bg-red-500';
  const accentBorder = themeColor === 'blue' ? 'border-blue-600' : 'border-red-500';
  const accentText = themeColor === 'blue' ? 'text-blue-600' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg flex flex-col shrink-0 min-h-[450px] transition-colors">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 transition-colors font-sans">일정 체크리스트</h2>
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-4 mb-4">
        {['AI 추천 진도', '수동 추가 일정'].map(type => {
          const isAiType = type === 'AI 추천 진도';
          const items = todos.filter((t: Todo) => t.isAi === isAiType);
          return (
            <div key={type} className="mb-2">
              <h3 className={`text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2 ${isAiType ? 'text-blue-500' : 'text-green-500'}`}>
                {isAiType ? <SparklesIcon size={14} /> : <EditIcon size={14} />} {type}
              </h3>
              <div className="space-y-2.5">
                {items.length === 0 && <p className="text-xs text-gray-400 italic pl-6">항목이 없습니다.</p>}
                {items.map((todo: Todo, idx: number) => (
                  <div key={todo.id} className="flex items-center justify-between group">
                    <label className="flex items-center gap-4 cursor-pointer flex-grow overflow-hidden">
                      <input type="checkbox" className="hidden" checked={todo.completed} onChange={() => toggle(todo.id)} />
                      <div className={`shrink-0 w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all ${todo.completed ? `${accentBg} ${accentBorder}` : 'border-gray-300 dark:border-gray-600'}`}>
                        {todo.completed && <CheckIcon size={14} />}
                      </div>
                      {editingId === todo.id ? (
                        <input 
                          autoFocus
                          value={editValue} 
                          onChange={e => setEditValue(e.target.value)}
                          onBlur={() => saveEdit(todo.id)}
                          onKeyDown={e => e.key === 'Enter' && saveEdit(todo.id)}
                          className="text-sm bg-gray-50 dark:bg-[#1E1E20] border border-blue-500 rounded px-2 py-0.5 outline-none w-full text-gray-800 dark:text-gray-200"
                        />
                      ) : (
                        <span className={`text-base font-medium truncate transition-colors ${todo.completed ? 'text-gray-400 dark:text-gray-600 line-through' : `text-gray-700 dark:text-gray-200 group-hover:${themeColor === 'blue' ? 'text-blue-600' : 'text-red-500'}`}`} onDoubleClick={() => startEdit(todo)}>{todo.text}</span>
                      )}
                    </label>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                      <button onClick={() => move(todo.id, -1)} disabled={idx === 0} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30"><ArrowUpIcon size={14} /></button>
                      <button onClick={() => move(todo.id, 1)} disabled={idx === items.length - 1} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 disabled:opacity-30"><ArrowDownIcon size={14} /></button>
                      <button onClick={() => startEdit(todo)} className="p-1.5 text-gray-400 hover:text-blue-500"><EditIcon size={14} /></button>
                      <button onClick={() => remove(todo.id)} className="p-1.5 text-gray-400 hover:text-red-500"><TrashIcon size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={add} className="flex gap-2 shrink-0">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="새로운 일정 추가..." className="flex-grow bg-gray-50 dark:bg-[#1E1E20] border border-gray-200 dark:border-[#3A3A3C] rounded-xl px-4 py-3 text-base text-gray-800 dark:text-gray-200 outline-none focus:ring-2 focus:ring-green-500 transition-colors" />
        <button type="submit" className={`px-6 py-3 ${accentBg} text-white text-base font-bold rounded-xl hover:brightness-110 shadow-md transition-all active:scale-95`}>추가</button>
      </form>
    </div>
  );
}

export function DiaryBox({ title, placeholder, color }: { title: string, placeholder: string, color: 'blue' | 'red' }) {
  const accentBg = color === 'blue' ? 'bg-blue-600' : 'bg-red-500';
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg flex flex-col h-full transition-colors">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">{title}</h2>
      <textarea placeholder={placeholder} className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2B] rounded-xl p-4 text-sm text-gray-800 dark:text-gray-300 flex-grow min-h-[100px] mb-4 outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none" />
      <div className="flex items-center justify-between gap-4 mt-auto text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          {color === 'blue' ? <BookIcon /> : <DumbbellIcon />}
          <input type="number" defaultValue="60" className="w-14 bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-[#2A2A2B] rounded-lg p-2 text-center text-sm outline-none text-gray-800 dark:text-gray-200" />
          <span className="text-xs">분</span>
        </div>
        <button className={`py-2 px-6 ${accentBg} text-white rounded-lg text-sm font-bold hover:brightness-110 transition-all shadow-md active:scale-95`}>저장 (+10P)</button>
      </div>
    </div>
  );
}

export function StopwatchBox() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRunning) interval = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => { if(interval) clearInterval(interval); };
  }, [isRunning]);
  const secRot = (time % 60) * 6;
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg flex flex-col items-center justify-center h-full min-h-[350px] transition-colors">
      <h2 className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] mb-8">Analog Timer</h2>
      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-gray-200 dark:border-[#2A2A2B] bg-gray-50 dark:bg-[#121212] mb-10 flex items-center justify-center shadow-inner">
        {[...Array(12)].map((_, i) => <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${i * 30}deg)` }}><div className="mx-auto w-0.5 h-2 bg-gray-300 dark:bg-gray-700 mt-1"></div></div>)}
        <div className="absolute w-0.5 h-[45%] bg-blue-500 rounded-full origin-bottom transition-transform duration-1000 ease-linear shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ transform: `rotate(${secRot}deg)`, bottom: '50%' }} />
        <div className="absolute w-2 h-2 bg-blue-600 rounded-full" />
      </div>
      <div className="text-5xl md:text-6xl font-light tracking-tighter text-gray-800 dark:text-white mb-8 font-mono">{String(Math.floor(time / 3600)).padStart(2, '0')}:{String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:{String(time % 60).padStart(2, '0')}</div>
      <div className="flex gap-4"><button onClick={() => setIsRunning(!isRunning)} className="w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition active:scale-90 shadow-lg">{isRunning ? <PauseIcon /> : <PlayIcon />}</button><button onClick={() => {setIsRunning(false); setTime(0);}} className="w-14 h-14 bg-gray-100 dark:bg-[#2A2A2C] border border-gray-200 dark:border-transparent hover:bg-gray-200 dark:hover:bg-[#343436] rounded-full flex items-center justify-center transition active:scale-90 text-gray-600 dark:text-white"><ResetIcon /></button></div>
    </div>
  );
}

export function AiSuggestionBox({ title, color }: { title: string, color: 'blue' | 'red' }) {
  const accent = color === 'blue' ? 'text-blue-500' : 'text-red-500';
  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg flex flex-col h-full transition-colors">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center gap-2"><span className={accent}><SparklesIcon /></span> {title}</h2>
      <div className="space-y-4 flex-grow flex flex-col justify-center">
        <SuggestionItem icon={<TrendIcon color={accent} />} title="진행 패턴 분석" text="현재 속도로 계속하면 목표보다 3일 빨리 완료할 수 있습니다." />
        <SuggestionItem icon={<AlertIcon color="text-yellow-500" />} title="오늘의 팁" text="주말에는 부족했던 고강도 훈련을 1시간 추가하는 것을 추천합니다." />
      </div>
    </div>
  );
}

function SuggestionItem({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="bg-gray-50 dark:bg-[#1A1A1C] p-4 rounded-xl border border-gray-100 dark:border-[#2A2A2B] flex gap-4 transition-colors items-start">
      <div className="mt-1">{icon}</div>
      <div><h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1.5">{title}</h3><p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{text}</p></div>
    </div>
  );
}

export function DashboardBox() {
  const dailyData = [75, 80, 65, 95, 88, 70, 100];
  const focusRate = 85;
  const completedTodos = 24;
  const totalStudyTime = "32h 15m";

  return (
    <div className="bg-white dark:bg-[#18181B] rounded-xl border border-gray-200 dark:border-[#2A2A2B] p-8 shadow-sm dark:shadow-xl transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500 dark:from-blue-400 dark:to-indigo-300 transition-colors">
          AI 분석 대시보드
        </h2>
        <span className="text-xs font-bold bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 px-3 py-1 rounded-full">
          This Week
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#1E1E24] dark:to-[#1A1A20] rounded-2xl p-6 border border-blue-100 dark:border-[#2A2A2B] flex flex-col items-center justify-center relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-xs font-black text-blue-600/70 dark:text-blue-400/70 mb-2 uppercase tracking-[0.2em] relative z-10">Focus Rate</p>
          <div className="relative flex items-center justify-center">
             <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-[#2A2A2C]" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * focusRate) / 100} className="text-blue-500" strokeLinecap="round" />
             </svg>
             <span className="absolute text-2xl font-black text-gray-800 dark:text-white">{focusRate}%</span>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-[#1A1A1C] rounded-2xl p-6 border border-gray-100 dark:border-[#2A2A2B] flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-green-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-xs font-black text-gray-400 mb-2 uppercase tracking-[0.2em] relative z-10">Completed Tasks</p>
          <h4 className="text-5xl font-light text-gray-800 dark:text-white relative z-10">{completedTodos}</h4>
          <p className="text-xs text-green-500 mt-2 font-bold flex items-center gap-1 relative z-10"><ArrowUpIcon size={12}/> 12% from last week</p>
        </div>
        <div className="bg-gray-50 dark:bg-[#1A1A1C] rounded-2xl p-6 border border-gray-100 dark:border-[#2A2A2B] flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute right-0 bottom-0 w-24 h-24 bg-purple-500/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
          <p className="text-xs font-black text-gray-400 mb-2 uppercase tracking-[0.2em] relative z-10">Total Study Time</p>
          <h4 className="text-4xl font-light text-gray-800 dark:text-white tracking-tight relative z-10">{totalStudyTime}</h4>
          <p className="text-xs text-purple-500 mt-2 font-bold flex items-center gap-1 relative z-10"><ArrowUpIcon size={12}/> Top 5% user</p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-[#1A1A1C] rounded-2xl p-8 border border-gray-100 dark:border-[#2A2A2B]">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-6">Weekly Activity Heatmap</h3>
        <div className="h-40 flex items-end justify-between gap-3">
          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((day, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-3 group h-full justify-end relative">
              <div className="w-full bg-gray-200 dark:bg-[#2A2A2C] rounded-lg relative h-[85%] overflow-hidden transition-all duration-300 group-hover:bg-gray-300 dark:group-hover:bg-[#3A3A3C]">
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 transition-all duration-1000 rounded-lg group-hover:brightness-110" style={{ height: `${dailyData[i]}%` }} />
              </div>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">{day}</span>
              <div className="absolute -top-8 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
                {dailyData[i]}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function GeminiBox() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-[#18181B] dark:to-[#1E1E2A] rounded-xl border border-blue-100 dark:border-[#2A2A2B] p-6 shadow-sm dark:shadow-lg shrink-0 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md"><SparklesIcon size={24}/></div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-tight flex items-center">Gemini AI <span className="text-xs bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded ml-2 font-black">LIVE</span></h2>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">AI 비서에게 무엇이든 물어보세요.</p>
      <button onClick={() => window.open('https://gemini.google.com', '_blank')} className="w-full py-3 bg-white dark:bg-[#2A2A2C] border border-gray-200 dark:border-[#3A3A3C] hover:bg-gray-50 dark:hover:bg-[#343436] text-gray-800 dark:text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2">Gemini 열기 <ExternalLinkIcon /></button>
    </div>
  );
}
