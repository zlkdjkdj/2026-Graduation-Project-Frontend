import { useEffect, useRef } from 'react';
import { HeroSection } from './sections/HeroSection';
import { ModeSection } from './sections/ModeSection';
import { TourSection } from './sections/TourSection';
import { GamificationSection } from './sections/GamificationSection';
import { CTASection } from './sections/CTASection';
import { HomeHeader } from './sections/HomeHeader';
import { HomeFooter } from './sections/HomeFooter';

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

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-indigo-500/40 h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory scrollbar-hide">
      <HomeHeader />

      <main className="w-full">
        <HeroSection addToRefs={addToRefs as any} />
        <ModeSection addToRefs={addToRefs as any} />
        <TourSection addToRefs={addToRefs as any} />
        <GamificationSection addToRefs={addToRefs as any} />
        <CTASection addToRefs={addToRefs as any} />
      </main>

      <HomeFooter />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .reveal-content {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          filter: blur(10px);
          transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .reveal-visible .reveal-content {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .reveal-left {
          opacity: 0;
          transform: translateX(-50px);
          filter: blur(10px);
          transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .reveal-visible .reveal-left {
          opacity: 1;
          transform: translateX(0);
          filter: blur(0);
        }

        .reveal-right {
          opacity: 0;
          transform: translateX(50px);
          filter: blur(10px);
          transition: all 1.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .reveal-visible .reveal-right {
          opacity: 1;
          transform: translateX(0);
          filter: blur(0);
        }

        .float-animation {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        .glow-pulse {
          animation: glowPulse 4s ease-in-out infinite alternate;
        }

        @keyframes glowPulse {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.7; transform: scale(1.1); }
        }
        
        .delay-300 { transition-delay: 300ms; }

        .animate-blob {
          animation: blob 10s infinite alternate cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        /* 3D Hover Effects for Cards */
        .card-3d-hover {
          transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .card-3d-hover:hover {
          transform: translateY(-10px) rotateX(5deg) rotateY(-5deg) scale(1.02);
          box-shadow: 20px 20px 60px rgba(0,0,0,0.1), -20px -20px 60px rgba(255,255,255,0.02);
          z-index: 10;
        }
        
        .italic { font-style: italic; }
        
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        p {
          line-height: 1.7;
          letter-spacing: -0.01em;
        }

        h1, h2, h3, h4 {
          letter-spacing: -0.04em;
        }
      `}</style>
    </div>
  );
}
