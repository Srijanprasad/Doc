export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  count?: number;
  iconName: string;
}

export const categories: Category[] = [
  {
    id: "cat-ai",
    slug: "artificial-intelligence",
    title: "Artificial Intelligence & LLMs",
    description: "Architectural insights on large language models, retrieval-augmented systems, generative search, and intelligent software agents.",
    iconName: "Cpu"
  },
  {
    id: "cat-systems",
    slug: "systems-engineering",
    title: "Systems & Web Engineering",
    description: "Deep technical explorations of modern web platforms, browser internals, performance engineering, and Core Web Vitals.",
    iconName: "Terminal"
  },
  {
    id: "cat-knowledge",
    slug: "knowledge-management",
    title: "Knowledge Management & Thought",
    description: "Frameworks for personal information architecture, digital gardening, Zettelkasten methodologies, and cognitive augmentation.",
    iconName: "BookOpen"
  },
  {
    id: "cat-seo",
    slug: "content-strategy",
    title: "Content Architecture & SEO",
    description: "Advanced technical SEO, entity modeling, Answer Engine Optimization (AEO), and high-signal editorial systems.",
    iconName: "Compass"
  }
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
