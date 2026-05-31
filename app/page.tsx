import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { SubjectCards } from "@/components/subject-cards";
import { AiTutorShowcase } from "@/components/ai-tutor-showcase";
import { FinalCta, SiteFooter } from "@/components/site-footer";

// Animated background orbs and grain texture are pure CSS — no client JS needed.

export default function LandingPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F1EB",
        color: "#1A1610",
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Drifting ambient orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        <div
          className="orb-1"
          style={{
            position: "absolute",
            width: 384,
            height: 384,
            borderRadius: "50%",
            background: "rgba(200,154,94,0.08)",
            filter: "blur(80px)",
            top: "5%",
            left: "10%",
          }}
        />
        <div
          className="orb-2"
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(200,154,94,0.06)",
            filter: "blur(80px)",
            top: "50%",
            right: "15%",
          }}
        />
        <div
          className="orb-3"
          style={{
            position: "absolute",
            width: 288,
            height: 288,
            borderRadius: "50%",
            background: "rgba(200,154,94,0.07)",
            filter: "blur(80px)",
            bottom: "10%",
            left: "30%",
          }}
        />
      </div>

      {/* Grain texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.025,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Page content — sits above orbs and grain */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <SiteNav />
        <main>
          <Hero />
          <SubjectCards />
          <AiTutorShowcase />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
