import React from 'react';
import {
  Cpu,
  Globe,
  Cloud,
  Database,
  ShieldCheck,
  Zap,
  Code,
  Terminal,
  Layers,
  Activity,
} from 'lucide-react';

const trustedBrands = [
  { name: 'Techwave', icon: Terminal },
  { name: 'Innovatech', icon: Globe },
  { name: 'Cloudix', icon: Cloud },
  { name: 'Nextgen', icon: Zap },
  { name: 'Datava', icon: Database },
  { name: 'Techcorp', icon: Cpu },
  { name: 'CyberShield', icon: ShieldCheck },
  { name: 'Apex Dynamics', icon: Activity },
  { name: 'CodeCraft Labs', icon: Code },
  { name: 'Netspire', icon: Layers },
];

const TrustedBrands = () => {
  return (
    <section id="brands" className="relative border-b border-slate-800/50 bg-[#070C1E]/90 py-7 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-5">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 text-center">
            Trusted by forward-thinking brands worldwide
          </p>
        </div>
      </div>

      {/* Infinite Running Track with smooth gradient edge fade masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left / Right gradient fade masks for seamless edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-[#070C1E] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-[#070C1E] to-transparent z-10" />

        {/* Scrolling simple running logos track */}
        <div className="animate-marquee-track flex items-center gap-8 sm:gap-14 py-2">
          {[...trustedBrands, ...trustedBrands, ...trustedBrands].map((brand, idx) => {
            const BrandIcon = brand.icon || Globe;
            return (
              <div
                key={`${brand.name}-${idx}`}
                className="group flex items-center gap-2.5 transition-all duration-300 cursor-pointer shrink-0 hover:scale-105"
              >
                <BrandIcon className="h-5 w-5 text-slate-400 group-hover:text-cyan-400 transition-colors duration-300" />
                <span className="text-sm sm:text-base font-semibold tracking-wide text-slate-400 group-hover:text-white transition-colors duration-300">
                  {brand.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
