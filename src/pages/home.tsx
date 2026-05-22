//스크롤 애니메이션 제어 및 하위 섹션 컴포넌트 취합 하는 컨테이너 역할

import { HeroSection } from '../components/section/sections/home/section/HeroSection';
import { ModeSection } from '../components/section/sections/home/section/ModeSection';
import { PreviewSection } from '../components/section/sections/home/section/PreviewSection';
import { GamificationSection } from '../components/section/sections/home/section/GamificationSection';
import { CTASection } from '../components/section/sections/home/section/CTASection';
import { HomeHeader } from '../components/section/sections/home/HomeHeader';
import { HomeFooter } from '../components/section/sections/home/HomeFooter';

export function Home() {
  return (
    <div className="bg-[#050505] text-white font-sans selection:bg-indigo-500/40 min-h-screen overflow-x-hidden scroll-smooth">
      {
        // 상단 네비게이션 헤더
      }
      <HomeHeader />

      {
        // 랜딩 페이지 개별 섹션들
      }
      <main className="w-full">
        <HeroSection />
        <ModeSection />
        <PreviewSection />
        <GamificationSection />
        <CTASection />
      </main>

      {
        // 좌측 하단 세로형 푸터
      }
      <HomeFooter />

    </div>
  );
}
