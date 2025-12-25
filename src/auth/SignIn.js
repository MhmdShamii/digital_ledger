import { useEffect, useState } from "react";

export default function SignIn({ setIfLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkAuth() {}
    checkAuth();
  });

  return (
    <div className="min-h-screen w-full bg-slate-950 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <div className="p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-white">Sign in</h1>
              <p className="mt-1 text-sm text-slate-300">
                Enter your details to access your account.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              {/* Email */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-400 outline-none transition
                             focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/15"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-100 placeholder:text-slate-400 outline-none transition
                             focus:border-indigo-400/60 focus:ring-4 focus:ring-indigo-500/15"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition
                           hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="relative z-10">
                  {loading ? "Signing in..." : "Sign In"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition group-hover:translate-x-full" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
