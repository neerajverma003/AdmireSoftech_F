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
import UiverseSocialIcons from '../../components/common/UiverseSocialIcons';

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
        title="Contact Us"
        description="Contact Admire Softech for web development, cloud, AI, software development and digital transformation solutions. Get in touch with our team today."
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
              <UiverseSocialIcons />
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
