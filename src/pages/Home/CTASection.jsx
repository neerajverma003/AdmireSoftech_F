import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

// Lazy-load the heavy Three.js globe so it doesn't block initial page paint
const AdmireGlobe = lazy(() => import('../../components/3d/AdmireGlobe'));

const CTASection = () => {
  return (
    <section id="contact" className="relative py-20 bg-[#060919] overflow-hidden">

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
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Let's build something <br />
              <span className="text-white">amazing together</span>
            </h2>

            <a
              href="mailto:contact@admiresoftech.com"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transform-gpu"
            >
              Get In Touch
            </a>
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
    </section>
  );
};

export default CTASection;
