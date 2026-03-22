// src/components/Tab/EfficiencyWidget.jsx
import React from 'react';

// stats, theme, isDark 
export const EfficiencyWidget = ({ stats, theme, isDark }) => {
  return (
    <div className={`${theme.card} p-8 rounded-[2.5rem] border backdrop-blur-sm`}>
      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-4 block">
        Efficiency Grade
      </span>
      <div className="flex items-end gap-2 mb-4">
        <p className="text-5xl font-bold tracking-tighter">{stats.totalRate}</p>
        <span className="text-xl opacity-30 mb-1.5">%</span>
      </div>
      
      {/* 진행 상태 바: isDark 사용 */}
      <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ${isDark ? 'bg-white' : 'bg-indigo-600'}`} 
          style={{ width: `${stats.totalRate}%` }}
        ></div>
      </div>
    </div>
  );
};