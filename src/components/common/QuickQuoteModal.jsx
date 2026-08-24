import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Check,
  ArrowRight,
  Calculator,
  Sparkles,
  Loader2,
  CheckCircle2,
  Lock,
  LogIn,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitQuoteRequest } from '../../api/quotesApi';

const QuickQuoteModal = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('Web & SaaS Development');
  const [scope, setScope] = useState('MVP / Initial Release');
  const [timeline, setTimeline] = useState('1 - 2 Months');
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Sync user details if authentication status updates
  useEffect(() => {
    if (user) {
      if (!name) setName(user.name || '');
      if (!email) setEmail(user.email || '');
    }
  }, [user]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const scopeOptions = [
    { title: 'MVP / Initial Release', est: '₹50k - ₹1.5 Lakhs' },
    { title: 'Full Enterprise System', est: '₹2.5 Lakhs - ₹7.5 Lakhs' },
    { title: 'Legacy Modernization & Cloud', est: '₹1.5 Lakhs - ₹4 Lakhs' },
  ];

  const currentScopeObj = scopeOptions.find((s) => s.title === scope) || scopeOptions[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Require authentication
    if (!isAuthenticated) {
      openAuthModal('signup');
      return;
    }

    if (!email) {
      setErrorMessage('Email address is required.');
      return;
    }

    setLoading(true);
    setIsSuccess(false);

    try {
      await submitQuoteRequest({
        name: name || user?.name,
        email: email || user?.email,
        phone,
        serviceType,
        scope,
        projectScope: scope,
        timeline,
        estimatedBudget: currentScopeObj?.est || '₹1.5 Lakhs - ₹4 Lakhs',
        notes,
      });

      setLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        // Reset form
        setStep(1);
        setNotes('');
        setIsSuccess(false);
      }, 1800);
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'Failed to submit quote request. Please try again.');
    }
  };

  const serviceOptions = [
    'Web & SaaS Development',
    'AI & Machine Learning',
    'DevOps & Cloud Automation',
    'Mobile App Development',
    'Cybersecurity & Audit',
  ];

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl my-auto rounded-3xl border border-slate-700/80 bg-slate-900/95 p-5 sm:p-7 shadow-2xl z-10 overflow-hidden font-poppins text-slate-100 max-h-[96vh] overflow-y-auto">
        {/* Glow background */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/15 text-cyan-400 border border-blue-600/30 shadow-md shadow-blue-600/20">
              <Calculator className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Instant Project Estimator</h3>
              <p className="text-xs text-slate-400">Step {step} of 3 — Build your custom scope estimate</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                step >= i ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-200">What service are you looking for?</h4>
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {serviceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setServiceType(opt)}
                  className={`flex items-center justify-between rounded-2xl border p-3.5 text-left text-xs transition-all cursor-pointer ${
                    serviceType === opt
                      ? 'border-cyan-400 bg-cyan-400/10 font-bold text-cyan-300 shadow-md shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-800/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  <span>{opt}</span>
                  {serviceType === opt && <Check className="h-4 w-4 text-cyan-400" />}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-3">
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Scope & Timeline */}
        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-200">Select Project Scope & Budget Tier</h4>
            <div className="space-y-2.5">
              {scopeOptions.map((s) => (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => setScope(s.title)}
                  className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                    scope === s.title
                      ? 'border-cyan-400 bg-cyan-400/10 shadow-md shadow-cyan-500/10'
                      : 'border-slate-800 bg-slate-800/40 hover:border-slate-700 hover:bg-slate-800/80'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-white">{s.title}</div>
                    <div className="text-[11px] text-slate-400">Estimated budget bracket</div>
                  </div>
                  <div className="rounded-lg bg-slate-800/90 px-3 py-1 text-xs font-bold text-cyan-400 border border-cyan-500/20">
                    {s.est}
                  </div>
                </button>
              ))}
            </div>

            <h4 className="text-sm font-semibold text-slate-200 pt-2">Desired Timeline</h4>
            <div className="grid grid-cols-3 gap-2.5">
              {['1 - 2 Months', '3 - 6 Months', '6+ Months'].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTimeline(t)}
                  className={`rounded-xl border p-2.5 text-center text-xs font-medium transition-all cursor-pointer ${
                    timeline === t
                      ? 'border-cyan-400 bg-cyan-400/10 font-bold text-cyan-300'
                      : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>Final Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact Info & Submit */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-3.5 text-xs text-cyan-300 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-cyan-400 shrink-0" />
                <div>
                  <span className="font-bold text-white">{serviceType}</span> • {scope} ({timeline})
                </div>
              </div>
              <span className="font-bold text-cyan-200 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
                {currentScopeObj.est}
              </span>
            </div>

            {/* Authentication Status Gate for Unauthenticated Users */}
            {!isAuthenticated && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Lock className="w-4 h-4" />
                  <span>Account Required to Submit Project Quote</span>
                </div>
                <p className="text-[11px] text-amber-200/80">
                  Please sign in or create a quick account so we can link your custom proposal and project scope to your dashboard.
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

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number (Optional)</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="Briefly describe your project requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || isSuccess}
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all duration-300 cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-600 shadow-emerald-500/30 scale-[1.02]'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-600/30 hover:opacity-95 active:scale-[0.98]'
                } disabled:opacity-80 uppercase tracking-wider`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-200" />
                    <span>Submitting Scope...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-200 animate-bounce" />
                    <span>Estimate Received!</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Get Estimate</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default QuickQuoteModal;
