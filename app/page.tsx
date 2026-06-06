import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { ProblemSolution } from "@/components/problem-solution";
import { SubjectCards } from "@/components/subject-cards";
import { AiTutorShowcase } from "@/components/ai-tutor-showcase";
import { FinalCta, SiteFooter } from "@/components/site-footer";

export default function LandingPage() {
  return (
    <div
      style={{
        background: "radial-gradient(circle at 50% 0%, #064e3b 0%, #131313 80%)",
        color: "#e5e2e1",
        overflowX: "hidden",
        minHeight: "100vh",
        fontFamily: "var(--font-montserrat), 'Montserrat', system-ui, sans-serif",
      }}
    >
      {/* Noise texture */}
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
      {/* Green-tinted grid overlay */}
      <div className="architectural-overlay" aria-hidden="true" />

      <div style={{ position: "relative", zIndex: 10 }}>
        <SiteNav />
        <main style={{ paddingTop: 80 }}>
          <Hero />
          <ProblemSolution />
          <SubjectCards />
          <AiTutorShowcase />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
