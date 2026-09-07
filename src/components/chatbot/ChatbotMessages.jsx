import React, { useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';

export default function ChatbotMessages({ messages, isTyping, children }) {
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  // Smooth autoscroll down on update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, children]);

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="flex-1 overflow-y-auto p-4 space-y-4 sidebar-calm-scroll"
      style={{ overscrollBehavior: 'contain' }}
    >
      {messages.map((msg) => {
        const isBot = msg.sender === 'bot';

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${isBot ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {isBot && (
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm shadow-cyan-500/20">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[82%] space-y-1 ${isBot ? '' : 'text-right'}`}>
              <div
                className={`p-3 text-xs sm:text-[13px] leading-relaxed break-words ${
                  isBot
                    ? 'rounded-2xl rounded-tl-sm bg-[#0C1533] border border-slate-700/60 text-slate-100 shadow-md shadow-black/20'
                    : 'rounded-2xl rounded-tr-sm bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-medium shadow-md shadow-blue-500/20 text-left'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-500 font-mono block px-1">
                {msg.timestamp}
              </span>
            </div>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex items-start gap-2.5 justify-start animate-in fade-in duration-200">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 mt-0.5">
            <Bot className="w-4 h-4" />
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-[#0C1533] border border-slate-700/60 px-4 py-3 shadow-md">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      )}

      {/* Interactive Controls (Pills, MultiSelect, Form, Success) rendered inside scroll area */}
      {children && <div className="pt-1">{children}</div>}

      <div ref={bottomRef} />
    </div>
  );
}
