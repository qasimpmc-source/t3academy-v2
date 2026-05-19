import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { SUBJECTS, isValidSubject } from "@/lib/curriculum/subjects";
import { QB } from "@/lib/curriculum/questions";

interface Props {
  params: Promise<{ subject: string }>;
}

export default async function SubjectPage({ params }: Props) {
  const { subject } = await params;
  if (!isValidSubject(subject)) notFound();

  const config = SUBJECTS[subject];
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch per-topic accuracy for this user
  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("topic, correct")
    .eq("user_id", user!.id)
    .eq("subject", subject);

  // Aggregate: { [topic]: { total: number, correct: number } }
  const stats: Record<string, { total: number; correct: number }> = {};
  for (const a of attempts ?? []) {
    if (!stats[a.topic]) stats[a.topic] = { total: 0, correct: 0 };
    stats[a.topic].total++;
    if (a.correct) stats[a.topic].correct++;
  }

  const topicKeys = Object.keys(config.topics);

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      {/* Back + header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/dashboard"
          className="text-sm font-medium px-3 py-1.5 rounded-lg transition-colors no-underline"
          style={{
            background: "var(--color-bg3)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text3)",
          }}
        >
          ← Dashboard
        </Link>
        <div className="flex items-center gap-2">
          <span
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base"
            style={{ background: config.bg, border: `1px solid ${config.border}` }}
          >
            {config.icon}
          </span>
          <h1
            className="text-xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
          >
            {config.label}
          </h1>
        </div>
      </div>

      {/* Topic list */}
      <div className="space-y-3">
        {topicKeys.map((topicKey, i) => {
          const meta = config.topics[topicKey];
          const questionCount = QB[subject]?.[topicKey]?.length ?? 0;
          const s = stats[topicKey];
          const attempted = s?.total ?? 0;
          const accuracy = s && s.total > 0 ? Math.round((s.correct / s.total) * 100) : null;
          const isWeak = accuracy !== null && accuracy < 70;

          return (
            <Link
              key={topicKey}
              href={`/dashboard/${subject}/${encodeURIComponent(topicKey)}`}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all no-underline group"
              style={{
                background: "var(--color-card)",
                border: "1.5px solid var(--color-border)",
                boxShadow: "0 1px 6px rgba(28,24,18,0.05)",
              }}
              onMouseEnter={undefined}
            >
              {/* Number badge */}
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: config.bg,
                  color: config.color,
                  border: `1px solid ${config.border}`,
                }}
              >
                {i + 1}
              </span>

              {/* Icon */}
              <span className="text-xl flex-shrink-0">{meta.icon}</span>

              {/* Label + meta */}
              <div className="flex-1 min-w-0">
                <div
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-text)" }}
                >
                  {meta.label}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--color-text3)" }}>
                  {questionCount} questions
                  {attempted > 0 && ` · ${attempted} attempted`}
                </div>
              </div>

              {/* Accuracy badge */}
              {accuracy !== null ? (
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: isWeak ? "var(--color-red-bg)" : "var(--color-green-bg)",
                    color: isWeak ? "var(--color-red)" : "var(--color-green)",
                  }}
                >
                  {accuracy}%
                </span>
              ) : (
                <span
                  className="text-xs px-2.5 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: "var(--color-bg3)",
                    color: "var(--color-text3)",
                  }}
                >
                  Not started
                </span>
              )}

              {/* Arrow */}
              <span className="text-sm flex-shrink-0" style={{ color: "var(--color-text4)" }}>
                →
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
