"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Editorial Inquiry",
    message: "",
    honeypot: "" // Anti-spam honeypot
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam check: honeypot must remain empty
    if (formData.honeypot) {
      // Silently discard spam bots
      setStatus("success");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!formData.email.includes("@")) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("submitting");

    // Simulate submission
    setTimeout(() => {
      setStatus("success");
    }, 450);
  };

  if (status === "success") {
    return (
      <div
        style={{
          padding: "36px",
          backgroundColor: "rgba(5, 150, 105, 0.08)",
          border: "1px solid rgba(5, 150, 105, 0.2)",
          borderRadius: "var(--radius-md)",
          textAlign: "center"
        }}
        role="alert"
      >
        <div style={{ display: "inline-flex", padding: "12px", borderRadius: "var(--radius-full)", backgroundColor: "var(--bg-surface)", color: "var(--accent-emerald)", marginBottom: "14px" }}>
          <CheckCircle2 size={32} />
        </div>
        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "8px", color: "var(--text-primary)" }}>
          Message Dispatched Successfully
        </h3>
        <p style={{ color: "var(--text-secondary)", maxWidth: "440px", margin: "0 auto 20px auto" }}>
          Thank you for reaching out to the editorial desk. Your inquiry has been received and will be reviewed shortly.
        </p>
        <button
          onClick={() => {
            setFormData({ name: "", email: "", subject: "Editorial Inquiry", message: "", honeypot: "" });
            setStatus("idle");
          }}
          className="btn btn-secondary btn-sm"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Honeypot field for bot detection (hidden from real users) */}
      <div style={{ display: "none" }} aria-hidden="true">
        <label htmlFor="hp_field">Do not fill this</label>
        <input
          type="text"
          id="hp_field"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="contact_name" style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "6px" }}>
          Full Name <span style={{ color: "var(--accent-warm)" }}>*</span>
        </label>
        <input
          id="contact_name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Alex Mercer"
          className="input-field"
          required
        />
      </div>

      <div>
        <label htmlFor="contact_email" style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "6px" }}>
          Email Address <span style={{ color: "var(--accent-warm)" }}>*</span>
        </label>
        <input
          id="contact_email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="alex@domain.com"
          className="input-field"
          required
        />
      </div>

      <div>
        <label htmlFor="contact_subject" style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "6px" }}>
          Inquiry Classification
        </label>
        <select
          id="contact_subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="input-field"
        >
          <option value="Editorial Inquiry">Editorial & Research Inquiry</option>
          <option value="Technical Question">Technical / GEO Architecture</option>
          <option value="Citation Correction">Citation or Reference Review</option>
          <option value="Collaboration">Syndication or Speaking</option>
        </select>
      </div>

      <div>
        <label htmlFor="contact_message" style={{ display: "block", fontSize: "0.88rem", fontWeight: 600, marginBottom: "6px" }}>
          Detailed Message <span style={{ color: "var(--accent-warm)" }}>*</span>
        </label>
        <textarea
          id="contact_message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Share your thoughts, architectural feedback, or research notes..."
          rows={5}
          className="input-field"
          style={{ resize: "vertical", fontFamily: "inherit" }}
          required
        />
      </div>

      {status === "error" && (
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#ef4444", fontSize: "0.9rem" }} role="alert">
          <AlertCircle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-primary btn-lg"
        style={{ width: "fit-content" }}
      >
        <span>{status === "submitting" ? "Dispatching..." : "Send Message"}</span>
        <Send size={16} />
      </button>

      <p style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", margin: 0 }}>
        Your information is used strictly to answer your direct message. We never sell or share contact details.
      </p>
    </form>
  );
}
