import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

export default function ChatbotMultiSelect({
  options = [],
  selectedFeatures = [],
  onToggle,
  onContinue,
  disabled = false,
}) {
  if (!options || options.length === 0) return null;

  return (
    <div className="space-y-3 pt-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
        {options.map((feature, idx) => {
          const isSelected = selectedFeatures.includes(feature);
          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(feature)}
              className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all text-xs font-medium cursor-pointer ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-sm shadow-cyan-500/20'
                  : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'border-cyan-400 bg-cyan-500 text-slate-950'
                    : 'border-slate-700 bg-slate-800'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="truncate">{feature}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
        <span className="text-[11px] text-slate-400 font-mono">
          {selectedFeatures.length} selected
        </span>
        <button
          type="button"
          disabled={disabled}
          onClick={onContinue}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 px-5 py-2 text-xs font-bold text-white shadow-md shadow-blue-600/20 cursor-pointer active:scale-95 transition-all"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
