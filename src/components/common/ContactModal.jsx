import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Loader2,
  Sparkles,
  CheckCircle2,
  Mail,
  User,
  Phone,
  Layers,
  DollarSign,
  MessageSquare,
} from 'lucide-react';
import { submitContactForm } from '../../api/contactApi';
import Toast from './Toast';

const servicesList = [
  'DevOps & Cloud Automation',
  'AI & Machine Learning',
  'Full-Stack Web & SaaS',
  'Mobile App Development',
  'Cybersecurity & Audit',
  'Dedicated IT Staffing',
  'General IT Consultation',
];

const budgetRanges = [
  '< $5k',
  '$5k - $15k',
  '$15k - $35k',
  '$35k - $75k',
  '$75k+',
];

const ContactModal = ({
  isOpen,
  onClose,
  defaultService = 'DevOps & Cloud Automation',
  title = "Let's Build Something Amazing",
  subtitle = 'Share your project vision or technical requirements with our engineering leaders.',
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [budget, setBudget] = useState('$15k - $35k');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  if (!isOpen) return null;

  const validate = () => {
    const errors = {};
    if (!fullName.trim()) errors.fullName = 'Full name is required';
    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
    if (!message.trim() || message.trim().length < 10) {
      errors.message = 'Please share a brief note about your requirements (10+ characters)';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-scrollbar font-poppins">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => !loading && onClose()}
      />

      {/* Modal Dialog Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative w-full max-w-xl my-auto rounded-3xl border border-slate-700/80 bg-[#09112A] p-5 sm:p-6 shadow-2xl z-10 text-slate-100 no-scrollbar overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-56 h-56 bg-cyan-500/15 blur-3xl rounded-full" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-56 h-56 bg-blue-600/15 blur-3xl rounded-full" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-4 space-y-1 text-left pr-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-0.5 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Get In Touch · Admire Softech</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-300 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Success State View */}
        {isSuccess ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h3 className="text-2xl font-bold text-white">Message Received!</h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out. A Senior Solutions Architect will analyze your requirements and get back to you within 24 hours.
            </p>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            {/* Name & Email Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Full Name *</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                  }}
                  placeholder="e.g. Michael Scott"
                  className={`w-full rounded-xl border px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    formErrors.fullName
                      ? 'border-red-500 bg-red-950/20'
                      : 'border-slate-700 bg-slate-950/80 focus:border-cyan-400'
                  }`}
                />
                {formErrors.fullName && (
                  <span className="text-[11px] text-red-400 mt-0.5 block">{formErrors.fullName}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Business Email *</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                  }}
                  placeholder="name@company.com"
                  className={`w-full rounded-xl border px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    formErrors.email
                      ? 'border-red-500 bg-red-950/20'
                      : 'border-slate-700 bg-slate-950/80 focus:border-cyan-400'
                  }`}
                />
                {formErrors.email && (
                  <span className="text-[11px] text-red-400 mt-0.5 block">{formErrors.email}</span>
                )}
              </div>
            </div>

            {/* Phone & Service Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Phone / WhatsApp (Optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Service Interest</span>
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2 text-xs sm:text-sm text-white focus:border-cyan-400 focus:outline-none cursor-pointer"
                >
                  {servicesList.map((s) => (
                    <option key={s} value={s} className="bg-slate-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Estimated Budget Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                <span>Estimated Budget Range</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {budgetRanges.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      budget === b
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-md shadow-blue-600/30 border border-transparent'
                        : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Project Description / Message *</span>
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                }}
                placeholder="Tell us about your project vision, timeline, tech stack, or engineering challenges..."
                className={`w-full rounded-xl border px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none no-scrollbar ${
                  formErrors.message
                    ? 'border-red-500 bg-red-950/20'
                    : 'border-slate-700 bg-slate-950/80 focus:border-cyan-400'
                }`}
              />
              {formErrors.message && (
                <span className="text-[11px] text-red-400 mt-0.5 block">{formErrors.message}</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800/80">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-5 py-2 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:bg-white/5 transition-colors cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-2 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-200" />
                    <span>Sending Inquiry...</span>
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
