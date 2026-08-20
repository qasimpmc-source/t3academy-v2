import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FOUNDATIONS_SUBJECTS } from "@/lib/curriculum/foundations/structure";
import { subjectMasteryProgress, foundationsSubjectKey } from "@/lib/curriculum/foundations/gating";

const SCIENCE_SUBJECTS = ["physics", "chemistry", "biology"] as const;

export default async function FoundationsSciencePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("subject, topic, correct")
    .eq("user_id", user!.id)
    .in("subject", SCIENCE_SUBJECTS.map(foundationsSubjectKey));

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link href="/dashboard/foundations" className="text-sm font-medium px-3 py-1.5 rounded-lg no-underline inline-block mb-6"
        style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text3)" }}>
        ← Foundations
      </Link>

      <h1 className="text-2xl font-semibold tracking-tight mb-8" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
        Science
      </h1>

      <div className="grid sm:grid-cols-3 gap-4">
        {SCIENCE_SUBJECTS.map((id) => {
          const meta = FOUNDATIONS_SUBJECTS[id];
          const rows = (attempts ?? [])
            .filter((a) => a.subject === foundationsSubjectKey(id))
            .map((a) => ({ topic: a.topic, correct: a.correct as boolean }));
          const progress = subjectMasteryProgress(id, rows);
          return (
            <Link key={id} href={`/dashboard/foundations/${id}`}
              className="block rounded-3xl p-6 no-underline transition-all"
              style={{ background: meta.bg, border: `1.5px solid ${meta.border}` }}>
              <span className="text-3xl mb-4 block">{meta.icon}</span>
              <h2 className="text-base font-semibold mb-4" style={{ color: "var(--color-text)" }}>{meta.label}</h2>
              <span className="text-xs font-medium" style={{ color: meta.color }}>
                {progress.passed} / {progress.total} conquered
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
