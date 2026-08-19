import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ArrowRight,
  Search,
  Sparkles,
  Layers,
  Code2,
  CheckCircle2,
} from 'lucide-react';
import { LOGOS, categories, categoryData } from '../../data/techStackData';
import TechStackSection from '../Home/TechStackSection';
import TrustedBrands from '../Home/TrustedBrands';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';

// 4x3 Hero Tech Icons Matrix for the MeteorOps-style Hero Card
const heroPlatforms = [
  { name: 'Kubernetes', logoKey: 'kubernetes' },
  { name: 'AWS', logoKey: 'aws' },
  { name: 'Terraform', logoKey: 'terraform' },
  { name: 'Docker', logoKey: 'docker' },
  { name: 'Google Cloud', logoKey: 'google' },
  { name: 'React', logoKey: 'react' },
  { name: 'Next.js', logoKey: 'nextjs' },
  { name: 'TypeScript', logoKey: 'typescript' },
  { name: 'Python', logoKey: 'python' },
  { name: 'PyTorch', logoKey: 'pytorch' },
  { name: 'PostgreSQL', logoKey: 'postgresql' },
  { name: 'Git', logoKey: 'git' },
];

const TechnologiesPage = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Flatten all tech stack items for searchable directory
  const allTechList = useMemo(() => {
    const list = [];
    Object.entries(categoryData).forEach(([catKey, items]) => {
      const catObj = categories.find((c) => c.id === catKey);
      items.forEach((item) => {
        if (!list.some((existing) => existing.name === item.name)) {
          list.push({
            ...item,
            categoryKey: catKey,
            categoryLabel: catObj ? catObj.label : catKey,
          });
        }
      });
    });
    return list;
  }, []);

  // Filtered list based on search and category
  const filteredTechs = useMemo(() => {
    return allTechList.filter((tech) => {
      const matchesCategory =
        activeFilter === 'all' || tech.categoryKey === activeFilter;
      const matchesSearch =
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.badge.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [allTechList, activeFilter, searchQuery]);

  const handleScrollToTech = () => {
    const el = document.getElementById('tech-browser');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-[#070C1E] text-slate-100 font-poppins pt-36 pb-24 relative overflow-hidden">
      <QuickQuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* ──── HERO SECTION (METEOROPS 2-COLUMN LAYOUT) ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Column: Heading, Subtitle, & CTAs */}
          <div className="lg:col-span-7 space-y-6">


            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Senior Engineering help across{' '}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                your entire stack
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl">
              From Kubernetes, Terraform, and AWS to React, Python, Node.js, and enterprise AI pipelines, our senior engineers consult and do the hands-on implementation.
            </p>

            {/* CTA Buttons & Stats */}
            <div className="pt-2 space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Book a free consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={handleScrollToTech}
                  className="px-6 py-3.5 rounded-full border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
                >
                  Browse technologies
                </button>
              </div>

              {/* Micro stats */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-2">
                <span>140+ technologies</span>
                <span className="text-slate-600">•</span>
                <span>27 categories</span>
                <span className="text-slate-600">•</span>
                <div className="inline-flex items-center gap-1 text-amber-400">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="font-bold text-white">4.9 / 5</span>
                  <span className="text-slate-400 font-sans">on Clutch</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: MeteorOps 4x3 Platform Grid Card */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {heroPlatforms.map((plat) => {
                  const logoUrl = LOGOS[plat.logoKey];
                  return (
                    <div
                      key={plat.name}
                      className="group aspect-square rounded-2xl border border-slate-800 bg-slate-950/70 p-3 flex flex-col items-center justify-center hover:border-cyan-400/50 hover:bg-slate-900 transition-all duration-300 hover:scale-105 shadow-sm"
                      title={plat.name}
                    >
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={plat.name}
                          className="w-7 h-7 object-contain group-hover:scale-110 transition-transform"
                          loading="lazy"
                        />
                      ) : (
                        <Code2 className="w-6 h-6 text-cyan-400" />
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-center text-slate-400 font-light pt-1">
                A few of the core frameworks & cloud platforms our engineers work in daily.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ──── INTERACTIVE TECH STACK SECTION (REUSABLE COMPONENT) ──── */}
      <section className="relative z-10 border-t border-slate-800/70">
        <TechStackSection />
      </section>

      {/* ──── FIND YOUR TECHNOLOGY (SEARCHABLE DIRECTORY) ──── */}
      <section id="tech-browser" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 mb-24">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Find your technology
          </h2>
          <p className="text-sm text-slate-400 font-light leading-relaxed">
            Every tool, framework, database, and cloud service our engineers build in. Search directly or filter by domain.
          </p>
        </div>

        {/* Search Bar & Category Filter Bar */}
        <div className="max-w-4xl mx-auto mb-10 space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search technologies (e.g., React, Kubernetes, Python, AWS)..."
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-slate-800 bg-slate-900/80 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-lg backdrop-blur-md"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${activeFilter === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25'
                  : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
            >
              All ({allTechList.length})
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all cursor-pointer ${activeFilter === cat.id
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/25'
                    : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Grid of Technologies */}
        {filteredTechs.length === 0 ? (
          <div className="text-center py-12 rounded-3xl border border-slate-800 bg-slate-900/40">
            <p className="text-slate-400 text-sm">No technologies match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {filteredTechs.map((tech) => {
              const logoUrl = LOGOS[tech.logoKey];
              return (
                <div
                  key={`${tech.name}-${tech.categoryKey}`}
                  className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-200 flex flex-col items-center justify-between text-center space-y-2 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-center p-2 group-hover:scale-110 transition-transform">
                    {logoUrl ? (
                      <img src={logoUrl} alt={tech.name} className="w-6 h-6 object-contain" />
                    ) : (
                      <Code2 className="w-5 h-5 text-cyan-400" />
                    )}
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {tech.name}
                    </h4>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mt-0.5">
                      {tech.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 font-semibold">
                    {tech.percentage}% Proficiency
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ──── TRUSTED BRANDS RUNNING BANNER ──── */}
      <TrustedBrands />

    </main>
  );
};

export default TechnologiesPage;
