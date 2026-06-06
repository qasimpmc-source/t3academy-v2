const C = { primary: "#95d3ba", error: "#ffb4ab", onSurface: "#e5e2e1", onSurfaceVariant: "#bfc9c3" };

const ROWS: [string, string][] = [
  ["Tutors cost £40 per hour", "Unlimited sessions at a fraction of the cost"],
  ["Textbooks don't explain the mistake", "AI diagnoses exactly where it went wrong"],
  ["Practice questions run out", "Fresh questions generated on the exact weak spot"],
  ["No feedback until the exam", "Mastery tracked in real time after every question"],
];

export function ProblemSolution() {
  return (
    <section style={{ padding: "64px 24px", maxWidth: 900, margin: "0 auto" }}>
      <h2
        style={{
          fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
          fontWeight: 600,
          fontSize: "clamp(28px,4vw,36px)",
          lineHeight: 1.3,
          color: C.onSurface,
          textAlign: "center",
          margin: "0 0 48px",
        }}
      >
        Sound familiar?
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {ROWS.map(([problem, solution]) => (
          <div key={problem} className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 16 }}>
            {/* Problem */}
            <div
              className="glass-card"
              style={{
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderLeft: `4px solid ${C.error}4D`,
              }}
            >
              <span className="material-symbols-outlined" style={{ color: C.error, opacity: 0.5, fontSize: 24, flexShrink: 0 }}>close</span>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 18, lineHeight: 1.6, color: C.onSurfaceVariant, margin: 0 }}>
                {problem}
              </p>
            </div>
            {/* Solution */}
            <div
              className="glass-card"
              style={{
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                gap: 16,
                borderLeft: `4px solid ${C.primary}80`,
              }}
            >
              <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: 24, flexShrink: 0 }}>check_circle</span>
              <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: 18, lineHeight: 1.6, color: C.onSurface, margin: 0 }}>
                {solution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
