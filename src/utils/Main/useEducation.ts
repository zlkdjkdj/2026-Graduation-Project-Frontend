import { useState, useEffect, useMemo } from 'react';
import type { AiGuideTask, Task, StudySuggestion, StudyLog } from '../../components/Main/Types';
import { TODAY, MOCK_NEW_STUDY_SUGGESTIONS } from '../../components/Main/Mode';

export function useEducation(earnPoints: () => void) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isRefreshingSugg, setIsRefreshingSugg] = useState(false);

  // --- State ---
  const [bookTitle, setBookTitle] = useState('React 완벽 가이드');
  const [startDate, setStartDate] = useState('2026-03-01');
  const [endDate, setEndDate] = useState('2026-03-31');
  const [totalDays, setTotalDays] = useState(31);
  const [aiTasks, setAiTasks] = useState<AiGuideTask[]>([]);
  const [manTasks, setManTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [studySugg, setStudySugg] = useState<StudySuggestion[]>([]);
  const [studyMin, setStudyMin] = useState('');
  const [studyMemo, setStudyMemo] = useState('');
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>([]);

  useEffect(() => {
    setAiTasks([
      { id: 1, text: '오후 3시 — 컴포넌트 생명주기 복습', done: false, tag: '우선순위', tagColor: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/20' },
      { id: 2, text: '암기 효율 피크 타임 활용하기', done: true, tag: 'AI 추천', tagColor: 'bg-violet-500/15 text-violet-400 border-violet-500/20' },
    ]);
    setStudySugg([{ id: 1, type: 'tip', read: false, title: '지금이 집중력 피크 타임이에요', body: '오후 2~4시는 골든 타임입니다.', time: '14:02' }]);
  }, []);

  // --- Derived Values (계산 로직) ---
  const stats = useMemo(() => {
    const elapsedDays = startDate ? Math.max(0, Math.min(Math.floor((Date.now() - new Date(startDate).getTime()) / 86400000) + 1, totalDays)) : 0;
    const remainingDays = endDate ? Math.max(0, Math.floor((new Date(endDate).getTime() - Date.now()) / 86400000)) : 0;
    const allTasks = [...aiTasks, ...manTasks];
    const donePct = allTasks.length > 0 ? Math.round(allTasks.filter(x => x.done).length / allTasks.length * 100) : 0;
    const periodPct = totalDays > 0 ? Math.round((elapsedDays / totalDays) * 100) : 0;
    
    return { elapsedDays, remainingDays, donePct, gap: donePct - periodPct };
  }, [startDate, endDate, totalDays, aiTasks, manTasks]);

  // --- Handlers ---
  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => { setIsAnalyzing(false); alert('AI 분석 완료!'); }, 2000);
  };

  const handleRefreshStudySugg = () => {
    setIsRefreshingSugg(true);
    setTimeout(() => {
      const r = MOCK_NEW_STUDY_SUGGESTIONS[Math.floor(Math.random() * MOCK_NEW_STUDY_SUGGESTIONS.length)];
      setStudySugg(prev => [{ ...r, id: Date.now(), time: '방금', read: false } as StudySuggestion, ...prev]);
      setIsRefreshingSugg(false);
    }, 1200);
  };

  const toggleAiTask = (id: number) => setAiTasks(p => p.map(x => { if (x.id === id && !x.done) earnPoints(); return x.id === id ? { ...x, done: !x.done } : x; }));
  const toggleManTask = (id: number) => setManTasks(p => p.map(x => { if (x.id === id && !x.done) earnPoints(); return x.id === id ? { ...x, done: !x.done } : x; }));
  const addManTask = () => { if (!newTask.trim()) return; setManTasks(p => [...p, { id: Date.now(), text: newTask, done: false, time: '방금' }]); setNewTask(''); };
  const deleteManTask = (id: number) => setManTasks(p => p.filter(x => x.id !== id));
  const dismissSugg = (id: number) => setStudySugg(p => p.filter(x => x.id !== id));

  const saveStudyLog = () => {
    if (!studyMin) return;
    setStudyLogs(p => [{ id: Date.now(), date: TODAY, durationMin: Number(studyMin), content: studyMemo }, ...p]);
    earnPoints();
    setStudyMin(''); setStudyMemo('');
  };

  return {
    state: { bookTitle, startDate, endDate, totalDays, aiTasks, manTasks, newTask, studySugg, studyMin, studyMemo, studyLogs, isAnalyzing, isRefreshingSugg },
    stats,
    actions: { 
      setBookTitle, setStartDate, setEndDate, setTotalDays, setNewTask, setStudyMin, setStudyMemo,
      handleStartAnalysis, handleRefreshStudySugg, toggleAiTask, toggleManTask, addManTask, deleteManTask, dismissSugg, saveStudyLog 
    }
  };
}