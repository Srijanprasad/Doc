import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="article-breadcrumb">
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "4px" }} aria-label="Home">
        <Home size={14} />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <span key={item.url} style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <ChevronRight size={13} style={{ opacity: 0.5 }} />
            {isLast ? (
              <span aria-current="page" style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                {item.name}
              </span>
            ) : (
              <Link href={item.url} style={{ color: "var(--text-secondary)" }}>
                {item.name}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
