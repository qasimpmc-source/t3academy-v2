import Link from "next/link";

const C = { primary: "#95d3ba", onPrimary: "#003829", secondary: "#e9c349", onSecondaryContainer: "#342800" };

export function SiteNav() {
  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
        background: "rgba(19,19,19,0.05)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1440, margin: "0 auto", padding: "0 24px",
          height: 80, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 32, height: 1, background: `${C.primary}66`, display: "inline-block" }} />
          <Link href="/" style={{ fontWeight: 700, fontSize: 22, color: C.primary, textDecoration: "none", letterSpacing: "-0.02em", fontFamily: "var(--font-montserrat), sans-serif" }}>
            T3 Academy
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/auth/login" style={{ color: "#e5e2e1", fontWeight: 600, fontSize: 14, letterSpacing: "0.05em", textDecoration: "none", padding: "8px 16px", transition: "color 0.2s" }}>
            Sign in
          </Link>
          <Link
            href="/iq-test"
            className="brutalist-btn"
            style={{
              background: C.secondary, color: C.onSecondaryContainer,
              fontWeight: 700, fontSize: 14, letterSpacing: "0.05em",
              padding: "10px 24px", textDecoration: "none", display: "inline-block",
              textTransform: "uppercase",
            }}
          >
            Try free IQ test
          </Link>
        </div>
      </div>
    </nav>
  );
}
