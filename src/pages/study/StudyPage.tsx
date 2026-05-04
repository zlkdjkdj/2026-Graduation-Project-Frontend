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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="mb-12">
        <h1 className="text-4xl font-black tracking-tightest mb-2 border-l-8 border-indigo-600 pl-6">학습 스튜디오</h1>
        <p className="text-gray-500 dark:text-gray-400 font-medium ml-2">AI와 함께하는 스마트한 학습 몰입 환경을 경험하세요.</p>
      </header>
      
      <div className="bento-grid">
        <div className="col-span-12 lg:col-span-8 row-span-1">
          <DashboardBox />
        </div>
        
        <div className="col-span-12 lg:col-span-4 row-span-2">
          <SyllabusBox onGenerate={(newItems) => setTodos([...todos, ...newItems])} />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 h-full">
          <ChecklistBox todos={todos} setTodos={setTodos} />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <StopwatchBox />
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-5">
           <DiaryBox title="인사이트" placeholder="오늘의 학습 성찰을 기록하세요..." color="blue" />
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-4">
          <AiSuggestionBox title="AI 전략 가이드" color="blue" />
        </div>

        <div className="col-span-12 lg:col-span-3">
          <GeminiBox />
        </div>
      </div>
    </div>
  );
}
