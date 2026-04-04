'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mountain, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const supabase = createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/dashboard/account`,
    });
    setLoading(false);
    setSent(true);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-dash-bg)' }}
    >
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

      <div
        className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border p-8 sm:p-10"
        style={{ borderColor: 'var(--color-dash-border)' }}
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: 'var(--color-dash-copper)' }}
          >
            <Mountain className="w-6 h-6 text-white" />
          </div>
        </div>

        {sent ? (
          <div className="text-center">
            <h1
              className="text-2xl font-bold mb-3"
              style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
            >
              Check your trail
            </h1>
            <p className="text-sm mb-6" style={{ color: 'var(--color-dash-text-muted)' }}>
              If that email exists in our system, a reset link is on its way. Check your inbox.
            </p>
            <Link
              href="/login"
              className="text-sm font-medium flex items-center justify-center gap-1.5 hover:underline"
              style={{ color: 'var(--color-dash-copper)' }}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1
              className="text-2xl font-bold text-center mb-2"
              style={{ fontFamily: 'var(--font-cabinet)', color: 'var(--color-dash-text)' }}
            >
              Reset your password
            </h1>
            <p className="text-center text-sm mb-8" style={{ color: 'var(--color-dash-text-muted)' }}>
              Enter your email and we&apos;ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: 'var(--color-dash-text-faint)' }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@yourbusiness.ca"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none"
                  style={{
                    borderColor: 'var(--color-dash-border)',
                    backgroundColor: 'var(--color-dash-bg)',
                    color: 'var(--color-dash-text)',
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: 'var(--color-dash-copper)' }}
              >
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Send Reset Link'}
              </button>
            </form>

            <div className="mt-5 text-center">
              <Link
                href="/login"
                className="text-sm flex items-center justify-center gap-1.5 hover:underline"
                style={{ color: 'var(--color-dash-copper)' }}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          </>
        )}
      </div>

      <p className="relative z-10 mt-6 text-xs" style={{ color: 'var(--color-dash-text-faint)' }}>
        Built in the West Kootenays. 🏔️
      </p>
    </div>
  );
}
