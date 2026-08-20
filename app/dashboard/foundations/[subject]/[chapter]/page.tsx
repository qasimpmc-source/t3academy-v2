import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FOUNDATIONS_SUBJECTS, getChapter, getTopicsForChapter, isValidFoundationsSubject } from "@/lib/curriculum/foundations/structure";
import { computeTopicStatuses, foundationsSubjectKey, topicKey } from "@/lib/curriculum/foundations/gating";

interface Props {
  params: Promise<{ subject: string; chapter: string }>;
}

const STATUS_LABEL = { locked: "Locked", unlocked: "Start", passed: "Conquered" } as const;

export default async function FoundationsChapterPage({ params }: Props) {
  const { subject, chapter: chapterId } = await params;
  if (!isValidFoundationsSubject(subject)) notFound();

  const meta = FOUNDATIONS_SUBJECTS[subject];
  const chapter = getChapter(chapterId);
  if (!chapter || chapter.subjectId !== subject) notFound();

  const topics = getTopicsForChapter(chapterId);

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("topic, correct")
    .eq("user_id", user!.id)
    .eq("subject", foundationsSubjectKey(subject));

  const rows = (attempts ?? []).map((a) => ({ topic: a.topic, correct: a.correct as boolean }));
  const statuses = computeTopicStatuses(subject, rows);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href={`/dashboard/foundations/${subject}`} className="text-sm font-medium px-3 py-1.5 rounded-lg no-underline"
          style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text3)" }}>
          ← {meta.label}
        </Link>
        <h1 className="text-xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
          {chapter.title}
        </h1>
      </div>

      <div className="space-y-3">
        {topics.map((topic, i) => {
          const key = topicKey(chapterId, topic.id);
          const status = statuses[key] ?? "locked";
          const isLocked = status === "locked";
          const badgeBg = status === "passed" ? "var(--color-green-bg)" : status === "unlocked" ? meta.bg : "var(--color-bg3)";
          const badgeColor = status === "passed" ? "var(--color-green)" : status === "unlocked" ? meta.color : "var(--color-text4)";

          const inner = (
            <>
              <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: isLocked ? "var(--color-bg3)" : meta.bg, color: isLocked ? "var(--color-text4)" : meta.color, border: `1px solid ${isLocked ? "var(--color-border)" : meta.border}` }}>
                {status === "passed" ? "✓" : i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold" style={{ color: isLocked ? "var(--color-text4)" : "var(--color-text)" }}>{topic.title}</div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={{ background: badgeBg, color: badgeColor }}>
                {STATUS_LABEL[status]}
              </span>
              {!isLocked && <span className="text-sm flex-shrink-0" style={{ color: "var(--color-text4)" }}>→</span>}
              {isLocked && <span className="text-sm flex-shrink-0">🔒</span>}
            </>
          );

          const rowClass = "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all";
          const rowStyle = {
            background: "var(--color-card)",
            border: `1.5px solid ${isLocked ? "var(--color-border)" : "var(--color-border)"}`,
            boxShadow: isLocked ? "none" : "0 1px 6px rgba(28,24,18,0.05)",
            opacity: isLocked ? 0.55 : 1,
          };

          return isLocked ? (
            <div key={topic.id} className={rowClass} style={rowStyle}>{inner}</div>
          ) : (
            <Link key={topic.id} href={`/dashboard/foundations/${subject}/${chapterId}/${topic.id}`} className={`${rowClass} no-underline`} style={rowStyle}>
              {inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
