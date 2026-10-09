import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { SearchClient } from "./SearchClient";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Search Knowledge Base & Articles",
  description: "Search across editorial publications, research whitepapers, entity concepts, and technical topics.",
  alternates: {
    canonical: `${siteConfig.url}/search`
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function SearchPage() {
  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <Breadcrumbs items={[{ name: "Search", url: "/search" }]} />

      <header style={{ maxWidth: "860px", margin: "0 auto 40px auto", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", marginBottom: "14px" }}>
          Knowledge Search
        </h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
          Direct retrieval across all articles, structured entities, topic clusters, and technical definitions.
        </p>
      </header>

      <SearchClient />
    </div>
  );
}
