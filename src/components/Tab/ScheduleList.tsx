// 역할: 등록된 고정 루틴과 일반 할 일 목록을 표시 및 관리
import { CheckCircle, Pin, Activity, Trash2 } from 'lucide-react';

// 타입 정의
interface Routine {
  id: number;
  name: string;
  time: string;
  days: string[];
  completed: boolean;
}

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

interface ScheduleListProps {
  routines: Routine[];
  tasks: Task[];
  onUpdateRoutines: (updated: Routine[]) => void;
  onUpdateTasks: (updated: Task[]) => void;
  theme: {
    card: string;
  };
}

export function ScheduleList({ routines, tasks, onUpdateRoutines, onUpdateTasks, theme }: ScheduleListProps) {
  
  // 루틴 상태 변경: 완료 여부를 토글
  const toggleRoutine = (id: number) => {
    onUpdateRoutines(routines.map(r => r.id === id ? { ...r, completed: !r.completed } : r));
  };

  // 루틴 삭제: 특정 루틴을 목록에서 제거
  const deleteRoutine = (id: number) => {
    onUpdateRoutines(routines.filter(r => r.id !== id));
  };

  // 할 일 상태 변경: 일반 할 일의 완료 여부를 토글
  const toggleTask = (id: number) => {
    onUpdateTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  // 할 일 삭제: 특정 할 일을 목록에서 제거
  const deleteTask = (id: number) => {
    onUpdateTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-8">
      
      {/* 고정 루틴 섹션: 정해진 시간에 반복되는 일정 목록 */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest opacity-40 flex items-center gap-2 px-2">
          <Pin size={14}/> Fixed Routines
        </h3>
        {routines.map((r) => (
          <div key={r.id} className={`${theme.card} p-6 rounded-[2rem] border flex items-center group transition-all`}>
            {/* 완료 체크 버튼 */}
            <button 
              onClick={() => toggleRoutine(r.id)} 
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-6 transition-all ${r.completed ? 'bg-green-500 text-white shadow-lg shadow-green-500/40' : 'bg-white/5 text-white/20 border border-white/10'}`}
            >
              <CheckCircle size={24} />
            </button>
            
            <div className="flex-1">
              <h4 className={`text-lg font-bold transition-all ${r.completed ? 'opacity-30 line-through' : ''}`}>
                {r.name}
              </h4>
              <p className="text-[10px] font-black text-indigo-400 tracking-widest">
                {r.time} • {r.days.join(', ')}
              </p>
            </div>

            {/* 삭제 버튼: 그룹 호버 시 노출 */}
            <button 
              onClick={() => deleteRoutine(r.id)} 
              className="opacity-0 group-hover:opacity-100 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <Trash2 size={20}/>
            </button>
          </div>
        ))}
      </div>

      {/* 일반 할 일 섹션: 한 번 완료하면 끝나는 단발성 일정 목록 */}
      <div className="space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest opacity-40 flex items-center gap-2 px-2">
          <Activity size={14}/> One-time Tasks
        </h3>
        {tasks.map((t) => (
          <div key={t.id} className={`${theme.card} p-6 rounded-[2rem] border flex items-center group transition-all`}>
            {/* 체크박스 영역 */}
            <div className="mr-6 flex items-center">
              <input 
                type="checkbox" 
                checked={t.completed} 
                onChange={() => toggleTask(t.id)}
                className="w-6 h-6 rounded-lg cursor-pointer accent-indigo-500"
              />
            </div>
            
            <span className={`flex-1 text-lg font-bold transition-all ${t.completed ? 'opacity-30 line-through' : ''}`}>
              {t.name}
            </span>

            <button 
              onClick={() => deleteTask(t.id)} 
              className="opacity-0 group-hover:opacity-100 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <Trash2 size={20}/>
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}