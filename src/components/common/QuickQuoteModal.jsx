import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Check,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Loader2,
  CheckCircle2,
  Lock,
  LogIn,
  Code2,
  Cpu,
  Cloud,
  Smartphone,
  ShieldCheck,
  Layers,
  Globe,
  Database,
  User,
  Mail,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { submitQuoteRequest } from '../../api/quotesApi';
import { getEstimatorConfig, DEFAULT_ESTIMATOR_CONFIG } from '../../api/estimatorConfigApi';
import logoImg from '../../assets/images/as_logo_icon.png';

const ICON_MAP = {
  Code2,
  Cpu,
  Cloud,
  Smartphone,
  ShieldCheck,
  Layers,
  Globe,
  Database,
  Sparkles,
};

const QuickQuoteModal = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  // Dynamic configuration state
  const [config, setConfig] = useState(DEFAULT_ESTIMATOR_CONFIG);
  const [loadingConfig, setLoadingConfig] = useState(false);

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

  // Fetch live configuration on modal open
  useEffect(() => {
    let isMounted = true;
    async function loadLiveConfig() {
      if (!isOpen) return;
      try {
        setLoadingConfig(true);
        const liveConfig = await getEstimatorConfig();
        if (liveConfig && isMounted) {
          setConfig(liveConfig);

          // Initialize defaults from live config if not already set
          const activeServices = (liveConfig.services || []).filter((s) => s.isEnabled);
          if (activeServices.length > 0 && !activeServices.some((s) => s.title === serviceType)) {
            setServiceType(activeServices[0].title);
          }

          const activeScopes = (liveConfig.scopes || []).filter((s) => s.isEnabled);
          if (activeScopes.length > 0 && !activeScopes.some((s) => s.title === scope)) {
            setScope(activeScopes[0].title);
          }

          const activeTimelines = (liveConfig.timelines || []).filter((t) => t.isEnabled);
          if (activeTimelines.length > 0 && !activeTimelines.some((t) => t.label === timeline)) {
            setTimeline(activeTimelines[0].label);
          }
        }
      } catch (err) {
        console.warn('Using default estimator configuration:', err.message);
      } finally {
        if (isMounted) setLoadingConfig(false);
      }
    }

    loadLiveConfig();
    return () => {
      isMounted = false;
    };
  }, [isOpen]);

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

  const activeScopes = (config.scopes || []).filter((s) => s.isEnabled);
  const activeServices = (config.services || []).filter((s) => s.isEnabled);
  const activeTimelines = (config.timelines || []).filter((t) => t.isEnabled);

  const currentScopeObj =
    activeScopes.find((s) => s.title === scope) ||
    activeScopes[0] || { estPrice: '₹50k - ₹1.5 Lakhs' };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Check optional authentication requirement
    const requireAuth = config.fieldSettings?.requireAuthForQuote;
    if (requireAuth && !isAuthenticated) {
      openAuthModal('signup');
      return;
    }

    if (!email) {
      setErrorMessage('Work email address is required.');
      return;
    }

    if (config.fieldSettings?.requirePhone && !phone.trim()) {
      setErrorMessage('Phone number is required by settings.');
      return;
    }

    setLoading(true);
    setIsSuccess(false);

    try {
      await submitQuoteRequest({
        name: name || user?.name || 'Anonymous Inquiry',
        email: email || user?.email,
        phone,
        serviceType,
        scope,
        projectScope: scope,
        timeline,
        estimatedBudget: currentScopeObj?.estPrice || currentScopeObj?.est || '₹1.5 Lakhs - ₹4 Lakhs',
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

  return createPortal(
    <div
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] font-poppins"
    >
      {/* ──── ULTRA-SLEEK SEMI-TRANSPARENT FROSTED BACKDROP ──── */}
      <div
        className="fixed inset-0 bg-[#030718]/45 backdrop-blur-[8px] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* ──── GLASSMORPHIC MODAL CARD ──── */}
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl my-auto rounded-3xl border border-cyan-500/25 bg-[#080E24]/85 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_50px_rgba(6,182,212,0.12)] z-10 text-slate-100 max-h-[94vh] overflow-y-auto no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all"
      >
        {/* Ambient Corner Glows */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-600/15 blur-3xl" />

        {/* ──── MODAL HEADER ──── */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-950/80 to-slate-900/90 border border-cyan-500/30 p-2 shadow-lg shadow-cyan-500/15">
              <img
                src={logoImg}
                alt="Admire Softech"
                className="h-full w-auto object-contain filter drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              />
            </div>
            <div>
              {config.header?.badge && (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-300 mb-1">
                  <span>{config.header.badge}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {config.header?.title || 'Instant Project Estimator'}
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Step {step} of 3 —{' '}
                {step === 1
                  ? 'Select Service Domain'
                  : step === 2
                  ? 'Scope & Budget Bracket'
                  : 'Contact & Submission'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            aria-label="Close estimator modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* ──── GLOWING STEP PROGRESS BAR ──── */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          {[
            { num: 1, label: 'Service' },
            { num: 2, label: 'Scope' },
            { num: 3, label: 'Details' },
          ].map((item) => (
            <div key={item.num} className="space-y-1.5">
              <div
                className={`h-1.5 w-full rounded-full transition-all duration-500 ${
                  step >= item.num
                    ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                    : 'bg-slate-800/80'
                }`}
              />
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className={step >= item.num ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                  0{item.num}. {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ──── STEP 1: SELECT SERVICE ──── */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Select Your Engineering Domain</span>
              </h4>
              <p className="text-xs text-slate-400 font-light">
                Choose the primary technology stack or solution you need built or modernized.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {activeServices.map((opt) => {
                const IconComponent = ICON_MAP[opt.iconName] || Code2;
                const isSelected = serviceType === opt.title;
                return (
                  <button
                    key={opt.id || opt.title}
                    type="button"
                    onClick={() => setServiceType(opt.title)}
                    className={`group relative flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400/80 bg-gradient-to-br from-cyan-950/40 via-blue-950/30 to-[#0A1638] text-white shadow-xl shadow-cyan-500/10'
                        : 'border-slate-800/80 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-900/70'
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                        isSelected
                          ? 'border-cyan-400/50 bg-cyan-400/20 text-cyan-300 shadow-md shadow-cyan-400/20'
                          : 'border-slate-700/80 bg-slate-800/60 text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center justify-between">
                        <span>{opt.title}</span>
                        {isSelected && <Check className="h-4 w-4 text-cyan-400 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <span className="text-xs text-slate-400 font-mono">
                Selected: <strong className="text-cyan-300">{serviceType}</strong>
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>Continue to Scope</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ──── STEP 2: SCOPE & TIMELINE ──── */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Select Scope & Estimated Budget</h4>
              <p className="text-xs text-slate-400 font-light">
                Tiered engineering packages tailored to your product maturity.
              </p>
            </div>

            <div className="space-y-2.5">
              {activeScopes.map((s) => {
                const isSelected = scope === s.title;
                return (
                  <button
                    key={s.id || s.title}
                    type="button"
                    onClick={() => setScope(s.title)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition-all duration-300 cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400/80 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-[#0A1638] shadow-lg shadow-cyan-500/10'
                        : 'border-slate-800/80 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                        <span>{s.title}</span>
                        {s.badge && (
                          <span className="rounded-full bg-cyan-400/15 border border-cyan-400/30 px-2 py-0.2 text-[10px] font-mono text-cyan-300">
                            {s.badge}
                          </span>
                        )}
                        {isSelected && <Check className="h-3.5 w-3.5 text-cyan-400" />}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{s.subtitle}</div>
                    </div>
                    <div className="rounded-xl bg-slate-900/90 px-3.5 py-1.5 text-xs font-mono font-bold text-cyan-300 border border-cyan-500/30 shadow-sm shrink-0 ml-2">
                      {s.estPrice || s.est}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-200">Desired Target Timeline</label>
              <div className="grid grid-cols-3 gap-2.5">
                {activeTimelines.map((t) => {
                  const isSelected = timeline === t.label;
                  return (
                    <button
                      key={t.id || t.label}
                      type="button"
                      onClick={() => setTimeline(t.label)}
                      className={`rounded-2xl border p-3 text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-500/15 font-bold text-cyan-300 shadow-md shadow-cyan-500/15'
                          : 'border-slate-800 bg-slate-900/40 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-xs font-bold">{t.label}</div>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5 font-normal">{t.note}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
              >
                <span>Final Step</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ──── STEP 3: CONTACT INFO & SUBMIT ──── */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-300">
            {/* Live Scope Summary Banner */}
            <div className="rounded-2xl border border-cyan-400/30 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-[#0A1638] p-3.5 text-xs text-cyan-300 flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-5 w-5 text-cyan-400 shrink-0 animate-pulse" />
                <div>
                  <span className="font-bold text-white">{serviceType}</span>
                  <span className="text-slate-400 font-mono text-[11px] block sm:inline sm:ml-2">
                    • {scope} ({timeline})
                  </span>
                </div>
              </div>
              <span className="font-mono font-bold text-cyan-200 bg-cyan-950/70 px-3 py-1 rounded-lg border border-cyan-400/30 text-xs shadow-inner">
                {currentScopeObj.estPrice || currentScopeObj.est}
              </span>
            </div>

            {/* Authentication Gate if configured */}
            {config.fieldSettings?.requireAuthForQuote && !isAuthenticated && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <Lock className="w-4 h-4" />
                  <span>Account Required to Submit Project Quote</span>
                </div>
                <p className="text-[11px] text-amber-200/80 leading-relaxed">
                  Please sign in or create a quick account so we can link your custom proposal, scope breakdown, and dedicated engineer chat to your dashboard.
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

            {/* Form Input Fields */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Your Full Name *</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Work Email *</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Phone / WhatsApp {config.fieldSettings?.requirePhone ? '*' : '(Optional)'}</span>
              </label>
              <input
                type="tel"
                required={config.fieldSettings?.requirePhone}
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Project Notes / Specific Requirements</span>
              </label>
              <textarea
                rows={2}
                placeholder="Briefly describe your project requirements, current bottlenecks, or desired integrations..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/60 px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none transition-colors"
              />
            </div>

            {/* Form Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                disabled={loading || isSuccess}
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all duration-300 cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-600 shadow-emerald-500/30 scale-[1.02]'
                    : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 shadow-blue-600/30 hover:opacity-95 active:scale-[0.98]'
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
