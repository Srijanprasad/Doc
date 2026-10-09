import { articlesData, Article } from "@/data/articles";
import { categories } from "@/data/categories";
import { topicsData } from "@/data/topics";

export interface SearchResult {
  article: Article;
  score: number;
  snippet: string;
  matchedEntities: string[];
}

export function searchArticles(query: string, categoryFilter?: string, topicFilter?: string): SearchResult[] {
  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/\s+/).filter((t) => t.length > 1);

  return articlesData
    .filter((article) => {
      if (categoryFilter && article.categorySlug !== categoryFilter) return false;
      if (topicFilter && !article.topicSlugs.includes(topicFilter)) return false;
      return true;
    })
    .map((article) => {
      if (!cleanQuery) {
        return {
          article,
          score: 1,
          snippet: article.dek,
          matchedEntities: []
        };
      }

      let score = 0;
      const matchedEntities: string[] = [];

      // Exact title match bonus
      if (article.title.toLowerCase().includes(cleanQuery)) {
        score += 25;
      }

      // Title tokens
      for (const token of queryTokens) {
        if (article.title.toLowerCase().includes(token)) score += 8;
        if (article.dek.toLowerCase().includes(token)) score += 5;
        if (article.contentHtml.toLowerCase().includes(token)) score += 2;
      }

      // Entities matching (high semantic value)
      for (const entity of article.entities) {
        const entityLower = entity.toLowerCase();
        if (entityLower.includes(cleanQuery) || queryTokens.some((t) => entityLower.includes(t))) {
          score += 12;
          matchedEntities.push(entity);
        }
      }

      // Topic matching
      for (const topicSlug of article.topicSlugs) {
        const topic = topicsData.find((t) => t.slug === topicSlug);
        if (topic) {
          if (topic.title.toLowerCase().includes(cleanQuery)) score += 10;
          for (const coreEntity of topic.coreEntities) {
            if (coreEntity.toLowerCase().includes(cleanQuery)) {
              score += 6;
              if (!matchedEntities.includes(coreEntity)) matchedEntities.push(coreEntity);
            }
          }
        }
      }

      // Category matching
      const cat = categories.find((c) => c.slug === article.categorySlug);
      if (cat && cat.title.toLowerCase().includes(cleanQuery)) {
        score += 5;
      }

      // AEO direct answer check
      if (article.aeoDirectAnswer.toLowerCase().includes(cleanQuery)) {
        score += 15;
      }

      // Snippet generation
      let snippet = article.dek;
      if (cleanQuery && article.aeoDirectAnswer.toLowerCase().includes(cleanQuery)) {
        snippet = article.aeoDirectAnswer;
      } else if (cleanQuery) {
        const textContent = article.contentHtml.replace(/<[^>]*>/g, " ");
        const idx = textContent.toLowerCase().indexOf(cleanQuery);
        if (idx !== -1) {
          const start = Math.max(0, idx - 60);
          const end = Math.min(textContent.length, idx + 140);
          snippet = "…" + textContent.slice(start, end).trim() + "…";
        }
      }

      return {
        article,
        score,
        snippet,
        matchedEntities: Array.from(new Set(matchedEntities))
      };
    })
    .filter((result) => !cleanQuery || result.score > 0)
    .sort((a, b) => b.score - a.score);
}
