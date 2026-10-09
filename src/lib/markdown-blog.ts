import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface MarkdownBlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  tags: string[];
  image: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), "src/content/blog");

function requiredString(
  metadata: Record<string, unknown>,
  key: string,
  fileName: string,
) {
  const value = metadata[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Blog post "${fileName}" requires a non-empty "${key}".`);
  }
  return value.trim();
}

function parsePost(fileName: string): MarkdownBlogPost {
  const source = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
  const parsed = matter(source);
  const metadata = parsed.data as Record<string, unknown>;
  const slug = requiredString(metadata, "slug", fileName);
  const dateValue = metadata.date;
  const date =
    dateValue instanceof Date
      ? dateValue.toISOString().slice(0, 10)
      : requiredString(metadata, "date", fileName);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`Blog post "${fileName}" has an invalid slug "${slug}".`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`))) {
    throw new Error(`Blog post "${fileName}" must use a YYYY-MM-DD date.`);
  }

  const tags = metadata.tags;
  if (!Array.isArray(tags) || !tags.every((tag) => typeof tag === "string")) {
    throw new Error(`Blog post "${fileName}" requires a list of string tags.`);
  }

  const image = requiredString(metadata, "image", fileName);
  if (!image.startsWith("/") && !image.startsWith("https://")) {
    throw new Error(`Blog post "${fileName}" image must be a local path or HTTPS URL.`);
  }

  const content = parsed.content.trim();
  if (!content) {
    throw new Error(`Blog post "${fileName}" cannot have an empty Markdown body.`);
  }

  return {
    title: requiredString(metadata, "title", fileName),
    slug,
    description: requiredString(metadata, "description", fileName),
    date,
    tags,
    image,
    content,
  };
}

export function getMarkdownBlogPosts(): MarkdownBlogPost[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(parsePost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getMarkdownBlogPost(slug: string) {
  return getMarkdownBlogPosts().find((post) => post.slug === slug);
}
