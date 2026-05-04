import { useState } from 'react';
import type { Todo } from '../../types';
import { 
  SyllabusBox, ChecklistBox, DiaryBox, StopwatchBox, 
  AiSuggestionBox, DashboardBox, GeminiBox 
} from '../../components/section/StudySection';

export function StudyPage() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: '1장: 미적분 기초 (1~15페이지)', completed: true, isAi: true },
    { id: '2', text: '수학 익힘책 오답노트 작성', completed: false, isAi: false },
  ]);

  return (
    <div className="flex flex-col gap-6 flex-grow animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-grow min-h-0">
        <div className="flex flex-col gap-6 h-full">
          <SyllabusBox onGenerate={(newItems) => setTodos([...todos, ...newItems])} />
          <ChecklistBox todos={todos} setTodos={setTodos} themeColor="blue" />
          <div className="flex-grow flex flex-col min-h-[200px]">
            <DiaryBox title="공부 일기" placeholder="오늘 어떤 것을 공부했나요?" color="blue" />
          </div>
        </div>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-grow flex flex-col">
            <StopwatchBox />
          </div>
          <GeminiBox />
          <AiSuggestionBox title="AI 학습 제안" color="blue" />
        </div>
      </div>
      <DashboardBox />
    </div>
  );
}
