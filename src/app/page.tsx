import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturesRow from '@/components/FeaturesRow';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import CoverageSection from '@/components/CoverageSection';
import ComfortSection from '@/components/ComfortSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <Hero />
      <FeaturesRow />
      <AboutSection />
      <ServicesSection />
      <CoverageSection />
      <ComfortSection />
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
