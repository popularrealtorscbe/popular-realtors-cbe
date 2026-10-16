"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Incorrect password. Try again.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-md">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-copper">
        Secure access
      </p>
      <h1 className="display mt-2 text-4xl text-ink">Agent login</h1>
      <p className="mt-3 text-ink/65">
        Enter the dashboard password to manage property listings.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4 bg-white p-6 shadow-sm">
        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
          />
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Checking…" : "Enter dashboard"}
        </button>
        <p className="text-xs text-ink/50">
          Demo password: <code>popular@demo</code>
        </p>
      </form>
    </div>
  );
}
