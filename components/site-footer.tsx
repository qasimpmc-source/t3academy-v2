import Link from "next/link";

const C = {
  primary: "#95d3ba", onPrimary: "#003829",
  primaryContainer: "#064e3b",
  secondary: "#e9c349", onSecondaryContainer: "#342800",
  onSurface: "#e5e2e1", onSurfaceVariant: "#bfc9c3",
  surfaceContainerLowest: "#0e0e0e",
};

// ── Final CTA ─────────────────────────────────────────────────────────────────

export function FinalCta() {
  return (
    <section style={{ padding: "64px 24px", maxWidth: 1440, margin: "0 auto" }}>
      <div
        className="glass-card"
        style={{
          padding: "80px 40px",
          textAlign: "center",
          background: "rgba(6,78,59,0.20)",
          borderColor: "rgba(255,255,255,0.10)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -160, right: -160,
            width: 600, height: 600,
            borderRadius: "50%",
            background: `${C.primary}1A`,
            filter: "blur(120px)",
            pointerEvents: "none",
          }}
        />

        <h2
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(36px,6vw,72px)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: C.onSurface,
            margin: "0 0 32px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Exams{" "}
          <span style={{ fontStyle: "italic", color: C.primary }}>done right.</span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 400,
            fontSize: 18,
            color: `${C.onSurfaceVariant}CC`,
            maxWidth: 480,
            margin: "0 auto 64px",
            lineHeight: 1.6,
            position: "relative",
            zIndex: 1,
          }}
        >
          Secure your spot. Your AI tutor is ready.
        </p>

        <Link
          href="/auth/signup"
          className="brutalist-btn hover:scale-105 active:scale-95"
          style={{
            background: C.secondary,
            color: C.onSecondaryContainer,
            fontFamily: "var(--font-montserrat), sans-serif",
            fontWeight: 700,
            fontSize: 24,
            letterSpacing: "-0.01em",
            padding: "28px 64px",
            textDecoration: "none",
            display: "inline-block",
            transition: "transform 0.2s",
            position: "relative",
            zIndex: 1,
          }}
        >
          Get started today
        </Link>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

export function SiteFooter() {
  return (
    <footer
      style={{
        background: C.surfaceContainerLowest,
        padding: "64px 24px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-12"
        style={{ maxWidth: 1440, margin: "0 auto", gap: 48 }}
      >
        {/* Left — brand */}
        <div className="md:col-span-4">
          <div style={{ fontWeight: 700, fontSize: 22, letterSpacing: "-0.02em", color: C.onSurface, marginBottom: 16, fontFamily: "var(--font-montserrat), sans-serif" }}>
            T3 Academy
          </div>
          <p style={{ fontSize: 16, color: `${C.onSurfaceVariant}99`, fontFamily: "var(--font-montserrat), sans-serif" }}>
            A home for curious minds.
          </p>
        </div>

        {/* Centre — links */}
        <div className="md:col-span-4 flex justify-center items-center flex-wrap" style={{ gap: 24 }}>
          {[
            { label: "11+ Prep", href: "/auth/signup" },
            { label: "GCSE",     href: "/auth/signup" },
            { label: "IQ Test",  href: "/iq-test"     },
            { label: "About",    href: "#"             },
          ].map(({ label, href }, i, arr) => (
            <span key={label} style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <Link href={href} style={{ fontWeight: 600, fontSize: 14, letterSpacing: "0.05em", color: `${C.onSurfaceVariant}99`, textDecoration: "none", transition: "color 0.2s" }} className="hover:text-[#95d3ba]">
                {label}
              </Link>
              {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.10)" }}>|</span>}
            </span>
          ))}
        </div>

        {/* Right — URL */}
        <div className="md:col-span-4 flex md:justify-end items-center">
          <a
            href="https://t3academy.co.uk"
            style={{
              fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
              fontSize: 12,
              color: `${C.primary}99`,
              letterSpacing: "0.1em",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            className="hover:text-[#95d3ba]"
          >
            t3academy.co.uk
          </a>
        </div>
      </div>
    </footer>
  );
}
