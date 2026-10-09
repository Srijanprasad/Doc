import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { Article } from "@/data/articles";

export function getWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    "name": siteConfig.name,
    "url": siteConfig.url,
    "description": siteConfig.description,
    "publisher": {
      "@type": "Person",
      "@id": `${siteConfig.url}/#author`,
      "name": authorData.name,
      "url": `${siteConfig.url}/author/${authorData.slug}`,
      "sameAs": [
        authorData.socials.github,
        authorData.socials.x,
        authorData.socials.instagram
      ]
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    },
    "inLanguage": siteConfig.language
  };
}

export function getAuthorJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.url}/#author`,
    "name": authorData.name,
    "email": authorData.email,
    "url": `${siteConfig.url}/author/${authorData.slug}`,
    "jobTitle": authorData.role,
    "description": authorData.biography,
    "sameAs": [
      authorData.socials.github,
      authorData.socials.x,
      authorData.socials.instagram
    ],
    "knowsAbout": authorData.topics
  };
}

export function getArticleJsonLd(article: Article) {
  const canonicalUrl = `${siteConfig.url}/blog/${article.slug}`;

  const schema: any = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#article`,
    "isPartOf": {
      "@type": "Blog",
      "@id": `${siteConfig.url}/blog#blog`,
      "name": `${siteConfig.shortName} Editorial Articles`,
      "publisher": {
        "@type": "Person",
        "name": authorData.name
      }
    },
    "headline": article.title,
    "description": article.dek,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "url": canonicalUrl,
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt,
    "author": {
      "@type": "Person",
      "@id": `${siteConfig.url}/#author`,
      "name": authorData.name,
      "email": authorData.email,
      "url": `${siteConfig.url}/author/${authorData.slug}`,
      "sameAs": [
        authorData.socials.github,
        authorData.socials.x,
        authorData.socials.instagram
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": authorData.name,
      "url": siteConfig.url
    },
    "image": {
      "@type": "ImageObject",
      "url": article.featuredImage,
      "caption": article.featuredImageAlt
    },
    "articleSection": article.categorySlug,
    "keywords": article.entities.join(", "),
    "about": article.entities.map((entity) => ({
      "@type": "Thing",
      "name": entity
    })),
    "citation": article.sources.map((s) => ({
      "@type": "CreativeWork",
      "name": s.title,
      "publisher": s.publisher,
      "url": s.url
    })),
    "timeRequired": `PT${article.readingTimeMinutes}M`,
    "inLanguage": siteConfig.language
  };

  return schema;
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}
