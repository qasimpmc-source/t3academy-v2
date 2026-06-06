import Link from "next/link";

const P = {
  primary:             "#002045",
  onPrimary:           "#ffffff",
  secondary:           "#904d00",
  secondaryContainer:  "#fe932c",
  onSecondaryContainer:"#663500",
  secondaryFixed:      "#ffdcc3",
  onSecondaryFixed:    "#2f1500",
  surfaceVariant:      "#e0e3e5",
};

// ── CTA Section ───────────────────────────────────────────────────────────────

export function FinalCta() {
  return (
    <section style={{ padding: "80px 40px", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          background: P.primary,
          borderRadius: 40,
          padding: "80px 40px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial inner glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at bottom left, #1a365d 0%, transparent 60%)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(32px,5vw,48px)",
              fontWeight: 800,
              color: P.onPrimary,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              margin: "0 0 16px",
            }}
          >
            Ready to unlock your potential?
          </h2>
          <p
            style={{
              fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
              fontSize: 18,
              color: "rgba(255,255,255,0.9)",
              lineHeight: 1.6,
              margin: "0 0 40px",
            }}
          >
            Join students across the UK who are mastering concepts faster with T3 Academy&rsquo;s AI-driven approach.
          </p>

          <div className="flex flex-col sm:flex-row justify-center" style={{ gap: 24 }}>
            <Link
              href="/auth/signup"
              style={{
                background: P.secondaryContainer,
                color: P.onSecondaryContainer,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                padding: "20px 40px",
                borderRadius: 16,
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                transition: "transform 0.2s",
                display: "inline-block",
              }}
              className="hover:scale-105"
            >
              Join for Free
            </Link>
            <a
              href="mailto:hello@t3academy.co.uk"
              style={{
                background: "rgba(255,255,255,0.10)",
                backdropFilter: "blur(8px)",
                color: P.onPrimary,
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                padding: "20px 40px",
                borderRadius: 16,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.20)",
                transition: "background 0.15s",
                display: "inline-block",
              }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

const FOOTER_COLS = [
  {
    title: "Programs",
    links: [
      { label: "11+ Prep",       href: "#products" },
      { label: "Secondary School",href: "#products" },
      { label: "Mind Score IQ",  href: "/iq-test"  },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us",       href: "#" },
      { label: "Curriculum",     href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Log in",    href: "/auth/login"   },
      { label: "Start free",href: "/auth/signup"  },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer
      id="footer"
      style={{
        background: P.primary,
        borderRadius: "16px 16px 0 0",
        fontFamily: "'Montserrat', system-ui, sans-serif",
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-4"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "64px 40px 40px", gap: 40 }}
      >
        {/* Brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: P.onPrimary }}>T3 Academy</span>
          <p
            style={{
              fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
              fontSize: 14,
              color: "rgba(224,227,229,0.75)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Premium supplemental education powered by AI and human expertise.
          </p>
          {/* Social icons */}
          <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
            {["public", "alternate_email", "chat"].map((icon) => (
              <a
                key={icon}
                href="#"
                style={{ color: "rgba(255,255,255,0.55)", transition: "color 0.15s" }}
                className="hover:text-white"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map(({ title, links }) => (
          <div key={title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h5 style={{ color: P.onPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>{title}</h5>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    style={{
                      fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
                      fontSize: 14,
                      color: "rgba(224,227,229,0.75)",
                      textDecoration: "none",
                      transition: "color 0.15s",
                      display: "block",
                    }}
                    className="hover:text-white"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h5 style={{ color: P.onPrimary, fontWeight: 700, fontSize: 14, margin: 0 }}>Contact</h5>
          <p style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif", fontSize: 14, color: "rgba(224,227,229,0.75)", margin: 0 }}>hello@t3academy.co.uk</p>
          <div style={{ marginTop: 8 }}>
            <a
              href="mailto:hello@t3academy.co.uk"
              style={{
                background: P.secondaryFixed,
                color: P.onSecondaryFixed,
                fontWeight: 700,
                fontSize: 13,
                padding: "8px 16px",
                borderRadius: 8,
                textDecoration: "none",
                display: "inline-block",
                transition: "opacity 0.15s",
              }}
              className="hover:opacity-90"
            >
              Get Support
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "16px 40px 24px",
          borderTop: "1px solid rgba(196,198,207,0.20)",
        }}
      >
        <p
          style={{
            fontFamily: "'Atkinson Hyperlegible Next', sans-serif",
            textAlign: "center",
            fontSize: 12,
            color: "rgba(224,227,229,0.55)",
            margin: 0,
          }}
        >
          &copy; {new Date().getFullYear()} T3 Academy. Test. Teach. Test again.
        </p>
      </div>
    </footer>
  );
}
