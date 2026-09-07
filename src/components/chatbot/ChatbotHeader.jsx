import React from 'react';
import { Bot, RotateCcw, X, Sparkles } from 'lucide-react';

export default function ChatbotHeader({ onReset, onClose }) {
  return (
    <div className="relative px-4 py-3.5 bg-gradient-to-r from-[#070C1E] via-[#0A122A] to-[#0D1630] border-b border-cyan-500/20 flex items-center justify-between select-none">
      {/* Glow Accent Line at top */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400" />

      {/* Assistant Info */}
      <div className="flex items-center gap-2.5">
        <div className="relative">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <Bot className="w-5 h-5" />
          </div>
          {/* Online green pulsing dot */}
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 border border-[#070C1E]" />
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-bold text-white tracking-wide">
              Admire Assistant
            </h3>
            <span className="px-1.5 py-0.2 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-[9px] font-mono text-cyan-300 font-semibold">
              AI
            </span>
          </div>
          <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            Online now &bull; Instant Reply
          </p>
        </div>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={onReset}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors cursor-pointer"
          title="Restart Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-rose-500/20 hover:text-rose-300 transition-colors cursor-pointer"
          title="Close Chatbot"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
