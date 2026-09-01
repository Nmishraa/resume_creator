import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogIn, UserPlus, UserCheck, X, Sparkles, AlertCircle, CheckCircle2, KeyRound } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    showAuthModal,
    setShowAuthModal,
    signInGoogle,
    signInEmail,
    signUpEmail,
    sendPasswordReset,
    signInGuest,
    loading
  } = useAuth();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [resetSending, setResetSending] = useState(false);

  if (!showAuthModal) return null;

  const handleGoogleSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    try {
      await signInGoogle();
    } catch (err: any) {
      if (err?.code === 'auth/popup-closed-by-user') {
        setError('Sign in popup was closed. Please try again.');
      } else if (err?.code === 'auth/unauthorized-domain') {
        setError('This domain is not yet authorized in Firebase Console -> Authentication -> Settings -> Authorized Domains.');
      } else if (err?.code === 'auth/operation-not-allowed') {
        setError('Google Sign-In is not enabled yet in your Firebase Console -> Authentication -> Sign-in Providers.');
      } else {
        setError(err?.message || 'Google sign-in failed. Please verify your Firebase project credentials or continue as Guest.');
      }
    }
  };

  const handleGuestSignIn = async () => {
    setError(null);
    setSuccessMsg(null);
    try {
      await signInGuest();
    } catch (err: any) {
      setError(err?.message || 'Guest session failed. Running in offline storage mode.');
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Please enter your email address to receive a password reset link.');
      return;
    }

    setResetSending(true);
    try {
      await sendPasswordReset(cleanEmail);
      setSuccessMsg(`Password reset link sent to ${cleanEmail}! Please check your inbox (and spam folder).`);
    } catch (err: any) {
      if (err?.code === 'auth/user-not-found') {
        setError(`No account found for ${cleanEmail}. Please click "Create Account" below to register.`);
      } else if (err?.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(err?.message || 'Failed to send reset email. Please try again.');
      }
    } finally {
      setResetSending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Please fill in both email and password.');
      return;
    }

    if (cleanPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      if (mode === 'login') {
        await signInEmail(cleanEmail, cleanPassword);
      } else {
        await signUpEmail(cleanEmail, cleanPassword);
      }
    } catch (err: any) {
      console.error('Email auth error:', err);
      const code = err?.code;
      if (code === 'auth/email-already-in-use') {
        setError('An account with this email already exists. Please switch to "Sign In" above.');
        setMode('login');
      } else if (code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
        setError('Incorrect password or no account exists yet for this email. If this is your first time here, please click "Create Account" above.');
      } else if (code === 'auth/wrong-password') {
        setError('Incorrect password. If you forgot your password, click "Forgot password?" below.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (code === 'auth/operation-not-allowed') {
        setError('Email/Password provider is not enabled in Firebase Console. Please enable it in Authentication -> Sign-in method.');
      } else {
        setError(err?.message || 'Authentication error. Please try again or use Guest mode.');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in zoom-in-95">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-brand-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-brand-500/20 rounded-xl">
              <Sparkles size={18} className="text-brand-400" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {mode === 'forgot'
                  ? 'Reset Your Password'
                  : mode === 'login'
                  ? 'Sign In to Resume Craft'
                  : 'Create Free Account'}
              </h3>
              <p className="text-xs text-slate-300">Sync resumes &amp; applications across devices</p>
            </div>
          </div>
          <button
            onClick={() => setShowAuthModal(false)}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => { setMode('signup'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${mode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <UserPlus size={13} />
              <span>Create Account</span>
            </button>
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); setSuccessMsg(null); }}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <LogIn size={13} />
              <span>Sign In</span>
            </button>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle size={15} className="shrink-0 mt-0.5 text-rose-600" />
              <div className="space-y-1">
                <div>{error}</div>
                {mode === 'login' && (
                  <div className="pt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => { setMode('signup'); setError(null); }}
                      className="text-brand-700 font-bold underline hover:text-brand-800 cursor-pointer"
                    >
                      👉 Switch to "Create Account"
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-start gap-2">
              <CheckCircle2 size={15} className="shrink-0 mt-0.5 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'forgot' ? (
            /* Forgot Password Form */
            <form onSubmit={handleForgotPassword} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Enter your registered Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                />
              </div>

              <button
                type="submit"
                disabled={resetSending}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <KeyRound size={14} />
                <span>{resetSending ? 'Sending reset link...' : 'Send Password Reset Link'}</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setMode('login'); setError(null); }}
                  className="text-xs text-brand-600 hover:text-brand-800 font-semibold cursor-pointer"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            /* Regular Login / Signup Form */
            <>
              {/* Google Sign In */}
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2.5 shadow-xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center gap-3">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-[11px] text-slate-400 font-semibold uppercase">Or with Email</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-600">Password (min. 6 characters)</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => { setMode('forgot'); setError(null); }}
                        className="text-[11px] text-brand-600 hover:text-brand-800 font-semibold cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow transition-colors cursor-pointer"
                >
                  {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Free Account'}
                </button>
              </form>
            </>
          )}

          {/* Guest login */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2 text-center text-xs">
            <button
              type="button"
              onClick={handleGuestSignIn}
              className="text-slate-600 hover:text-slate-900 font-semibold py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <UserCheck size={14} className="text-emerald-600" />
              <span>Continue as Guest (No account needed)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
