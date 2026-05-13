import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import type { Todo } from '../../types';
import {
  SyllabusBox, ChecklistBox, QuizGeneratorBox, StopwatchBox,
  AiSuggestionBox, DashboardBox, GeminiBox,
} from '../../components/section/study';
import { PlusIcon, BookIcon, XIcon } from '../../components/ui/Icons';

export function StudyPage() {
  const { selectedSubject } = useOutletContext<{ selectedSubject: string }>() || { selectedSubject: 'all' };
  
  // Empty state 초기화
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: '1장: 미적분 기초 (1~15페이지)', completed: true, isAi: true },
    { id: '2', text: '2장: 도함수의 활용 핵심 예제 풀이', completed: false, isAi: true },
    { id: '3', text: '수학 익힘책 오답노트 작성', completed: false, isAi: false },
    { id: '4', text: '저녁 운동 및 명상', completed: false, isAi: false },
  ]);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [isPeriodEditOpen, setIsPeriodEditOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerateSyllabus = (newItems: Todo[], start?: string, end?: string) => {
    if (start) setStartDate(start);
    if (end) setEndDate(end);
    setTodos([...todos, ...newItems]);
    setIsSyllabusModalOpen(false);
  };

  const subjectNames: Record<string, string> = {
    all: '전체 과목',
    math: '수학',
    english: '영어',
    science: '과학',
    history: '역사'
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tightest mb-2 border-l-8 border-indigo-600 pl-6">학습 스튜디오 <span className="text-xl text-indigo-500 ml-2 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-xl">{subjectNames[selectedSubject]}</span></h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium ml-2">AI와 함께하는 스마트한 학습 몰입 환경을 경험하세요.</p>
        </div>
        {todos.length > 0 && (
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setIsPeriodEditOpen(true)}
              className="px-6 py-3 bg-white dark:bg-[#111] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl cursor-pointer hover:border-indigo-500 transition-all shadow-sm flex flex-col items-center"
            >
              <p className="text-[0.55rem] font-black text-gray-400 uppercase tracking-widest">학습 기간</p>
              <p className="text-sm font-black text-indigo-600">
                {startDate && endDate ? `${startDate} ~ ${endDate}` : '기간 설정 필요'}
              </p>
            </div>
            <button 
              onClick={() => setIsSyllabusModalOpen(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#111] border border-gray-200 dark:border-[#222] rounded-2xl font-bold text-sm hover:border-indigo-500 transition-all shadow-sm"
            >
              <PlusIcon size={16} /> 진도 추가
            </button>
          </div>
        )}
      </header>
      
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-dashed border-gray-200 dark:border-[#222] shadow-sm text-center px-4">
          <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mb-6 text-indigo-500">
            <BookIcon size={40} />
          </div>
          <h2 className="text-2xl font-black mb-3 text-gray-800 dark:text-gray-200">아직 등록된 진도가 없습니다.</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md mx-auto font-medium">강의계획서나 목차 이미지를 업로드하면 AI가 자동으로 최적의 학습 진도를 생성해 드립니다.</p>
          <button 
            onClick={() => setIsSyllabusModalOpen(true)}
            className="flex items-center gap-2 px-10 py-5 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-500/20"
          >
            <PlusIcon size={20} /> AI 자동 진도 생성하기
          </button>
        </div>
      ) : (
        <div className="bento-grid">
          {/* Row 1: 8 + 4 */}
          <div className="col-span-12 lg:col-span-8">
            <DashboardBox startDate={startDate} endDate={endDate} />
          </div>
          
          <div className="col-span-12 md:col-span-6 lg:col-span-4 lg:row-span-2 h-full">
            <ChecklistBox todos={todos} setTodos={setTodos} />
          </div>

          {/* Row 2: 4 + 4 (+ 4 from ChecklistBox above) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <StopwatchBox />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <AiSuggestionBox />
          </div>

          {/* Row 3: 8 + 4 */}
          <div className="col-span-12 lg:col-span-8">
             <QuizGeneratorBox />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <GeminiBox />
          </div>
        </div>
      )}

      {/* AI 진도 생성 모달 */}
      {isSyllabusModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-xl rounded-[3rem] border border-gray-100 dark:border-[#1a1a1a] shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsSyllabusModalOpen(false)}
              className="absolute top-6 right-6 p-3 bg-gray-50 dark:bg-[#111] hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-2xl text-gray-400 transition-all z-10"
            >
              <XIcon size={20} />
            </button>
            <SyllabusBox onGenerate={handleGenerateSyllabus} initialStart={startDate} initialEnd={endDate} />
          </div>
        </div>
      )}

      {/* 기간 수정 모달 */}
      {isPeriodEditOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a0a0a] w-full max-w-sm rounded-[2.5rem] border border-gray-100 dark:border-[#1a1a1a] shadow-2xl p-8 relative animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black mb-6">학습 기간 수정</h3>
            <div className="space-y-4 mb-8">
              <div className="flex flex-col gap-2">
                <label className="text-[0.6rem] font-black uppercase tracking-widest text-gray-400">시작일</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.6rem] font-black uppercase tracking-widest text-gray-400">종료일</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
              </div>
            </div>
            <button 
              onClick={() => setIsPeriodEditOpen(false)}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
            >
              수정 완료
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
