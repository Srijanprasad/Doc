import { ArticleSource } from "@/data/articles";
import { BookMarked, ExternalLink } from "lucide-react";

interface SourcesListProps {
  sources: ArticleSource[];
}

export function SourcesList({ sources }: SourcesListProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="sources-section" aria-labelledby="sources-heading">
      <h3 id="sources-heading" className="sources-title">
        <BookMarked size={18} style={{ color: "var(--accent-primary)" }} />
        <span>Verified Sources & Primary References</span>
      </h3>
      <ol className="sources-list">
        {sources.map((source, index) => (
          <li key={index} className="source-item">
            <strong>{source.author}</strong> ({source.publishedDate}).{" "}
            <em>{source.title}</em>. {source.publisher}.{" "}
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
              style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}
            >
              <span>View Source</span>
              <ExternalLink size={12} />
            </a>{" "}
            <span style={{ color: "var(--text-tertiary)", fontSize: "0.82rem" }}>
              (Accessed: {source.accessedDate})
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
