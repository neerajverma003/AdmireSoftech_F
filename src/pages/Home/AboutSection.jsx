import React, { useState } from 'react';
import {
  Target,
  MessageSquare,
  Globe,
  Clock,
  ShieldCheck,
  Cpu,
  Zap,
  Code,
  Lightbulb,
  Users,
  Award,
} from 'lucide-react';
import { initialAboutData } from '../../data/aboutData';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';

const iconMap = {
  Target,
  MessageSquare,
  Globe,
  Clock,
  ShieldCheck,
  Cpu,
  Zap,
  Code,
  Lightbulb,
  Users,
  Award,
};

const AboutSection = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const aboutData = initialAboutData;

  const {
    badge,
    headingLine1,
    headingLine2,
    highlightYear,
    description,
    founderName,
    founderRole,
    ctaText,
    imageUrl,
    features = [],
  } = aboutData;

  return (
    <section id="about-us" className="relative border-y border-slate-800/60 bg-[#070C1E] py-20 md:py-28 overflow-hidden">
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute -top-20 -left-20 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">

          {/* LEFT COLUMN: Content (7 cols) */}
          <div className="lg:col-span-7 space-y-7">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-600/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>{badge || '- ABOUT US -'}</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] leading-[1.18]">
              {headingLine1 || 'Trusted By Worldwide'}
              <br />
              {headingLine2 || 'Clients Since'}{' '}
              <span className="relative inline-block text-cyan-400">
                {highlightYear || '1980.'}
                <svg
                  className="absolute -bottom-2.5 left-0 w-full h-3.5 text-cyan-400 overflow-visible"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 6 Q 50 12 100 2 Q 50 0 0 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            {/* Description Paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              {description}
            </p>

            {/* 2x2 Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {features.map((feat) => {
                const IconComp = iconMap[feat.iconName] || Target;
                return (
                  <div key={feat.id || feat.title} className="flex items-start gap-4 group">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-800/60 bg-[#0d1f3c] text-cyan-400 shadow-lg shadow-blue-600/10 transition-transform duration-300 group-hover:scale-110 group-hover:border-cyan-400">
                      <IconComp className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {feat.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mt-1">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Row: CTA Button + Signature */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-slate-800/80">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00aaff] to-[#0077ff] hover:from-[#0088ff] hover:to-[#0055cc] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <span>{ctaText || 'Get In Touch'}</span>
              </button>

              {/* Founder/Brand Signature Block */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-0.5 rounded-full bg-gradient-to-b from-blue-600 to-cyan-400" />
                <div>
                  <div className="font-[cursive] text-2xl font-bold tracking-wider text-white">
                    {founderName || 'Admire Softech'}
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                    {founderRole || 'CEO & Founder'}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Static Seamless 3D Isometric Illustration (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Multi-Layer Ambient Backlight Glows */}
            <div className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-tr from-blue-600/35 via-cyan-400/25 to-indigo-600/20 blur-[100px] opacity-80" />
            <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-cyan-400/15 blur-[90px]" />

            {/* Seamless Static Illustration Container */}
            <div className="relative w-full max-w-[540px]">
              <img
                src={imageUrl || '/assets/images/about_isometric_workspace.jpg'}
                alt="Admire Softech Developer Workstation"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/assets/images/about_isometric_workspace.jpg';
                }}
                className="w-full h-auto object-contain [mask-image:radial-gradient(ellipse_85%_80%_at_50%_50%,black_45%,transparent_95%)] [-webkit-mask-image:radial-gradient(ellipse_85%_80%_at_50%_50%,black_45%,transparent_95%)] mix-blend-screen"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
