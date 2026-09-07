import React from 'react';

export default function ChatbotOptions({ options = [], onSelect, disabled = false }) {
  if (!options || options.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {options.map((option, idx) => (
        <button
          key={idx}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(option)}
          className="rounded-xl border border-slate-700/80 bg-slate-900/80 hover:border-cyan-400/80 hover:bg-cyan-950/30 text-slate-200 hover:text-cyan-300 px-3.5 py-2 text-xs font-semibold shadow-sm transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer text-left"
        >
          {option}
        </button>
      ))}
    </div>
  );
}
