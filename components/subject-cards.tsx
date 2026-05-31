"use client";

import Link from "next/link";
import { Brain } from "lucide-react";
import { FadeUp } from "./fade-up";
import { HP } from "./hp-tokens";

// Inline owl icon for card 1 (matches the original SVG icon style)
function OwlIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="48"
      height="48"
    >
      <circle cx="20" cy="18" r="10" />
      <circle cx="15" cy="15" r="3" />
      <circle cx="25" cy="15" r="3" />
      <path d="M17 23 L20 26 L23 23" />
      <path d="M12 8 L14 12" />
      <path d="M28 8 L26 12" />
    </svg>
  );
}

// Book-open icon inline SVG
function BookOpenIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="48"
      height="48"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

const PRODUCTS = [
  {
    icon: <OwlIcon />,
    name: "T3 11+ Prep",
    blurb: "AI-powered preparation for the GL Assessment. Meet Ollie.",
    tag: "Ages 9 to 11",
    topBorder: HP.gold,
    tagColor: HP.gold,
    linkColor: HP.gold,
    linkBorder: HP.gold,
    href: "/auth/signup",
    cta: "Start preparing",
    floatClass: "float-1",
  },
  {
    icon: <BookOpenIcon />,
    name: "T3 Secondary",
    blurb: "Subject zones, practice tools, and enrichment for secondary school students.",
    tag: "Ages 11 to 18",
    topBorder: HP.sage,
    tagColor: HP.sage,
    linkColor: HP.sage,
    linkBorder: HP.sage,
    href: "/auth/signup",
    cta: "Explore subjects",
    floatClass: "float-2",
  },
  {
    icon: <Brain size={48} />,
    name: "T3 Mind Score",
    blurb: "A free adaptive IQ test. Get your score, your breakdown, and a certificate.",
    tag: "All ages",
    topBorder: HP.rose,
    tagColor: HP.rose,
    linkColor: HP.rose,
    linkBorder: HP.rose,
    href: "/iq-test",
    cta: "Take the test",
    floatClass: "float-3",
  },
];

export function SubjectCards() {
  return (
    <section
      id="products"
      style={{
        padding: "80px 24px",
        position: "relative",
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1152, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(28px, 4vw, 40px)",
            fontWeight: 700,
            color: HP.dark,
            margin: "0 0 56px",
            letterSpacing: "-0.02em",
          }}
        >
          Three ways to learn.
        </h2>

        <div
          className="grid md:grid-cols-3"
          style={{ gap: 32, position: "relative", zIndex: 1 }}
        >
          {PRODUCTS.map((p, i) => (
            <FadeUp key={p.name} delay={i * 0.15}>
              <div
                className={`hp-glow ${p.floatClass} group`}
                style={{
                  background: HP.surface,
                  borderRadius: 10,
                  padding: "32px",
                  borderTop: `3px solid ${p.topBorder}`,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "default",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 12px 40px rgba(200,154,94,0.15)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "";
                }}
              >
                {/* Hover tint overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(135deg, ${p.topBorder}08 0%, transparent 100%)`,
                    opacity: 0,
                    transition: "opacity 0.3s",
                    pointerEvents: "none",
                  }}
                  className="group-hover:opacity-100"
                />

                <div style={{ position: "relative", zIndex: 1 }}>
                  {/* Icon */}
                  <div style={{ color: p.topBorder, marginBottom: 24, width: 48, height: 48 }}>
                    {p.icon}
                  </div>

                  <h3
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: HP.dark,
                      margin: "0 0 8px",
                    }}
                  >
                    {p.name}
                  </h3>

                  <p
                    style={{
                      fontSize: 14,
                      color: HP.muted,
                      lineHeight: 1.65,
                      margin: "0 0 16px",
                    }}
                  >
                    {p.blurb}
                  </p>

                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: p.tagColor,
                    }}
                  >
                    {p.tag}
                  </span>

                  <div style={{ marginTop: 24 }}>
                    <Link
                      href={p.href}
                      style={{
                        fontSize: 14,
                        fontWeight: 700,
                        color: HP.dark,
                        textDecoration: "none",
                        borderBottom: `1px solid ${p.linkBorder}`,
                        paddingBottom: 2,
                        transition: "color 0.15s",
                      }}
                      className="hover:text-[#C89A5E]"
                    >
                      {p.cta} &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
