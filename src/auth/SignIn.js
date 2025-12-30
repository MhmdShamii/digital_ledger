import axios from "axios";
import { useState } from "react";

export default function SignIn({ setIfLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storeName, setStoreName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = isRegister
        ? "http://127.0.0.1:5000/register"
        : "http://127.0.0.1:5000/signin";

      const payload = isRegister
        ? { store_name: storeName, email, password }
        : { email, password };

      const res = await axios.post(url, payload);

      if (!isRegister) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setIfLoggedIn(true);
      } else {
        setIsRegister(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            {isRegister ? "Create account" : "Sign in"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Store name"
                required
                className="w-full rounded-xl px-4 py-3 border border-gray-300"
              />
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-xl px-4 py-3 border border-gray-300"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl px-4 py-3 border border-gray-300"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 text-white font-medium"
            >
              {loading ? "Please wait..." : isRegister ? "Register" : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center mt-4 text-gray-500">
            {isRegister ? "Already have an account?" : "No account?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-blue-600 font-medium"
            >
              {isRegister ? "Sign in" : "Register"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
