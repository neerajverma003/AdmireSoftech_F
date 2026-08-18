import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

// 4 Service card icons as inline SVG
const CloudIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const AnalyticsIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const SecurityIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const TransformIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const services = [
  {
    id: 'cloud',
    Icon: CloudIcon,
    title: 'Cloud Services & DevOps',
    description: 'Scalable multi-cloud infrastructure and CI/CD automation to power enterprise workloads.',
    features: ['Multi-Cloud Migration (AWS/Azure/GCP)', 'CI/CD Automation Pipelines', 'Kubernetes & Container Orchestration'],
  },
  {
    id: 'data',
    Icon: AnalyticsIcon,
    title: 'Data Engineering & Analytics',
    description: 'Structuring raw enterprise data into real-time BI dashboards and scalable warehouses.',
    features: ['Enterprise Data Warehousing', 'Real-Time Streaming Pipelines', 'Power BI & Executive Dashboards'],
  },
  {
    id: 'security',
    Icon: SecurityIcon,
    title: 'Cybersecurity & Compliance',
    description: 'Protecting digital infrastructure with zero-trust protocols, audits, and threat defense.',
    features: ['Penetration Testing & Audits', 'Zero-Trust IAM Security', 'SOC2 & GDPR Compliance'],
  },
  {
    id: 'digital',
    Icon: TransformIcon,
    title: 'Artificial Intelligence & ML',
    description: 'Empowering enterprise software with LLMs, predictive analytics, and smart automation.',
    features: ['Custom LLM Fine-Tuning & RAG', 'Computer Vision & Automation', 'Predictive Analytics Models'],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-[#070C1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl font-bold text-white text-center mb-10"
        >
          Our Services
        </motion.h2>

        {/* 4 Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc, idx) => {
            const { Icon } = svc;
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between gap-4 cursor-pointer group relative overflow-hidden transform-gpu"
              >
                {/* Top subtle blue line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div>
                  {/* Icon */}
                  <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors w-10 h-10 flex items-center justify-center rounded-xl bg-blue-900/30 border border-blue-800/40 group-hover:border-cyan-500/40 mb-4">
                    <Icon />
                  </div>

                  {/* Content */}
                  <div className="space-y-2 mb-4">
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {svc.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Key Deliverables Bullet Points */}
                  {svc.features && svc.features.length > 0 && (
                    <div className="space-y-2 border-t border-slate-800/60 pt-3.5 my-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Core Highlights</div>
                      <ul className="space-y-1.5">
                        {svc.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-400 group-hover:text-emerald-400 transition-colors" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Arrow icon bottom right */}
                <div className="flex justify-end pt-2">
                  <div className="w-7 h-7 rounded-full border border-slate-700/60 group-hover:border-cyan-400/60 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-all">
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Services */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 text-center"
        >
          <a
            href="#all-services"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 bg-slate-900/40 hover:bg-slate-800/60 transform-gpu hover:scale-105 active:scale-95"
          >
            View All Services
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
