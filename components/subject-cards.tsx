import Link from "next/link";

const C = {
  primary: "#95d3ba", secondary: "#e9c349", onSecondary: "#3c2f00",
  onSurface: "#e5e2e1", onSurfaceVariant: "#bfc9c3",
  surfaceContainerLow: "#1c1b1b",
};

const CARDS = [
  {
    title: "11+ Prep",
    body: "GL Assessment preparation for ages 9–11. Verbal, Non-Verbal, Maths and English.",
    href: "/auth/signup",
    cta: "Learn More",
    ctaColor: C.primary,
    badge: null,
    dim: false,
  },
  {
    title: "GCSE",
    body: "Core subject practice across the full curriculum. Personalised to your weak spots.",
    href: "/auth/signup",
    cta: "Learn More",
    ctaColor: C.primary,
    badge: null,
    dim: false,
  },
  {
    title: "IQ Test",
    body: "Free adaptive IQ test. Get your score and a certificate. No sign-up required.",
    href: "/iq-test",
    cta: "Take Test",
    ctaColor: C.secondary,
    badge: "FREE",
    badgeBg: C.secondary,
    badgeText: C.onSecondary,
    dim: false,
  },
  {
    title: "Medical Exams",
    body: "UCAT, BMAT and beyond.",
    href: "#",
    cta: "Locked",
    ctaColor: `${C.onSurfaceVariant}66`,
    badge: "COMING SOON",
    badgeBg: "rgba(255,255,255,0.10)",
    badgeText: C.onSurfaceVariant,
    dim: true,
  },
];

export function SubjectCards() {
  return (
    <section style={{ padding: "64px 24px", maxWidth: 1440, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <h2
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontWeight: 600,
            fontSize: "clamp(28px,4vw,36px)",
            lineHeight: 1.3,
            color: C.onSurface,
            margin: "0 0 16px",
          }}
        >
          What are you preparing for?
        </h2>
        <div style={{ height: 4, width: 96, background: C.primary }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 32 }}>
        {CARDS.map(({ title, body, href, cta, ctaColor, badge, badgeBg, badgeText, dim }) => (
          <div
            key={title}
            className="glass-card"
            style={{
              padding: 40,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              opacity: dim ? 0.5 : 1,
              background: dim ? "rgba(28,27,27,0.5)" : "rgba(255,255,255,0.02)",
              position: "relative",
            }}
          >
            {badge && (
              <span
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: badgeBg,
                  color: badgeText,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  padding: "2px 8px",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                {badge}
              </span>
            )}
            <h3
              style={{
                fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 24,
                lineHeight: 1.4,
                color: C.onSurface,
                margin: "0 0 16px",
              }}
            >
              {title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: 16,
                lineHeight: 1.6,
                color: `${C.onSurfaceVariant}CC`,
                margin: "0 0 32px",
                flex: 1,
              }}
            >
              {body}
            </p>
            <Link
              href={href}
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: ctaColor,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {cta}
              {!dim && (
                <span className="material-symbols-outlined" style={{ fontSize: 18, transition: "transform 0.2s" }}>
                  arrow_forward
                </span>
              )}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
