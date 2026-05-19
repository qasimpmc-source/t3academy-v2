import Link from "next/link";

const SUBJECTS = [
  {
    id: "english",
    icon: "📖",
    label: "English",
    color: "#7C3AED",
    bg: "#F5F0FF",
    border: "rgba(124,58,237,0.2)",
    desc: "Comprehension, spelling, punctuation & grammar — all GL Assessment question types covered.",
    topics: 6,
  },
  {
    id: "maths",
    icon: "🔢",
    label: "Maths",
    color: "#1D6FDB",
    bg: "#EEF5FF",
    border: "rgba(29,111,219,0.2)",
    desc: "Number, fractions, algebra, geometry, data — every topic from the GL syllabus.",
    topics: 6,
  },
  {
    id: "verbal",
    icon: "💬",
    label: "Verbal Reasoning",
    color: "#0F7D4B",
    bg: "#EDFAF3",
    border: "rgba(15,125,75,0.2)",
    desc: "Codes, analogies, sequences, word relationships — the full GL Verbal battery.",
    topics: 7,
  },
  {
    id: "nvr",
    icon: "🔷",
    label: "Non-Verbal Reasoning",
    color: "#C2720A",
    bg: "#FFF7EA",
    border: "rgba(194,114,10,0.2)",
    desc: "Matrices, rotations, reflections, series — visual reasoning built for GL Assessment.",
    topics: 7,
  },
];

const FEATURES = [
  {
    icon: "🦉",
    title: "Ollie, your AI tutor",
    desc: "Ask Ollie anything, any time. Get step-by-step explanations, worked examples, and strategies tailored to the GL Assessment.",
  },
  {
    icon: "🎯",
    title: "Exam-style questions",
    desc: "Every question is modelled on real GL Assessment format — no surprises on exam day.",
  },
  {
    icon: "📊",
    title: "Live progress tracking",
    desc: "See exactly where your child excels and where to focus next. Accuracy, streaks, and trophies update after every session.",
  },
  {
    icon: "🔄",
    title: "Infinite practice",
    desc: "Questions are shuffled each session so no two quizzes are the same. Build confidence through repetition.",
  },
  {
    icon: "💡",
    title: "Instant explanations",
    desc: "Every wrong answer comes with a clear explanation and a top tip — so children learn, not just memorise.",
  },
  {
    icon: "🏆",
    title: "Trophy system",
    desc: "Topics where your child scores 90%+ earn a trophy. A tangible goal to work towards in every session.",
  },
];

export default function LandingPage() {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans), system-ui, sans-serif",
        background: "var(--color-bg)",
        color: "var(--color-text)",
        minHeight: "100vh",
      }}
    >
      {/* ── Navbar ── */}
      <nav
        style={{
          background: "var(--color-card)",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 24px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🦉</span>
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontWeight: 700,
                fontSize: 18,
                color: "var(--color-text)",
                letterSpacing: "-0.02em",
              }}
            >
              T3 Academy
            </span>
          </div>

          {/* Nav links */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Link
              href="/auth/login"
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: "var(--color-text2)",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 10,
              }}
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#fff",
                textDecoration: "none",
                padding: "8px 18px",
                borderRadius: 10,
                background: "var(--color-amber)",
              }}
            >
              Start free →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "80px 24px 72px",
          textAlign: "center",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "var(--color-amber-bg)",
            border: "1px solid rgba(212,134,10,0.25)",
            borderRadius: 999,
            padding: "5px 14px",
            fontSize: 12,
            fontWeight: 700,
            color: "var(--color-amber)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          <span>✦</span> GL Assessment 11 Plus prep
        </div>

        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "var(--color-text)",
            margin: "0 0 20px",
            maxWidth: 760,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          The smartest way to prepare for the 11 Plus
        </h1>

        <p
          style={{
            fontSize: "clamp(16px, 2.5vw, 20px)",
            color: "var(--color-text2)",
            lineHeight: 1.6,
            maxWidth: 560,
            margin: "0 auto 40px",
          }}
        >
          Ollie the Owl guides your child through every GL Assessment topic — with AI explanations, exam-style practice, and real-time progress tracking.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/auth/signup"
            style={{
              display: "inline-block",
              background: "var(--color-amber)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              padding: "14px 32px",
              borderRadius: 14,
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Start practising free →
          </Link>
          <Link
            href="/auth/login"
            style={{
              display: "inline-block",
              background: "var(--color-card)",
              color: "var(--color-text)",
              fontWeight: 600,
              fontSize: 16,
              padding: "14px 32px",
              borderRadius: 14,
              textDecoration: "none",
              border: "1.5px solid var(--color-border)",
            }}
          >
            Log in
          </Link>
        </div>

        {/* Social proof */}
        <p
          style={{
            marginTop: 24,
            fontSize: 13,
            color: "var(--color-text3)",
          }}
        >
          ✓ No credit card needed &nbsp;·&nbsp; ✓ 364 exam-style questions &nbsp;·&nbsp; ✓ All 4 GL subjects
        </p>
      </section>

      {/* ── Subjects ── */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px 80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 28,
          }}
        >
          <span
            style={{
              width: 14,
              height: 2,
              background: "var(--color-amber)",
              borderRadius: 2,
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text3)",
            }}
          >
            All 4 GL Assessment subjects
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          {SUBJECTS.map((s) => (
            <div
              key={s.id}
              style={{
                background: "var(--color-card)",
                border: "1.5px solid var(--color-border)",
                borderRadius: 20,
                padding: "24px 20px",
                position: "relative",
                overflow: "hidden",
                boxShadow: "0 1px 6px rgba(28,24,18,0.05)",
              }}
            >
              {/* Top bar */}
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 4,
                  background: s.color,
                  borderRadius: "20px 20px 0 0",
                }}
              />
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  marginBottom: 14,
                }}
              >
                {s.icon}
              </span>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--color-text)",
                  marginBottom: 6,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--color-text3)",
                  marginBottom: 16,
                  lineHeight: 1.5,
                }}
              >
                {s.desc}
              </div>
              <div
                style={{
                  display: "inline-block",
                  fontSize: 11,
                  fontWeight: 700,
                  color: s.color,
                  background: s.bg,
                  border: `1px solid ${s.border}`,
                  borderRadius: 999,
                  padding: "3px 10px",
                }}
              >
                {s.topics} topics
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section
        style={{
          background: "var(--color-card)",
          borderTop: "1px solid var(--color-border)",
          borderBottom: "1px solid var(--color-border)",
          padding: "80px 24px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--color-amber)",
                marginBottom: 12,
              }}
            >
              Why T3 Academy
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(28px, 4vw, 40px)",
                fontWeight: 700,
                color: "var(--color-text)",
                margin: 0,
                letterSpacing: "-0.02em",
              }}
            >
              Everything your child needs to pass
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {FEATURES.map((f) => (
              <div
                key={f.title}
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "20px 0",
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    flexShrink: 0,
                    marginTop: 2,
                    width: 40,
                    textAlign: "center",
                  }}
                >
                  {f.icon}
                </span>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--color-text)",
                      marginBottom: 6,
                    }}
                  >
                    {f.title}
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      color: "var(--color-text2)",
                      lineHeight: 1.6,
                    }}
                  >
                    {f.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          maxWidth: 700,
          margin: "0 auto",
          padding: "96px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 48, marginBottom: 20 }}>🦉</div>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--color-text)",
            margin: "0 0 16px",
          }}
        >
          Ready to start your 11 Plus journey?
        </h2>
        <p
          style={{
            fontSize: 17,
            color: "var(--color-text2)",
            lineHeight: 1.6,
            margin: "0 0 36px",
          }}
        >
          Join T3 Academy and let Ollie guide your child to exam success — one topic at a time.
        </p>
        <Link
          href="/auth/signup"
          style={{
            display: "inline-block",
            background: "var(--color-amber)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 17,
            padding: "16px 40px",
            borderRadius: 16,
            textDecoration: "none",
            letterSpacing: "-0.01em",
          }}
        >
          Create your free account →
        </Link>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid var(--color-border)",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 13, color: "var(--color-text3)", margin: 0 }}>
          © {new Date().getFullYear()} T3 Academy · Built for GL Assessment 11 Plus
        </p>
      </footer>
    </div>
  );
}
