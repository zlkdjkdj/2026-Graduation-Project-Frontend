import { useState, useMemo } from 'react';

// ── 역할: 일정(루틴/할일) 데이터 관리 및 성취도 계산 로직 ──
export const useSchedule = () => {
  const [routines, setRoutines] = useState([
    { id: 1, name: '아침 명상 10분', time: '07:00', days: ['월', '화', '수', '목', '금'], completed: true },
    { id: 2, name: '테크 아티클 읽기', time: '08:30', days: ['월', '수', '금'], completed: false },
  ]);
  const [tasks, setTasks] = useState([
    { id: 1, name: '프로젝트 리팩토링', completed: false },
  ]);

  // 성취도 통계 계산
  const stats = useMemo(() => {
    const rTotal = routines.length;
    const rDone = routines.filter(r => r.completed).length;
    const tTotal = tasks.length;
    const tDone = tasks.filter(t => t.completed).length;

    const routineRate = rTotal > 0 ? Math.round((rDone / rTotal) * 100) : 0;
    const taskRate = tTotal > 0 ? Math.round((tDone / tTotal) * 100) : 0;
    const totalRate = rTotal + tTotal > 0 ? Math.round(((rDone + tDone) / (rTotal + tTotal)) * 100) : 0;

    return { routineRate, taskRate, totalRate };
  }, [routines, tasks]);

  // 일정 추가
  const addSchedule = (name: string, isRoutine: boolean, options?: { time: string, days: string[] }) => {
    if (!name) return;
    const id = Date.now();
    if (isRoutine && options) {
      setRoutines(prev => [...prev, { id, name, completed: false, ...options }]);
    } else {
      setTasks(prev => [...prev, { id, name, completed: false }]);
    }
  };

  return { routines, tasks, stats, setRoutines, setTasks, addSchedule };
};