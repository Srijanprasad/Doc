"use client";

import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please provide a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
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

      {submitted ? (
        <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 24px", backgroundColor: "rgba(5, 150, 105, 0.1)", color: "var(--accent-emerald)", borderRadius: "var(--radius-md)", fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>Subscription confirmed. Thank you for following the publication.</span>
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
            required
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      )}

      {error && (
        <p style={{ color: "#ef4444", fontSize: "0.85rem", marginTop: "8px" }} role="alert">
          {error}
        </p>
      )}

      <p className="newsletter-consent">
        By subscribing, you agree to receive editorial research dispatches. You may unsubscribe at any time with one click. We respect your privacy.
      </p>
    </section>
  );
}
