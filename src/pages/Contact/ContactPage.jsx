import React, { useState } from 'react';
import SEO from '../../components/SEO';
import { submitContactForm } from '../../api/contactApi';
import {
  Send,
  Loader2,
  CheckCircle2,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
} from 'lucide-react';
import Toast from '../../components/common/Toast';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const ContactPage = () => {
  const { user, isAuthenticated } = useAuth();
  const { settings, socialLinks } = useSettings();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync with user details if login state changes
  React.useEffect(() => {
    if (user) {
      if (!name) setName(user.name || '');
      if (!email) setEmail(user.email || '');
    }
  }, [user]);

  // Toast State
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const subjectOptions = [
    "I'd like to learn about your services",
    "Let's explore a partnership",
    "I'd like to discuss work opportunities",
    'Request a custom scope proposal',
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setToastMessage('Please fill in all required fields.');
      setToastType('error');
      return;
    }

    setLoading(true);
    setIsSuccess(false);

    try {
      const result = await submitContactForm({
        fullName: name,
        email,
        phone,
        company,
        subject: subject || 'General Inquiry',
        message,
      });

      setLoading(false);
      setIsSuccess(true);
      setToastMessage(result.message);
      setToastType('success');

      // Clear Form
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setSubject('');
      setMessage('');

      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch {
      setLoading(false);
      setToastMessage('Failed to submit message. Please try again.');
      setToastType('error');
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Start Your Project with Admire Softech"
        description="Get in touch with Admire Softech for custom software development, cloud consulting, or free project estimation."
        canonical="https://admiresoftech.com/contact"
      />

      <main className="min-h-screen bg-[#070C1E] text-slate-100 font-poppins pt-32 pb-24 relative overflow-hidden flex items-center justify-center">
      <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />

      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-cyan-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* ──── LEFT COLUMN (Info & Follow Us) ──── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Mono tag */}
            <div className="flex items-center gap-3 text-[11px] font-mono tracking-widest text-slate-400 uppercase">
              <span>Get in touch with us.</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              Contact <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Us</span>
            </h1>

            {/* Contact Details Cards */}
            <div className="space-y-3 pt-2">
              <div className="rounded-2xl border border-slate-800/90 bg-slate-900/60 p-4 space-y-3 shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Headquarters</div>
                    <div className="text-slate-400 text-[11px]">{settings?.headquarters || "Sector 62, Noida, NCR, India"}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Direct Inquiries</div>
                    <a href={`mailto:${settings?.contactEmail || "contact@admiresoftech.com"}`} className="text-cyan-400 hover:underline text-[11px]">
                      {settings?.contactEmail || "contact@admiresoftech.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Phone / WhatsApp</div>
                    <div className="text-slate-400 text-[11px]">{settings?.contactPhone || "+91 (120) 456-7890"}</div>
                  </div>
                </div>

                {settings?.workingHours && (
                  <div className="flex items-center gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">Working Hours</div>
                      <div className="text-slate-400 text-[11px]">{settings.workingHours}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Social Follow Links */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-semibold text-slate-400">Connect with our community</div>
              <div className="flex flex-wrap items-center gap-2.5">
                {/* LinkedIn */}
                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </a>
                )}

                {/* Twitter / X */}
                {socialLinks?.twitter && (
                  <a
                    href={socialLinks.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                    aria-label="Twitter / X"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}

                {/* GitHub */}
                {socialLinks?.github && (
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                    aria-label="GitHub"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                    </svg>
                  </a>
                )}

                {/* YouTube */}
                {socialLinks?.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/50 hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                    aria-label="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}

                {/* Instagram */}
                {socialLinks?.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-400 hover:text-pink-400 hover:border-pink-500/50 hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                    aria-label="Instagram"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                )}

                {/* Facebook */}
                {socialLinks?.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl border border-slate-800 bg-slate-900/80 flex items-center justify-center text-slate-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.7 5H18V0h-3.808C10.592 0 9 1.592 9 4.615V8z"/></svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ──── RIGHT COLUMN (MeteorOps Form Card) ──── */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-xl overflow-hidden">
              
              {/* Form Card Header */}
              <div className="px-7 sm:px-8 pt-7 pb-4 border-b border-slate-800/60 bg-slate-900/40">
                <div className="text-[10px] font-mono tracking-widest uppercase text-slate-400 font-semibold mb-0.5">
                  MESSAGE
                </div>
                <h2 className="text-lg font-bold text-white">Send us a note</h2>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-7 sm:p-8 space-y-5">
                
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Phone</label>
                    <input
                      type="tel"
                      placeholder="Optional"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">Company</label>
                    <input
                      type="text"
                      placeholder="Company or team"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all"
                    />
                  </div>
                </div>

                {/* Row 3: Subject Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Subject <span className="text-cyan-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-3 text-sm text-white focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all cursor-pointer pr-10"
                    >
                      <option value="" disabled className="bg-slate-900 text-slate-400">
                        Select subject here...
                      </option>
                      {subjectOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Row 4: Message Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your project or inquiry..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950/70 px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all resize-none no-scrollbar"
                  />
                </div>

                {/* Form Footer Actions */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/60">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    * REQUIRED FIELDS
                  </div>

                  <button
                    type="submit"
                    disabled={loading || isSuccess}
                    className={`inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer shadow-lg ${
                      isSuccess
                        ? 'bg-emerald-600 text-white shadow-emerald-500/30 scale-[1.02]'
                        : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-blue-600/30 hover:scale-105 active:scale-95'
                    } disabled:opacity-80`}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-cyan-200" />
                        <span>Sending...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-emerald-200 animate-bounce" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <span>Send message</span>
                        <Send className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  </>
);
};

export default ContactPage;
