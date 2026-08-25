import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Sparkles,
  ArrowRight,
  ChevronRight,
  X,
  Quote,
} from 'lucide-react';
import { getActiveCaseStudies } from '../../api/caseStudyApi';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';
import ContactModal from '../../components/common/ContactModal';

const CATEGORIES = [
  'All',
  'Cloud & DevOps',
  'AI & Machine Learning',
  'Full-Stack Web & SaaS',
  'Healthcare',
  'FinTech',
  'Cybersecurity & Audit',
  'Enterprise Systems',
];

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      const data = await getActiveCaseStudies();
      setCaseStudies(data);
      setLoading(false);
    };
    fetchList();
  }, []);

  const filteredCaseStudies = caseStudies.filter((item) => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-[#070C1E] text-slate-100 font-poppins relative overflow-hidden pt-28 pb-20">
      {/* ──── AMBIENT GLOW BACKGROUNDS ──── */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 -right-40 h-[30rem] w-[30rem] rounded-full bg-blue-600/10 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-indigo-500/10 blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* ──── 1. HERO HEADER ──── */}
        <div className="text-center max-w-4xl mx-auto space-y-5 pt-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 shadow-lg shadow-cyan-500/10 backdrop-blur-md">
           
            <span>Proven Impact · Mission-Critical Deliveries</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight sm:leading-none">
            Engineering Outcomes That{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              Move Markets.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Real architectural transformations, latency cutoffs, and cost reductions delivered for high-growth startups and global enterprises.
          </p>

          {/* Aggregate Metric Stats Strip */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { num: '99.995%', label: 'Average Uptime SLA' },
              { num: '68%', label: 'Avg Latency Cut' },
              { num: '$45M+', label: 'Volume Processed' },
              { num: '100%', label: 'Compliance Rate' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#0A122E]/80 border border-slate-800/80 backdrop-blur-md text-center"
              >
                <div className="text-base sm:text-xl font-extrabold text-cyan-300 font-mono">
                  {stat.num}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ──── 2. CATEGORY FILTER TABS ──── */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#080E24]/80 border border-slate-800/80 backdrop-blur-xl max-w-4xl">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-lg shadow-blue-600/30 border border-cyan-400/40 scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ──── 3. CASE STUDIES GRID ──── */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="h-96 rounded-3xl bg-slate-900/40 border border-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : filteredCaseStudies.length === 0 ? (
          <div className="text-center py-20 bg-[#080E24]/40 border border-slate-800/80 rounded-3xl space-y-4">
            <Award className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No Case Studies in this category yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Select another domain vertical to explore other client engineering deliveries.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCaseStudies.map((item) => (
              <div
                key={item.id || item.slug}
                onClick={() => setSelectedCaseStudy(item)}
                className="group relative flex flex-col rounded-3xl border border-slate-800/80 bg-[#080E24]/75 backdrop-blur-2xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 shadow-2xl shadow-black/60 hover:-translate-y-1.5 cursor-pointer"
              >
                {/* Cover Thumbnail */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080E24] via-[#080E24]/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#070C1E]/80 border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider backdrop-blur-md shadow-sm">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="px-2.5 py-1 rounded-lg bg-blue-600/30 border border-blue-400/40 text-[10px] font-mono font-bold text-blue-200 uppercase tracking-wider backdrop-blur-md">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex-1 p-6 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <div className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      {item.client}
                    </div>

                    <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                      {item.summary}
                    </p>
                  </div>

                  {/* Impact Metric Chips */}
                  {Array.isArray(item.impactMetrics) && item.impactMetrics.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                      {item.impactMetrics.slice(0, 2).map((m, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl bg-slate-900/80 border border-cyan-500/20 p-2.5 text-center"
                        >
                          <div className="text-sm font-extrabold text-cyan-300 font-mono tracking-tight">
                            {m.value}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate mt-0.5 font-normal">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech Stack Pills & CTA */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(item.techStack) &&
                        item.techStack.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 text-[10px] font-mono border border-slate-700/60"
                          >
                            {tech}
                          </span>
                        ))}
                      {item.techStack?.length > 3 && (
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-800/40 text-slate-400 text-[10px] font-mono">
                          +{item.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                      <span>View Story</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ──── 4. BOTTOM WORKFLOW CTA BANNER ──── */}
        <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-blue-950/70 via-[#081232]/90 to-cyan-950/70 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl overflow-hidden">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ready for Your Next Breakthrough?</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Let's Build Mission-Critical Software for Your Business.
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Partner directly with senior cloud architects, AI engineers, and full-stack builders. Get a transparent scope and estimate in minutes.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>Instant Project Estimator</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsContactModalOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700/80 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
              >
                <span>Schedule Architect Call</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ──── 5. FULL CASE STUDY DETAIL MODAL / DRAWER ──── */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div
            data-lenis-prevent
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] font-poppins"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#030718]/60 backdrop-blur-[10px] transition-opacity duration-300"
              onClick={() => setSelectedCaseStudy(null)}
            />

            {/* Modal Card */}
            <motion.div
              data-lenis-prevent
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-3xl my-auto rounded-3xl border border-cyan-500/30 bg-[#080E24]/90 backdrop-blur-2xl p-6 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(6,182,212,0.15)] z-10 text-slate-100 max-h-[92vh] overflow-y-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer z-20"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                {/* Header Section */}
                <div className="space-y-2 pr-8">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold uppercase">
                      {selectedCaseStudy.category}
                    </span>
                    {selectedCaseStudy.badge && (
                      <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-mono font-bold uppercase">
                        {selectedCaseStudy.badge}
                      </span>
                    )}
                    <span className="text-xs font-mono text-slate-400 ml-1">
                      • {selectedCaseStudy.client}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                    {selectedCaseStudy.title}
                  </h2>
                </div>

                {/* Banner Thumbnail */}
                <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md">
                  <img
                    src={selectedCaseStudy.thumbnail}
                    alt={selectedCaseStudy.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080E24] via-transparent to-black/20" />
                </div>

                {/* Key Impact Metrics Grid */}
                {Array.isArray(selectedCaseStudy.impactMetrics) &&
                  selectedCaseStudy.impactMetrics.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {selectedCaseStudy.impactMetrics.map((m, idx) => (
                        <div
                          key={idx}
                          className="rounded-2xl bg-slate-900/80 border border-cyan-500/30 p-3.5 text-center shadow-sm"
                        >
                          <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-mono tracking-tight">
                            {m.value}
                          </div>
                          <div className="text-xs text-slate-300 font-medium mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                {/* Challenge & Solution Sections */}
                <div className="space-y-5 pt-2">
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-2">
                    <h4 className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>01. The Challenge & Bottlenecks</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                      {selectedCaseStudy.challenge}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                    <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <span>02. The Architecture & Engineering Solution</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
                      {selectedCaseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Technology Stack Tags */}
                {Array.isArray(selectedCaseStudy.techStack) &&
                  selectedCaseStudy.techStack.length > 0 && (
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-300">Technology Ecosystem</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCaseStudy.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-xl bg-slate-800/90 text-cyan-300 border border-cyan-500/30 text-xs font-mono shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Client Quote */}
                {selectedCaseStudy.clientQuote?.quote && (
                  <div className="p-5 rounded-2xl bg-[#091438] border border-blue-500/30 relative space-y-2 shadow-inner">
                    <Quote className="w-6 h-6 text-cyan-400/60 absolute top-4 right-4" />
                    <p className="text-xs sm:text-sm italic text-slate-200 leading-relaxed pr-8">
                      "{selectedCaseStudy.clientQuote.quote}"
                    </p>
                    <div className="text-xs font-bold text-white pt-1">
                      {selectedCaseStudy.clientQuote.author || 'Verified Client'}
                      {selectedCaseStudy.clientQuote.role && (
                        <span className="text-slate-400 font-normal ml-1">
                          — {selectedCaseStudy.clientQuote.role}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Modal Footer Actions */}
                <div className="pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800">
                  <span className="text-xs text-slate-400 font-mono">
                    Need a similar architecture built?
                  </span>
                  <button
                    onClick={() => {
                      setSelectedCaseStudy(null);
                      setIsQuoteModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
                  >
                    <span>Talk to Lead Architect</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
