import { useState, useEffect } from 'react';
import type { Todo } from '../../types';
import {
  SparklesIcon, UploadIcon, EditIcon, CheckIcon,
  PauseIcon, PlayIcon, ResetIcon, TrendIcon,
  AlertIcon, ExternalLinkIcon, TrashIcon, ArrowUpIcon, ArrowDownIcon
} from '../ui/Icons';
import { Card, CardTitle } from '../common/Card';

export function SyllabusBox({ onGenerate }: { onGenerate: (items: Todo[]) => void }) {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  return (
    <Card className="glow-indigo h-full border-t-4 border-indigo-500">
      <CardTitle icon={<SparklesIcon size={18} />}>강의 계획서</CardTitle>
      <div className="mb-8 border-2 border-dashed border-gray-100 dark:border-[#1a1a1a] bg-gray-50/30 dark:bg-[#050505] rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-all group">
        <UploadIcon size={32} className="text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
        <p className="mt-4 text-sm font-bold text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">강의 계획서 이미지 업로드</p>
      </div>
      <div className="space-y-4 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1">시작일</label>
          <input type="date" value={start} onChange={e => setStart(e.target.value)} className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1">종료일</label>
          <input type="date" value={end} onChange={e => setEnd(e.target.value)} className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
        </div>
      </div>
      <button onClick={() => onGenerate([{ id: Date.now().toString(), text: 'AI가 생성한 학습 로드맵입니다.', completed: false, isAi: true }])} className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black active:scale-95 transition-all shadow-xl shadow-indigo-500/10">AI 로드맵 생성</button>
    </Card>
  );
}

export function ChecklistBox({ todos, setTodos }: { todos: Todo[], setTodos: (todos: Todo[]) => void }) {
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const toggle = (id: string) => setTodos(todos.map((t: Todo) => t.id === id ? { ...t, completed: !t.completed } : t));
  const add = (e: React.FormEvent) => { e.preventDefault(); if (!input.trim()) return; setTodos([...todos, { id: Date.now().toString(), text: input, completed: false, isAi: false }]); setInput(''); };
  const remove = (id: string) => setTodos(todos.filter((t: Todo) => t.id !== id));
  const startEdit = (todo: Todo) => { setEditingId(todo.id); setEditValue(todo.text); };
  const saveEdit = (id: string) => { setTodos(todos.map((t: Todo) => t.id === id ? { ...t, text: editValue } : t)); setEditingId(null); };

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

  return (
    <Card className="h-full border-t-4 border-indigo-500">
      <CardTitle>마일스톤</CardTitle>
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-8 mb-6">
        {['AI 추천', '개인 일정'].map(type => {
          const isAiType = type === 'AI 추천';
          const items = todos.filter((t: Todo) => t.isAi === isAiType);
          return (
            <div key={type} className="mb-2">
              <h3 className={`text-[0.65rem] font-black uppercase tracking-[0.2em] mb-5 flex items-center gap-2 ${isAiType ? 'text-indigo-500' : 'text-gray-400'}`}>
                {isAiType ? <SparklesIcon size={12} /> : <EditIcon size={12} />} {type}
              </h3>
              <div className="space-y-4">
                {items.length === 0 && <p className="text-xs text-gray-400 font-medium italic ml-1">항목이 없습니다.</p>}
                {items.map((todo: Todo, idx: number) => (
                  <div key={todo.id} className="flex items-center justify-between group p-4 bg-gray-50/50 dark:bg-[#050505]/50 border border-gray-100 dark:border-[#1a1a1a] rounded-2xl hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
                    <label className="flex items-center gap-4 cursor-pointer flex-grow overflow-hidden">
                      <input type="checkbox" className="hidden" checked={todo.completed} onChange={() => toggle(todo.id)} />
                      <div className={`shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${todo.completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200 dark:border-[#27272a]'}`}>
                        {todo.completed && <CheckIcon size={14} className="text-white" />}
                      </div>
                      {editingId === todo.id ? (
                        <input
                          autoFocus
                          value={editValue}
                          onChange={e => setEditValue(e.target.value)}
                          onBlur={() => saveEdit(todo.id)}
                          onKeyDown={e => e.key === 'Enter' && saveEdit(todo.id)}
                          className="text-sm bg-transparent border-b border-indigo-600 outline-none w-full font-bold"
                        />
                      ) : (
                        <span className={`text-sm font-bold tracking-tight ${todo.completed ? 'text-gray-400 line-through opacity-50' : 'text-gray-800 dark:text-gray-200'}`} onDoubleClick={() => startEdit(todo)}>{todo.text}</span>
                      )}
                    </label>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0">
                      <button onClick={() => move(todo.id, -1)} disabled={idx === 0} className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"><ArrowUpIcon size={14} /></button>
                      <button onClick={() => move(todo.id, 1)} disabled={idx === items.length - 1} className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors"><ArrowDownIcon size={14} /></button>
                      <button onClick={() => remove(todo.id)} className="p-1.5 text-gray-400 hover:text-rose-500 transition-colors"><TrashIcon size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <form onSubmit={add} className="flex gap-3 shrink-0">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="새 작업 추가..." className="flex-grow bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl px-5 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-bold" />
        <button type="submit" className="px-8 bg-black dark:bg-white text-white dark:text-black text-sm font-black rounded-2xl active:scale-95 transition-transform shadow-lg shadow-indigo-500/5">추가</button>
      </form>
    </Card>
  );
}

export function DiaryBox({ title, placeholder }: { title: string, placeholder: string, color: 'blue' | 'red' }) {
  return (
    <Card className="glow-indigo border-t-4 border-indigo-500">
      <CardTitle>{title}</CardTitle>
      <textarea placeholder={placeholder} className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-[2rem] p-8 text-sm text-gray-800 dark:text-gray-200 flex-grow min-h-[120px] mb-6 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium leading-relaxed resize-none" />
      <div className="flex items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-4">
          <input type="number" defaultValue="60" className="w-20 bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-xl p-3 text-center text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">분</span>
        </div>
        <button className="py-4 px-10 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black active:scale-95 transition-all shadow-xl shadow-indigo-500/10">저장</button>
      </div>
    </Card>
  );
}

export function StopwatchBox() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRunning) interval = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => { if (interval) clearInterval(interval); };
  }, [isRunning]);
  return (
    <Card className="flex flex-col items-center justify-center h-full border-t-4 border-indigo-500">
      <h2 className="text-gray-400 text-[0.65rem] font-black uppercase tracking-[0.3em] mb-10">스튜디오 타이머</h2>
      <div className="text-7xl font-black text-gray-900 dark:text-white mb-12 tracking-tighter text-glow">{String(Math.floor(time / 3600)).padStart(2, '0')}<span className="text-indigo-500 mx-1">:</span>{String(Math.floor((time % 3600) / 60)).padStart(2, '0')}<span className="text-indigo-500 mx-1">:</span>{String(time % 60).padStart(2, '0')}</div>
      <div className="flex gap-6">
        <button onClick={() => setIsRunning(!isRunning)} className="w-20 h-20 bg-black dark:bg-white text-white dark:text-black rounded-3xl flex items-center justify-center active:scale-90 transition-all shadow-2xl shadow-indigo-500/20">
          {isRunning ? <PauseIcon size={24} /> : <PlayIcon size={24} />}
        </button>
        <button onClick={() => { setIsRunning(false); setTime(0); }} className="w-20 h-20 border-2 border-gray-100 dark:border-[#1a1a1a] rounded-3xl flex items-center justify-center active:scale-90 transition-all text-gray-400 hover:text-indigo-600 hover:border-indigo-600">
          <ResetIcon size={24} />
        </button>
      </div>
    </Card>
  );
}

export function AiSuggestionBox({ title }: { title: string, color: 'blue' | 'red' }) {
  return (
    <Card className="h-full border-t-4 border-indigo-500">
      <CardTitle icon={<SparklesIcon size={18} />}>{title}</CardTitle>
      <div className="space-y-6 flex-grow flex flex-col justify-center">
        <SuggestionItem icon={<TrendIcon size={20} />} title="성과 분석" text="현재 속도로 계속하면 계획보다 3일 일찍 완료할 수 있습니다." />
        <SuggestionItem icon={<AlertIcon size={20} />} title="전략적 팁" text="이번 주말에는 이해도가 낮았던 고난이도 파트 복습에 집중하세요." />
      </div>
    </Card>
  );
}

function SuggestionItem({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) {
  return (
    <div className="p-6 rounded-[2rem] border border-gray-100 dark:border-[#1a1a1a] bg-gray-50/50 dark:bg-[#050505]/50 flex gap-5 items-start hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all">
      <div className="mt-1 text-indigo-500">{icon}</div>
      <div>
        <h3 className="text-sm font-black text-gray-900 dark:text-gray-100 mb-2 tracking-tight">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

export function DashboardBox() {
  return (
    <Card className="p-10 border-t-4 border-indigo-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tightest">활동 스튜디오</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">실시간 성과 지표와 인사이트를 확인하세요.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none text-xs font-black uppercase tracking-widest px-6 py-4 border border-gray-100 dark:border-[#1a1a1a] rounded-2xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all">리포트</button>
          <button className="flex-1 md:flex-none text-xs font-black uppercase tracking-widest px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-indigo-500/10">작업 시작</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">주간 몰입도</h3>
          <div className="flex items-end gap-4 h-[250px] relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-5">
              {[0, 1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-black dark:border-white" />)}
            </div>
            {[40, 70, 45, 90, 60, 85, 30].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end group z-10">
                <div
                  className="w-full bg-gray-100 dark:bg-[#1a1a1a] group-hover:bg-indigo-600 transition-all duration-500 rounded-full cursor-pointer"
                  style={{ height: `${height}%` }}
                ></div>
                <div className="text-center mt-4 text-[0.6rem] font-black text-gray-300 dark:text-gray-600 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                  {['월', '화', '수', '목', '금', '토', '일'][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-8">
          <h3 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">핵심 지표</h3>
          <div className="grid grid-cols-1 gap-6">
            {[
              { name: '집중도', progress: 82, color: 'indigo' },
              { name: '완료율', progress: 64, color: 'indigo' },
              { name: '전략적 깊이', progress: 91, color: 'indigo' }
            ].map((item, i) => (
              <div key={i} className="p-6 bg-gray-50/50 dark:bg-[#050505]/50 border border-gray-100 dark:border-[#1a1a1a] rounded-[2rem] hover:border-indigo-300 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-black tracking-tight text-gray-800 dark:text-gray-200">{item.name}</span>
                  <span className="text-xs font-black font-mono text-indigo-500">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200/50 dark:bg-[#1a1a1a] rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function GeminiBox() {
  return (
    <Card className="border-t-4 border-indigo-500 shadow-2xl shadow-indigo-500/5">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl"><SparklesIcon size={28} /></div>
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white leading-tight flex items-center gap-2 tracking-tightest">Gemini <span className="text-[0.6rem] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-black tracking-widest border border-indigo-100">ULTRA</span></h2>
          <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">인공지능 엔진</p>
        </div>
      </div>
      <button onClick={() => window.open('https://gemini.google.com', '_blank')} className="w-full py-4 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] hover:bg-indigo-600 hover:text-white rounded-2xl text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group">제미나이로 이동 <ExternalLinkIcon size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></button>
    </Card>
  );
}
