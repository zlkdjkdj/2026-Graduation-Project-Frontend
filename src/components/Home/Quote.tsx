//명언 섹션
import { Quote as QuoteIcon } from 'lucide-react'; // 아이콘 라이브러리 활용 권장

export function Quote({ isDark }: { isDark: boolean }) {
  return (
    <section className={`
      py-20 relative overflow-hidden transition-colors duration-500
      ${isDark ? 'bg-[#080808]' : 'bg-[#e8e8f0]'}
    `}>
      {/* 상단 장식 라인 (구분선) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* 인용구 아이콘 */}
        <QuoteIcon 
          className={`w-9 h-9 mx-auto mb-6 transition-colors ${isDark ? 'text-purple-500/40' : 'text-purple-500/35'}`} 
          fill="currentColor"
        />

        {/* 메인 인용 문구 */}
        <p className={`
          font-bold leading-snug tracking-tighter text-[clamp(1.4rem,3vw,2rem)] transition-colors
          ${isDark ? 'text-white' : 'text-[#111]'}
        `}>
          "성공은 매일 반복되는 작은 노력의 합이다"
        </p>

        {/* 인용 저자 */}
        <p className={`
          mt-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors
          ${isDark ? 'text-white/40' : 'text-black/40'}
        `}>
          — Robert Collier
        </p>
      </div>
    </section>
  );
}