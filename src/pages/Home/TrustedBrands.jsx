import React from 'react';
import { motion } from 'framer-motion';

const brandIcons = {
  techwave: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 6l3 3-3 3M8 6l3 3-3 3M2 18h12M16 8h6M16 12h6M16 16h6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  innovatech: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeLinecap="round" />
    </svg>
  ),
  cloudix: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  nextgen: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  datar: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M21 19c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14M21 5v14" strokeLinecap="round"/>
    </svg>
  ),
};

const brands = [
  { id: 'techwave', name: 'techwave' },
  { id: 'innovatech', name: 'innovatech' },
  { id: 'cloudix', name: 'cloudix' },
  { id: 'nextgen', name: 'nextgen' },
  { id: 'datar', name: 'datar' },
];

const TrustedBrands = () => {
  return (
    <section id="brands" className="py-14 bg-[#070C1E] border-t border-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xl sm:text-2xl font-bold text-white mb-8 leading-snug"
        >
          Trusted by forward-thinking <br /> brands worldwide
        </motion.h2>

        <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16">
          {brands.map((brand, idx) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer group transform-gpu"
            >
              <span className="text-slate-500 group-hover:text-cyan-400 transition-colors">
                {brandIcons[brand.id]}
              </span>
              <span className="text-sm font-semibold tracking-wide capitalize">
                {brand.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
