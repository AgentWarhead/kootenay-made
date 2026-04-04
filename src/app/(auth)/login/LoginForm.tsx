'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, Mountain, Mail, Lock, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-dash-bg)' }}
    >
      {/* Back to main site */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-1.5 text-sm font-medium transition-colors duration-200"
        style={{ color: 'var(--color-dash-text-muted)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to kootenaymade.ca</span>
      </Link>

      {/* Topo lines background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/dashboard/topo-lines.svg)',
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px',
          opacity: 0.06,
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border p-8 sm:p-10"
        style={{ borderColor: 'var(--color-dash-border)' }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--color-dash-copper)' }}
          >
            <Mountain className="w-6 h-6 text-white" />
          </div>
          <span
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ color: 'var(--color-dash-copper)', fontFamily: 'var(--font-cabinet)' }}
          >
            Kootenay Made Digital
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-2xl sm:text-3xl font-bold text-center mb-2"
          style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
        >
          Welcome to the Neighbourhood
        </h1>
        <p
          className="text-center text-sm mb-8"
          style={{ color: 'var(--color-dash-text-muted)' }}
        >
          Sign in to access your client dashboard.
        </p>

        {/* Error */}
        {error && (
          <div
            className="mb-6 p-3 rounded-lg text-sm border"
            style={{
              backgroundColor: 'rgba(200, 121, 65, 0.08)',
              borderColor: 'rgba(200, 121, 65, 0.3)',
              color: 'var(--color-dash-copper)',
            }}
          >
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1.5"
              style={{ color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)' }}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'var(--color-dash-text-faint)' }}
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@yourbusiness.ca"
                className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                style={{
                  borderColor: 'var(--color-dash-border)',
                  backgroundColor: 'var(--color-dash-bg)',
                  color: 'var(--color-dash-text)',
                  fontFamily: 'var(--font-general)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1.5"
              style={{ color: 'var(--color-dash-text)', fontFamily: 'var(--font-general)' }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: 'var(--color-dash-text-faint)' }}
              />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                style={{
                  borderColor: 'var(--color-dash-border)',
                  backgroundColor: 'var(--color-dash-bg)',
                  color: 'var(--color-dash-text)',
                  fontFamily: 'var(--font-general)',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-dash-copper)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--color-dash-border)')}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all flex items-center justify-center gap-2 mt-2"
            style={{
              backgroundColor: loading ? 'var(--color-dash-text-faint)' : 'var(--color-dash-copper)',
              fontFamily: 'var(--font-general)',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Warming up the lodge...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Forgot password */}
        <div className="mt-5 text-center">
          <Link
            href="/forgot-password"
            className="text-sm transition-colors hover:underline"
            style={{ color: 'var(--color-dash-copper)', fontFamily: 'var(--font-general)' }}
          >
            Forgot your password?
          </Link>
        </div>
      </div>

      {/* Footer */}
      <p
        className="relative z-10 mt-6 text-xs"
        style={{ color: 'var(--color-dash-text-faint)', fontFamily: 'var(--font-general)' }}
      >
        Built in the West Kootenays. 🏔️
      </p>
    </div>
  );
}
