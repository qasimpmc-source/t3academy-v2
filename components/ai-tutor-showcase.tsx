const P = {
  primary:         "#002045",
  onSurfaceVariant:"#43474e",
  surfaceContainer:"#eceef0",
  secondaryFixed:  "#ffdcc3",
  onSecondaryFixed:"#2f1500",
  primaryFixed:    "#d6e3ff",
  onPrimaryFixed:  "#001b3c",
  tertiaryFixed:   "#89f5e7",
  onTertiaryFixed: "#00201d",
};

const STEPS = [
  {
    icon: "map",
    iconBg: P.secondaryFixed,
    iconColor: P.onSecondaryFixed,
    title: "Pick your path",
    body: "Select a program tailored to your age and specific educational goals.",
  },
  {
    icon: "quiz",
    iconBg: P.primaryFixed,
    iconColor: P.onPrimaryFixed,
    title: "Attempt a question",
    body: "AI-generated tasks that adapt in real time to your current skill level.",
  },
  {
    icon: "lightbulb",
    iconBg: P.tertiaryFixed,
    iconColor: P.onTertiaryFixed,
    title: "Get instant feedback",
    body: "Personalised explanations for every answer, correct or incorrect.",
  },
  {
    icon: "trending_up",
    iconBg: P.secondaryFixed,
    iconColor: P.onSecondaryFixed,
    title: "Track your growth",
    body: "Visual progress mapping helps you see exactly where you are improving.",
  },
];

export function AiTutorShowcase() {
  return (
    <section
      id="how-it-works"
      style={{
        background: P.surfaceContainer,
        padding: "80px 40px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", fontFamily: "'Montserrat', system-ui, sans-serif" }}>
        {/* Header */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,32px)", fontWeight: 700, color: P.primary, margin: 0 }}>
            The T3 Journey
          </h2>
          <p style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif", fontSize: 16, color: P.onSurfaceVariant, margin: 0 }}>
            Four simple steps to academic excellence.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: 24 }}>
          {STEPS.map(({ icon, iconBg, iconColor, title, body }) => (
            <div
              key={title}
              className="journey-card tonal-layer-1"
              style={{ borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
            >
              {/* Icon circle */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: iconBg,
                  color: iconColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24,
                  flexShrink: 0,
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 32 }}>{icon}</span>
              </div>
              <h4 style={{ fontSize: 18, fontWeight: 600, color: P.primary, margin: "0 0 12px" }}>{title}</h4>
              <p style={{ fontFamily: "'Atkinson Hyperlegible Next', sans-serif", fontSize: 14, color: P.onSurfaceVariant, lineHeight: 1.6, margin: 0 }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
