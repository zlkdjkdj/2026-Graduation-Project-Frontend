import { useState } from 'react';
import { Header } from '../../../src/components/section/layout/Header';
import { Footer } from '../../../src/components/section/layout/Footer';
import { HeroSection } from '../../components/Home/HeroSection.tsx';
import { ServiceCategory} from '../../components/Home/ServiceCategory.tsx';
import { Feature } from '../../components/Home/Feature.tsx';
import { Quote } from '../../components/Home/Quote.tsx';

// ── Main LandingPage ──────────────────────────────────────────────────────────
export function LandingPage() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <Header isDark={isDark} toggle={() => setIsDark(!isDark)} />
      <HeroSection isDark={isDark} />
      <Quote isDark={isDark} />
      <Feature isDark={isDark} />
      <ServiceCategory isDark={isDark} />
      <Footer isDark={isDark} />
    </div>
  );
}