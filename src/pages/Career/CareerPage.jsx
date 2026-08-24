import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getJobPositions, submitJobApplication } from '../../api/careersApi';
import { uploadFileToS3 } from '../../api/uploadApi';
import { useAuth } from '../../context/AuthContext';
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  X,
  Send,
  Loader2,
  CheckCircle2,
  UploadCloud,
  FileText,
  Trash2,
  IndianRupee,
  Building,
} from 'lucide-react';
import Toast from '../../components/common/Toast';

const CareerPage = () => {
  const { user, isAuthenticated, openAuthModal } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeJob, setActiveJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [experience, setExperience] = useState('');
  const [currentCompany, setCurrentCompany] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState('');
  const [resumeError, setResumeError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  // Toast
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const departments = ['All', 'Engineering', 'Artificial Intelligence', 'Infrastructure', 'Design'];

  const fetchJobs = useCallback(async () => {
    try {
      const data = await getJobPositions(selectedDepartment);
      if (Array.isArray(data)) {
        setJobs(data);
      }
    } catch (err) {
      console.warn('[CareerPage] Error fetching jobs:', err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    fetchJobs();

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchJobs, 30000);

    // Re-fetch on tab focus
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        fetchJobs();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [fetchJobs]);

  const handleOpenApplyModal = (job) => {
    if (!isAuthenticated) {
      setToastMessage('Authentication required: Please sign in or create an account to apply for career positions.');
      setToastType('info');
      openAuthModal('signup');
      return;
    }

    setActiveJob(job);
    setFullName(user?.name || '');
    setEmail(user?.email || '');
    setPhone('');
    setExperience('');
    setCurrentCompany('');
    setPortfolioUrl('');
    setCoverNote('');
    setResumeFile(null);
    setResumeFileName('');
    setResumeError('');
    setIsSuccess(false);
    setUploadProgressText('');
  };

  const handleFileSelect = (file) => {
    if (!file) return;
    setResumeError('');

    // Valid types: PDF, DOC, DOCX
    const validExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (!validExtensions.includes(fileExtension)) {
      setResumeError('Please upload a PDF, DOC, or DOCX file.');
      return;
    }

    // Size limit: 15MB
    if (file.size > 15 * 1024 * 1024) {
      setResumeError('File size exceeds 15MB limit.');
      return;
    }

    setResumeFile(file);
    setResumeFileName(file.name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
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
    if (!isAuthenticated) {
      setToastMessage('Please sign in or create an account to apply.');
      setToastType('error');
      openAuthModal('signup');
      return;
    }

    if (!email?.trim() || !fullName?.trim() || !activeJob) return;

    setSubmitting(true);
    setIsSuccess(false);

    try {
      let uploadedResumeUrl = '';
      let uploadedResumeKey = '';

      // 1. Direct S3 Upload if resume attached
      if (resumeFile) {
        setUploadProgressText('Uploading Resume directly to S3 bucket...');
        const s3Result = await uploadFileToS3(resumeFile, {
          module: 'careers',
          category: activeJob.title || activeJob.department || 'General Position',
          experience: experience || activeJob.experience || 'Entry Level',
          email: email.trim(),
          candidateName: fullName.trim(),
        });
        uploadedResumeUrl = s3Result.publicUrl;
        uploadedResumeKey = s3Result.key;
      }

      setUploadProgressText('Submitting candidate application...');

      // 2. Submit application payload to backend
      const applicationPayload = {
        jobId: activeJob.id || activeJob._id,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        experience: experience.trim(),
        currentCompany: currentCompany.trim(),
        portfolioUrl: portfolioUrl.trim(),
        coverNote: coverNote.trim(),
        resumeUrl: uploadedResumeUrl,
        resumeFileName: resumeFileName,
        resumeKey: uploadedResumeKey,
      };

      const res = await submitJobApplication(activeJob.id || activeJob._id, applicationPayload);

      setIsSuccess(true);
      setToastMessage(res?.message || `Application submitted successfully for "${activeJob.title}"!`);
      setToastType('success');

      // Refresh list to update applicants count
      fetchJobs();

      setTimeout(() => {
        setActiveJob(null);
        setIsSuccess(false);
        setUploadProgressText('');
      }, 1800);
    } catch (err) {
      console.error('[CareerPage] Submit application failed:', err);
      setToastMessage(err.message || 'Failed to submit application. Please try again.');
      setToastType('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#070C1E] text-slate-100 font-poppins pt-28 pb-16">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />

      {/* Ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[130px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 right-0 w-[450px] h-[450px] bg-cyan-500/10 blur-[110px] rounded-full" />

      {/* ──── HERO SECTION ──── */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>JOIN OUR ENGINEERING TEAM</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Build The Future Of{' '}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Enterprise Cloud & AI
          </span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          Join an agile team of world-class engineers, designers, and AI specialists building high-impact platforms for global enterprises.
        </p>

        {/* Department Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                selectedDepartment === dept
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      {/* ──── JOB POSITIONS LIST ──── */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-slate-400">Loading career openings...</span>
          </div>
        ) : jobs.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-slate-800 bg-slate-900/40 p-8">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-200">No open positions found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              We don't have openings matching "{selectedDepartment}" right now. Check back soon or select "All" to view other departments.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id || job._id}
                className="group relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 hover:border-cyan-500/40 hover:bg-slate-900/90 transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-lg bg-blue-600/20 text-cyan-300 border border-blue-600/30 px-2.5 py-0.5 text-xs font-mono font-semibold">
                        {job.department}
                      </span>
                      <span className="rounded-lg bg-slate-800 text-slate-300 px-2.5 py-0.5 text-xs font-mono">
                        {job.type}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {job.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1 font-mono">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Clock className="h-3.5 w-3.5 text-cyan-400" />
                        <span>{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <IndianRupee className="h-3.5 w-3.5" />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center md:self-center">
                    <button
                      onClick={() => handleOpenApplyModal(job)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Key Responsibilities & Requirements Sections */}
                {((job.responsibilities && job.responsibilities.length > 0) || (job.requirements && job.requirements.length > 0)) && (
                  <div className="mt-5 pt-5 border-t border-slate-800/80 space-y-3.5">
                    {/* Responsibilities */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                          Key Responsibilities:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                          {job.responsibilities.map((resp, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{resp}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Requirements / Skills */}
                    {job.requirements && job.requirements.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 font-mono">
                          Skills & Requirements:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {job.requirements.map((req, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800/80 text-cyan-200 border border-slate-700/60 font-medium"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ──── APPLICATION MODAL (PORTAL) ──── */}
      {activeJob &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div
              onClick={() => setActiveJob(null)}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-2xl rounded-3xl border border-slate-700/80 bg-[#0B132B] p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 z-10 my-auto text-left">
              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveJob(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                    Full-Time Career Application
                  </span>
                  <span className="rounded-md bg-blue-600/20 text-cyan-300 border border-blue-600/30 px-2 py-0.5 text-[10px] font-mono">
                    {activeJob.department}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">{activeJob.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1 font-mono">
                  <span>{activeJob.location}</span>
                  <span>•</span>
                  <span>{activeJob.type}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">{activeJob.salary}</span>
                </div>
              </div>

              {/* Form */}
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
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Years of Experience</label>
                    <input
                      type="text"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      placeholder="e.g. 4.5 Years"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Current Company / Position</label>
                    <input
                      type="text"
                      value={currentCompany}
                      onChange={(e) => setCurrentCompany(e.target.value)}
                      placeholder="TechCorp / Senior Developer"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Portfolio / GitHub / LinkedIn</label>
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* ──── DIRECT AWS S3 RESUME UPLOAD ──── */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                    <span>Resume / CV (PDF, DOC, DOCX)</span>
                    <span className="text-[11px] text-cyan-400 font-mono"></span>
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
                            {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB · Ready for direct S3 upload
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
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3.5 rounded-xl border border-dashed text-slate-400 hover:text-slate-300 transition-all cursor-pointer text-center sm:text-left ${
                        isDragging
                          ? 'border-cyan-400 bg-cyan-950/40'
                          : 'border-slate-700 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900/80'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-cyan-400 underline underline-offset-2">Click to attach resume</span>
                        <span className="text-slate-400"> (PDF, DOCX up to 15MB)</span>
                      </div>
                    </div>
                  )}

                  {resumeError && (
                    <div className="text-[11px] text-red-400 mt-1 font-medium">{resumeError}</div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Brief Cover Note / Highlights</label>
                  <textarea
                    rows={2}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Tell us why you're a great fit for this role..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none no-scrollbar"
                  />
                </div>

                {uploadProgressText && (
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
                    <span>{uploadProgressText}</span>
                  </div>
                )}

                <div className="pt-3 flex justify-end gap-3 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => setActiveJob(null)}
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
                        <span>Submitting Application...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-200 animate-bounce" />
                        <span>Application Received!</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Application</span>
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

export default CareerPage;
