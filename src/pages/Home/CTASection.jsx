import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ContactModal from '../../components/common/ContactModal';

// Lazy-load the heavy Three.js globe so it doesn't block initial page paint
const AdmireGlobe = lazy(() => import('../../components/3d/AdmireGlobe'));

const CTASection = ({ onOpenContactModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetInTouch = (e) => {
    e.preventDefault();
    if (onOpenContactModal) {
      onOpenContactModal();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-[#060919] overflow-hidden font-poppins">

      {/* Ambient left-side glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Left — CTA Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6 text-left"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Your Transformation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Let's build something <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                amazing together
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light max-w-lg leading-relaxed">
              Accelerate your engineering speed with world-class cloud architects, full-stack specialists, and AI engineers.
            </p>

            <button
              type="button"
              onClick={handleGetInTouch}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transform-gpu cursor-pointer"
            >
              <span>Get In Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Right — Interactive 3D Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full flex items-center justify-center transform-gpu"
          >
            {/* Glow behind globe */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-600/20 blur-3xl rounded-full pointer-events-none" />

            <Suspense
              fallback={
                <div className="w-full h-[420px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-12 h-12 border-2 border-cyan-500/40 border-t-cyan-400 rounded-full animate-spin" />
                    <span className="text-xs font-mono tracking-wider">Loading Globe...</span>
                  </div>
                </div>
              }
            >
              <div className="w-full relative z-10">
                <AdmireGlobe />
              </div>
            </Suspense>
          </motion.div>

        </div>
      </div>

      {/* Embedded Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Let's Build Something Amazing"
        subtitle="Tell us about your project vision, timeline, or engineering challenges."
      />
    </section>
  );
};

export default CTASection;

