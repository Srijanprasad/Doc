"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const PortfolioApp = dynamic(() => import("./App.jsx"), {
  ssr: false,
  loading: () => (
    <p role="status" className="px-4 py-12 text-center text-gray-400">
      Loading portfolio…
    </p>
  ),
});

/** @param {{ featuredPosts?: import("./lib/markdown-blog").MarkdownBlogPost[] }} props */
export default function PortfolioShell({ featuredPosts = [] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <p role="status" className="px-4 py-12 text-center text-gray-400">
        Loading portfolio…
      </p>
    );
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <PortfolioApp featuredPosts={featuredPosts} />
      </BrowserRouter>
    </HelmetProvider>
  );
}
