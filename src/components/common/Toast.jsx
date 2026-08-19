import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl animate-fade-in-up max-w-md">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isSuccess ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
        }`}
      >
        {isSuccess ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
      </div>

      <div className="flex-1 text-sm text-slate-200">
        <p className="font-semibold text-white mb-0.5">
          {isSuccess ? 'Success' : 'Attention'}
        </p>
        <p className="text-xs text-slate-300 leading-relaxed">{message}</p>
      </div>

      <button
        onClick={onClose}
        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
