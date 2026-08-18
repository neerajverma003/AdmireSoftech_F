import React from 'react';
import logoImg from '../../assets/images/AdmireSoftech_logo.png';
import { Mail, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#040814] text-slate-400 border-t border-slate-800/70 pt-14 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/50">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <img
              src={logoImg}
              alt="Admire Softech"
              className="h-12 w-auto object-contain filter brightness-110 drop-shadow-[0_2px_10px_rgba(6,182,212,0.4)]"
            />
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering global enterprises with innovative IT solutions, cloud architectures, and intelligent software engineering.
            </p>
            <div className="flex items-center gap-3">
              {/* Social SVG icons */}
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all" aria-label="Twitter">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all" aria-label="GitHub">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'Services', 'Solutions', 'Industries', 'About Us', 'Careers'].map(item => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '')}`} className="hover:text-cyan-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm">
              {['Cloud Services', 'Data & Analytics', 'Cyber Security', 'Digital Transformation', 'Managed IT Services', 'Product Engineering'].map(s => (
                <li key={s}>
                  <a href="#services" className="hover:text-cyan-400 transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Stay Connected</h4>
            <p className="text-xs text-slate-400">Subscribe for the latest tech insights.</p>
            <form onSubmit={e => e.preventDefault()} className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 pr-10 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
              />
              <button type="submit" className="absolute right-2 top-2 p-1.5 rounded-lg bg-blue-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" /><span>Global Innovation Hubs</span></div>
              <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" /><span>contact@admiresoftech.com</span></div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Admire Softech. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
