// ============================================================
// components/section/study/StudyWidgets.tsx
// 학습 스튜디오 하위 위젯 컴포넌트 모음.
//
// 포함 컴포넌트:
//   DiaryBox        - 학습 일지 텍스트 + 집중 시간 입력 + 저장 버튼
//   AiSuggestionBox - AI 기반 학습 전략 제안 (InfoCard 재사용)
//   DashboardBox    - 주간 몰입도 막대 차트 + 핵심 지표 진행 바 대시보드
//   GeminiBox       - Gemini 링크 카드 (외부 gemini.google.com 이동)
// ============================================================
import { SparklesIcon, TrendIcon, AlertIcon, ExternalLinkIcon } from '../../ui/Icons';
import { Card, CardTitle } from '../../common/Card';
import { InfoCard } from '../../common/InfoCard';
import { BarChart } from '../../common/BarChart';
import { ProgressBar } from '../../common/ProgressBar';

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const WEEKLY_DATA = [40, 70, 45, 90, 60, 85, 30];
const METRICS = [
  { name: '집중도', progress: 82 },
  { name: '완료율', progress: 64 },
  { name: '전략적 깊이', progress: 91 },
];

export function DiaryBox({ title, placeholder }: { title: string; placeholder: string; color?: string }) {
  return (
    <Card className="glow-indigo border-t-4 border-indigo-500">
      <CardTitle>{title}</CardTitle>
      <textarea
        placeholder={placeholder}
        className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-[2rem] p-8 text-sm text-gray-800 dark:text-gray-200 flex-grow min-h-[120px] mb-6 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium leading-relaxed resize-none"
      />
      <div className="flex items-center justify-between gap-4 mt-auto">
        <div className="flex items-center gap-4">
          <input type="number" defaultValue="60" className="w-20 bg-gray-50 dark:bg-[#050505] border border-gray-100 dark:border-[#1a1a1a] rounded-xl p-3 text-center text-sm font-black outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">분</span>
        </div>
        <button className="py-4 px-10 bg-black dark:bg-white text-white dark:text-black rounded-2xl text-sm font-black active:scale-95 transition-all shadow-xl shadow-indigo-500/10">저장</button>
      </div>
    </Card>
  );
}

export function AiSuggestionBox({ title }: { title: string; color?: string }) {
  return (
    <Card className="h-full border-t-4 border-indigo-500">
      <CardTitle icon={<SparklesIcon size={18} />}>{title}</CardTitle>
      <div className="space-y-6 flex-grow flex flex-col justify-center">
        <InfoCard icon={<TrendIcon size={20} />} title="성과 분석" text="현재 속도로 계속하면 계획보다 3일 일찍 완료할 수 있습니다." iconColor="text-indigo-500" hoverBg="hover:bg-indigo-50 dark:hover:bg-indigo-950/20" />
        <InfoCard icon={<AlertIcon size={20} />} title="전략적 팁" text="이번 주말에는 이해도가 낮았던 고난이도 파트 복습에 집중하세요." iconColor="text-indigo-500" hoverBg="hover:bg-indigo-50 dark:hover:bg-indigo-950/20" />
      </div>
    </Card>
  );
}

export function DashboardBox() {
  return (
    <Card className="p-10 border-t-4 border-indigo-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tightest">활동 스튜디오</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">실시간 성과 지표와 인사이트를 확인하세요.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none text-xs font-black uppercase tracking-widest px-6 py-4 border border-gray-100 dark:border-[#1a1a1a] rounded-2xl hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-all">리포트</button>
          <button className="flex-1 md:flex-none text-xs font-black uppercase tracking-widest px-6 py-4 bg-black dark:bg-white text-white dark:text-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-indigo-500/10">작업 시작</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">주간 몰입도</h3>
          <BarChart data={WEEKLY_DATA} labels={DAYS} activeColor="group-hover:bg-indigo-600" labelActiveColor="group-hover:text-indigo-600" />
        </div>
        <div className="space-y-8">
          <h3 className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">핵심 지표</h3>
          <div className="grid grid-cols-1 gap-6">
            {METRICS.map((m, i) => (
              <ProgressBar key={i} name={m.name} progress={m.progress} accentColor="bg-indigo-600" textColor="text-indigo-500" borderHover="hover:border-indigo-300" />
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function GeminiBox() {
  return (
    <Card className="border-t-4 border-indigo-500 shadow-2xl shadow-indigo-500/5">
      <div className="flex items-center gap-6 mb-8">
        <div className="w-16 h-16 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-2xl"><SparklesIcon size={28} /></div>
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white leading-tight flex items-center gap-2 tracking-tightest">
            Gemini <span className="text-[0.6rem] bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-black tracking-widest border border-indigo-100">ULTRA</span>
          </h2>
          <p className="text-xs text-gray-400 font-bold mt-1 uppercase tracking-wider">인공지능 엔진</p>
        </div>
      </div>
      <button
        onClick={() => window.open('https://gemini.google.com', '_blank')}
        className="w-full py-4 bg-gray-50 dark:bg-[#0a0a0a] border border-gray-100 dark:border-[#1a1a1a] hover:bg-indigo-600 hover:text-white rounded-2xl text-[0.65rem] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
      >
        제미나이로 이동 <ExternalLinkIcon size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
      </button>
    </Card>
  );
}
