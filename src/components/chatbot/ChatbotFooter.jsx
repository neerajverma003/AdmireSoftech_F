import React from 'react';

export default function ChatbotFooter({ step }) {
  // Compute percentage based on 5-step flow
  const progressMap = {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 95,
    6: 100,
  };

  const currentPercent = progressMap[step] || 20;
  const isFinished = step >= 6;

  return (
    <div className="px-4 py-2.5 bg-[#050A19] border-t border-slate-800/80 select-none">
      <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-1.5">
        <span className="flex items-center gap-1.5 text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          {isFinished ? 'Project Details Confirmed' : 'Planning your project'}
        </span>
        <span className="font-mono text-cyan-400 font-bold">
          {isFinished ? 'Complete' : `Step ${step} of 5`}
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-slate-800/80 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-teal-400 rounded-full transition-all duration-500 ease-out shadow-sm shadow-cyan-500/50"
          style={{ width: `${currentPercent}%` }}
        />
      </div>
    </div>
  );
}
