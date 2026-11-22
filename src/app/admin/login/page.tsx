"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Incorrect password. Try again.");
        setLoading(false);
        return;
      }

      // Full navigation so the session cookie is sent on the next request
      window.location.href = "/admin";
    } catch {
      setError("Login request failed. Check your connection and try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue">
        Secure access
      </p>
      <h1 className="display mt-2 text-4xl text-ink">Agent login</h1>
      <p className="mt-3 text-muted">
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
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-sm text-red-700">{error}</p>}
        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? "Checking…" : "Enter dashboard"}
        </button>
      </form>
    </div>
  );
}
