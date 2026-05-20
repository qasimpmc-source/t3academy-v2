import { createClient } from "@/lib/supabase/server";
import OllieChat from "./_components/OllieChat";
import SubjectCard from "./_components/SubjectCard";

export const dynamic = "force-dynamic";

const SUBJECTS = [
  {
    id: "english",
    label: "English",
    icon: "📖",
    topics: 6,
    color: "#7C3AED",
    bg: "var(--color-english-bg)",
    border: "rgba(124,58,237,0.25)",
    topBar: "#7C3AED",
  },
  {
    id: "maths",
    label: "Maths",
    icon: "🔢",
    topics: 6,
    color: "#1D6FDB",
    bg: "var(--color-maths-bg)",
    border: "rgba(29,111,219,0.25)",
    topBar: "#1D6FDB",
  },
  {
    id: "verbal",
    label: "Verbal Reasoning",
    icon: "💬",
    topics: 7,
    color: "#0F7D4B",
    bg: "var(--color-verbal-bg)",
    border: "rgba(15,125,75,0.25)",
    topBar: "#0F7D4B",
  },
  {
    id: "nvr",
    label: "Non-Verbal Reasoning",
    icon: "🔷",
    topics: 7,
    color: "#C2720A",
    bg: "var(--color-nvr-bg)",
    border: "rgba(194,114,10,0.25)",
    topBar: "#C2720A",
  },
] as const;

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { data: attempts }] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, streak, last_active")
      .eq("id", user!.id)
      .single(),
    supabase
      .from("question_attempts")
      .select("subject, topic, correct"),
  ]);

  const firstName = profile?.full_name?.split(" ")[0] ?? "there";
  const streak = profile?.streak ?? 0;

  // Overall stats
  const totalDone = attempts?.length ?? 0;
  const totalCorrect = attempts?.filter(a => a.correct).length ?? 0;
  const overallAccuracy = totalDone > 0 ? Math.round((totalCorrect / totalDone) * 100) : null;

  // Per-subject stats
  type SubjectStat = { done: number; correct: number; topics: Set<string> };
  const subjectStats: Record<string, SubjectStat> = {};
  for (const a of attempts ?? []) {
    if (!subjectStats[a.subject]) subjectStats[a.subject] = { done: 0, correct: 0, topics: new Set() };
    subjectStats[a.subject].done++;
    if (a.correct) subjectStats[a.subject].correct++;
    subjectStats[a.subject].topics.add(a.topic);
  }

  // Trophies = topics where accuracy >= 90% with at least 5 attempts
  type TopicStat = { total: number; correct: number };
  const topicStats: Record<string, TopicStat> = {};
  for (const a of attempts ?? []) {
    const key = `${a.subject}::${a.topic}`;
    if (!topicStats[key]) topicStats[key] = { total: 0, correct: 0 };
    topicStats[key].total++;
    if (a.correct) topicStats[key].correct++;
  }
  const trophies = Object.values(topicStats).filter(
    s => s.total >= 5 && Math.round((s.correct / s.total) * 100) >= 90
  ).length;

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">

          {/* Continue card */}
          <div
            className="relative flex items-center gap-5 rounded-2xl px-6 py-5 overflow-hidden"
            style={{
              background: "var(--color-card)",
              border: "1.5px solid var(--color-amber)",
              boxShadow: "0 4px 24px rgba(212,134,10,0.1)",
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute -right-8 -top-8 w-40 h-40 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(212,134,10,0.07), transparent 70%)",
              }}
            />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background: "var(--color-amber-bg)",
                border: "1.5px solid rgba(212,134,10,0.2)",
              }}
            >
              🦉
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="text-[10px] font-bold tracking-widest uppercase mb-1"
                style={{ color: "var(--color-amber)" }}
              >
                Good to see you, {firstName}
              </div>
              <h2
                className="text-lg font-semibold tracking-tight mb-0.5"
                style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}
              >
                Ready to continue your prep?
              </h2>
              <p className="text-sm" style={{ color: "var(--color-text3)" }}>
                Pick a subject below or ask Ollie where to focus today.
              </p>
            </div>
            <button
              className="flex-shrink-0 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
              style={{
                background: "var(--color-amber)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
              }}
            >
              Start →
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "📝", label: "Questions Done", value: String(totalDone), sub: "all topics" },
              { icon: "🎯", label: "Accuracy", value: overallAccuracy !== null ? `${overallAccuracy}%` : "—", sub: "overall" },
              { icon: "🏆", label: "Trophies", value: String(trophies), sub: "earned" },
              { icon: "🔥", label: "Streak", value: String(streak), sub: "days" },
            ].map(({ icon, label, value, sub }) => (
              <div
                key={label}
                className="rounded-xl px-4 py-4 transition-all"
                style={{
                  background: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  boxShadow: "0 1px 6px rgba(28,24,18,0.05)",
                }}
              >
                <span className="text-xl block mb-2">{icon}</span>
                <div
                  className="text-[10px] font-bold tracking-widest uppercase mb-1"
                  style={{ color: "var(--color-text3)" }}
                >
                  {label}
                </div>
                <div
                  className="text-3xl font-semibold leading-none tracking-tight mb-1"
                  style={{
                    fontFamily: "var(--font-serif)",
                    color: "var(--color-text)",
                  }}
                >
                  {value}
                </div>
                <div className="text-xs" style={{ color: "var(--color-text3)" }}>
                  {sub}
                </div>
              </div>
            ))}
          </div>

          {/* Subject grid */}
          <div>
            <div
              className="flex items-center gap-2 mb-4 text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "var(--color-text3)" }}
            >
              <span
                className="w-3.5 h-0.5 rounded"
                style={{ background: "var(--color-amber)" }}
              />
              Choose a subject
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SUBJECTS.map((s) => {
                const ss = subjectStats[s.id];
                const done = ss?.done ?? 0;
                const accuracy = ss && ss.done > 0
                  ? Math.round((ss.correct / ss.done) * 100)
                  : null;
                const pct = ss
                  ? Math.round((ss.topics.size / s.topics) * 100)
                  : 0;
                return (
                  <SubjectCard
                    key={s.id}
                    {...s}
                    done={done}
                    accuracy={accuracy}
                    pct={pct}
                  />
                );
              })}
            </div>
          </div>

        </div>
      </main>

      {/* ── Ollie sidebar (desktop) ── */}
      <aside
        className="hidden lg:flex flex-col w-[360px] flex-shrink-0"
        style={{
          borderLeft: "1px solid var(--color-border)",
          height: "calc(100vh - 3.5rem)",
          position: "sticky",
          top: "3.5rem",
        }}
      >
        <OllieChat />
      </aside>
    </div>
  );
}
