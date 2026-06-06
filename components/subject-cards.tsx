import Link from "next/link";

const P = {
  primary:             "#002045",
  onPrimary:           "#ffffff",
  secondary:           "#904d00",
  secondaryContainer:  "#fe932c",
  onSecondaryContainer:"#663500",
  tertiaryContainer:   "#003d37",
  tertiaryFixed:       "#89f5e7",
  tertiary:            "#002522",
  onTertiary:          "#ffffff",
  onSurface:           "#191c1e",
  onSurfaceVariant:    "#43474e",
  surfaceContainer:    "#eceef0",
};

const OLLIE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAvBuxROpPInwT2f2heMOhmrUTAjJRr1BKEU2hWq0yjDJnCt_Wpdxhio8pnSlJ21UuPKTyfssFiY31-IuD8j1fciQV7CWKFkWyJTHnlHpIbH7Wy9K-NfC5FiyH53juWOrqhWlqZLMOx_1ADqTUEPu-ITDqDbELZZHsQR1ojkArlYBy8aLsQRQkt0X5BWm4mtfFAFxpRhZLwO8B_0GAnoLuhw2U0grr89QUwBr9WS-h0bWvwaf4HtPPqgbYuv_vaeFj5mwFQpNUuHg";

const SECONDARY_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBK_itPamWVmB0daWUAZUMjs0YVUExxwQUqg0pnonwUN_dM8kq80X8FzgNeFRQasTsjELfqnzhiCaDdlncfBsJbqZKN4BpNmnX-ZT1AZCsLuF_u5fORq53maU69dQZdm7CEjh3XdrZdEQ2YDcZIYMe9CtFIR90lG_9pAFVX3WXnLDjfQqSjG0qz7L-I716t6-uFoK3-MFfDXzKTw3tj_EECRLK4oc9sH0QjBGX8-kKT4PBdjsnJa0jv1TFMfPBSV_BAmlOKZq1ghg";

export function SubjectCards() {
  return (
    <section
      id="products"
      style={{
        padding: "80px 40px",
        maxWidth: 1280,
        margin: "0 auto",
        fontFamily: "'Montserrat', system-ui, sans-serif",
      }}
    >
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "clamp(26px,3.5vw,32px)", fontWeight: 700, color: P.primary, margin: "0 0 12px" }}>
          Our Programs
        </h2>
        <div style={{ height: 6, width: 96, background: P.secondary, borderRadius: 999, margin: "0 auto" }} />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>

        {/* 11+ Prep */}
        <div className="product-card tonal-layer-1" style={{ borderRadius: 24, padding: 24, display: "flex", flexDirection: "column" }}>
          <div style={{ background: P.surfaceContainer, borderRadius: 16, marginBottom: 12, overflow: "hidden", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={OLLIE_URL} alt="T3 11+ Prep" style={{ width: 192, height: 192, objectFit: "contain" }} />
            <span
              style={{ position: "absolute", bottom: 16, left: 16, background: P.secondaryContainer, color: P.onSecondaryContainer, padding: "4px 12px", borderRadius: 9999, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}
            >
              Ages 9–11
            </span>
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: P.primary, margin: "0 0 8px" }}>T3 11+ Prep</h3>
          <p style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif", fontSize: 16, color: P.onSurfaceVariant, lineHeight: 1.6, flex: 1, margin: "0 0 12px" }}>
            AI-powered preparation for the GL Assessment 11+ exam. Master Verbal, Non-Verbal, Maths, and English.
          </p>
          <Link
            href="/auth/signup"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, border: `2px solid ${P.primary}`, color: P.primary, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "background 0.15s, color 0.15s" }}
            className="hover:bg-[#002045] hover:text-white"
          >
            Learn More
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </Link>
        </div>

        {/* Secondary */}
        <div className="product-card tonal-layer-1" style={{ borderRadius: 24, padding: 24, display: "flex", flexDirection: "column" }}>
          <div style={{ background: P.surfaceContainer, borderRadius: 16, marginBottom: 12, overflow: "hidden", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SECONDARY_URL} alt="T3 Secondary" style={{ width: 192, height: 192, objectFit: "contain" }} />
            <span
              style={{ position: "absolute", bottom: 16, left: 16, background: P.tertiaryContainer, color: P.tertiaryFixed, padding: "4px 12px", borderRadius: 9999, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}
            >
              Ages 11–18
            </span>
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: P.primary, margin: "0 0 8px" }}>T3 Secondary</h3>
          <p style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif", fontSize: 16, color: P.onSurfaceVariant, lineHeight: 1.6, flex: 1, margin: "0 0 12px" }}>
            Targeted practice and curriculum enrichment across all core school subjects with adaptive AI difficulty.
          </p>
          <Link
            href="/auth/signup"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, border: `2px solid ${P.primary}`, color: P.primary, fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "background 0.15s, color 0.15s" }}
            className="hover:bg-[#002045] hover:text-white"
          >
            Learn More
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
          </Link>
        </div>

        {/* Mind Score */}
        <div
          className="product-card"
          style={{ background: "rgba(0,37,34,0.05)", border: "1px solid rgba(0,37,34,0.15)", borderRadius: 24, padding: 24, display: "flex", flexDirection: "column" }}
        >
          <div style={{ background: "#ffffff", borderRadius: 16, marginBottom: 12, overflow: "hidden", aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(0,37,34,0.10)", position: "relative" }}>
            {/* Brain icon SVG */}
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="38" stroke="#002522" strokeWidth="3" fill="none" />
              <path d="M35 40 Q30 30 40 28 Q45 26 48 32" stroke="#002522" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M65 40 Q70 30 60 28 Q55 26 52 32" stroke="#002522" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M50 32 L50 68" stroke="#002522" strokeWidth="2" strokeDasharray="3 2" />
              <path d="M35 45 Q28 52 35 58 Q42 64 50 62" stroke="#002522" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M65 45 Q72 52 65 58 Q58 64 50 62" stroke="#002522" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <circle cx="42" cy="50" r="3" fill="#89f5e7" />
              <circle cx="58" cy="50" r="3" fill="#89f5e7" />
            </svg>
            <span
              style={{ position: "absolute", top: 16, right: 16, background: P.tertiary, color: P.onTertiary, padding: "4px 12px", borderRadius: 9999, fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}
            >
              FREE
            </span>
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: P.primary, margin: "0 0 8px" }}>T3 Mind Score</h3>
          <p style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif", fontSize: 16, color: P.onSurfaceVariant, lineHeight: 1.6, flex: 1, margin: "0 0 12px" }}>
            Discover your potential with our free adaptive IQ test. Get a professional certificate upon completion.
          </p>
          <Link
            href="/iq-test"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, background: P.tertiary, color: P.onTertiary, fontWeight: 600, fontSize: 14, textDecoration: "none", boxShadow: "0 4px 12px rgba(0,37,34,0.25)", transition: "opacity 0.15s" }}
            className="hover:opacity-90"
          >
            Take the Test
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>psychology</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
