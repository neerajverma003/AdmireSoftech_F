import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  ArrowRight,
  Sparkles,
  X,
  Send,
  Loader2,
  CheckCircle2,
  Globe,
  Clock,
  DollarSign,
  Layers,
  ShieldCheck,
  Zap,
  UploadCloud,
  FileText,
  Trash2,
} from 'lucide-react';
import { freelanceProjectsData } from '../../data/freelanceData';
import Toast from '../../components/common/Toast';
import TrustedBrands from '../Home/TrustedBrands';

const FreelancePage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [availability, setAvailability] = useState('20-40 hrs/week');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [experienceNote, setExperienceNote] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = React.useRef(null);

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleFileSelect = (file) => {
    if (!file) return;
    setResumeError('');
    const validExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setResumeError('Please upload a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setResumeError('File size exceeds 10MB limit.');
      return;
    }

    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setResumeFileName('');
    setResumeError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!email || !fullName) return;

    setSubmitting(true);
    setIsSuccess(false);

    // Simulate fast submission
    setTimeout(() => {
      setSubmitting(false);
      setIsSuccess(true);
      setToastMessage(
        `Application submitted successfully for ${selectedProject?.title || 'the freelance project'}! Our team will reach out within 24 hours.`
      );
      setToastType('success');

      setTimeout(() => {
        setSelectedProject(null);
        // Reset form
        setFullName('');
        setEmail('');
        setPhone('');
        setHourlyRate('');
        setPortfolioUrl('');
        setExperienceNote('');
        setResumeFile(null);
        setResumeFileName('');
        setIsSuccess(false);
      }, 1600);
    }, 800);
  };

  const handleScrollToProjects = () => {
    const el = document.getElementById('freelance-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#070C1E] text-slate-100 font-poppins pt-28 pb-16">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />

      {/* Ambient background glow elements */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 left-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[100px] rounded-full" />

      {/* ──── HERO SECTION (2-COLUMN METEOROPS LAYOUT) ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* LEFT COLUMN: Open Positions List */}
          <div id="freelance-list" className="lg:col-span-6 space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-slate-400 font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>THERE ARE CURRENTLY {freelanceProjectsData.length} OPEN POSITIONS.</span>
            </div>

            <div className="space-y-3">
              {freelanceProjectsData.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 sm:p-5 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-200 shadow-md flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                    {/* Number Badge */}
                    <div className="w-8 h-8 rounded-lg bg-slate-800/70 border border-slate-700/60 flex items-center justify-center text-xs font-mono font-bold text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 shrink-0 transition-colors">
                      {project.num}
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-wider mt-0.5">
                        <span>{project.type}</span>
                        <span className="text-slate-600">•</span>
                        <span className="text-cyan-400 font-semibold">{project.rate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="shrink-0 text-xs font-semibold text-slate-400 group-hover:text-cyan-400 hover:text-white transition-colors flex items-center gap-1 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-white/5"
                  >
                    <span>APPLY</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Big Title, Pitch & CTAs */}
          <div className="lg:col-span-6 lg:pl-4 space-y-6 lg:sticky lg:top-32">
            {/* Breadcrumb / Tag */}
            

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Freelance{' '}
              <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-light">
              Looking for your next challenge? At Admire Softech, we connect talented professionals with impactful freelance opportunities. Work remotely on cutting-edge projects, collaborating with some of the most innovative companies worldwide. 🚀
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleScrollToProjects}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold tracking-wide shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                Open Positions
              </button>

              <a
                href="/#about"
                className="px-6 py-3 rounded-full border border-slate-700 hover:border-cyan-500/50 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white text-sm font-semibold transition-all cursor-pointer"
              >
                Learn More
              </a>
            </div>

            {/* Key Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/15 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">100% Remote First</div>
                  <div className="text-[11px] text-slate-400">Work from anywhere globally</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/15 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Competitive Rates</div>
                  <div className="text-[11px] text-slate-400">Weekly & bi-weekly payouts</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/15 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">High-Impact Tech</div>
                  <div className="text-[11px] text-slate-400">AI, Cloud & Next-gen SaaS</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/15 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Direct Client Access</div>
                  <div className="text-[11px] text-slate-400">Zero middleman bureaucracy</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ──── TRUSTED BRANDS RUNNING BANNER ──── */}
      <TrustedBrands />

      {/* ──── INTERACTIVE FREELANCE APPLICATION MODAL ──── */}
      {selectedProject &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-scrollbar">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-2xl my-auto rounded-3xl border border-slate-700/80 bg-slate-900/95 p-5 sm:p-7 shadow-2xl z-10 overflow-y-auto max-h-[96vh] no-scrollbar">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    Freelance Contract Application
                  </span>
                  <span className="rounded-md bg-blue-600/20 text-cyan-300 border border-blue-600/30 px-2 py-0.5 text-[10px] font-mono">
                    {selectedProject.num}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedProject.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Rate: <strong className="text-emerald-400">{selectedProject.rate}</strong></span>
                  <span>•</span>
                  <span>Duration: {selectedProject.duration}</span>
                </div>
              </div>

              {/* Skills required */}
              {selectedProject.skills && (
                <div className="mb-5 flex flex-wrap gap-1.5">
                  {selectedProject.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-slate-800 bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {/* Application Form */}
              <form onSubmit={handleApplySubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Mercer"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Hourly Rate Expectation ($/hr)</label>
                    <input
                      type="text"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="e.g. $75/hr"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Availability (hrs/week)</label>
                    <select
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white focus:border-cyan-400 focus:outline-none"
                    >
                      <option value="10-20 hrs/week">10 - 20 hrs/week (Part-time)</option>
                      <option value="20-40 hrs/week">20 - 40 hrs/week (Full-time)</option>
                      <option value="40+ hrs/week">40+ hrs/week (Dedicated Sprint)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone / Telegram</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">GitHub / Portfolio / LinkedIn</label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* ──── RESUME / CV UPLOAD OPTION ──── */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                    <span>Resume / CV (PDF, DOC, DOCX)</span>
                    <span className="text-[11px] text-slate-500 font-mono">Max 10MB</span>
                  </label>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                  />

                  {resumeFile ? (
                    <div className="flex items-center justify-between p-3 rounded-xl border border-cyan-500/40 bg-cyan-950/30 text-slate-200">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white truncate max-w-xs sm:max-w-md">
                            {resumeFileName}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB · Attached
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={handleRemoveFile}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900/80 text-slate-400 hover:text-slate-300 transition-all cursor-pointer text-center sm:text-left"
                    >
                      <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-cyan-400 underline underline-offset-2">Click to browse</span>
                        <span className="text-slate-400"> or attach your resume / CV</span>
                      </div>
                    </div>
                  )}

                  {resumeError && (
                    <div className="text-[11px] text-red-400 mt-1 font-medium">{resumeError}</div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Highlights & Experience</label>
                  <textarea
                    rows={2}
                    value={experienceNote}
                    onChange={(e) => setExperienceNote(e.target.value)}
                    placeholder="Briefly describe your relevant tech stack and top projects..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none no-scrollbar"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:bg-white/5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || isSuccess}
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white shadow-lg transition-all duration-300 cursor-pointer ${
                      isSuccess
                        ? 'bg-emerald-600 shadow-emerald-500/30 scale-[1.02]'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-600/30 hover:opacity-95 active:scale-[0.98]'
                    } disabled:opacity-80`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-cyan-200" />
                        <span>Sending Proposal...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-200 animate-bounce" />
                        <span>Proposal Received!</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Apply For Project</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </main>
  );
};

export default FreelancePage;
