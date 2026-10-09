import Link from "next/link";
import { Article } from "@/data/articles";
import { authorData } from "@/data/author";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  return (
    <article className="article-card">
      <Link href={`/blog/${article.slug}`} className="article-card-image-wrap" tabIndex={-1} aria-hidden="true">
        <img
          src={article.featuredImage}
          alt={article.featuredImageAlt}
          className="article-card-image"
          loading="lazy"
        />
      </Link>

      <div className="article-card-content">
        <div className="article-card-meta">
          <Link
            href={`/blog/category/${article.categorySlug}`}
            className="badge badge-accent"
          >
            {article.categorySlug.replace("-", " ")}
          </Link>
          <span>•</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Clock size={13} />
            {article.readingTimeMinutes} min read
          </span>
        </div>

        <h3 className="article-card-title">
          <Link href={`/blog/${article.slug}`}>
            {article.title}
          </Link>
        </h3>

        <p className="article-card-dek">{article.dek}</p>

        {article.topicSlugs && article.topicSlugs.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
            {article.topicSlugs.slice(0, 2).map((topicSlug) => (
              <Link
                key={topicSlug}
                href={`/topics/${topicSlug}`}
                className="topic-tag"
                style={{ fontSize: "0.75rem", padding: "2px 8px" }}
              >
                #{topicSlug.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        )}

        <div className="article-card-footer">
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link
              href={`/author/${authorData.slug}`}
              style={{ fontWeight: 600, color: "var(--text-primary)" }}
            >
              {authorData.name}
            </Link>
            <span>•</span>
            <time dateTime={article.publishedAt} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Calendar size={13} />
              {formattedDate}
            </time>
          </div>

          <Link
            href={`/blog/${article.slug}`}
            style={{ display: "inline-flex", alignItems: "center", gap: "2px", fontWeight: 600, color: "var(--accent-primary)" }}
            aria-label={`Read article: ${article.title}`}
          >
            Read <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}
