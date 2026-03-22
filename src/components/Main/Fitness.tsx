import React from 'react';
import { Flame, Clock, Scale, Dumbbell, Save, Trash2 } from 'lucide-react';
import { SectionHeading, StatCard } from './CommonDesign';
import { getTheme, BODY_PARTS, FITNESS_SUGG_STYLE } from './Mode';
import { useFitness } from '../../utils/Main/useFitness';

export function Fitness({ dark, earnPoints }: { dark: boolean; earnPoints: () => void }) {
  const t = getTheme(dark);
  const { state, stats, actions } = useFitness(earnPoints);

  return (
    <div className="space-y-8 animate-slideUp">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <StatCard icon={<Flame className="text-orange-400" size={24} />} value={stats.burnedCal} unit="kcal" label="소모 칼로리" dark={dark} />
        <StatCard icon={<Clock className="text-violet-400" size={24} />} value={stats.totalMin} unit="분" label="오늘 운동 시간" dark={dark} />
        <StatCard icon={<Scale className="text-blue-400" size={24} />} value={stats.latestWeight} unit="kg" label="현재 체중" dark={dark} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout log */}
        <div className={`p-8 md:p-10 rounded-[3rem] border ${t.card} space-y-6`}>
          <SectionHeading icon={<Dumbbell size={22} />} title="운동 기록" sub="오늘 진행한 운동을 기록하세요" />
          <div>
            <p className={`text-[11px] font-black uppercase tracking-widest mb-3 ${t.label}`}>운동 부위 선택</p>
            <div className="flex flex-wrap gap-2">
              {BODY_PARTS.map(p => (
                <button key={p} onClick={() => actions.togglePart(p)} className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${state.selParts.includes(p) ? 'bg-orange-500 border-orange-500 text-white shadow-lg' : `border-slate-700 ${t.textMuted} hover:border-orange-500`}`}>{p}</button>
              ))}
            </div>
          </div>
          <div className="space-y-3">
            <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>운동 시간 (분)</label>
            <input type="number" value={state.workoutMin} onChange={e => actions.setWorkoutMin(e.target.value)} placeholder="예: 60" className={`w-full rounded-2xl px-5 py-3.5 font-semibold text-sm outline-none border-2 transition-all ${t.input}`} />
          </div>
          <div className="space-y-3">
            <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>운동 내용 메모</label>
            <textarea rows={3} value={state.workoutMemo} onChange={e => actions.setWorkoutMemo(e.target.value)} placeholder="오늘 한 운동을 간단히 메모해보세요..." className={`w-full rounded-2xl px-5 py-3.5 font-semibold text-sm resize-none outline-none border-2 transition-all ${t.input}`} />
          </div>
          <button onClick={actions.saveWorkout} className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white rounded-2xl font-black text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2"><Save size={18} /> 운동 저장 (+10 PT)</button>
          
          {/* AI Coach Feedback */}
          {state.fitSugg.length > 0 && (
            <div className={`pt-5 border-t ${t.divider} space-y-3`}>
              <p className={`text-[11px] font-black uppercase tracking-widest ${t.label}`}>AI 코치 피드백</p>
              {state.fitSugg.map(s => {
                const style = FITNESS_SUGG_STYLE[s.type];
                return (
                  <div key={s.id} className={`p-4 rounded-2xl border ${style.border} flex items-start gap-3`}>
                    <div className={`p-2.5 rounded-xl border ${style.badge} shrink-0`}>{style.icon}</div>
                    <div className="flex-1 min-w-0"><p className="text-sm font-bold leading-tight">{s.title}</p><p className={`text-xs mt-1 font-medium ${t.textMuted}`}>{s.body}</p></div>
                    <button onClick={() => actions.dismissFitSugg(s.id)} className={`${t.textMuted} hover:text-rose-400 transition-colors p-1 shrink-0`}><Trash2 size={15} /></button>
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
              <input type="number" step="0.1" value={state.weightInput} onChange={e => actions.setWeightInput(e.target.value)} placeholder="74.5" className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold outline-none border-2 transition-all ${t.input}`} />
            </div>
            <div className="flex-1 space-y-2">
              <label className={`block text-[11px] font-black uppercase tracking-widest ${t.label}`}>체지방 (%)</label>
              <input type="number" step="0.1" value={state.fatInput} onChange={e => actions.setFatInput(e.target.value)} placeholder="선택" className={`w-full rounded-xl px-4 py-3.5 text-sm font-semibold outline-none border-2 transition-all ${t.input}`} />
            </div>
          </div>
          <button onClick={actions.saveWeight} className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2"><Save size={16} /> 체중 저장</button>
          
          {/* Chart Section */}
          <div className={`pt-5 border-t ${t.divider}`}>
            <p className={`text-[11px] font-black uppercase tracking-widest ${t.label} mb-4`}>최근 체중 추이</p>
            <div className="flex items-end justify-between gap-2 h-28">
              {stats.weightLog.map((w, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                  <div className="w-full bg-indigo-600/40 group-hover:bg-indigo-500 rounded-t-xl transition-all" style={{ height: `${(w.weight / 100) * 100}%` }} />
                  <span className={`text-[9px] font-bold ${t.textMuted}`}>{w.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}