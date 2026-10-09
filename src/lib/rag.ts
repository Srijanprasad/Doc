import { articlesData, Article } from "@/data/articles";
import { searchArticles } from "@/lib/search";

export interface RagResponse {
  query: string;
  isGrounded: boolean;
  answer: string;
  keyInsights: string[];
  citedArticles: {
    title: string;
    slug: string;
    snippet: string;
  }[];
  sources: {
    title: string;
    publisher: string;
    url: string;
  }[];
  suggestedQuestions: string[];
}

export function queryRagAssistant(query: string): RagResponse {
  const searchResults = searchArticles(query);
  const relevantResults = searchResults.filter((r) => r.score >= 10);

  if (relevantResults.length === 0) {
    return {
      query,
      isGrounded: false,
      answer: `The platform's knowledge base does not currently contain specific documented research or editorial analysis regarding "${query}". As an AI knowledge assistant committed to zero hallucination, I only cite verified articles published on this platform.`,
      keyInsights: [
        "No matching articles or entity nodes were found for this specific query.",
        "Consider exploring the primary topical clusters: Generative Engine Optimization (GEO), Semantic Search, Personal Knowledge Systems, Core Web Vitals, or High-Signal Publishing."
      ],
      citedArticles: [],
      sources: [],
      suggestedQuestions: [
        "What is Generative Engine Optimization (GEO)?",
        "How does hybrid vector + BM25 search work?",
        "What is Interaction to Next Paint (INP) in Core Web Vitals?",
        "How do atomic notes improve knowledge management?"
      ]
    };
  }

  const primaryMatch = relevantResults[0].article;
  const secondaryMatches = relevantResults.slice(1, 3).map((r) => r.article);

  // Compile grounded answer
  const answer = `${primaryMatch.aeoDirectAnswer} ${
    secondaryMatches.length > 0
      ? `Additionally, related research on the platform highlights that ${secondaryMatches[0].keyTakeaways[0]}`
      : ""
  }`;

  // Gather unique takeaways and insights
  const keyInsights: string[] = [
    ...primaryMatch.keyTakeaways.slice(0, 3)
  ];
  if (secondaryMatches.length > 0 && secondaryMatches[0].keyTakeaways[1]) {
    keyInsights.push(secondaryMatches[0].keyTakeaways[1]);
  }

  // Gather citations
  const citedArticles = [
    {
      title: primaryMatch.title,
      slug: primaryMatch.slug,
      snippet: primaryMatch.dek
    },
    ...secondaryMatches.map((a) => ({
      title: a.title,
      slug: a.slug,
      snippet: a.dek
    }))
  ];

  // Gather primary sources
  const sources = [
    ...primaryMatch.sources.slice(0, 2).map((s) => ({
      title: s.title,
      publisher: s.publisher,
      url: s.url
    }))
  ];

  const suggestedQuestions = primaryMatch.faqs.map((f) => f.question);

  return {
    query,
    isGrounded: true,
    answer,
    keyInsights,
    citedArticles,
    sources,
    suggestedQuestions
  };
}
