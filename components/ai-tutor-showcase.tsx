const C = {
  primary:         "#d2bbff",
  onSurface:       "#e0e3e5",
  onSurfaceVariant:"#ccc3d8",
  surface:         "#101415",
  surfaceContainerLowest: "#0b0f10",
};

const STEPS = [
  { icon: "route",     num: "01", title: "Select Path",     body: "Curated programs optimized for distinct academic goals." },
  { icon: "edit_note", num: "02", title: "Analyse Limits",  body: "Adaptive testing engine designed to probe cognitive boundaries." },
  { icon: "bolt",      num: "03", title: "System Feedback", body: "Instant logic decomposition for every performance vector." },
  { icon: "insights",  num: "04", title: "Mastery Logs",    body: "High-fidelity visualisation of your academic progression." },
];

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
};

export function AiTutorShowcase() {
  return (
    <section
      id="how-it-works"
      style={{
        padding: "120px 40px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(11,15,16,0.80)",
      }}
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 96 }}>
          <span
            style={{
              ...MONO,
              fontSize: 10,
              color: C.primary,
              letterSpacing: "0.5em",
              display: "block",
              marginBottom: 24,
            }}
          >
            EXECUTION MODEL
          </span>
          <h2
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: "clamp(28px,3.5vw,36px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: C.onSurface,
              margin: "0 0 24px",
            }}
          >
            The T3 Lifecycle
          </h2>
          <p
            style={{
              fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
              fontSize: 16,
              color: `${C.onSurfaceVariant}99`,
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Mastery is a recursive function of evaluation and adaptation.
          </p>
        </div>

        {/* Steps */}
        <div
          className="grid grid-cols-1 md:grid-cols-4"
          style={{ gap: 64, position: "relative" }}
        >
          {/* Connecting line */}
          <div
            className="hidden md:block"
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              right: 0,
              height: 1,
              background: "rgba(255,255,255,0.05)",
              zIndex: 0,
            }}
          />

          {STEPS.map(({ icon, num, title, body }) => (
            <div
              key={num}
              style={{ textAlign: "center", position: "relative", zIndex: 1 }}
              className="group"
            >
              {/* Icon box */}
              <div
                style={{
                  width: 80,
                  height: 80,
                  margin: "0 auto 40px",
                  background: C.surface,
                  border: "1px solid rgba(255,255,255,0.10)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  transition: "border-color 0.5s, transform 0.5s",
                }}
                className="group-hover:border-[#d2bbff80] group-hover:-translate-y-2"
              >
                <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: 32 }}>{icon}</span>
                {/* Number badge */}
                <span
                  style={{
                    ...MONO,
                    position: "absolute",
                    top: -8,
                    right: -8,
                    fontSize: 8,
                    color: "rgba(255,255,255,0.2)",
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
                  letterSpacing: "-0.01em",
                  color: C.onSurface,
                  margin: "0 0 16px",
                }}
              >
                {title}
              </h4>
              <p
                style={{
                  fontFamily: "var(--font-hanken), sans-serif",
                  fontSize: 14,
                  color: `${C.onSurfaceVariant}B3`,
                  lineHeight: 1.6,
                  padding: "0 16px",
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
