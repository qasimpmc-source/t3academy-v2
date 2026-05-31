import Link from "next/link";
import { HP } from "./hp-tokens";

// Decorative owl outline SVG — faithful to the original HTML
function OwlDecoration() {
  return (
    <div
      className="float-1"
      style={{
        position: "absolute",
        top: 16,
        right: 24,
        opacity: 0.06,
        pointerEvents: "none",
      }}
    >
      <svg width="160" height="160" viewBox="0 0 140 140" fill="none">
        <circle cx="70" cy="60" r="40" stroke="#C89A5E" strokeWidth="2" />
        <circle cx="55" cy="52" r="10" stroke="#C89A5E" strokeWidth="2" />
        <circle cx="85" cy="52" r="10" stroke="#C89A5E" strokeWidth="2" />
        <path d="M60 75 L70 85 L80 75" stroke="#C89A5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 30 L50 45" stroke="#C89A5E" strokeWidth="2" strokeLinecap="round" />
        <path d="M100 30 L90 45" stroke="#C89A5E" strokeWidth="2" strokeLinecap="round" />
        <polygon points="70,100 55,130 85,130" stroke="#C89A5E" strokeWidth="2" fill="none" />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <section
      style={{
        maxWidth: 1152,
        margin: "0 auto",
        padding: "48px 24px 80px",
        position: "relative",
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
      }}
    >
      <OwlDecoration />

      <div style={{ maxWidth: 560, position: "relative", zIndex: 1 }}>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            color: HP.dark,
            lineHeight: 1.1,
            margin: "0 0 24px",
            letterSpacing: "-0.02em",
          }}
        >
          Test, Teach and Test Again.
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: HP.muted,
            lineHeight: 1.7,
            margin: "0 0 32px",
            maxWidth: 480,
          }}
        >
          A home for curious minds.
        </p>

        <Link
          href="#products"
          style={{
            display: "inline-block",
            background: HP.gold,
            color: HP.dark,
            fontWeight: 700,
            fontSize: 14,
            padding: "12px 32px",
            borderRadius: 6,
            textDecoration: "none",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            transition: "opacity 0.15s",
          }}
          className="hover:opacity-85"
        >
          Explore T3 Academy
        </Link>
      </div>
    </section>
  );
}
