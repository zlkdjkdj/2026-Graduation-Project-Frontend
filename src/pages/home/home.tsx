import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { 
  SparklesIcon, 
  BookIcon, 
  TrendIcon, 
  TargetIcon, 
  ActivityIcon,
  PlayCircleIcon
} from '../../components/ui/Icons';

export function Home() {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-indigo-500/40 h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory scrollbar-hide">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-8 md:px-12 h-20 md:h-24 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-lg shadow-white/5">
              <SparklesIcon className="text-black" size={20} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white uppercase">Learn Time</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-12 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-2.5 rounded-full">
            {['About', 'Features', 'Stats'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="text-[0.75rem] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors hidden sm:block">Login</Link>
            <Link to="/signup">
              <Button className="!bg-white !text-black !py-2.5 !px-6 !rounded-full !text-xs font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10">
                GET STARTED
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="w-full">
        {/* Section 1: Hero - Focus on Readability */}
        <section className="relative h-screen w-full snap-start overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src="/images/nature.png" 
              alt="Background" 
              className="w-full h-full object-cover"
            />
            {/* Darker overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 backdrop-blur-[1px]" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-5xl" ref={addToRefs}>
            <div className="reveal-content space-y-8">
              <h1 className="text-5xl md:text-8xl font-black tracking-tightest leading-[1.05] uppercase italic">
                PURE FOCUS <br/>
                <span className="text-white/40">LIMITLESS GROWTH</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/80 leading-relaxed max-w-2xl mx-auto">
                복잡한 생각을 걷어내고, 오직 성장에만 집중할 수 있는 <br/>
                당신만의 고요한 학습 공간을 설계합니다.
              </p>
              <div className="pt-8">
                <Button className="!bg-white !text-black !py-5 !px-12 !rounded-full !text-sm font-black hover:scale-110 transition-transform shadow-2xl">
                  무료로 시작하기
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40">
            <span className="text-[0.65rem] font-bold tracking-[0.4em] uppercase">Scroll to Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
          </div>
        </section>

        {/* Section 2: Core Philosophy */}
        <section id="about" className="relative h-screen w-full snap-start flex items-center justify-center bg-[#050505] p-6 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-[20%] left-[10%] w-[40rem] h-[40rem] bg-indigo-500/20 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-[40rem] h-[40rem] bg-blue-500/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '-2s' }} />
          </div>
          
          <div className="relative z-10 px-6 text-center max-w-4xl" ref={addToRefs}>
            <div className="reveal-content space-y-12">
              <h2 className="text-3xl md:text-5xl font-black leading-tight uppercase tracking-tightest italic">
                "성취는 <span className="text-indigo-400">명확함</span>에서 시작됩니다."
              </h2>
              <div className="w-16 h-1 bg-white/20 mx-auto rounded-full" />
              <p className="text-lg md:text-xl font-medium text-gray-400 leading-relaxed">
                우리는 수만 가지의 데이터 속에서 당신에게 꼭 필요한 <br/>
                인사이트만을 정제하여 제공합니다. 방해 없는 몰입, <br/>
                그것이 Learn Time이 추구하는 최고의 가치입니다.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Features - Structured Grid */}
        <section id="features" className="relative h-screen w-full snap-start flex items-center justify-center bg-white text-black p-6 md:p-12">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 md:gap-24 items-center" ref={addToRefs}>
            <div className="reveal-content space-y-12">
              <div className="space-y-4">
                <h3 className="text-sm font-black text-indigo-600 uppercase tracking-[0.3em]">System Intelligence</h3>
                <h4 className="text-4xl md:text-6xl font-black tracking-tightest uppercase leading-tight">
                  더 똑똑하게, <br/> 더 완벽하게.
                </h4>
              </div>
              
              <div className="grid gap-8">
                {[
                  { 
                    icon: <TargetIcon size={24} />, 
                    title: "지능형 목표 설계", 
                    desc: "당신의 과거 패턴을 학습하여 달성 가능한 최고의 목표를 제안합니다." 
                  },
                  { 
                    icon: <ActivityIcon size={24} />, 
                    title: "실시간 몰입도 분석", 
                    desc: "현재 집중도가 떨어지는 시점을 파악하여 휴식과 재집중을 유도합니다." 
                  },
                  { 
                    icon: <TrendIcon size={24} />, 
                    title: "성장 대시보드", 
                    desc: "단순한 기록을 넘어 당신의 성장을 수치와 그래프로 증명합니다." 
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div className="space-y-1">
                      <h5 className="text-lg font-bold uppercase tracking-tight">{item.title}</h5>
                      <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="reveal-content hidden lg:block">
              <div className="relative group">
                <div className="absolute -inset-4 bg-indigo-500/10 rounded-[3rem] blur-2xl opacity-50" />
                <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 shadow-2xl">
                  <img 
                    src="/images/nature.png" 
                    alt="Preview" 
                    className="w-full h-auto object-cover grayscale opacity-10 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Stats - High Contrast Cards */}
        <section id="stats" className="relative h-screen w-full snap-start bg-[#050505] text-white flex items-center justify-center p-6 md:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-12 h-full w-full border-white/5 border-l">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-white/5 border-r" />
              ))}
            </div>
          </div>
          
          <div className="relative z-10 w-full max-w-7xl" ref={addToRefs}>
            <div className="reveal-content mb-16 md:mb-24 text-center space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.5em]">Real-time Performance</h3>
              <h4 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">THE SCALE OF IMPACT</h4>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { label: "Active Users", value: "24K+", color: "text-indigo-400" },
                { label: "Focus Hours", value: "1.2M+", color: "text-blue-400" },
                { label: "Efficiency", value: "+48%", color: "text-emerald-400" },
                { label: "Completion", value: "98%", color: "text-rose-400" }
              ].map((stat, i) => (
                <div key={i} className="reveal-content" style={{ transitionDelay: `${i * 100}ms` }}>
                  <div className="group p-10 rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-500 text-center">
                    <div className={`text-5xl md:text-6xl font-black mb-4 transition-transform group-hover:scale-110 ${stat.color}`}>{stat.value}</div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.3em] text-gray-500 group-hover:text-white transition-colors">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 5: CTA - Simple & Powerful */}
        <section className="relative h-screen w-full snap-start flex items-center justify-center bg-white text-black p-6 md:p-12">
          <div className="max-w-4xl text-center space-y-12 md:space-y-20" ref={addToRefs}>
            <div className="reveal-content space-y-8">
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto shadow-2xl">
                <SparklesIcon className="text-white" size={32} />
              </div>
              <h2 className="text-5xl md:text-8xl font-black tracking-tightest uppercase italic leading-[0.9] mb-6">
                START YOUR <br/>
                <span className="text-indigo-600">NEW CHAPTER.</span>
              </h2>
              <p className="text-lg md:text-xl font-medium text-gray-500 leading-relaxed max-w-2xl mx-auto">
                가장 강력한 성장은 가장 조용한 몰입에서 나옵니다. <br/>
                지금 바로 Learn Time과 함께 당신의 미래를 설계하세요.
              </p>
            </div>
            
            <div className="reveal-content delay-300">
              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center">
                <Link to="/signup" className="w-full sm:w-auto">
                  <Button className="!bg-black !text-white !py-6 !px-16 !rounded-full !text-lg font-black shadow-2xl hover:scale-105 active:scale-95 transition-all">
                    지금 시작하기
                  </Button>
                </Link>
                <Link to="/login" className="w-full sm:w-auto">
                  <Button variant="outline" className="!border-black/10 !py-6 !px-16 !rounded-full !text-lg font-black hover:bg-gray-50 transition-all">
                    로그인
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-8 left-8 z-50 hidden lg:block">
        <p className="text-[0.6rem] font-bold text-gray-500 uppercase tracking-widest vertical-text">© 2026 LEARN TIME — ALL RIGHTS RESERVED</p>
      </footer>

      {/* Global Readability Improvements & Effects */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .reveal-content {
          opacity: 0;
          transform: translateY(30px);
          transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .reveal-visible .reveal-content {
          opacity: 1;
          transform: translateY(0);
        }
        
        .delay-300 { transition-delay: 300ms; }
        
        .italic { font-style: italic; }
        
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        /* Improved line height for Korean text */
        p {
          line-height: 1.7;
          letter-spacing: -0.01em;
        }

        /* Custom tracking for headings */
        h1, h2, h3, h4 {
          letter-spacing: -0.04em;
        }
      `}</style>
    </div>
  );
}
