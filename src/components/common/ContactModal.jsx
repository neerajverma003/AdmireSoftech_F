import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  X,
  Send,
  Loader2,
  CheckCircle2,
  Mail,
  User,
  Phone,
  Layers,
  IndianRupee,
  MessageSquare,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { submitContactForm } from '../../api/contactApi';
import { getEstimatorConfig, DEFAULT_ESTIMATOR_CONFIG } from '../../api/estimatorConfigApi';
import Toast from './Toast';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/images/as_logo_icon.png';

const ContactModal = ({
  isOpen,
  onClose,
  defaultService = 'DevOps & Cloud Automation',
  title = "Let's Build Something Amazing",
  subtitle = 'Share your project vision or technical requirements with our engineering leaders.',
}) => {
  const { user } = useAuth();

  const [config, setConfig] = useState(DEFAULT_ESTIMATOR_CONFIG);
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [budget, setBudget] = useState('₹1.5L - ₹5L');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Sync with user details when modal opens or user logs in
  useEffect(() => {
    if (user && isOpen) {
      if (!fullName) setFullName(user.name || '');
      if (!email) setEmail(user.email || '');
    }
  }, [user, isOpen]);

  // Load dynamic configuration
  useEffect(() => {
    let isMounted = true;
    async function loadConfig() {
      if (!isOpen) return;
      try {
        const liveConfig = await getEstimatorConfig();
        if (liveConfig && isMounted) {
          setConfig(liveConfig);
          const ranges = liveConfig.contactModalConfig?.budgetRanges || [];
          if (ranges.length > 0 && !ranges.includes(budget)) {
            setBudget(ranges[1] || ranges[0]);
          }
        }
      } catch (err) {
        console.warn('Error loading contact config:', err.message);
      }
    }
    loadConfig();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  if (!isOpen) return null;

  const currentServicesList =
    config.contactModalConfig?.servicesList?.length > 0
      ? config.contactModalConfig.servicesList
      : (config.services || []).filter((s) => s.isEnabled).map((s) => s.title);

  const currentBudgetRanges =
    config.contactModalConfig?.budgetRanges?.length > 0
      ? config.contactModalConfig.budgetRanges
      : DEFAULT_ESTIMATOR_CONFIG.contactModalConfig.budgetRanges;

  const modalTitle = config.contactModalConfig?.title || title;
  const modalSubtitle = config.contactModalConfig?.subtitle || subtitle;
  const modalBadge = config.contactModalConfig?.badge || 'Direct Architect Access';

  const validate = () => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!email.trim()) {
      errors.email = 'Business email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (config.fieldSettings?.requirePhone && !phone.trim()) {
      errors.phone = 'Phone number is required';
    }
    const minLen = config.fieldSettings?.minMessageLength || 10;
    if (!message.trim() || message.trim().length < minLen) {
      errors.message = `Please share a brief note about your requirements (${minLen}+ characters)`;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setIsSuccess(false);

    try {
      const result = await submitContactForm({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service,
        budget,
        message: message.trim(),
      });

      setLoading(false);
      setIsSuccess(true);
      setToastMessage(
        result.message || 'Thank you! Our solution architects will reach out within 24 hours.'
      );
      setToastType('success');

      setTimeout(() => {
        setIsSuccess(false);
        setFullName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setFormErrors({});
        onClose();
      }, 1600);
    } catch {
      setLoading(false);
      setToastMessage('Failed to submit message. Please try again.');
      setToastType('error');
    }
  };

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] font-poppins"
    >
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />

      {/* ──── ULTRA-SLEEK SEMI-TRANSPARENT FROSTED BACKDROP ──── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#030718]/45 backdrop-blur-[8px] transition-opacity duration-300"
        onClick={() => !loading && onClose()}
      />

      {/* ──── GLASSMORPHIC MODAL CARD ──── */}
      <motion.div
        data-lenis-prevent
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-xl my-auto rounded-3xl border border-cyan-500/25 bg-[#080E24]/85 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(6,182,212,0.12)] z-10 text-slate-100 no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] overflow-hidden"
      >
        {/* Ambient Top & Bottom Glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-cyan-500/15 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-56 h-56 bg-blue-600/15 blur-3xl rounded-full" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer disabled:opacity-50"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-5 text-left pr-8 flex items-start gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950/80 to-slate-900/90 border border-cyan-500/30 p-2.5 shadow-lg shadow-cyan-500/15">
            <img
              src={logoImg}
              alt="Admire Softech"
              className="h-full w-auto object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
            />
          </div>

          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-300 shadow-sm">
              <span>{modalBadge}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {modalTitle}
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              {modalSubtitle}
            </p>

            <div className="flex items-center gap-3 pt-0.5 text-[11px] font-mono text-cyan-400/90">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>Avg response: &lt; 2 hours</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Zero-commitment consultation</span>
              </span>
            </div>
          </div>
        </div>

        {/* Success State View */}
        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white">Inquiry Received!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out. A Senior Solutions Architect will review your technical requirements and respond within 24 hours.
            </p>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            {/* Name & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full Name <span className="text-cyan-400">*</span></span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                  }}
                  placeholder="e.g. Michael Scott"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    formErrors.fullName
                      ? 'border-red-500 bg-red-950/20 focus:border-red-400'
                      : 'border-slate-700/80 bg-slate-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                />
                {formErrors.fullName && (
                  <span className="text-[11px] text-red-400 mt-1 block">{formErrors.fullName}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Business Email <span className="text-cyan-400">*</span></span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  placeholder="name@company.com"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    formErrors.email
                      ? 'border-red-500 bg-red-950/20 focus:border-red-400'
                      : 'border-slate-700/80 bg-slate-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                />
                {formErrors.email && (
                  <span className="text-[11px] text-red-400 mt-1 block">{formErrors.email}</span>
                )}
              </div>
            </div>

            {/* Phone & Service Interest */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Phone / WhatsApp {config.fieldSettings?.requirePhone ? '*' : '(Optional)'}</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                  }}
                  placeholder="+91 98765 43210"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all ${
                    formErrors.phone
                      ? 'border-red-500 bg-red-950/20 focus:border-red-400'
                      : 'border-slate-700/80 bg-slate-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  }`}
                />
                {formErrors.phone && (
                  <span className="text-[11px] text-red-400 mt-1 block">{formErrors.phone}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Primary Service Domain</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer"
                >
                  {currentServicesList.map((s) => (
                    <option key={s} value={s} className="bg-slate-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimated Budget Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
                <span>Estimated Investment Bracket (INR)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {currentBudgetRanges.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                      budget === b
                        ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold shadow-md shadow-blue-600/30 border border-cyan-400/50 scale-[1.02]'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Project Requirements / Technical Scope <span className="text-cyan-400">*</span></span>
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                }}
                placeholder="Briefly describe your goals, current bottlenecks, tech stack preferences, or target delivery timeline..."
                className={`w-full rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all resize-none no-scrollbar ${
                  formErrors.message
                    ? 'border-red-500 bg-red-950/20 focus:border-red-400'
                    : 'border-slate-700/80 bg-slate-900/60 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                }`}
              />
              {formErrors.message && (
                <span className="text-[11px] text-red-400 mt-1 block">{formErrors.message}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center justify-between border-t border-slate-800/80">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl border border-slate-700/80 text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-7 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-75 uppercase tracking-wider"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
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
};

export default ContactModal;
