import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FOUNDATIONS_SUBJECTS, getChaptersForSubject, getTopicsForChapter, isValidFoundationsSubject } from "@/lib/curriculum/foundations/structure";
import { computeTopicStatuses, foundationsSubjectKey, topicKey } from "@/lib/curriculum/foundations/gating";

interface Props {
  params: Promise<{ subject: string }>;
}

export default async function FoundationsSubjectPage({ params }: Props) {
  const { subject } = await params;
  if (!isValidFoundationsSubject(subject)) notFound();

  const meta = FOUNDATIONS_SUBJECTS[subject];
  const chapters = getChaptersForSubject(subject);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("topic, correct")
    .eq("user_id", user!.id)
    .eq("subject", foundationsSubjectKey(subject));

  const rows = (attempts ?? []).map((a) => ({ topic: a.topic, correct: a.correct as boolean }));
  const statuses = computeTopicStatuses(subject, rows);

  const backHref = meta.group === "science" ? "/dashboard/foundations/science" : "/dashboard/foundations";

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href={backHref} className="text-sm font-medium px-3 py-1.5 rounded-lg no-underline"
          style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text3)" }}>
          ← Back
        </Link>
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: meta.bg, border: `1px solid ${meta.border}` }}>
            {meta.icon}
          </span>
          <h1 className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
            {meta.label}
          </h1>
        </div>
      </div>

      <div className="space-y-6">
        {chapters.map((chapter) => {
          const topics = getTopicsForChapter(chapter.id);
          const passed = topics.filter((t) => statuses[topicKey(chapter.id, t.id)] === "passed").length;
          return (
            <Link key={chapter.id} href={`/dashboard/foundations/${subject}/${chapter.id}`}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl no-underline transition-all block"
              style={{ background: "var(--color-card)", border: "1.5px solid var(--color-border)", boxShadow: "0 1px 6px rgba(28,24,18,0.05)" }}>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>{chapter.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--color-text3)" }}>{topics.length} topics</div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                style={{ background: passed === topics.length ? "var(--color-green-bg)" : "var(--color-bg3)", color: passed === topics.length ? "var(--color-green)" : "var(--color-text3)" }}>
                {passed}/{topics.length}
              </span>
              <span className="text-sm flex-shrink-0" style={{ color: "var(--color-text4)" }}>→</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
