// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Lock, User, Shield, Award, TrendingUp, AlertCircle,
  CheckCircle, Info, Chrome, Github, Eye, EyeOff
} from 'lucide-react';
import loginHero from '@/assets/images/login-hero.jpg';
import '@/assets/css/LoginPage.css';

// ─── Error extraction ─────────────────────────────────────────────────────────
//
// The backend can return errors in several shapes:
//   { detail: "..." }
//   { non_field_errors: ["..."] }
//   { identifier: ["..."], password: ["..."] }
//   Plain string
//   HTTP 401 with no parsable body
//
// We try every shape and fall back gracefully so the page never just reloads.

function extractErrorMessage(err: unknown): string {
  // Not an object — generic fallback
  if (!err || typeof err !== 'object') {
    return 'Login failed. Please try again.';
  }

  const axiosErr = err as {
    response?: {
      status?: number;
      data?: unknown;
    };
    message?: string;
  };

  // Network error (no response at all — backend down, CORS, etc.)
  if (!axiosErr.response) {
    if (axiosErr.message?.toLowerCase().includes('network')) {
      return 'Unable to reach the server. Please check your connection.';
    }
    return axiosErr.message ?? 'Login failed. Please try again.';
  }

  const { status, data } = axiosErr.response;

  // No body
  if (!data) {
    return status === 401
      ? 'Invalid username/email or password.'
      : `Login failed (error ${status ?? 'unknown'}).`;
  }

  // Plain string body
  if (typeof data === 'string') {
    // Avoid dumping a giant HTML error page on the user
    if (data.trim().startsWith('<')) {
      return `Server error (${status ?? ''}).`;
    }
    return data;
  }

  if (typeof data === 'object') {
    const d = data as Record<string, unknown>;

    // DRF standard: { detail: "..." }
    if (typeof d.detail === 'string' && d.detail) return d.detail;

    // DRF validation: { non_field_errors: ["..."] }
    if (Array.isArray(d.non_field_errors) && d.non_field_errors.length) {
      return String(d.non_field_errors[0]);
    }

    // Field errors — collect them all
    const fieldMessages: string[] = [];
    for (const key of ['identifier', 'password', 'email', 'username']) {
      const val = d[key];
      if (Array.isArray(val) && val.length) fieldMessages.push(String(val[0]));
      else if (typeof val === 'string' && val) fieldMessages.push(val);
    }
    if (fieldMessages.length) return fieldMessages.join(' ');

    // Any other string value in the response object
    const anyString = Object.values(d).find(v => typeof v === 'string');
    if (anyString) return String(anyString);
  }

  // HTTP 401 catch-all
  if (status === 401) return 'Invalid username/email or password.';

  return 'Login failed. Please try again.';
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TUTOR_ROLES = ['supervisor', 'admin', 'instructor'];

// ─── Component ────────────────────────────────────────────────────────────────

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError]           = useState('');
  const [infoMessage, setInfoMessage]     = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading]   = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const clearMessages = () => {
    setError('');
    setInfoMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    // Client-side validation
    if (!identifier.trim()) { setError('Username or email address is required'); return; }
    if (!password.trim())   { setError('Password is required'); return; }

    setIsLoading(true);

    try {
      const user = await login(identifier, password);

      // Success — redirect based on role
      if (TUTOR_ROLES.includes(user.role)) {
        navigate('/tutor/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      // ── This is the critical path. ──────────────────────────────────────────
      // Because api.ts now skips the interceptor for /users/login/, the raw
      // axios error lands here and we can extract a meaningful message.
      const msg = extractErrorMessage(err);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-clear info / success banners after 5 s
  useEffect(() => {
    if (!infoMessage && !successMessage) return;
    const id = setTimeout(() => { setInfoMessage(''); setSuccessMessage(''); }, 5000);
    return () => clearTimeout(id);
  }, [infoMessage, successMessage]);

  return (
    <div className="login-page">
      <section className="login-hero">
        <div className="hero-background" style={{ backgroundImage: `url(${loginHero})` }}>
          <div className="hero-gradient-overlay">
            <div className="container">
              <div className="hero-content">
                <div className="hero-badge"><Shield size={20} /><span>Secure Access</span></div>
                <h1 className="hero-title">
                  Welcome Back to <span className="highlight">SkyShield Edu</span>
                </h1>
                <p className="hero-description">
                  Access your training dashboard, continue simulations, and track your progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="login-section">
        <div className="container">
          <div className="login-container">
            <div className="login-card glass-card">
              <div className="login-header">
                <h2>Sign In to Your Account</h2>
                <p>Enter your credentials to continue your training</p>
              </div>

              {/* ── Alert banners ──────────────────────────────────────── */}
              {error && (
                <div className="alert-message alert-error" role="alert">
                  <AlertCircle size={20} />
                  <span>{error}</span>
                  <button className="alert-close" onClick={() => setError('')} aria-label="Dismiss">×</button>
                </div>
              )}
              {infoMessage && (
                <div className="alert-message alert-info" role="status">
                  <Info size={20} />
                  <span>{infoMessage}</span>
                  <button className="alert-close" onClick={() => setInfoMessage('')} aria-label="Dismiss">×</button>
                </div>
              )}
              {successMessage && (
                <div className="alert-message alert-success" role="status">
                  <CheckCircle size={20} />
                  <span>{successMessage}</span>
                  <button className="alert-close" onClick={() => setSuccessMessage('')} aria-label="Dismiss">×</button>
                </div>
              )}

              {/* ── Form ────────────────────────────────────────────────── */}
              <form className="login-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="identifier">
                    <User size={18} />
                    <span>Username or Email</span>
                  </label>
                  <input
                    type="text"
                    id="identifier"
                    name="identifier"
                    autoComplete="username"
                    value={identifier}
                    onChange={e => { setIdentifier(e.target.value); clearMessages(); }}
                    placeholder="username or you@company.com"
                    className="form-input glass-input"
                    disabled={isLoading}
                    // Don't mark required here — we handle it in handleSubmit
                    // so the browser doesn't show its own popup before our banner
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    <Lock size={18} />
                    <span>Password</span>
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={e => { setPassword(e.target.value); clearMessages(); }}
                      placeholder="Enter your password"
                      className="form-input glass-input password-input"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(p => !p)}
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>

                <button type="submit" className="login-button" disabled={isLoading}>
                  {isLoading ? (
                    <><div className="spinner" /><span>Signing In…</span></>
                  ) : (
                    <><Shield size={20} /><span>Sign In</span></>
                  )}
                </button>
              </form>

              <div className="login-divider"><span>Or continue with</span></div>
              <div className="social-login">
                <button className="social-button" disabled={isLoading}>
                  <Chrome size={18} /><span>Google</span>
                </button>
                <button className="social-button" disabled={isLoading}>
                  <Github size={18} /><span>GitHub</span>
                </button>
              </div>

              <div className="login-footer">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" className="signup-link">Sign up here</Link>
                </p>
              </div>
            </div>

            {/* ── Info cards ──────────────────────────────────────────── */}
            <div className="login-info">
              <div className="info-card glass-card">
                <div className="info-icon-wrapper"><Shield size={28} /></div>
                <h3>Enterprise Security</h3>
                <p>Bank-level encryption and multi-factor authentication to protect your data</p>
              </div>
              <div className="info-card glass-card">
                <div className="info-icon-wrapper"><Award size={28} /></div>
                <h3>Certified Training</h3>
                <p>Industry-recognized certifications and expert-led courses</p>
              </div>
              <div className="info-card glass-card">
                <div className="info-icon-wrapper"><TrendingUp size={28} /></div>
                <h3>Track Progress</h3>
                <p>Real-time analytics and personalized learning paths</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;