import { CheckCircle2 } from "lucide-react";

interface KeyTakeawaysProps {
  takeaways: string[];
}

export function KeyTakeaways({ takeaways }: KeyTakeawaysProps) {
  if (!takeaways || takeaways.length === 0) return null;

  return (
    <aside className="key-takeaways-box" aria-label="Key Takeaways Summary">
      <div className="takeaways-header">
        <CheckCircle2 size={18} style={{ color: "var(--accent-primary)" }} />
        <span>Key Takeaways & Core Findings</span>
      </div>
      <ul className="takeaways-list">
        {takeaways.map((point, index) => (
          <li key={index} className="takeaways-item">
            <span className="takeaways-bullet" aria-hidden="true">•</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
