import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { Star, X, CheckCircle2, Sparkles, Send, Lock, LogIn, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitClientReview } from '../../api/testimonialsApi';

export default function WriteReviewModal({ isOpen, onClose, onSuccess }) {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [formData, setFormData] = useState({
    author: '',
    role: '',
    company: '',
    category: 'Cloud & DevOps',
    rating: 5,
    content: '',
  });

  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrorMsg('');
      setFormData({
        author: user?.name || '',
        role: '',
        company: '',
        category: 'Cloud & DevOps',
        rating: 5,
        content: '',
      });
    }
  }, [isOpen, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      openAuthModal('signup');
      return;
    }

    const authorName = (formData.author || user?.name || '').trim();
    if (!authorName || !formData.content.trim()) {
      setErrorMsg('Please enter your name and review feedback.');
      return;
    }

    try {
      setLoading(true);
      setErrorMsg('');
      await submitClientReview({
        author: authorName,
        role: formData.role.trim() || 'Client Partner',
        company: formData.company.trim() || 'Enterprise Client',
        category: formData.category,
        rating: formData.rating,
        content: formData.content.trim(),
      });
      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-scrollbar font-poppins">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-lg my-auto rounded-3xl border border-slate-700/80 bg-slate-900/95 p-6 sm:p-8 shadow-2xl z-10 text-slate-100 backdrop-blur-xl"
      >
        {/* Glow */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Review Submitted!</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-sm mx-auto">
              Thank you for your feedback! Your endorsement has been submitted to AdmireSoftech for moderation and will appear on the live website upon approval.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-400 mb-2">
                <Sparkles className="h-3 w-3" />
                <span>Client Endorsement</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Share Your Experience
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tell us about your project delivery and partnership with AdmireSoftech.
              </p>
            </div>

            {/* Authentication Gate Status */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
                <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Authenticated as: <strong className="text-white">{user.name}</strong> ({user.email})
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Lock className="w-4 h-4" />
                  <span>Account Required to Leave a Review</span>
                </div>
                <p className="text-[11px] text-amber-200/80">
                  Please sign in or create an account so we can verify your client identity before submitting.
                </p>
                <button
                  type="button"
                  onClick={() => openAuthModal('signup')}
                  className="mt-1 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 transition-colors cursor-pointer shadow-md"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In / Sign Up Now</span>
                </button>
              </div>
            )}

            {errorMsg && (
              <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-xs text-rose-300">
                {errorMsg}
              </div>
            )}

            {/* Rating Stars */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
                Your Rating
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => {
                  const isActive = (hoverRating || formData.rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1 text-slate-600 transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`h-6 w-6 transition-colors ${
                          isActive
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                            : 'text-slate-600 hover:text-slate-400'
                        }`}
                      />
                    </button>
                  );
                })}
                <span className="ml-2 text-xs font-semibold text-amber-400">
                  {formData.rating} of 5 Stars
                </span>
              </div>
            </div>

            {/* Name & Role Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Job Role / Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. VP Engineering / Founder"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Company & Category Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Stripe, FinScale Global"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                  Practice Area
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2.5 text-xs text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                >
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Full-Stack Development">Full-Stack Development</option>
                  <option value="Cybersecurity">Cybersecurity & Compliance</option>
                  <option value="Data Engineering">Data Engineering & Analytics</option>
                  <option value="UI/UX Design">UI/UX Design Systems</option>
                </select>
              </div>
            </div>

            {/* Feedback Message */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Your Review Message *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Describe the speed of delivery, quality of engineering, or results achieved..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/80 px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none leading-relaxed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>{isAuthenticated ? 'Submit Review' : 'Sign In to Submit'}</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>,
    document.body
  );
}
