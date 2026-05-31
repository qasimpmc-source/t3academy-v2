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
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <Link
          href="/"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 20,
            fontWeight: 700,
            color: HP.dark,
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          T3 Academy
        </Link>

        {/* Centre links — desktop only */}
        <div
          className="hidden md:flex"
          style={{ gap: 24, fontSize: 14, color: HP.muted }}
        >
          {(
            [
              { label: "Products", href: "#products" },
              { label: "Why T3",   href: "#why"      },
              { label: "About",    href: "#footer"   },
            ] as const
          ).map(({ label, href }) => (
            <a
              key={label}
              href={href}
              style={{ color: HP.muted, textDecoration: "none" }}
              className="transition-colors hover:text-[#C89A5E]"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link
            href="/auth/login"
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: HP.muted,
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: 6,
            }}
            className="transition-colors hover:text-[#1A1610]"
          >
            Log in
          </Link>
          <Link
            href="/auth/signup"
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: HP.dark,
              background: HP.gold,
              textDecoration: "none",
              padding: "9px 18px",
              borderRadius: 6,
              letterSpacing: "0.02em",
            }}
            className="transition-opacity hover:opacity-85"
          >
            Start free
          </Link>
        </div>
      </div>
    </nav>
  );
}
