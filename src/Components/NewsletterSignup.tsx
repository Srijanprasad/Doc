"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "We could not complete your subscription.");
      }

      setEmail("");
      setStatus("success");
      setMessage(result.message || "You are subscribed to the High-Signal Dispatch.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Subscription failed. Please try again.");
    }
  };

  return (
    <section className="newsletter-card" aria-labelledby="newsletter-heading">
      <div style={{ display: "inline-flex", padding: "10px", borderRadius: "var(--radius-full)", backgroundColor: "var(--accent-surface)", color: "var(--accent-primary)", marginBottom: "14px" }}>
        <Mail size={22} />
      </div>
      <h2 id="newsletter-heading" className="newsletter-title">
        The High-Signal Dispatch
      </h2>
      <p className="newsletter-desc">
        A curated, monthly publication examining artificial intelligence, generative search optimization (GEO), personal knowledge systems, and software engineering. No spam. No fluff.
      </p>

      {status === "success" ? (
        <div className="newsletter-status newsletter-status-success" role="status">
          <CheckCircle2 size={18} />
          <span>{message}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="newsletter-form" noValidate>
          <input
            type="email"
            placeholder="Enter your email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            aria-label="Email address for dispatch subscription"
            autoComplete="email"
            disabled={status === "submitting"}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="newsletter-error" role="alert">
          {message}
        </p>
      )}

      <p className="newsletter-consent">
        By subscribing, you agree to receive editorial research dispatches. You may unsubscribe at any time with one click. We respect your privacy.
      </p>
    </section>
  );
}
