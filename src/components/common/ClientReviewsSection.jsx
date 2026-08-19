import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, X, CheckCircle2, MessageSquarePlus } from 'lucide-react';
import { initialReviewsData } from '../../data/reviewsData';

const LOCAL_STORAGE_KEY = 'admire_client_reviews_v1';

const ReviewCard = ({ rev }) => (
  <div className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl border border-slate-800/90 bg-[#0A1024]/90 p-5 sm:p-6 transition-all duration-300 hover:border-cyan-400/50 hover:bg-[#0D1636] hover:shadow-xl hover:shadow-cyan-500/10 text-left flex flex-col justify-between select-none">
    <div className="space-y-3">
      {/* 5 Stars */}
      <div className="flex items-center gap-1 text-amber-400">
        {[...Array(rev.rating || 5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light line-clamp-4">
        "{rev.quote}"
      </p>
    </div>

    {/* Author Row */}
    <div className="flex items-center gap-3 pt-4 mt-3 border-t border-slate-800/80">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-800/90 border border-slate-700 text-cyan-300 text-xs font-mono font-bold">
        {rev.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs sm:text-sm font-bold text-white truncate">
          {rev.author}
        </div>
        <div className="text-[11px] text-slate-400 truncate font-mono">
          {rev.role}, <span className="text-slate-300">{rev.company}</span>
        </div>
      </div>
    </div>
  </div>
);

const ClientReviewsSection = () => {
  // Load reviews from localStorage or initial dataset
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return initialReviewsData;
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    author: '',
    role: '',
    company: '',
    rating: 5,
    quote: '',
  });

  const [formErrors, setFormErrors] = useState({});

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const getInitials = (name) => {
    if (!name) return 'AS';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const errors = {};
    if (!formData.author.trim()) errors.author = 'Name is required';
    if (!formData.role.trim()) errors.role = 'Role is required';
    if (!formData.company.trim()) errors.company = 'Company is required';
    if (!formData.quote.trim() || formData.quote.trim().length < 15) {
      errors.quote = 'Please share a brief testimonial (15+ chars)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      rating: Number(formData.rating) || 5,
      quote: formData.quote.trim(),
      author: formData.author.trim(),
      role: formData.role.trim(),
      company: formData.company.trim(),
      initials: getInitials(formData.author),
      source: 'Verified Review',
      date: 'Just now',
    };

    setReviews((prev) => [newReview, ...prev]);
    setSubmittedSuccess(true);

    setTimeout(() => {
      setSubmittedSuccess(false);
      setIsAddModalOpen(false);
      setFormData({
        author: '',
        role: '',
        company: '',
        rating: 5,
        quote: '',
      });
    }, 1800);
  };

  // Split into 2 rows and duplicate for infinite continuous running animation
  const { row1List, row2List } = useMemo(() => {
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
          
          {/* Eyebrow badge matching brand cyan/blue palette */}
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
            Founders and engineering leaders at high-growth startups and enterprises, on what it is like to have a senior Admire Softech engineer on the team.
          </p>

          {/* Rating Summary & Add Review Trigger */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 shadow-sm">
              <div className="flex items-center text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-white">4.9/5</span>
              <span className="text-slate-400 font-mono text-[11px]">
                on Clutch & G2, across {reviews.length}+ verified reviews
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-blue-600/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>
      </div>

      {/* ──── 2-LINE RUNNING MARQUEE (LINE 1 LEFT, LINE 2 RIGHT) ──── */}
      <div className="relative w-full space-y-4 sm:space-y-5 overflow-hidden">
        
        {/* Left & Right Edge Gradient Fades for Smooth Seamless Entrance/Exit */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#070C1E] via-[#070C1E]/80 to-transparent z-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#070C1E] via-[#070C1E]/80 to-transparent z-20" />

        {/* ── LINE 1: Runs LEFT ── */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-left flex gap-4 sm:gap-5">
            {row1List.map((rev, index) => (
              <ReviewCard key={`row1-${rev.id}-${index}`} rev={rev} />
            ))}
          </div>
        </div>

        {/* ── LINE 2: Runs RIGHT ── */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-right flex gap-4 sm:gap-5">
            {row2List.map((rev, index) => (
              <ReviewCard key={`row2-${rev.id}-${index}`} rev={rev} />
            ))}
          </div>
        </div>

      </div>

      {/* ──── 'ADD A REVIEW' MODAL ──── */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => !submittedSuccess && setIsAddModalOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl border border-slate-700/80 bg-[#09112A] p-6 sm:p-8 shadow-2xl z-10 text-slate-100 font-poppins"
            >
              <div className="pointer-events-none absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/20 blur-3xl rounded-full" />

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {submittedSuccess ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Thank you for your review!</h3>
                  <p className="text-sm text-slate-300 max-w-sm mx-auto">
                    Your testimonial is now live in the running reviews stream.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div className="space-y-1 text-left">
                    <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-cyan-400">
                      <MessageSquarePlus className="w-3.5 h-3.5" />
                      <span>Client Experience Feedback</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Share Your Review</h3>
                    <p className="text-xs text-slate-400">
                      Tell us about your experience working with Admire Softech engineers.
                    </p>
                  </div>

                  {/* Rating Selector */}
                  <div className="text-left space-y-1.5 pt-2">
                    <label className="text-xs font-semibold text-slate-300">Your Rating</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= formData.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-600 fill-transparent'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono text-slate-400 ml-2">
                        {formData.rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  {/* Author Name */}
                  <div className="text-left space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                    <input
                      type="text"
                      name="author"
                      value={formData.author}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                    {formErrors.author && (
                      <div className="text-[11px] text-red-400">{formErrors.author}</div>
                    )}
                  </div>

                  {/* Role & Company Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Your Role / Title *</label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        placeholder="e.g. CTO / VP Engineering"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      {formErrors.role && (
                        <div className="text-[11px] text-red-400">{formErrors.role}</div>
                      )}
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Company Name *</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="e.g. CloudScale AI"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      {formErrors.company && (
                        <div className="text-[11px] text-red-400">{formErrors.company}</div>
                      )}
                    </div>
                  </div>

                  {/* Review Textarea */}
                  <div className="text-left space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Your Review / Testimonial *</label>
                    <textarea
                      name="quote"
                      rows={3}
                      value={formData.quote}
                      onChange={handleInputChange}
                      placeholder="Share details on engineering speed, technical leadership, or project outcomes..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    />
                    {formErrors.quote && (
                      <div className="text-[11px] text-red-400">{formErrors.quote}</div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsAddModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      Post Review Live
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ClientReviewsSection;
