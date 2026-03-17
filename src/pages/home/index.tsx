import { Header } from '../../components/section/layout/Header';
import { HeroSection } from '../../components/section/landing/HeroSection';
import { AuthButtons } from '../../components/section/landing/AuthButtons';
import { QuoteSection } from '../../components/section/landing/QuoteSection';
import { FeaturesSection } from '../../components/section/landing/FeaturesSection';
import { ServiceCategoriesSection } from '../../components/section/landing/ServiceCategoriesSection';
import { Footer } from '../../components/section/layout/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <Header />

      <main className="pt-11 pb-0">
        {/* 히어로 섹션 - 좌우 레이아웃 - 검은색 배경 */}
        <section className="bg-black min-h-screen flex items-center relative">
          {/* 배경 장식 요소 */}
          <div className="absolute top-20 left-0 w-96 h-96 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-full blur-3xl opacity-50 -z-10"></div>
          <div className="absolute bottom-20 right-0 w-96 h-96 bg-gradient-to-br from-purple-600/30 to-pink-600/30 rounded-full blur-3xl opacity-50 -z-10"></div>
          
          <div className="max-w-screen-xl mx-auto px-4 md:px-6 w-full py-12 md:py-0">
            <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center w-full">
              <HeroSection />
              <AuthButtons />
            </div>
          </div>
        </section>

        <QuoteSection />
        <FeaturesSection />
        <ServiceCategoriesSection />
      </main>

      <Footer />
    </div>
  );
}