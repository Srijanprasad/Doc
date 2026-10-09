import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "../index.css";
import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { getAuthorJsonLd, getWebsiteJsonLd } from "@/lib/seo";
import { LayoutClient } from "@/components/LayoutClient";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Srijan Prasad — Software Developer & Writer",
    template: `%s | ${siteConfig.shortName}`,
  },
  description:
    "Portfolio and technical writing by Srijan Prasad on software engineering, AI, web performance, and knowledge systems.",
  authors: [
    {
      name: authorData.name,
      url: `${siteConfig.url}/author/${authorData.slug}`,
    },
  ],
  creator: authorData.name,
  publisher: authorData.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: "Srijan Prasad — Software Developer & Writer",
    description:
      "Portfolio and technical writing by Srijan Prasad on software engineering, AI, web performance, and knowledge systems.",
    siteName: siteConfig.name,
    images: ["/icons/srijan-avatar.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Srijan Prasad — Software Developer & Writer",
    description:
      "Portfolio and technical writing by Srijan Prasad on software engineering, AI, web performance, and knowledge systems.",
    creator: authorData.handle,
    images: ["/icons/srijan-avatar.png"],
  },
  icons: { icon: "/icons/srijan-avatar.png" },
  other: { "google-adsense-account": "ca-pub-8795812344944723" },
  alternates: {
    canonical: siteConfig.url,
    types: { "application/rss+xml": `${siteConfig.url}/feed.xml` },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = getWebsiteJsonLd();
  const authorSchema = getAuthorJsonLd();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(authorSchema) }}
        />
      </head>
      <body>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8795812344944723"
          crossOrigin="anonymous"
        />
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
