export interface TopicCluster {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  shortDescription: string;
  pillarDescription: string;
  coreEntities: string[];
  subtopics: string[];
  relatedTopics: string[];
  keyQuestionsAnswered: string[];
}

export const topicsData: TopicCluster[] = [
  {
    id: "topic-geo",
    slug: "generative-engine-optimization",
    title: "Generative Engine Optimization (GEO)",
    categorySlug: "artificial-intelligence",
    shortDescription: "Techniques and architectures to structure knowledge for generative search engines, Perplexity, SearchGPT, and LLM answer systems.",
    pillarDescription: "Generative Engine Optimization (GEO) and Answer Engine Optimization (AEO) mark a fundamental paradigm shift from traditional 10-blue-link indexing to direct semantic entity synthesis. Rather than optimizing purely for crawler keywords, GEO focuses on factual density, entity disambiguation, answer-first formatting, clear attribution chains, and machine-readable structured representations.",
    coreEntities: [
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Large Language Models (LLMs)",
      "Schema.org / JSON-LD",
      "Retrieval-Augmented Generation (RAG)",
      "Entity Knowledge Graphs"
    ],
    subtopics: [
      "Answer-first writing structure",
      "Information gain & factual density",
      "Entity schema graph validation",
      "Citation architecture & source provenance",
      "LLM content parsers & llms.txt protocol"
    ],
    relatedTopics: ["semantic-search", "content-strategy"],
    keyQuestionsAnswered: [
      "What is Generative Engine Optimization (GEO) and how does it differ from traditional SEO?",
      "How do LLM synthesis engines cite sources and determine topical authority?",
      "What structured data schemas provide the highest clarity to AI answer engines?"
    ]
  },
  {
    id: "topic-semantic-search",
    slug: "semantic-search",
    title: "Semantic Search & Vector Retrieval",
    categorySlug: "systems-engineering",
    shortDescription: "Vector embeddings, dense retrieval, hybrid BM25 search, and semantic indexing systems for modern digital knowledge bases.",
    pillarDescription: "Search is evolving from brittle lexical string matching to multidimensional semantic retrieval. By coupling dense vector representations with traditional BM25 sparse index scoring (hybrid search) and cross-encoder re-ranking, knowledge platforms achieve both conceptual understanding and exact term precision.",
    coreEntities: [
      "Vector Embeddings",
      "BM25 Ranking Function",
      "Hybrid Retrieval",
      "Dense Passage Retrieval",
      "Cross-Encoder Re-ranking",
      "Cosine Similarity"
    ],
    subtopics: [
      "Dense vs Sparse retrieval tradeoffs",
      "Chunking strategies for technical publications",
      "Local vector search with zero external dependencies",
      "Reciprocal Rank Fusion (RRF)"
    ],
    relatedTopics: ["generative-engine-optimization", "personal-knowledge-systems"],
    keyQuestionsAnswered: [
      "How does hybrid vector + lexical search outperform traditional keyword search?",
      "What chunking boundaries preserve semantic context in long-form technical articles?",
      "How can client-side or edge retrieval systems index personal knowledge bases efficiently?"
    ]
  },
  {
    id: "topic-pkm",
    slug: "personal-knowledge-systems",
    title: "Personal Knowledge Management & Second Brains",
    categorySlug: "knowledge-management",
    shortDescription: "Information architecture, atomic notes, bidirectional linking, and digital gardening methods for sustained cognitive leverage.",
    pillarDescription: "A personal knowledge management (PKM) system is an external cognitive scaffold. By adopting bidirectional graph models, atomic note composition, and progressive summarization, researchers transform scattered passive consumption into an active, compoundable intellectual asset.",
    coreEntities: [
      "Personal Knowledge Management (PKM)",
      "Zettelkasten Method",
      "Digital Garden",
      "Bidirectional Linking",
      "Progressive Summarization",
      "Cognitive Scaffolding"
    ],
    subtopics: [
      "Atomic notes vs monolithic articles",
      "Designing resilient folder-free taxonomies",
      "Public digital gardens vs private journals",
      "Synthesizing literature notes into evergreen assets"
    ],
    relatedTopics: ["generative-engine-optimization", "editorial-systems"],
    keyQuestionsAnswered: [
      "How does the Zettelkasten slip-box technique translate into modern digital publishing?",
      "What is the difference between a traditional blog and a living digital knowledge garden?",
      "How does bidirectional linking establish organic topical authority?"
    ]
  },
  {
    id: "topic-performance",
    slug: "core-web-vitals",
    title: "Web Performance & Core Web Vitals",
    categorySlug: "systems-engineering",
    shortDescription: "Front-end performance engineering, Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS).",
    pillarDescription: "Web performance is an essential pillar of user experience and technical search indexing. Maintaining sub-second LCP, zero layout shifts, and responsive main-thread interaction (INP) requires disciplined asset loading, semantic HTML, modern CSS token systems, and zero-bloat JavaScript architectures.",
    coreEntities: [
      "Interaction to Next Paint (INP)",
      "Largest Contentful Paint (LCP)",
      "Cumulative Layout Shift (CLS)",
      "Critical Rendering Path",
      "Server-Side Rendering (SSR)",
      "CSS Containment"
    ],
    subtopics: [
      "Eliminating main thread blocking scripts",
      "Modern CSS layouts vs framework bloat",
      "Font display strategies and fallback metric overrides",
      "Image decoding and native aspect ratio reservations"
    ],
    relatedTopics: ["systems-engineering", "editorial-systems"],
    keyQuestionsAnswered: [
      "How does Interaction to Next Paint (INP) differ from First Input Delay (FID)?",
      "What causes Cumulative Layout Shift in long-form editorial publications?",
      "How can Vanilla CSS outpace utility frameworks in render performance?"
    ]
  },
  {
    id: "topic-editorial",
    slug: "editorial-systems",
    title: "High-Signal Editorial Architecture",
    categorySlug: "content-strategy",
    shortDescription: "Editorial standards, provenance tracking, information gain, and ethical content architecture in the era of automated content.",
    pillarDescription: "As the internet becomes inundated with low-effort synthetic text, high-signal editorial platforms stand out through provenance, firsthand technical verification, rigorous source attribution, and deep conceptual clarity. Editorial integrity is the foundation of enduring trust and genuine topical authority.",
    coreEntities: [
      "Information Gain Score",
      "Editorial Integrity",
      "Source Attribution & Provenance",
      "Semantic HTML5",
      "Entity Disambiguation",
      "Reader Attention Scaffolding"
    ],
    subtopics: [
      "Designing readable editorial typography systems",
      "Structure of authoritative technical whitepapers",
      "Mitigating misinformation and AI hallucinations",
      "Building trust through verifiable source lists"
    ],
    relatedTopics: ["generative-engine-optimization", "personal-knowledge-systems"],
    keyQuestionsAnswered: [
      "What defines 'information gain' in modern editorial and algorithmic evaluation?",
      "Why is transparent source citation critical for both human readers and AI systems?",
      "How does clear typographic hierarchy improve reading retention?"
    ]
  }
];

export function getTopicBySlug(slug: string): TopicCluster | undefined {
  return topicsData.find((t) => t.slug === slug);
}
