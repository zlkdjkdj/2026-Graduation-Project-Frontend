import { Sun, Moon, ChevronLeft, ChevronRight, BookOpen, Dumbbell, Users } from 'lucide-react';
import { useNavigate } from 'react-router';

export function Sidebar({ isOpen, setIsOpen, isDark, setIsDark }: any) {
  const navigate = useNavigate();
  const tabs = [
    { id: 'study', name: 'Study Mode', icon: <BookOpen size={22} /> },
    { id: 'workout', name: 'Workout Mode', icon: <Dumbbell size={22} /> },
    { id: 'community', name: 'Community', icon: <Users size={22} /> }
  ];

  return (
    <aside className={`relative z-20 ${isOpen ? 'w-80' : 'w-24'} ${isDark ? 'bg-white/5' : 'bg-black/5'} backdrop-blur-3xl border-r border-white/10 transition-all duration-500 flex flex-col shadow-2xl`}>
      <div className="p-8 flex items-center justify-between">
        {isOpen && <h1 className="font-bold text-xl tracking-tight italic">AI Manager</h1>}
        <div className="flex gap-2">
          <button onClick={() => setIsDark(!isDark)} className="p-2 hover:bg-white/20 rounded-xl transition-all">
            {isDark ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-indigo-600" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-white/20 rounded-xl transition-all">
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {tabs.map((item) => (
          <button key={item.id} onClick={() => navigate("/main")} className={`w-full flex items-center ${isOpen ? 'px-6' : 'justify-center'} py-4 rounded-[1.25rem] transition-all border border-transparent opacity-40 hover:opacity-100 hover:bg-white/10`}>
            {item.icon} {isOpen && <span className="ml-4 font-semibold text-sm">{item.name}</span>}
          </button>
        ))}
      </nav>
    </aside>
  );
}