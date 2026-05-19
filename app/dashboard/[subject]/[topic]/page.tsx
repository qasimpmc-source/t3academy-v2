import { notFound } from "next/navigation";
import Link from "next/link";
import { SUBJECTS, isValidSubject } from "@/lib/curriculum/subjects";
import { QB } from "@/lib/curriculum/questions";
import LearnView from "./_components/LearnView";
import QuizView from "./_components/QuizView";

interface Props {
  params: Promise<{ subject: string; topic: string }>;
  searchParams: Promise<{ mode?: string }>;
}

export default async function TopicPage({ params, searchParams }: Props) {
  const { subject, topic } = await params;
  const { mode } = await searchParams;
  const topicKey = decodeURIComponent(topic);

  if (!isValidSubject(subject)) notFound();
  const config = SUBJECTS[subject];
  if (!config.topics[topicKey]) notFound();

  const meta = config.topics[topicKey];
  const questions = QB[subject]?.[topicKey] ?? [];

  const isQuiz = mode === "quiz";

  return (
    <div className="flex flex-col flex-1">
      {/* Topic header */}
      <div
        className="px-6 py-4 flex items-center gap-4"
        style={{
          background: "var(--color-card)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <Link
          href={`/dashboard/${subject}`}
          className="text-sm font-medium px-3 py-1.5 rounded-lg no-underline flex-shrink-0"
          style={{
            background: "var(--color-bg3)",
            border: "1px solid var(--color-border)",
            color: "var(--color-text3)",
          }}
        >
          ← {config.label}
        </Link>

        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="text-xl">{meta.icon}</span>
          <div>
            <div
              className="text-sm font-semibold"
              style={{ color: "var(--color-text)" }}
            >
              {meta.label}
            </div>
            <div className="text-xs" style={{ color: "var(--color-text3)" }}>
              {config.label} · {questions.length} questions
            </div>
          </div>
        </div>

        {/* Mode toggle */}
        <div
          className="flex rounded-xl overflow-hidden flex-shrink-0"
          style={{ border: "1px solid var(--color-border)" }}
        >
          <Link
            href={`/dashboard/${subject}/${topic}`}
            className="text-xs font-medium px-4 py-2 no-underline transition-colors"
            style={
              !isQuiz
                ? { background: config.color, color: "#fff" }
                : { background: "var(--color-card)", color: "var(--color-text3)" }
            }
          >
            Learn
          </Link>
          <Link
            href={`/dashboard/${subject}/${topic}?mode=quiz`}
            className="text-xs font-medium px-4 py-2 no-underline transition-colors"
            style={
              isQuiz
                ? { background: config.color, color: "#fff" }
                : { background: "var(--color-card)", color: "var(--color-text3)" }
            }
          >
            Quiz
          </Link>
        </div>
      </div>

      {/* Content */}
      {isQuiz ? (
        <QuizView
          subject={subject}
          topicKey={topicKey}
          questions={questions}
          subjectColor={config.color}
          subjectLabel={config.label}
          topicLabel={meta.label}
        />
      ) : (
        <LearnView
          subjectLabel={config.label}
          topicLabel={meta.label}
          subjectColor={config.color}
          topicHref={`/dashboard/${subject}/${topic}?mode=quiz`}
        />
      )}
    </div>
  );
}
