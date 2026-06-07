"use client";

import { useState } from "react";

/* ── Design tokens ──────────────────────────────────────────── */
const C = {
  bg: "#022c22",
  surface: "#131313",
  surfaceContainer: "#201f1f",
  surfaceContainerLow: "#1c1b1b",
  surfaceContainerHigh: "#2a2a2a",
  surfaceContainerHighest: "#353534",
  surfaceContainerLowest: "#0e0e0e",
  primaryContainer: "#064e3b",
  secondaryContainer: "#af8d11",
  primary: "#95d3ba",
  primaryFixed: "#b0f0d6",
  primaryFixedDim: "#95d3ba",
  onPrimary: "#003829",
  onPrimaryContainer: "#80bea6",
  secondary: "#e9c349",
  onSecondary: "#3c2f00",
  tertiary: "#9ad1cb",
  onSurface: "#e5e2e1",
  onSurfaceVariant: "#bfc9c3",
  outlineVariant: "#404944",
  outline: "#89938d",
  surfaceTint: "#95d3ba",
  gold: "#e9c349",
  goldBorder: "#d4af37",
} as const;

const fontMontserrat = "'Montserrat', system-ui, sans-serif";

/* ── Shared styles ──────────────────────────────────────────── */
const sectionPad: React.CSSProperties = { padding: "64px 48px" };
const maxW1440: React.CSSProperties = { maxWidth: 1440, margin: "0 auto" };

/* ── Prestige emerald background ───────────────────────────── */
const prestigeBg: React.CSSProperties = {
  backgroundColor: "#022c22",
  backgroundImage: `
    radial-gradient(circle at 50% -20%, #064e3b 0%, transparent 70%),
    radial-gradient(circle at 0% 100%, rgba(233,195,73,0.03) 0%, transparent 40%),
    radial-gradient(circle at 100% 100%, rgba(149,211,186,0.03) 0%, transparent 40%)
  `,
  position: "relative",
  overflow: "hidden",
};

/* ═══════════════════════════════════════════════════════════════
   NAV
══════════════════════════════════════════════════════════════ */
function Nav() {
  const [examsOpen, setExamsOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: 0,
    marginTop: 8,
    width: 192,
    background: C.surfaceContainerHigh,
    border: `1px solid ${C.outlineVariant}`,
    borderRadius: 8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
    zIndex: 100,
  };

  const dropdownItem: React.CSSProperties = {
    display: "block",
    padding: "8px 16px",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.05em",
    color: C.onSurface,
    textDecoration: "none",
    transition: "background 0.15s",
  };

  return (
    <nav
      style={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(2,44,34,0.9)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "inset 0 1px 0 0 rgba(149,211,186,0.1)",
        fontFamily: fontMontserrat,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "16px 48px",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <div style={{ fontSize: 24, fontWeight: 700, color: C.primary, letterSpacing: "-0.05em" }}>
          T3 Academy
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {/* Exams dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onMouseEnter={() => setExamsOpen(true)}
              onMouseLeave={() => setExamsOpen(false)}
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: C.onSurface,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: fontMontserrat,
              }}
            >
              Exams <span className="material-symbols-outlined" style={{ fontSize: 18 }}>expand_more</span>
            </button>
            {examsOpen && (
              <div
                style={dropdownStyle}
                onMouseEnter={() => setExamsOpen(true)}
                onMouseLeave={() => setExamsOpen(false)}
              >
                {["11 Plus", "GCSE", "Other Medical Exams"].map((item) => (
                  <a key={item} href="#" style={dropdownItem}>{item}</a>
                ))}
              </div>
            )}
          </div>

          {/* Useful Links dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onMouseEnter={() => setLinksOpen(true)}
              onMouseLeave={() => setLinksOpen(false)}
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: C.onSurface,
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontFamily: fontMontserrat,
              }}
            >
              Useful Links <span className="material-symbols-outlined" style={{ fontSize: 18 }}>expand_more</span>
            </button>
            {linksOpen && (
              <div
                style={dropdownStyle}
                onMouseEnter={() => setLinksOpen(true)}
                onMouseLeave={() => setLinksOpen(false)}
              >
                {["BBC Bitesize", "Britannica"].map((item) => (
                  <a key={item} href="#" style={dropdownItem}>{item}</a>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          style={{
            background: C.primaryContainer,
            color: C.primary,
            fontSize: 14,
            fontWeight: 600,
            padding: "8px 24px",
            borderRadius: 8,
            border: `1px solid rgba(149,211,186,0.2)`,
            cursor: "pointer",
            fontFamily: fontMontserrat,
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = C.primary;
            e.currentTarget.style.color = C.onPrimary;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = C.primaryContainer;
            e.currentTarget.style.color = C.primary;
          }}
        >
          Login
        </button>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <header
      style={{
        ...prestigeBg,
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "64px 16px",
        fontFamily: fontMontserrat,
      }}
    >
      {/* Glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 400,
          background: "radial-gradient(circle, rgba(149,211,186,0.05) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 10 }}>
        {/* Eyebrow */}
        <span
          style={{
            display: "block",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.onPrimaryContainer,
            marginBottom: 16,
            opacity: 0.9,
          }}
        >
          Know it, prove it, and pass it
        </span>

        {/* Main headline */}
        <h1 style={{ margin: 0, padding: 0, lineHeight: 1.1 }}>
          <span
            style={{
              display: "block",
              fontSize: "clamp(40px, 6vw, 64px)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.02em",
            }}
          >
            <em
              style={{
                fontStyle: "italic",
                color: C.secondary,
                fontFamily: "Georgia, 'Times New Roman', serif",
                textShadow: "0 0 10px rgba(212,175,55,0.3)",
              }}
            >
              exams done right
            </em>{" "}
            <span style={{ color: "rgba(255,255,255,0.9)", fontWeight: 400 }}>at</span> T3 Academy
          </span>
        </h1>

        {/* Sub-copy */}
        <p
          style={{
            fontSize: 18,
            lineHeight: 1.6,
            color: C.onPrimaryContainer,
            maxWidth: 600,
            margin: "32px auto 0",
            fontWeight: 500,
            letterSpacing: "0.02em",
            opacity: 0.85,
          }}
        >
          Start for free. No card needed.
          <br />
          Access the world&apos;s most advanced AI-powered learning environment.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            marginTop: 40,
          }}
        >
          <button
            style={{
              background: C.primary,
              color: C.onPrimary,
              padding: "16px 40px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.05em",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              minWidth: 200,
              boxShadow: "0 20px 40px -10px rgba(149,211,186,0.3)",
              fontFamily: fontMontserrat,
              transition: "all 0.2s",
            }}
          >
            Get Started Free
          </button>
          <button
            style={{
              padding: "16px 40px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.05em",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "#fff",
              cursor: "pointer",
              minWidth: 200,
              fontFamily: fontMontserrat,
              transition: "all 0.2s",
            }}
          >
            View Curriculum
          </button>
        </div>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRODUCT CARDS (BENTO)
══════════════════════════════════════════════════════════════ */
function ProductCards() {
  const featureItem = (text: string) => (
    <li
      key={text}
      style={{ display: "flex", alignItems: "center", gap: 8, color: C.onSurfaceVariant, fontSize: 16, lineHeight: 1.6 }}
    >
      <span className="material-symbols-outlined" style={{ color: C.secondary, fontSize: 20 }}>check_circle</span>
      {text}
    </li>
  );

  return (
    <section style={{ ...maxW1440, ...sectionPad, fontFamily: fontMontserrat }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 24,
        }}
      >
        {/* 11 Plus — spans 7 cols */}
        <div
          style={{
            gridColumn: "span 7",
            background: C.surfaceContainer,
            borderLeft: `4px solid ${C.primaryContainer}`,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ fontSize: 32, fontWeight: 600, color: C.primary, marginBottom: 16, marginTop: 0 }}>
              11 Plus
            </h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Question bank of 10k+ problems",
                "Proctored mock exams",
                "Real-time progress report",
                "Advanced Parents dashboard",
                'Dedicated AI tutor "Ollie"',
              ].map(featureItem)}
            </ul>
          </div>
          <div style={{ marginTop: 24 }}>
            <button
              style={{
                background: "none",
                border: "none",
                color: C.secondary,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.05em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: fontMontserrat,
                transition: "transform 0.2s",
              }}
            >
              Explore 11 Plus{" "}
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
            </button>
          </div>
        </div>

        {/* IQ Test — spans 5 cols */}
        <div
          style={{
            gridColumn: "span 5",
            background: C.surfaceContainer,
            borderLeft: `4px solid ${C.goldBorder}`,
            padding: 40,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: 64, color: C.secondary, marginBottom: 16, fontVariationSettings: '"FILL" 1' }}
          >
            psychology
          </span>
          <h3
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: C.secondary,
              marginBottom: 8,
              marginTop: 0,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            IQ Test
          </h3>
          <p style={{ color: C.onSurfaceVariant, fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
            A fun standalone experience to benchmark your cognitive profile.
          </p>
          <button
            style={{
              border: `1px solid ${C.goldBorder}`,
              color: C.gold,
              padding: "8px 40px",
              borderRadius: 8,
              background: "transparent",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: fontMontserrat,
              transition: "background 0.2s",
            }}
          >
            Take the Test
          </button>
        </div>

        {/* GCSE — spans 12 cols */}
        <div
          style={{
            gridColumn: "span 12",
            background: C.surfaceContainer,
            borderLeft: `4px solid ${C.primaryContainer}`,
            padding: 40,
          }}
        >
          <h3 style={{ fontSize: 32, fontWeight: 600, color: C.primary, marginBottom: 16, marginTop: 0 }}>GCSE</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
            {[
              { label: "Revision", desc: "Subject-wise deep dives with our specialized AI tutor Nova." },
              { label: "Assessment", desc: "Integrated IQ tests to monitor developmental growth." },
              { label: "Certification", desc: "Official General Knowledge certificates upon completion." },
            ].map(({ label, desc }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <h4
                  style={{
                    color: C.secondary,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  {label}
                </h4>
                <p style={{ color: C.onSurfaceVariant, fontSize: 16, lineHeight: 1.6, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   COMPARISON TABLE
══════════════════════════════════════════════════════════════ */
function ComparisonTable() {
  const rows = [
    { feature: "Cost", old: "£40/hr Average", t3: "Unlimited Access", t3Color: C.secondary },
    { feature: "Availability", old: "Fixed Slots", t3: "24/7 On-demand", t3Color: C.primary },
    { feature: "Practice Material", old: "Finite Worksheets", t3: "Infinite AI Generation", t3Color: C.primary },
    { feature: "Feedback Loop", old: "Weekly Review", t3: "Instant Correction", t3Color: C.primary },
  ];

  const tdBase: React.CSSProperties = {
    padding: 24,
    borderBottom: `1px solid ${C.outlineVariant}`,
    fontSize: 16,
  };

  return (
    <section
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "64px 48px",
        fontFamily: fontMontserrat,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, color: C.onSurface, margin: 0 }}>Sound familiar?</h2>
        <p style={{ color: C.onSurfaceVariant, marginTop: 8 }}>The old way vs The T3 Academy way</p>
      </div>

      <div
        style={{
          overflow: "hidden",
          border: `1px solid ${C.outlineVariant}`,
          borderRadius: 12,
          background: C.surfaceContainerLow,
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.surfaceContainerHigh }}>
              <th style={{ ...tdBase, textAlign: "left", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 14 }}>
                Feature
              </th>
              <th style={{ ...tdBase, textAlign: "center", color: C.onSurfaceVariant, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", fontSize: 14 }}>
                Traditional Tutoring
              </th>
              <th
                style={{
                  ...tdBase,
                  textAlign: "center",
                  color: C.primary,
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  fontSize: 14,
                  background: "rgba(6,78,59,0.2)",
                }}
              >
                T3 Academy
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ feature, old, t3, t3Color }, i) => (
              <tr key={feature} style={i === rows.length - 1 ? {} : {}}>
                <td style={{ ...tdBase, fontWeight: 500, color: C.onSurface, borderBottom: i === rows.length - 1 ? "none" : `1px solid ${C.outlineVariant}` }}>
                  {feature}
                </td>
                <td style={{ ...tdBase, textAlign: "center", color: C.onSurfaceVariant, borderBottom: i === rows.length - 1 ? "none" : `1px solid ${C.outlineVariant}` }}>
                  {old}
                </td>
                <td
                  style={{
                    ...tdBase,
                    textAlign: "center",
                    color: t3Color,
                    fontWeight: 700,
                    background: "rgba(6,78,59,0.1)",
                    borderBottom: i === rows.length - 1 ? "none" : `1px solid ${C.outlineVariant}`,
                  }}
                >
                  {t3}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCIENCE SECTION
══════════════════════════════════════════════════════════════ */
function ScienceSection() {
  return (
    <section
      style={{
        background: C.surfaceContainerLowest,
        borderTop: `1px solid ${C.outlineVariant}`,
        borderBottom: `1px solid ${C.outlineVariant}`,
        fontFamily: fontMontserrat,
      }}
    >
      <div style={{ ...maxW1440, ...sectionPad }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span
            style={{
              color: C.secondary,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 8,
            }}
          >
            The science behind it
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 600, color: C.onSurface, margin: "0 0 16px" }}>
            How the brain actually learns
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: C.onSurfaceVariant,
              fontStyle: "italic",
              maxWidth: 640,
              margin: "0 auto",
              opacity: 0.8,
            }}
          >
            &ldquo;Memory is not a recording; it is a reconstruction built through repeated, active retrieval and correction.&rdquo;
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 64 }}>
          {[
            {
              icon: "auto_stories",
              title: "Passive Learning",
              body: "Reading notes creates an 'illusion of competence' but fails to build neural pathways.",
              highlighted: false,
            },
            {
              icon: "psychology_alt",
              title: "Retrieval Mechanism",
              body: "Forcing the brain to recall information (testing) is the single most effective way to learn.",
              highlighted: true,
            },
            {
              icon: "offline_bolt",
              title: "Instant Correction",
              body: "Correcting a mistake immediately after it happens anchors the right information for good.",
              highlighted: false,
            },
          ].map(({ icon, title, body, highlighted }) => (
            <div
              key={title}
              style={{
                padding: 24,
                border: `1px solid ${highlighted ? "rgba(149,211,186,0.3)" : C.outlineVariant}`,
                borderRadius: 8,
                background: highlighted ? "rgba(6,78,59,0.2)" : "transparent",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: highlighted ? C.primary : C.secondary, fontSize: 24 }}
              >
                {icon}
              </span>
              <h4 style={{ fontSize: 24, fontWeight: 600, color: highlighted ? C.primary : C.onSurface, margin: 0 }}>
                {title}
              </h4>
              <p style={{ color: highlighted ? C.onSurface : C.onSurfaceVariant, fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>

        {/* Test → Teach → Test Again */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
            background: C.surfaceContainer,
            padding: 64,
            borderRadius: 16,
            border: `1px solid ${C.outlineVariant}`,
          }}
        >
          {[
            { icon: "edit_note", label: "Test", color: C.primary, bg: C.primaryContainer, border: "rgba(149,211,186,0.3)" },
            null,
            { icon: "school", label: "Teach", color: C.secondary, bg: "rgba(175,141,17,0.2)", border: "rgba(233,195,73,0.3)" },
            null,
            { icon: "verified", label: "Test Again", color: C.primary, bg: C.primaryContainer, border: "rgba(149,211,186,0.3)" },
          ].map((item, i) =>
            item === null ? (
              <span key={i} className="material-symbols-outlined" style={{ color: C.outline, fontSize: 24 }}>
                trending_flat
              </span>
            ) : (
              <div key={item.label} style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: item.bg,
                    border: `1px solid ${item.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ color: item.color }}>
                    {item.icon}
                  </span>
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: item.color, margin: 0 }}>
                  {item.label}
                </p>
              </div>
            )
          )}
        </div>

        <p
          style={{
            textAlign: "center",
            color: C.onSurfaceVariant,
            marginTop: 40,
            maxWidth: 560,
            marginLeft: "auto",
            marginRight: "auto",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
          }}
        >
          The neurological mechanism of retrieval remains identical whether you are 7 or 70.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════════════ */
function Testimonials() {
  const reviews = [
    {
      quote: "T3 transformed our daughter's confidence for her 11+. The AI dashboard gave us insights we never got from her school.",
      author: "Sarah, Parent",
    },
    {
      quote: "Actually fun to use. Nova makes biology revision feel less like a chore. Got an 8 in my mocks!",
      author: "James, Year 11 Student",
    },
    {
      quote: "Using the medical exam modules. The infinite practice bank is unbeatable. High prestige feeling platform.",
      author: "Dr. Aris, Adult Learner",
    },
  ];

  return (
    <section style={{ ...prestigeBg, overflow: "hidden", fontFamily: fontMontserrat }}>
      <div style={{ ...maxW1440, ...sectionPad }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, textAlign: "center", marginBottom: 64, color: "#fff", marginTop: 0 }}>
          Trusted by thousands
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {reviews.map(({ quote, author }) => (
            <div
              key={author}
              style={{
                background: "rgba(42,42,42,0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: 40,
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 1px 0 0 rgba(149,211,186,0.1)",
              }}
            >
              <div style={{ display: "flex", marginBottom: 16 }}>
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{ color: C.secondary, fontVariationSettings: '"FILL" 1' }}
                  >
                    star
                  </span>
                ))}
              </div>
              <p style={{ color: C.onSurface, marginBottom: 24, fontSize: 16, lineHeight: 1.6, marginTop: 0 }}>{quote}</p>
              <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", color: C.primary }}>— {author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MEET TUTORS
══════════════════════════════════════════════════════════════ */
function MeetTutors() {
  return (
    <section style={{ background: C.surfaceContainerLow, fontFamily: fontMontserrat }}>
      <div style={{ ...maxW1440, ...sectionPad }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          {/* Ollie */}
          <div
            style={{
              background: "linear-gradient(135deg, #064e3b, #2a2a2a)",
              borderRadius: 16,
              padding: 4,
            }}
          >
            <div
              style={{
                background: C.surfaceContainerHighest,
                borderRadius: 14,
                padding: 40,
                display: "flex",
                alignItems: "center",
                gap: 40,
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLtUBjRFDfZGDmJuc_l0yvQgjFC3GXyKVskj0lh6gwihim9tDFK_u2ak4Z769-oiOw3vicahGRLtjuF6HM1IYq2IqopZ0qEXRhyeM9UDsdjhVVDIyCkdeydKAIgzutLaAoyuyafL3ixTxKhATxxLqLob8W8QCWSn1d9ADOzFPmE6Bd5gZ7qRsNLjMy4OewLBJS90RJ05mQ7oS8F8QKPQPpfc58a3_3nc0OHEzQh1-P2MWHVFBQ"
                alt="Ollie the Owl"
                style={{
                  width: 160,
                  height: 160,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: `4px solid ${C.primary}`,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                  flexShrink: 0,
                }}
              />
              <div>
                <h3 style={{ fontSize: 32, fontWeight: 600, color: C.primary, margin: "0 0 4px" }}>Ollie the Owl</h3>
                <p style={{ color: C.secondary, fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 8px" }}>
                  11 Plus Specialist
                </p>
                <p style={{ color: C.onSurfaceVariant, fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                  The wisdom of ages, powered by the algorithms of tomorrow. Ollie guides primary students through the maze of competitive entrance exams.
                </p>
              </div>
            </div>
          </div>

          {/* Nova */}
          <div
            style={{
              background: "linear-gradient(135deg, #af8d11, #2a2a2a)",
              borderRadius: 16,
              padding: 4,
            }}
          >
            <div
              style={{
                background: C.surfaceContainerHighest,
                borderRadius: 14,
                padding: 40,
                display: "flex",
                alignItems: "center",
                gap: 40,
              }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLuV_CUDzz2G-1k1KvAWjivCQywJtQi7uEkBgqdRsN1mCFoPn05rrPAeTAfT6-2hxGaiwc0LIj1eTjZ6D3sF_6E0evIrDd7zdKUWkTEWn738d4kXltVb-E_p2HJS0Ax5mXPi3aq7RPuSvxKPfOYObFco2wc2nvk_SF-_1Y4p7LypEXhT7gIvFPdNZe0M8-ldaQ8o_NYndJ8mDzbvO3uSEB1C8dZEWycadesR2LFo8ebTwbI_GWAlg5M7EA"
                alt="Nova"
                style={{
                  width: 160,
                  height: 160,
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: `4px solid ${C.secondary}`,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                  flexShrink: 0,
                }}
              />
              <div>
                <h3 style={{ fontSize: 32, fontWeight: 600, color: C.secondary, margin: "0 0 4px" }}>Nova</h3>
                <p style={{ color: C.primary, fontSize: 14, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 8px" }}>
                  GCSE &amp; Advanced Tutor
                </p>
                <p style={{ color: C.onSurfaceVariant, fontSize: 16, lineHeight: 1.6, margin: 0 }}>
                  Sharp, precise, and infinitely patient. Nova specializes in breaking down complex GCSE concepts into manageable, high-yield insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PRICING
══════════════════════════════════════════════════════════════ */
function Pricing() {
  return (
    <section style={{ ...maxW1440, ...sectionPad, fontFamily: fontMontserrat }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, color: C.onSurface, marginBottom: 8, marginTop: 0 }}>
          Invest in Excellence
        </h2>
        <p style={{ color: C.onSurfaceVariant }}>Start for free, no card needed</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        {/* Standard */}
        <div
          style={{
            border: `1px solid ${C.outlineVariant}`,
            padding: 40,
            borderRadius: 12,
            background: C.surfaceContainerLow,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 600, color: C.onSurface, margin: "0 0 4px" }}>Standard</h3>
            <div style={{ fontSize: 40, fontWeight: 700, color: C.onSurface, marginBottom: 24 }}>
              £0<span style={{ fontSize: 16, fontWeight: 400, color: C.onSurfaceVariant }}>/forever</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 8 }}>
              {["Basic question bank", "1 Mock exam per month", "Standard progress metrics"].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: C.onSurfaceVariant }}>
                  <span className="material-symbols-outlined" style={{ color: C.primary, fontSize: 20 }}>check</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <button
            style={{
              width: "100%",
              padding: "16px 0",
              border: `1px solid ${C.outlineVariant}`,
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.05em",
              color: C.onSurface,
              background: "transparent",
              cursor: "pointer",
              fontFamily: fontMontserrat,
              transition: "background 0.2s",
            }}
          >
            Start for Free
          </button>
        </div>

        {/* Premium */}
        <div
          style={{
            position: "relative",
            border: `2px solid ${C.secondary}`,
            padding: 40,
            borderRadius: 12,
            background: C.surfaceContainerHigh,
            boxShadow: "0 0 40px rgba(233,195,73,0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          {/* Badge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: C.secondary,
              color: C.onSecondary,
              padding: "4px 24px",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              transform: "translate(25%, 25%) rotate(45deg)",
              transformOrigin: "center",
            }}
          >
            Premium
          </div>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 600, color: C.secondary, margin: "0 0 4px" }}>Professional</h3>
            <div style={{ fontSize: 40, fontWeight: 700, color: C.onSurface, marginBottom: 24 }}>
              £19.99<span style={{ fontSize: 16, fontWeight: 400, color: C.onSurfaceVariant }}>/mo</span>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 40px", display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Infinite AI Question Generation",
                "Unlimited Proctored Mocks",
                "24/7 Priority AI Tutor Access",
                "Parent Dashboard Mobile App",
              ].map((item) => (
                <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, color: C.onSurface }}>
                  <span className="material-symbols-outlined" style={{ color: C.secondary, fontSize: 20 }}>verified</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <button
            style={{
              width: "100%",
              padding: "16px 0",
              background: C.secondary,
              color: C.onSecondary,
              border: "none",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.05em",
              cursor: "pointer",
              fontFamily: fontMontserrat,
              boxShadow: "0 8px 24px rgba(233,195,73,0.2)",
              transition: "transform 0.2s",
            }}
          >
            Go Premium
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════════ */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      q: "What ages is T3 Academy for?",
      a: "T3 Academy covers curriculum from age 7 (Year 3) up to Adult professional medical examinations. Our core focus is on 11+, GCSE, and specialist competitive entry tests.",
    },
    {
      q: "Is the AI better than a human tutor?",
      a: "The AI is designed to augment learning. It provides instant feedback and infinite practice that humans cannot, available 24/7. It follows pedagogical science more consistently than even the best human tutors.",
    },
    {
      q: "Which exams are covered?",
      a: "We cover 11 Plus (GL, CEM), all major GCSE boards (AQA, Edexcel, OCR), and professional entrance exams including UCAT and GAMSAT.",
    },
    {
      q: "How does the AI personalization work?",
      a: "Our 'Adaptive Intelligence' engine tracks every single mistake you make to create a 'knowledge graph'. It then targets your specific weak areas using retrieval practice.",
    },
    {
      q: "Is my data safe?",
      a: "We use military-grade encryption and are fully GDPR and COPPA compliant. We never sell student data or use it for advertising.",
    },
    {
      q: "Can adults use this for retraining?",
      a: "Absolutely. Our retrieval learning modules are highly effective for professional certification and career pivots where rapid information retention is critical.",
    },
  ];

  return (
    <section
      style={{
        maxWidth: 750,
        margin: "0 auto",
        padding: "64px 16px",
        fontFamily: fontMontserrat,
      }}
    >
      <h2 style={{ fontSize: 32, fontWeight: 600, textAlign: "center", marginBottom: 64, color: C.onSurface, marginTop: 0 }}>
        Common Questions
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map(({ q, a }, i) => (
          <div
            key={q}
            style={{ border: `1px solid ${C.outlineVariant}`, borderRadius: 8, overflow: "hidden" }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 24,
                background: C.surfaceContainerLow,
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: fontMontserrat,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: C.onSurface,
                transition: "background 0.15s",
              }}
            >
              {q}
              <span className="material-symbols-outlined" style={{ color: C.onSurfaceVariant, flexShrink: 0 }}>
                {openIndex === i ? "expand_less" : "expand_more"}
              </span>
            </button>
            {openIndex === i && (
              <div
                style={{
                  padding: 24,
                  background: C.surfaceContainerHighest,
                  color: C.onSurfaceVariant,
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                {a}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FINAL CTA
══════════════════════════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section
      style={{
        ...prestigeBg,
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "inset 0 1px 0 0 rgba(149,211,186,0.1)",
        fontFamily: fontMontserrat,
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "64px 48px",
          textAlign: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 40px)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 24,
            marginTop: 0,
            lineHeight: 1.2,
          }}
        >
          Your first session is free. No card. No commitment.
        </h2>
        <button
          style={{
            background: C.secondary,
            color: C.onSecondary,
            padding: "16px 40px",
            fontSize: 24,
            fontWeight: 700,
            lineHeight: 1.4,
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 20px 40px -10px rgba(233,195,73,0.3)",
            fontFamily: fontMontserrat,
            transition: "transform 0.2s",
          }}
        >
          Start learning
        </button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer
      style={{
        background: "#022c22",
        borderTop: "1px solid rgba(255,255,255,0.05)",
        fontFamily: fontMontserrat,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "40px 48px",
          maxWidth: 1440,
          margin: "0 auto",
          gap: 40,
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 700, color: C.primary, letterSpacing: "-0.05em" }}>
          T3 Academy
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24 }}>
          {["Privacy", "Terms", "Contact", "About"].map((link) => (
            <a
              key={link}
              href="#"
              style={{ fontSize: 12, fontWeight: 500, color: C.onSurfaceVariant, textDecoration: "none", transition: "color 0.2s" }}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{ display: "flex", gap: 24 }}>
          {["photo_camera", "video_library", "play_circle"].map((icon) => (
            <a
              key={icon}
              href="#"
              style={{ color: C.onSurfaceVariant, display: "flex", alignItems: "center", textDecoration: "none", transition: "color 0.2s" }}
            >
              <span className="material-symbols-outlined">{icon}</span>
            </a>
          ))}
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "24px 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          fontSize: 12,
          fontWeight: 500,
          color: C.outline,
          opacity: 0.6,
        }}
      >
        © 2024 T3 Academy. All rights reserved.
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  return (
    <div
      style={{
        background: "#022c22",
        color: C.onSurface,
        overflowX: "hidden",
        minHeight: "100vh",
        fontFamily: fontMontserrat,
      }}
    >
      <Nav />
      <main>
        <Hero />
        <ProductCards />
        <ComparisonTable />
        <ScienceSection />
        <Testimonials />
        <MeetTutors />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
