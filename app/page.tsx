import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { SubjectCards } from "@/components/subject-cards";
import { AiTutorShowcase } from "@/components/ai-tutor-showcase";
import { FinalCta, SiteFooter } from "@/components/site-footer";
import { MouseParallax } from "@/components/mouse-parallax";

export default function LandingPage() {
  return (
    <div
      style={{
        background: "radial-gradient(circle at 80% 20%, #2d1b4d 0%, #101415 70%)",
        color: "#e0e3e5",
        overflowX: "hidden",
        minHeight: "100vh",
        fontFamily: "var(--font-hanken), 'Hanken Grotesk', system-ui, sans-serif",
      }}
    >
      {/* Dark noise texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          opacity: 0.03,
          pointerEvents: "none",
          zIndex: 50,
        }}
      />

      {/* Architectural grid lines */}
      <div className="architectural-overlay" aria-hidden="true" />

      {/* Mouse parallax — client island */}
      <MouseParallax />

      {/* All content above overlays */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <SiteNav />
        <main style={{ paddingTop: 96 }}>
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
