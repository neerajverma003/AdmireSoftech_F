import React from 'react';
import Hero from './Hero';
import TrustedBrands from './TrustedBrands';
import ServicesSection from './ServicesSection';
import WhyChooseUs from './WhyChooseUs';
import CTASection from './CTASection';

// IndustriesSection removed from main flow to match design (not visible in mockup)
const HomePage = () => {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <TrustedBrands />
      <ServicesSection />
      <WhyChooseUs />
      <CTASection />
    </main>
  );
};

export default HomePage;
