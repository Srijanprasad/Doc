"use client";

import { useEffect, useState } from "react";
import { HeadingItem } from "@/data/articles";
import { ListCollapse, ChevronRight } from "lucide-react";

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!headings || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings || headings.length === 0) return null;

  return (
    <nav className="toc-box" aria-label="Table of Contents">
      <div className="toc-title">
        <ListCollapse size={16} style={{ color: "var(--accent-primary)" }} />
        <span>In this Editorial Analysis</span>
      </div>
      <ul className="toc-list">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={`toc-item level-${heading.level}`}
            >
              <a
                href={`#${heading.id}`}
                className={`toc-link ${isActive ? "active" : ""}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  fontWeight: isActive ? 700 : heading.level === 2 ? 600 : 400,
                  color: isActive ? "var(--accent-primary)" : undefined
                }}
              >
                {heading.level === 3 && <ChevronRight size={12} style={{ opacity: 0.6 }} />}
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
