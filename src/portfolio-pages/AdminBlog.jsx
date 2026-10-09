import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import MarkdownBody from "../Components/MarkdownBody";
import SEO from "../Components/SEO";
import {
  adminEmail,
  getSupabase,
  isSupabaseConfigured,
} from "../lib/supabase";

const emptyPost = {
  id: null,
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  category: "",
  tags: "",
  published: false,
};

const fieldClass =
  "mt-1 w-full rounded-lg border border-gray-700 bg-[#090909] px-3 py-2.5 text-white outline-none placeholder:text-gray-600 focus:border-cyan-400";

function slugify(value) {
  return value
    .normalize("NFKD")
    .toLowerCase()
    .trim()
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function AdminBlog() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(isSupabaseConfigured);
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(emptyPost);
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(false);
  const isOwner =
    Boolean(user?.email) && user.email.toLowerCase() === adminEmail;

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let active = true;
    const supabase = getSupabase();
    supabase.auth
      .getSession()
      .then(({ data, error: sessionError }) => {
        if (!active) return;
        if (sessionError) setError(sessionError.message);
        setUser(data.session?.user || null);
        setCheckingSession(false);
      })
      .catch((sessionError) => {
        if (!active) return;
        setError(`Could not check your session: ${sessionError.message}`);
        setCheckingSession(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isOwner) return undefined;

    let active = true;
    setLoadingPosts(true);
    getSupabase()
      .from("posts")
      .select(
        "id, title, slug, excerpt, content, image, category, tags, published, created_at, updated_at",
      )
      .order("updated_at", { ascending: false })
      .then(({ data, error: queryError }) => {
        if (!active) return;
        if (queryError) {
          setError(`Could not load posts: ${queryError.message}`);
        } else {
          setPosts(data || []);
        }
        setLoadingPosts(false);
      })
      .catch((queryError) => {
        if (!active) return;
        setError(`Could not load posts: ${queryError.message}`);
        setLoadingPosts(false);
      });

    return () => {
      active = false;
    };
  }, [isOwner]);

  async function signInWithGitHub() {
    setError("");
    try {
      const { error: authError } = await getSupabase().auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/admin`,
        },
      });
      if (authError) setError(`GitHub sign-in failed: ${authError.message}`);
    } catch (authError) {
      setError(`GitHub sign-in failed: ${authError.message}`);
    }
  }

  async function signOut() {
    setError("");
    try {
      const { error: authError } = await getSupabase().auth.signOut();
      if (authError) setError(`Sign-out failed: ${authError.message}`);
      else {
        setUser(null);
        setPost(emptyPost);
      }
    } catch (authError) {
      setError(`Sign-out failed: ${authError.message}`);
    }
  }

  async function savePost(published) {
    setError("");
    setMessage("");

    const title = post.title.trim();
    const slug = slugify(post.slug || title);
    const content = post.content.trim();
    if (!title || !slug || !content) {
      setError("A title and article content are required.");
      return;
    }

    setSaving(true);
    const now = new Date().toISOString();
    const payload = {
      ...(post.id ? { id: post.id } : {}),
      title,
      slug,
      excerpt: post.excerpt.trim(),
      content,
      image: post.image.trim() || null,
      category: post.category.trim(),
      tags: post.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      published,
      updated_at: now,
      ...(post.id ? {} : { created_at: now }),
    };

    try {
      const query = getSupabase().from("posts");
      const { data, error: saveError } = post.id
        ? await query
            .update(payload)
            .eq("id", post.id)
            .select(
              "id, title, slug, excerpt, content, image, category, tags, published, created_at, updated_at",
            )
            .single()
        : await query
            .insert(payload)
            .select(
              "id, title, slug, excerpt, content, image, category, tags, published, created_at, updated_at",
            )
            .single();
      if (saveError) throw saveError;

      setPost({
        ...data,
        tags: (data.tags || []).join(", "),
      });
      setPosts((current) => [
        data,
        ...current.filter((item) => item.id !== data.id),
      ]);
      setMessage(published ? "Article published." : "Draft saved.");
    } catch (saveError) {
      setError(`Could not save article: ${saveError.message}`);
    } finally {
      setSaving(false);
    }
  }

  if (!isSupabaseConfigured) {
    return <AdminMessage>Set the Supabase environment variables to enable publishing.</AdminMessage>;
  }

  if (checkingSession) {
    return <AdminMessage>Checking your secure session…</AdminMessage>;
  }

  if (!user) {
    return (
      <AdminMessage
        title="Sign in to publish"
        error={error}
        action={
          <button
            type="button"
            onClick={signInWithGitHub}
            className="mt-6 rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-[#081014] hover:bg-cyan-400"
          >
            Continue with GitHub
          </button>
        }
      >
        Only the authorized author account can open the publishing dashboard.
      </AdminMessage>
    );
  }

  if (!isOwner) return null;

  return (
    <Motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-8 md:py-10"
    >
      <SEO
        title="Blog publishing dashboard"
        description="Private blog publishing dashboard."
        canonicalPath="/admin"
        structuredData={null}
        noIndex
      />

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Private dashboard
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white">Blog editor</h1>
          <p className="mt-1 text-sm text-gray-400">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
        >
          Sign out
        </button>
      </header>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]">
        <section className="min-w-0 rounded-2xl border border-gray-800 bg-[#101010] p-4 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">
              {post.id ? "Edit article" : "New article"}
            </h2>
            <button
              type="button"
              onClick={() => {
                setPost(emptyPost);
                setPreview(false);
                setMessage("");
                setError("");
              }}
              className="text-sm text-cyan-300 hover:text-cyan-200"
            >
              New post
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <EditorField label="Title">
              <input
                value={post.title}
                onChange={(event) => {
                  const title = event.target.value;
                  setPost((current) => ({
                    ...current,
                    title,
                    slug:
                      current.id ||
                      (current.slug && current.slug !== slugify(current.title))
                        ? current.slug
                        : slugify(title),
                  }));
                }}
                maxLength={180}
                required
                className={fieldClass}
              />
            </EditorField>
            <EditorField label="Slug">
              <input
                value={post.slug}
                onChange={(event) =>
                  setPost((current) => ({
                    ...current,
                    slug: slugify(event.target.value),
                  }))
                }
                required
                className={fieldClass}
              />
            </EditorField>
            <EditorField label="Category">
              <input
                value={post.category}
                onChange={(event) =>
                  setPost((current) => ({
                    ...current,
                    category: event.target.value,
                  }))
                }
                maxLength={80}
                className={fieldClass}
              />
            </EditorField>
            <EditorField label="Tags (comma-separated)">
              <input
                value={post.tags}
                onChange={(event) =>
                  setPost((current) => ({ ...current, tags: event.target.value }))
                }
                className={fieldClass}
              />
            </EditorField>
            <EditorField label="Cover image URL">
              <input
                type="url"
                value={post.image || ""}
                onChange={(event) =>
                  setPost((current) => ({ ...current, image: event.target.value }))
                }
                className={`${fieldClass} sm:col-span-2`}
              />
            </EditorField>
            <EditorField label="Excerpt">
              <textarea
                value={post.excerpt}
                onChange={(event) =>
                  setPost((current) => ({
                    ...current,
                    excerpt: event.target.value,
                  }))
                }
                rows={3}
                maxLength={300}
                className={`${fieldClass} sm:col-span-2`}
              />
            </EditorField>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <label
              htmlFor="markdown-content"
              className="text-sm font-medium text-gray-200"
            >
              Article (Markdown)
            </label>
            <button
              type="button"
              onClick={() => setPreview((current) => !current)}
              className="text-sm text-cyan-300 hover:text-cyan-200"
            >
              {preview ? "Edit Markdown" : "Preview"}
            </button>
          </div>

          {preview ? (
            <div className="mt-2 min-h-72 rounded-lg border border-gray-700 bg-[#0b0b0b] p-4">
              {post.content ? (
                <MarkdownBody content={post.content} />
              ) : (
                <p className="text-sm text-gray-500">
                  Markdown preview will appear here.
                </p>
              )}
            </div>
          ) : (
            <textarea
              id="markdown-content"
              value={post.content}
              onChange={(event) =>
                setPost((current) => ({
                  ...current,
                  content: event.target.value,
                }))
              }
              required
              rows={18}
              placeholder={"# Your article title\n\nWrite your article in Markdown…"}
              className={`${fieldClass} mt-2 min-h-72 font-mono text-sm leading-6`}
            />
          )}

          {error && (
            <p role="alert" className="mt-4 text-sm text-red-300">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="mt-4 text-sm text-emerald-300">
              {message}
            </p>
          )}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => savePost(false)}
              className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Save draft"}
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={() => savePost(true)}
              className="rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-[#081014] hover:bg-cyan-400 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Publish"}
            </button>
          </div>
        </section>

        <aside className="rounded-2xl border border-gray-800 bg-[#101010] p-4 sm:p-5">
          <h2 className="font-semibold text-white">Posts</h2>
          {loadingPosts && (
            <p role="status" className="mt-3 text-sm text-gray-500">
              Loading posts…
            </p>
          )}
          <div className="mt-4 space-y-2">
            {posts.map((savedPost) => (
              <button
                type="button"
                key={savedPost.id}
                onClick={() =>
                  setPost({ ...savedPost, tags: savedPost.tags.join(", ") })
                }
                className="w-full rounded-lg border border-gray-800 p-3 text-left transition hover:border-gray-600"
              >
                <span className="block line-clamp-2 text-sm font-medium text-white">
                  {savedPost.title}
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  {savedPost.published ? "Published" : "Draft"} · /{savedPost.slug}
                </span>
              </button>
            ))}
            {!loadingPosts && posts.length === 0 && (
              <p className="text-sm text-gray-500">No posts yet.</p>
            )}
          </div>
        </aside>
      </div>
    </Motion.main>
  );
}

function EditorField({ label, children }) {
  return (
    <label className="block text-sm text-gray-300">
      {label}
      {children}
    </label>
  );
}

function AdminMessage({ title = "Blog publishing", children, action, error }) {
  return (
    <Motion.main
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-4 text-center"
    >
      <SEO
        title="Blog publishing"
        description="Private blog publishing dashboard."
        canonicalPath="/admin"
        structuredData={null}
        noIndex
      />
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-3 text-sm leading-relaxed text-gray-400">{children}</p>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {error}
        </p>
      )}
      {action}
    </Motion.main>
  );
}

export default AdminBlog;
