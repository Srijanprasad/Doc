import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import MarkdownBody from "../Components/MarkdownBody";
import SEO from "../Components/SEO";
import { fallbackPosts } from "../data/blogPosts";
import { getSupabase, isSupabaseConfigured } from "../lib/supabase";

function getReadingTime(text = "") {
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200));
}

function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState(
    isSupabaseConfigured ? "loading" : "fallback",
  );
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPost() {
      if (isSupabaseConfigured) {
        try {
          const { data, error } = await getSupabase()
            .from("posts")
            .select(
              "title, slug, excerpt, content, image, category, tags, created_at, published",
            )
            .eq("slug", slug)
            .eq("published", true)
            .maybeSingle();

          if (error) throw error;
          if (!active) return;
          if (data) {
            setPost(data);
            setStatus("ready");
            return;
          }
        } catch {
          if (!active) return;
          setStatus("fallback");
        }
      }

      if (!active) return;
      const archivedPost = fallbackPosts.find((item) => item.slug === slug);
      setPost(
        archivedPost
          ? {
              ...archivedPost,
              content: "",
              created_at: archivedPost.published_at,
              tags: [],
            }
          : null,
      );
      setStatus(archivedPost ? "ready" : "not-found");
    }

    loadPost();
    return () => {
      active = false;
    };
  }, [slug]);

  const siteUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || window.location.origin
  ).replace(/\/$/, "");
  const canonicalUrl = `${siteUrl}/blog/${slug}`;
  const postSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.image || undefined,
        datePublished: post.created_at,
        dateModified: post.updated_at || post.created_at,
        author: {
          "@type": "Person",
          name: "Srijan Prasad",
        },
        mainEntityOfPage: canonicalUrl,
        keywords: post.tags?.join(", "),
      }
    : null;

  async function copyArticleLink() {
    setCopyMessage("");
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyMessage("Article link copied.");
    } catch {
      setCopyMessage("Could not copy the link. Copy it from your address bar.");
    }
  }

  return (
    <Motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-8 md:py-10"
    >
      {post && (
        <SEO
          title={post.title}
          description={post.excerpt}
          keywords={post.tags || []}
          type="article"
          image={post.image}
          canonicalPath={`/blog/${post.slug}`}
          structuredData={postSchema}
        />
      )}

      <Link
        to="/blog"
        className="text-sm text-cyan-300 transition hover:text-cyan-200"
      >
        ← Back to Blog
      </Link>

      {status === "loading" && (
        <div role="status" className="mx-auto max-w-3xl animate-pulse py-14">
          <div className="h-8 w-3/4 rounded bg-gray-800" />
          <div className="mt-5 h-4 w-1/3 rounded bg-gray-800" />
          <div className="mt-10 space-y-3">
            <div className="h-4 rounded bg-gray-800" />
            <div className="h-4 rounded bg-gray-800" />
            <div className="h-4 w-5/6 rounded bg-gray-800" />
          </div>
        </div>
      )}
      {status === "not-found" && (
        <p role="status" className="py-16 text-center text-gray-400">
          This article could not be found.
        </p>
      )}
      {status === "fallback" && (
        <p className="mx-auto mt-6 max-w-3xl text-sm text-gray-500">
          Showing the archive copy while live posts are unavailable.
        </p>
      )}

      {status === "ready" && post && (
        <article className="mx-auto max-w-3xl pt-8">
          {post.image && (
            <img
              src={post.image}
              alt=""
              className="mb-8 max-h-[28rem] w-full rounded-2xl border border-gray-800 object-cover"
            />
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-gray-400">
            {post.category && (
              <span className="font-semibold uppercase tracking-wide text-cyan-300">
                {post.category}
              </span>
            )}
            <time dateTime={post.created_at}>
              {new Date(post.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>
            <span>{getReadingTime(post.content || post.excerpt)} min read</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg leading-relaxed text-gray-400">
              {post.excerpt}
            </p>
          )}
          {post.tags?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-gray-700 bg-gray-900 px-2.5 py-1 text-xs text-gray-300"
                >
                  {tag}
                </span>
              ))}
          </div>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={copyArticleLink}
              className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-200 transition hover:border-gray-500 hover:bg-gray-900"
            >
              Copy article link
            </button>
            {copyMessage && (
              <span role="status" className="text-xs text-gray-400">
                {copyMessage}
              </span>
            )}
          </div>
          <hr className="my-8 border-gray-800" />

          {post.content ? (
            <MarkdownBody content={post.content} />
          ) : (
            <div className="rounded-xl border border-gray-800 bg-[#111] p-5">
              <p className="leading-7 text-gray-300">{post.excerpt}</p>
            </div>
          )}
        </article>
      )}
    </Motion.main>
  );
}

export default BlogPost;
