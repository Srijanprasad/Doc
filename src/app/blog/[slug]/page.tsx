import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { articlesData, getArticleBySlug, getRelatedArticles, Article } from "@/data/articles";
import { authorData } from "@/data/author";
import { siteConfig } from "@/data/siteConfig";
import { getArticleJsonLd, getBreadcrumbJsonLd, getFaqJsonLd } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TableOfContents } from "@/components/TableOfContents";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { AeoDirectAnswer } from "@/components/AeoDirectAnswer";
import { SourcesList } from "@/components/SourcesList";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SocialShare } from "@/components/SocialShare";
import { AuthorBox } from "@/components/AuthorBox";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { ArticleCard } from "@/components/ArticleCard";
import { Clock, Calendar, RefreshCw, ChevronLeft, ChevronRight, Hash } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getMarkdownBlogPost, getMarkdownBlogPosts } from "@/lib/markdown-blog";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const primarySlugs = articlesData.map((article) => ({
    slug: article.slug
  }));
  const markdownSlugs = getMarkdownBlogPosts().map((post) => ({
    slug: post.slug,
  }));

  const aliasSlugs = [
    { slug: "wordcamp-bhopal-2025-pattern-table-lead-open-source-community" },
    { slug: "capgemini-tit" },
    { slug: "capgemini-tit-industry-interaction" },
    { slug: "pewdiepie-openai-ban" },
    { slug: "pewdiepie-local-ai" },
    { slug: "openai-pewdiepie-distillation" },
    { slug: "gaurav-ghelani-session" },
    { slug: "kyc-smart-frameworks" },
    { slug: "gaurav-ghelani-tit" }
  ];

  return [...primarySlugs, ...markdownSlugs, ...aliasSlugs];
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const markdownPost = article ? undefined : getMarkdownBlogPost(slug);
  if (markdownPost) {
    const url = `${siteConfig.url}/blog/${markdownPost.slug}`;
    return {
      title: markdownPost.title,
      description: markdownPost.description,
      alternates: { canonical: url },
      authors: [{ name: authorData.name, url: `${siteConfig.url}/author/${authorData.slug}` }],
      openGraph: {
        type: "article",
        title: markdownPost.title,
        description: markdownPost.description,
        url,
        publishedTime: markdownPost.date,
        authors: [authorData.name],
        tags: markdownPost.tags,
        images: [{ url: markdownPost.image, alt: markdownPost.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: markdownPost.title,
        description: markdownPost.description,
        images: [markdownPost.image],
        creator: authorData.handle,
      },
    };
  }

  if (!article) {
    return {
      title: "Article Not Found"
    };
  }

  const url = `${siteConfig.url}/blog/${article.slug}`;

  return {
    title: article.title,
    description: article.dek,
    alternates: {
      canonical: url
    },
    authors: [{ name: authorData.name, url: `${siteConfig.url}/author/${authorData.slug}` }],
    openGraph: {
      title: article.title,
      description: article.dek,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [authorData.name],
      tags: article.entities,
      images: [
        {
          url: article.featuredImage,
          alt: article.featuredImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
      images: [article.featuredImage],
      creator: authorData.handle
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const markdownPost = article ? undefined : getMarkdownBlogPost(slug);
  if (markdownPost) {
    const articleUrl = `${siteConfig.url}/blog/${markdownPost.slug}`;
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: markdownPost.title,
      description: markdownPost.description,
      datePublished: markdownPost.date,
      image: [`${siteConfig.url}${markdownPost.image}`],
      author: {
        "@type": "Person",
        name: authorData.name,
        url: `${siteConfig.url}/author/${authorData.slug}`,
      },
      mainEntityOfPage: articleUrl,
      keywords: markdownPost.tags.join(", "),
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
          }}
        />
        <div className="container sleek-markdown-article-page">
          <article className="sleek-markdown-article">
            <Link href="/blog" className="sleek-inline-link">
              <ChevronLeft aria-hidden="true" size={16} /> Back to the blog
            </Link>
            <div className="sleek-article-tags">
              {markdownPost.tags.map((tag) => (
                <span className="sleek-skill" key={tag}>{tag}</span>
              ))}
            </div>
            <h1>{markdownPost.title}</h1>
            <p className="sleek-article-description">{markdownPost.description}</p>
            <div className="sleek-article-byline">
              <img src={authorData.avatar} alt="" width="36" height="36" />
              <span>{authorData.name}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={markdownPost.date}>
                {new Date(`${markdownPost.date}T00:00:00`).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
            <img
              className="sleek-article-featured-image"
              src={markdownPost.image}
              alt={markdownPost.title}
            />
            <div className="sleek-markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => {
                    const external = href?.startsWith("https://") || href?.startsWith("http://");
                    return (
                      <a
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noreferrer noopener" : undefined}
                      >
                        {children}
                      </a>
                    );
                  },
                  img: ({ src, alt }) => (
                    <img src={src || ""} alt={alt || ""} loading="lazy" />
                  ),
                }}
              >
                {markdownPost.content}
              </ReactMarkdown>
            </div>
            <SocialShare url={articleUrl} title={markdownPost.title} />
          </article>
        </div>
      </>
    );
  }

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article, 2);
  const articleUrl = `${siteConfig.url}/blog/${article.slug}`;

  // Find previous and next articles
  const currentIndex = articlesData.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? articlesData[currentIndex - 1] : null;
  const nextArticle = currentIndex < articlesData.length - 1 ? articlesData[currentIndex + 1] : null;

  // JSON-LD Schemas
  const articleSchema = getArticleJsonLd(article);
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Articles", url: `${siteConfig.url}/blog` },
    { name: article.categorySlug.replace("-", " "), url: `${siteConfig.url}/blog/category/${article.categorySlug}` },
    { name: article.title, url: articleUrl }
  ]);
  const faqSchema = getFaqJsonLd(article.faqs);

  const publishedDateFormatted = new Date(article.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  const updatedDateFormatted = new Date(article.updatedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="container" style={{ paddingBottom: "80px" }}>
        <article style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Header */}
          <header className="article-header">
            <Breadcrumbs
              items={[
                { name: "Articles", url: "/blog" },
                { name: article.categorySlug.replace("-", " "), url: `/blog/category/${article.categorySlug}` },
                { name: article.title, url: `/blog/${article.slug}` }
              ]}
            />

            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <Link
                href={`/blog/category/${article.categorySlug}`}
                className="badge badge-accent"
              >
                {article.categorySlug.replace("-", " ")}
              </Link>
              <span style={{ color: "var(--text-tertiary)", fontSize: "0.85rem" }}>•</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-tertiary)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                <Clock size={13} />
                {article.readingTimeMinutes} min read
              </span>
            </div>

            {/* Exactly One Primary H1 */}
            <h1 className="article-title">{article.title}</h1>

            {/* Article Dek / Summary */}
            <p className="article-dek">{article.dek}</p>

            {/* Byline */}
            <div className="article-byline">
              <div className="byline-author">
                <div className="byline-avatar" aria-hidden="true" style={{ overflow: "hidden", padding: 0 }}>
                  <img
                    src="/srijan-prasad-photo.jpg"
                    alt={authorData.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div>
                  <Link
                    href={`/author/${authorData.slug}`}
                    className="byline-name"
                    style={{ textDecoration: "underline", textUnderlineOffset: "2px" }}
                  >
                    {authorData.name}
                  </Link>
                  <div className="byline-meta">
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Calendar size={13} />
                      Published {publishedDateFormatted}
                    </span>
                    <span>•</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <RefreshCw size={12} />
                      Updated {updatedDateFormatted}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Author Profile pill */}
              <div style={{ display: "flex", gap: "8px" }}>
                <a
                  href={authorData.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-pill"
                  aria-label="Verified author on X"
                >
                  <span>@Ushan_0</span>
                </a>
              </div>
            </div>
          </header>

          {/* Featured Hero Image */}
          <div className="article-featured-media">
            <img
              src={article.featuredImage}
              alt={article.featuredImageAlt}
              className="article-hero-img"
              width={1400}
              height={788}
              fetchPriority="high"
            />
            <p className="article-hero-caption">{article.featuredImageAlt}</p>
          </div>

          {/* AEO Direct Answer Block */}
          <AeoDirectAnswer answer={article.aeoDirectAnswer} />

          {/* Key Takeaways */}
          <KeyTakeaways takeaways={article.keyTakeaways} />

          {/* Table of Contents */}
          <TableOfContents headings={article.headings} />

          {/* Article Main Body */}
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Entities & Concepts Graph Tags */}
          {article.entities && article.entities.length > 0 && (
            <div style={{ margin: "40px 0", padding: "20px 0", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-tertiary)", display: "block", marginBottom: "12px" }}>
                Referenced Knowledge Entities & Concepts
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {article.entities.map((entity) => (
                  <span
                    key={entity}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontSize: "0.82rem",
                      padding: "5px 12px",
                      borderRadius: "var(--radius-sm)",
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-light)",
                      color: "var(--text-primary)"
                    }}
                  >
                    <Hash size={12} style={{ color: "var(--accent-secondary)" }} />
                    {entity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sources and References */}
          <SourcesList sources={article.sources} />

          {/* Genuine FAQs */}
          <FAQAccordion faqs={article.faqs} />

          {/* Social Share Bar */}
          <SocialShare url={articleUrl} title={article.title} />

          {/* Previous / Next Article Navigation */}
          <nav
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              margin: "50px 0",
              padding: "24px 0",
              borderTop: "1px solid var(--border-light)",
              borderBottom: "1px solid var(--border-light)"
            }}
            aria-label="Previous and Next Articles"
          >
            {prevArticle ? (
              <Link
                href={`/blog/${prevArticle.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  padding: "16px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "var(--bg-surface)"
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  <ChevronLeft size={13} />
                  Previous Investigation
                </span>
                <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                  {prevArticle.title}
                </span>
              </Link>
            ) : <div />}

            {nextArticle ? (
              <Link
                href={`/blog/${nextArticle.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  padding: "16px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border-light)",
                  backgroundColor: "var(--bg-surface)",
                  textAlign: "right",
                  alignItems: "flex-end"
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  Next Investigation
                  <ChevronRight size={13} />
                </span>
                <span style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                  {nextArticle.title}
                </span>
              </Link>
            ) : <div />}
          </nav>

          {/* Author Box */}
          <AuthorBox />

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <section style={{ margin: "60px 0" }} aria-labelledby="related-heading">
              <h3 id="related-heading" style={{ fontSize: "1.45rem", marginBottom: "22px" }}>
                Related Research & Syntheses
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
                {relatedArticles.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} />
                ))}
              </div>
            </section>
          )}

          {/* Newsletter CTA */}
          <NewsletterSignup />
        </article>
      </div>
    </>
  );
}
