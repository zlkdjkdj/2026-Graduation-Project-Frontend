import { useState, useEffect, useMemo } from 'react';
import { WorkoutLog, WeightEntry, FitnessSuggestion, BodyPart } from '../../components/Main/Types';
import { TODAY } from '../../components/Main/Mode';

export function useFitness(earnPoints: () => void) {
  // --- State ---
  const [selParts, setSelParts] = useState<BodyPart[]>([]);
  const [workoutMin, setWorkoutMin] = useState('');
  const [workoutMemo, setWorkoutMemo] = useState('');
  const [weightInput, setWeightInput] = useState('');
  const [fatInput, setFatInput] = useState('');
  const [workouts, setWorkouts] = useState<WorkoutLog[]>([]);
  const [weightLog, setWeightLog] = useState<WeightEntry[]>([]);
  const [fitSugg, setFitSugg] = useState<FitnessSuggestion[]>([]);

  useEffect(() => {
    setWeightLog([
      { date: '03-18', weight: 75.2 }, { date: '03-19', weight: 74.8 },
      { date: '03-20', weight: 74.5 }, { date: '03-21', weight: 74.3 }
    ]);
    setFitSugg([{ id: 1, type: 'praise', title: '오늘 운동량 충분합니다 💪', body: '목표치를 달성했습니다!', time: '방금' }]);
  }, []);

  // --- Derived Values ---
  const stats = useMemo(() => {
    const todayWorkouts = workouts.filter(w => w.date === TODAY);
    return {
      burnedCal: todayWorkouts.reduce((s, w) => s + w.calories, 0),
      totalMin: todayWorkouts.reduce((s, w) => s + w.durationMin, 0),
      latestWeight: weightLog[weightLog.length - 1]?.weight ?? 0,
      weightLog: weightLog.slice(-7)
    };
  }, [workouts, weightLog]);

  // --- Handlers ---
  const togglePart = (p: BodyPart) => setSelParts(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  
  const saveWorkout = () => {
    if (!workoutMin) return;
    setWorkouts(p => [...p, { id: Date.now(), date: TODAY, durationMin: Number(workoutMin), calories: Math.round(Number(workoutMin) * 6.5), memo: workoutMemo }]);
    earnPoints();
    setWorkoutMin(''); setWorkoutMemo(''); setSelParts([]);
  };

  const saveWeight = () => {
    if (!weightInput) return;
    setWeightLog(p => [...p, { date: TODAY.slice(5), weight: Number(weightInput), bodyFat: fatInput ? Number(fatInput) : undefined }]);
    setWeightInput(''); setFatInput('');
  };

  const dismissFitSugg = (id: number) => setFitSugg(p => p.filter(x => x.id !== id));

  return {
    state: { selParts, workoutMin, workoutMemo, weightInput, fatInput, workouts, fitSugg },
    stats,
    actions: { setWorkoutMin, setWorkoutMemo, setWeightInput, setFatInput, togglePart, saveWorkout, saveWeight, dismissFitSugg }
  };
}