import { motion as Motion } from "framer-motion";
import BlogCard from "../Components/Blogcard";

const BLOG_URL = "https://blog-alpha-pied-12.vercel.app";

const posts = [
  {
    title:
      "The Asymmetry of Model Distillation: Why OpenAI Banned PewDiePie for Training a Local AI",
    category: "Artificial Intelligence",
    date: "Oct 4, 2026",
    excerpt:
      "OpenAI trained on the open web, but banned PewDiePie twice for training on model outputs. An editorial investigation into the legal, ethical, and architectural tensions of synthetic distillation and local AI sovereignty.",
    image: `${BLOG_URL}/pewdiepie-openai-distillation-local-ai.jpg`,
    link: `${BLOG_URL}/blog/the-asymmetry-of-model-distillation-why-openai-banned-pewdiepie`,
  },
  {
    title:
      "The Anatomy of High-Signal Publishing: Editorial Standards in the Era of Synthetic Content",
    category: "Content Strategy",
    date: "Dec 8, 2025",
    excerpt:
      "Why information gain, rigorous provenance, and deep structural clarity are the only enduring moats for digital writers.",
    image:
      "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1400&q=80",
    link: `${BLOG_URL}/blog/anatomy-of-high-signal-publishing-editorial-standards-ai-era`,
  },
  {
    title:
      "Mastering Core Web Vitals: Eliminating Layout Shifts and Interaction Latency (INP)",
    category: "Systems Engineering",
    date: "Nov 12, 2025",
    excerpt:
      "A hands-on engineering guide to mastering Interaction to Next Paint (INP), Largest Contentful Paint (LCP), and Cumulative Layout Shift (CLS).",
    image:
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1400&q=80",
    link: `${BLOG_URL}/blog/modern-web-performance-core-web-vitals-inp-lcp`,
  },
  {
    title:
      "Building Resilient Second Brains: Information Architecture for Personal Knowledge",
    category: "Knowledge Management",
    date: "Oct 5, 2025",
    excerpt:
      "How to design an enduring personal knowledge graph using atomic notes, bidirectional linking, and digital gardening principles.",
    image:
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1400&q=80",
    link: `${BLOG_URL}/blog/building-resilient-second-brains-personal-knowledge-architecture`,
  },
  {
    title:
      "The Engineering of Semantic Search: From Vector Embeddings to Hybrid BM25 Retrieval",
    category: "Systems Engineering",
    date: "Sep 22, 2025",
    excerpt:
      "How modern knowledge platforms blend dense vector embeddings with sparse lexical indexing to build fast, accurate personal search engines.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80",
    link: `${BLOG_URL}/blog/engineering-semantic-search-vector-embeddings-hybrid-retrieval`,
  },
  {
    title:
      "Lessons Beyond the Classroom: Deconstructing the KYC and SMART Frameworks with Gaurav Ghelani",
    category: "Systems Engineering",
    date: "Sep 20, 2025",
    excerpt:
      "Connecting academic computer science with enterprise reality: how the KYC (Knowledge, Your Skills, Communication) and SMART frameworks reshape professional mindset, relationships, and accountability.",
    image: `${BLOG_URL}/gaurav-ghelani-tit-session.png`,
    link: `${BLOG_URL}/blog/lessons-beyond-the-classroom-kyc-smart-frameworks-gaurav-ghelani-tit`,
  },
  {
    title:
      "An Interaction That Gave Me a Better Perspective on the Industry: Capgemini × TIT Group of Institutions",
    category: "Systems Engineering",
    date: "Sep 12, 2025",
    excerpt:
      "Reflections from a final-year CSE student on bridging the gap between academic computer science and enterprise expectations: communication, adaptability, problem-solving, and continuous learning from Capgemini leadership at TIT Group of Institutions.",
    image: `${BLOG_URL}/capgemini-tit-industry-interaction.jpg`,
    link: `${BLOG_URL}/blog/an-interaction-that-gave-me-a-better-perspective-on-the-industry-capgemini-tit`,
  },
  {
    title:
      "Architecting Generative Engine Optimization: How AI Search Changes Content Discovery",
    category: "Artificial Intelligence",
    date: "Aug 15, 2025",
    excerpt:
      "A deep technical blueprint on structuring web content for Perplexity, SearchGPT, Gemini, and modern LLM answer synthesis engines.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80",
    link: `${BLOG_URL}/blog/architecting-generative-engine-optimization-geo`,
  },
  {
    title: "My First Experience as a Volunteer at WordCamp Bhopal 2025",
    category: "Systems Engineering",
    date: "Feb 28, 2025",
    excerpt:
      "Some experiences stay with you because of what you do. Others stay with you because of the people you meet along the way. Reflections on seeing WordCamp from the other side as a volunteer and contributor.",
    image: `${BLOG_URL}/wordcamp-bhopal-2025-group-photo.jpg`,
    link: `${BLOG_URL}/blog/my-first-experience-as-a-volunteer-at-wordcamp-bhopal-2025`,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Blog() {
  return (
    <Motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="px-4 md:py-10 overflow-hidden"
    >
      <div className="px-4 md:py-10">
        <section className="py-4">
          <h1 className="text-3xl font-bold text-white">Blog</h1>
          <p className="text-gray-400 text-sm mt-1.5 max-w-xl">
            My articles on software development, AI, systems, and what I am
            learning.
          </p>
          <p className="mt-2 text-xs text-gray-500">
            Articles open in a new tab, so your portfolio stays open.
          </p>
        </section>

        <div className="w-full border-t border-gray-800"></div>

        <section className="pt-8" aria-label="All blog articles">
          <Motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {posts.map((post) => (
              <Motion.div key={post.link} variants={item}>
                <BlogCard {...post} />
              </Motion.div>
            ))}
          </Motion.div>
        </section>
      </div>

      <div className="w-full border-t border-gray-800 mt-10"></div>
    </Motion.div>
  );
}

export default Blog;
