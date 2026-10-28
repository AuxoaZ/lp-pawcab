import Script from "next/script";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturesRow from "@/components/FeaturesRow";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import CoverageSection from "@/components/CoverageSection";
import GallerySection from "@/components/GallerySection";
import ComfortSection from "@/components/ComfortSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Header />
      <Hero />
      <FeaturesRow />
      <AboutSection />
      <ServicesSection />
      <CoverageSection />
      <GallerySection />
      <ComfortSection />
      {/* Elfsight Google Reviews | Untitled Google Reviews */}
      <section className="bg-warm-ivory py-12 md:py-20 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-8 md:mb-12">
            <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-warm-taupe font-semibold mb-2">
              Reviews
            </p>
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl text-deep-midnight">
              What Our Customers Say
            </h2>
          </div>

          <Script
            src="https://elfsightcdn.com/platform.js"
            strategy="afterInteractive"
          />
          <div
            className="elfsight-app-c1a7d814-8e07-4cf9-b595-0369eaca3594"
            data-elfsight-app-lazy
          />
        </div>
      </section>
      <HowItWorksSection />
      <Footer />
    </main>
  );
}
