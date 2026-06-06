import Link from "next/link";

const C = {
  primary:         "#d2bbff",
  primaryContainer:"#7c3aed",
  secondary:       "#44e2cd",
  onSurface:       "#e0e3e5",
  onSurfaceVariant:"#ccc3d8",
  onPrimaryFixed:  "#25005a",
  surfaceContainerLowest: "#0b0f10",
};

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.2em",
};

// ── Final CTA ─────────────────────────────────────────────────────────────────

export function FinalCta() {
  return (
    <section style={{ padding: "120px 40px", maxWidth: 1440, margin: "0 auto" }}>
      <div
        className="glass-card"
        style={{
          padding: "80px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {/* Glow blobs */}
        <div aria-hidden="true" style={{ position: "absolute", top: -160, left: -160, width: 600, height: 600, borderRadius: "50%", background: `${C.primary}1A`, filter: "blur(120px)", pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", bottom: -160, right: -160, width: 600, height: 600, borderRadius: "50%", background: `${C.secondary}0D`, filter: "blur(120px)", pointerEvents: "none" }} />

        {/* Corner accents */}
        {[
          { top: 16, left: 16, borderTop: true, borderLeft: true },
          { top: 16, right: 16, borderTop: true, borderRight: true },
          { bottom: 16, left: 16, borderBottom: true, borderLeft: true },
          { bottom: 16, right: 16, borderBottom: true, borderRight: true },
        ].map((pos, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: "absolute",
              width: 16,
              height: 16,
              ...Object.fromEntries(
                Object.entries(pos)
                  .filter(([k]) => !["borderTop","borderBottom","borderLeft","borderRight"].includes(k))
                  .map(([k, v]) => [k, v])
              ),
              borderTop:    pos.borderTop    ? "1px solid rgba(255,255,255,0.20)" : "none",
              borderBottom: pos.borderBottom ? "1px solid rgba(255,255,255,0.20)" : "none",
              borderLeft:   pos.borderLeft   ? "1px solid rgba(255,255,255,0.20)" : "none",
              borderRight:  pos.borderRight  ? "1px solid rgba(255,255,255,0.20)" : "none",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Content */}
        <h2
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: "clamp(32px,5vw,60px)",
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: C.onSurface,
            maxWidth: 800,
            margin: "0 auto 48px",
            position: "relative",
            zIndex: 1,
          }}
        >
          Redefine your{" "}
          <span
            className="text-glow-purple"
            style={{ fontStyle: "italic", color: C.primary, fontWeight: 800 }}
          >
            academic potential.
          </span>
        </h2>

        <p
          style={{
            fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif",
            fontSize: 20,
            fontWeight: 300,
            color: `${C.onSurfaceVariant}B3`,
            maxWidth: 640,
            margin: "0 auto 64px",
            lineHeight: 1.7,
            position: "relative",
            zIndex: 1,
          }}
        >
          Join the next cohort of high-attaining students architecting their future through engineering-grade education.
        </p>

        <div style={{ position: "relative", zIndex: 1 }}>
          <Link
            href="/auth/signup"
            className="brutalist-btn hover:scale-105 active:scale-95"
            style={{
              background: C.primaryContainer,
              color: "#ffffff",
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "-0.01em",
              padding: "28px 64px",
              textDecoration: "none",
              display: "inline-block",
              transition: "transform 0.2s",
            }}
          >
            Secure Your Spot
          </Link>
          <div
            style={{
              ...MONO,
              marginTop: 48,
              color: `${C.onSurfaceVariant}66`,
              letterSpacing: "0.5em",
            }}
          >
            LIMITED ENROLLMENT CAPACITY
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

const FOOTER_LINKS = {
  INSTITUTION: [
    { label: "PRIVACY_POLICY",   href: "#" },
    { label: "TERMS_OF_SERVICE", href: "#" },
    { label: "CONTACT_SECURE",   href: "mailto:hello@t3academy.co.uk" },
  ],
  COMMUNITY: [
    { label: "ALUMNI_NET",    href: "#" },
    { label: "CAREERS_OPEN", href: "#" },
    { label: "PRESS_ASSETS", href: "#" },
  ],
};

export function SiteFooter() {
  return (
    <footer
      style={{
        background: C.surfaceContainerLowest,
        padding: "96px 80px",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="grid grid-cols-12"
        style={{ maxWidth: 1440, margin: "0 auto", gap: 48 }}
      >
        {/* Brand */}
        <div className="col-span-12 md:col-span-6">
          <div
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              fontWeight: 700,
              fontSize: 22,
              letterSpacing: "-0.02em",
              color: C.onSurface,
              marginBottom: 32,
            }}
          >
            T3 Academy
          </div>
          <p
            style={{
              fontFamily: "var(--font-hanken), sans-serif",
              fontSize: 16,
              color: `${C.onSurfaceVariant}99`,
              maxWidth: 320,
              lineHeight: 1.6,
              marginBottom: 48,
            }}
          >
            Precision-engineered curriculum systems architected for the next generation of academic leaders.
          </p>
          <p style={{ ...MONO, color: `${C.onSurfaceVariant}4D`, letterSpacing: "0.3em" }}>
            &copy; 2024 T3 ACADEMY. ALL SYSTEMS NOMINAL.
          </p>
        </div>

        {/* Links */}
        <div className="col-span-12 md:col-span-6 grid grid-cols-2" style={{ gap: 48 }}>
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <span style={{ ...MONO, color: C.primary, letterSpacing: "0.4em", marginBottom: 16 }}>
                {section}
              </span>
              {links.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  style={{ ...MONO, color: `${C.onSurfaceVariant}99`, textDecoration: "none", transition: "color 0.2s" }}
                  className="hover:text-[#44e2cd]"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
