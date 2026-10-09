import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getArticlesByCategory } from "@/data/articles";
import { topicsData } from "@/data/topics";
import { siteConfig } from "@/data/siteConfig";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleCard } from "@/components/ArticleCard";
import { getBreadcrumbJsonLd } from "@/lib/seo";
import { Layers, ArrowRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  const url = `${siteConfig.url}/blog/category/${category.slug}`;
  const title = `${category.title} | ${siteConfig.shortName}`;

  return {
    title: `${category.title} — Editorial Archive`,
    description: category.description,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      title,
      description: category.description,
      url,
      siteName: siteConfig.name,
      images: ["/srijan-prasad-avatar.png"]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: category.description,
      images: ["/srijan-prasad-avatar.png"]
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const articles = getArticlesByCategory(category.slug);
  const relatedTopics = topicsData.filter((t) => t.categorySlug === category.slug);

  const breadcrumbs = [
    { name: "Articles", url: "/blog" },
    { name: category.title, url: `/blog/category/${category.slug}` }
  ];

  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Articles", url: `${siteConfig.url}/blog` },
    { name: category.title, url: `${siteConfig.url}/blog/category/${category.slug}` }
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
        <Breadcrumbs items={breadcrumbs} />

        <header style={{ maxWidth: "780px", marginBottom: "50px" }}>
          <div style={{ display: "inline-flex", marginBottom: "12px" }}>
            <span className="badge badge-accent">Editorial Vertical</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)", marginBottom: "16px" }}>
            {category.title}
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.7", margin: 0 }}>
            {category.description}
          </p>
        </header>

        {/* Related Topic Clusters in this vertical */}
        {relatedTopics.length > 0 && (
          <div
            style={{
              padding: "24px",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-light)",
              marginBottom: "45px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <Layers size={18} style={{ color: "var(--accent-primary)" }} />
              <h2 style={{ fontSize: "1.05rem", fontWeight: 700, margin: 0 }}>
                Topical Clusters in this Vertical
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {relatedTopics.map((topic) => (
                <Link
                  key={topic.id}
                  href={`/topics/${topic.slug}`}
                  className="social-link-pill"
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", backgroundColor: "var(--bg-surface)" }}
                >
                  <span>{topic.title}</span>
                  <ArrowRight size={12} />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Articles List */}
        <div>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "24px" }}>
            Published Articles ({articles.length})
          </h2>
          {articles.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px" }}>
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div style={{ padding: "40px", textAlign: "center", backgroundColor: "var(--bg-secondary)", borderRadius: "var(--radius-md)" }}>
              <p style={{ margin: 0, color: "var(--text-secondary)" }}>No articles currently indexed in this vertical.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
