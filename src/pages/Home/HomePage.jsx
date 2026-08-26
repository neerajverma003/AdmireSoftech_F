import SEO from '../../components/SEO';
import React, { useState } from 'react';
import Hero from './Hero';
import TrustedBrands from './TrustedBrands';
import ComparisonSection from './ComparisonSection';
import ServicesSection from './ServicesSection';
import CtaBanner from '../../components/common/CtaBanner';
import AboutSection from './AboutSection';
import TechStackSection from './TechStackSection';
import WhyChooseUs from './WhyChooseUs';
import ClientReviewsSection from '../../components/common/ClientReviewsSection';
import FaqSection from './FaqSection';
import CTASection from './CTASection';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SEO
        title="Transforming Ideas Into Intelligent Solutions"
        description="Admire Softech delivers innovative IT services including web development, cloud, AI, software development and digital transformation solutions."
        canonical="https://admiresoftech.com/"
      />

      <main className="relative overflow-hidden">
        <Hero />
        <TrustedBrands />
        <ComparisonSection />
        <ServicesSection />
        <CtaBanner onOpenModal={() => setIsModalOpen(true)} />
        <AboutSection />
        <TechStackSection />
        <WhyChooseUs />
        <FaqSection />
        <CTASection />
        <ClientReviewsSection />

        <QuickQuoteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </main>
    </>
  );
};

export default HomePage;
