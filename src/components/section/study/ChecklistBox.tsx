// ============================================================
// components/section/study/ChecklistBox.tsx
// 학습 마일스톤 체크리스트 컴포넌트.
//
// 기능:
//   - "AI 추천" / "개인 일정" 두 섹션으로 Todo 항목 분리 표시 (isAi 필드 기준)
//   - 항목 추가 (하단 입력 폼)
//   - 항목 완료 토글 (체크박스)
//   - 항목 더블클릭 인라인 편집 (editingId 상태)
//   - 항목 삭제 (TrashIcon, 호버 시 표시)
//   - 같은 섹션 내 위/아래 이동 (ArrowUpIcon / ArrowDownIcon)
// ============================================================
import { useState } from 'react';
import type { Todo } from '../../../types';
import { SparklesIcon, EditIcon, CheckIcon, ArrowUpIcon, ArrowDownIcon, TrashIcon } from '../../ui/Icons';
import { Card, CardTitle } from '../../common/Card';

export function ChecklistBox({ todos, setTodos }: { todos: Todo[]; setTodos: (todos: Todo[]) => void }) {
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const toggle = (id: string) => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text: input, completed: false, isAi: false }]);
    setInput('');
  };
  const remove = (id: string) => setTodos(todos.filter(t => t.id !== id));
  const startEdit = (todo: Todo) => { setEditingId(todo.id); setEditValue(todo.text); };
  const saveEdit = (id: string) => { setTodos(todos.map(t => t.id === id ? { ...t, text: editValue } : t)); setEditingId(null); };

  const move = (id: string, dir: -1 | 1) => {
    const idx = todos.findIndex(t => t.id === id);
    if (idx < 0) return;
    const isAi = todos[idx].isAi;
    let target = -1;
    for (let i = idx + dir; dir === -1 ? i >= 0 : i < todos.length; i += dir) {
      if (todos[i].isAi === isAi) { target = i; break; }
    }
    if (target !== -1) {
      const next = [...todos];
      [next[idx], next[target]] = [next[target], next[idx]];
      setTodos(next);
    }
  };

  return (
    <Card className="h-full border-t-4 border-indigo-500">
      <CardTitle>마일스톤</CardTitle>
      <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-8 mb-6">
        {['AI 추천', '개인 일정'].map(type => {
          const isAiType = type === 'AI 추천';
          const items = todos.filter(t => t.isAi === isAiType);
          return (
            <div key={type}>
              <h3 className={`text-[0.65rem] font-black uppercase tracking-[0.2em] mb-5 flex items-center gap-2 ${isAiType ? 'text-indigo-500' : 'text-gray-400'}`}>
                {isAiType ? <SparklesIcon size={12} /> : <EditIcon size={12} />} {type}
              </h3>
              <div className="space-y-4">
                {items.length === 0 && <p className="text-xs text-gray-400 font-medium italic ml-1">항목이 없습니다.</p>}
                {items.map((todo, idx) => (
                  <div key={todo.id} className="flex items-center justify-between group p-4 bg-gray-50/50 dark:bg-[#050505]/50 border border-gray-100 dark:border-[#1a1a1a] rounded-2xl hover:border-indigo-200 dark:hover:border-indigo-900 transition-all">
                    <label className="flex items-center gap-4 cursor-pointer flex-grow overflow-hidden">
                      <input type="checkbox" className="hidden" checked={todo.completed} onChange={() => toggle(todo.id)} />
                      <div className={`shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${todo.completed ? 'bg-indigo-600 border-indigo-600' : 'border-gray-200 dark:border-[#27272a]'}`}>
                        {todo.completed && <CheckIcon size={14} className="text-white" />}
                      </div>
                      {editingId === todo.id ? (
                        <input autoFocus value={editValue} onChange={e => setEditValue(e.target.value)} onBlur={() => saveEdit(todo.id)} onKeyDown={e => e.key === 'Enter' && saveEdit(todo.id)} className="text-sm bg-transparent border-b border-indigo-600 outline-none w-full font-bold" />
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
        <button type="submit" className="px-8 bg-black dark:bg-white text-white dark:text-black text-sm font-black rounded-2xl active:scale-95 transition-transform">추가</button>
      </form>
    </Card>
  );
}
