"use client";

import { useState, useMemo } from "react";
import { articlesData, Article } from "@/data/articles";
import { categories } from "@/data/categories";
import { topicsData } from "@/data/topics";
import { ArticleCard } from "@/components/ArticleCard";
import { Search, Filter, ArrowUpDown, X } from "lucide-react";

export function BlogClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "readingTime">("newest");

  const filteredArticles = useMemo(() => {
    return articlesData
      .filter((article) => {
        // Category filter
        if (selectedCategory !== "all" && article.categorySlug !== selectedCategory) {
          return false;
        }

        // Topic filter
        if (selectedTopic !== "all" && !article.topicSlugs.includes(selectedTopic)) {
          return false;
        }

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = article.title.toLowerCase().includes(q);
          const matchDek = article.dek.toLowerCase().includes(q);
          const matchEntity = article.entities.some((e) => e.toLowerCase().includes(q));
          if (!matchTitle && !matchDek && !matchEntity) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        }
        if (sortBy === "popular") {
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
        }
        if (sortBy === "readingTime") {
          return a.readingTimeMinutes - b.readingTimeMinutes;
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedTopic, sortBy]);

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all" || selectedTopic !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTopic("all");
    setSortBy("newest");
  };

  return (
    <div>
      {/* Search & Filter Toolbar */}
      <div className="blog-filter-toolbar">
        <div className="blog-filter-grid">
          {/* Search Input */}
          <div className="blog-filter-search">
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-tertiary)"
              }}
            />
            <input
              type="text"
              placeholder="Search title, concepts, or entities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field"
              style={{ paddingLeft: "38px" }}
              aria-label="Filter articles by query"
            />
          </div>

          {/* Category Dropdown */}
          <div className="blog-filter-control">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
              aria-label="Filter by editorial vertical"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>

          {/* Topic Dropdown */}
          <div className="blog-filter-control">
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="input-field"
              aria-label="Filter by knowledge topic"
            >
              <option value="all">All Topics</option>
              {topicsData.map((topic) => (
                <option key={topic.id} value={topic.slug}>
                  {topic.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="blog-filter-control">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="input-field"
              aria-label="Sort articles order"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="popular">Sort: Editor's Choice</option>
              <option value="readingTime">Sort: Shortest Read</option>
            </select>
          </div>
        </div>

        {hasActiveFilters && (
          <div className="blog-filter-feedback">
            <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Found <strong>{filteredArticles.length}</strong> matching editorial piece{filteredArticles.length === 1 ? "" : "s"}
            </span>
            <button
              onClick={clearFilters}
              className="btn btn-ghost btn-sm"
              style={{ display: "inline-flex", gap: "4px", fontSize: "0.8rem" }}
            >
              <X size={14} />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Article Grid */}
      {filteredArticles.length > 0 ? (
        <div className="blog-results-grid">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            backgroundColor: "var(--bg-secondary)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-light)"
          }}
        >
          <h3 style={{ fontSize: "1.25rem", marginBottom: "8px" }}>No Articles Matched Your Filter</h3>
          <p style={{ color: "var(--text-secondary)", marginBottom: "18px" }}>
            Try broadening your search query or selecting a different category or topic.
          </p>
          <button onClick={clearFilters} className="btn btn-primary">
            Clear Active Filters
          </button>
        </div>
      )}
    </div>
  );
}
