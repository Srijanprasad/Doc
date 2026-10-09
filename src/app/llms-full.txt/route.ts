import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { articlesData } from "@/data/articles";
import { getMarkdownBlogPosts } from "@/lib/markdown-blog";

export async function GET() {
  let fullDoc = `# ${siteConfig.name} — Full Knowledge Corpus
Author: ${authorData.name} (${authorData.handle})
Email: ${authorData.email}
Canonical Base: ${siteConfig.url}
Verified Channels:
- GitHub: ${authorData.socials.github}
- X: ${authorData.socials.x}
- Instagram: ${authorData.socials.instagram}

---
`;

  articlesData.forEach((article) => {
    fullDoc += `
# Article: ${article.title}
- URL: ${siteConfig.url}/blog/${article.slug}
- Category: ${article.categorySlug}
- Published: ${article.publishedAt}
- Updated: ${article.updatedAt}
- Entities: ${article.entities.join(", ")}

## Summary / Dek
${article.dek}

## Direct Synthesis (AEO Answer)
${article.aeoDirectAnswer}

## Key Takeaways
${article.keyTakeaways.map((t) => `- ${t}`).join("\n")}

## Frequently Asked Questions
${article.faqs.map((f) => `### Q: ${f.question}\nA: ${f.answer}`).join("\n\n")}

## Verified Sources & References
${article.sources.map((s) => `- ${s.author} (${s.publishedDate}). "${s.title}". ${s.publisher}. URL: ${s.url}`).join("\n")}

---
`;
  });

  getMarkdownBlogPosts().forEach((post) => {
    fullDoc += `
# Blog Post: ${post.title}
- URL: ${siteConfig.url}/blog/${post.slug}
- Published: ${post.date}
- Tags: ${post.tags.join(", ")}
- Featured image: ${siteConfig.url}${post.image}

## Summary
${post.description}

## Article
${post.content}

---
`;
  });

  return new NextResponse(fullDoc, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate"
    }
  });
}
