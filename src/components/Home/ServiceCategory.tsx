// ── Service Categories Section ────────────────────────────────────────────────
import {
  Sun, Moon, BookOpen, Dumbbell, Sunrise, BarChart3,
  Sparkles, Users, CheckCircle, ArrowRight,
  Brain, Clock, ListTodo, Trophy
} from 'lucide-react';

export function ServiceCategory({ isDark }: { isDark: boolean }) {
  const cardBg = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)';
  const border = isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.07)';
  const text   = isDark ? '#fff' : '#111';
  const muted  = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)';

  const categories = [
    {
      icon: <BookOpen size={30} />, color: '#6366f1', bg: 'rgba(99,102,241,0.15)',
      tag: '공부 모드', tagColor: '#818cf8', tagBg: 'rgba(99,102,241,0.12)',
      title: 'Edu Vibe',
      desc: 'AI가 책 목차를 기반으로 일일 공부 범위를 할당하고, 복습 주기를 관리합니다',
      items: ['입력: 과목, 교재명, 시험날짜, 언어 종류', 'AI가 책 목차를 기반으로 일일 공부 범위 할당', '복습 주기 알림 및 학습 시간 통계', '루틴 완료시 포인트 부여'],
    },
    {
      icon: <Dumbbell size={30} />, color: '#a855f7', bg: 'rgba(168,85,247,0.15)',
      tag: '운동 모드', tagColor: '#c084fc', tagBg: 'rgba(168,85,247,0.12)',
      title: 'Fitness Routine',
      desc: '개인 맞춤형 운동 루틴을 설정하고 꾸준한 운동 습관을 만들어갑니다',
      items: ['입력: 운동목표, 보유 기구, 주간 운동 횟수', '루틴 설정 및 여율 체크', '일일 몸무게 입력, 운동 기록', '운동 완료 시 포인트 부여'],
    },
  ];

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: isDark ? '#050505' : '#e8e8f0' }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(168,85,247,0.45),transparent)' }} />

      <div className="max-w-screen-xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ background: 'rgba(168,85,247,0.12)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.2)' }}>
            Modes
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold" style={{ color: text, letterSpacing: '-0.03em' }}>서비스 카테고리</h2>
          <p className="mt-3 text-base" style={{ color: muted }}>당신의 목표에 맞는 모드를 선택하세요</p>
        </div>

        <div className="space-y-5">
          {categories.map((cat, i) => (
            <div key={i}
              className="group p-8 md:p-10 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-start transition-all duration-200 hover:scale-[1.007]"
              style={{ background: cardBg, backdropFilter: 'blur(20px)', border: `1px solid ${border}` }}>
              <div className="flex-shrink-0 flex flex-col items-start gap-3">
                <div className="p-4 rounded-3xl transition-transform duration-200 group-hover:scale-105"
                  style={{ background: cat.bg, color: cat.color }}>
                  {cat.icon}
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: cat.tagBg, color: cat.tagColor }}>
                  {cat.tag}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold mb-2"
                  style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: text, letterSpacing: '-0.03em' }}>
                  {cat.title}
                </h3>
                {cat.desc && <p className="text-sm mb-5 leading-relaxed" style={{ color: muted }}>{cat.desc}</p>}
                <ul className="grid sm:grid-cols-2 gap-3">
                  {cat.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: muted }}>
                      <CheckCircle size={15} className="flex-shrink-0 mt-0.5" style={{ color: cat.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}