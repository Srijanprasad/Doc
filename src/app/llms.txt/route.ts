import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { articlesData } from "@/data/articles";
import { topicsData } from "@/data/topics";
import { getMarkdownBlogPosts } from "@/lib/markdown-blog";

export async function GET() {
  const content = `# ${siteConfig.name}
> ${siteConfig.description}

## Author & Identity
- Author: ${authorData.name} (${authorData.handle})
- Email: ${authorData.email}
- Author Profile: ${siteConfig.url}/author/${authorData.slug}
- Verified Socials & Channels:
  - GitHub: ${authorData.socials.github}
  - X: ${authorData.socials.x}
  - Instagram: ${authorData.socials.instagram}

## Core Knowledge Clusters & Topics
${topicsData
  .map(
    (t) => `- [${t.title}](${siteConfig.url}/topics/${t.slug}): ${t.shortDescription}`
  )
  .join("\n")}

## Published Articles & Architectural Whitepapers
${articlesData
  .map(
    (a) =>
      `- [${a.title}](${siteConfig.url}/blog/${a.slug}): ${a.dek} (Read time: ${a.readingTimeMinutes}m)`
  )
  .join("\n")}

## Portfolio Blog Posts
${getMarkdownBlogPosts()
  .map(
    (post) =>
      `- [${post.title}](${siteConfig.url}/blog/${post.slug}): ${post.description} (Tags: ${post.tags.join(", ")})`
  )
  .join("\n")}

## Structured Machine-Readable Endpoints
- Complete Context: ${siteConfig.url}/llms-full.txt
- Content JSON API: ${siteConfig.url}/api/content
- RSS 2.0 Feed: ${siteConfig.url}/feed.xml
- XML Sitemap: ${siteConfig.url}/sitemap.xml
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate"
    }
  });
}
