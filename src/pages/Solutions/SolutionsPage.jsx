import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Cloud,
  DollarSign,
  Cpu,
  Server,
  Lock,
  ArrowRight,
  Zap,
  Users,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { solutionsList } from '../../data/solutionsData';
import TrustedBrands from '../Home/TrustedBrands';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';

const iconMap = {
  ShieldCheck,
  Cloud,
  DollarSign,
  Cpu,
  Server,
  Lock,
};

const partnerHighlights = [
  {
    icon: Zap,
    title: 'Rapid Agile Execution',
    description:
      'Accelerated development sprints ensuring fast time-to-market without compromising code quality.',
  },
  {
    icon: Users,
    title: 'Dedicated IT Experts',
    description:
      'Seasoned developers, AI specialists, and cloud architects working as your extended team.',
  },
  {
    icon: Award,
    title: 'Enterprise Scalability',
    description:
      'Robust, battle-tested architecture designed to scale seamlessly with your growing business demand.',
  },
  {
    icon: Clock,
    title: '24/7 Technical Support',
    description:
      'Continuous monitoring and proactive support to guarantee maximum system uptime and reliability.',
  },
];

const stats = [
  { value: '250+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction', cyan: true },
  { value: '12+', label: 'Industries Served' },
  { value: '50+', label: 'Global Experts' },
];

const SolutionsPage = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#070C1E] text-slate-100 font-poppins pt-36 pb-24 relative overflow-hidden">
      <QuickQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* ──── HERO SECTION (METEOROPS 2-COLUMN LAYOUT) ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
           

            <div className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold">
              Solutions
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Choose a solution,{' '}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Get it implemented.
              </span>
            </h1>

            {/* Action Buttons & Note */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => setIsQuoteModalOpen(true)}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>Get consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-full border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
              >
                Contact us
              </Link>

              <span className="text-xs text-slate-400 font-mono sm:ml-2">
                Free State of Cloud & Architecture session
              </span>
            </div>
          </div>

          {/* Right Column: "How it works" Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-7 sm:p-8 shadow-2xl backdrop-blur-xl space-y-5">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold mb-2">
                How it works
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    Pick the DevOps, Cloud, or Software solution your company needs.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    We'll plan its architecture, milestones, and risk-free implementation with you.
                  </p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                    You get dedicated senior engineers and architects to implement it for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ──── FEATURED SOLUTIONS SECTION (METEOROPS STYLE) ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-28">
        <div className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Featured solutions
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl font-light leading-relaxed">
            Deep dives on the themes teams ask us about most. Each solution is built to be actionable, resilient, and enterprise-ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {solutionsList.map((sol) => {
            const Icon = iconMap[sol.icon] || ShieldCheck;
            return (
              <div
                key={sol.id}
                className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-7 hover:border-cyan-500/50 hover:bg-slate-900/90 transition-all duration-300 shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-600/15 border border-blue-500/30 text-cyan-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-300 bg-blue-600/20 border border-blue-500/30 px-2.5 py-1 rounded-md">
                      {sol.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {sol.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                    {sol.description}
                  </p>
                </div>

                <Link
                  to={sol.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-white transition-colors cursor-pointer"
                >
                  <span>Read more</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──── WHY PARTNER WITH ADMIRESOFTECH? (EXACT MATCH TO REFERENCE) ──── */}
      <section className="relative z-10 border-t border-slate-800/70 pt-24 pb-20 bg-[#060A1A]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl space-y-4 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Why Partner With{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                AdmireSoftech
              </span>
              ?
            </h2>
            <p className="text-base text-slate-300 sm:text-lg font-light leading-relaxed">
              We combine technical mastery with strategic domain knowledge to build software that scales reliably.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-20">
            {partnerHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-7 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/95 hover:shadow-2xl hover:shadow-blue-500/20 transform-gpu hover:-translate-y-1"
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-600/10 text-cyan-400 shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <h4 className="mb-2 text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-400 font-light">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 pt-10 border-t border-slate-800/60">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 text-center"
              >
                <span
                  className={`text-4xl sm:text-5xl font-extrabold leading-none ${
                    stat.cyan
                      ? 'bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                      : 'text-white'
                  }`}
                >
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──── TRUSTED CLIENTS TICKER ──── */}
      <TrustedBrands />

    </main>
  );
};

export default SolutionsPage;
