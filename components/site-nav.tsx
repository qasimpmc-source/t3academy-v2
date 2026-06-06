import Link from "next/link";
import { HP } from "./hp-tokens";

export function SiteNav() {
  return (
    <nav
      style={{
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "22px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 19,
            fontWeight: 700,
            color: HP.dark,
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          T3 Academy
        </Link>

        {/* Centre nav links — desktop */}
        <div
          className="hidden md:flex"
          style={{ gap: 32, fontSize: 14 }}
        >
          {(
            [
              { label: "Products",  href: "#products" },
              { label: "Why T3",    href: "#why"      },
              { label: "About",     href: "#footer"   },
            ] as const
          ).map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{ color: HP.muted, textDecoration: "none" }}
              className="transition-colors hover:text-[#1A1610]"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Right side: Log in + Free IQ Quiz */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link
            href="/auth/login"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: HP.muted,
              textDecoration: "none",
              padding: "8px 12px",
            }}
            className="transition-colors hover:text-[#1A1610]"
          >
            Log in
          </Link>
          <Link
            href="/iq-test"
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: HP.dark,
              textDecoration: "none",
              padding: "9px 18px",
              borderRadius: 999,
              border: `1.5px solid ${HP.dark}`,
              background: "transparent",
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
            className="transition-colors hover:bg-[#1A1610] hover:text-[#F5F1EB]"
          >
            Free IQ Quiz
          </Link>
        </div>
      </div>
    </nav>
  );
}
