import { createClient } from "@/lib/supabase/server";
import { WelcomeBanner } from "./_components/WelcomeBanner";
import { StatsSection } from "./_components/StatsSection";
import { SubjectCardsNew } from "./_components/SubjectCardsNew";
import { DailyTip } from "./_components/DailyTip";
import OllieChat from "./_components/OllieChat";

export const dynamic = "force-dynamic";

const SUBJECT_IDS = ["english", "maths", "verbal", "nvr"] as const;
const TOPIC_COUNTS: Record<string, number> = { english: 6, maths: 6, verbal: 7, nvr: 7 };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [{ data: profile }, { data: attempts }] = await Promise.all([
    supabase.from("profiles").select("full_name, streak").eq("id", user!.id).single(),
    supabase.from("question_attempts").select("subject, topic, correct"),
  ]);

  const firstName = profile?.full_name?.split(" ")[0] ?? "Explorer";
  const streak = profile?.streak ?? 0;

  const totalDone = attempts?.length ?? 0;
  const totalCorrect = attempts?.filter(a => a.correct).length ?? 0;
  const overallAccuracy = totalDone > 0 ? Math.round((totalCorrect / totalDone) * 100) : null;

  type SubjectStat = { done: number; correct: number; topics: Set<string> };
  const subjectStats: Record<string, SubjectStat> = {};
  for (const a of attempts ?? []) {
    if (!subjectStats[a.subject]) subjectStats[a.subject] = { done: 0, correct: 0, topics: new Set() };
    subjectStats[a.subject].done++;
    if (a.correct) subjectStats[a.subject].correct++;
    subjectStats[a.subject].topics.add(a.topic);
  }

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

  const cardStats = Object.fromEntries(
    SUBJECT_IDS.map(id => {
      const ss = subjectStats[id];
      return [id, {
        done: ss?.done ?? 0,
        accuracy: ss && ss.done > 0 ? Math.round((ss.correct / ss.done) * 100) : null,
        pct: ss ? Math.round((ss.topics.size / TOPIC_COUNTS[id]) * 100) : 0,
      }];
    })
  );

  return (
    <div className="flex flex-1 overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        {/* Ambient glows — emerald/gold palette */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl"
            style={{ background: "rgba(6,78,59,0.35)" }} />
          <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full blur-3xl"
            style={{ background: "rgba(149,211,186,0.06)" }} />
          <div className="absolute bottom-20 left-1/3 w-72 h-72 rounded-full blur-3xl"
            style={{ background: "rgba(233,195,73,0.05)" }} />
        </div>

        <div className="max-w-4xl mx-auto px-6 py-4 space-y-4">
          <WelcomeBanner firstName={firstName} />
          <StatsSection totalDone={totalDone} accuracy={overallAccuracy} trophies={trophies} streak={streak} />
          <SubjectCardsNew stats={cardStats} />
          <DailyTip />
        </div>
      </main>

      <aside
        className="hidden lg:flex flex-col w-[360px] flex-shrink-0"
        style={{
          borderLeft: "1px solid rgba(149,211,186,0.12)",
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
