import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FOUNDATIONS_SUBJECTS, getChapter, getTopic, isValidFoundationsSubject } from "@/lib/curriculum/foundations/structure";
import { computeTopicStatuses, foundationsSubjectKey, topicKey } from "@/lib/curriculum/foundations/gating";
import { getTopicContent } from "@/lib/curriculum/foundations/content";
import SessionRunner from "../../../_components/SessionRunner";

interface Props {
  params: Promise<{ subject: string; chapter: string; topic: string }>;
}

export default async function FoundationsTopicPage({ params }: Props) {
  const { subject, chapter: chapterId, topic: topicId } = await params;
  if (!isValidFoundationsSubject(subject)) notFound();

  const meta = FOUNDATIONS_SUBJECTS[subject];
  const chapter = getChapter(chapterId);
  if (!chapter || chapter.subjectId !== subject) notFound();

  const topicMeta = getTopic(chapterId, topicId);
  if (!topicMeta) notFound();

  const content = getTopicContent(chapterId, topicId);
  if (!content) notFound();

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: attempts } = await supabase
    .from("question_attempts")
    .select("topic, correct")
    .eq("user_id", user!.id)
    .eq("subject", foundationsSubjectKey(subject));

  const rows = (attempts ?? []).map((a) => ({ topic: a.topic, correct: a.correct as boolean }));
  const status = computeTopicStatuses(subject, rows)[topicKey(chapterId, topicId)] ?? "locked";

  if (status === "locked") {
    return (
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <div className="text-4xl mb-4">🔒</div>
        <h1 className="text-lg font-semibold mb-2" style={{ color: "var(--color-text)" }}>{topicMeta.title} is still locked</h1>
        <p className="text-sm mb-6" style={{ color: "var(--color-text3)" }}>Pass the topic before this one to unlock it.</p>
        <Link href={`/dashboard/foundations/${subject}/${chapterId}`} className="inline-block text-sm font-semibold px-6 py-2.5 rounded-xl no-underline"
          style={{ background: meta.color, color: "#fff" }}>
          Back to {chapter.title}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex items-center gap-3 px-6 pt-6 flex-shrink-0">
        <Link href={`/dashboard/foundations/${subject}/${chapterId}`} className="text-sm font-medium px-3 py-1.5 rounded-lg no-underline"
          style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text3)" }}>
          ← {chapter.title}
        </Link>
        <h1 className="text-base font-semibold" style={{ color: "var(--color-text)" }}>{topicMeta.title}</h1>
      </div>
      <SessionRunner
        subjectId={subject}
        subjectLabel={meta.label}
        subjectColor={meta.color}
        chapterId={chapterId}
        chapterTitle={chapter.title}
        content={content}
      />
    </div>
  );
}
