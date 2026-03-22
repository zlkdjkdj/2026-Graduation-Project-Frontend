// 공통 UI 및 재사용 가능한 컴포넌트 모음
import React from 'react';
import { getTheme } from './Mode';

/** * 섹션 헤더 컴포넌트
 * @param icon - 제목 옆에 표시될 아이콘
 * @param title - 섹션의 메인 타이틀
 * @param sub - 타이틀 아래의 보조 설명 (선택 사항)
 * @param action - 우측 끝에 배치할 추가 버튼이나 요소 (선택 사항)
 */
export function SectionHeading({ icon, title, sub, action }: {
  icon: React.ReactNode; title: string; sub?: string; action?: React.ReactNode
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {/* 아이콘 배경 박스 */}
        <div className="p-3 bg-indigo-600/10 rounded-2xl text-indigo-500 border border-indigo-500/20 shrink-0">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-black tracking-tight uppercase italic leading-tight">{title}</h3>
          {sub && <p className="text-xs font-semibold mt-0.5 opacity-40">{sub}</p>}
        </div>
      </div>
      {/* 우측 액션 버튼 영역 */}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** * 통계 수치 표시 카드
 * @param icon - 상단에 표시될 아이콘
 * @param value - 메인 수치 (숫자 또는 문자열)
 * @param unit - 수치 옆에 붙는 단위 (kg, kcal, 분 등)
 * @param label - 하단에 표시될 데이터 이름
 * @param dark - 다크모드 여부
 */
export function StatCard({ icon, value, unit, label, dark }: {
  icon: React.ReactNode; value: number | string; unit: string; label: string; dark: boolean
}) {
  const t = getTheme(dark);
  return (
    <div className={`p-7 rounded-[2rem] border ${t.card} flex flex-col gap-3`}>
      <div className="flex items-center justify-between"><div>{icon}</div></div>
      <div>
        <p className="text-3xl font-black tracking-tight leading-none">
          {value}<span className="text-base font-semibold ml-1.5 opacity-40">{unit}</span>
        </p>
        <p className="text-[11px] font-bold uppercase tracking-widest opacity-40 mt-2">{label}</p>
      </div>
    </div>
  );
}

/** * 프로그레스 바 컴포넌트
 * @param label - 바 상단 좌측 라벨
 * @param value - 현재 진행 값
 * @param max - 최대 값
 * @param color - 바의 색상 클래스 (Tailwind CSS)
 * @param dark - 다크모드 여부
 */
export function ProgressBar({ label, value, max, color, dark }: {
  label: string; value: number; max: number; color: string; dark: boolean
}) {
  // 백분율 계산
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  
  return (
    <div className="space-y-2">
      {/* 정보 텍스트 영역 */}
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest opacity-50">{label}</span>
        <span className="text-xs font-black tabular-nums">{value}<span className="opacity-40">/{max}</span></span>
      </div>
      {/* 바 배경 */}
      <div className={`h-2.5 w-full rounded-full ${dark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
        {/* 실제 게이지 바 */}
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${color}`} 
          style={{ width: `${pct}%` }} 
        />
      </div>
    </div>
  );
}