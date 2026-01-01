import { useState } from "react";
import axios from "axios";

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({
    store_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "https://digitalledgerbackend-production.up.railway.app/register",
        form
      );

      // auto-login behavior (optional)
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (onSuccess) onSuccess(res.data.user);
    } catch (e) {
      setError(e.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-2xl font-bold text-blue-600">Create Account</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="store_name"
          placeholder="Store / Owner name"
          value={form.store_name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded-full">
          Register
        </button>
      </form>
    </div>
  );
}
