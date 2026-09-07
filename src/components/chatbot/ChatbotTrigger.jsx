import React, { useState, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';

// Modern, friendly AI Chatbot Robot Icon
function ChatbotIcon({ className = "w-7 h-7" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top Antenna Bulb & Stem */}
      <circle cx="12" cy="3.5" r="1.5" className="fill-cyan-300 drop-shadow-[0_0_6px_#38bdf8]" />
      <path d="M12 5V7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* Cyber Ear Nodes */}
      <rect x="2" y="10.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.9" />
      <rect x="20" y="10.5" width="2" height="5" rx="1" fill="currentColor" opacity="0.9" />

      {/* Main Bot Head / Helmet */}
      <rect
        x="3.5"
        y="7.5"
        width="17"
        height="12"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
        className="fill-white/10"
      />

      {/* Visor Screen Background */}
      <rect
        x="6"
        y="10"
        width="12"
        height="4.5"
        rx="2"
        className="fill-slate-950/70"
      />

      {/* Glowing Tech Eyes */}
      <circle cx="9" cy="12.2" r="1.25" className="fill-cyan-300 drop-shadow-[0_0_4px_#38bdf8]" />
      <circle cx="15" cy="12.2" r="1.25" className="fill-cyan-300 drop-shadow-[0_0_4px_#38bdf8]" />

      {/* Friendly Smile Wave */}
      <path
        d="M9.5 16.2C10.3 17 11.1 17.2 12 17.2C12.9 17.2 13.7 17 14.5 16.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ChatbotTrigger({ isOpen, onClick }) {
  const [showTeaser, setShowTeaser] = useState(false);

  // Show friendly teaser pill after 3 seconds on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser(true);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Friendly Teaser Pill (shown only when chatbot is closed) */}
      {!isOpen && showTeaser && (
        <div
          onClick={onClick}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#091024]/95 border border-cyan-500/30 text-slate-200 text-xs font-medium shadow-2xl backdrop-blur-xl animate-bounce duration-1000 cursor-pointer hover:border-cyan-400/60 transition-all select-none"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span>Need an estimate or IT solution? <strong>Chat with us!</strong></span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setShowTeaser(false);
            }}
            className="text-slate-400 hover:text-white ml-1 text-xs"
          >
            &times;
          </button>
        </div>
      )}

      {/* Floating Action Circular Trigger Button */}
      <div className="relative">
        {/* Pulsing beacon ring effect when closed */}
        {!isOpen && (
          <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400 opacity-70 blur-sm animate-pulse pointer-events-none" />
        )}

        <button
          type="button"
          onClick={onClick}
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          className={`relative group w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 transform active:scale-95 cursor-pointer ${
            isOpen
              ? 'bg-slate-800 border border-slate-700 hover:bg-slate-700 shadow-slate-900/50 rotate-90'
              : 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-cyan-500/30 hover:scale-105'
          }`}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-slate-200 transition-transform duration-300 -rotate-90" />
          ) : (
            <div className="relative flex items-center justify-center">
              <ChatbotIcon className="w-7 h-7 text-white transition-transform duration-300 group-hover:scale-110 drop-shadow-md" />
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 absolute -top-1.5 -right-2 animate-spin duration-3000 drop-shadow-[0_0_6px_#38bdf8]" />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
