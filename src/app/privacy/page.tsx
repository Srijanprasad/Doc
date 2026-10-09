import type { Metadata } from "next";
import { siteConfig } from "@/data/siteConfig";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Transparent privacy policy detailing data practices, cookie usage, analytics, newsletter handling, and AI retrieval features.",
  alternates: {
    canonical: `${siteConfig.url}/privacy`
  }
};

export default function PrivacyPage() {
  return (
    <div className="container" style={{ paddingTop: "40px", paddingBottom: "80px" }}>
      <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy" }]} />

      <div className="reading-container">
        <header style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", marginBottom: "16px" }}>
            Privacy Policy & Data Transparency
          </h1>
          <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
            Last modified: February 2026. This policy outlines our straightforward, privacy-conscious data practices across the publication.
          </p>
        </header>

        <div className="article-body">
          <h2>1. Fundamental Philosophy</h2>
          <p>
            We believe in data minimization. This platform does not sell, rent, monetize, or harvest personal information. We exist to publish independent technical research, not to track readers across the internet.
          </p>

          <h2>2. Newsletter & Direct Submissions</h2>
          <p>
            When you subscribe to the High-Signal Dispatch or send an editorial inquiry via our contact desk:
          </p>
          <ul className="editorial-list">
            <li>Your email address is used solely to deliver publication dispatches or reply to your question.</li>
            <li>You may unsubscribe at any time via the link included in every newsletter email.</li>
            <li>We do not share your contact credentials with third-party advertising brokers.</li>
          </ul>

          <h2>3. Cookies and Local Storage</h2>
          <p>
            This website uses browser <code>localStorage</code> strictly to store your chosen visual theme preference (Light or Dark mode). We do not store invasive third-party cross-site tracking cookies.
          </p>

          <h2>4. AI Knowledge Assistant & Retrieval</h2>
          <p>
            Our interactive Grounded RAG Knowledge Assistant processes queries strictly against our local, published article corpus. Queries entered into the assistant are not used to train proprietary third-party foundation models without consent.
          </p>

          <h2>5. External References and Links</h2>
          <p>
            Our articles contain citations to academic whitepapers, specification docs, and third-party websites (including X and Instagram). Once you navigate to external domains, their respective privacy policies apply.
          </p>

          <h2>6. Updates to this Policy</h2>
          <p>
            Any modifications to our privacy practices will be documented on this page with an updated modification timestamp.
          </p>
        </div>
      </div>
    </div>
  );
}
