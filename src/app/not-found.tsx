import Link from "next/link";
import { articlesData } from "@/data/articles";
import { ArticleCard } from "@/components/ArticleCard";
import { Search, Home, ArrowRight, AlertCircle, Compass } from "lucide-react";

export default function NotFound() {
  const recommendedArticles = articlesData.slice(0, 3);

  return (
    <div className="container" style={{ paddingTop: "60px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: "center", marginBottom: "60px" }}>
        <div style={{ display: "inline-flex", padding: "14px", borderRadius: "var(--radius-full)", backgroundColor: "var(--accent-surface)", color: "var(--accent-primary)", marginBottom: "18px" }}>
          <Compass size={36} />
        </div>
        <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)", marginBottom: "16px" }}>
          404 — Knowledge Node Not Found
        </h1>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.7", marginBottom: "30px" }}>
          The requested essay, topic cluster, or resource URL does not exist or may have been consolidated into an evergreen pillar piece.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary btn-lg">
            <Home size={18} />
            <span>Return to Homepage</span>
          </Link>
          <Link href="/search" className="btn btn-secondary btn-lg">
            <Search size={18} />
            <span>Search Knowledge Base</span>
          </Link>
          <Link href="/blog" className="btn btn-ghost btn-lg" style={{ border: "1px solid var(--border-light)" }}>
            <span>Browse Complete Archive</span>
          </Link>
        </div>
      </div>

      {/* Suggested Essential Articles */}
      <section style={{ borderTop: "1px solid var(--border-light)", paddingTop: "50px" }} aria-labelledby="recommended-heading">
        <h2 id="recommended-heading" style={{ fontSize: "1.6rem", textAlign: "center", marginBottom: "30px" }}>
          Recommended Core Publications
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px" }}>
          {recommendedArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </div>
  );
}
