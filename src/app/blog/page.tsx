import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { articlesData } from "@/data/articles";
import { getBreadcrumbJsonLd } from "@/lib/seo";
import { BlogClient } from "./BlogClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getMarkdownBlogPosts } from "@/lib/markdown-blog";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const title = "Blog";
const description =
  "Notes and articles by Srijan Prasad on software development, cloud, automation, and practical AI.";
const image = "/srijan-prasad-avatar.png";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "software engineering",
    "artificial intelligence",
    "generative engine optimization",
    "web performance",
    "personal knowledge systems",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    type: "website",
    title,
    description,
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    images: [{ url: image, alt: `${authorData.name} editorial blog` }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: authorData.handle,
    images: [image],
  },
};

export default function BlogIndexPage() {
  const markdownPosts = getMarkdownBlogPosts();
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/blog#collection`,
    name: title,
    description,
    url: `${siteConfig.url}/blog`,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        ...markdownPosts.map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteConfig.url}/blog/${post.slug}`,
          name: post.title,
        })),
        ...articlesData.map((article, index) => ({
        "@type": "ListItem",
        position: markdownPosts.length + index + 1,
        url: `${siteConfig.url}/blog/${article.slug}`,
        name: article.title,
        })),
      ],
    },
  };
  const breadcrumbSchema = getBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Articles", url: `${siteConfig.url}/blog` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container sleek-blog-page">
        <Breadcrumbs items={[{ name: "Articles", url: "/blog" }]} />

        <header className="sleek-blog-heading">
          <p className="sleek-eyebrow">Notes & ideas</p>
          <h1>{title}</h1>
          <p>
            Writing on software engineering, cloud, automation, and things I’m
            learning along the way.
          </p>
        </header>

        <section className="sleek-blog-index-section" aria-labelledby="latest-posts-heading">
          <div className="sleek-section-heading">
            <div>
              <p className="sleek-eyebrow">From the notebook</p>
              <h2 id="latest-posts-heading">Latest posts</h2>
            </div>
          </div>
          <div className="sleek-blog-grid">
            {markdownPosts.map((post) => (
              <article className="sleek-blog-card" key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="sleek-blog-image-wrap">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </Link>
                <div className="sleek-blog-card-body">
                  <time dateTime={post.date}>
                    {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.description}</p>
                  <div className="sleek-skill-row">
                    {post.tags.map((tag) => (
                      <span className="sleek-skill" key={tag}>{tag}</span>
                    ))}
                  </div>
                  <Link href={`/blog/${post.slug}`} className="sleek-text-link">
                    Read article <ArrowUpRight aria-hidden="true" size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="sleek-blog-archive" aria-labelledby="archive-heading">
          <div className="sleek-section-heading">
            <div>
              <p className="sleek-eyebrow">From the archive</p>
              <h2 id="archive-heading">Articles & research</h2>
            </div>
          </div>
          <BlogClient />
        </section>
      </div>
    </>
  );
}
