import React from 'react';
import { ArrowRight, Layers, Cloud, BarChart3, Sparkles, Play } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* ISOMETRIC 3D TECH / SECURE SERVER ILLUSTRATION (Sleek Compact Vector)      */
/* -------------------------------------------------------------------------- */
const IsometricSecureServerGraphic = () => (
  <div className="relative w-full max-w-[280px] sm:max-w-[330px] aspect-[4/3] flex items-center justify-center">
    {/* Ambient Glows */}
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-cyan-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />

    <svg viewBox="0 0 500 380" className="w-full h-full drop-shadow-[0_15px_35px_rgba(6,182,212,0.25)]">
      <defs>
        <linearGradient id="serverGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0B132B" />
        </linearGradient>
        <linearGradient id="serverGradTop" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="glowLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      {/* Floating Background Isometric Grid Platforms */}
      <g opacity="0.35">
        <path d="M 250 330 L 410 240 L 250 150 L 90 240 Z" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="6 6" />
        <path d="M 250 350 L 440 240 L 250 130 L 60 240 Z" fill="none" stroke="#2563EB" strokeWidth="1" strokeOpacity="0.5" />
      </g>

      {/* Left Isometric Server Stack 1 */}
      <g transform="translate(-40, 20)">
        <path d="M 170 230 L 230 195 L 290 230 L 230 265 Z" fill="#1E293B" stroke="#334155" />
        <path d="M 170 230 L 170 245 L 230 280 L 230 265 Z" fill="#0F172A" />
        <path d="M 290 230 L 290 245 L 230 280 L 230 265 Z" fill="#1E293B" />

        <path d="M 170 190 L 230 155 L 290 190 L 230 225 Z" fill="#1E293B" stroke="#06B6D4" strokeWidth="0.8" />
        <path d="M 170 190 L 170 205 L 230 240 L 230 225 Z" fill="#0F172A" />
        <path d="M 290 190 L 290 205 L 230 240 L 230 225 Z" fill="#1E293B" />
        <circle cx="210" cy="215" r="2.5" fill="#10B981" />
        <circle cx="225" cy="223" r="2.5" fill="#06B6D4" />

        <path d="M 170 145 L 230 110 L 290 145 L 230 180 Z" fill="url(#serverGrad1)" stroke="#38BDF8" strokeWidth="1.5" />
        <path d="M 170 145 L 170 160 L 230 195 L 230 180 Z" fill="#0F172A" />
        <path d="M 290 145 L 290 160 L 230 195 L 230 180 Z" fill="#1E293B" />
        <line x1="195" y1="140" x2="230" y2="120" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
        <line x1="205" y1="150" x2="255" y2="122" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
        <line x1="220" y1="162" x2="265" y2="137" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Right Isometric Server Rack */}
      <g transform="translate(60, 0)">
        <path d="M 260 250 L 330 210 L 400 250 L 330 290 Z" fill="#0F172A" stroke="#334155" />
        <path d="M 260 250 L 260 270 L 330 310 L 330 290 Z" fill="#0B132B" />
        <path d="M 400 250 L 400 270 L 330 310 L 330 290 Z" fill="#1E293B" />

        <path d="M 260 210 L 330 170 L 400 210 L 330 250 Z" fill="#1E293B" stroke="#3B82F6" strokeWidth="1" />
        <path d="M 260 210 L 260 230 L 330 270 L 330 250 Z" fill="#0F172A" />
        <path d="M 400 210 L 400 230 L 330 270 L 330 250 Z" fill="#1E293B" />
        <circle cx="310" cy="245" r="3" fill="#06B6D4" className="animate-pulse" />
        <circle cx="330" cy="256" r="3" fill="#3B82F6" />
        <circle cx="350" cy="245" r="3" fill="#10B981" className="animate-pulse" />

        <path d="M 260 170 L 330 130 L 400 170 L 330 210 Z" fill="url(#serverGrad1)" stroke="#06B6D4" strokeWidth="1.5" />
        <path d="M 260 170 L 260 190 L 330 230 L 330 210 Z" fill="#0F172A" />
        <path d="M 400 170 L 400 190 L 330 230 L 330 210 Z" fill="#1E293B" />
        <line x1="280" y1="165" x2="350" y2="125" stroke="#38BDF8" strokeWidth="1.5" />
        <line x1="300" y1="180" x2="370" y2="140" stroke="#06B6D4" strokeWidth="1.5" />
      </g>

      {/* Center Glowing Security Shield */}
      <g transform="translate(210, 100)">
        <ellipse cx="40" cy="50" rx="45" ry="35" fill="#06B6D4" fillOpacity="0.15" filter="blur(8px)" />
        <path d="M 10 70 L 40 50 L 70 70 L 40 90 Z" fill="#0F172A" stroke="#06B6D4" strokeWidth="1.5" />
        <path
          d="M 40 15 L 68 25 C 68 55 40 70 40 70 C 40 70 12 55 12 25 Z"
          fill="url(#shieldGrad)"
          stroke="#FFFFFF"
          strokeWidth="2"
          className="drop-shadow-[0_10px_20px_rgba(16,185,129,0.5)] animate-bounce"
          style={{ animationDuration: '3s' }}
        />
        <path
          d="M 33 40 L 47 40 L 47 52 L 33 52 Z M 35 40 C 35 34 45 34 45 40"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      <path d="M 190 200 Q 250 170 330 210" fill="none" stroke="url(#glowLine)" strokeWidth="2.5" strokeDasharray="8 6" />
      <path d="M 230 260 Q 280 280 340 240" fill="none" stroke="#10B981" strokeWidth="2" strokeDasharray="5 5" opacity="0.8" />
    </svg>
  </div>
);

/* -------------------------------------------------------------------------- */
/* CTA BANNER COMPONENT (Compact & User-Friendly)                             */
/* -------------------------------------------------------------------------- */
const CtaBanner = ({ onOpenModal }) => {
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 font-poppins">
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-blue-600/30 bg-gradient-to-br from-slate-900 via-[#0E1B38] to-[#0A1128] p-6 sm:p-8 lg:p-10 shadow-xl shadow-blue-600/10">

        {/* Ambient Backlight Orbs */}
        <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-600/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />

        {/* ════════════════ TOP ROW: CONTENT & ISOMETRIC GRAPHIC ════════════════ */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-6 items-center mb-7">

          {/* Left 7 Columns: Text & Actions */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-cyan-400 shadow-sm shadow-cyan-400/20">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>ENTERPRISE ENGINEERING & CLOUD</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug">
              Streamline Your Workflow,{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Securely
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
              Get strategic, high-velocity engineering help with secure architectures, custom AI automation, and high-concurrency cloud operations.
            </p>

            {/* Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal('get-started')}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-blue-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-cyan-500/25 hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="relative z-10">Get Started Now</span>
                <ArrowRight className="h-3.5 w-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal('demo')}
                className="group relative overflow-hidden rounded-xl border border-slate-700/90 bg-slate-800/80 px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 hover:border-cyan-400/60 hover:bg-slate-700/90 hover:text-white transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                <Play className="h-3 w-3 text-cyan-400 fill-cyan-400/30 transition-transform duration-300 group-hover:scale-110" />
                <span>Book a Demo</span>
              </button>
            </div>
          </div>

          {/* Right 5 Columns: Compact Isometric Graphic */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <IsometricSecureServerGraphic />
          </div>

        </div>

        {/* ════════════════ BOTTOM ROW: 3 COMPACT FEATURE CARDS ════════════════ */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-5 border-t border-slate-800/80">

          {/* Card 1: Integration */}
          <div
            onClick={() => onOpenModal && onOpenModal('Integration')}
            className="group relative overflow-hidden rounded-xl border border-slate-800/90 bg-slate-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-800/90 text-left cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Layers className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                Integration
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-300">
              Custom seamless API connectivity, ERP integrations, and legacy modernization.
            </p>
          </div>

          {/* Card 2: Cloud Sync */}
          <div
            onClick={() => onOpenModal && onOpenModal('Cloud Sync')}
            className="group relative overflow-hidden rounded-xl border border-slate-800/90 bg-slate-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/60 hover:bg-slate-800/90 text-left cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-400 border border-blue-600/20 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <Cloud className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-blue-300">
                Cloud Sync
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-300">
              High-concurrency data pipelines, zero-downtime CI/CD, and elastic multi-region scaling.
            </p>
          </div>

          {/* Card 3: Analytics */}
          <div
            onClick={() => onOpenModal && onOpenModal('Analytics')}
            className="group relative overflow-hidden rounded-xl border border-slate-800/90 bg-slate-900/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/60 hover:bg-slate-800/90 text-left cursor-pointer"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h4 className="text-sm font-bold text-white transition-colors duration-300 group-hover:text-emerald-300">
                Analytics
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-300">
              Real-time intelligent observability, custom telemetry, and AI-driven business insights.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CtaBanner;
