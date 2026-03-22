// 역할: 새로운 루틴 및 일반 일정을 생성하는 입력폼

import { useState } from 'react';
import { Plus, Clock } from 'lucide-react';

// 타입 정의
interface ScheduleFormProps {
  onAdd: (name: string, isRoutine: boolean, options: { time: string; days: string[] }) => void;
  isDark: boolean;
  theme: {
    card: string;
  };
}

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];

export function ScheduleForm({ onAdd, isDark, theme }: ScheduleFormProps) {
  // 폼 입력 상태 관리: 루틴 여부, 이름, 시간, 선택된 요일
  const [isRoutine, setIsRoutine] = useState(true);
  const [name, setName] = useState('');
  const [time, setTime] = useState('09:00');
  const [days, setDays] = useState<string[]>([]);

  // 요일 선택 토글
  const toggleDay = (day: string) => {
    setDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  // 일정 추가 실행
  const handleAdd = () => {
    if (!name.trim()) return alert("일정 이름을 입력해주세요.");
    
    onAdd(name, isRoutine, { time, days });
    
    setName('');
    setDays([]); 
  };

  // 공통 입력창 스타일
  const inputBase = `
    w-full p-4 rounded-2xl outline-none border transition-all duration-300
    ${isDark ? 'bg-white/5 border-white/10 focus:border-white/30 text-white' : 'bg-white border-gray-200 focus:border-indigo-500 text-black'}
  `;

  return (
    <div className={`${theme.card} p-8 rounded-[2.5rem] border shadow-lg space-y-6 transition-all`}>
      
      {/* 상단 헤더: 제목 및 모드 전환(고정 루틴 vs 일반 일정) */}
      <div className="flex items-center justify-between">
        <h4 className="font-bold flex items-center gap-2 text-lg">
          <Plus size={20} className="text-indigo-500" /> 일정 등록
        </h4>
        
        <div className={`flex p-1 rounded-xl border ${isDark ? 'bg-black/20 border-white/10' : 'bg-gray-100 border-gray-200'}`}>
          <button 
            onClick={() => setIsRoutine(true)} 
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isRoutine ? 'bg-white text-black shadow-md' : 'opacity-40 hover:opacity-100'}`}
          >
            고정 루틴
          </button>
          <button 
            onClick={() => setIsRoutine(false)} 
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isRoutine ? 'bg-white text-black shadow-md' : 'opacity-40 hover:opacity-100'}`}
          >
            일반 일정
          </button>
        </div>
      </div>

      {/* 메인 입력창: 일정 이름 및 시간 설정 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <input 
            className={inputBase}
            placeholder="무엇을 하실 예정인가요?" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          
          {isRoutine && (
            <div className="flex items-center gap-3 px-2 text-indigo-400 group">
              <Clock size={16} className="opacity-60 group-hover:scale-110 transition-transform" />
              <input 
                type="time" 
                className="bg-transparent outline-none font-bold text-sm tracking-widest cursor-pointer" 
                value={time} 
                onChange={e => setTime(e.target.value)} 
              />
            </div>
          )}
        </div>

        {/* 옵션 및 등록 버튼: 루틴 요일 선택 및 최종 추가 버튼 */}
        <div className="space-y-4">
          {isRoutine && (
            <div className="flex justify-between gap-1">
              {DAYS.map(day => {
                const isSelected = days.includes(day);
                return (
                  <button 
                    key={day} 
                    onClick={() => toggleDay(day)} 
                    className={`
                      flex-1 py-3 rounded-xl text-xs font-bold transition-all duration-300
                      ${isSelected 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                        : isDark ? 'bg-white/5 text-white/40 hover:bg-white/10' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          )}
          
          <button 
            onClick={handleAdd} 
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 transition-all"
          >
            일정 추가하기
          </button>
        </div>
      </div>
    </div>
  );
}