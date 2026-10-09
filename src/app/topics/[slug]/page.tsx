import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { topicsData, getTopicBySlug } from "@/data/topics";
import { getArticlesByTopic } from "@/data/articles";
import { getCategoryBySlug } from "@/data/categories";
import { siteConfig } from "@/data/siteConfig";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { getBreadcrumbJsonLd } from "@/lib/seo";
import {
  Layers,
  Hash,
  HelpCircle,
  FileText,
  Compass,
  ArrowRight
} from "lucide-react";

interface TopicPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return topicsData.map((topic) => ({
    slug: topic.slug
  }));
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    return { title: "Topic Not Found" };
  }

  const url = `${siteConfig.url}/topics/${topic.slug}`;
  const title = `${topic.title} | ${siteConfig.shortName}`;

  return {
    title: `${topic.title} — Knowledge Cluster & Architecture`,
    description: topic.shortDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      title,
      description: topic.shortDescription,
      url,
      siteName: siteConfig.name,
      images: ["/srijan-prasad-avatar.png"]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: topic.shortDescription,
      images: ["/srijan-prasad-avatar.png"]
    }
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  if (!topic) {
    notFound();
  }

  const articles = getArticlesByTopic(topic.slug);
  const category = getCategoryBySlug(topic.categorySlug);

  const breadcrumbs = [
    { name: "Articles", url: "/blog" },
    { name: category ? category.title : "Categories", url: category ? `/blog/category/${category.slug}` : "/blog" },
    { name: topic.title, url: `/topics/${topic.slug}` }
  ];

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Articles", url: `${siteConfig.url}/blog` },
    { name: topic.title, url: `${siteConfig.url}/topics/${topic.slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <Breadcrumbs items={breadcrumbs} />

        <header style={{ maxWidth: "840px", marginBottom: "45px" }}>
          <div style={{ display: "inline-flex", gap: "8px", marginBottom: "14px" }}>
            <span className="badge badge-accent">Topical Cluster Pillar</span>
            {category && (
              <Link href={`/blog/category/${category.slug}`} className="badge">
                Vertical: {category.title}
              </Link>
            )}
          </div>

          <h1 style={{ fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)", marginBottom: "18px" }}>
            {topic.title}
          </h1>

          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.75", marginBottom: "24px" }}>
            {topic.pillarDescription}
          </p>
        </header>

        {/* Core Architecture Matrix */}
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "30px", marginBottom: "50px" }}>
          {/* Subtopics and Pillars */}
          <div
            style={{
              padding: "28px",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Layers size={18} style={{ color: "var(--accent-primary)" }} />
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>
                Subtopics & Architectural Vectors
              </h2>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
              {topic.subtopics.map((sub, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.95rem",
                    color: "var(--text-secondary)",
                    padding: "8px 12px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-secondary)"
                  }}
                >
                  <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>•</span>
                  <span>{sub}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Entities Graph */}
          <div
            style={{
              padding: "28px",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <Hash size={18} style={{ color: "var(--accent-secondary)" }} />
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>
                Entity Knowledge Graph Nodes
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
              {topic.coreEntities.map((ent) => (
                <span
                  key={ent}
                  style={{
                    fontSize: "0.82rem",
                    padding: "5px 10px",
                    borderRadius: "var(--radius-sm)",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-light)",
                    color: "var(--text-primary)",
                    fontWeight: 500
                  }}
                >
                  {ent}
                </span>
              ))}
            </div>

            {/* Related Topic Clusters */}
            {topic.relatedTopics.length > 0 && (
              <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border-light)" }}>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-tertiary)", display: "block", marginBottom: "8px" }}>
                  Related Clusters
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {topic.relatedTopics.map((relSlug) => (
                    <Link
                      key={relSlug}
                      href={`/topics/${relSlug}`}
                      className="topic-tag"
                      style={{ fontSize: "0.78rem" }}
                    >
                      <span>#{relSlug.replace(/-/g, " ")}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Key Questions Answered */}
        <section
          style={{
            padding: "28px",
            backgroundColor: "var(--accent-surface)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(96, 165, 250, 0.25)",
            marginBottom: "50px"
          }}
          aria-labelledby="questions-answered-heading"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <HelpCircle size={18} style={{ color: "var(--accent-primary)" }} />
            <h2 id="questions-answered-heading" style={{ fontSize: "1.15rem", fontWeight: 700, margin: 0 }}>
              Primary Architectural Questions Explored
            </h2>
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
            {topic.keyQuestionsAnswered.map((q, idx) => (
              <li key={idx} style={{ fontSize: "0.95rem", color: "var(--text-primary)", display: "flex", gap: "8px" }}>
                <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>Q:</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Supporting Research Articles */}
        <section aria-labelledby="supporting-articles-heading">
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "22px" }}>
            <FileText size={20} style={{ color: "var(--accent-primary)" }} />
            <h2 id="supporting-articles-heading" style={{ fontSize: "1.6rem", margin: 0 }}>
              Supporting Investigations & Whitepapers ({articles.length})
            </h2>
          </div>

          {articles.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div style={{ padding: "40px", textAlign: "center", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
              <p style={{ margin: 0, color: "var(--text-secondary)" }}>Additional research papers in this cluster are currently in drafting state.</p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
