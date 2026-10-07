import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import BlogCard from "../Components/Blogcard";
import SEO from "../Components/SEO";
import { fallbackPosts } from "../data/blogPosts";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function getReadingTime(text = "") {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200));
}

function PostSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-gray-800 bg-[#111]"
    >
      <div className="aspect-[16/9] animate-pulse bg-gray-800" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 animate-pulse rounded bg-gray-800" />
        <div className="h-5 w-4/5 animate-pulse rounded bg-gray-800" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-800" />
      </div>
    </div>
  );
}

function Blog() {
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [loadStatus, setLoadStatus] = useState(
    isSupabaseConfigured ? "loading" : "unconfigured",
  );
  const [gameOpen, setGameOpen] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    const controller = new AbortController();
    let active = true;

    getSupabase()
      .from("posts")
      .select("title, slug, excerpt, content, image, category, tags, created_at")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .abortSignal(controller.signal)
      .then(({ data, error }) => {
        if (!active) return;
        if (error) {
          setLoadStatus("error");
          return;
        }
        setPublishedPosts(data || []);
        setLoadStatus(data?.length ? "ready" : "empty");
      })
      .catch(() => {
        if (active) setLoadStatus("error");
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

  const currentPosts = publishedPosts.map((post) => ({
    title: post.title,
    category: post.category,
    tags: post.tags || [],
    date: new Date(post.created_at).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    excerpt: post.excerpt,
    image: post.image || "/icons/blog-fallback.svg",
    readingTime: `${getReadingTime(post.content)} min read`,
    link: `/blog/${post.slug}`,
  }));
  const currentSlugs = new Set(publishedPosts.map((post) => post.slug));
  const mockPosts = fallbackPosts
    .filter((post) => !currentSlugs.has(post.slug))
    .map((post) => ({
      ...post,
      tags: [],
      readingTime: `${getReadingTime(post.excerpt)} min read`,
      link: `/blog/${post.slug}`,
    }));
  const posts =
    loadStatus === "ready"
      ? [...currentPosts, ...mockPosts]
      : fallbackPosts.map((post) => ({
          ...post,
          tags: [],
          readingTime: `${getReadingTime(post.excerpt)} min read`,
          link: `/blog/${post.slug}`,
        }));

  const siteUrl = (
    import.meta.env.VITE_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const collectionSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Srijan Prasad",
        url: `${siteUrl}/`,
      },
      {
        "@type": "CollectionPage",
        name: "Blog | Srijan Prasad",
        description:
          "Articles on software development, artificial intelligence, systems, and technology.",
        url: `${siteUrl}/blog`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: posts.map((post, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${siteUrl}${post.link}`,
            name: post.title,
          })),
        },
      },
    ],
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="px-4 overflow-hidden md:py-10"
    >
      <SEO
        title="Blog"
        description="Articles on software development, AI, systems engineering, and technology by Srijan Prasad."
        keywords={["software development", "artificial intelligence", "systems engineering"]}
        canonicalPath="/blog"
        structuredData={collectionSchema}
      />

      <div className="px-2 md:py-6">
        <section className="py-4">
          <h1 className="text-3xl font-bold text-white">Blog</h1>
          <p className="mt-1.5 max-w-xl text-sm text-gray-400">
            My articles on software development, AI, systems, and what I am
            learning.
          </p>
        </section>

        <section className="border-t border-gray-800 pt-8" aria-label="All blog articles">
          {loadStatus === "loading" ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fallbackPosts.slice(0, 6).map((post) => (
                <PostSkeleton key={post.slug} />
              ))}
            </div>
          ) : (
            <>
              {(loadStatus === "error" || loadStatus === "empty") && (
                <p
                  role={loadStatus === "error" ? "alert" : "status"}
                  className="mb-5 text-sm text-gray-400"
                >
                  {loadStatus === "error"
                    ? "Live posts are temporarily unavailable. Showing the article archive instead."
                    : "No live articles have been published yet. Showing the article archive instead."}
                </p>
              )}
              {!isSupabaseConfigured && (
                <p className="mb-5 text-sm text-gray-500">
                  Online publishing is not configured yet; showing the article
                  archive.
                </p>
              )}

              <Motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {posts.map((post) => (
                  <Motion.div key={post.link} variants={item}>
                    <BlogCard {...post} />
                  </Motion.div>
                ))}
              </Motion.div>
            </>
          )}
        </section>

        <section className="mt-10 border-t border-gray-800 py-8" aria-labelledby="arcade-title">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Take a break
              </p>
              <h2 id="arcade-title" className="mt-2 text-2xl font-semibold text-white">
                Pac-Man Arcade
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Play my game without leaving the blog.
              </p>
            </div>
            <button
              type="button"
              aria-expanded={gameOpen}
              aria-controls="blog-arcade-frame"
              onClick={() => setGameOpen((open) => !open)}
              className="rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2.5 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
            >
              {gameOpen ? "Close / Minimize Game" : "Take a Break / Launch Game"}
            </button>
          </div>

          {gameOpen && (
            <div
              id="blog-arcade-frame"
              className="mx-auto mt-6 h-[1066px] w-full max-w-[650px] overflow-hidden rounded-2xl border border-cyan-400/30 bg-[#080a18] shadow-[0_0_30px_rgba(34,211,238,0.08)] sm:aspect-[4/3] sm:h-auto"
            >
              <iframe
                src="https://pacman-nine-alpha.vercel.app/"
                title="Play Srijan's Pac-Man arcade game"
                sandbox="allow-scripts allow-same-origin allow-pointer-lock"
                allow="autoplay; fullscreen"
                referrerPolicy="no-referrer"
                className="h-full min-h-[1066px] w-full border-0 bg-[#080a18] sm:min-h-0"
              />
            </div>
          )}
        </section>

        <section className="mt-8 border-t border-gray-800 pt-6">
          <Link
            to="/admin"
            className="text-xs text-gray-600 transition hover:text-gray-400"
          >
            Author sign in
          </Link>
        </section>
      </div>
    </Motion.div>
  );
}

export default Blog;
