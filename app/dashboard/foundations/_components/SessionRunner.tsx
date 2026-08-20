"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import OrbitChat from "./OrbitChat";
import type { FoundationsSubjectId, FoundationsTopicContent } from "@/lib/curriculum/foundations/types";
import { foundationsSubjectKey, topicKey } from "@/lib/curriculum/foundations/gating";

interface Props {
  subjectId: FoundationsSubjectId;
  subjectLabel: string;
  subjectColor: string;
  chapterId: string;
  chapterTitle: string;
  content: FoundationsTopicContent;
}

type Segment = "starter" | "hook" | "teach" | "practice" | "teachback" | "done";
const SEGMENT_ORDER: Segment[] = ["starter", "hook", "teach", "practice", "teachback", "done"];
const SEGMENT_LABEL: Record<Segment, string> = {
  starter: "Recall", hook: "Hook", teach: "Teach", practice: "Practice", teachback: "Teach-back", done: "Done",
};

export default function SessionRunner({ subjectId, subjectLabel, subjectColor, chapterId, chapterTitle, content }: Props) {
  const [segmentIndex, setSegmentIndex] = useState(0);
  const segment = SEGMENT_ORDER[segmentIndex];

  const [starterChoice, setStarterChoice] = useState<number | null>(null);
  const [hookChoice, setHookChoice] = useState<number | null>(null);
  const [workedRevealed, setWorkedRevealed] = useState<Set<number>>(new Set());

  const [practiceIndex, setPracticeIndex] = useState(0);
  const [practiceSelected, setPracticeSelected] = useState<number | null>(null);
  const [practiceScore, setPracticeScore] = useState(0);

  const key = topicKey(chapterId, content.meta.id);
  const subjKey = foundationsSubjectKey(subjectId);

  const saveAttempt = useCallback(async (correct: boolean) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("question_attempts").insert({ user_id: user.id, subject: subjKey, topic: key, correct });
  }, [subjKey, key]);

  const orbitContext = useMemo(() => {
    const lines = [
      `Subject: ${subjectLabel}. Chapter: ${chapterTitle}. Topic: ${content.meta.title}.`,
      `Segment: ${segment}.`,
    ];
    if (segment === "practice") {
      const q = content.practice[practiceIndex];
      if (q) lines.push(`Current practice question: "${q.q}". Options: ${q.options.join(" / ")}.`);
      if (practiceSelected !== null && q) {
        const wasCorrect = practiceSelected === q.correct;
        lines.push(`Student answered ${wasCorrect ? "CORRECTLY" : "INCORRECTLY"}.`);
        if (!wasCorrect) lines.push(`Specific misconception feedback for their chosen answer: ${q.feedback[practiceSelected]}`);
      }
    }
    if (segment === "teachback") {
      lines.push(`Teach-back prompt given to student: "${content.teachBack.prompt}"`);
      lines.push(`Check the student's explanation covers: ${content.teachBack.checkFor.join("; ")}.`);
    }
    return lines.join("\n");
  }, [subjectLabel, chapterTitle, content, segment, practiceIndex, practiceSelected]);

  function next() {
    setSegmentIndex((i) => Math.min(i + 1, SEGMENT_ORDER.length - 1));
  }

  function handlePracticeSelect(i: number) {
    if (practiceSelected !== null) return;
    const q = content.practice[practiceIndex];
    const correct = i === q.correct;
    setPracticeSelected(i);
    if (correct) setPracticeScore((s) => s + 1);
    saveAttempt(correct);
  }

  function handlePracticeNext() {
    if (practiceIndex + 1 >= content.practice.length) {
      next();
    } else {
      setPracticeIndex((i) => i + 1);
      setPracticeSelected(null);
    }
  }

  const card: React.CSSProperties = {
    background: "var(--color-card)", border: "1px solid var(--color-border)",
    borderRadius: 20, padding: 24, boxShadow: "0 2px 12px rgba(28,24,18,0.06)",
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Segment progress */}
          <div className="flex items-center gap-2 mb-6">
            {SEGMENT_ORDER.slice(0, 5).map((s, i) => (
              <div key={s} className="flex-1">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
                  <div className="h-full rounded-full transition-all" style={{
                    width: i < segmentIndex ? "100%" : i === segmentIndex ? "50%" : "0%",
                    background: subjectColor,
                  }} />
                </div>
                <div className="text-[10px] mt-1 font-medium" style={{ color: i <= segmentIndex ? subjectColor : "var(--color-text3)" }}>
                  {SEGMENT_LABEL[s]}
                </div>
              </div>
            ))}
          </div>

          {content.placeholder && (
            <div className="rounded-xl px-4 py-3 mb-5 text-sm" style={{ background: "var(--color-amber-bg)", border: "1px solid rgba(212,134,10,0.25)", color: "var(--color-amber2)" }}>
              This topic&apos;s content hasn&apos;t been written yet — you&apos;re seeing the shell.
            </div>
          )}

          {/* STARTER */}
          {segment === "starter" && (
            <div style={card}>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: subjectColor }}>Recall</p>
              <p className="text-base font-medium mb-5" style={{ color: "var(--color-text)" }}>{content.starter.prompt}</p>
              <div className="grid gap-2.5">
                {content.starter.options.map((opt, i) => {
                  const chosen = starterChoice === i;
                  const showFeedback = starterChoice !== null;
                  return (
                    <button key={i} onClick={() => setStarterChoice(i)} disabled={showFeedback}
                      className="text-left rounded-xl px-4 py-3 text-sm transition-all"
                      style={{
                        background: showFeedback && opt.correct ? "var(--color-green-bg)" : showFeedback && chosen ? "var(--color-red-bg)" : "var(--color-bg)",
                        border: `1.5px solid ${showFeedback && opt.correct ? "#86efac" : showFeedback && chosen ? "#fca5a5" : "var(--color-border)"}`,
                        color: "var(--color-text)", cursor: showFeedback ? "default" : "pointer",
                      }}>
                      {opt.label}
                      {showFeedback && chosen && <div className="text-xs mt-1.5" style={{ color: "var(--color-text2)" }}>{opt.feedback}</div>}
                    </button>
                  );
                })}
              </div>
              {starterChoice !== null && (
                <button onClick={next} className="w-full mt-5 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: subjectColor, color: "#fff", border: "none", cursor: "pointer" }}>
                  Continue →
                </button>
              )}
            </div>
          )}

          {/* HOOK */}
          {segment === "hook" && (
            <div style={card}>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: subjectColor }}>Hook</p>
              <p className="text-base font-medium mb-5" style={{ color: "var(--color-text)" }}>{content.hook.prompt}</p>
              {content.hook.options ? (
                <div className="grid gap-2.5">
                  {content.hook.options.map((opt, i) => (
                    <button key={i} onClick={() => setHookChoice(i)} disabled={hookChoice !== null}
                      className="text-left rounded-xl px-4 py-3 text-sm transition-all"
                      style={{
                        background: hookChoice === i ? "var(--color-amber-bg)" : "var(--color-bg)",
                        border: `1.5px solid ${hookChoice === i ? "rgba(212,134,10,0.4)" : "var(--color-border)"}`,
                        color: "var(--color-text)", cursor: hookChoice !== null ? "default" : "pointer",
                      }}>
                      {opt}
                    </button>
                  ))}
                </div>
              ) : (
                <button onClick={() => setHookChoice(0)} className="text-sm px-4 py-2 rounded-xl"
                  style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", cursor: "pointer" }}>
                  Got it
                </button>
              )}
              {hookChoice !== null && content.hook.note && (
                <p className="text-sm mt-4 italic" style={{ color: "var(--color-text3)" }}>🪐 {content.hook.note}</p>
              )}
              {hookChoice !== null && (
                <button onClick={next} className="w-full mt-5 py-3 rounded-xl text-sm font-semibold"
                  style={{ background: subjectColor, color: "#fff", border: "none", cursor: "pointer" }}>
                  Continue →
                </button>
              )}
            </div>
          )}

          {/* TEACH */}
          {segment === "teach" && (
            <div style={card}>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: subjectColor }}>Teach</p>
              <div className="text-sm leading-relaxed space-y-3 mb-5" style={{ color: "var(--color-text2)", whiteSpace: "pre-wrap" }}>
                {content.teach.body}
              </div>

              {content.teach.diagram && (
                <div className="rounded-xl p-4 mb-5" style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
                  <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--color-text3)" }}>Diagram</div>
                  <p className="text-sm" style={{ color: "var(--color-text2)" }}>{content.teach.diagram.description}</p>
                  {content.teach.diagram.caption && (
                    <p className="text-xs mt-2 italic" style={{ color: "var(--color-text3)" }}>{content.teach.diagram.caption}</p>
                  )}
                </div>
              )}

              {content.teach.worked && (
                <div className="space-y-3 mb-2">
                  {content.teach.worked.map((stage, i) => {
                    const revealed = workedRevealed.has(i);
                    return (
                      <div key={i} className="rounded-xl p-4" style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}>
                        <div className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: subjectColor }}>{stage.label}</div>
                        <p className="text-sm font-medium mb-2" style={{ color: "var(--color-text)" }}>{stage.problem}</p>
                        {stage.steps.length > 0 && (
                          <ol className="text-sm space-y-1 list-decimal list-inside" style={{ color: "var(--color-text2)" }}>
                            {stage.steps.map((s, si) => (
                              <li key={si}>
                                {stage.blankIndices.includes(si) && !revealed ? "___" : s}
                              </li>
                            ))}
                          </ol>
                        )}
                        {(stage.blankIndices.length > 0 || stage.steps.length === 0) && (
                          <button onClick={() => setWorkedRevealed((prev) => new Set(prev).add(i))}
                            disabled={revealed}
                            className="text-xs font-semibold mt-2.5 px-3 py-1.5 rounded-lg disabled:opacity-40"
                            style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text2)", cursor: "pointer" }}>
                            {revealed ? "Revealed" : "Reveal answer"}
                          </button>
                        )}
                        {revealed && stage.answer && (
                          <p className="text-sm mt-2" style={{ color: "var(--color-green)" }}>{stage.answer}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              <button onClick={next} className="w-full mt-5 py-3 rounded-xl text-sm font-semibold"
                style={{ background: subjectColor, color: "#fff", border: "none", cursor: "pointer" }}>
                {content.practice.length > 0 ? "Start practice →" : "Continue →"}
              </button>
            </div>
          )}

          {/* PRACTICE */}
          {segment === "practice" && content.practice.length > 0 && (() => {
            const q = content.practice[practiceIndex];
            return (
              <div style={card}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold tracking-widest uppercase" style={{ color: subjectColor }}>Practice</p>
                  <span className="text-xs font-medium" style={{ color: "var(--color-text3)" }}>{practiceIndex + 1} / {content.practice.length}</span>
                </div>
                <p className="text-base font-medium mb-5" style={{ color: "var(--color-text)" }}>{q.q}</p>
                <div className="grid gap-2.5">
                  {q.options.map((opt, i) => {
                    const showFeedback = practiceSelected !== null;
                    const isCorrect = i === q.correct;
                    const isChosen = i === practiceSelected;
                    return (
                      <button key={i} onClick={() => handlePracticeSelect(i)} disabled={showFeedback}
                        className="text-left rounded-xl px-4 py-3 text-sm transition-all"
                        style={{
                          background: showFeedback && isCorrect ? "var(--color-green-bg)" : showFeedback && isChosen ? "var(--color-red-bg)" : "var(--color-bg)",
                          border: `1.5px solid ${showFeedback && isCorrect ? "#86efac" : showFeedback && isChosen ? "#fca5a5" : "var(--color-border)"}`,
                          color: "var(--color-text)", cursor: showFeedback ? "default" : "pointer",
                        }}>
                        {opt}
                        {showFeedback && isChosen && <div className="text-xs mt-1.5" style={{ color: "var(--color-text2)" }}>{q.feedback[i]}</div>}
                      </button>
                    );
                  })}
                </div>
                {practiceSelected !== null && (
                  <button onClick={handlePracticeNext} className="w-full mt-5 py-3 rounded-xl text-sm font-semibold"
                    style={{ background: subjectColor, color: "#fff", border: "none", cursor: "pointer" }}>
                    {practiceIndex + 1 < content.practice.length ? "Next question →" : "Continue to teach-back →"}
                  </button>
                )}
              </div>
            );
          })()}
          {segment === "practice" && content.practice.length === 0 && (
            <div style={card}>
              <p className="text-sm" style={{ color: "var(--color-text3)" }}>No practice questions yet for this topic.</p>
              <button onClick={next} className="w-full mt-5 py-3 rounded-xl text-sm font-semibold"
                style={{ background: subjectColor, color: "#fff", border: "none", cursor: "pointer" }}>Continue →</button>
            </div>
          )}

          {/* TEACHBACK */}
          {segment === "teachback" && (
            <div style={card}>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: subjectColor }}>Teach-back</p>
              <p className="text-sm mb-4" style={{ color: "var(--color-text2)" }}>Explain it to Orbit in the chat — Orbit will play confused on purpose.</p>
              <div className="rounded-xl overflow-hidden" style={{ height: 420, border: "1px solid var(--color-border)" }}>
                <OrbitChat context={orbitContext} welcomeMessage={content.teachBack.prompt} quickPrompts={[]} />
              </div>
              <button onClick={next} className="w-full mt-5 py-3 rounded-xl text-sm font-semibold"
                style={{ background: subjectColor, color: "#fff", border: "none", cursor: "pointer" }}>
                Finish session →
              </button>
            </div>
          )}

          {/* DONE */}
          {segment === "done" && (
            <div style={{ ...card, textAlign: "center" }}>
              <div className="text-4xl mb-3">{practiceScore === content.practice.length && content.practice.length > 0 ? "🏆" : "🪐"}</div>
              <h2 className="text-xl font-semibold mb-2" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
                {content.meta.title} — session complete
              </h2>
              {content.practice.length > 0 && (
                <p className="text-sm mb-3" style={{ color: "var(--color-text3)" }}>
                  Practice score: {practiceScore}/{content.practice.length}
                </p>
              )}
              {content.closingLine && <p className="text-sm mb-6" style={{ color: "var(--color-text2)" }}>{content.closingLine}</p>}
              <Link href={`/dashboard/foundations/${subjectId}/${chapterId}`}
                className="inline-block text-sm font-semibold px-6 py-2.5 rounded-xl no-underline"
                style={{ background: subjectColor, color: "#fff" }}>
                Back to {chapterTitle}
              </Link>
            </div>
          )}
        </div>
      </div>

      {segment !== "teachback" && (
        <div className="hidden lg:flex flex-col w-80 flex-shrink-0" style={{ borderLeft: "1px solid var(--color-border)" }}>
          <OrbitChat context={orbitContext} quickPrompts={[
            { icon: "💡", label: "Hint", text: "Give me a hint" },
            { icon: "❓", label: "Explain", text: "Can you explain that differently?" },
          ]} />
        </div>
      )}
    </div>
  );
}
