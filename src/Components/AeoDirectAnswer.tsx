import { Zap } from "lucide-react";

interface AeoDirectAnswerProps {
  answer: string;
}

export function AeoDirectAnswer({ answer }: AeoDirectAnswerProps) {
  if (!answer) return null;

  return (
    <div className="aeo-direct-answer" role="region" aria-label="Direct Answer Definition">
      <div className="aeo-label">
        <Zap size={13} />
        <span>Direct Answer / Executive Synthesis</span>
      </div>
      <p className="aeo-text">{answer}</p>
    </div>
  );
}
