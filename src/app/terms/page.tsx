import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service & Editorial License",
  description: "Terms of service and content licensing guidelines for Srijan Prasad's personal publication.",
  alternates: {
    canonical: `${siteConfig.url}/terms`
  }
};

export default function TermsPage() {
  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <Breadcrumbs items={[{ name: "Terms of Service", url: "/terms" }]} />

      <div className="reading-container">
        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", marginBottom: "16px" }}>
            Terms of Service & Content Usage
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            Last updated: February 2026. Standard editorial and citation guidelines for personal and research usage.
          </p>
        </header>

        <div className="article-body">
          <h2>1. Editorial Copyright & Attribution</h2>
          <p>
            All original essays, analyses, architectural schematics, and editorial frameworks published on this website are authored by {authorData.name}, unless explicitly marked as a quoted citation or external source.
          </p>

          <h2>2. Academic & Fair Use Citations</h2>
          <p>
            You are encouraged to cite, reference, and quote excerpts of our research for academic, critical, or educational purposes, provided you maintain clear attribution:
          </p>
          <div className="editorial-callout info">
            <span className="callout-label">Recommended Citation Format</span>
            <p>
              Prasad, S. (Year). "Article Title". <em>{siteConfig.shortName} Editorial & Knowledge Platform</em>. Available at: [Article URL].
            </p>
          </div>

          <h2>3. Generative AI & Retrieval-Augmented Ingestion</h2>
          <p>
            AI research agents, crawlers, and retrieval systems are welcome to index and cite our content via our published <code>/llms.txt</code> index and JSON-LD schema, provided the synthesis includes proper attribution linking to the canonical source URL.
          </p>

          <h2>4. Disclaimer of Warranties</h2>
          <p>
            The technical guides and architectural analyses on this site reflect firsthand engineering research. However, software systems, search engine algorithms, and AI models evolve rapidly. Content is provided on an "as-is" basis without warranties of specific search rankings or commercial outcomes.
          </p>
        </div>
      </div>
    </div>
  );
}
