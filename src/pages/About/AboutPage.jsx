import React, { useState, useEffect } from 'react';
import {
  Target,
  Lightbulb,
  TrendingUp,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Quote,
  ArrowRight,
  Award,
  Globe,
  Users,
} from 'lucide-react';
import { getActiveTestimonials } from '../../api/testimonialsApi';
import { getActiveTeamMembers } from '../../api/teamApi';
import CtaBanner from '../../components/common/CtaBanner';
import QuickQuoteModal from '../../components/common/QuickQuoteModal';
import WriteReviewModal from '../../components/common/WriteReviewModal';

const values = [
  {
    icon: Lightbulb,
    title: 'Relentless Innovation',
    description:
      'We constantly test emerging AI models, cloud frameworks, and distributed architectures to keep our clients ahead.',
  },
  {
    icon: Target,
    title: 'Outcome-Driven Engineering',
    description:
      'We measure success not by lines of code, but by measurable efficiency gains, throughput, and uptime SLAs.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero-Trust Transparency',
    description:
      'Uncompromising data privacy, security compliance, and clear agile communication across every sprint.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    description:
      'Software built today must effortlessly handle tomorrow’s 10x throughput without architectural rewrites.',
  },
];

const timeline = [
  {
    year: '2020',
    title: 'Foundation',
    desc: 'Started as a boutique cloud & web engineering studio with core focus on high-performance infrastructure.',
  },
  {
    year: '2022',
    title: 'Global Scale',
    desc: 'Crossed 100+ enterprise deliveries across US, Europe & Asia with 24/7 follow-the-sun reliability.',
  },
  {
    year: '2024',
    title: 'AI Lab Launch',
    desc: 'Established dedicated Generative AI, custom fine-tuning, and LLM orchestration units.',
  },
  {
    year: '2026',
    title: '250+ Milestone',
    desc: 'Expanded team to 50+ senior engineers with a 98% client retention rate.',
  },
];

const AboutPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchPageData = async () => {
      try {
        const [reviewsData, teamData] = await Promise.all([
          getActiveTestimonials().catch(() => []),
          getActiveTeamMembers().catch(() => []),
        ]);
        if (isMounted) {
          if (Array.isArray(reviewsData)) setTestimonials(reviewsData);
          if (Array.isArray(teamData)) setTeamMembers(teamData.slice(0, 4));
        }
      } catch (err) {
        console.warn('[AboutPage] Error fetching page data:', err.message);
      }
    };
    fetchPageData();

    // Re-fetch every 30 seconds so admin changes reflect live
    const pollInterval = setInterval(fetchPageData, 30000);

    // Also re-fetch when user tabs back to the page
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchPageData();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;

    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const t = testimonials.length > 0 ? (testimonials[activeTestimonial] || testimonials[0]) : null;

  return (
    <main className="relative min-h-screen bg-[#070C1E] text-slate-100 font-poppins pt-28 pb-16 overflow-hidden">
      
      {/* ──── HERO SECTION ──── */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[140px] rounded-full" />
        <div className="pointer-events-none absolute top-10 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 shadow-sm shadow-cyan-400/20">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>WHO WE ARE & HOW WE WORK</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Engineering Precision.{' '}
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Built For Enterprise Scale.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            We are senior software engineers, cloud architects, and AI specialists who help innovative companies ship faster, scale reliably, and modernize without friction.
          </p>

          {/* Action Button */}
          <div className="pt-3">
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Work with our team</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ──── IMPACT METRICS COUNTER BAR ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="rounded-3xl border border-blue-900/40 bg-gradient-to-r from-slate-900/90 via-[#0D1836]/70 to-slate-900/90 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                250+
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
                Enterprise Projects
              </div>
            </div>

            <div className="space-y-1 pt-6 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                98%
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
                Client Retention Rate
              </div>
            </div>

            <div className="space-y-1 pt-6 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                50+
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
                Senior Architects
              </div>
            </div>

            <div className="space-y-1 pt-6 md:pt-0">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                12+
              </div>
              <div className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-400">
                Years of Mastery
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──── CORE ENGINEERING VALUES / PRINCIPLES ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-3 shadow-sm shadow-cyan-400/20">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
            <span>Guiding Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Our Core{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              Engineering Principles
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const IconComp = v.icon;
            return (
              <div
                key={v.title}
                className="group relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-br from-slate-900/90 via-[#0D1836]/60 to-slate-900/90 p-7 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-400/50 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.25)] text-left"
              >
                {/* Top Glowing Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-cyan-400 border border-blue-600/30 shadow-md shadow-blue-600/20 transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-400/20 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] mb-6">
                  <IconComp className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5 transition-colors duration-300 group-hover:text-cyan-400">
                  {v.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed transition-colors duration-300 group-hover:text-white">
                  {v.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ──── INTERACTIVE GROWTH TIMELINE ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="rounded-3xl border border-slate-800/90 bg-slate-900/60 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Our{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Growth Journey
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">Evolution of enterprise engineering mastery</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="group relative border-l-2 border-blue-600/40 pl-6 space-y-2 transition-all duration-300 hover:border-cyan-400"
              >
                <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50 group-hover:scale-125 transition-transform" />
                <div className="text-3xl font-extrabold text-cyan-400 tracking-tight">{item.year}</div>
                <div className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </div>
                <div className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──── LEADERSHIP & ARCHITECTS ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Leadership &{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Engineering Architects
            </span>
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Guiding enterprise transformations with hands-on technical excellence
          </p>
        </div>

        {teamMembers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id || member._id}
                className="group relative overflow-hidden rounded-3xl border border-slate-800/90 bg-gradient-to-br from-slate-900/90 via-[#0D1836]/60 to-slate-900/90 p-7 text-center transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-cyan-400/50 hover:shadow-[0_20px_40px_-15px_rgba(6,182,212,0.25)]"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative w-28 h-28 mx-auto mb-5">
                  <img
                    src={member.avatarImg || member.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80'}
                    alt={member.name}
                    className="w-full h-full rounded-2xl object-cover border-2 border-blue-600/30 shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:border-cyan-400/60"
                    loading="lazy"
                  />
                </div>

                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">
                  {member.name}
                </h3>
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-400 mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">{member.bio}</p>
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {/* ──── CLIENT TESTIMONIALS SLIDER ──── */}
      {t && (
        <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mb-24">
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative overflow-hidden rounded-3xl border border-blue-600/30 bg-gradient-to-br from-blue-950/70 via-slate-900/90 to-slate-900/95 p-8 sm:p-14 shadow-2xl text-center group"
          >
            <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
            <Quote className="pointer-events-none absolute top-6 left-6 h-16 w-16 text-slate-800/40 -scale-x-100 select-none" />

            {/* Star Ratings */}
            <div className="flex justify-center gap-1.5 mb-6 relative z-10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
              ))}
            </div>

            {/* Quote Body */}
            <div className="relative z-10 min-h-[110px] sm:min-h-[90px] flex items-center justify-center">
              <p className="text-lg sm:text-xl md:text-2xl italic text-slate-100 leading-relaxed max-w-3xl mx-auto font-light">
                "{t.quote}"
              </p>
            </div>

            {/* Author Details */}
            <div className="relative z-10 mt-6 space-y-1">
              <div className="font-bold text-white text-lg sm:text-xl">{t.author}</div>
              <div className="text-xs sm:text-sm font-medium text-cyan-400">{t.role}</div>
            </div>

            {/* Navigation Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 pt-6 border-t border-slate-800/80 relative z-10">
              <div className="flex items-center gap-2">
                {testimonials.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                      activeTestimonial === idx
                        ? 'w-8 bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_#06B6D4]'
                        : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-3">
                {/* Public review button commented out - admin managed */}
                {/* <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
                >
                  <Star className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
                  <span>Leave a Review</span>
                </button> */}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevTestimonial}
                    className="p-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-white hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextTestimonial}
                    className="p-2.5 rounded-xl border border-slate-700 bg-slate-800/80 text-white hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg hover:shadow-blue-600/20 transition-all cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ──── BOTTOM WORKFLOW CTA BANNER ──── */}
      <CtaBanner onOpenModal={() => setIsQuoteModalOpen(true)} />

      {/* ──── QUICK QUOTE POPUP MODAL ──── */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* WriteReviewModal commented out - admin managed */}
      {/* <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      /> */}

    </main>
  );
};

export default AboutPage;
