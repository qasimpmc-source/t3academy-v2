"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
      <div className="w-full max-w-sm px-8 py-10 bg-white border border-[#E8E1D6] rounded-2xl shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl text-[#1A1610]">
            T3 <em className="text-[#B87016] not-italic">Academy</em>
          </h1>
          <p className="mt-2 text-sm text-[#7A6E5E]">Sign in to your account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#3D3526] mb-1.5">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-[#E8E1D6] rounded-lg bg-[#FDFBF7] text-[#1A1610] placeholder-[#A89880] focus:outline-none focus:border-[#B87016] focus:ring-1 focus:ring-[#B87016]/20 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#3D3526] mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-[#E8E1D6] rounded-lg bg-[#FDFBF7] text-[#1A1610] placeholder-[#A89880] focus:outline-none focus:border-[#B87016] focus:ring-1 focus:ring-[#B87016]/20 transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-xs text-[#A32D2D] bg-[#FFF1F1] border border-[#FFCDD2] rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-[#1A1610] text-white text-sm font-medium rounded-lg hover:bg-[#B87016] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-[#7A6E5E]">
          No account?{" "}
          <a href="/auth/signup" className="text-[#B87016] hover:underline font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
