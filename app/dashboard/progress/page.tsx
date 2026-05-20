import { createClient } from "@/lib/supabase/server";
import { SUBJECTS } from "@/lib/curriculum/subjects";
import { QB } from "@/lib/curriculum/questions";
import Link from "next/link";

export const dynamic = "force-dynamic";

const SUBJECT_LIST = [
  { id: "english",  label: "English",              color: "#7C3AED", bg: "#F5F0FF", border: "rgba(124,58,237,0.2)", icon: "📖" },
  { id: "maths",    label: "Maths",                color: "#1D6FDB", bg: "#EEF5FF", border: "rgba(29,111,219,0.2)",  icon: "🔢" },
  { id: "verbal",   label: "Verbal Reasoning",     color: "#0F7D4B", bg: "#EDFAF3", border: "rgba(15,125,75,0.2)",   icon: "💬" },
  { id: "nvr",      label: "Non-Verbal Reasoning", color: "#C2720A", bg: "#FFF7EA", border: "rgba(194,114,10,0.2)",  icon: "🔷" },
] as const;

export default async function ProgressPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { data: attempts }] = await Promise.all([
    supabase.from("profiles").select("full_name, streak").eq("id", user!.id).single(),
    supabase.from("question_attempts").select("subject, topic, correct, attempted_at"),
  ]);

  const streak = profile?.streak ?? 0;

  // Aggregate by subject + topic
  type Stat = { total: number; correct: number };
  const byTopic: Record<string, Record<string, Stat>> = {};
  for (const a of attempts ?? []) {
    if (!byTopic[a.subject]) byTopic[a.subject] = {};
    if (!byTopic[a.subject][a.topic]) byTopic[a.subject][a.topic] = { total: 0, correct: 0 };
    byTopic[a.subject][a.topic].total++;
    if (a.correct) byTopic[a.subject][a.topic].correct++;
  }

  const totalDone = attempts?.length ?? 0;
  const totalCorrect = attempts?.filter(a => a.correct).length ?? 0;
  const overallAccuracy = totalDone > 0 ? Math.round((totalCorrect / totalDone) * 100) : null;
  const trophies = Object.values(byTopic).flatMap(t => Object.values(t)).filter(
    s => s.total >= 5 && Math.round((s.correct / s.total) * 100) >= 90
  ).length;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

      {/* Header */}
      <div>
        <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-text3)" }}>
          Your stats
        </div>
        <h1 className="text-2xl font-semibold tracking-tight" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
          Progress
        </h1>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: "📝", label: "Questions Done", value: String(totalDone), sub: "all time" },
          { icon: "🎯", label: "Accuracy",       value: overallAccuracy !== null ? `${overallAccuracy}%` : "—", sub: "overall" },
          { icon: "🏆", label: "Trophies",       value: String(trophies), sub: "topics ≥ 90%" },
          { icon: "🔥", label: "Streak",         value: String(streak),   sub: "days" },
        ].map(({ icon, label, value, sub }) => (
          <div key={label} className="rounded-xl px-4 py-4"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", boxShadow: "0 1px 6px rgba(28,24,18,0.05)" }}>
            <span className="text-xl block mb-2">{icon}</span>
            <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: "var(--color-text3)" }}>{label}</div>
            <div className="text-3xl font-semibold leading-none tracking-tight mb-1"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>{value}</div>
            <div className="text-xs" style={{ color: "var(--color-text3)" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Per-subject breakdown */}
      {SUBJECT_LIST.map((subj) => {
        const config = SUBJECTS[subj.id];
        const topicKeys = Object.keys(config.topics);
        const subjectStats = byTopic[subj.id] ?? {};
        const subjectTotal = Object.values(subjectStats).reduce((s, t) => s + t.total, 0);
        const subjectCorrect = Object.values(subjectStats).reduce((s, t) => s + t.correct, 0);
        const subjectAccuracy = subjectTotal > 0 ? Math.round((subjectCorrect / subjectTotal) * 100) : null;
        const topicsDone = topicKeys.filter(k => subjectStats[k]?.total > 0).length;

        return (
          <div key={subj.id}>
            {/* Subject header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm"
                  style={{ background: subj.bg, border: `1px solid ${subj.border}` }}>
                  {subj.icon}
                </span>
                <span className="text-sm font-bold" style={{ color: "var(--color-text)" }}>{subj.label}</span>
                <span className="text-xs" style={{ color: "var(--color-text3)" }}>
                  {topicsDone}/{topicKeys.length} topics started
                </span>
              </div>
              {subjectAccuracy !== null && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{
                    background: subjectAccuracy >= 70 ? "var(--color-green-bg)" : "var(--color-red-bg)",
                    color: subjectAccuracy >= 70 ? "var(--color-green)" : "var(--color-red)",
                  }}>
                  {subjectAccuracy}% accuracy
                </span>
              )}
            </div>

            {/* Topic rows */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid var(--color-border)" }}>
              {topicKeys.map((topicKey, i) => {
                const meta = config.topics[topicKey];
                const s = subjectStats[topicKey];
                const attempted = s?.total ?? 0;
                const accuracy = s && s.total > 0 ? Math.round((s.correct / s.total) * 100) : null;
                const isTrophy = accuracy !== null && s.total >= 5 && accuracy >= 90;
                const qCount = QB[subj.id]?.[topicKey]?.length ?? 0;

                return (
                  <Link
                    key={topicKey}
                    href={`/dashboard/${subj.id}/${encodeURIComponent(topicKey)}`}
                    className="flex items-center gap-3 px-4 py-3 no-underline transition-colors"
                    style={{
                      background: "var(--color-card)",
                      borderTop: i > 0 ? "1px solid var(--color-border)" : "none",
                      display: "flex",
                    }}
                  >
                    <span className="text-base flex-shrink-0">{meta.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{meta.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--color-text3)" }}>
                        {attempted > 0 ? `${attempted} attempted · ${qCount} available` : `${qCount} questions · not started`}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="hidden sm:block w-24 flex-shrink-0">
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                        <div className="h-full rounded-full transition-all"
                          style={{ width: `${accuracy ?? 0}%`, background: accuracy === null ? "transparent" : accuracy >= 70 ? "var(--color-green)" : "var(--color-red)" }} />
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="flex-shrink-0 w-16 text-right">
                      {isTrophy ? (
                        <span className="text-base">🏆</span>
                      ) : accuracy !== null ? (
                        <span className="text-xs font-semibold"
                          style={{ color: accuracy >= 70 ? "var(--color-green)" : "var(--color-red)" }}>
                          {accuracy}%
                        </span>
                      ) : (
                        <span className="text-xs" style={{ color: "var(--color-text4)" }}>—</span>
                      )}
                    </div>

                    <span className="text-xs flex-shrink-0" style={{ color: "var(--color-text4)" }}>→</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}

    </div>
  );
}
