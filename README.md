
# Srijan Prasad Portfolio

This project uses the Next.js App Router. The portfolio remains available at
its existing routes, and the editorial blog is served from the same domain.

## Development

```sh
npm install
npm run dev
```

Use `npm run build` to create a production build and `npm run start` to serve it.
The deployment should use the repository root as its project root.

## Blog and SEO

Add new portfolio blog posts as Markdown files in `src/content/blog/`. Each
file uses YAML frontmatter for its title, URL slug, description, publication
date, tags, and featured image:

```md
---
title: "A clear post title"
slug: "a-clear-post-title"
description: "A short summary shown on the blog card and in search results."
date: "2026-10-09"
tags:
  - Software Engineering
  - Learning
image: "/blog/my-featured-image.jpg"
---

Write the article here using Markdown.
```

Put local images in `public/` and reference them with a leading `/`, or use an
HTTPS image URL. Posts support headings, paragraphs, links, images, lists,
blockquotes, tables, and fenced code blocks. The slug creates
`/blog/a-clear-post-title`; post metadata is used for page titles, canonical
URLs, Open Graph, Twitter cards, and structured data. New posts appear on the
home page and in the Latest posts section automatically.

The existing technical research archive remains available below the new posts
on `/blog`; its original articles, topic/category pages, author hub, and RSS
feed continue to use `src/data/articles.ts`.

Set the public site URL and client-side integrations in `.env.local` using the
variables documented in `.env.example`.
