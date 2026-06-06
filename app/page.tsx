import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { SubjectCards } from "@/components/subject-cards";
import { AiTutorShowcase } from "@/components/ai-tutor-showcase";
import { FinalCta, SiteFooter } from "@/components/site-footer";

export default function LandingPage() {
  return (
    // bg-background = #f7f9fb per MD3 design system
    <div style={{ background: "#f7f9fb", color: "#191c1e", overflowX: "hidden" }}>
      {/* Fixed nav — pushes content down by its height (80px) */}
      <SiteNav />

      <main style={{ paddingTop: 80 }}>
        <Hero />
        <SubjectCards />
        <AiTutorShowcase />
        <FinalCta />
      </main>

      <SiteFooter />
    </div>
  );
}
