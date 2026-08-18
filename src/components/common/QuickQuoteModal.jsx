import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Check, ArrowRight, Calculator, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

const QuickQuoteModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('Web & SaaS Development');
  const [scope, setScope] = useState('MVP / Initial Release');
  const [timeline, setTimeline] = useState('1 - 2 Months');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setIsSuccess(false);

    // Simulate fast response / submission
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        onClose();
        // Reset form
        setStep(1);
        setEmail('');
        setName('');
        setNotes('');
        setIsSuccess(false);
      }, 1600);
    }, 800);
  };

  const serviceOptions = [
    'Web & SaaS Development',
    'AI & Machine Learning',
    'DevOps & Cloud Automation',
    'Mobile App Development',
    'Cybersecurity & Audit',
  ];

  const scopeOptions = [
    { title: 'MVP / Initial Release', est: '$5k - $12k' },
    { title: 'Full Enterprise System', est: '$15k - $35k' },
    { title: 'Legacy Modernization & Cloud', est: '$10k - $25k' },
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
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-gradient-to-r from-blue-600 to-cyan-400' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div className="space-y-6">
            <h4 className="text-base font-semibold text-white">What technology service do you need?</h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {serviceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setServiceType(opt)}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm font-medium transition-all cursor-pointer ${
                    serviceType === opt
                      ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-lg shadow-cyan-400/10'
                      : 'border-slate-800 bg-slate-800/40 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <span>{opt}</span>
                  {serviceType === opt && <Check className="h-4 w-4 text-cyan-400" />}
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Scope & Timeline */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h4 className="text-base font-semibold text-white mb-3">Select your target scope</h4>
              <div className="space-y-3">
                {scopeOptions.map((opt) => (
                  <button
                    key={opt.title}
                    type="button"
                    onClick={() => setScope(opt.title)}
                    className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm transition-all w-full cursor-pointer ${
                      scope === opt.title
                        ? 'border-cyan-400 bg-cyan-400/10 text-white shadow-lg shadow-cyan-400/10'
                        : 'border-slate-800 bg-slate-800/40 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">{opt.title}</div>
                      <div className="text-xs text-slate-400 mt-0.5">Estimated budget range: {opt.est}</div>
                    </div>
                    {scope === opt.title && <Check className="h-4 w-4 text-cyan-400" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-2.5">Preferred Target Timeline</h4>
              <div className="grid grid-cols-3 gap-2">
                {['< 1 Month', '1 - 2 Months', '3+ Months'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      timeline === t
                        ? 'border-cyan-400 bg-cyan-400/15 text-cyan-400'
                        : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:text-white'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 hover:opacity-95 transition-all cursor-pointer"
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
            <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-4 text-xs text-cyan-300 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-cyan-400 shrink-0" />
              <div>
                Selected: <span className="font-bold text-white">{serviceType}</span> ({scope}, {timeline})
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email</label>
                <input
                  type="email"
                  required
                  placeholder="john@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Notes (Optional)</label>
              <textarea
                rows={2}
                placeholder="Briefly describe your project requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2.5 text-sm font-semibold text-slate-400 hover:text-white cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading || isSuccess}
                className={`flex items-center gap-2 rounded-xl px-7 py-3 text-sm font-bold text-white shadow-lg transition-all duration-300 cursor-pointer ${
                  isSuccess
                    ? 'bg-emerald-600 shadow-emerald-500/30 scale-[1.02]'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-600/30 hover:opacity-95 active:scale-[0.98]'
                } disabled:opacity-80`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-200" />
                    <span>Calculating Scope...</span>
                  </>
                ) : isSuccess ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-200 animate-bounce" />
                    <span>Estimate Sent!</span>
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
