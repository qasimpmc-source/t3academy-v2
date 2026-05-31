"use client";

import { FadeUp } from "./fade-up";
import { HP } from "./hp-tokens";

// Inline SVG icons matching original Lucide style
function BrainIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}
function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
function UnlockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
}

const REASONS = [
  {
    icon: <BrainIcon />,
    iconColor: HP.gold,
    bg: "rgba(200,154,94,0.06)",
    border: HP.gold,
    title: "Dedicated AI tutor",
    body: "Trained in your subject. Personalised, adaptive, always learning with you.",
    floatClass: "float-1",
  },
  {
    icon: <ShieldCheckIcon />,
    iconColor: HP.sage,
    bg: "rgba(127,168,150,0.06)",
    border: HP.sage,
    title: "Vetted by professionals",
    body: "Question banks reviewed and approved by subject matter experts.",
    floatClass: "float-2",
  },
  {
    icon: <UnlockIcon />,
    iconColor: HP.rose,
    bg: "rgba(168,124,124,0.06)",
    border: HP.rose,
    title: "Free to start",
    body: "No sign-up required for the IQ test. Get started in seconds.",
    floatClass: "float-3",
  },
];

export function AiTutorShowcase() {
  return (
    <section
      id="why"
      style={{
        padding: "80px 24px",
        position: "relative",
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: HP.dark,
            margin: "0 0 56px",
            letterSpacing: "-0.02em",
          }}
        >
          Why T3 Academy.
        </h2>

        <div className="grid md:grid-cols-3" style={{ gap: 40 }}>
          {REASONS.map((r, i) => (
            <FadeUp key={r.title} delay={i * 0.15}>
              <div
                className={r.floatClass}
                style={{
                  background: r.bg,
                  borderLeft: `3px solid ${r.border}`,
                  borderRadius: 10,
                  padding: "24px",
                }}
              >
                <div style={{ color: r.iconColor, marginBottom: 16 }}>{r.icon}</div>
                <h4
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 18,
                    fontWeight: 700,
                    color: HP.dark,
                    margin: "0 0 8px",
                  }}
                >
                  {r.title}
                </h4>
                <p style={{ fontSize: 14, color: HP.muted, lineHeight: 1.65, margin: 0 }}>
                  {r.body}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
