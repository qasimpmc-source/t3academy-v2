import Link from "next/link";

const C = {
  primary:          "#d2bbff",
  secondary:        "#44e2cd",
  onSurface:        "#e0e3e5",
  onSurfaceVariant: "#ccc3d8",
  surfaceContainerLowest: "#0b0f10",
  surface:          "#101415",
};

const OLLIE_URL   = "https://lh3.googleusercontent.com/aida-public/AB6AXuCiXLxiO1HLy6vW5sCDOP629V7AyFTZc6WC1z-cCdyjm7k0qmLD8U24xbb_uD6BzKerDxuSiNrGzvDmQwX40DFuLIDaPolDpjmKU_oSexEAZiWDVsyDgs_fF9GqT0K8sRngKgStsqE0OjzO3WXh3hS8vgHpQCErTJl6MzTyqj5Pq-Cb9dXrETPqdTha0ICpeksWbbs7uI_b3OHcIEzVUJ_52mLSTAC2mmNFTuWS7LwyXAD20bTM7d4PuThv5hvxcLYBOrsLsOmq9w";
const TURNER_URL  = "https://lh3.googleusercontent.com/aida-public/AB6AXuBd_cWZaFz1tYQGmvcRrxpmzruPjD5S5xmVuONMXqKn-LEz9AzD77F5JQlUsSUngRQpr_ZZgEoXcBkjRnXAIpE9UEzqPg7OV1wBjikkJjJ6p6lu8Df_fBYl7UPeS-c1GrXhKM8ekfNeDq-egbqhHsvFag4DoN5NYzGeWX6FLnErneSTmgVkxoqJVw6kv0uHD07pOfhwUT0eTZ44n6qY0xChJ_Nr11AAIxU9xmGiHCjM61I8-a2JsLuSWFfuzZ5q3KpJAiTUvf6myg";
const MIND_SCORE_URL = "https://lh3.googleusercontent.com/aida/AP1WRLsYKIpeaVmLgPaU205YwgjRf1ZRgmY1ztE834Xu8Mm1ftPJiry20GF8uojnau6XI82ZIA9Xi1ZL2qVnSUELK7KV7NB4bArgYqYMYQJ5wcJGNEKO3ET4irYY5Ni953xk2kCQYa-zYT5CAo4N2irZAhUbGeAUBHeDkhIVx_-LHre0D7N6ycl7W4ErNd7TiMLdz80zA8OFLSSNTIIb8damyCeNZpJo1ZKp665IUcSBNokPSLTqAN_pVRol";

const MONO: React.CSSProperties = {
  fontFamily: "var(--font-mono-brand), 'JetBrains Mono', monospace",
  fontSize: 10,
  letterSpacing: "0.3em",
};

export function SubjectCards() {
  return (
    <section
      id="programs"
      style={{ padding: "120px 40px", maxWidth: 1440, margin: "0 auto" }}
    >
      {/* Section header */}
      <div
        className="grid grid-cols-12"
        style={{ gap: 40, marginBottom: 96 }}
      >
        <div className="col-span-12 md:col-span-6">
          <h2
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: "clamp(28px,3vw,36px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: C.onSurface,
              textTransform: "uppercase",
              margin: "0 0 24px",
            }}
          >
            Core Frameworks
          </h2>
          <div style={{ height: 2, width: 128, background: C.primary, marginBottom: 32 }} />
          <p style={{ ...MONO, color: `${C.onSurfaceVariant}B3`, fontSize: 16, fontFamily: "var(--font-hanken), 'Hanken Grotesk', sans-serif", letterSpacing: 0, lineHeight: 1.6, fontWeight: 300 }}>
            Methodical pathways engineered for specific academic milestones.
          </p>
        </div>
        <div className="col-span-12 md:col-span-6 hidden md:flex" style={{ justifyContent: "flex-end", alignItems: "flex-end", paddingBottom: 16 }}>
          <span style={{ ...MONO, color: `${C.onSurfaceVariant}4D`, letterSpacing: "0.5em" }}>
            REF_01 // ARCHITECTURAL_SUITE
          </span>
        </div>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-12" style={{ gap: 40 }}>

        {/* ── 11+ Prep ── col-span-7 */}
        <div
          className="col-span-12 lg:col-span-7 glass-card"
          style={{
            padding: 48,
            display: "flex",
            flexDirection: "column",
            gap: 48,
            borderRight: `4px solid ${C.primary}33`,
          }}
        >
          <div className="flex flex-col md:flex-row" style={{ gap: 48 }}>
            {/* Text */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ ...MONO, color: C.secondary, display: "block", marginBottom: 24 }}>
                  LEVEL: PRIMARY [9–11]
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: C.onSurface,
                    margin: "0 0 24px",
                  }}
                >
                  11+ Mastery
                </h3>
                <p style={{ fontFamily: "var(--font-hanken), sans-serif", fontSize: 16, color: `${C.onSurfaceVariant}CC`, lineHeight: 1.6, marginBottom: 40 }}>
                  Comprehensive preparation for grammar entrance. Guided by Ollie, our scholarly lead.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
                {["VERBAL REASONING", "SPATIAL ANALYTICS"].map((label, i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <span style={{ width: 8, height: 8, background: i === 0 ? C.primary : `${C.primary}66`, flexShrink: 0 }} />
                    <span style={{ ...MONO, color: `${C.onSurfaceVariant}99` }}>{label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/auth/signup"
                style={{ ...MONO, color: C.onSurface, textDecoration: "none", borderBottom: `1px solid ${C.primary}`, paddingBottom: 4, width: "fit-content", transition: "color 0.2s" }}
              >
                EXPLORE_PROGRAM.SH
              </Link>
            </div>

            {/* Image */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${C.surfaceContainerLowest}80`,
                border: "1px solid rgba(255,255,255,0.05)",
                position: "relative",
                minHeight: 240,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={OLLIE_URL}
                alt="Ollie the Owl mascot"
                style={{ width: 224, height: 224, objectFit: "contain", zIndex: 1, transition: "transform 1s" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)", opacity: 0.10 }} />
            </div>
          </div>
        </div>

        {/* ── Mind Score ── col-span-5 */}
        <div
          className="col-span-12 lg:col-span-5 glass-card"
          style={{
            padding: 48,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderTop: `4px solid ${C.secondary}33`,
          }}
        >
          <div>
            <div style={{ width: 64, height: 64, marginBottom: 40, opacity: 0.8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={MIND_SCORE_URL}
                alt="Mind Score icon"
                style={{ width: "100%", height: "100%", objectFit: "contain", filter: "invert(1)", opacity: 0.8 }}
              />
            </div>
            <span style={{ ...MONO, color: C.secondary, display: "block", marginBottom: 24 }}>
              DIAGNOSTICS_SYS
            </span>
            <h3
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: C.onSurface,
                margin: "0 0 24px",
              }}
            >
              Mind Score IQ
            </h3>
            <p style={{ fontFamily: "var(--font-hanken), sans-serif", fontSize: 16, color: `${C.onSurfaceVariant}CC`, lineHeight: 1.6 }}>
              Benchmark cognitive performance with high-fidelity analytical engines.
            </p>
          </div>
          <Link
            href="/iq-test"
            style={{
              ...MONO,
              display: "block",
              textAlign: "center",
              padding: 20,
              border: "1px solid rgba(255,255,255,0.10)",
              background: "rgba(255,255,255,0.05)",
              color: C.onSurface,
              textDecoration: "none",
              marginTop: 48,
              transition: "background 0.4s, color 0.4s",
            }}
            className="hover:bg-[#d2bbff] hover:text-[#25005a]"
          >
            INITIATE ASSESSMENT
          </Link>
        </div>

        {/* ── Secondary Lab ── col-span-12 */}
        <div
          className="col-span-12 glass-card"
          style={{
            padding: 48,
            borderLeft: `4px solid ${C.primary}33`,
          }}
        >
          <div className="flex flex-col md:flex-row-reverse" style={{ gap: 48 }}>
            {/* Text */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span style={{ ...MONO, color: C.secondary, display: "block", marginBottom: 24 }}>
                  LEVEL: SECONDARY [11–18]
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: 36,
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: C.onSurface,
                    margin: "0 0 24px",
                  }}
                >
                  The Secondary Lab
                </h3>
                <p style={{ fontFamily: "var(--font-hanken), sans-serif", fontSize: 16, color: `${C.onSurfaceVariant}CC`, lineHeight: 1.6, marginBottom: 40 }}>
                  Advanced curriculum pathways guided by Turner. A tech-forward approach to GCSE and A-Level rigour.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2" style={{ gap: 32, marginBottom: 40 }}>
                {[["98%", "Attainment Rate"], ["15k+", "Active Nodes"]].map(([val, label]) => (
                  <div key={label} style={{ padding: 24, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                    <p style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: 700, fontSize: 30, color: C.primary, margin: "0 0 8px", letterSpacing: "-0.02em" }}>{val}</p>
                    <p style={{ ...MONO, color: `${C.onSurfaceVariant}80`, letterSpacing: "0.1em", fontSize: 9, margin: 0 }}>{label.toUpperCase()}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/auth/signup"
                style={{ ...MONO, color: C.onSurface, textDecoration: "none", borderBottom: `1px solid ${C.primary}`, paddingBottom: 4, width: "fit-content" }}
              >
                VIEW_LAB_MANIFEST.MD
              </Link>
            </div>

            {/* Image */}
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${C.surfaceContainerLowest}80`,
                border: "1px solid rgba(255,255,255,0.05)",
                minHeight: 256,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={TURNER_URL}
                alt="Turner the Turkey mascot"
                style={{ width: 256, height: 256, objectFit: "contain", transition: "transform 1s" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
