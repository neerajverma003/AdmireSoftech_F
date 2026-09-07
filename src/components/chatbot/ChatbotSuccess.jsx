import React from 'react';
import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';

export default function ChatbotSuccess({ settings, onReset, onClose, lead }) {
  return (
    <div className="space-y-4 pt-2 bg-[#060D20] p-5 rounded-2xl border border-emerald-500/30 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* Celebratory Checkmark */}
      <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto shadow-md shadow-emerald-500/20">
        <CheckCircle2 className="w-6 h-6" />
      </div>

      {/* Confirmation Title & Message */}
      <div className="space-y-1.5">
        <h4 className="text-sm font-bold text-white">Inquiry Submitted Successfully!</h4>
        <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto">
          {settings?.step5?.successMessage ||
            'Thank you! Your project requirements have been received. Our solutions architect will reach out within 24 hours.'}
        </p>
      </div>

      {/* Quick Summary Pill */}
      {lead && (
        <div className="p-3 rounded-xl bg-[#08132e] border border-slate-800 text-[11px] text-slate-300 space-y-1 text-left">
          <div className="flex justify-between">
            <span className="text-slate-400">Client:</span>
            <span className="font-semibold text-white">{lead.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Service:</span>
            <span className="font-semibold text-cyan-300">{lead.service}</span>
          </div>
          {lead.budget && (
            <div className="flex justify-between">
              <span className="text-slate-400">Budget:</span>
              <span className="font-semibold text-emerald-400">{lead.budget}</span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="pt-2 flex flex-col gap-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 py-2.5 px-4 text-xs font-bold text-white shadow-md shadow-blue-600/20 cursor-pointer active:scale-95 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start a New Inquiry</span>
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-1 py-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          >
            <span>Close Chat</span>
          </button>
        )}
      </div>
    </div>
  );
}
