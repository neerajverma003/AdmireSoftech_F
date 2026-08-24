import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  KeyRound,
  ArrowLeft,
  RotateCw,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    signup,
    sendForgotPasswordOtp,
    resetPassword,
  } = useAuth();

  const [mode, setMode] = useState(authModalMode || 'login'); // 'login' | 'signup' | 'forgot-password'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password specific states
  const [forgotStep, setForgotStep] = useState(1); // 1 = Enter Email, 2 = Enter OTP & New Password
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Keep internal mode synced with context mode when opened
  useEffect(() => {
    if (authModalMode) setMode(authModalMode);
    setErrorMsg('');
    setSuccessMsg('');
    setForgotStep(1);
  }, [authModalMode, isAuthModalOpen]);

  // Resend timer countdown
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  if (!isAuthModalOpen) return null;

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setAuthModalMode(newMode);
    setErrorMsg('');
    setSuccessMsg('');
    setForgotStep(1);
    setOtp('');
  };

  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendForgotPasswordOtp(email);
      setSuccessMsg(res?.message || `A 6-digit verification code was sent to ${email}`);
      setForgotStep(2);
      setResendTimer(60);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to send verification code. Please check your email.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!otp || !newPassword || !confirmNewPassword) {
      setErrorMsg('Please enter the OTP and your new password.');
      return;
    }

    if (otp.length < 6) {
      setErrorMsg('Please enter the complete 6-digit OTP.');
      return;
    }

    if (newPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetPassword(email, otp, newPassword);
      setSuccessMsg(res?.message || 'Password reset successfully! You can now sign in.');
      setTimeout(() => {
        handleModeSwitch('login');
        setPassword('');
        setConfirmPassword('');
      }, 2000);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to reset password. Please check the code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (mode === 'forgot-password') {
      if (forgotStep === 1) {
        handleSendOtp(e);
      } else {
        handleResetPassword(e);
      }
      return;
    }

    if (!email || !password) {
      setErrorMsg('Please provide all required fields.');
      return;
    }

    if (mode === 'signup') {
      if (!name) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        await signup(name, email, password);
        setSuccessMsg('Account created successfully! Welcome to Admire Softech.');
      } else {
        await login(email, password);
        setSuccessMsg('Logged in successfully!');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-[#030612]/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md rounded-3xl bg-[#091024]/95 border border-cyan-500/30 p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 backdrop-blur-2xl text-slate-100 overflow-hidden"
        >
          {/* Ambient Glows */}
          <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center space-y-1.5 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Admire Softech Portal</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              {mode === 'signup'
                ? 'Create Your Account'
                : mode === 'forgot-password'
                ? forgotStep === 1
                  ? 'Reset Your Password'
                  : 'Enter Verification Code'
                : 'Welcome Back'}
            </h3>
            <p className="text-xs text-slate-400">
              {mode === 'signup'
                ? 'Join to apply for careers, manage quotes & access services'
                : mode === 'forgot-password'
                ? forgotStep === 1
                  ? 'Enter your email to receive a 6-digit OTP code'
                  : `We sent a 6-digit code to ${email}`
                : 'Sign in to access your projects, applications and services'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Only in login/signup mode) */}
          {mode !== 'forgot-password' ? (
            <div className="flex p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold mb-5">
              <button
                type="button"
                onClick={() => handleModeSwitch('login')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center ${
                  mode === 'login'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch('signup')}
                className={`flex-1 py-2 rounded-lg transition-all cursor-pointer text-center ${
                  mode === 'signup'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Create Account
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/80 text-xs">
              <button
                type="button"
                onClick={() => handleModeSwitch('login')}
                className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </button>
              <span className="text-slate-500 font-medium">Step {forgotStep} of 2</span>
            </div>
          )}

          {/* Alerts */}
          {errorMsg && (
            <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            {/* ────────── FORGOT PASSWORD MODE ────────── */}
            {mode === 'forgot-password' ? (
              forgotStep === 1 ? (
                <>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Registered Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#060b18] border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Code...</span>
                      </>
                    ) : (
                      <>
                        <span>Send 6-Digit OTP</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-semibold">6-Digit Verification Code</label>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={resendTimer > 0 || isLoading}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 disabled:text-slate-500 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
                      </button>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        placeholder="e.g. 482910"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#060b18] border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all tracking-widest font-mono text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="At least 6 characters"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#060b18] border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#060b18] border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <span>Reset & Save Password</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </>
              )
            ) : (
              /* ────────── STANDARD LOGIN & SIGNUP MODE ────────── */
              <>
                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#060b18] border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#060b18] border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-semibold">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => handleModeSwitch('forgot-password')}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition-colors cursor-pointer"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#060b18] border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {mode === 'signup' && (
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#060b18] border border-slate-700 text-slate-100 placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs uppercase tracking-wider disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </form>

          {/* Footer Security Note */}
          <div className="flex items-center justify-center gap-1.5 pt-4 text-[11px] text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>End-to-End Encrypted Session</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
