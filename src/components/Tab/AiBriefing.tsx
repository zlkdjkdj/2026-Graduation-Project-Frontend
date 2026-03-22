//AI 제안사항, AI 아이콘, 다이나믹 브리핑 메시지 
import { Sparkles } from 'lucide-react';

// 1. 타입 정의
interface AiBriefingProps {
  stats: {
    totalRate: number; // 전체 달성률 (0~100)
  };
  theme: {
    card: string; // 테마에 따른 카드 배경 스타일 클래스
  };
}

export function AiBriefing({ stats, theme }: AiBriefingProps) {
  // 2. 메시지 로직 
  const briefingMessage = stats.totalRate > 70 
    ? "완벽한 페이스입니다! 현재 루틴을 아주 잘 유지하고 계시네요." 
    : "조금 더 힘을 내볼까요? 오늘 할 일부터 하나씩 체크해보세요.";

  return (
    <section className={`
      ${theme.card} backdrop-blur-3xl p-10 rounded-[2.5rem] border shadow-2xl 
      flex items-start gap-8 transition-all duration-500
    `}>
      
      {/* AI 심볼 영역 */}
      <div className="bg-white/10 p-5 rounded-3xl border border-white/20 shadow-inner flex-shrink-0">
        <Sparkles className="text-yellow-300 animate-pulse" size={32} />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-2 tracking-tight">AI 코칭 브리핑</h2>
        <p className="text-xl font-medium opacity-80 leading-relaxed italic">
          "{briefingMessage}"
        </p>
      </div>
      
    </section>
  );
}