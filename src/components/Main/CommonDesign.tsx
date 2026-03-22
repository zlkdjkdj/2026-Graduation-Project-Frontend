//공통 ui, 재사용 가능한 컴포넌트 모음
import React from 'react';
import { getTheme } from './Mode';

export function SectionHeading({ icon, title, sub, action }: {
  icon: React.ReactNode; title: string; sub?: string; action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-500 border border-indigo-500/20 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight uppercase italic leading-tight">{title}</h3>
          {sub && <p className="text-xs font-semibold mt-0.5 opacity-40">{sub}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatCard({ icon, value, unit, label, dark }: {
  icon: React.ReactNode; value: number | string; unit: string; label: string; dark: boolean
}) {
  const t = getTheme(dark);
  return (
    <div className={`p-7 rounded-[2rem] border ${t.card} flex flex-col gap-3`}>
      <div className="flex items-center justify-between"><div>{icon}</div></div>
      <div>
        <p className="text-3xl font-black tracking-tight leading-none">
          {value}<span className="text-base font-semibold ml-1.5 opacity-40">{unit}</span>
        </p>
        <p className="text-[11px] font-bold uppercase tracking-widest opacity-40 mt-2">{label}</p>
      </div>
    </div>
  );
}

export function ProgressBar({ label, value, max, color, dark }: {
  label: string; value: number; max: number; color: string; dark: boolean
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest opacity-50">{label}</span>
        <span className="text-xs font-black tabular-nums">{value}<span className="opacity-40">/{max}</span></span>
      </div>
      <div className={`h-2.5 w-full rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
        <div className={`h-full rounded-full transition-all duration-1000 ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}