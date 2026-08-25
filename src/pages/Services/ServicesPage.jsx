import React, { useState, useMemo, Suspense, lazy } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  Cloud,
  Cpu,
  Code2,
  ShieldCheck,
  BarChart3,
  Palette,
  Layers,
  Search,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';
import { getActiveServices } from '../../api/servicesApi';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';
import WhyChooseUsTestimonials from '../../components/common/WhyChooseUsTestimonials';
import CtaBanner from '../../components/common/CtaBanner';

const Services3D = lazy(() => import('../../components/3d/Services3D'));

const ICON_MAP = {
  Cloud,
  Cpu,
  Code2,
  ShieldCheck,
  BarChart3,
  Palette,
  Layers,
};

const getServiceIcon = (service) => {
  if (service?.icon && typeof service.icon !== 'string') return service.icon;
  if (service?.iconName && ICON_MAP[service.iconName]) return ICON_MAP[service.iconName];
  if (service?.category === 'AI') return Cpu;
  if (service?.category === 'Development') return Code2;
  if (service?.category === 'Security') return ShieldCheck;
  if (service?.category === 'Data') return BarChart3;
  if (service?.category === 'Design') return Palette;
  return Cloud;
};

const DEFAULT_CATEGORIES = ['All', 'Cloud', 'AI', 'Development', 'Security', 'Data', 'Design'];

const TYPEWRITER_SERVICES = [
  'Web Development',
  'Cloud Solutions',
  'AI & Automation',
  'App Development',
  'Cyber Security',
  'IT Infrastructure',
];

const ServicesPage = () => {
  const [servicesList, setServicesList] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch live services from MongoDB
  React.useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getActiveServices();
        if (isMounted && Array.isArray(data)) {
          setServicesList(data);
        }
      } catch (err) {
        console.warn('[ServicesPage] Failed to fetch services from backend:', err.message);
        if (isMounted) setServicesList([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, []);

  // Typewriter animation state
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [typewriterText, setTypewriterText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  React.useEffect(() => {
    const currentWord = TYPEWRITER_SERVICES[typewriterIndex];
    let timer;

    if (!isDeleting) {
      if (typewriterText.length < currentWord.length) {
        timer = setTimeout(() => {
          setTypewriterText(currentWord.slice(0, typewriterText.length + 1));
        }, 75);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (typewriterText.length > 0) {
        timer = setTimeout(() => {
          setTypewriterText(currentWord.slice(0, typewriterText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setTypewriterIndex((prev) => (prev + 1) % TYPEWRITER_SERVICES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typewriterText, isDeleting, typewriterIndex]);

  // Categories derived from live data
  const categories = useMemo(() => {
    if (!servicesList || servicesList.length === 0) return DEFAULT_CATEGORIES;
    const unique = Array.from(new Set(servicesList.map((s) => s.category).filter(Boolean)));
    return unique.length > 0 ? ['All', ...unique] : DEFAULT_CATEGORIES;
  }, [servicesList]);

  // Filtered services from live data
  const filteredServices = useMemo(() => {
    return servicesList.filter((s) => {
      const matchesCategory =
        activeCategory === 'All' || s.category?.toLowerCase() === activeCategory.toLowerCase();
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const titleMatch = s.title?.toLowerCase().includes(query);
      const descMatch = (s.description || s.fullDescription || '').toLowerCase().includes(query);
      const techMatch = s.techStack?.some((t) => t.toLowerCase().includes(query));
      return matchesCategory && (titleMatch || descMatch || techMatch);
    });
  }, [servicesList, activeCategory, searchQuery]);

  const handleOpenInquiry = () => {
    setSelectedService(null);
    setIsQuoteModalOpen(true);
  };

  return (
    <main id="services-page" className="relative min-h-screen w-full overflow-hidden bg-[#070C1E] text-slate-100 font-poppins pt-28 pb-16">
      
      {/* Subtle ambient background glows */}
      <div className="pointer-events-none absolute top-0 right-0 w-[60%] h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-l from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-600/15 blur-3xl rounded-full" />
        <div className="absolute top-1/3 right-40 w-64 h-64 bg-cyan-500/10 blur-3xl rounded-full" />
      </div>

      {/* ───── HERO HEADER WITH 3D ROTATIONAL CUBE ON RIGHT ───── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT 7 COLS: Hero Content, Search & Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 shadow-sm shadow-blue-500/20">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
              <span>Full-Spectrum Engineering</span>
            </div>

            {/* Main Title & Smooth Borderless Typewriter */}
            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] leading-[1.15]">
                Our Specialized{' '}
                <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Services
                </span>
              </h1>

              {/* Clean Smooth Typewriter with same size as Services */}
              <div className="flex items-center justify-center lg:justify-start gap-1 min-h-[48px] sm:min-h-[58px] lg:min-h-[64px] pt-1">
                <span className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-[3.25rem] leading-[1.15] bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(6,182,212,0.35)]">
                  {typewriterText}
                </span>
                <span className="inline-block w-1 sm:w-1.5 h-8 sm:h-10 lg:h-12 bg-cyan-400 rounded-full animate-pulse align-middle ml-1" />
              </div>
            </div>

            {/* Subtext */}
            <p className="text-base text-slate-300 sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light">
              Explore our end-to-end technology services designed to modernize infrastructure, automate processes, and scale high-concurrency digital platforms.
            </p>

            {/* Search Input with Quick Clear */}
            <div className="pt-2">
              <div className="relative max-w-xl mx-auto lg:mx-0 group">
                {/* Glow border */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 opacity-30 blur-sm group-hover:opacity-70 group-focus-within:opacity-100 transition-opacity" />
                
                <div className="relative flex items-center rounded-2xl border border-slate-800 bg-slate-900/90 shadow-2xl backdrop-blur-xl">
                  <div className="flex h-12 w-12 items-center justify-center pl-3 text-cyan-400">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search services (e.g. Kubernetes, AI, React, Security)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent px-2 py-3.5 text-sm text-white placeholder-slate-400 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="mr-3 p-1 rounded-full text-slate-400 hover:text-white transition-colors cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 border border-cyan-400/40 scale-105'
                      : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          {/* RIGHT 5 COLS: Interactive 3D Three.js Rotating Cyber Cube */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 bg-blue-600/20 blur-3xl rounded-full" />
              <div className="absolute w-48 h-48 bg-cyan-500/15 blur-2xl rounded-full" />
            </div>

            <Suspense
              fallback={
                <div className="w-full h-[420px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3 text-slate-400">
                    <div className="w-10 h-10 border-2 border-cyan-500/40 border-t-cyan-400 rounded-full animate-spin" />
                    <span className="text-xs font-mono tracking-wider">Loading 3D Model...</span>
                  </div>
                </div>
              }
            >
              <Services3D onSelectCategory={(cat) => setActiveCategory(cat)} />
            </Suspense>
          </motion.div>

        </div>
      </section>

      {/* ───── SERVICES GRID ───── */}
      <section id="service-cards" className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        {filteredServices.length === 0 ? (
          <div className="text-center py-20 border border-slate-800/60 rounded-3xl bg-slate-900/40 space-y-3">
            <p className="text-slate-400 text-base">No services matching "{searchQuery}"</p>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="text-xs text-cyan-400 font-semibold hover:underline cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredServices.map((service) => {
              const Icon = getServiceIcon(service);
              const serviceKey = service.id || service._id || service.title;
              return (
                <div
                  key={serviceKey}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                  }}
                  className="spotlight-card group relative flex flex-col justify-between h-full rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-7 transition-all duration-300 hover:border-cyan-400/40 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-2"
                >
                  {/* Ambient top-right glow */}
                  <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-cyan-400/10 blur-2xl transition-opacity duration-300 opacity-40 group-hover:opacity-90" />

                  <div className="relative z-10">
                    {/* Card Header: Icon & Badge */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color || 'from-blue-600 to-cyan-400'} p-2.5 shadow-lg shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      {service.badge && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-cyan-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          {service.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="mb-2.5 text-lg sm:text-xl font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-300">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>

                    {/* Features list preview (Compact top 3 items) */}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-4 space-y-2 border-t border-slate-800/60 pt-3.5">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Core Highlights</div>
                        <ul className="space-y-1.5">
                          {service.features.slice(0, 3).map((f) => (
                            <li key={f} className="flex items-center gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 group-hover:text-emerald-400 transition-colors" />
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Tech Stack Pills & Action Button */}
                  <div className="relative z-10 mt-auto border-t border-slate-800/80 pt-4">
                    {service.techStack && (
                      <div className="mb-4 flex flex-wrap items-center gap-1.5">
                        {service.techStack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-slate-800 bg-slate-800/80 px-2 py-0.5 text-[10px] font-medium text-slate-300 transition-colors group-hover:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                        {service.techStack.length > 4 && (
                          <span className="rounded-md bg-slate-800/50 px-1.5 py-0.5 text-[10px] text-slate-500 font-medium">
                            +{service.techStack.length - 4}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        <span>Explore Details</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/link:translate-x-1" />
                      </button>

                      <button
                        type="button"
                        onClick={handleOpenInquiry}
                        className="text-[11px] font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
                      >
                        Inquire →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ──── STREAMLINE WORKFLOW CTA BANNER ──── */}
      <CtaBanner onOpenModal={() => setIsQuoteModalOpen(true)} />

      {/* ──── WHY CHOOSE US & TESTIMONIALS SECTION ──── */}
      <WhyChooseUsTestimonials onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      {/* ───── SERVICE DETAIL MODAL (Rendered at Body Level via Portal) ───── */}
      {selectedService &&
        createPortal(
          <div data-lenis-prevent className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-scrollbar">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setSelectedService(null)}
            />

            {/* Modal Dialog Card */}
            <div data-lenis-prevent className="relative w-full max-w-2xl my-auto rounded-3xl border border-slate-700/80 bg-slate-900/95 p-5 sm:p-8 shadow-2xl z-10 font-poppins text-slate-100 max-h-[96vh] overflow-y-auto no-scrollbar">
              {/* Glow background */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

              <button
                type="button"
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="rounded-full bg-blue-600/15 text-cyan-400 border border-blue-600/30 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider">
                  {selectedService.category || 'Service Architecture'}
                </span>
                {selectedService.badge && (
                  <span className="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-2.5 py-0.5 text-[11px] font-semibold text-cyan-400">
                    {selectedService.badge}
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">{selectedService.title}</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                {selectedService.fullDescription || selectedService.description}
              </p>

              {selectedService.features && selectedService.features.length > 0 && (
                <>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">Key Engineering Capabilities</h4>
                  <ul className="space-y-2.5 mb-6">
                    {selectedService.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm text-slate-200">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {selectedService.techStack && selectedService.techStack.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Core Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-xl border border-slate-700/80 bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-3 border-t border-slate-800 pt-6">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleOpenInquiry}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer"
                >
                  Inquire For This Service
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ───── POPUP QUICK QUOTE MODAL ───── */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </main>
  );
};

export default ServicesPage;


