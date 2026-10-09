"use client";

import { useState } from "react";
import { Share2, Link as LinkIcon, Check } from "lucide-react";

interface SocialShareProps {
  url: string;
  title: string;
}

export function SocialShare({ url, title }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Clipboard copy failed", err);
    }
  };

  const shareToX = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}&via=Ushan_0`;
  const shareToLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const shareToWhatsApp = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  return (
    <div className="share-bar" aria-label="Social Sharing Options">
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", fontWeight: 600, color: "var(--text-secondary)" }}>
        <Share2 size={16} />
        <span>Share Analysis</span>
      </div>

      <div className="share-buttons">
        <a
          href={shareToX}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          aria-label="Share on X"
        >
          X (Twitter)
        </a>

        <a
          href={shareToLinkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          aria-label="Share on LinkedIn"
        >
          LinkedIn
        </a>

        <a
          href={shareToWhatsApp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-secondary btn-sm"
          aria-label="Share on WhatsApp"
        >
          WhatsApp
        </a>

        <button
          onClick={handleCopy}
          className="btn btn-secondary btn-sm"
          aria-label="Copy article link to clipboard"
          style={{ minWidth: "100px" }}
        >
          {copied ? (
            <>
              <Check size={14} style={{ color: "var(--accent-emerald)" }} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon size={14} />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
