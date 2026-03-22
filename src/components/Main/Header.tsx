import { Sparkles, BookOpen, Dumbbell, Users, Sun, Moon } from 'lucide-react';
import { Mode } from './Types';

export function Header({ mode, setMode, dark, setDark, userPoints, t }: any) {
  return (
    <header className={`fixed top-0 inset-x-0 z-50 border-b ${t.nav}`}>
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2.5 rounded-xl shadow-lg">
            <Sparkles className="text-white" size={22} />
          </div>
          <h1 className="text-xl font-black italic uppercase tracking-tighter opacity-90">Learn-Time AI</h1>
        </div>
        
        <nav className={`hidden md:flex p-1.5 rounded-2xl border ${dark ? 'bg-black/40 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
          {(['edu', 'fitness', 'community'] as Mode[]).map(m => (
            <button key={m} onClick={() => setMode(m)} className={`flex items-center gap-2.5 px-7 py-2.5 rounded-xl text-[13px] font-bold uppercase transition-all ${mode === m ? t.tabActive : 'text-slate-400'}`}>
              {m === 'edu' ? <BookOpen size={15} /> : m === 'fitness' ? <Dumbbell size={15} /> : <Users size={15} />} {m}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className={`text-xs font-black ${t.accent}`}>{userPoints} PT</span>
          <button onClick={() => setDark(!dark)} className={`p-2.5 rounded-xl border ${dark ? 'text-yellow-400' : 'text-indigo-600'}`}>
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}