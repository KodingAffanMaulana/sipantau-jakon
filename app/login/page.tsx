// app/login/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-400 via-amber-500 to-orange-600" />

      {/* Blur Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-white/20 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-orange-300/20 rounded-full blur-3xl bottom-[-100px] right-[-100px] animate-pulse" />
      </div>

      {/* Logo Top Left */}
      <div className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-2 rounded-xl border border-white/30 shadow-lg">
        <Image
          src="/logo.png" // pastikan di /public/aset/logo.png
          alt="Logo Bina Marga"
          width={150}
          height={150}
          className="object-contain"
          priority
        />
      </div>

      {/* Glass Card */}
      <div className="relative z-20 w-full max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-2xl p-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-white text-shadow-mauve-900 tracking-wide">
            SIPANTAU JAKON
          </h1>
          <p className="text-sm text-white/80 mt-1">Masuk untuk lanjut ke dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm text-white/90">Email</label>
            <input
              className="mt-1 w-full rounded-xl px-4 py-2.5 bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@contoh.com"
            />
          </div>

          <div>
            <label className="text-sm text-white/90">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-xl px-4 py-2.5 bg-white/30 text-white placeholder-white/70 outline-none focus:ring-2 focus:ring-white/50 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {errorMsg && (
            <div className="rounded-xl bg-red-500/20 border border-red-300/30 p-3 text-sm text-red-100">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-white text-slate-900 font-semibold py-2.5 hover:bg-white/90 transition active:scale-[0.98] disabled:opacity-60">
            {loading && (
              <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? 'Loading...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}
