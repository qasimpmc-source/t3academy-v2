import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FOUNDATIONS_SUBJECTS } from "@/lib/curriculum/foundations/structure";
import { subjectMasteryProgress, foundationsSubjectKey } from "@/lib/curriculum/foundations/gating";

export default async function FoundationsHomePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("subject, topic, correct")
    .eq("user_id", user!.id)
    .in("subject", ["foundations-maths", "foundations-physics", "foundations-chemistry", "foundations-biology"]);

  const bySubject = (id: "maths" | "physics" | "chemistry" | "biology") =>
    (attempts ?? []).filter((a) => a.subject === foundationsSubjectKey(id)).map((a) => ({ topic: a.topic, correct: a.correct as boolean }));

  const mathsProgress = subjectMasteryProgress("maths", bySubject("maths"));
  const scienceProgress = (["physics", "chemistry", "biology"] as const)
    .map((id) => subjectMasteryProgress(id, bySubject(id)))
    .reduce((acc, p) => ({ passed: acc.passed + p.passed, total: acc.total + p.total }), { passed: 0, total: 0 });

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
          Foundations
        </h1>
        <p className="text-sm" style={{ color: "var(--color-text3)" }}>
          Your own space. Pick where you&apos;re starting today.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/dashboard/foundations/maths"
          className="block rounded-3xl p-7 no-underline transition-all"
          style={{ background: FOUNDATIONS_SUBJECTS.maths.bg, border: `1.5px solid ${FOUNDATIONS_SUBJECTS.maths.border}` }}>
          <span className="text-3xl mb-4 block">{FOUNDATIONS_SUBJECTS.maths.icon}</span>
          <h2 className="text-lg font-semibold mb-1.5" style={{ color: "var(--color-text)" }}>Maths</h2>
          <p className="text-sm mb-5" style={{ color: "var(--color-text3)" }}>Sharp, and genuinely challenging.</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: FOUNDATIONS_SUBJECTS.maths.color }}>
              {mathsProgress.passed} / {mathsProgress.total} topics conquered
            </span>
            <span style={{ color: FOUNDATIONS_SUBJECTS.maths.color }}>→</span>
          </div>
        </Link>

        <Link href="/dashboard/foundations/science"
          className="block rounded-3xl p-7 no-underline transition-all"
          style={{ background: FOUNDATIONS_SUBJECTS.physics.bg, border: `1.5px solid ${FOUNDATIONS_SUBJECTS.physics.border}` }}>
          <span className="text-3xl mb-4 block">🔭</span>
          <h2 className="text-lg font-semibold mb-1.5" style={{ color: "var(--color-text)" }}>Science</h2>
          <p className="text-sm mb-5" style={{ color: "var(--color-text3)" }}>Physics, Chemistry and Biology.</p>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium" style={{ color: FOUNDATIONS_SUBJECTS.physics.color }}>
              {scienceProgress.passed} / {scienceProgress.total} topics conquered
            </span>
            <span style={{ color: FOUNDATIONS_SUBJECTS.physics.color }}>→</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
