import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Services3D = lazy(() => import('../../components/3d/Services3D'));

// ── Icons ──
const CloudIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const AnalyticsIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SecurityIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TransformIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ITIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" strokeLinecap="round" />
  </svg>
);
const EngineeringIcon = () => (
  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const services = [
  {
    id: 'cloud',
    Icon: CloudIcon,
    title: 'Cloud Services',
    description: 'Scalable, secure and reliable cloud solutions that help your business grow without limits.',
  },
  {
    id: 'data',
    Icon: AnalyticsIcon,
    title: 'Data & Analytics',
    description: 'Transform raw data into actionable business insights with our advanced analytics stack.',
  },
  {
    id: 'security',
    Icon: SecurityIcon,
    title: 'Cyber Security',
    description: 'Protect your critical infrastructure with enterprise-grade, proactive cybersecurity measures.',
  },
  {
    id: 'digital',
    Icon: TransformIcon,
    title: 'Digital Transformation',
    description: 'Modernize your operations with AI, automation, and next-generation digital technologies.',
  },
  {
    id: 'it',
    Icon: ITIcon,
    title: 'Managed IT Services',
    description: 'End-to-end IT management so your teams can focus on innovation, not infrastructure.',
  },
  {
    id: 'eng',
    Icon: EngineeringIcon,
    title: 'Product Engineering',
    description: 'Full-cycle product development from idea and architecture to deployment and scaling.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const ServicesPage = () => {
  return (
    <main id="services-page" className="min-h-screen bg-[#070C1E] overflow-x-hidden">

      {/* ── Hero Strip ── */}
      <section className="relative pt-32 pb-0 overflow-hidden">

        {/* Subtle bg glow */}
        <div className="absolute top-0 right-0 w-[60%] h-full pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-blue-900/20 via-transparent to-transparent" />
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-600/15 blur-3xl rounded-full" />
          <div className="absolute top-1/3 right-20 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center min-h-[480px]">

            {/* Left — Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 pb-10 lg:pb-20"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/40 border border-blue-700/40 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                Our Services
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                Services
              </h1>

              <p className="text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
                End-to-end IT services designed to build, scale and secure your digital future.
              </p>

              <a
                href="#service-cards"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('service-cards')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.5)] hover:shadow-[0_0_28px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95 transform-gpu"
              >
                Explore All Services
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            {/* Right — 3D Cube Cluster */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full transform-gpu"
            >
              {/* Glow behind cubes */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
                <div className="absolute w-48 h-48 bg-cyan-500/15 blur-2xl rounded-full" />
              </div>

              <Suspense
                fallback={
                  <div className="w-full h-[420px] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-slate-400">
                      <div className="w-10 h-10 border-2 border-cyan-500/40 border-t-cyan-400 rounded-full animate-spin" />
                      <span className="text-xs font-mono tracking-wider">Loading 3D Model...</span>
                    </div>
                  </div>
                }
              >
                <Services3D />
              </Suspense>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Service Cards Grid ── */}
      <section id="service-cards" className="pb-24 pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, idx) => {
              const { Icon } = svc;
              return (
                <motion.div
                  key={svc.id}
                  custom={idx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-30px' }}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col gap-4 cursor-pointer group relative overflow-hidden transform-gpu"
                >
                  {/* Top highlight bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                  {/* Icon Box */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-900/40 border border-blue-800/40 group-hover:border-cyan-500/50 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.3)]">
                    <Icon />
                  </div>

                  {/* Content */}
                  <div className="space-y-2 flex-1">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-end">
                    <div className="w-7 h-7 rounded-full border border-slate-700/60 group-hover:border-cyan-400/60 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-all">
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

    </main>
  );
};

export default ServicesPage;
