// ============================================================
// components/section/study/SyllabusBox.tsx
// 강의 계획서 업로드 및 AI 로드맵 생성 카드.
//
// 기능:
//   - 강의계획서 이미지 업로드 영역 (현재 UI만 구현, 파일 처리 미구현)
//   - 학습 시작일 / 종료일 날짜 입력
//   - "AI 로드맵 생성" 버튼 클릭 시 onGenerate 콜백으로 더미 Todo 항목 전달
//     (추후 실제 AI API 연동 필요)
// ============================================================
import { useState } from 'react';
import type { Todo } from '../../../types';
import { SparklesIcon, UploadIcon } from '../../ui/Icons';
import { Card, CardTitle } from '../../common/Card';

export function SyllabusBox({ onGenerate, initialStart = '', initialEnd = '' }: { 
  onGenerate: (items: Todo[], start?: string, end?: string) => void;
  initialStart?: string;
  initialEnd?: string;
}) {
  const [start, setStart] = useState(initialStart);
  const [end, setEnd] = useState(initialEnd);
  return (
    <Card className="glow-indigo h-full border-t-4 border-indigo-500">
      <CardTitle icon={<SparklesIcon size={18} />}>AI 자동 진도 제공</CardTitle>
      <div className="mb-8 border-2 border-dashed border-gray-100 dark:border-[#1a1a1a] bg-gray-50/30 dark:bg-[#050505] rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-all group">
        <UploadIcon size={32} className="text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
        <p className="mt-4 text-sm font-bold text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">목차 이미지 업로드</p>
      </div>
      <div className="space-y-4 mb-8">
        {([['시작일', start, setStart], ['종료일', end, setEnd]] as const).map(([label, val, setter]) => (
          <div key={label} className="flex flex-col gap-2">
            <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1">{label}</label>
            <input type="date" value={val} onChange={e => setter(e.target.value)} className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          </div>
        ))}
      </div>
      <button
        onClick={() => onGenerate([{ id: Date.now().toString(), text: 'AI가 생성한 학습 로드맵입니다.', completed: false, isAi: true }], start, end)}
        className="w-full py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black active:scale-95 transition-all shadow-xl shadow-indigo-500/10"
      >
        AI 로드맵 생성
      </button>
    </Card>
  );
}
