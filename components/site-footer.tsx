import Link from "next/link";
import { HP } from "./hp-tokens";

// Trust bar + full footer combined (matches HTML structure)

export function FinalCta() {
  return (
    <section style={{ padding: "0 24px 32px", fontFamily: "Trebuchet MS, system-ui, sans-serif" }}>
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          background: "rgba(200,154,94,0.05)",
          border: `1px solid ${HP.border}`,
          borderRadius: 10,
          padding: "32px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 15, color: HP.muted, margin: 0 }}>
          No ads. No data sold. Built by educators.
        </p>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer
      id="footer"
      style={{
        padding: "48px 24px",
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          borderTop: `1px solid rgba(200,154,94,0.2)`,
          paddingTop: 32,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
        className="md:flex-row md:items-center md:justify-between"
      >
        {/* Brand */}
        <div>
          <span
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 18,
              fontWeight: 700,
              color: HP.dark,
            }}
          >
            T3 Academy
          </span>
          <p style={{ fontSize: 14, color: HP.muted, marginTop: 4, marginBottom: 0 }}>
            Curious minds welcome.
          </p>
        </div>

        {/* Links */}
        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 14,
            color: HP.muted,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "11+ Prep",   href: "/auth/signup" },
            { label: "Secondary",  href: "/auth/signup" },
            { label: "Mind Score", href: "/iq-test"     },
            { label: "Log in",     href: "/auth/login"  },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              style={{ color: HP.muted, textDecoration: "none" }}
              className="transition-colors hover:text-[#C89A5E]"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Domain */}
        <p style={{ fontSize: 12, color: HP.muted, margin: 0 }}>
          t3academy.co.uk
        </p>
      </div>
    </footer>
  );
}
