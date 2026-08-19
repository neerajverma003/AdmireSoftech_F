import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AdmireLogo from '../../assets/images/AdmireSoftech_logo.png';
import { megaNavData } from '../../data/megaNavData';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';
import QuickQuoteModal from '../common/QuickQuoteModal';
import ContactModal from '../common/ContactModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const timeoutRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll listener for sticky navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  // Instant hover trigger on mouse enter
  const handleMouseEnter = (menuId) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuId);
  };

  // Grace period on mouse leave
  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  // Link navigation and anchor click handler
  const handleNavClick = (e, item) => {
    setActiveMenu(null);
    setMobileOpen(false);

    if (item.actionType === 'modal' || item.href === '#estimator') {
      e?.preventDefault();
      setIsQuoteModalOpen(true);
      return;
    }

    const href = item.href || '/';

    // Handle hash anchors on home page vs other pages
    if (href.startsWith('/#') || href.startsWith('#')) {
      const hash = href.replace('/#', '').replace('#', '');
      if (location.pathname === '/') {
        e?.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${hash}`);
        }
      } else {
        navigate(`/#${hash}`);
      }
    } else {
      navigate(href);
    }
  };

  const isDropdownOpen = !!activeMenu;
  const activeMenuData = megaNavData.find((item) => item.id === activeMenu);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#070C1E] shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* ──── BRAND LOGO  */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, { href: '/' })}
            className="shrink-0 flex items-center no-underline group"
          >
            <img
              src={AdmireLogo}
              alt="Admire Softech Logo"
              className="h-14 sm:h-16 lg:h-[50px] w-auto object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
            />
          </Link>

          {/* ──── DESKTOP NAVIGATION CONTAINER (PERSISTENT METEOROPS DROPDOWN) ──── */}
          <div
            className="relative hidden lg:flex items-center"
            onMouseLeave={handleMouseLeave}
          >
            {/* Nav links */}
            <nav className="flex items-center gap-7 xl:gap-8">
              {megaNavData.map((item) => {
                const isOpen = activeMenu === item.id;
                const isCurrentPage =
                  (item.href === '/services' && location.pathname === '/services') ||
                  (item.href === '/' && location.pathname === '/' && !location.hash);

                return (
                  <div
                    key={item.id}
                    className="py-1.5"
                    onMouseEnter={() => (item.hasDropdown ? handleMouseEnter(item.id) : setActiveMenu(null))}
                  >
                    {/* Clean text link without box background */}
                    <button
                      type="button"
                      onClick={(e) => handleNavClick(e, item)}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                        isOpen || isCurrentPage
                          ? 'text-white'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      {item.hasDropdown && (
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-150 ${
                            isOpen ? 'rotate-180 text-white' : 'text-slate-400'
                          }`}
                        />
                      )}
                    </button>
                  </div>
                );
              })}
            </nav>

            {/* ──── FIXED-ORIGIN PERSISTENT DROPDOWN CARD (Instant & Smooth) ──── */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.99 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  onMouseEnter={() => handleMouseEnter(activeMenu)}
                  onMouseLeave={handleMouseLeave}
                  className="absolute top-[calc(100%+4px)] left-0 z-50 pointer-events-auto w-[470px] before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
                >
                  <div className="rounded-2xl border border-slate-800/90 bg-[#101423]/98 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
                    
                    {/* Inner content cross-fades smoothly without unmounting the outer card */}
                    <motion.div
                      key={activeMenu}
                      initial={{ opacity: 0.85 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.1 }}
                      className="grid grid-cols-2 gap-6 items-start"
                    >
                      
                      {/* LEFT COLUMN: Main categories with Subtitles */}
                      {activeMenuData?.leftCol && (
                        <div className="space-y-3 pr-2 border-r border-slate-800/60">
                          <div className="text-[11px] font-medium tracking-normal text-slate-400">
                            {activeMenuData.leftCol.title}
                          </div>
                          <div className="space-y-2">
                            {activeMenuData.leftCol.items.map((subItem) => {
                              const Icon = subItem.icon;
                              return (
                                <button
                                  key={subItem.title}
                                  type="button"
                                  onClick={(e) => handleNavClick(e, subItem)}
                                  className="w-full group text-left flex items-start gap-2.5 py-1 px-1 rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
                                >
                                  {Icon && (
                                    <Icon className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0 mt-0.5" />
                                  )}
                                  <div className="min-w-0 flex-1">
                                    <div className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors">
                                      {subItem.title}
                                    </div>
                                    {subItem.subtitle && (
                                      <p className="text-[11px] text-slate-400 group-hover:text-slate-300 leading-tight mt-0.5">
                                        {subItem.subtitle}
                                      </p>
                                    )}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* RIGHT COLUMN: Stacked Sub-Sections (Strictly Top-Aligned) */}
                      {activeMenuData?.rightCol && (
                        <div className="space-y-4">
                          
                          {/* Section 1 */}
                          {activeMenuData.rightCol.section1 && (
                            <div className="space-y-2">
                              <div className="text-[11px] font-medium tracking-normal text-slate-400">
                                {activeMenuData.rightCol.section1.title}
                              </div>
                              <div className="space-y-1">
                                {activeMenuData.rightCol.section1.items.map((subItem) => {
                                  const Icon = subItem.icon;
                                  return (
                                    <button
                                      key={subItem.title}
                                      type="button"
                                      onClick={(e) => handleNavClick(e, subItem)}
                                      className="w-full group text-left flex items-center gap-2 py-1 px-1 rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
                                    >
                                      {Icon && (
                                        <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                                      )}
                                      <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                                        {subItem.title}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Section 2 */}
                          {activeMenuData.rightCol.section2 && (
                            <div className="space-y-2 pt-1 border-t border-slate-800/40">
                              <div className="text-[11px] font-medium tracking-normal text-slate-400">
                                {activeMenuData.rightCol.section2.title}
                              </div>
                              <div className="space-y-1">
                                {activeMenuData.rightCol.section2.items.map((subItem) => {
                                  const Icon = subItem.icon;
                                  return (
                                    <button
                                      key={subItem.title}
                                      type="button"
                                      onClick={(e) => handleNavClick(e, subItem)}
                                      className="w-full group text-left flex items-center gap-2 py-1 px-1 rounded-lg hover:bg-slate-800/40 transition-colors cursor-pointer"
                                    >
                                      {Icon && (
                                        <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                                      )}
                                      <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                                        {subItem.title}
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                        </div>
                      )}

                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ──── RIGHT ACTIONS: BRAND GRADIENT CTA ──── */}
          <div className="flex items-center gap-3">
            {/* Talk to an engineer button with Project Cyan/Blue Gradient */}
            <button
              type="button"
              onClick={() => setIsQuoteModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Talk to an engineer</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* Quick Contact Icon Button */}
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="hidden md:inline-flex items-center justify-center p-2 rounded-xl border border-slate-700/70 hover:border-cyan-500/50 bg-slate-900/60 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer"
              title="Get In Touch / Contact Our Team"
            >
              <PhoneCall className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white border border-slate-700 bg-slate-900/60 cursor-pointer transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ──── MOBILE ACCORDION DRAWER ──── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden bg-[#06091A]/98 backdrop-blur-2xl border-t border-blue-900/30 max-h-[85vh] overflow-y-auto px-5 py-6 space-y-4"
            >
              {megaNavData.map((section) => {
                const isExpanded = mobileExpanded === section.id;
                return (
                  <div key={section.id} className="border-b border-slate-800/80 pb-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        if (section.hasDropdown) {
                          setMobileExpanded(isExpanded ? null : section.id);
                        } else {
                          handleNavClick(e, section);
                        }
                      }}
                      className="flex items-center justify-between w-full py-2 text-left font-semibold text-slate-200 hover:text-white cursor-pointer"
                    >
                      <span className="text-sm">{section.label}</span>
                      {section.hasDropdown && (
                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180 text-cyan-400' : ''
                          }`}
                        />
                      )}
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-2 pt-2 space-y-3"
                        >
                          {/* Left Col items in mobile */}
                          {section.leftCol && (
                            <div className="space-y-1.5">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {section.leftCol.title}
                              </div>
                              {section.leftCol.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <button
                                    key={item.title}
                                    type="button"
                                    onClick={(e) => handleNavClick(e, item)}
                                    className="w-full flex items-start gap-2.5 p-1.5 rounded-lg text-left hover:bg-slate-800/60 cursor-pointer"
                                  >
                                    {Icon && <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />}
                                    <div>
                                      <div className="text-xs font-semibold text-slate-200">{item.title}</div>
                                      {item.subtitle && (
                                        <div className="text-[11px] text-slate-400">{item.subtitle}</div>
                                      )}
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Right Col section 1 */}
                          {section.rightCol?.section1 && (
                            <div className="space-y-1.5 pt-1">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {section.rightCol.section1.title}
                              </div>
                              {section.rightCol.section1.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <button
                                    key={item.title}
                                    type="button"
                                    onClick={(e) => handleNavClick(e, item)}
                                    className="w-full flex items-center gap-2 p-1.5 rounded-lg text-left hover:bg-slate-800/60 cursor-pointer"
                                  >
                                    {Icon && <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                                    <span className="text-xs text-slate-300">{item.title}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {/* Right Col section 2 */}
                          {section.rightCol?.section2 && (
                            <div className="space-y-1.5 pt-1">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                {section.rightCol.section2.title}
                              </div>
                              {section.rightCol.section2.items.map((item) => {
                                const Icon = item.icon;
                                return (
                                  <button
                                    key={item.title}
                                    type="button"
                                    onClick={(e) => handleNavClick(e, item)}
                                    className="w-full flex items-center gap-2 p-1.5 rounded-lg text-left hover:bg-slate-800/60 cursor-pointer"
                                  >
                                    {Icon && <Icon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                                    <span className="text-xs text-slate-300">{item.title}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Mobile CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setIsQuoteModalOpen(true);
                  }}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm text-center shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Talk to an engineer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ──── QUICK QUOTE MODAL ──── */}
      <QuickQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      {/* ──── GET IN TOUCH / CONTACT MODAL ──── */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
