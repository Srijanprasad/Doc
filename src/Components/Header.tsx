"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Sparkles, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onOpenRag?: () => void;
}

export function Header({ onOpenRag }: HeaderProps) {
  const pathname = usePathname() ?? "";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Work", href: "/experience" },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "Play", href: "/play" },
    { title: "About", href: "/about" },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand-identity" aria-label="Srijan Prasad — Home">
          <div className="brand-avatar" aria-hidden="true" style={{ overflow: "hidden", padding: 0 }}>
            <img
              src="/srijan-prasad-avatar.png"
              alt="Srijan Prasad"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <span className="brand-title">Srijan Prasad</span>
            <span className="brand-subtitle">Software Developer & Writer</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links" aria-label="Primary Navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive ? "active" : ""}`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <Link href="/contacts" className="header-contact-link">
            Contact
          </Link>
          <Link
            href="/search"
            className="icon-button"
            aria-label="Search articles and entities"
            title="Search knowledge base"
          >
            <Search size={18} />
          </Link>

          {onOpenRag && (
            <button
              onClick={onOpenRag}
              className="btn btn-secondary btn-sm"
              style={{ display: "inline-flex", gap: "6px" }}
              aria-label="Open AI Research Assistant"
              title="Query Grounded Knowledge Assistant"
            >
              <Sparkles size={15} style={{ color: "var(--accent-warm)" }} />
              <span className="rag-btn-text">Ask AI</span>
            </button>
          )}

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="icon-button mobile-menu-trigger"
            id="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (visible when mobileMenuOpen is true) */}
      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`mobile-nav-link ${isActive ? "active" : ""}`}
              >
                {link.title}
              </Link>
            );
          })}
          <Link
            href="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link"
          >
            Search
          </Link>
          {onOpenRag && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRag();
              }}
              className="mobile-nav-link mobile-ai-link"
            >
              Ask AI
            </button>
          )}
          <Link
            href="/contacts"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary mobile-contact-link"
          >
            Get in touch
          </Link>
        </nav>
      )}
    </header>
  );
}
