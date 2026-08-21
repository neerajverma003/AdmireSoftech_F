import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Star, Plus } from 'lucide-react';
import { competitiveEdgeMetrics } from '../../data/testimonialsData';
import { getActiveTestimonials } from '../../api/testimonialsApi';
import WriteReviewModal from './WriteReviewModal';

const WhyChooseUsTestimonials = ({ onOpenQuoteModal }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

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

    // Re-fetch every 30 seconds so admin changes reflect live
    const pollInterval = setInterval(fetchReviews, 30000);

    // Also re-fetch when user tabs back to the page
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

  const nextTestimonials = () => {
    if (testimonials.length <= 3) return;
    if (startIndex + 3 < testimonials.length) {
      setStartIndex((prev) => prev + 1);
    } else {
      setStartIndex(0);
    }
  };

  const prevTestimonials = () => {
    if (testimonials.length <= 3) return;
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    } else {
      setStartIndex(Math.max(0, testimonials.length - 3));
    }
  };

  const visibleTestimonials = testimonials.slice(startIndex, startIndex + 3);
  // In case there are fewer than 3 at the end, wrap around if there are items
  const displayItems =
    testimonials.length === 0
      ? []
      : visibleTestimonials.length < 3 && testimonials.length >= 3
      ? [...visibleTestimonials, ...testimonials.slice(0, 3 - visibleTestimonials.length)]
      : visibleTestimonials;

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

                {/* Subtle SVG Graph Curves matching reference */}
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

      {/* ──── SECTION 2: TESTIMONIALS (3 CARDS + ARROW NAVIGATION) ──── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase font-semibold">
              
              <span>What Our Clients Say</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Testimonials
            </h2>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Public review button commented out - admin managed */}
            {/* <button
              type="button"
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-2 text-xs font-semibold text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer shadow-sm"
            >
              <Star className="h-3.5 w-3.5 fill-cyan-400 text-cyan-400" />
              <span>Leave a Review</span>
            </button> */}

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevTestimonials}
                className="w-9 h-9 rounded-full border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                aria-label="Previous Testimonials"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={nextTestimonials}
                className="w-9 h-9 rounded-full border border-slate-800 bg-slate-900/80 hover:bg-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
                aria-label="Next Testimonials"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonials 3-Card Grid */}
        {displayItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
            <AnimatePresence mode="popLayout">
              {displayItems.map((item, idx) => (
                <motion.div
                  key={`${item.id || item._id}-${idx}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="group rounded-3xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-7 hover:border-cyan-500/40 hover:bg-slate-900/85 transition-all duration-300 flex flex-col justify-between shadow-xl backdrop-blur-sm"
                >
                  <div>
                    {/* Quote Icon */}
                    <span className="text-3xl sm:text-4xl font-serif text-slate-500 group-hover:text-cyan-400 transition-colors block mb-3 leading-none select-none">
                      “
                    </span>
                    
                    {/* Quote Text */}
                    <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                      {item.content || item.quote}
                    </p>
                  </div>

                  {/* Author Info with Avatar */}
                  <div className="pt-4 border-t border-slate-800/60 flex items-center gap-3">
                    {item.avatar && (
                      <img
                        src={item.avatar}
                        alt={item.author}
                        className="w-9 h-9 rounded-full object-cover border border-slate-700/80"
                        loading="lazy"
                      />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {item.author}
                      </h4>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mt-0.5">
                        {item.role}{item.company ? ` — ${item.company}` : ''}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-800/80 bg-slate-900/30 p-8 text-center text-slate-400 text-xs font-mono">
            No approved client testimonials published yet. Click "Leave a Review" above to share your feedback!
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

      {/* Write Review Modal commented out - admin managed */}
      {/* <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      /> */}

    </div>
  );
};

export default WhyChooseUsTestimonials;
