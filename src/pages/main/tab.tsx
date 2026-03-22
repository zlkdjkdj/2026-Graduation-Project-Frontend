// 대시보드 메인 레이아웃 구성 
import React, { useState } from 'react';
import { useSchedule } from '../../utils/useSchedule'; 
import { useWeather } from '../../utils/Weather'; 
import { Sidebar } from '../../../src/components/Tab/Sidebar';
import { AiBriefing } from '../../../src/components/Tab/AiBriefing';
import { ScheduleForm } from '../../../src/components/Tab/ScheduleForm';
import { ScheduleList } from '../../../src/components/Tab/ScheduleList';
import { WeatherWidget } from '../../../src/components/Tab/WeatherWidget';
import { EfficiencyWidget } from '../../../src/components/Tab/EfficiencyWidget'; 

export const TabPage = () => {
  // 테마 설정
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // 데이터 호출
  const { routines, tasks, stats, setRoutines, setTasks, addSchedule } = useSchedule();
  const { weather } = useWeather();

  // 테마 시스템 
  const theme = isDarkMode 
    ? { 
        bg: "bg-black text-white", 
        card: "bg-white/10 border-white/20", 
        overlay: "bg-black/50" 
      } 
    : { 
        bg: "bg-[#f5f5f7] text-gray-900", 
        card: "bg-white/80 border-gray-200 shadow-sm", 
        overlay: "bg-white/20" 
      };

  return (
    <div className={`flex h-screen overflow-hidden relative transition-colors duration-700 ${theme.bg}`}>
      
      {/* 1. 사이드바 영역 */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setIsOpen={setIsSidebarOpen} 
        isDark={isDarkMode} 
        setIsDark={setIsDarkMode} 
      />

      {/* 2. 메인 컨텐츠 영역 */}
      <main className="relative z-10 flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <AiBriefing stats={stats} theme={theme} />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            
            {/* 좌측 (8컬럼): 일정 등록 및 리스트 관리 */}
            <section className="xl:col-span-8 space-y-8">
              <ScheduleForm 
                onAdd={addSchedule} 
                isDark={isDarkMode} 
                theme={theme} 
              />
              <ScheduleList 
                routines={routines} 
                tasks={tasks} 
                onUpdateRoutines={setRoutines} 
                onUpdateTasks={setTasks} 
                theme={theme}
              />
            </section>

            {/* 우측 (4컬럼): 실시간 날씨 위젯 및 성취도 그래프 */}
            <aside className="xl:col-span-4 space-y-8">
              <WeatherWidget 
                weather={weather} 
                isDark={isDarkMode} 
                theme={theme} 
              />
              
            
              <EfficiencyWidget 
                stats={stats} 
                theme={theme} 
                isDark={isDarkMode} 
              />
            </aside>
            
          </div>
        </div>
      </main>
    </div>
  );
};