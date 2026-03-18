import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router'; 
import { 
  BookOpen, Dumbbell, Users, ChevronLeft, ChevronRight, 
  Sun, Moon, Cloud, CloudRain, Snowflake, Calendar, Sparkles, MapPin, 
  Clock, CheckCircle, BarChart3, Activity, Send, Pin, Plus, Trash2, Settings
} from 'lucide-react';

// 요일 상수
const DAYS_OF_WEEK = ['월', '화', '수', '목', '금', '토', '일'];

export const TabPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('study');
  const [weather, setWeather] = useState({ temp: 18, desc: 'Clear', icon: <Sun /> });
  const [bgUrl, setBgUrl] = useState('');

  // --- 일정 관리 데이터 상태 ---
  const [routines, setRoutines] = useState([
    { id: 1, name: '아침 명상 10분', time: '07:00', days: ['월', '화', '수', '목', '금'], completed: true },
    { id: 2, name: '테크 아티클 읽기', time: '08:30', days: ['월', '수', '금'], completed: false },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, name: '프로젝트 리팩토링', completed: false },
  ]);

  // 등록을 위한 상태
  const [isRoutineMode, setIsRoutineMode] = useState(true); // 루틴 vs 일반일정 토글
  const [newSchedule, setNewSchedule] = useState({ name: '', time: '09:00', days: [] as string[] });
  const [chatInput, setChatInput] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  // --- 통계 계산 (useMemo) ---
  const stats = useMemo(() => {
    const routineRate = routines.length > 0 ? Math.round((routines.filter(r => r.completed).length / routines.length) * 100) : 0;
    const taskRate = tasks.length > 0 ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100) : 0;
    const totalRate = Math.round((routineRate + taskRate) / 2);
    return { routineRate, taskRate, totalRate };
  }, [routines, tasks]);

  // 날씨 호출 로직 (기존 유지)
  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        const main = data.weather[0].main;
        setWeather({ temp: Math.round(data.main.temp), desc: main, icon: <Sun /> });
        setBgUrl(`https://source.unsplash.com/featured/1600x900?nature,${main.toLowerCase()}`);
      } catch (e) {
        setBgUrl('https://images.unsplash.com/photo-1464822759023-fed622ff2c3b');
      }
    };
    fetchWeather();
  }, []);

  const themeClass = isDarkMode 
    ? { bg: "bg-[#000] text-white", card: "bg-white/10 border-white/20", textMuted: "text-white/40", overlay: "bg-black/50" } 
    : { bg: "bg-[#f5f5f7] text-gray-900", card: "bg-white/70 border-gray-200", textMuted: "text-gray-500", overlay: "bg-white/20" };

  // 요일 선택 토글
  const toggleDay = (day: string) => {
    setNewSchedule(prev => ({
      ...prev,
      days: prev.days.includes(day) ? prev.days.filter(d => d !== day) : [...prev.days, day]
    }));
  };

  // 일정 등록 함수
  const addSchedule = () => {
    if (!newSchedule.name) return;
    if (isRoutineMode) {
      setRoutines([...routines, { ...newSchedule, id: Date.now(), completed: false }]);
    } else {
      setTasks([...tasks, { id: Date.now(), name: newSchedule.name, completed: false }]);
    }
    setNewSchedule({ name: '', time: '09:00', days: [] });
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans relative transition-colors duration-700 ${themeClass.bg}`}>
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000 scale-105" style={{ backgroundImage: bgUrl ? `url('${bgUrl}')` : 'none' }}>
        <div className={`absolute inset-0 transition-colors duration-700 ${themeClass.overlay} backdrop-blur-[2px]`}></div>
      </div>

      {/* Sidebar */}
      <aside className={`relative z-20 ${isSidebarOpen ? 'w-80' : 'w-24'} ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-3xl border-r border-white/10 transition-all duration-500 flex flex-col shadow-2xl`}>
        <div className="p-8 flex items-center justify-between">
          {isSidebarOpen && <h1 className="font-bold text-xl tracking-tight italic">AI Manager</h1>}
          <div className="flex gap-2">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 hover:bg-white/20 rounded-xl transition-all">
              {isDarkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-600" />}
            </button>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-white/20 rounded-xl transition-all">
              {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {[{ id: 'study', name: 'Study Mode', icon: <BookOpen size={22} /> }, { id: 'workout', name: 'Workout Mode', icon: <Dumbbell size={22} /> }, { id: 'community', name: 'Community', icon: <Users size={22} /> }].map((item) => (
            <button key={item.id} onClick={() => navigate("/main")} className={`w-full flex items-center ${isSidebarOpen ? 'px-6' : 'justify-center'} py-4 rounded-[1.25rem] transition-all border ${activeTab === item.id ? (isDarkMode ? 'bg-white/20 border-white/30' : 'bg-black/10 border-black/10') : 'opacity-40 hover:opacity-100'}`}>
              {item.icon} {isSidebarOpen && <span className="ml-4 font-semibold text-sm">{item.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Area */}
      <main className="relative z-10 flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* AI Briefing Card */}
          <section className={`${themeClass.card} backdrop-blur-3xl p-10 rounded-[2.5rem] border shadow-2xl flex items-start gap-8`}>
            <div className="bg-white/10 p-5 rounded-3xl border border-white/20 shadow-inner">
              <Sparkles className="text-yellow-300 animate-pulse" size={32} />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2 tracking-tight">AI 코칭 브리핑</h2>
              <p className="text-xl font-medium opacity-80 leading-relaxed italic">
                "{stats.totalRate > 70 ? '완벽한 페이스입니다! 현재 루틴을 잘 유지하고 계시네요.' : '조금 더 힘을 내볼까요? 오늘 할 일부터 하나씩 체크해보세요.'}"
              </p>
            </div>
          </section>

          {/* Gemini Chat */}
          <section className={`${themeClass.card} backdrop-blur-2xl p-6 rounded-[2rem] border shadow-xl`}>
            <div className={`flex items-center gap-3 p-3 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-black/5'} border border-white/10`}>
              <input 
                className="bg-transparent flex-1 outline-none text-sm px-2" 
                placeholder="제미나이에게 오늘 일정을 물어보세요..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="p-2 bg-indigo-600 rounded-xl text-white hover:bg-indigo-700 transition-all"><Send size={18} /></button>
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <section className="xl:col-span-8 space-y-8">
              {/* 등록 카드 (추가된 기능) */}
              <div className={`${themeClass.card} p-8 rounded-[2.5rem] border shadow-lg space-y-6`}>
                <div className="flex items-center justify-between">
                   <h4 className="font-bold flex items-center gap-2"><Plus size={20}/> 일정 등록</h4>
                   <div className="flex bg-black/20 p-1 rounded-xl border border-white/10">
                      <button onClick={() => setIsRoutineMode(true)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${isRoutineMode ? 'bg-white text-black shadow-md' : 'text-white/40'}`}>고정 루틴</button>
                      <button onClick={() => setIsRoutineMode(false)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${!isRoutineMode ? 'bg-white text-black shadow-md' : 'text-white/40'}`}>일반 일정</button>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <input 
                      className={`w-full p-4 rounded-2xl outline-none border ${isDarkMode ? 'bg-white/5 border-white/10 focus:border-white/30' : 'bg-white border-gray-200 focus:border-indigo-500'}`} 
                      placeholder="무엇을 하실 예정인가요?" 
                      value={newSchedule.name}
                      onChange={e => setNewSchedule({...newSchedule, name: e.target.value})}
                    />
                    {isRoutineMode && (
                      <div className="flex items-center gap-3 px-2">
                        <Clock size={16} className="opacity-40" />
                        <input type="time" className="bg-transparent outline-none font-bold" value={newSchedule.time} onChange={e => setNewSchedule({...newSchedule, time: e.target.value})} />
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    {isRoutineMode && (
                      <div className="flex justify-between gap-1">
                        {DAYS_OF_WEEK.map(day => (
                          <button key={day} onClick={() => toggleDay(day)} className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${newSchedule.days.includes(day) ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'bg-white/5 text-white/40 border border-white/5 hover:bg-white/10'}`}>{day}</button>
                        ))}
                      </div>
                    )}
                    <button onClick={addSchedule} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl transition-all active:scale-95">일정 추가하기</button>
                  </div>
                </div>
              </div>

              {/* 일정 목록 */}
              <div className="space-y-6">
                {/* Pinned Routines */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest opacity-40 flex items-center gap-2 px-2"><Pin size={14}/> Fixed Routines</h3>
                  {routines.map(r => (
                    <div key={r.id} className={`${themeClass.card} p-6 rounded-[2rem] border flex items-center group transition-all`}>
                      <button onClick={() => setRoutines(routines.map(item => item.id === r.id ? {...item, completed: !item.completed} : item))} className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-6 transition-all ${r.completed ? 'bg-green-500 text-white shadow-lg shadow-green-500/40' : 'bg-white/5 text-white/20 border border-white/10'}`}>
                        <CheckCircle size={24} />
                      </button>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold ${r.completed ? 'opacity-30 line-through' : ''}`}>{r.name}</h4>
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{r.time} • {r.days.join(', ')}</p>
                      </div>
                      <button onClick={() => setRoutines(routines.filter(item => item.id !== r.id))} className="opacity-0 group-hover:opacity-100 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"><Trash2 size={20}/></button>
                    </div>
                  ))}
                </div>

                {/* One-time Tasks */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest opacity-40 flex items-center gap-2 px-2"><Activity size={14}/> One-time Tasks</h3>
                  {tasks.map(t => (
                    <div key={t.id} className={`${themeClass.card} p-6 rounded-[2rem] border flex items-center group transition-all`}>
                      <input type="checkbox" checked={t.completed} onChange={() => setTasks(tasks.map(item => item.id === t.id ? {...item, completed: !item.completed} : item))} className="w-6 h-6 rounded-lg mr-6 bg-white/5 border-white/20" />
                      <span className={`flex-1 text-lg font-bold ${t.completed ? 'opacity-30 line-through' : ''}`}>{t.name}</span>
                      <button onClick={() => setTasks(tasks.filter(item => item.id !== t.id))} className="opacity-0 group-hover:opacity-100 p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all"><Trash2 size={20}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Weather & Stats (4 cols) */}
            <aside className="xl:col-span-4 space-y-8">
              <div className={`${themeClass.card} p-10 rounded-[3.5rem] border shadow-2xl text-center relative overflow-hidden`}>
                <div className="text-yellow-400 mb-6 drop-shadow-[0_0_20px_rgba(253,224,71,0.3)]">
                  {React.cloneElement(weather.icon as React.ReactElement, { size: 100 })}
                </div>
                <div className="text-7xl font-light tracking-tighter mb-2">{weather.temp}°</div>
                <p className="text-lg font-medium opacity-40 uppercase tracking-widest mb-8">{weather.desc}</p>
                <div className="grid grid-cols-2 gap-4 pt-8 border-t border-white/10 text-xs font-bold opacity-40">
                  <div><p>HUMIDITY</p><p className="text-lg font-mono">45%</p></div>
                  <div><p>WIND</p><p className="text-lg font-mono">2.4m/s</p></div>
                </div>
              </div>

              <div className={`${themeClass.card} p-8 rounded-[2.5rem] border shadow-xl`}>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4 block">Efficiency Grade</span>
                <div className="flex items-end gap-2 mb-4">
                  <p className="text-5xl font-bold tracking-tighter">{stats.totalRate}</p><span className="text-xl opacity-30 mb-1.5">%</span>
                </div>
                <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden">
                  <div className={`h-full ${isDarkMode ? 'bg-white' : 'bg-indigo-600'} transition-all duration-1000`} style={{ width: `${stats.totalRate}%` }}></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};