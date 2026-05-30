"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Question } from "@/lib/curriculum/questions";
import { createClient } from "@/lib/supabase/client";
import OllieChat from "@/app/dashboard/_components/OllieChat";

const LETTERS = ["A", "B", "C", "D", "E"];

const QUIZ_QUICK_PROMPTS = [
  { icon: "💡", label: "Hint", text: "Give me a hint for this question without giving the answer" },
  { icon: "❓", label: "Why wrong?", text: "I got a question wrong — can you help me understand why?" },
  { icon: "🧠", label: "Strategy", text: "What strategy should I use for this type of question?" },
  { icon: "⚠️", label: "Traps", text: "What are the common traps on questions like this?" },
];

interface Props {
  subject: string;
  topicKey: string;
  questions: Question[];
  subjectColor: string;
  subjectLabel: string;
  topicLabel: string;
}

type Phase = "question" | "feedback" | "results";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function QuizView({ subject, topicKey, questions, subjectColor, subjectLabel, topicLabel }: Props) {
  const router = useRouter();
  const SESSION_SIZE = Math.min(10, questions.length);
  const [session, setSession] = useState<Question[]>(() => shuffle(questions).slice(0, SESSION_SIZE));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("question");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ q: Question; chosen: number; correct: boolean }[]>([]);
  const [ollieOpen, setOllieOpen] = useState(false);

  const current = session[index];
  const progress = ((index) / SESSION_SIZE) * 100;

  // Build context string for Ollie based on current quiz state
  const ollieContext = useMemo(() => {
    const lines: string[] = [
      `Subject: ${subjectLabel}. Topic: ${topicLabel}. Mode: Quiz.`,
      `Progress: ${index + 1} of ${SESSION_SIZE} questions. Score so far: ${score} correct.`,
    ];

    if (phase !== "results" && current) {
      lines.push(`Current question: "${current.q.slice(0, 120)}${current.q.length > 120 ? "…" : ""}"`);
    }

    const wrong = results.filter(r => !r.correct);
    if (wrong.length > 0) {
      lines.push(`Questions the student got wrong so far: ${wrong.length}.`);
      lines.push(`Wrong question examples: ${wrong.slice(-2).map(r => `"${r.q.q.slice(0, 80)}"`).join("; ")}.`);
    }

    if (phase === "feedback" && selected !== null) {
      const wasCorrect = selected === current?.correct;
      lines.push(`The student just answered this question ${wasCorrect ? "CORRECTLY" : "INCORRECTLY"}.`);
      if (!wasCorrect && current) {
        lines.push(`They chose option ${LETTERS[selected]} but the correct answer was ${LETTERS[current.correct]}.`);
        lines.push(`Explanation: ${current.explanation}`);
      }
    }

    if (phase === "results") {
      const pct = Math.round((score / SESSION_SIZE) * 100);
      lines.push(`Quiz finished. Final score: ${score}/${SESSION_SIZE} (${pct}%).`);
      if (wrong.length > 0) {
        lines.push(`Weak areas based on wrong answers: ${wrong.map(r => r.q.q.slice(0, 60)).join("; ")}.`);
      } else {
        lines.push("The student got everything correct — excellent performance!");
      }
    }

    return lines.join("\n");
  }, [subjectLabel, topicLabel, index, SESSION_SIZE, score, phase, current, results, selected]);

  const ollieWelcome = useMemo(() => {
    if (index === 0 && phase === "question") {
      return `Hey! 👋 I'm Ollie — I'll be with you throughout this quiz. Got a question? Just ask. Let's go! 🦉`;
    }
    return undefined;
  }, [index, phase]);

  const saveAttempt = useCallback(async (correct: boolean) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("question_attempts").insert({
      user_id: user.id,
      subject,
      topic: topicKey,
      correct,
    });
  }, [subject, topicKey]);

  function handleSelect(optIndex: number) {
    if (phase !== "question") return;
    const correct = optIndex === current.correct;
    setSelected(optIndex);
    setPhase("feedback");
    if (correct) setScore(s => s + 1);
    setResults(r => [...r, { q: current, chosen: optIndex, correct }]);
    saveAttempt(correct);
  }

  function handleNext() {
    if (index + 1 >= SESSION_SIZE) {
      setPhase("results");
      router.refresh();
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setPhase("question");
    }
  }

  function handleRestart() {
    setSession(shuffle(questions).slice(0, SESSION_SIZE));
    setIndex(0);
    setSelected(null);
    setPhase("question");
    setScore(0);
    setResults([]);
  }

  if (phase === "results") {
    const pct = Math.round((score / SESSION_SIZE) * 100);
    const trophy = pct >= 90 ? "🏆" : pct >= 70 ? "🥈" : pct >= 50 ? "🥉" : "📋";
    return (
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-xl mx-auto px-6 py-10 text-center">
            <div className="text-5xl mb-4">{trophy}</div>
            <h2 className="text-2xl font-semibold mb-2 tracking-tight"
              style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>
              {pct >= 80 ? "Excellent work!" : pct >= 60 ? "Good effort!" : "Keep practising!"}
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--color-text3)" }}>
              {topicLabel} · {subjectLabel}
            </p>

            {/* Score cards */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: "Score", value: `${score}/${SESSION_SIZE}` },
                { label: "Accuracy", value: `${pct}%` },
                { label: "Status", value: pct >= 70 ? "Passed ✓" : "Try again" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-xl py-4"
                  style={{ background: "var(--color-card)", border: "1px solid var(--color-border)" }}>
                  <div className="text-xl font-semibold" style={{ fontFamily: "var(--font-serif)", color: "var(--color-text)" }}>{value}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--color-text3)" }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Wrong answers review */}
            {results.filter(r => !r.correct).length > 0 && (
              <div className="text-left mb-8">
                <div className="text-xs font-bold tracking-widest uppercase mb-3"
                  style={{ color: "var(--color-text3)" }}>Review — questions to revisit</div>
                <div className="space-y-3">
                  {results.filter(r => !r.correct).map((r, i) => (
                    <div key={i} className="rounded-xl px-4 py-3 text-sm text-left"
                      style={{ background: "var(--color-red-bg)", border: "1px solid rgba(185,28,28,0.15)" }}>
                      {r.q.passage && (
                        <div className="text-xs mb-1 font-semibold" style={{ color: "var(--color-amber)" }}>
                          {r.q.passage.title}
                        </div>
                      )}
                      <div className="font-medium mb-1" style={{ color: "var(--color-text)" }}>
                        {r.q.q.split("\n").map((line, i) => <span key={i}>{i > 0 ? " " : ""}{line}</span>)}
                      </div>
                      <div className="text-xs" style={{ color: "var(--color-text3)" }}>
                        You chose: <span style={{ color: "var(--color-red)" }}>{LETTERS[r.chosen]} — {r.q.options[r.chosen]?.replace(/<[^>]+>/g, "[shape]")}</span>
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "var(--color-green)" }}>
                        Correct: {LETTERS[r.q.correct]} — {r.q.options[r.q.correct]?.replace(/<[^>]+>/g, "[shape]")}
                      </div>
                      <div className="text-xs mt-1.5" style={{ color: "var(--color-text2)" }}>
                        {r.q.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 justify-center">
              <button onClick={handleRestart}
                className="text-sm font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2"
                style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text2)", cursor: "pointer" }}>
                🔄 Reset & retry
              </button>
              <Link href={`/dashboard/${subject}`}
                className="text-sm font-semibold px-6 py-2.5 rounded-xl no-underline transition-all"
                style={{ background: subjectColor, color: "#fff" }}>
                Back to {subjectLabel}
              </Link>
            </div>

            {/* Ask Ollie about results on mobile */}
            <button
              onClick={() => setOllieOpen(true)}
              className="mt-4 text-sm font-semibold px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 mx-auto lg:hidden"
              style={{ background: "var(--color-amber-bg)", border: "1px solid rgba(212,134,10,0.3)", color: "var(--color-amber)", cursor: "pointer" }}
            >
              🦉 Ask Ollie about your results
            </button>
          </div>
        </div>

        {/* Ollie side panel — results mode */}
        <div className="hidden lg:flex flex-col w-80 flex-shrink-0"
          style={{ borderLeft: "1px solid var(--color-border)" }}>
          <OllieChat
            context={ollieContext}
            welcomeMessage={`Quiz done! 🦉 You scored ${score}/${SESSION_SIZE} (${pct}%). ${pct >= 80 ? "Brilliant effort! Want to go over anything?" : "Let's look at where you can improve — what would you like to go over?"}`}
            quickPrompts={QUIZ_QUICK_PROMPTS}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Quiz content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-border)" }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%`, background: subjectColor }} />
            </div>
            <span className="text-xs font-medium flex-shrink-0" style={{ color: "var(--color-text3)" }}>
              {index + 1} / {SESSION_SIZE}
            </span>
            {/* Mobile Ollie toggle */}
            <button
              onClick={() => setOllieOpen(o => !o)}
              className="lg:hidden w-8 h-8 rounded-xl flex items-center justify-center text-base flex-shrink-0"
              style={{ background: "var(--color-amber-bg)", border: "1px solid rgba(212,134,10,0.3)", cursor: "pointer" }}
              title="Ask Ollie"
            >
              🦉
            </button>
          </div>

          {/* Passage */}
          {current.passage && (
            <div className="rounded-2xl p-5 mb-4"
              style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", boxShadow: "0 2px 12px rgba(28,24,18,0.06)" }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--color-text3)" }}>
                  Read the passage
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: "var(--color-amber-bg)", color: "var(--color-amber)" }}>
                  {current.passage.title}
                </span>
              </div>
              <div className="text-sm leading-relaxed max-h-52 overflow-y-auto pr-1"
                style={{ color: "var(--color-text2)", whiteSpace: "pre-wrap" }}>
                {current.passage.text}
              </div>
            </div>
          )}

          {/* Question card */}
          <div className="rounded-2xl p-6 mb-5"
            style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", boxShadow: "0 2px 12px rgba(28,24,18,0.06)" }}>

            {current.svgQ && (
              <div className="mb-5 overflow-x-auto rounded-xl p-3"
                style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
                dangerouslySetInnerHTML={{ __html: current.svgQ }} />
            )}

            <div className="text-base font-medium mb-6" style={{ color: "var(--color-text)", lineHeight: 1.6 }}>
              {current.q.split("\n").map((line, i) => (
                <p key={i} className={i > 0 ? "mt-2 font-normal italic" : ""} style={{ color: i > 0 ? "var(--color-text2)" : "var(--color-text)" }}>
                  {line}
                </p>
              ))}
            </div>

            <div className={`grid gap-2.5 ${current.isVisual ? "grid-cols-5" : "grid-cols-1"}`}>
              {current.options.map((opt, i) => {
                const isCorrect = i === current.correct;
                const isChosen = i === selected;
                const showFeedback = phase === "feedback";

                let bg = "var(--color-bg)";
                let border = "var(--color-border)";
                let color = "var(--color-text2)";

                if (showFeedback) {
                  if (isCorrect) { bg = "var(--color-green-bg)"; border = "#86efac"; color = "var(--color-green)"; }
                  else if (isChosen) { bg = "var(--color-red-bg)"; border = "#fca5a5"; color = "var(--color-red)"; }
                }

                return (
                  <button key={i} onClick={() => handleSelect(i)} disabled={phase === "feedback"}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-left transition-all disabled:cursor-default"
                    style={{ background: bg, border: `1.5px solid ${border}`, color, cursor: phase === "question" ? "pointer" : "default" }}
                    onMouseEnter={e => { if (phase === "question") e.currentTarget.style.borderColor = subjectColor; }}
                    onMouseLeave={e => { if (phase === "question") e.currentTarget.style.borderColor = "var(--color-border)"; }}>
                    {current.isVisual ? (
                      <span dangerouslySetInnerHTML={{ __html: opt }} />
                    ) : (
                      <>
                        <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                          style={{ background: showFeedback && isCorrect ? "#86efac" : showFeedback && isChosen ? "#fca5a5" : "var(--color-bg3)", color }}>
                          {LETTERS[i]}
                        </span>
                        {opt}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback panel */}
          {phase === "feedback" && (
            <div className="rounded-2xl px-5 py-4 mb-5"
              style={{
                background: selected === current.correct ? "var(--color-green-bg)" : "var(--color-red-bg)",
                border: `1px solid ${selected === current.correct ? "#86efac" : "#fca5a5"}`,
              }}>
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">{selected === current.correct ? "✅" : "❌"}</span>
                <div>
                  <div className="text-sm font-semibold mb-1"
                    style={{ color: selected === current.correct ? "var(--color-green)" : "var(--color-red)" }}>
                    {selected === current.correct ? "Correct!" : `Incorrect — the answer was ${LETTERS[current.correct]}`}
                  </div>
                  <p className="text-sm mb-1" style={{ color: "var(--color-text2)" }}>{current.explanation}</p>
                  <p className="text-xs italic" style={{ color: "var(--color-text3)" }}>
                    💡 Tip: {current.tip}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next button */}
          {phase === "feedback" && (
            <button onClick={handleNext}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
              style={{ background: subjectColor, color: "#fff", border: "none", cursor: "pointer" }}>
              {index + 1 < SESSION_SIZE ? "Next question →" : "See results →"}
            </button>
          )}
        </div>
      </div>

      {/* Ollie side panel — desktop */}
      <div className="hidden lg:flex flex-col w-80 flex-shrink-0"
        style={{ borderLeft: "1px solid var(--color-border)" }}>
        <OllieChat
          context={ollieContext}
          welcomeMessage={ollieWelcome}
          quickPrompts={QUIZ_QUICK_PROMPTS}
        />
      </div>

      {/* Ollie mobile overlay */}
      {ollieOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="flex-1" onClick={() => setOllieOpen(false)} />
          <div className="flex flex-col h-[70vh] rounded-t-2xl overflow-hidden"
            style={{ background: "var(--color-card)" }}>
            <div className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: "1px solid var(--color-border)" }}>
              <span className="text-sm font-semibold" style={{ color: "var(--color-text)" }}>Ask Ollie 🦉</span>
              <button onClick={() => setOllieOpen(false)}
                className="text-sm px-3 py-1 rounded-lg"
                style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text3)", cursor: "pointer" }}>
                Close
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <OllieChat
                context={ollieContext}
                welcomeMessage={ollieWelcome}
                quickPrompts={QUIZ_QUICK_PROMPTS}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
