import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { RotateCw, ShieldCheck, AlertCircle } from 'lucide-react';
import { getCaptchaChallenge } from '../../api/captchaApi';

const CaptchaBox = forwardRef(({
  onChange,
  variant = 'dark', // 'dark' | 'light'
  error = null,
  className = '',
  required = true,
}, ref) => {
  const [captchaData, setCaptchaData] = useState({ captchaToken: '', captchaSvg: '' });
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  const honeypotRef = useRef('');
  const captchaTokenRef = useRef('');

  const fetchNewCaptcha = useCallback(async () => {
    setLoading(true);
    setFetchError(false);
    setUserAnswer('');

    try {
      const data = await getCaptchaChallenge();
      if (data && data.success && data.captchaToken && data.captchaSvg) {
        captchaTokenRef.current = data.captchaToken;
        setCaptchaData({
          captchaToken: data.captchaToken,
          captchaSvg: data.captchaSvg,
        });
        onChangeRef.current?.({
          captchaToken: data.captchaToken,
          captchaAnswer: '',
          hp_field: honeypotRef.current,
        });
        return;
      }
      setFetchError(true);
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewCaptcha();
  }, [fetchNewCaptcha]);

  // Expose reload and clear methods to parent form via ref
  useImperativeHandle(ref, () => ({
    reload: fetchNewCaptcha,
    clear: () => {
      setUserAnswer('');
      fetchNewCaptcha();
    },
  }), [fetchNewCaptcha]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setUserAnswer(val);
    onChangeRef.current?.({
      captchaToken: captchaTokenRef.current || captchaData.captchaToken,
      captchaAnswer: val,
      hp_field: honeypotRef.current,
    });
  };

  const handleHoneypotChange = (e) => {
    const val = e.target.value;
    setHoneypot(val);
    honeypotRef.current = val;
    onChangeRef.current?.({
      captchaToken: captchaTokenRef.current || captchaData.captchaToken,
      captchaAnswer: userAnswer,
      hp_field: val,
    });
  };

  const isDark = variant === 'dark';

  return (
    <div className={`space-y-1.5 select-none ${className}`}>
      {/* Invisible Honeypot Field for Spambots */}
      <input
        type="text"
        name="hp_field"
        value={honeypot}
        onChange={handleHoneypotChange}
        tabIndex={-1}
        autoComplete="off"
        style={{ display: 'none', opacity: 0, position: 'absolute', left: '-9999px', pointerEvents: 'none' }}
        aria-hidden="true"
      />

      {/* Label Header with Refresh Action */}
      <div className="flex items-center justify-between">
        <label className={`text-[11px] font-semibold tracking-wide flex items-center gap-1.5 ${
          isDark ? 'text-slate-300' : 'text-slate-700'
        }`}>
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Security Verification {required && <span className="text-cyan-400">*</span>}</span>
        </label>
        <button
          type="button"
          onClick={fetchNewCaptcha}
          disabled={loading}
          className={`text-[10px] font-medium flex items-center gap-1 transition-colors cursor-pointer ${
            isDark
              ? 'text-cyan-400 hover:text-cyan-300 disabled:opacity-50'
              : 'text-blue-600 hover:text-blue-700 disabled:opacity-50'
          }`}
          title="Refresh security code"
        >
          <RotateCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Code</span>
        </button>
      </div>

      {/* Challenge Display & User Input Row */}
      <div className="flex items-center gap-2.5">
        {/* SVG Challenge Preview Container */}
        <div className={`shrink-0 rounded-xl overflow-hidden border transition-all h-[40px] flex items-center justify-center min-w-[130px] sm:min-w-[140px] shadow-sm ${
          isDark
            ? 'bg-white border-slate-700/60 shadow-inner'
            : 'bg-slate-50 border-slate-200'
        }`}>
          {loading ? (
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium py-1 px-2.5">
              <RotateCw className="w-3 h-3 animate-spin text-cyan-500" />
              <span className="text-[11px]">Loading...</span>
            </div>
          ) : fetchError ? (
            <button
              type="button"
              onClick={fetchNewCaptcha}
              className="text-[11px] text-rose-500 font-semibold px-2 py-1 hover:underline cursor-pointer flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" /> Retry
            </button>
          ) : (
            <div
              dangerouslySetInnerHTML={{ __html: captchaData.captchaSvg }}
              className="h-full flex items-center scale-90 sm:scale-95 origin-center select-none"
            />
          )}
        </div>

        {/* User Input Field */}
        <div className="flex-1 relative">
          <input
            required={required}
            type="text"
            maxLength={6}
            value={userAnswer}
            onChange={handleInputChange}
            placeholder="Enter 6-char code *"
            autoCapitalize="none"
            spellCheck="false"
            autoComplete="off"
            className={`w-full h-[40px] px-3 rounded-xl font-bold tracking-wider text-xs sm:text-sm transition-all outline-none border ${
              error
                ? isDark
                  ? 'border-rose-500 ring-1 ring-rose-500/30 bg-rose-500/10 text-white placeholder:text-rose-300'
                  : 'border-rose-500 ring-1 ring-rose-500/20 bg-rose-50/20 text-slate-900 placeholder:text-rose-300'
                : isDark
                  ? 'bg-slate-950/70 hover:bg-slate-900/80 focus:bg-slate-900 text-white placeholder-slate-500 border-slate-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400'
                  : 'bg-white text-slate-900 placeholder-slate-400 border-slate-300 focus:border-cyan-600 focus:ring-1 focus:ring-cyan-600'
            }`}
          />
        </div>
      </div>

      {error && (
        <p className="text-[11px] font-medium text-rose-400 flex items-center gap-1 pt-0.5 animate-in fade-in duration-200">
          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
});

CaptchaBox.displayName = 'CaptchaBox';

export default CaptchaBox;
