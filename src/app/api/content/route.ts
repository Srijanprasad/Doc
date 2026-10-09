import { NextResponse } from "next/server";
import { articlesData } from "@/data/articles";
import { categories } from "@/data/categories";
import { topicsData } from "@/data/topics";
import { authorData } from "@/data/author";
import { getMarkdownBlogPosts } from "@/lib/markdown-blog";

export async function GET() {
  return NextResponse.json({
    platform: "Srijan Prasad — Editorial & Knowledge Platform",
    author: {
      name: authorData.name,
      slug: authorData.slug,
      socials: authorData.socials,
      role: authorData.role
    },
    taxonomy: {
      categories,
      topics: topicsData
    },
    articles: articlesData.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      dek: a.dek,
      categorySlug: a.categorySlug,
      topicSlugs: a.topicSlugs,
      publishedAt: a.publishedAt,
      updatedAt: a.updatedAt,
      readingTimeMinutes: a.readingTimeMinutes,
      aeoDirectAnswer: a.aeoDirectAnswer,
      keyTakeaways: a.keyTakeaways,
      entities: a.entities,
      sources: a.sources,
      faqs: a.faqs
    })),
    markdownPosts: getMarkdownBlogPosts().map((post) => ({
      title: post.title,
      slug: post.slug,
      description: post.description,
      date: post.date,
      tags: post.tags,
      image: post.image,
      url: `/blog/${post.slug}`,
    })),
  });
}
