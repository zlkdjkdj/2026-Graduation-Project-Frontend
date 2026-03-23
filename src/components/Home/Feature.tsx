//주요기능 박스, AI 플래너, 성취 시스템, 데이터 시각화, 커뮤니티 안내
import { Brain, Trophy, ListTodo, BarChart3, Users } from 'lucide-react';

const FEATURE_DATA = [
  { 
    icon: Brain, 
    title: 'AI 스마트 플래너', 
    color: 'text-indigo-500', 
    bgColor: 'bg-indigo-500/12', 
    dotColor: 'bg-indigo-500',
    items: ['진도 자동 생성 – 책 제목 입력 시 AI가 일일 학습량 제안', 'AI 추천 시스템 – 성취도 분석 후 보강 구간 제안'] 
  },
  { 
    icon: Trophy, 
    title: 'Stack Up 시스템', 
    color: 'text-purple-500', 
    bgColor: 'bg-purple-500/12', 
    dotColor: 'bg-purple-500',
    items: ['과업 완료 시 XP 부여 및 레벨 승급', '지속적인 활동 + 좋은 참여율이면 성취 배지 제공'] 
  },
  { 
    icon: ListTodo, 
    title: '학습 유틸리티 도구', 
    color: 'text-emerald-500', 
    bgColor: 'bg-emerald-500/12', 
    dotColor: 'bg-emerald-500',
    items: ['AI 자동진도 제공', '공부일지, 투두리스트, 메모 기능'] 
  },
  { 
    icon: BarChart3, 
    title: '데이터 시각화', 
    color: 'text-amber-500', 
    bgColor: 'bg-amber-500/12', 
    dotColor: 'bg-amber-500',
    items: ['출석부 캘린더, 달성률 대시보드', '사용자 별 랭킹 시스템'] 
  },
];

export function Feature({ isDark }: { isDark: boolean }) {
  return (
    <section className={`py-28 relative overflow-hidden transition-colors ${isDark ? 'bg-black' : 'bg-[#f0f0f5]'}`}>
      {/* 상단 장식 라인 */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-indigo-500/45 to-transparent" />

      <div className="max-w-screen-xl mx-auto px-6">
        {/* 헤더 섹션 */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            Features
          </span>
          <h2 className={`text-4xl md:text-5xl font-extrabold tracking-tighter ${isDark ? 'text-white' : 'text-[#111]'}`}>
            주요 기능
          </h2>
          <p className={`mt-3 text-base ${isDark ? 'text-white/45' : 'text-black/45'}`}>
            Learn-Time이 제공하는 강력한 학습 도구들
          </p>
        </div>

        {/* 메인 기능 그리드 */}
        <div className="grid md:grid-cols-2 gap-5">
          {FEATURE_DATA.map((f, i) => (
            <div key={i} className={`
              group p-8 rounded-[2rem] transition-all duration-300 hover:scale-[1.012] backdrop-blur-xl border
              ${isDark ? 'bg-white/5 border-white/10' : 'bg-white/85 border-black/5'}
            `}>
              <div className="flex items-start gap-5">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${f.bgColor} ${f.color}`}>
                  <f.icon size={26} />
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-3 ${isDark ? 'text-white' : 'text-[#111]'}`}>{f.title}</h3>
                  <ul className="space-y-2">
                    {f.items.map((item, j) => (
                      <li key={j} className={`flex items-start gap-2.5 text-sm leading-relaxed ${isDark ? 'text-white/45' : 'text-black/45'}`}>
                        <div className={`w-1 h-1 rounded-full mt-[7px] flex-shrink-0 opacity-70 ${f.dotColor}`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 커뮤니티 특별 섹션 */}
        <div className={`
          mt-5 p-7 rounded-[2rem] flex items-center gap-6 transition-all duration-300 hover:scale-[1.005] border
          ${isDark ? 'bg-pink-500/10 border-pink-500/20' : 'bg-pink-500/5 border-pink-500/10'}
        `}>
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 bg-pink-500/15 text-pink-500">
            <Users size={24} />
          </div>
          <div>
            <h3 className={`text-lg font-bold mb-0.5 ${isDark ? 'text-white' : 'text-[#111]'}`}>커뮤니티</h3>
            <p className={`text-sm ${isDark ? 'text-white/45' : 'text-black/45'}`}>
              사용자 커뮤니티 (익명, 친목 X, 본인 업적 인증)
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}