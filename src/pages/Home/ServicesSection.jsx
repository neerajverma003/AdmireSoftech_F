import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Code2, Cloud, Sparkles, Layers, ShieldCheck, Database, Cpu, Globe, Server, Terminal, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { getActiveServices } from '../../api/servicesApi';

const ICON_MAP = {
  Cloud,
  Code2,
  Sparkles,
  Layers,
  ShieldCheck,
  Database,
  Cpu,
  Globe,
  Server,
  Terminal,
  Smartphone,
};

const resolveIcon = (iconName) => {
  if (!iconName) return Sparkles;
  if (ICON_MAP[iconName]) return ICON_MAP[iconName];
  const cleaned = iconName.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  for (const [key, comp] of Object.entries(ICON_MAP)) {
    if (key.toLowerCase() === cleaned) return comp;
  }
  return Sparkles;
};

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        const data = await getActiveServices();
        if (isMounted && Array.isArray(data)) {
          // Take first 4 or featured services for homepage preview
          setServices(data.slice(0, 4));
        }
      } catch (err) {
        console.warn('[Home ServicesSection] Failed to load live services:', err.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!isLoading && services.length === 0) {
    return null;
  }

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
            const IconComponent = resolveIcon(svc.icon);
            return (
              <motion.div
                key={svc.id || svc._id || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between gap-4 cursor-pointer group relative overflow-hidden transform-gpu"
              >
                {/* Top subtle blue line on hover */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

                <div>
                  {/* Icon */}
                  <div className="text-cyan-400 group-hover:text-cyan-300 transition-colors w-10 h-10 flex items-center justify-center rounded-xl bg-blue-900/30 border border-blue-800/40 group-hover:border-cyan-500/40 mb-4">
                    <IconComponent className="w-5 h-5" />
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
                  {Array.isArray(svc.features) && svc.features.length > 0 && (
                    <div className="space-y-2 border-t border-slate-800/60 pt-3.5 my-3">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Core Highlights
                      </div>
                      <ul className="space-y-1.5">
                        {svc.features.slice(0, 3).map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
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
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-white text-sm font-medium transition-all duration-300 bg-slate-900/40 hover:bg-slate-800/60 transform-gpu hover:scale-105 active:scale-95"
          >
            View All Services
            <ArrowRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
