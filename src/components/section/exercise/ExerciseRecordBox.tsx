// ============================================================
// components/section/exercise/ExerciseRecordBox.tsx
// 운동 세션 기록 카드.
//
// 기능:
//   - 운동 시간(분) 숫자 입력
//   - 오운완(오늘 운동 완료) 인증 사진 업로드 영역 (UI만 구현)
//   - 기록 저장 / 리셋 버튼
// ============================================================
import { useState } from 'react';
import { UploadIcon } from '../../ui/Icons';
import { Card, CardTitle } from '../../common/Card';
import { DumbbellIcon } from '../../ui/Icons';

export function ExerciseRecordBox() {
  return (
    <Card className="h-full glow-rose border-t-4 border-rose-500">
      <CardTitle icon={<DumbbellIcon size={18} />}>트레이닝 세션</CardTitle>
      <div className="mb-8">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2 block">운동 시간</label>
        <div className="relative">
          <input type="number" placeholder="0" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-2xl p-5 text-lg font-black outline-none focus:ring-2 focus:ring-rose-500 transition-all pr-16" />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400 uppercase tracking-widest">분</span>
        </div>
      </div>
      <div className="mb-10">
        <label className="text-[0.65rem] font-black uppercase tracking-widest text-gray-400 ml-1 mb-2 block">오운완 인증</label>
        <div className="border-2 border-dashed border-gray-100 dark:border-[#1a1a1a] bg-gray-50/30 dark:bg-[#050505] rounded-[2rem] p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 dark:hover:bg-[#0a0a0a] transition-all group h-48">
          <UploadIcon size={32} className="text-gray-300 group-hover:text-rose-600 transition-colors" />
          <p className="mt-4 text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-rose-600 transition-colors">사진 업로드</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black active:scale-95 transition-all shadow-xl shadow-rose-500/10">기록 저장</button>
        <button className="py-4 border border-gray-100 dark:border-[#1a1a1a] text-gray-500 rounded-2xl text-sm font-black active:scale-95 transition-all hover:bg-gray-50 dark:hover:bg-[#0a0a0a]">리셋</button>
      </div>
    </Card>
  );
}
