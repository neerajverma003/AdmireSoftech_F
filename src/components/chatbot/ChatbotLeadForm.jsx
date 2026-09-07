import React, { useState } from 'react';
import { Send, Loader2, User, Mail, Phone, FileText } from 'lucide-react';

export default function ChatbotLeadForm({ onSubmit, submitting, initialNotes = '' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: initialNotes,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    const name = formData.fullName.trim();
    let email = formData.email.trim();
    const phone = formData.phone.trim();

    if (!name) {
      errs.fullName = 'Please provide your full name';
    }

    // Auto-fix common academic & regional domain typos (e.g. .acin -> .ac.in)
    if (email.toLowerCase().endsWith('.acin')) {
      email = email.replace(/\.acin$/i, '.ac.in');
      setFormData((prev) => ({ ...prev, email }));
    } else if (email.toLowerCase().endsWith('.coin')) {
      email = email.replace(/\.coin$/i, '.co.in');
      setFormData((prev) => ({ ...prev, email }));
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      errs.email = 'Please provide your email address';
    } else if (!emailRegex.test(email)) {
      errs.email = 'Please enter a valid email address (e.g. name@example.com)';
    }

    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone) {
      errs.phone = 'Please provide your phone number';
    } else if (digitsOnly.length < 8 || digitsOnly.length > 15) {
      errs.phone = 'Please enter a valid phone number (8-15 digits)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let cleanEmail = formData.email.trim();
      if (cleanEmail.toLowerCase().endsWith('.acin')) {
        cleanEmail = cleanEmail.replace(/\.acin$/i, '.ac.in');
      } else if (cleanEmail.toLowerCase().endsWith('.coin')) {
        cleanEmail = cleanEmail.replace(/\.coin$/i, '.co.in');
      }

      onSubmit({
        fullName: formData.fullName.trim(),
        email: cleanEmail.toLowerCase(),
        phone: formData.phone.trim(),
        notes: (formData.notes || '').trim(),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-3 pt-2 bg-[#060D20] p-4 rounded-2xl border border-cyan-500/30 shadow-lg shadow-black/40 animate-in fade-in slide-in-from-bottom-2 duration-300"
    >
      <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
        <FileText className="w-3.5 h-3.5" />
        <span>Contact Information</span>
      </div>

      {/* Full Name */}
      <div className="space-y-1">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Full Name *"
            className={`w-full rounded-xl border bg-[#050A18] pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
              errors.fullName ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
        </div>
        {errors.fullName && <p className="text-[10px] text-rose-400 pl-1">{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div className="space-y-1">
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email Address *"
            className={`w-full rounded-xl border bg-[#050A18] pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
              errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
        </div>
        {errors.email && <p className="text-[10px] text-rose-400 pl-1">{errors.email}</p>}
      </div>

      {/* Phone */}
      <div className="space-y-1">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Phone Number *"
            className={`w-full rounded-xl border bg-[#050A18] pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none transition-all ${
              errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-cyan-500'
            }`}
          />
        </div>
        {errors.phone && <p className="text-[10px] text-rose-400 pl-1">{errors.phone}</p>}
      </div>

      {/* Additional Requirement Notes */}
      <div className="space-y-1">
        <textarea
          rows={2}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Specific requirements or extra details (optional)..."
          className="w-full rounded-xl border border-slate-800 bg-[#050A18] px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all leading-relaxed"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/30 cursor-pointer active:scale-95 transition-all disabled:opacity-50"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending Inquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Project Inquiry</span>
            <Send className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
