import Link from "next/link";

const C = {
  primary:       "#d2bbff",
  primaryContainer: "#7c3aed",
  onPrimaryFixed: "#25005a",
  onSurfaceVariant: "#ccc3d8",
};

const NAV_LINKS = [
  { label: "PROGRAMS",   href: "#programs",   active: true },
  { label: "CURRICULUM", href: "#how-it-works", active: false },
  { label: "FACULTY",    href: "#programs",   active: false },
  { label: "ADMISSIONS", href: "/auth/signup", active: false },
];

export function SiteNav() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: "rgba(16,20,21,0.05)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 40px",
          height: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 32, height: 1, background: `${C.primary}66`, display: "inline-block" }} />
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: C.primary,
              textDecoration: "none",
              letterSpacing: "-0.02em",
            }}
          >
            T3 Academy
          </Link>
        </div>

        {/* Centre links */}
        <div className="hidden md:flex" style={{ gap: 48, alignItems: "center" }}>
          {NAV_LINKS.map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              style={{
                fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.2em",
                color: active ? C.primary : `${C.onSurfaceVariant}99`,
                textDecoration: "none",
                borderBottom: active ? `1px solid ${C.primary}66` : "none",
                paddingBottom: active ? 4 : 0,
                transition: "color 0.3s",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/auth/signup"
          className="brutalist-btn"
          style={{
            background: C.primaryContainer,
            color: "#ede0ff",
            fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.2em",
            padding: "12px 32px",
            textDecoration: "none",
            display: "inline-block",
          }}
        >
          ENROLL NOW
        </Link>
      </div>
    </nav>
  );
}
