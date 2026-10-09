"use client";

import { useState } from "react";
import { ArticleFAQ } from "@/data/articles";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQAccordionProps {
  faqs: ArticleFAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <h3
        id="faq-heading"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "1.45rem",
          fontWeight: 700,
          marginBottom: "18px",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}
      >
        <HelpCircle size={20} style={{ color: "var(--accent-primary)" }} />
        <span>Frequently Addressed Inquiries</span>
      </h3>
      <div>
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const contentId = `faq-answer-${index}`;
          const triggerId = `faq-trigger-${index}`;

          return (
            <div key={index} className="faq-item">
              <button
                id={triggerId}
                type="button"
                onClick={() => toggle(index)}
                className="faq-trigger"
                aria-expanded={isOpen}
                aria-controls={contentId}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s ease"
                  }}
                />
              </button>
              {isOpen && (
                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={triggerId}
                  className="faq-answer"
                >
                  <p style={{ margin: 0 }}>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
