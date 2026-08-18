import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../../assets/images/AdmireSoftech_logo.png';
import { navLinks } from '../../data/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#06091A]/90 backdrop-blur-xl border-b border-blue-900/30 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src={logoImg}
            alt="Admire Softech"
            className="h-11 sm:h-13 w-auto object-contain drop-shadow-[0_2px_12px_rgba(6,182,212,0.5)] filter brightness-110"
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTA + Grid Icon */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
          >
            Contact Us
          </a>

          {/* 9-dot grid icon */}
          <button className="hidden sm:flex p-2 rounded-lg border border-slate-700/60 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-400 transition-all">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="3" cy="3" r="1.5" />
              <circle cx="10" cy="3" r="1.5" />
              <circle cx="17" cy="3" r="1.5" />
              <circle cx="3" cy="10" r="1.5" />
              <circle cx="10" cy="10" r="1.5" />
              <circle cx="17" cy="10" r="1.5" />
              <circle cx="3" cy="17" r="1.5" />
              <circle cx="10" cy="17" r="1.5" />
              <circle cx="17" cy="17" r="1.5" />
            </svg>
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white border border-slate-700"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#06091A]/98 backdrop-blur-2xl border-t border-blue-900/30 px-6 py-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                location.pathname === link.href ? 'text-cyan-400 bg-blue-900/30' : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMobileOpen(false)} className="mt-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold text-center">
            Contact Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
