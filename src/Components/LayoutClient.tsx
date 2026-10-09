"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RagAssistant } from "./RagAssistant";
import { SkipLink } from "./SkipLink";
import { CursorPet } from "./CursorPet";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isRagOpen, setIsRagOpen] = useState(false);
  const pathname = usePathname() ?? "";
  const publicationPrefixes = [
    "/blog",
    "/author",
    "/topics",
    "/search",
    "/contact",
    "/privacy",
    "/terms",
    "/editor",
  ];
  const isPublicationPage = publicationPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  return (
    <>
      {isPublicationPage && <SkipLink />}
      <Header
        onOpenRag={isPublicationPage ? () => setIsRagOpen(true) : undefined}
      />
      <CursorPet />
      <div
        id="main-content"
        className={isPublicationPage ? undefined : "portfolio-shell"}
        style={{ flexGrow: 1 }}
      >
        {children}
      </div>
      {isPublicationPage && <Footer />}
      {isPublicationPage && (
        <RagAssistant isOpen={isRagOpen} onClose={() => setIsRagOpen(false)} />
      )}
    </>
  );
}
