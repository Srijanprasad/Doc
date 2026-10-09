import { NextResponse } from "next/server";
import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { articlesData } from "@/data/articles";
import { getMarkdownBlogPosts } from "@/lib/markdown-blog";

export async function GET() {
  const markdownItems = getMarkdownBlogPosts()
    .map((post) => {
      const postUrl = `${siteConfig.url}/blog/${post.slug}`;
      return `
    <item>
      <title><![CDATA[${post.title.replaceAll("]]>", "]]]]><![CDATA[>")}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${post.description.replaceAll("]]>", "]]]]><![CDATA[>")}]]></description>
      <pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate>
      <author>${authorData.name}</author>
      ${post.tags.map((tag) => `<category><![CDATA[${tag}]]></category>`).join("")}
    </item>`;
    })
    .join("");

  const archiveItems = articlesData
    .map((article) => {
      const pubDate = new Date(article.publishedAt).toUTCString();
      const articleUrl = `${siteConfig.url}/blog/${article.slug}`;

      return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <description><![CDATA[${article.dek}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${authorData.name}</author>
      <category>${article.categorySlug}</category>
    </item>`;
    })
    .join("");
  const rssItems = `${markdownItems}${archiveItems}`;

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.name}]]></title>
    <link>${siteConfig.url}</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <language>${siteConfig.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml"/>
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate"
    }
  });
}
