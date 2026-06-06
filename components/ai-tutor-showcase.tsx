const C = { primary: "#95d3ba", onSurface: "#e5e2e1", onSurfaceVariant: "#bfc9c3", surface: "#131313" };

const STEPS = [
  { num: "01", title: "Pick your path",        body: "Choose your exam track. Your starting point, your pace." },
  { num: "02", title: "Attempt a question",    body: "Calibrated questions matched to your level." },
  { num: "03", title: "Get instant feedback",  body: "The AI tutor explains the answer, diagnoses the mistake, and generates fresh practice." },
  { num: "04", title: "Track your growth",     body: "Mastery scores update in real time. Weaknesses become strengths." },
];

export function AiTutorShowcase() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "64px 24px",
        background: "rgba(14,14,14,0.50)",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 96 }}>
          <h2
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontWeight: 600,
              fontSize: "clamp(28px,4vw,36px)",
              color: C.onSurface,
              margin: "0 0 16px",
            }}
          >
            How T3 works.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontSize: 16,
              color: `${C.onSurfaceVariant}99`,
            }}
          >
            A recursive cycle of continuous improvement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4" style={{ gap: 48, position: "relative" }}>
          {/* Connecting line */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              right: 0,
              height: 1,
              background: "rgba(255,255,255,0.10)",
              zIndex: 0,
            }}
          />

          {STEPS.map(({ num, title, body }) => (
            <div key={num} style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
              <div
                style={{
                  width: 80,
                  height: 80,
                  margin: "0 auto 32px",
                  background: C.surface,
                  border: `1px solid ${C.primary}33`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "border-color 0.3s",
                }}
                className="hover:border-[#95d3ba]"
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
                    fontSize: 20,
                    fontWeight: 500,
                    color: C.primary,
                  }}
                >
                  {num}
                </span>
              </div>

              <h4
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: C.onSurface,
                  margin: "0 0 16px",
                }}
              >
                {title}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: 14,
                  color: `${C.onSurfaceVariant}B3`,
                  lineHeight: 1.6,
                  padding: "0 8px",
                }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
