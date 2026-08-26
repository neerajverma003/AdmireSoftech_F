import { Link } from 'react-router-dom';
import AdmireLogo from '../../assets/images/AdmireSoftech_logo.png';
import { Mail, MapPin, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import UiverseSocialIcons from '../common/UiverseSocialIcons';

const Footer = () => {
  const { settings, socialLinks } = useSettings();

  return (
    <footer className="bg-[#040814] text-slate-400 border-t border-slate-800/70 pt-14 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/50">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center group">
              <img
                src={AdmireLogo}
                alt={settings?.companyName || "Admire Softech"}
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              {settings?.tagline || "Empowering global enterprises with innovative IT solutions, cloud architectures, and intelligent software engineering."}
            </p>
            
            {/* Dynamic Uiverse Liquid Fill Social Media Platform Channels */}
            <UiverseSocialIcons />
          </div>

          {/* Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Case Studies', href: '/case-studies' },
                { name: 'Solutions', href: '/solutions' },
                { name: 'Technologies', href: '/technologies' },
                { name: 'Industries', href: '/industries' },
                { name: 'FAQ', href: '/faq' },
                { name: 'Careers', href: '/careers' },
                { name: 'Contact', href: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-cyan-400 transition-colors">
                    {item.name}
                  </Link>
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
                  <Link to="/services" className="hover:text-cyan-400 transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact Information */}
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
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{settings?.headquarters || "Sector 62, Noida, NCR, India"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`mailto:${settings?.contactEmail || "contact@admiresoftech.com"}`} className="hover:text-cyan-400 transition-colors">
                  {settings?.contactEmail || "contact@admiresoftech.com"}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {settings?.companyName || "Admire Softech"}. All rights reserved.</p>
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
