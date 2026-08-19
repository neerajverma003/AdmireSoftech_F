import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { getJobPositions, submitJobApplication } from '../../api/careersApi';
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
  Paperclip,
} from 'lucide-react';
import Toast from '../../components/common/Toast';

const CareerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeJob, setActiveJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
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
    setLoading(true);
    try {
      const data = await getJobPositions(selectedDepartment);
      setJobs(data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedDepartment]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

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

    // Size limit: 10MB
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
    if (!email || !fullName) return;

    setSubmitting(true);
    setIsSuccess(false);
    try {
      const res = await submitJobApplication({
        jobId: activeJob?.id,
        jobTitle: activeJob?.title,
        fullName,
        email,
        phone,
        portfolioUrl,
        coverNote,
        resumeFile,
        resumeFileName,
      });

      setSubmitting(false);
      setIsSuccess(true);
      setToastMessage(res.message);
      setToastType('success');

      setTimeout(() => {
        setActiveJob(null);
        // Reset form
        setFullName('');
        setEmail('');
        setPhone('');
        setPortfolioUrl('');
        setCoverNote('');
        setResumeFile(null);
        setResumeFileName('');
        setIsSuccess(false);
      }, 1500);
    } catch {
      setSubmitting(false);
      setToastMessage('Error submitting application. Please try again.');
      setToastType('error');
    }
  };

  return (
    <main className="relative min-h-screen w-full max-w-full overflow-hidden bg-[#070C1E] text-slate-100 font-poppins pt-28 pb-20">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />

      {/* Header */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Join Admire Softech</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
          Build the Future of{' '}
          <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            Enterprise Software
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base text-slate-300 sm:text-lg leading-relaxed">
          Work on cutting-edge AI engines, multi-cloud platforms, and global SaaS products with a world-class team of remote-first engineers.
        </p>

        {/* Department Filters */}
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDepartment(dept)}
              className={`rounded-full px-5 py-2 text-xs font-medium transition-all cursor-pointer ${
                selectedDepartment === dept
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/30 font-semibold'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </section>

      {/* Job Positions List */}
      <section className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center text-slate-400">
            No open positions found for this department currently.
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/70 p-6 sm:p-7 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/95 hover:shadow-xl hover:shadow-blue-500/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-blue-600/20 text-cyan-400 border border-blue-600/30 px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
                      {job.department}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-500" />
                      {job.location}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-slate-500" />
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {job.title}
                  </h3>
                  <p className="text-xs text-slate-300 sm:text-sm max-w-2xl leading-relaxed mb-4">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-400 font-medium">
                    <div>Exp: <span className="text-slate-200">{job.experience}</span></div>
                    <div>Compensation: <span className="text-emerald-400 font-semibold">{job.salary}</span></div>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => setActiveJob(job)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:opacity-95 transition-all cursor-pointer"
                  >
                    <span>Apply Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Application Drawer / Modal */}
      {activeJob &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-scrollbar">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
              onClick={() => setActiveJob(null)}
            />
            <div className="relative w-full max-w-2xl my-auto rounded-3xl border border-slate-700/80 bg-slate-900/95 p-5 sm:p-7 shadow-2xl z-10 overflow-y-auto max-h-[96vh] no-scrollbar">
              <button
                onClick={() => setActiveJob(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Application</span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mt-0.5">{activeJob.title}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{activeJob.department} · {activeJob.location}</p>
              </div>

              <form onSubmit={handleApplySubmit} className="space-y-3 sm:space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
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
                      placeholder="john@example.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
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

                {/* ──── RESUME / CV UPLOAD OPTION ──── */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center justify-between">
                    <span>Resume / CV (PDF, DOC, DOCX)</span>
                    <span className="text-[11px] text-slate-500 font-mono">Max 10MB</span>
                  </label>

                  {/* Hidden actual file input for backend connectivity */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    className="hidden"
                  />

                  {resumeFile ? (
                    /* Selected File View */
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
                            {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB · Ready to submit
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
                    /* Dropzone / Upload Trigger Box */
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`flex flex-col sm:flex-row items-center justify-center gap-2.5 p-3.5 rounded-xl border border-dashed transition-all cursor-pointer text-center sm:text-left ${
                        isDragging
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300'
                          : 'border-slate-700 bg-slate-950/60 hover:border-cyan-500/50 hover:bg-slate-900/80 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <div className="p-2 rounded-lg bg-slate-800 text-cyan-400 shrink-0">
                        <UploadCloud className="w-4 h-4" />
                      </div>
                      <div className="text-xs">
                        <span className="font-semibold text-cyan-400 underline underline-offset-2">Click to browse</span>
                        <span className="text-slate-400"> or drag and drop your resume file</span>
                      </div>
                    </div>
                  )}

                  {resumeError && (
                    <div className="text-[11px] text-red-400 mt-1 font-medium">{resumeError}</div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Cover Note / Key Highlights</label>
                  <textarea
                    rows={2}
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    placeholder="Tell us about your relevant projects and why you'd be a great fit..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none no-scrollbar"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveJob(null)}
                    className="px-5 py-3 rounded-xl border border-slate-700 text-xs font-medium text-slate-300 hover:bg-white/5 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || isSuccess}
                    className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white shadow-lg transition-all duration-300 cursor-pointer ${
                      isSuccess
                        ? 'bg-emerald-600 shadow-emerald-500/30 scale-[1.02]'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-blue-600/30 hover:opacity-95 active:scale-[0.98]'
                    } disabled:opacity-80`}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-cyan-200" />
                        <span>Submitting...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-200 animate-bounce" />
                        <span>Application Sent!</span>
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
