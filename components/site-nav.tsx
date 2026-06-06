"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const P = {
  primary:   "#002045",
  onPrimary: "#ffffff",
  secondary: "#904d00",
  surface:   "#f7f9fb",
  onSurfaceVariant: "#43474e",
  outlineVariant: "#c4c6cf",
};

const NAV_LINKS = [
  { label: "11+ Prep",      href: "#products" },
  { label: "Secondary",     href: "#products" },
  { label: "Mind Score",    href: "#products" },
  { label: "How it Works",  href: "#how-it-works" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: scrolled ? "rgba(247,249,251,0.92)" : "rgba(247,249,251,0.80)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: scrolled ? "0 1px 8px rgba(0,32,69,0.12)" : "none",
        transition: "box-shadow 0.2s",
        fontFamily: "'Montserrat', system-ui, sans-serif",
      }}
    >
      <nav
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          height: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontWeight: 700,
            fontSize: 22,
            color: P.primary,
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          T3 Academy
        </Link>

        {/* Centre links */}
        <div className="hidden md:flex" style={{ gap: 24, alignItems: "center" }}>
          {NAV_LINKS.map(({ label, href }, i) => (
            <a
              key={label}
              href={href}
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.01em",
                color: i === 0 ? P.primary : P.onSurfaceVariant,
                textDecoration: "none",
                borderBottom: i === 0 ? `2px solid ${P.secondary}` : "2px solid transparent",
                paddingBottom: 2,
                transition: "color 0.15s",
              }}
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/auth/signup"
          style={{
            background: P.primary,
            color: P.onPrimary,
            fontWeight: 600,
            fontSize: 14,
            letterSpacing: "0.01em",
            padding: "10px 24px",
            borderRadius: 9999,
            textDecoration: "none",
            display: "inline-block",
            transition: "opacity 0.15s, transform 0.15s",
          }}
          className="active:scale-90 hover:opacity-90"
        >
          Get Started
        </Link>
      </nav>
    </header>
  );
}
