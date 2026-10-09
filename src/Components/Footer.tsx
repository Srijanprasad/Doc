import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { ExternalLink, Rss, Bot, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Editorial Mission */}
          <div>
            <div className="brand-identity" style={{ marginBottom: "16px" }}>
              <div className="brand-avatar" aria-hidden="true" style={{ width: "32px", height: "32px", fontSize: "0.85rem" }}>
                SP
              </div>
              <span className="brand-title" style={{ fontSize: "1.15rem" }}>
                {siteConfig.shortName}
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6", maxWidth: "340px" }}>
              A high-signal personal editorial publication and knowledge architecture platform. Focused on verifiable research, generative search optimization (GEO), and digital cognition.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
              <a
                href={authorData.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-pill"
                aria-label="Author profile on GitHub (@Srijanprasad)"
              >
                <span>GitHub</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={authorData.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-pill"
                aria-label="Author profile on X (@Ushan_0)"
              >
                <span>X (@Ushan_0)</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={authorData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-pill"
                aria-label="Author profile on Instagram (@srijanprasad_)"
              >
                <span>Instagram</span>
                <ExternalLink size={12} />
              </a>
              <a
                href={authorData.socials.email}
                className="social-link-pill"
                aria-label="Send email to srijanprasad2006@gmail.com"
              >
                <span>Email</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Column 2: Content Discovery */}
          <div>
            <h4 className="footer-col-title">Publication</h4>
            <ul className="footer-links">
              <li>
                <Link href="/blog" className="footer-link">
                  All Articles
                </Link>
              </li>
              <li>
                <Link href="/topics/generative-engine-optimization" className="footer-link">
                  Pillar Topics & Clusters
                </Link>
              </li>
              <li>
                <Link href="/search" className="footer-link">
                  Knowledge Search
                </Link>
              </li>
              <li>
                <a href="/feed.xml" className="footer-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Rss size={13} style={{ color: "var(--accent-warm)" }} />
                  <span>RSS 2.0 Feed</span>
                </a>
              </li>
              <li>
                <a href="/llms.txt" className="footer-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <Bot size={13} style={{ color: "var(--accent-secondary)" }} />
                  <span>LLM / GEO Index (llms.txt)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The Author */}
          <div>
            <h4 className="footer-col-title">Author & Hub</h4>
            <ul className="footer-links">
              <li>
                <Link href={`/author/${authorData.slug}`} className="footer-link">
                  Author Profile Hub
                </Link>
              </li>
              <li>
                <Link href="/about" className="footer-link">
                  Editorial Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Editorial Inquiries
                </Link>
              </li>
              <li>
                <a
                  href={authorData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub (@Srijanprasad)
                </a>
              </li>
              <li>
                <a
                  href={authorData.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  X (@Ushan_0)
                </a>
              </li>
              <li>
                <a
                  href={authorData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={authorData.socials.email}
                  className="footer-link"
                >
                  Email ({authorData.email})
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Standards & Studio */}
          <div>
            <h4 className="footer-col-title">Standards & CMS</h4>
            <ul className="footer-links">
              <li>
                <Link href="/editor" className="footer-link" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                  <ShieldCheck size={13} style={{ color: "var(--accent-emerald)" }} />
                  <span>CMS & SEO Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", display: "block", marginTop: "8px" }}>
                  AEO & GEO Ready • WCAG 2.1 AA
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} {authorData.name}. All research and editorial analysis preserved.
          </p>
          <p style={{ display: "flex", gap: "16px" }}>
            <Link href="/privacy" style={{ textDecoration: "underline" }}>Privacy</Link>
            <Link href="/terms" style={{ textDecoration: "underline" }}>Terms</Link>
            <Link href="/sitemap.xml" style={{ textDecoration: "underline" }}>Sitemap</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
