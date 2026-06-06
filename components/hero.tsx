import Link from "next/link";

const C = { primary: "#95d3ba", secondary: "#e9c349", onSecondaryContainer: "#342800", onSurfaceVariant: "#bfc9c3" };

export function Hero() {
  return (
    <>
      {/* ── Main Hero ── */}
      <section
        style={{
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "128px 24px 80px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: "clamp(40px,6vw,64px)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#e5e2e1",
              margin: "0 0 32px",
            }}
          >
            Your child&rsquo;s{" "}
            <span style={{ color: C.primary, fontStyle: "italic" }}>AI tutor.</span>{" "}
            Available at 10pm, patient every time, and it never runs out of practice questions.
          </h1>

          <p
            style={{
              fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
              fontSize: 12,
              color: `${C.onSurfaceVariant}99`,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              margin: "0 0 64px",
            }}
          >
            T3 Academy — Test. Teach. Test again.
          </p>

          <Link
            href="/auth/signup"
            className="brutalist-btn hover:scale-105 active:scale-95"
            style={{
              background: C.secondary,
              color: C.onSecondaryContainer,
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.01em",
              padding: "24px 48px",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s",
            }}
          >
            Start for free — no card needed
          </Link>
        </div>
      </section>

      {/* ── Trust strip ── */}
      <div
        style={{
          padding: "24px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          background: "rgba(14,14,14,0.30)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
            fontSize: 11,
            color: `${C.onSurfaceVariant}66`,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Trusted by families across the UK &nbsp;&middot;&nbsp; Exam-board aligned &nbsp;&middot;&nbsp; Built by educators
        </p>
      </div>
    </>
  );
}
