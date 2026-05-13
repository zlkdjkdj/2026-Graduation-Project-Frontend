// ============================================================
// pages/schedule/SchedulePage.tsx
// 일정 생성 및 루틴 관리 페이지 (달력 메모 기능 추가 버전).
// ============================================================
import React, { useState, useMemo } from 'react';
import { 
  PlusIcon, TrashIcon, CalendarIcon, ActivityIcon, 
  CheckIcon, StarIcon, EditIcon, ClockIcon, XIcon
} from '../../components/ui/Icons';

interface Schedule {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  type: 'schedule' | 'routine';
  completed: boolean;
  repeatDays?: number[]; // 0: Sun, 1: Mon, ..., 6: Sat
  isFavorite: boolean;
}

const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const HOLIDAYS_2026_05: Record<number, string> = {
  5: '어린이날',
  24: '부처님오신날',
  25: '대체공휴일',
};

export function SchedulePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([
    { id: '1', title: '아침 요가', date: '2026-05-07', startTime: '07:00', endTime: '08:00', type: 'routine', completed: true, repeatDays: [1, 2, 3, 4, 5], isFavorite: true },
    { id: '2', title: '알고리즘 문제 풀이', date: '2026-05-07', startTime: '10:00', endTime: '12:00', type: 'schedule', completed: false, isFavorite: false },
    { id: '3', title: '졸업 프로젝트 회의', date: '2026-05-07', startTime: '14:00', endTime: '16:00', type: 'schedule', completed: false, isFavorite: true },
    { id: '4', title: '독서 (인문학)', date: '2026-05-07', startTime: '22:00', endTime: '23:00', type: 'routine', completed: false, repeatDays: [0, 6], isFavorite: false },
  ]);

  // 달력 메모 상태 (날짜: 메모내용)
  const [calendarNotes, setCalendarNotes] = useState<Record<number, string>>({
    7: '프로젝트 마감일',
    15: '친구 생일 🎂',
    20: '전시회 관람'
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDayDetailOpen, setIsDayDetailOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Schedule>>({
    title: '',
    date: '2026-05-07',
    startTime: '09:00',
    endTime: '10:00',
    type: 'schedule',
    repeatDays: [],
    isFavorite: false
  });

  const todayDateStr = '2026-05-07';
  const todayDayIndex = 4;

  const todaySchedules = useMemo(() => {
    return schedules.filter(s => {
      if (s.type === 'schedule') return s.date === todayDateStr;
      if (s.type === 'routine') return s.repeatDays?.includes(todayDayIndex);
      return false;
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedules]);

  const selectedDaySchedules = useMemo(() => {
    if (selectedDay === null) return [];
    const dateStr = `2026-05-${selectedDay.toString().padStart(2, '0')}`;
    const dayOfWeek = (selectedDay + 4) % 7; 
    
    return schedules.filter(s => {
      if (s.type === 'schedule') return s.date === dateStr;
      if (s.type === 'routine') return s.repeatDays?.includes(dayOfWeek);
      return false;
    }).sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedules, selectedDay]);

  const routineSchedules = useMemo(() => {
    return schedules.filter(s => s.type === 'routine').sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedules]);

  const majorSchedules = useMemo(() => {
    return schedules.filter(s => s.isFavorite && s.type === 'schedule').sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [schedules]);

  const handleOpenAddModal = (dateStr?: string) => {
    setEditingId(null);
    setFormData({
      title: '',
      date: dateStr || todayDateStr,
      startTime: '09:00',
      endTime: '10:00',
      type: 'schedule',
      repeatDays: [],
      isFavorite: false
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (schedule: Schedule) => {
    setEditingId(schedule.id);
    setFormData({ ...schedule });
    setIsModalOpen(true);
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setIsDayDetailOpen(true);
  };

  const handleSaveSchedule = () => {
    if (!formData.title) return;
    if (editingId) {
      setSchedules(schedules.map(s => s.id === editingId ? { ...s, ...formData } as Schedule : s));
    } else {
      const newSchedule: Schedule = {
        id: Date.now().toString(),
        title: formData.title || '',
        date: formData.date || todayDateStr,
        startTime: formData.startTime || '',
        endTime: formData.endTime || '',
        type: formData.type || 'schedule',
        completed: false,
        repeatDays: formData.repeatDays,
        isFavorite: formData.isFavorite || false
      };
      setSchedules([...schedules, newSchedule]);
    }
    setIsModalOpen(false);
  };

  const toggleComplete = (id: string) => {
    setSchedules(schedules.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const toggleDay = (dayIndex: number) => {
    const currentDays = formData.repeatDays || [];
    if (currentDays.includes(dayIndex)) {
      setFormData({ ...formData, repeatDays: currentDays.filter(d => d !== dayIndex) });
    } else {
      setFormData({ ...formData, repeatDays: [...currentDays, dayIndex].sort() });
    }
  };

  const updateCalendarNote = (day: number, note: string) => {
    setCalendarNotes({ ...calendarNotes, [day]: note });
  };

  const ScheduleCard = ({ item, showCheck = true }: { item: Schedule; showCheck?: boolean }) => (
    <div 
      className={`group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300
        ${item.completed 
          ? 'bg-gray-50 dark:bg-[#050505] border-transparent opacity-40 grayscale' 
          : item.type === 'routine'
            ? 'bg-indigo-50/50 dark:bg-indigo-500/5 border-indigo-100 dark:border-indigo-500/20 hover:border-indigo-500/50'
            : 'bg-white dark:bg-[#0d0d0d] border-gray-100 dark:border-[#1a1a1a] hover:border-indigo-500/30'}
      `}
    >
      {showCheck && (
        <button 
          onClick={() => toggleComplete(item.id)}
          className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0
            ${item.completed ? 'bg-indigo-500 border-indigo-500 scale-90' : 'border-gray-200 dark:border-[#222] hover:border-indigo-500'}
          `}
        >
          {item.completed && <CheckIcon size={14} />}
        </button>
      )}
      
      <div className="flex-grow min-w-0">
        <h4 className={`font-black text-[0.95rem] truncate ${item.completed ? 'line-through text-gray-400' : ''}`}>
          {item.title}
        </h4>
        <div className="flex flex-col gap-0.5 mt-1">
          <div className="flex items-center gap-2 text-gray-400 font-bold text-[0.65rem] uppercase tracking-tight">
            <ClockIcon size={10} />
            <span>{item.startTime} - {item.endTime}</span>
          </div>
          {item.type === 'routine' && item.repeatDays && (
            <div className="flex gap-0.5 mt-0.5">
              {DAYS.map((d, i) => (
                <span key={i} className={`text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-sm ${item.repeatDays?.includes(i) ? 'bg-indigo-500 text-white' : 'bg-gray-100 dark:bg-[#1a1a1a] text-gray-400'}`}>
                  {d}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button 
          onClick={() => handleOpenEditModal(item)}
          className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-all"
        >
          <EditIcon size={14} />
        </button>
        <button 
          onClick={() => deleteSchedule(item.id)}
          className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all"
        >
          <TrashIcon size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 studio-card glow-indigo">
        <div>
          <h2 className="text-4xl font-black tracking-tight mb-2 text-gradient">일정 관리</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">나만의 루틴과 중요한 일정들을 체계적으로 관리하세요.</p>
        </div>
        <button 
          onClick={() => handleOpenAddModal()}
          className="flex items-center justify-center gap-2 px-8 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/20"
        >
          <PlusIcon size={24} />
          <span className="text-lg">새 일정 추가</span>
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        <div className="xl:col-span-2 studio-card h-full">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-2xl font-black flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-500">
                <CalendarIcon size={24} />
              </div>
              2026년 5월
            </h3>
            <div className="flex gap-2 bg-gray-50 dark:bg-[#111] p-1.5 rounded-2xl border border-gray-100 dark:border-[#1a1a1a]">
              <button className="px-4 py-2 hover:bg-white dark:hover:bg-[#1a1a1a] rounded-xl font-bold transition-all text-sm">이전</button>
              <button className="px-4 py-2 hover:bg-white dark:hover:bg-[#1a1a1a] rounded-xl font-bold transition-all text-sm">다음</button>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-4 text-center">
            {DAYS.map((day, idx) => (
              <div key={day} className={`text-[0.65rem] font-black uppercase tracking-widest py-4 ${idx === 0 ? 'text-red-500' : 'text-gray-400'}`}>{day}</div>
            ))}
            {Array.from({ length: 31 }).map((_, i) => {
              const day = i + 1;
              const isToday = day === 7;
              const dayOfWeek = (i + 5) % 7; 
              const isSunday = dayOfWeek === 0;
              const holidayName = HOLIDAYS_2026_05[day];
              const isHoliday = !!holidayName || isSunday;
              const note = calendarNotes[day];

              return (
                <div 
                  key={i} 
                  onClick={() => handleDayClick(day)}
                  className={`aspect-square p-3 rounded-[1.5rem] border transition-all cursor-pointer flex flex-col items-start justify-between group relative overflow-hidden
                    ${isToday 
                      ? 'bg-black dark:bg-white border-black dark:border-white shadow-2xl shadow-indigo-500/20 scale-105 z-10' 
                      : 'bg-transparent border-gray-50 dark:border-[#111] hover:bg-gray-50 dark:hover:bg-[#0a0a0a] hover:border-gray-200 dark:hover:border-[#222]'}
                  `}
                >
                  <div className="flex flex-col w-full">
                    <span className={`text-base font-black ${isToday ? 'text-white dark:text-black' : isHoliday ? 'text-red-500' : 'text-gray-900 dark:text-gray-100 opacity-60 group-hover:opacity-100'}`}>
                      {day}
                    </span>
                    {holidayName && (
                      <span className="text-[8px] font-black text-red-400 truncate w-full">{holidayName}</span>
                    )}
                    {note && (
                      <span className={`text-[9px] font-bold mt-1 truncate w-full px-1.5 py-0.5 rounded-md ${isToday ? 'bg-white/20 text-white' : 'bg-indigo-500/10 text-indigo-500'}`}>
                        {note}
                      </span>
                    )}
                  </div>
                  {(day === 7 || day === 12 || day === 20) && (
                    <div className="flex gap-1">
                      <div className={`w-1.5 h-1.5 rounded-full ${isToday ? 'bg-white/50' : 'bg-indigo-500'}`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-6 max-h-[900px]">
          <section className="studio-card !p-6 flex flex-col flex-grow min-h-[250px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <CheckIcon className="text-emerald-500 bg-emerald-500/10 p-1 rounded-md" size={24} />
                오늘의 일정
              </h3>
              <span className="text-[10px] font-black px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded-lg">Today</span>
            </div>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {todaySchedules.map(item => <ScheduleCard key={item.id} item={item} />)}
              {todaySchedules.length === 0 && (
                <div className="text-center py-6 opacity-30">
                  <p className="text-[10px] font-bold">오늘 예정된 일정이 없습니다.</p>
                </div>
              )}
            </div>
          </section>

          <section className="studio-card !p-6 flex flex-col flex-grow min-h-[250px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <ActivityIcon className="text-indigo-500" />
                나의 루틴
              </h3>
              <span className="text-[10px] font-black px-2 py-1 bg-indigo-500/10 text-indigo-500 rounded-lg">Daily</span>
            </div>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {routineSchedules.map(item => <ScheduleCard key={item.id} item={item} showCheck={false} />)}
            </div>
          </section>

          <section className="studio-card !p-6 flex flex-col flex-grow min-h-[250px]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black flex items-center gap-2">
                <StarIcon className="text-amber-500 fill-amber-500" />
                주요 일정
              </h3>
              <span className="text-[10px] font-black px-2 py-1 bg-amber-500/10 text-amber-500 rounded-lg">Star</span>
            </div>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-grow">
              {majorSchedules.map(item => <ScheduleCard key={item.id} item={item} showCheck={false} />)}
            </div>
          </section>
        </div>
      </div>

      {/* 날짜 상세 일정 모달 */}
      {isDayDetailOpen && selectedDay && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-xl rounded-[3.5rem] border border-gray-100 dark:border-[#1a1a1a] shadow-2xl p-10 animate-in zoom-in-95 duration-200">
            <header className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-indigo-500 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg shadow-indigo-500/20">
                  <span className="text-[0.6rem] font-black uppercase tracking-tighter opacity-70">MAY</span>
                  <span className="text-2xl font-black">{selectedDay}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black tracking-tight">2026년 5월 {selectedDay}일</h3>
                  <p className="text-gray-400 font-bold text-sm uppercase tracking-widest">{DAYS[(selectedDay + 4) % 7]}요일 일정</p>
                </div>
              </div>
              <button 
                onClick={() => setIsDayDetailOpen(false)}
                className="p-4 bg-gray-50 dark:bg-[#111] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-2xl text-gray-400 transition-all"
              >
                <XIcon size={20} />
              </button>
            </header>

            {/* 달력 메모 입력 영역 */}
            <div className="mb-8 p-6 bg-gray-50 dark:bg-[#050505] rounded-3xl border border-gray-100 dark:border-[#1a1a1a]">
              <label className="block text-[0.65rem] font-black text-gray-400 mb-3 uppercase tracking-widest">오늘의 메모/기념일</label>
              <input 
                type="text"
                value={calendarNotes[selectedDay] || ''}
                onChange={(e) => updateCalendarNote(selectedDay, e.target.value)}
                placeholder="예: 영희 생일, 프로젝트 마감..."
                className="w-full bg-white dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 transition-all font-bold"
              />
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
              <h4 className="text-[0.65rem] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">상세 일정 목록</h4>
              {selectedDaySchedules.length > 0 ? (
                selectedDaySchedules.map(item => <ScheduleCard key={item.id} item={item} />)
              ) : (
                <div className="py-10 text-center">
                  <CalendarIcon size={32} className="mx-auto text-gray-100 dark:text-[#111] mb-4" />
                  <p className="text-gray-400 font-bold text-sm">이날 예정된 일정이 없습니다.</p>
                </div>
              )}
            </div>

            <div className="mt-10">
              <button 
                onClick={() => {
                  setIsDayDetailOpen(false);
                  handleOpenAddModal(`2026-05-${selectedDay.toString().padStart(2, '0')}`);
                }}
                className="w-full py-5 bg-black dark:bg-white text-white dark:text-black rounded-[2rem] font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                이날에 새 일정 추가하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 일정 추가/수정 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-lg rounded-[3rem] border border-gray-100 dark:border-[#1a1a1a] shadow-2xl p-10 animate-in zoom-in-95 duration-200">
            <header className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-black tracking-tight">{editingId ? '일정 수정' : '새 일정 계획'}</h3>
              <button 
                onClick={() => setFormData({ ...formData, isFavorite: !formData.isFavorite })}
                className={`p-3 rounded-2xl transition-all ${formData.isFavorite ? 'bg-indigo-500/10 text-indigo-500' : 'bg-gray-50 dark:bg-[#111] text-gray-400'}`}
              >
                <StarIcon size={20} className={formData.isFavorite ? 'fill-indigo-500' : ''} />
              </button>
            </header>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-black text-gray-400 mb-3 uppercase tracking-widest">제목</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all font-bold text-lg"
                  placeholder="무엇을 하실 건가요?"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-400 mb-3 uppercase tracking-widest">시작 시간</label>
                  <input 
                    type="time" 
                    value={formData.startTime}
                    onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-gray-400 mb-3 uppercase tracking-widest">종료 시간</label>
                  <input 
                    type="time" 
                    value={formData.endTime}
                    onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-400 mb-3 uppercase tracking-widest">유형</label>
                <div className="flex gap-3 bg-gray-50 dark:bg-[#111] p-1.5 rounded-[1.5rem]">
                  <button 
                    onClick={() => setFormData({...formData, type: 'schedule'})}
                    className={`flex-grow py-4 rounded-2xl font-black transition-all ${formData.type === 'schedule' ? 'bg-white dark:bg-[#1a1a1a] shadow-lg text-black dark:text-white' : 'text-gray-400'}`}
                  >
                    일회성 일정
                  </button>
                  <button 
                    onClick={() => setFormData({...formData, type: 'routine'})}
                    className={`flex-grow py-4 rounded-2xl font-black transition-all ${formData.type === 'routine' ? 'bg-white dark:bg-[#1a1a1a] shadow-lg text-black dark:text-white' : 'text-gray-400'}`}
                  >
                    반복 루틴
                  </button>
                </div>
              </div>

              {formData.type === 'routine' ? (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-black text-gray-400 mb-3 uppercase tracking-widest">반복 요일</label>
                  <div className="flex justify-between gap-2">
                    {DAYS.map((day, index) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(index)}
                        className={`w-11 h-11 rounded-full font-black text-sm transition-all ${formData.repeatDays?.includes(index) ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-gray-50 dark:bg-[#111] text-gray-400 hover:bg-gray-100'}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-black text-gray-400 mb-3 uppercase tracking-widest">날짜</label>
                  <input 
                    type="date" 
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-100 dark:border-[#222] rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all font-bold"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-12">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-grow py-5 bg-gray-50 dark:bg-[#111] text-gray-500 rounded-[1.5rem] font-black hover:bg-gray-100 transition-all"
              >
                취소
              </button>
              <button 
                onClick={handleSaveSchedule}
                className="flex-grow py-5 bg-black dark:bg-white text-white dark:text-black rounded-[1.5rem] font-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                {editingId ? '수정 완료' : '저장하기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
