import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { authorData } from "@/data/author";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "./ContactForm";
import { Mail, ExternalLink, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact the Editorial Desk",
  description: "Send inquiries, feedback, or collaborative notes directly to Srijan Prasad and the editorial desk.",
  alternates: {
    canonical: `${siteConfig.url}/contact`
  }
};

export default function ContactPage() {
  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} />

      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <header style={{ marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", marginBottom: "12px" }}>
            <span className="badge badge-accent">Direct Correspondence</span>
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", marginBottom: "16px" }}>
            Contact the Editorial Desk
          </h1>
          <p style={{ fontSize: "1.15rem", color: "var(--text-secondary)", lineHeight: "1.65" }}>
            Have a question regarding Generative Engine Optimization, software architecture, citation corrections, or publication feedback? Send a note directly to {authorData.name}.
          </p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "40px", alignItems: "start" }}>
          <div
            style={{
              padding: "36px",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-light)",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <ContactForm />
          </div>

          <aside style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div
              style={{
                padding: "24px",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)"
              }}
            >
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <MessageSquare size={16} style={{ color: "var(--accent-primary)" }} />
                <span>Verified Direct Channels</span>
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>
                For real-time discussions or fast asynchronous inquiries, reach out on official public channels:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <a
                  href={authorData.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-pill"
                  style={{ justifyContent: "space-between", backgroundColor: "var(--bg-surface)" }}
                >
                  <span>GitHub: @Srijanprasad</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={authorData.socials.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-pill"
                  style={{ justifyContent: "space-between", backgroundColor: "var(--bg-surface)" }}
                >
                  <span>X: @Ushan_0</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={authorData.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link-pill"
                  style={{ justifyContent: "space-between", backgroundColor: "var(--bg-surface)" }}
                >
                  <span>Instagram: @srijanprasad_</span>
                  <ExternalLink size={13} />
                </a>

                <a
                  href={authorData.socials.email}
                  className="social-link-pill"
                  style={{ justifyContent: "space-between", backgroundColor: "var(--bg-surface)" }}
                >
                  <span>Email: {authorData.email}</span>
                  <Mail size={13} />
                </a>
              </div>
            </div>

            <div
              style={{
                padding: "24px",
                backgroundColor: "var(--bg-secondary)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-light)"
              }}
            >
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "8px" }}>
                Editorial Integrity Policy
              </h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", margin: 0 }}>
                We review all peer citations, typo reports, and technical questions. If you notice a broken link or dated source citation in any published paper, please let us know.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
