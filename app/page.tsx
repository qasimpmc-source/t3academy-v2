import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { SubjectCards } from "@/components/subject-cards";
import { AiTutorShowcase } from "@/components/ai-tutor-showcase";
import { FinalCta, SiteFooter } from "@/components/site-footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg font-sans text-text">
      <SiteNav />
      <main>
        <Hero />
        <SubjectCards />
        <AiTutorShowcase />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}
