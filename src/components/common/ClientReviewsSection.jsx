import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { getActiveTestimonials } from '../../api/testimonialsApi';
import WriteReviewModal from './WriteReviewModal';

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
              e.target.nextSibling.style.display = 'flex';
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

const ClientReviewsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchLiveReviews = async () => {
    try {
      localStorage.removeItem('admire_client_reviews_v1');
      const data = await getActiveTestimonials();
      if (Array.isArray(data)) {
        setReviews(data);
      }
    } catch (err) {
      console.warn('[ClientReviewsSection] Error fetching live reviews:', err.message);
    }
  };

  useEffect(() => {
    fetchLiveReviews();

    // Re-fetch every 30 seconds so admin changes (deletes/approvals) reflect live
    const pollInterval = setInterval(fetchLiveReviews, 30000);

    // Also re-fetch when user tabs back to the page
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchLiveReviews();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(pollInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Split into 2 rows and duplicate for infinite continuous running animation
  const { row1List, row2List } = useMemo(() => {
    if (reviews.length === 0) {
      return { row1List: [], row2List: [] };
    }
    const mid = Math.ceil(reviews.length / 2);
    const row1 = reviews.slice(0, mid);
    const row2 = reviews.slice(mid);

    // Duplicate 3x to ensure seamless continuous scroll
    return {
      row1List: [...row1, ...row1, ...row1, ...row1],
      row2List: [...row2, ...row2, ...row2, ...row2],
    };
  }, [reviews]);

  return (
    <section className="relative py-24 bg-[#070C1E] border-t border-slate-800/80 font-poppins overflow-hidden">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[150px] rounded-full" />
      <div className="pointer-events-none absolute -bottom-20 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[130px] rounded-full" />

      {/* ──── SECTION HEADER ──── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 shadow-sm shadow-cyan-400/20">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>In their words</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
            The teams we work with{' '}
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              keep us close.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto font-light">
            Founders and engineering leaders on what it is like to have a dedicated Admire Softech squad on their mission-critical systems.
          </p>

          {/* Rating Summary */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 shadow-sm">
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9/5</span>
              <span className="text-slate-400 font-mono text-[11px]">
                across {reviews.length}+ verified client reviews
              </span>
            </div>

            {/* Public review submission disabled: managed via Admin panel */}
            {/* <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button> */}
          </div>
        </div>
      </div>

      {/* ──── 2-LINE RUNNING MARQUEE (LINE 1 LEFT, LINE 2 RIGHT) ──── */}
      {reviews.length > 0 ? (
        <div className="relative w-full space-y-4 sm:space-y-5 overflow-hidden">
          {/* Edge Gradient Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#070C1E] via-[#070C1E]/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#070C1E] via-[#070C1E]/80 to-transparent z-20" />

          {/* ── LINE 1: Runs LEFT ── */}
          <div className="flex w-full overflow-hidden">
            <div className="animate-marquee-left flex gap-4 sm:gap-5">
              {row1List.map((rev, index) => (
                <ReviewCard key={`row1-${rev.id || rev._id}-${index}`} rev={rev} />
              ))}
            </div>
          </div>

          {/* ── LINE 2: Runs RIGHT ── */}
          <div className="flex w-full overflow-hidden">
            <div className="animate-marquee-right flex gap-4 sm:gap-5">
              {row2List.map((rev, index) => (
                <ReviewCard key={`row2-${rev.id || rev._id}-${index}`} rev={rev} />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Public WriteReviewModal commented out - admin managed */}
      {/* <WriteReviewModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          fetchLiveReviews();
        }}
      /> */}
    </section>
  );
};

export default ClientReviewsSection;
