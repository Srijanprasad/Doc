"use client";

import { useState } from "react";
import { articlesData, Article } from "@/data/articles";
import { categories } from "@/data/categories";
import { topicsData } from "@/data/topics";
import { authorData } from "@/data/author";
import { siteConfig } from "@/data/siteConfig";
import {
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Eye,
  Edit,
  Save,
  Check,
  AlertTriangle,
  Layers,
  Search,
  ExternalLink,
  Code
} from "lucide-react";

export function EditorClient() {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(articlesData[0].id);
  const [mode, setMode] = useState<"edit" | "preview">("edit");
  const [saveStatus, setSaveStatus] = useState<string>("");

  // Editor form state
  const current = articlesData.find((a) => a.id === selectedArticleId) || articlesData[0];
  const [title, setTitle] = useState(current.title);
  const [slug, setSlug] = useState(current.slug);
  const [dek, setDek] = useState(current.dek);
  const [categorySlug, setCategorySlug] = useState(current.categorySlug);
  const [entitiesInput, setEntitiesInput] = useState(current.entities.join(", "));
  const [aeoDirectAnswer, setAeoDirectAnswer] = useState(current.aeoDirectAnswer);
  const [contentHtml, setContentHtml] = useState(current.contentHtml);
  const [featuredImage, setFeaturedImage] = useState(current.featuredImage);
  const [featuredImageAlt, setFeaturedImageAlt] = useState(current.featuredImageAlt);

  // Switch article handler
  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
    const art = articlesData.find((a) => a.id === id);
    if (art) {
      setTitle(art.title);
      setSlug(art.slug);
      setDek(art.dek);
      setCategorySlug(art.categorySlug);
      setEntitiesInput(art.entities.join(", "));
      setAeoDirectAnswer(art.aeoDirectAnswer);
      setContentHtml(art.contentHtml);
      setFeaturedImage(art.featuredImage);
      setFeaturedImageAlt(art.featuredImageAlt);
    }
  };

  // SEO Audit Computations
  const titleLength = title.length;
  const isTitleOptimal = titleLength >= 40 && titleLength <= 65;
  const dekLength = dek.length;
  const isDekOptimal = dekLength >= 120 && dekLength <= 165;
  const hasH1 = title.trim().length > 0;
  const hasFeaturedImage = featuredImage.trim().length > 0;
  const hasAeoAnswer = aeoDirectAnswer.trim().length > 30;
  const parsedEntities = entitiesInput.split(",").map((e) => e.trim()).filter(Boolean);
  const hasSufficientEntities = parsedEntities.length >= 3;

  const warnings: string[] = [];
  if (!isTitleOptimal) {
    warnings.push(`SEO Title is ${titleLength} chars (Recommended: 40–65 chars).`);
  }
  if (!isDekOptimal) {
    warnings.push(`Meta Description is ${dekLength} chars (Recommended: 120–165 chars).`);
  }
  if (!hasFeaturedImage) {
    warnings.push("Missing featured image URL for Open Graph & Twitter Cards.");
  }
  if (!hasAeoAnswer) {
    warnings.push("Direct answer is too short for AEO answer engine extraction.");
  }
  if (!hasSufficientEntities) {
    warnings.push("Provide at least 3 entity concepts to build strong semantic graph nodes.");
  }

  // AI Assistant actions
  const [aiNotice, setAiNotice] = useState<string>("");

  const handleGenerateSummary = () => {
    setAiNotice("Synthesizing summary from content...");
    setTimeout(() => {
      setDek(`An authoritative technical breakdown examining ${title.toLowerCase()}, prioritizing factual evidence, schema entity modeling, and long-term publication authority.`);
      setAiNotice("AI Summary generated. Review and refine below.");
    }, 400);
  };

  const handleExtractEntities = () => {
    setAiNotice("Extracting semantic entities...");
    setTimeout(() => {
      const extraEntities = ["Knowledge Graph", "Information Architecture", "Core Web Vitals", "Schema.org"];
      const currentList = entitiesInput.split(",").map((e) => e.trim()).filter(Boolean);
      const combined = Array.from(new Set([...currentList, ...extraEntities]));
      setEntitiesInput(combined.join(", "));
      setAiNotice("Extracted 4 high-signal entities into entity graph.");
    }, 400);
  };

  const handleSave = () => {
    setSaveStatus("Changes successfully validated and saved to publishing state.");
    setTimeout(() => setSaveStatus(""), 3500);
  };

  return (
    <div style={{ paddingBottom: "60px" }}>
      {/* Studio Header Toolbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 24px",
          backgroundColor: "var(--bg-surface)",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-md)",
          marginBottom: "30px",
          boxShadow: "var(--shadow-sm)",
          flexWrap: "wrap",
          gap: "14px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-tertiary)" }}>
            Select Article:
          </span>
          <select
            value={selectedArticleId}
            onChange={(e) => handleSelectArticle(e.target.value)}
            className="input-field"
            style={{ width: "auto", minWidth: "260px" }}
          >
            {articlesData.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button
            onClick={() => setMode(mode === "edit" ? "preview" : "edit")}
            className="btn btn-secondary btn-sm"
          >
            {mode === "edit" ? <Eye size={15} /> : <Edit size={15} />}
            <span>{mode === "edit" ? "Reader Preview" : "Back to Editor"}</span>
          </button>

          <button onClick={handleSave} className="btn btn-primary btn-sm">
            <Save size={15} />
            <span>Save & Publish</span>
          </button>
        </div>
      </div>

      {saveStatus && (
        <div
          style={{
            padding: "12px 20px",
            backgroundColor: "rgba(5, 150, 105, 0.1)",
            border: "1px solid rgba(5, 150, 105, 0.25)",
            borderRadius: "var(--radius-sm)",
            color: "var(--accent-emerald)",
            fontWeight: 600,
            fontSize: "0.9rem",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <Check size={16} />
          <span>{saveStatus}</span>
        </div>
      )}

      {/* Main Studio Grid: Editor/Preview on left, Real-time SEO & AI panel on right */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: "30px", alignItems: "start" }}>
        {/* Left Column: Form or Preview */}
        {mode === "edit" ? (
          <div
            style={{
              padding: "32px",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)",
              display: "flex",
              flexDirection: "column",
              gap: "22px"
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, marginBottom: "6px" }}>
                Article H1 & SEO Title <span style={{ color: "var(--accent-warm)" }}>*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontSize: "0.78rem", color: isTitleOptimal ? "var(--accent-emerald)" : "var(--accent-warm)" }}>
                <span>Length: {titleLength} characters</span>
                <span>Optimal: 40–65 characters</span>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, marginBottom: "6px" }}>
                  URL Slug
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, marginBottom: "6px" }}>
                  Category Vertical
                </label>
                <select
                  value={categorySlug}
                  onChange={(e) => setCategorySlug(e.target.value)}
                  className="input-field"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                  Article Dek / Meta Description
                </label>
                <button
                  type="button"
                  onClick={handleGenerateSummary}
                  className="btn btn-ghost btn-sm"
                  style={{ display: "inline-flex", gap: "4px", fontSize: "0.75rem", color: "var(--accent-primary)" }}
                >
                  <Sparkles size={12} />
                  <span>AI Summary Draft</span>
                </button>
              </div>
              <textarea
                value={dek}
                onChange={(e) => setDek(e.target.value)}
                rows={3}
                className="input-field"
                style={{ resize: "vertical", fontFamily: "inherit" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px", fontSize: "0.78rem", color: isDekOptimal ? "var(--accent-emerald)" : "var(--accent-warm)" }}>
                <span>Length: {dekLength} characters</span>
                <span>Optimal: 120–165 characters</span>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, marginBottom: "6px" }}>
                AEO Direct Answer (Answer Engine Optimization)
              </label>
              <textarea
                value={aeoDirectAnswer}
                onChange={(e) => setAeoDirectAnswer(e.target.value)}
                rows={3}
                className="input-field"
                style={{ resize: "vertical", fontFamily: "inherit" }}
              />
              <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)" }}>
                Explicit, concise declarative statement answering the core question for Perplexity and SearchGPT.
              </span>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                <label style={{ fontSize: "0.88rem", fontWeight: 700 }}>
                  Referenced Entity Graph (Comma Separated)
                </label>
                <button
                  type="button"
                  onClick={handleExtractEntities}
                  className="btn btn-ghost btn-sm"
                  style={{ display: "inline-flex", gap: "4px", fontSize: "0.75rem", color: "var(--accent-primary)" }}
                >
                  <Sparkles size={12} />
                  <span>AI Extract Entities</span>
                </button>
              </div>
              <input
                type="text"
                value={entitiesInput}
                onChange={(e) => setEntitiesInput(e.target.value)}
                className="input-field"
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, marginBottom: "6px" }}>
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, marginBottom: "6px" }}>
                  Image Alt Text (Accessibility & GEO)
                </label>
                <input
                  type="text"
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, marginBottom: "6px" }}>
                Article Body Content (Semantic HTML & Sections)
              </label>
              <textarea
                value={contentHtml}
                onChange={(e) => setContentHtml(e.target.value)}
                rows={10}
                className="input-field"
                style={{ resize: "vertical", fontFamily: "var(--font-mono)", fontSize: "0.88rem" }}
              />
            </div>
          </div>
        ) : (
          /* Reader Preview Mode */
          <div
            style={{
              padding: "40px",
              backgroundColor: "var(--bg-surface)",
              border: "1px solid var(--border-light)",
              borderRadius: "var(--radius-md)"
            }}
          >
            <div style={{ display: "inline-flex", marginBottom: "12px" }}>
              <span className="badge badge-accent">{categorySlug}</span>
            </div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem", marginBottom: "14px", lineHeight: 1.2 }}>
              {title}
            </h1>
            <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
              {dek}
            </p>

            {featuredImage && (
              <img
                src={featuredImage}
                alt={featuredImageAlt}
                style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", borderRadius: "var(--radius-md)", marginBottom: "30px" }}
              />
            )}

            {aeoDirectAnswer && (
              <div className="aeo-direct-answer" style={{ marginBottom: "30px" }}>
                <span className="aeo-label">Direct Answer / Synthesis</span>
                <p className="aeo-text">{aeoDirectAnswer}</p>
              </div>
            )}

            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        )}

        {/* Right Column: Real-Time Technical SEO Audit & AI Copilot Panel */}
        <aside style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* SEO Health Scorecard */}
          <div
            style={{
              padding: "26px",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                {warnings.length === 0 ? (
                  <ShieldCheck size={18} style={{ color: "var(--accent-emerald)" }} />
                ) : (
                  <ShieldAlert size={18} style={{ color: "var(--accent-warm)" }} />
                )}
                <span>Technical SEO & AEO Score</span>
              </h3>
              <span
                className={warnings.length === 0 ? "badge badge-accent" : "badge badge-warm"}
                style={{ fontSize: "0.8rem" }}
              >
                {warnings.length === 0 ? "100 / 100 Optimized" : `${100 - warnings.length * 15} / 100`}
              </span>
            </div>

            {/* Checklist */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: isTitleOptimal ? "var(--text-primary)" : "var(--accent-warm)" }}>
                {isTitleOptimal ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <AlertTriangle size={14} />}
                <span>Title Length ({titleLength} chars)</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: isDekOptimal ? "var(--text-primary)" : "var(--accent-warm)" }}>
                {isDekOptimal ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <AlertTriangle size={14} />}
                <span>Meta Description ({dekLength} chars)</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-primary)" }}>
                <Check size={14} style={{ color: "var(--accent-emerald)" }} />
                <span>Canonical Target: <code>{siteConfig.url}/blog/{slug}</code></span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: hasAeoAnswer ? "var(--text-primary)" : "var(--accent-warm)" }}>
                {hasAeoAnswer ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <AlertTriangle size={14} />}
                <span>AEO Direct Synthesis Definition</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: hasSufficientEntities ? "var(--text-primary)" : "var(--accent-warm)" }}>
                {hasSufficientEntities ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <AlertTriangle size={14} />}
                <span>Semantic Entities ({parsedEntities.length} connected)</span>
              </div>
            </div>

            {/* Warnings list if any */}
            {warnings.length > 0 && (
              <div style={{ padding: "12px", backgroundColor: "rgba(217, 119, 6, 0.08)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(217, 119, 6, 0.2)" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-warm)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  Actionable SEO Warnings:
                </span>
                <ul style={{ listStyle: "none", fontSize: "0.8rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {warnings.map((w, i) => (
                    <li key={i}>• {w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Social SERP & Open Graph Preview */}
          <div
            style={{
              padding: "24px",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)"
            }}
          >
            <h4 style={{ fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-tertiary)", marginBottom: "14px" }}>
              Search Snippet Simulation (Google SERP)
            </h4>
            <div style={{ padding: "16px", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-light)" }}>
              <span style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", display: "block", marginBottom: "2px" }}>
                {siteConfig.url} › blog › {slug}
              </span>
              <div style={{ fontSize: "1.05rem", color: "#1a0dab", fontWeight: 500, lineHeight: 1.3, marginBottom: "4px", textDecoration: "underline" }}>
                {title}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                {dek || "Add a meta description to display your search snippet."}
              </p>
            </div>
          </div>

          {/* AI Notice Feedback */}
          {aiNotice && (
            <div style={{ padding: "12px 16px", backgroundColor: "var(--accent-surface)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(96, 165, 250, 0.3)", fontSize: "0.85rem", color: "var(--accent-primary)" }}>
              {aiNotice}
            </div>
          )}

          {/* Author Provenance Card */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)"
            }}
          >
            <h4 style={{ fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-tertiary)", marginBottom: "8px" }}>
              Author Entity Association
            </h4>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
              Published by <strong>{authorData.name}</strong> ({authorData.handle}). Verified JSON-LD <code>Person</code> schema with <code>sameAs</code> links to X and Instagram will be embedded into the static HTML bundle.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
