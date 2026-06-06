import Link from "next/link";

const P = {
  primary:         "#002045",
  onPrimary:       "#ffffff",
  secondary:       "#904d00",
  secondaryFixed:  "#ffdcc3",
  onSecondaryFixed:"#2f1500",
  tertiaryFixed:   "#89f5e7",
  onTertiaryFixed: "#00201d",
  onSurfaceVariant:"#43474e",
  surfaceContainerLowest: "#ffffff",
};

const OLLIE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAvBuxROpPInwT2f2heMOhmrUTAjJRr1BKEU2hWq0yjDJnCt_Wpdxhio8pnSlJ21UuPKTyfssFiY31-IuD8j1fciQV7CWKFkWyJTHnlHpIbH7Wy9K-NfC5FiyH53juWOrqhWlqZLMOx_1ADqTUEPu-ITDqDbELZZHsQR1ojkArlYBy8aLsQRQkt0X5BWm4mtfFAFxpRhZLwO8B_0GAnoLuhw2U0grr89QUwBr9WS-h0bWvwaf4HtPPqgbYuv_vaeFj5mwFQpNUuHg";

export function Hero() {
  return (
    <section
      className="academic-gradient relative overflow-hidden"
      style={{ minHeight: "85vh", display: "flex", alignItems: "center" }}
    >
      {/* Decorative blurs */}
      <div aria-hidden="true" style={{ position: "absolute", top: "25%", right: "-80px", width: 384, height: 384, borderRadius: "50%", background: "rgba(144,77,0,0.10)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div aria-hidden="true" style={{ position: "absolute", bottom: "25%", left: "-80px", width: 320, height: 320, borderRadius: "50%", background: "rgba(0,32,69,0.05)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
        className="grid-cols-1 lg:grid-cols-2"
      >
        {/* Left — text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, fontFamily: "'Montserrat', system-ui, sans-serif" }}>
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: P.secondaryFixed,
              color: P.onSecondaryFixed,
              padding: "6px 16px",
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              width: "fit-content",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>auto_awesome</span>
            AI-Powered Learning
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Montserrat', system-ui, sans-serif",
              fontSize: "clamp(40px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: P.primary,
              margin: 0,
            }}
          >
            Test. Teach.
            <br />
            <span style={{ color: P.secondary }}>Test again.</span>
          </h1>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Atkinson Hyperlegible Next', system-ui, sans-serif",
              fontSize: 18,
              lineHeight: 1.6,
              color: P.onSurfaceVariant,
              margin: 0,
              maxWidth: 480,
            }}
          >
            A home for curious minds. Our AI tutor helps students master concepts through adaptive testing and personalised teaching, bridging the gap between rigour and nurture.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", paddingTop: 8 }}>
            <Link
              href="/auth/signup"
              style={{
                background: P.primary,
                color: P.onPrimary,
                fontFamily: "'Montserrat', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                padding: "16px 32px",
                borderRadius: 12,
                textDecoration: "none",
                boxShadow: "0 8px 24px rgba(0,32,69,0.3)",
                transition: "transform 0.2s",
              }}
              className="hover:scale-105"
            >
              Start Learning Today
            </Link>
            <a
              href="#how-it-works"
              style={{
                background: P.surfaceContainerLowest,
                color: P.primary,
                fontFamily: "'Montserrat', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 16,
                padding: "16px 32px",
                borderRadius: 12,
                textDecoration: "none",
                border: `2px solid rgba(0,32,69,0.10)`,
                transition: "background 0.15s",
              }}
            >
              How it Works
            </a>
          </div>
        </div>

        {/* Right — glass card with Ollie */}
        <div className="hidden lg:block" style={{ position: "relative" }}>
          <div
            className="hero-glass tonal-layer-1"
            style={{ borderRadius: 40, padding: 32, position: "relative", overflow: "hidden" }}
          >
            {/* Live Progress badge */}
            <div
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: P.tertiaryFixed,
                color: P.onTertiaryFixed,
                padding: "4px 12px",
                borderRadius: 9999,
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'Montserrat', sans-serif",
                letterSpacing: "0.05em",
              }}
            >
              LIVE PROGRESS
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={OLLIE_URL}
              alt="Ollie the Owl — T3 Academy AI tutor mascot"
              style={{ width: "100%", height: "auto", objectFit: "contain", borderRadius: 16 }}
            />
          </div>

          {/* Floating badge — top left */}
          <div
            className="animate-bounce"
            style={{
              position: "absolute",
              top: -24,
              left: -24,
              background: "#ffffff",
              padding: "12px 16px",
              borderRadius: 16,
              boxShadow: "0 8px 24px rgba(0,32,69,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              animationDuration: "3s",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <span className="material-symbols-outlined" style={{ color: P.secondary, fontSize: 22 }}>verified</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: P.primary }}>11+ Mastery</span>
          </div>

          {/* Floating badge — bottom right */}
          <div
            className="animate-pulse"
            style={{
              position: "absolute",
              bottom: -16,
              right: 40,
              background: "#ffffff",
              padding: "12px 16px",
              borderRadius: 16,
              boxShadow: "0 8px 24px rgba(0,32,69,0.15)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            <span className="material-symbols-outlined" style={{ color: "#003d37", fontSize: 22 }}>psychology</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: P.primary }}>IQ 124+</span>
          </div>
        </div>
      </div>
    </section>
  );
}
