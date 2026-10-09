"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { searchArticles, SearchResult } from "@/lib/search";
import { categories } from "@/data/categories";
import { topicsData } from "@/data/topics";
import { Search, Clock, Calendar, ArrowRight, Hash, Sparkles, Filter } from "lucide-react";

export function SearchClient() {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const res = searchArticles(query, categoryFilter || undefined, topicFilter || undefined);
    setResults(res);
  }, [query, categoryFilter, topicFilter]);

  const sampleKeywords = [
    "Generative Engine Optimization",
    "BM25",
    "Core Web Vitals",
    "Second Brain",
    "Information Gain",
    "JSON-LD",
    "INP"
  ];

  return (
    <div style={{ maxWidth: "860px", margin: "0 auto" }}>
      {/* Search Input Bar */}
      <div
        style={{
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-medium)",
          borderRadius: "var(--radius-md)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
          boxShadow: "var(--shadow-sm)"
        }}
      >
        <Search size={22} style={{ color: "var(--accent-primary)" }} />
        <input
          type="text"
          placeholder="Search by keywords, technical entities, or questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field"
          style={{ border: "none", fontSize: "1.1rem", padding: "4px 0", background: "transparent" }}
          autoFocus
          aria-label="Search all published content"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="btn btn-ghost btn-sm"
            style={{ fontSize: "0.8rem" }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Suggested Fast-Search Tags */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "30px" }}>
        <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-tertiary)" }}>
          Popular Entities:
        </span>
        {sampleKeywords.map((kw) => (
          <button
            key={kw}
            onClick={() => setQuery(kw)}
            className="topic-tag"
            style={{ fontSize: "0.78rem", cursor: "pointer" }}
          >
            #{kw}
          </button>
        ))}
      </div>

      {/* Facet Filters */}
      <div style={{ display: "flex", gap: "14px", marginBottom: "35px", flexWrap: "wrap" }}>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="input-field"
          style={{ width: "auto", minWidth: "180px" }}
          aria-label="Filter results by category"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.slug}>
              {c.title}
            </option>
          ))}
        </select>

        <select
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
          className="input-field"
          style={{ width: "auto", minWidth: "180px" }}
          aria-label="Filter results by topic"
        >
          <option value="">All Topics</option>
          {topicsData.map((t) => (
            <option key={t.id} value={t.slug}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {/* Results Meta */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", paddingBottom: "12px", borderBottom: "1px solid var(--border-light)" }}>
        <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          Showing <strong>{results.length}</strong> indexed knowledge result{results.length === 1 ? "" : "s"}
        </span>
        {query && (
          <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
            Hybrid lexical & entity scoring active
          </span>
        )}
      </div>

      {/* Results List */}
      {results.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
          {results.map(({ article, score, snippet, matchedEntities }) => {
            const dateStr = new Date(article.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            });

            return (
              <article
                key={article.id}
                style={{
                  padding: "24px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-light)",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
                  <span className="badge badge-accent">
                    {article.categorySlug.replace("-", " ")}
                  </span>
                  <span>•</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <Clock size={12} />
                    {article.readingTimeMinutes} min read
                  </span>
                  <span>•</span>
                  <time dateTime={article.publishedAt} style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                    <Calendar size={12} />
                    {dateStr}
                  </time>
                </div>

                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.35rem", marginBottom: "8px" }}>
                  <Link href={`/blog/${article.slug}`} style={{ color: "var(--text-primary)" }}>
                    {article.title}
                  </Link>
                </h3>

                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "12px" }}>
                  {snippet}
                </p>

                {matchedEntities.length > 0 && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>Matched Entities:</span>
                    {matchedEntities.map((e) => (
                      <span key={e} className="badge badge-warm" style={{ fontSize: "0.7rem", padding: "2px 6px" }}>
                        {e}
                      </span>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Link
                    href={`/blog/${article.slug}`}
                    style={{ fontSize: "0.88rem", fontWeight: 600, color: "var(--accent-primary)", display: "inline-flex", alignItems: "center", gap: "4px" }}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-light)"
          }}
        >
          <Search size={32} style={{ color: "var(--text-tertiary)", margin: "0 auto 14px auto" }} />
          <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>No Articles Matched "{query}"</h3>
          <p style={{ color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto 20px auto" }}>
            Try checking for spelling errors, using more general concepts, or clearing specific category/topic filters.
          </p>
          <button onClick={() => { setQuery(""); setCategoryFilter(""); setTopicFilter(""); }} className="btn btn-primary">
            Reset Search
          </button>
        </div>
      )}
    </div>
  );
}
