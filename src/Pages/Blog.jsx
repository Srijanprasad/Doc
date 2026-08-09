import { useCallback, useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import BlogCard from "../Components/Blogcard";

const MEDIUM_USERNAME = "srijanprasad2006";
const RSS_FEED = `https://medium.com/feed/@${MEDIUM_USERNAME}`;
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_FEED)}`;
const MAX_POSTS = 6;
const FALLBACK_IMAGE = "/icons/blog-fallback.svg";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function stripHtmlAndTruncate(html, max = 120) {
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#\d+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > max ? `${text.slice(0, max).trim()}...` : text;
}

function extractFirstImage(content) {
  const imgTags = content.match(/<img[^>]+>/gi) || [];
  const srcPattern = /src=["']([^"']+)["']/i;
  for (const tag of imgTags) {
    if (/medium\.com\/_\/stat|width=["']?1["']?\s+height=["']?1["']?/i.test(tag)) {
      continue;
    }
    const match = tag.match(srcPattern);
    if (match) return match[1];
  }
  return null;
}

function formatDate(pubDate) {
  const date = new Date(pubDate);
  if (Number.isNaN(date.getTime())) return "Recent";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-10 h-10 border-4 border-gray-700 border-t-white rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">Fetching latest articles from Medium...</p>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
      <svg
        className="w-12 h-12 text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
      <div>
        <h3 className="text-white font-semibold">Couldn't load articles</h3>
        <p className="text-gray-500 text-sm mt-1 max-w-sm">
          Something went wrong while fetching my latest Medium posts. Please try
          again in a moment.
        </p>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="mt-1 px-5 py-2.5 text-sm font-medium text-white bg-[#1E1E1E] border border-gray-700 rounded-xl hover:bg-[#525252] hover:border-gray-600 transition duration-300"
      >
        Try Again
      </button>
    </div>
  );
}

function Blog() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (
          data.status !== "ok" ||
          !Array.isArray(data.items) ||
          data.items.length === 0
        ) {
          throw new Error("No posts returned from the feed");
        }
        setPosts(data.items.slice(0, MAX_POSTS));
        setStatus("ready");
      })
      .catch((err) => {
        if (err.name !== "AbortError") setStatus("error");
      });

    return () => controller.abort();
  }, [reloadKey]);

  const handleRetry = useCallback(() => {
    setStatus("loading");
    setReloadKey((k) => k + 1);
  }, []);

  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="px-4 md:py-10 overflow-hidden"
    >
      <div className="px-4 md:py-10">
        <section className="py-4">
          <h2 className="text-3xl font-bold text-white">Blog</h2>
          <p className="text-gray-500 text-sm mt-1.5 max-w-xl">
            My latest articles on software development, tech, and everything I
            am learning.
          </p>
        </section>

        <div className="w-full border-t border-gray-800"></div>

        <section className="pt-8">
          {status === "loading" && <LoadingState />}

          {status === "error" && <ErrorState onRetry={handleRetry} />}

          {status === "ready" && (
            <Motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {posts.map((post) => {
                const image =
                  post.thumbnail ||
                  extractFirstImage(post.content || "") ||
                  FALLBACK_IMAGE;

                return (
                  <Motion.div key={post.guid || post.link} variants={item}>
                    <BlogCard
                      image={image}
                      title={post.title || "Untitled"}
                      date={formatDate(post.pubDate)}
                      excerpt={stripHtmlAndTruncate(post.content || "")}
                      link={post.link}
                    />
                  </Motion.div>
                );
              })}
            </Motion.div>
          )}
        </section>
      </div>

      <div className="w-full border-t border-gray-800 mt-10"></div>
    </Motion.div>
  );
}

export default Blog;