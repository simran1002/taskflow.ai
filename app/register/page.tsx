'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuthStore } from '@/store/useAuthStore';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.data.user);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Failed to register');
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),transparent_60%),radial-gradient(circle_at_bottom,_rgba(236,72,153,0.28),transparent_55%)]" />
      <div className="relative grid w-full max-w-5xl grid-cols-1 gap-8 rounded-3xl border border-slate-800 bg-slate-950/80 p-6 shadow-2xl shadow-sky-900/40 backdrop-blur-2xl md:grid-cols-[1.2fr,1fr]">
        <div className="hidden flex-col justify-between rounded-2xl border border-slate-800 bg-gradient-to-br from-sky-500/20 via-indigo-500/10 to-fuchsia-500/20 p-6 text-slate-50 md:flex">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
              TaskFlow AI
            </p>
            <h1 className="mt-4 text-3xl font-semibold leading-snug">
              Create your workspace in minutes.
            </h1>
            <p className="mt-3 text-sm text-slate-200/80">
              Design task boards, set priorities, and let AI keep everything in sync for you and your
              team.
            </p>
          </div>
          <div className="mt-8 space-y-3 text-xs text-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              Smart suggestions based on your recent tasks.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
              Secure by design with JWT and HTTP‑only cookies.
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
              Built with modern tooling: Next.js 16, TypeScript, MongoDB, and AI.
            </div>
          </div>
        </div>
        <Card className="relative w-full max-w-md justify-self-center border-slate-800 bg-slate-950/80 text-slate-50 shadow-xl shadow-slate-900/80">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">Create an account</CardTitle>
            <CardDescription className="text-center text-slate-300">
              Enter your information to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-md border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-slate-100">
                  Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Simran Yadav"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="border-slate-700 bg-slate-900 text-slate-50 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-100">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-slate-700 bg-slate-900 text-slate-50 placeholder:text-slate-500"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-100">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="border-slate-700 bg-slate-900 text-slate-50 placeholder:text-slate-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-sky-500 text-sm font-semibold text-white shadow-lg shadow-sky-900/50 hover:bg-sky-400"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
              <p className="text-center text-xs text-slate-400">
                Already have an account?{' '}
                <Link href="/login" className="text-sky-400 hover:text-sky-300 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

