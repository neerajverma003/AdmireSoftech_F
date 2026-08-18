import React from 'react';
import Hero from './Hero';
import TrustedBrands from './TrustedBrands';
import ComparisonSection from './ComparisonSection';
import ServicesSection from './ServicesSection';
import AboutSection from './AboutSection';
import TechStackSection from './TechStackSection';
import WhyChooseUs from './WhyChooseUs';
import CTASection from './CTASection';

const HomePage = () => {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <TrustedBrands />
      <ComparisonSection />
      <ServicesSection />
      <AboutSection />
      <TechStackSection />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
};

export default HomePage;
