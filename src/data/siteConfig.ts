export const siteConfig = {
  name: "Srijan Prasad — Editorial & Knowledge Platform",
  shortName: "Srijan Prasad",
  description: "A premium editorial publication and personal knowledge platform exploring artificial intelligence, generative search optimization (GEO/AEO), software architecture, and modern digital thought.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://srijanprasad.com",
  language: "en-US",
  locale: "en_US",
  author: {
    name: "Srijan Prasad",
    email: "srijanprasad2006@gmail.com",
    githubUrl: "https://github.com/Srijanprasad",
    xUrl: "https://x.com/Ushan_0",
    xHandle: "@Ushan_0",
    instagramUrl: "https://www.instagram.com/srijanprasad_/"
  },
  navigation: [
    { title: "Home", href: "/" },
    { title: "Articles", href: "/blog" },
    { title: "Topics", href: "/topics/generative-engine-optimization" },
    { title: "Author", href: "/author/srijan-prasad" },
    { title: "About", href: "/about" },
    { title: "Search", href: "/search" },
    { title: "Contact", href: "/contact" }
  ],
  footerLinks: {
    publication: [
      { title: "All Articles", href: "/blog" },
      { title: "Knowledge Topics", href: "/topics/generative-engine-optimization" },
      { title: "Interactive Search", href: "/search" },
      { title: "Content RSS Feed", href: "/feed.xml" },
      { title: "LLM Discovery Index", href: "/llms.txt" }
    ],
    author: [
      { title: "Author Profile", href: "/author/srijan-prasad" },
      { title: "About Publication", href: "/about" },
      { title: "Contact Desk", href: "/contact" },
      { title: "GitHub (@Srijanprasad)", href: "https://github.com/Srijanprasad", external: true },
      { title: "X (@Ushan_0)", href: "https://x.com/Ushan_0", external: true },
      { title: "Instagram (@srijanprasad_)", href: "https://www.instagram.com/srijanprasad_/", external: true },
      { title: "Email (Direct)", href: "mailto:srijanprasad2006@gmail.com", external: true }
    ],
    governance: [
      { title: "Privacy Policy", href: "/privacy" },
      { title: "Terms of Service", href: "/terms" },
      { title: "CMS & SEO Studio", href: "/editor" }
    ]
  }
};
