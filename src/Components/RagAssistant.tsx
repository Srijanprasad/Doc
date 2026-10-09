"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, X, Send, BookOpen, ExternalLink, ShieldCheck, AlertCircle } from "lucide-react";
import { queryRagAssistant, RagResponse } from "@/lib/rag";

interface RagAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RagAssistant({ isOpen, onClose }: RagAssistantProps) {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<RagResponse | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAsk = (questionText?: string) => {
    const q = (questionText || query).trim();
    if (!q) return;

    setLoading(true);
    // Simulate brief retrieval & synthesis time
    setTimeout(() => {
      const res = queryRagAssistant(q);
      setResponse(res);
      setLoading(false);
    }, 280);
  };

  const sampleQueries = [
    "What is Generative Engine Optimization (GEO)?",
    "How does hybrid vector + BM25 search work?",
    "What is Interaction to Next Paint (INP)?",
    "How do atomic notes improve second brains?"
  ];

  return (
    <div className="rag-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="rag-title">
      <div className="rag-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="rag-drawer-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ padding: "6px", backgroundColor: "var(--accent-surface)", borderRadius: "var(--radius-sm)", color: "var(--accent-primary)" }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 id="rag-title" style={{ fontSize: "1.1rem", margin: 0, fontWeight: 700 }}>
                Editorial Knowledge Assistant
              </h3>
              <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                Strictly Grounded RAG • Zero Hallucination
              </span>
            </div>
          </div>
          <button onClick={onClose} className="icon-button" aria-label="Close Assistant">
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="rag-drawer-body">
          {/* Query Input */}
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Ask a question about GEO, systems, or PKM..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAsk()}
              className="input-field"
              autoFocus
            />
            <button
              onClick={() => handleAsk()}
              disabled={loading || !query.trim()}
              className="btn btn-primary"
              aria-label="Send Query"
              style={{ padding: "10px 16px" }}
            >
              <Send size={16} />
            </button>
          </div>

          {/* Quick Prompts */}
          {!response && !loading && (
            <div>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-tertiary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "10px" }}>
                Suggested Inquiries
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {sampleQueries.map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuery(sample);
                      handleAsk(sample);
                    }}
                    className="topic-tag"
                    style={{ textAlign: "left", padding: "8px 12px", width: "100%", cursor: "pointer", justifyContent: "flex-start" }}
                  >
                    <span>{sample}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-tertiary)" }}>
              <div style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>
                <Sparkles size={24} style={{ color: "var(--accent-primary)" }} />
              </div>
              <p style={{ marginTop: "12px", fontSize: "0.9rem" }}>Retrieving semantic chunks and verifying citations...</p>
            </div>
          )}

          {/* Answer Box */}
          {response && !loading && (
            <div className="rag-answer-box">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: response.isGrounded ? "var(--accent-emerald)" : "var(--accent-warm)" }}>
                  {response.isGrounded ? <ShieldCheck size={14} /> : <AlertCircle size={14} />}
                  <span>{response.isGrounded ? "Grounded in Knowledge Base" : "Out of Corpus Scope"}</span>
                </div>
              </div>

              <p style={{ fontSize: "1rem", lineHeight: "1.7", color: "var(--text-primary)", marginBottom: "16px" }}>
                {response.answer}
              </p>

              {/* Key Insights */}
              {response.keyInsights.length > 0 && (
                <div style={{ marginBottom: "18px" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Core Takeaways
                  </span>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "6px" }}>
                    {response.keyInsights.map((insight, i) => (
                      <li key={i} style={{ fontSize: "0.88rem", color: "var(--text-secondary)", display: "flex", gap: "6px" }}>
                        <span style={{ color: "var(--accent-primary)" }}>•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cited Articles */}
              {response.citedArticles.length > 0 && (
                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "14px", marginTop: "14px" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
                    Cited Platform Articles
                  </span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {response.citedArticles.map((article, idx) => (
                      <Link
                        key={idx}
                        href={`/blog/${article.slug}`}
                        onClick={onClose}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          borderRadius: "var(--radius-sm)",
                          backgroundColor: "var(--bg-surface)",
                          border: "1px solid var(--border-light)",
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "var(--accent-primary)"
                        }}
                      >
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                          <BookOpen size={14} />
                          {article.title}
                        </span>
                        <ExternalLink size={12} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Verified Sources */}
              {response.sources.length > 0 && (
                <div style={{ borderTop: "1px solid var(--border-light)", paddingTop: "12px", marginTop: "14px" }}>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", display: "block", marginBottom: "6px" }}>
                    Primary External References
                  </span>
                  <ul style={{ listStyle: "none", fontSize: "0.8rem", color: "var(--text-tertiary)", display: "flex", flexDirection: "column", gap: "4px" }}>
                    {response.sources.map((s, idx) => (
                      <li key={idx}>
                        {s.title} — <em>{s.publisher}</em>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
