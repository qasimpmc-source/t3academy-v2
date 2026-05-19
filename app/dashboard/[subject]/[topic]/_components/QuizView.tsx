"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import type { Question } from "@/lib/curriculum/questions";
import { createClient } from "@/lib/supabase/client";

const LETTERS = ["A", "B", "C", "D", "E"];

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
  const SESSION_SIZE = Math.min(10, questions.length);
  const [session] = useState<Question[]>(() => shuffle(questions).slice(0, SESSION_SIZE));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("question");
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ q: Question; chosen: number; correct: boolean }[]>([]);

  const current = session[index];
  const progress = ((index) / SESSION_SIZE) * 100;

  const saveAttempt = useCallback(async (correct: boolean) => {
    const supabase = createClient();
    await supabase.from("question_attempts").insert({
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
    } else {
      setIndex(i => i + 1);
      setSelected(null);
      setPhase("question");
    }
  }

  function handleRestart() {
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
                      You chose: <span style={{ color: "var(--color-red)" }}>{LETTERS[r.chosen]} — {r.q.options[r.chosen]?.replace(/<[^>]+>/g,"[shape]")}</span>
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--color-green)" }}>
                      Correct: {LETTERS[r.q.correct]} — {r.q.options[r.q.correct]?.replace(/<[^>]+>/g,"[shape]")}
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
              className="text-sm font-semibold px-6 py-2.5 rounded-xl transition-all"
              style={{ background: "var(--color-bg3)", border: "1px solid var(--color-border)", color: "var(--color-text2)", cursor: "pointer" }}>
              Try again
            </button>
            <Link href={`/dashboard/${subject}`}
              className="text-sm font-semibold px-6 py-2.5 rounded-xl no-underline transition-all"
              style={{ background: subjectColor, color: "#fff" }}>
              Back to {subjectLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
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
        </div>

        {/* Passage (comprehension questions) */}
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

          {/* Visual question (NVR) */}
          {current.svgQ && (
            <div className="mb-5 overflow-x-auto rounded-xl p-3"
              style={{ background: "var(--color-bg)", border: "1px solid var(--color-border)" }}
              dangerouslySetInnerHTML={{ __html: current.svgQ }} />
          )}

          {/* Question stem — splits on \n so instruction and example render on separate lines */}
          <div className="text-base font-medium mb-6" style={{ color: "var(--color-text)", lineHeight: 1.6 }}>
            {current.q.split("\n").map((line, i) => (
              <p key={i} className={i > 0 ? "mt-2 font-normal italic" : ""} style={{ color: i > 0 ? "var(--color-text2)" : "var(--color-text)" }}>
                {line}
              </p>
            ))}
          </div>

          {/* Options */}
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
  );
}
