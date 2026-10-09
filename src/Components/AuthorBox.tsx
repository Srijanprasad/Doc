import Link from "next/link";
import { authorData } from "@/data/author";
import { ExternalLink, Edit3 } from "lucide-react";

export function AuthorBox() {
  return (
    <aside className="author-box" aria-label="Author Information">
      <div className="author-box-avatar" aria-hidden="true" style={{ overflow: "hidden", padding: 0 }}>
        <img
          src="/srijan-prasad-photo.jpg"
          alt={authorData.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      <div className="author-box-content">
        <div className="author-box-header">
          <Link
            href={`/author/${authorData.slug}`}
            className="author-box-name"
            style={{ textDecoration: "underline", textUnderlineOffset: "3px" }}
          >
            {authorData.name}
          </Link>
          <span className="author-box-role">{authorData.role}</span>
        </div>

        <p className="author-box-bio">{authorData.biography}</p>

        <div className="author-box-socials" style={{ flexWrap: "wrap", gap: "10px" }}>
          <a
            href={authorData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link-pill"
            aria-label="Author profile on GitHub (@Srijanprasad)"
          >
            <span>GitHub (@Srijanprasad)</span>
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
            <span>Instagram (@srijanprasad_)</span>
            <ExternalLink size={12} />
          </a>

          <a
            href={authorData.socials.email}
            className="social-link-pill"
            aria-label="Send direct email to Srijan Prasad"
          >
            <span>Email</span>
            <ExternalLink size={12} />
          </a>

          <Link
            href={`/author/${authorData.slug}`}
            className="social-link-pill"
            style={{ color: "var(--accent-primary)" }}
          >
            <span>Author Hub & Topics</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}
