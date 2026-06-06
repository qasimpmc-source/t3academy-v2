import Link from "next/link";
import { HP } from "./hp-tokens";

export function Hero() {
  return (
    <section
      style={{
        padding: "80px 24px 96px",
        textAlign: "center",
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
        position: "relative",
        zIndex: 1,
      }}
    >
      {/* Headline — two lines, large serif */}
      <h1
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(52px, 8vw, 96px)",
          fontWeight: 700,
          color: HP.dark,
          lineHeight: 1.05,
          letterSpacing: "-0.03em",
          margin: "0 0 28px",
        }}
      >
        Test. Teach.
        <br />
        Test again.
      </h1>

      {/* Sub-headline */}
      <p
        style={{
          fontSize: "clamp(16px, 2vw, 19px)",
          color: HP.muted,
          lineHeight: 1.6,
          margin: "0 auto 36px",
          maxWidth: 420,
        }}
      >
        A home for curious minds. A new way to learn.
      </p>

      {/* Primary CTA — Wisprflow-style pill button */}
      <Link
        href="#products"
        style={{
          display: "inline-block",
          background: "#7C6AE8",
          color: "#ffffff",
          fontFamily: "Trebuchet MS, system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 16,
          padding: "14px 36px",
          borderRadius: 999,
          border: "2px solid #000000",
          textDecoration: "none",
          letterSpacing: "0.01em",
          transition: "opacity 0.15s",
        }}
        className="hover:opacity-90"
      >
        Explore T3 Academy &rarr;
      </Link>

      {/* Social-proof micro-copy */}
      <p
        style={{
          marginTop: 16,
          fontSize: 13,
          color: HP.muted,
        }}
      >
        No card required &nbsp;&middot;&nbsp; Start in 30 seconds
      </p>
    </section>
  );
}
