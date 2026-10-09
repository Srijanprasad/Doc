import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { authorData } from "@/data/author";
import { articlesData } from "@/data/articles";
import { siteConfig } from "@/data/siteConfig";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { getAuthorJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";
import { ExternalLink, Edit3, ShieldCheck, BookOpen, Layers } from "lucide-react";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: authorData.slug }];
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== authorData.slug) {
    return { title: "Author Not Found" };
  }

  const url = `${siteConfig.url}/author/${authorData.slug}`;

  return {
    title: `${authorData.name} — Author & Publication Hub`,
    description: authorData.biography,
    alternates: {
      canonical: url
    },
    openGraph: {
      title: `${authorData.name} | Author Hub`,
      description: authorData.biography,
      url,
      images: [
        {
          url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
          alt: `${authorData.name} Editorial Hub`
        }
      ]
    },
    twitter: {
      card: "summary",
      creator: authorData.handle
    }
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  if (slug !== authorData.slug) {
    notFound();
  }

  const authorArticles = articlesData.filter((a) => a.authorId === authorData.id);
  const authorJsonLd = getAuthorJsonLd();
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Author", url: `${siteConfig.url}/author/${authorData.slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <Breadcrumbs items={[{ name: "Author", url: `/author/${authorData.slug}` }]} />

        {/* Central Author Identity Hub */}
        <section
          style={{
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-light)",
            borderRadius: "var(--radius-lg)",
            padding: "48px 40px",
            marginBottom: "60px",
            boxShadow: "var(--shadow-sm)"
          }}
          aria-labelledby="author-title"
        >
          <div style={{ display: "flex", gap: "32px", alignItems: "flex-start", flexWrap: "wrap" }}>
            <div
              style={{
                width: "110px",
                height: "110px",
                borderRadius: "var(--radius-full)",
                overflow: "hidden",
                border: "3px solid var(--accent-primary)",
                boxShadow: "var(--shadow-md)",
                flexShrink: 0
              }}
            >
              <img
                src="/srijan-prasad-photo.jpg"
                alt={authorData.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ flexGrow: 1, minWidth: "280px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", flexWrap: "wrap" }}>
                <h1 id="author-title" style={{ fontSize: "clamp(2rem, 3.5vw, 2.7rem)", margin: 0, fontWeight: 700 }}>
                  {authorData.name}
                </h1>
                <span className="badge badge-accent">Verified Publication Entity</span>
              </div>

              <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-tertiary)", marginBottom: "16px" }}>
                {authorData.role}
              </p>

              {/* Notice that bio is editable placeholder to avoid inventing unverified claims */}
              <div
                style={{
                  padding: "16px 20px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--bg-secondary)",
                  border: "1px solid var(--border-light)",
                  marginBottom: "24px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--accent-primary)", marginBottom: "6px" }}>
                  <ShieldCheck size={13} style={{ color: "var(--accent-emerald)" }} />
                  <span>Verified Author Profile &amp; Background</span>
                </div>
                <p style={{ margin: 0, fontSize: "0.98rem", color: "var(--text-secondary)", lineHeight: "1.7" }}>
                  {authorData.biography}
                </p>
              </div>

              {/* Exact verified social & contact channels */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <a
                  href={authorData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-pill"
                  aria-label="Author profile on GitHub (@Srijanprasad)"
                >
                  <span>GitHub: @Srijanprasad</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={authorData.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-pill"
                  aria-label="Author profile on X (@Ushan_0)"
                >
                  <span>X: @Ushan_0</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={authorData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-pill"
                  aria-label="Author profile on Instagram (@srijanprasad_)"
                >
                  <span>Instagram: @srijanprasad_</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={authorData.socials.email}
                  className="social-link-pill"
                  aria-label="Email srijanprasad2006@gmail.com directly"
                >
                  <span>Email: {authorData.email}</span>
                  <ExternalLink size={13} />
                </a>

                <Link
                  href="/contact"
                  className="btn btn-primary btn-sm"
                >
                  <span>Send Editorial Message</span>
                </Link>
              </div>

              {/* Key Topics Explored */}
              <div>
                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-tertiary)", display: "block", marginBottom: "8px" }}>
                  Primary Knowledge Vectors & Research Areas
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {authorData.topics.map((t) => (
                    <span key={t} className="topic-tag">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Published Articles by Author */}
        <section aria-labelledby="author-articles-heading">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "26px" }}>
            <div>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-primary)" }}>
                Author Archive
              </span>
              <h2 id="author-articles-heading" style={{ fontSize: "1.8rem", margin: "4px 0 0 0" }}>
                Authored Investigations ({authorArticles.length})
              </h2>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
            {authorArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
