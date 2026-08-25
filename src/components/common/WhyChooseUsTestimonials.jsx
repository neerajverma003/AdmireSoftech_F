import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, Star } from 'lucide-react';
import { competitiveEdgeMetrics } from '../../data/testimonialsData';
import { getActiveTestimonials } from '../../api/testimonialsApi';

const ReviewCard = ({ rev }) => {
  const getInitials = (name) => {
    if (!name) return 'AS';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-slate-800/90 bg-[#0A1024]/90 p-5 sm:p-6 transition-all duration-300 hover:border-cyan-400/50 hover:bg-[#0D1636] hover:shadow-xl hover:shadow-cyan-500/10 text-left flex flex-col justify-between select-none">
      <div className="space-y-3">
        {/* 5 Stars */}
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(rev.rating || 5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote / Content */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light line-clamp-4">
          "{rev.content || rev.quote}"
        </p>
      </div>

      {/* Author Row */}
      <div className="flex items-center gap-3 pt-4 mt-3 border-t border-slate-800/80">
        {rev.avatar ? (
          <img
            src={rev.avatar}
            alt={rev.author}
            className="h-9 w-9 shrink-0 rounded-full object-cover border border-slate-700"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className={`h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800/90 border border-slate-700 text-cyan-300 text-xs font-mono font-bold ${
            rev.avatar ? 'hidden' : 'flex'
          }`}
        >
          {getInitials(rev.author)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-xs sm:text-sm font-bold text-white truncate">
            {rev.author}
          </div>
          <div className="text-[11px] text-slate-400 truncate font-mono">
            {rev.role}{rev.company ? `, ${rev.company}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUsTestimonials = ({ onOpenQuoteModal }) => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchReviews = async () => {
      try {
        const data = await getActiveTestimonials();
        if (isMounted && Array.isArray(data)) {
          setTestimonials(data);
        }
      } catch (err) {
        console.warn('[WhyChooseUsTestimonials] Error fetching reviews from backend:', err.message);
      }
    };
    fetchReviews();

    // Re-fetch every 30 seconds so admin updates reflect live
    const pollInterval = setInterval(fetchReviews, 30000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchReviews();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Split into 2 rows and duplicate for infinite continuous running animation
  const { row1List, row2List } = useMemo(() => {
    if (testimonials.length === 0) {
      return { row1List: [], row2List: [] };
    }
    const mid = Math.ceil(testimonials.length / 2);
    const row1 = testimonials.slice(0, mid);
    const row2 = testimonials.slice(mid);

    return {
      row1List: [...row1, ...row1, ...row1, ...row1],
      row2List: [...row2, ...row2, ...row2, ...row2],
    };
  }, [testimonials]);

  return (
    <div className="w-full pt-16 pb-20 space-y-28">
      
      {/* ──── SECTION 1: WHY CHOOSE US (METRICS CARDS) ──── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Heading & Label */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              <span>Our Competitive Edge</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Why Choose Us
            </h2>
          </div>

          {/* Right Column: 4 Metric Cards with Sparklines */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {competitiveEdgeMetrics.map((item, idx) => (
              <div
                key={idx}
                className="group rounded-2xl border border-slate-800/90 bg-slate-900/60 p-4 sm:p-5 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-lg"
              >
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400 block mb-2">
                    {item.label}
                  </span>
                  <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                    {item.value}
                  </div>
                </div>

                {/* Subtle SVG Graph Curves */}
                <div className="pt-4 h-10 w-full flex items-end">
                  {item.graphType === 'upward' && (
                    <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 30" fill="none">
                      <path
                        d="M 0 25 Q 30 22 50 15 T 100 5"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                      <circle cx="100" cy="5" r="3" fill="#06b6d4" className="animate-pulse" />
                    </svg>
                  )}
                  {item.graphType === 'steep' && (
                    <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 30" fill="none">
                      <path
                        d="M 0 28 L 30 20 L 60 16 L 100 3"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                      <circle cx="100" cy="3" r="3" fill="#06b6d4" className="animate-pulse" />
                    </svg>
                  )}
                  {item.graphType === 'wave' && (
                    <svg className="w-full h-8 overflow-visible" viewBox="0 0 100 30" fill="none">
                      <path
                        d="M 0 20 Q 25 5 50 18 T 100 10"
                        stroke="#06b6d4"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                      <circle cx="100" cy="10" r="3" fill="#06b6d4" className="animate-pulse" />
                    </svg>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ──── SECTION 2: TESTIMONIALS (2-LINE RUNNING MARQUEE TICKER) ──── */}
      <section className="relative w-full overflow-hidden font-poppins">
        {/* Header with Rating Badge */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 shadow-sm shadow-cyan-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>What Our Clients Say</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Testimonials
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
            Founders and engineering leaders on what it is like to partner with Admire Softech.
          </p>

          {/* Rating Summary Pill */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 shadow-sm">
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9/5</span>
              <span className="text-slate-400 font-mono text-[11px]">
                across {testimonials.length}+ verified client reviews
              </span>
            </div>
          </div>
        </div>

        {/* 2-Line Continuous Running Marquee (Line 1 Left, Line 2 Right) */}
        {testimonials.length > 0 ? (
          <div className="relative w-full space-y-4 sm:space-y-5 overflow-hidden">
            {/* Edge Gradient Fades */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#070C1E] via-[#070C1E]/80 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#070C1E] via-[#070C1E]/80 to-transparent z-20" />

            {/* LINE 1: Runs Left */}
            <div className="flex w-full overflow-hidden">
              <div className="animate-marquee-left flex gap-4 sm:gap-5">
                {row1List.map((rev, index) => (
                  <ReviewCard key={`row1-${rev.id || rev._id}-${index}`} rev={rev} />
                ))}
              </div>
            </div>

            {/* LINE 2: Runs Right */}
            <div className="flex w-full overflow-hidden">
              <div className="animate-marquee-right flex gap-4 sm:gap-5">
                {row2List.map((rev, index) => (
                  <ReviewCard key={`row2-${rev.id || rev._id}-${index}`} rev={rev} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto rounded-3xl border border-slate-800/80 bg-slate-900/30 p-8 text-center text-slate-400 text-xs font-mono">
            No approved client testimonials published yet.
          </div>
        )}
      </section>

      {/* ──── SECTION 3: CALLOUT BANNER (METEOROPS STYLE) ──── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-blue-900/40 bg-gradient-to-b from-slate-900/90 via-slate-900/70 to-[#070C1E] p-8 sm:p-12 text-center shadow-2xl backdrop-blur-xl space-y-6">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-2xl mx-auto">
            Put a senior engineer on the{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
              production constraint
            </span>
            , not another meeting around it.
          </h3>

          <div>
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Talk to an engineer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default WhyChooseUsTestimonials;
