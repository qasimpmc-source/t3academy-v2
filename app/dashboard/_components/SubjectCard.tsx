"use client";

import Link from "next/link";
import ProgressRing from "./ProgressRing";

interface Props {
  id: string;
  label: string;
  icon: string;
  topics: number;
  color: string;
  bg: string;
  border: string;
  topBar: string;
  done: number;
  accuracy: number | null;
  pct: number;
}

export default function SubjectCard({ id, label, icon, topics, color, bg, border, topBar, done, accuracy, pct }: Props) {
  const accuracyColor =
    accuracy === null
      ? "var(--color-text2)"
      : accuracy >= 70
      ? "var(--color-green)"
      : "var(--color-red)";

  return (
    <Link
      href={`/dashboard/${id}`}
      className="relative block text-left rounded-2xl px-5 py-5 overflow-hidden no-underline"
      style={{
        background: "var(--color-card)",
        border: "1.5px solid var(--color-border)",
        boxShadow: "0 1px 6px rgba(28,24,18,0.05)",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = border;
        e.currentTarget.style.background = bg;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 24px rgba(28,24,18,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.background = "var(--color-card)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 6px rgba(28,24,18,0.05)";
      }}
    >
      {/* Colour top bar */}
      <span
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: topBar }}
      />

      <div className="flex items-start gap-3">
        <span
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
          style={{ background: bg, border: `1px solid ${border}` }}
        >
          {icon}
        </span>

        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold mb-0.5" style={{ color: "var(--color-text)" }}>
            {label}
          </div>
          <div className="text-xs" style={{ color: "var(--color-text3)" }}>
            {topics} topics
          </div>
          <div className="flex gap-4 mt-3 text-xs" style={{ color: "var(--color-text3)" }}>
            <span>
              Done: <strong style={{ color: "var(--color-text2)" }}>{done}</strong>
            </span>
            <span>
              Accuracy: <strong style={{ color: accuracyColor }}>
                {accuracy !== null ? `${accuracy}%` : "—"}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex-shrink-0 flex flex-col items-center gap-1">
          <ProgressRing pct={pct} color={color} size={44} />
          <span className="text-[10px] font-semibold" style={{ color }}>{pct}%</span>
        </div>
      </div>
    </Link>
  );
}
