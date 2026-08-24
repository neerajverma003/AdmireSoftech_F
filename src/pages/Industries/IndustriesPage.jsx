import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Code2,
  Smartphone,
  Cloud,
  Cpu,
  TrendingUp,
  Activity,
  BarChart3,
  ShieldCheck,
  GraduationCap,
  Truck,
  Building2,
  Lock,
  Zap,
  Globe,
  Layers,
} from 'lucide-react';
import { industriesList } from '../../data/industriesData';
import { getActiveIndustries } from '../../api/industriesApi';
import TrustedBrands from '../Home/TrustedBrands';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';

const iconMap = {
  Code2,
  Smartphone,
  Cloud,
  Cpu,
  TrendingUp,
  Activity,
  BarChart3,
  ShieldCheck,
  GraduationCap,
  Truck,
  Building2,
  Lock,
  Zap,
  Globe,
  Layers,
  Sparkles,
};

const coreServices = [
  {
    title: 'Web Development & SaaS',
    desc: 'Scalable cloud-native web architectures, reactive dashboards, and micro-frontends with high performance.',
    icon: Code2,
  },
  {
    title: 'Mobile App Development',
    desc: 'Native iOS & Android and cross-platform apps built with React Native and Flutter for seamless user experiences.',
    icon: Smartphone,
  },
  {
    title: 'Cloud & DevOps Solutions',
    desc: 'Multi-cloud migrations, Kubernetes cluster management, Zero-Trust security, and automated CI/CD.',
    icon: Cloud,
  },
  {
    title: 'Digital Marketing & Growth',
    desc: 'Headless e-commerce, automated marketing engines, SEO optimization, and high-converting ad funnels.',
    icon: BarChart3,
  },
];

const IndustriesPage = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [industries, setIndustries] = useState(industriesList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const loadIndustries = async () => {
      try {
        const liveData = await getActiveIndustries();
        if (isMounted && Array.isArray(liveData) && liveData.length > 0) {
          setIndustries(liveData);
        }
      } catch (e) {
        console.warn('Using local fallback industries:', e);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadIndustries();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleScrollToIndustries = () => {
    const el = document.getElementById('industries-grid');
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

      {/* ──── HERO SECTION (METEOROPS STYLE) ──── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-24 text-center">
        

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Senior engineering for{' '}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            your vertical.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-8">
          We place senior Web, Mobile, Cloud, DevOps, AI, and Digital Marketing specialists into fast-growing startups and enterprises across every vertical we serve.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setIsQuoteModalOpen(true)}
            className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <span>Book a free consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={handleScrollToIndustries}
            className="px-7 py-3.5 rounded-full border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
          >
            Browse All industries
          </button>
        </div>

        {/* Rating & Stats */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
          <div className="inline-flex items-center gap-1 text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="font-bold text-white">4.9 / 5</span>
            <span className="text-slate-400 font-sans">on Clutch</span>
          </div>
          <span className="text-slate-600">•</span>
          <span>150+ products shipped</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400 font-semibold">Top 1% vetted engineers</span>
        </div>
      </section>

      {/* ──── MAIN SECTION: PICK THE WORLD YOU ARE IN (12 INDUSTRY CARDS) ──── */}
      <section id="industries-grid" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-28">
        
        {/* Section Title */}
        <div className="text-center mb-14">
          <div className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400 font-semibold mb-2">
            Where we work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Pick the world you are in
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-light max-w-2xl mx-auto leading-relaxed">
            Same senior bench, fitted to your stack and your constraints. Explore how an engagement looks in your domain.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {industries.map((item) => {
            const Icon = iconMap[item.icon] || Sparkles;
            const itemId = item.id || item._id;
            return (
              <Link
                key={itemId}
                to="/contact"
                className="group rounded-3xl border border-slate-800/90 bg-slate-900/70 hover:border-cyan-500/50 hover:bg-slate-900/95 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                {/* Visual Header with Image & Overlay */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-black/20" />
                  
                  {/* Category Pill Icon */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-slate-950/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 backdrop-blur-md shadow-md">
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3 rounded-full bg-blue-600/30 border border-blue-400/40 px-2.5 py-0.5 text-[9px] font-mono font-semibold text-cyan-200 backdrop-blur-md">
                    {item.badge}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>

                    <p className="text-xs text-slate-400 font-light leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Key Metric:</span>
                    <span className="text-emerald-400 font-semibold">{item.metrics}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ──── CORE SERVICES WE PROVIDE TO EACH INDUSTRY ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="rounded-3xl border border-slate-800/90 bg-slate-900/60 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold mb-1 block">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Cross-Industry Technology Engineering
            </h2>
            <p className="text-sm text-slate-400 font-light leading-relaxed">
              Whatever your domain, our senior squads provide hands-on architecture, rapid prototyping, and end-to-end execution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreServices.map((svc) => {
              const SvcIcon = svc.icon;
              return (
                <div
                  key={svc.title}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 space-y-3 hover:border-cyan-500/40 hover:bg-slate-950/90 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 text-cyan-400 flex items-center justify-center">
                    <SvcIcon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{svc.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {svc.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ──── CTA BANNER ──── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-slate-900/90 to-slate-900 p-8 sm:p-12 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to build for your industry?
            </h3>
            <p className="text-sm text-slate-300 max-w-xl font-light">
              Connect directly with our engineering leads to scope your architecture and get dedicated technical support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 transition-all cursor-pointer hover:scale-105"
            >
              Get Project Estimate
            </button>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer"
            >
              Talk to an Engineer
            </Link>
          </div>
        </div>
      </section>

      {/* ──── TRUSTED CLIENTS TICKER ──── */}
      <TrustedBrands />

    </main>
  );
};

export default IndustriesPage;
