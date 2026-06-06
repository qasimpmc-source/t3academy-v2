import Link from "next/link";

const C = {
  primary:         "#d2bbff",
  primaryContainer:"#7c3aed",
  onPrimaryFixed:  "#25005a",
  secondary:       "#44e2cd",
  onSurface:       "#e0e3e5",
  onSurfaceVariant:"#ccc3d8",
};

export function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 40px",
        maxWidth: 1440,
        margin: "0 auto",
        position: "relative",
      }}
    >
      {/* Radial purple glow behind content */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: "25%",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `${C.primary}0D`,
          filter: "blur(160px)",
          pointerEvents: "none",
        }}
      />

      <div
        className="grid grid-cols-12"
        style={{ width: "100%", alignItems: "center", gap: 40 }}
      >
        {/* Left — 8 columns */}
        <div
          className="col-span-12 lg:col-span-8"
          style={{ display: "flex", flexDirection: "column", gap: 0 }}
        >
          {/* System label */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
            <span
              style={{
                fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: "0.4em",
                color: C.secondary,
              }}
            >
              SYSTEM v.4.2
            </span>
            <div style={{ height: 1, width: 96, background: "rgba(255,255,255,0.10)" }} />
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: "clamp(44px,6.5vw,72px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              margin: "0 0 40px",
            }}
          >
            <span style={{ display: "block", color: C.onSurface, fontWeight: 300 }}>Test. Teach.</span>
            <span
              className="text-glow-purple"
              style={{ display: "block", color: C.primary, fontStyle: "italic", fontWeight: 800 }}
            >
              Test again.
            </span>
          </h1>

          {/* Body */}
          <p
            style={{
              fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
              fontSize: 20,
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: "0.01em",
              color: C.onSurfaceVariant,
              opacity: 0.8,
              maxWidth: 640,
              margin: "0 0 56px",
            }}
          >
            A rigorous architectural approach to cognitive mastery. We engineer excellence through recursive testing cycles, high-fidelity analytics, and personalised faculty intervention.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row" style={{ gap: 32, alignItems: "center" }}>
            <Link
              href="/auth/signup"
              className="brutalist-btn"
              style={{
                background: C.primary,
                color: C.onPrimaryFixed,
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                padding: "24px 48px",
                textDecoration: "none",
                display: "inline-block",
                transition: "transform 0.2s",
                letterSpacing: "-0.01em",
              }}
            >
              Start Learning
            </Link>
            <a
              href="#how-it-works"
              style={{
                color: C.onSurface,
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontWeight: 500,
                fontSize: 20,
                padding: "24px 48px",
                border: "1px solid rgba(255,255,255,0.10)",
                textDecoration: "none",
                backdropFilter: "blur(4px)",
                transition: "background 0.2s",
                letterSpacing: "-0.01em",
              }}
            >
              Curriculum Guide
            </a>
          </div>
        </div>

        {/* Right — 4 columns — Technical Visualization */}
        <div className="hidden lg:block col-span-4" style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              aspectRatio: "1/1",
              border: "1px solid rgba(255,255,255,0.05)",
              padding: 32,
            }}
          >
            {/* Coordinate labels */}
            <span
              style={{
                position: "absolute",
                top: -10,
                left: -2,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                color: "rgba(255,255,255,0.2)",
              }}
            >
              41.8781° N
            </span>
            <span
              style={{
                position: "absolute",
                bottom: -10,
                right: -2,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                color: "rgba(255,255,255,0.2)",
              }}
            >
              87.6298° W
            </span>

            {/* Rotating diamond */}
            <div
              className="animate-pulse"
              style={{
                width: "100%",
                height: "100%",
                border: `1px solid ${C.primary}33`,
                transform: "rotate(45deg)",
              }}
            />
            {/* Inner tilted square */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "50%",
                  height: "50%",
                  border: `1px solid ${C.secondary}4D`,
                  transform: "rotate(-12deg)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
