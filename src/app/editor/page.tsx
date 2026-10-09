import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EditorClient } from "./EditorClient";

export const metadata: Metadata = {
  title: "Editorial CMS & Technical SEO Studio",
  description: "Editorial management interface for drafting, auditing technical SEO metrics, and optimizing content for Generative Engines (GEO).",
  robots: {
    index: false, // Disallow search engine index of CMS workspace
    follow: false
  }
};

export default function EditorPage() {
  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <Breadcrumbs items={[{ name: "CMS & SEO Studio", url: "/editor" }]} />

      <header style={{ marginBottom: "35px" }}>
        <div style={{ display: "inline-flex", marginBottom: "10px" }}>
          <span className="badge badge-accent">Publishing Studio</span>
        </div>
        <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", marginBottom: "12px" }}>
          Editorial CMS & SEO/GEO Studio
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "800px" }}>
          Draft new publications, run real-time technical SEO audits, inspect SERP representations, and synthesize AI content summaries.
        </p>
      </header>

      <EditorClient />
    </div>
  );
}
