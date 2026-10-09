import PortfolioShell from "../PortfolioShell";
import { getMarkdownBlogPosts } from "@/lib/markdown-blog";

export default function HomePage() {
  return <PortfolioShell featuredPosts={getMarkdownBlogPosts()} />;
}
