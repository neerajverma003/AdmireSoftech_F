import React, { useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';

export default function WhatsAppWidget() {
  const { settings } = useSettings();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Clean WhatsApp number dynamically (ensures valid country code digits)
  const cleanNumber = useMemo(() => {
    const rawNumber = (
      settings?.whatsappNumber ||
      settings?.contactPhone ||
      '+91 98765 43210'
    ).toString();

    let digits = rawNumber.replace(/\D/g, '');

    // Default to Indian country code (91) if 10 digits provided
    if (digits.length === 10) {
      digits = `91${digits}`;
    } else if (digits.length === 11 && digits.startsWith('0')) {
      digits = `91${digits.slice(1)}`;
    }

    return digits || '919876543210';
  }, [settings?.whatsappNumber, settings?.contactPhone]);

  // Context-aware dynamic pre-filled message
  const dynamicMessage = useMemo(() => {
    const company = settings?.companyName || 'Admire Softech';

    // 1. If admin explicitly configured a custom WhatsApp prefill text in settings
    if (settings?.whatsappPrefillText && settings.whatsappPrefillText.trim()) {
      return settings.whatsappPrefillText.replace(/\{companyName\}/gi, company);
    }

    // 2. Otherwise intelligently tailor to current page route
    const path = (location?.pathname || '').toLowerCase();
    if (path.includes('career')) {
      return `Hello ${company}, I am interested in exploring career opportunities with your team!`;
    }
    if (path.includes('freelance')) {
      return `Hello ${company}, I would like to discuss freelance project collaboration!`;
    }
    if (path.includes('contact')) {
      return `Hello ${company}, I would like to connect with your technical team for a consultation!`;
    }
    if (path.includes('case-stud') || path.includes('portfolio')) {
      return `Hello ${company}, I reviewed your case studies and would like to discuss an enterprise project!`;
    }
    if (path.includes('about')) {
      return `Hello ${company}, I would like to learn more about your software services and solutions!`;
    }
    if (path.includes('faq')) {
      return `Hello ${company}, I have a few questions regarding your IT & Cloud services!`;
    }

    // Default fallback
    return `Hello ${company}, I am interested in discussing an IT project!`;
  }, [settings?.companyName, settings?.whatsappPrefillText, location?.pathname]);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(dynamicMessage)}`;
  }, [cleanNumber, dynamicMessage]);

  // Clean click handler: eliminates screen flashing, parent window blur re-renders, and scroll jumps
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      // Immediately hide tooltip to avoid flicker on window blur/tab switch
      setIsHovered(false);
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 400);

      try {
        const newWin = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
          // Fallback if popup blocker intercepts window.open
          window.location.href = whatsappUrl;
        }
      } catch {
        window.location.href = whatsappUrl;
      }
    },
    [whatsappUrl]
  );

  return (
    <div className="fixed bottom-6 left-4 sm:left-6 z-50 flex items-center select-none">
      {/* Floating Action WhatsApp Button (Left-most Anchor) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group w-14 h-14 rounded-full flex items-center justify-center bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-950/50 hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-110 active:scale-95 cursor-pointer select-none ${
          isClicked ? 'scale-90 ring-4 ring-emerald-400/40' : ''
        }`}
      >
        {/* Soft Ambient Beacon Ring (gentle glow without jarring strobe pulse) */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 blur-sm pointer-events-none transition-opacity duration-300 group-hover:opacity-75" />
        <span
          className="absolute -inset-0.5 rounded-full bg-[#25D366]/30 pointer-events-none animate-ping opacity-30"
          style={{ animationDuration: '3s' }}
        />

        {/* WhatsApp Official SVG Icon */}
        <svg
          className="relative w-8 h-8 fill-current drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.777.979-.953 1.18-.175.2-.351.225-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.175-.301-.019-.464.131-.613.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.075-.15-.678-1.634-.928-2.238-.244-.588-.493-.508-.678-.517-.176-.008-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.23 3.111c.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.429.251-.702.251-1.304.176-1.429-.076-.126-.276-.201-.577-.351z" />
          <path d="M12.004 2c-5.518 0-9.996 4.48-9.996 10 0 1.764.462 3.486 1.34 5.006l-1.348 4.994 5.118-1.342c1.472.802 3.13 1.224 4.886 1.224 5.518 0 9.996-4.48 9.996-10 0-5.52-4.478-10-9.996-10zm0 18.25c-1.574 0-3.112-.42-4.453-1.214l-.32-.19-3.308.868.883-3.223-.208-.332c-.872-1.389-1.332-3.007-1.332-4.659 0-4.687 3.813-8.5 8.5-8.5s8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z" />
        </svg>

        {/* Tooltip on Hover (docked absolutely to the right of the button) */}
        <div
          role="tooltip"
          className={`absolute left-full ml-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#091224]/95 border border-emerald-500/40 text-white text-xs font-semibold shadow-2xl backdrop-blur-xl pointer-events-none transition-all duration-200 ease-out whitespace-nowrap ${
            isHovered && !isClicked
              ? 'opacity-100 translate-x-0 scale-100'
              : 'opacity-0 -translate-x-2 scale-95 pointer-events-none'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span>Chat on WhatsApp</span>
        </div>
      </a>
    </div>
  );
}
