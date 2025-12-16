import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Sparkles, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.25),transparent_60%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.35),transparent_55%)]" />
      <header className="relative border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
              TaskFlow AI
            </h1>
            <div className="flex gap-3">
              <Button variant="outline" className="border-slate-700 bg-slate-900 hover:bg-slate-800 hover:border-slate-500">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 text-white shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:via-indigo-400 hover:to-violet-400 rounded-full px-5">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-center mb-20">
          <div className="space-y-8">
            <p className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200 backdrop-blur">
              <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Intelligent task orchestration for modern teams
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight">
              <span className="block text-slate-50">Intelligent Task</span>
              <span className="block bg-gradient-to-r from-sky-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
                Management, Powered by AI
              </span>
            </h2>
            <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl">
              TaskFlow AI helps you orchestrate work across projects, predict priorities with AI, and
              stay focused on what moves the needle. Built for fast-moving product teams and ambitious
              individuals.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-500 px-7 text-base font-semibold shadow-xl shadow-sky-500/30 hover:from-sky-400 hover:via-indigo-400 hover:to-violet-400"
              >
                <Link href="/register">Start Free</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-slate-600 bg-slate-900/60 px-6 text-base text-slate-100 hover:bg-slate-800"
              >
                <Link href="/login">Sign In</Link>
              </Button>
              <p className="text-xs text-slate-400">No credit card required. Get started in minutes.</p>
            </div>
            <div className="flex flex-wrap gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                End‑to‑end encrypted auth
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                AI‑assisted prioritization
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                Built with Next.js 16 & MongoDB
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-500/40 via-indigo-500/20 to-fuchsia-500/40 blur-3xl" />
            <Card className="relative border border-slate-700/70 bg-slate-900/80 text-slate-50 shadow-2xl shadow-sky-900/50">
              <CardHeader className="space-y-1 pb-4">
                <CardTitle className="flex items-center justify-between text-base font-semibold">
                  Live workload snapshot
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                    AI Insights
                  </span>
                </CardTitle>
                <CardDescription className="text-xs text-slate-400">
                  AI constantly evaluates your backlog and surfaces what needs attention now.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Today</p>
                    <p className="mt-2 text-2xl font-semibold text-sky-400">7</p>
                    <p className="mt-1 text-[11px] text-emerald-300">3 high‑impact</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <p className="text-slate-400">Focus score</p>
                    <p className="mt-2 text-2xl font-semibold text-indigo-400">92</p>
                    <p className="mt-1 text-[11px] text-slate-400">AI‑optimized</p>
                  </div>
                  <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-3">
                    <p className="text-slate-400">On track</p>
                    <p className="mt-2 text-2xl font-semibold text-emerald-400">84%</p>
                    <p className="mt-1 text-[11px] text-slate-400">this sprint</p>
                  </div>
                </div>
                <div className="space-y-2 rounded-2xl border border-slate-700 bg-slate-900/70 p-3 text-xs">
                  <p className="text-[11px] uppercase tracking-wide text-slate-400">
                    Next best actions
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between rounded-xl bg-slate-800/80 px-3 py-2">
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                        Ship onboarding checklist
                      </span>
                      <span className="rounded-full bg-fuchsia-500/10 px-2 py-0.5 text-[10px] text-fuchsia-200">
                        High · Due today
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-slate-800/60 px-3 py-2">
                      <span className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Deep‑work block: architecture
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-200">
                        Focus
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border border-slate-700/80 bg-slate-900/70 backdrop-blur-md shadow-lg shadow-sky-900/40 transition hover:-translate-y-1 hover:border-sky-500/80 hover:shadow-xl">
            <CardHeader>
              <Sparkles className="h-8 w-8 text-sky-400 mb-3" />
              <CardTitle className="text-slate-50">AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Intelligent suggestions, automatic priority scoring, and natural‑language task creation
                powered by modern AI.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-slate-700/80 bg-slate-900/70 backdrop-blur-md shadow-lg shadow-indigo-900/40 transition hover:-translate-y-1 hover:border-indigo-500/80 hover:shadow-xl">
            <CardHeader>
              <Zap className="h-8 w-8 text-amber-300 mb-3" />
              <CardTitle className="text-slate-50">Lightning Fast</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Built on Next.js 16 with edge‑ready APIs so every interaction feels instant and fluid.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-slate-700/80 bg-slate-900/70 backdrop-blur-md shadow-lg shadow-emerald-900/40 transition hover:-translate-y-1 hover:border-emerald-500/80 hover:shadow-xl">
            <CardHeader>
              <Shield className="h-8 w-8 text-emerald-300 mb-3" />
              <CardTitle className="text-slate-50">Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                JWT‑based auth, secure cookies, and MongoDB best practices to keep your workspace safe.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border border-slate-700/80 bg-slate-900/70 backdrop-blur-md shadow-lg shadow-fuchsia-900/40 transition hover:-translate-y-1 hover:border-fuchsia-500/80 hover:shadow-xl">
            <CardHeader>
              <CheckCircle2 className="h-8 w-8 text-fuchsia-300 mb-3" />
              <CardTitle className="text-slate-50">Full Control</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-slate-300">
                Powerful CRUD, filters, and saved views so you can slice work by status, priority, and
                due dates.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        <Card className="border-none bg-gradient-to-r from-sky-500 via-indigo-500 to-fuchsia-500 text-white shadow-2xl">
          <CardHeader className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="text-2xl md:text-3xl text-white">
                Ready to boost your productivity?
              </CardTitle>
              <CardDescription className="text-sky-50/90">
                Plug TaskFlow AI into your workflow and ship work with clarity and confidence.
              </CardDescription>
            </div>
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full bg-white text-slate-900 hover:bg-slate-100"
            >
              <Link href="/register">Get Started Now</Link>
            </Button>
          </CardHeader>
        </Card>
      </main>

      <footer className="relative mt-16 border-t border-slate-800 bg-slate-950/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400">
              <p className="font-semibold text-slate-100">TaskFlow AI</p>
              <p>Built with Next.js 16, TypeScript, MongoDB, and AI</p>
            </div>
            <div className="text-sm text-slate-400 text-center md:text-right">
              <p className="font-semibold text-slate-100">Developer Information</p>
              <p>
                <span className="font-medium">Name:</span> Simran Yadav
              </p>
              <p>
                <span className="font-medium">Role:</span> Fullstack Developer
              </p>
              <p>
                <a
                  href="https://github.com/simran1002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 hover:underline"
                >
                  GitHub Profile
                </a>
                {' | '}
                <a
                  href="https://www.linkedin.com/in/simran-yadav-10s/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 hover:underline"
                >
                  LinkedIn Profile
                </a>
              </p>
              <p className="mt-1 text-slate-500">
                Full-Stack Developer Assignment - House of Edtech
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
