"use client";

import { useState, useCallback } from "react";
import type { AgeBand, Answer } from "./_lib/questions";
import { buildSession } from "./_lib/questions";
import { calculateScore } from "./_lib/scoring";
import type { ScoreResult } from "./_lib/scoring";
import AgeGate from "./_components/AgeGate";
import QuestionView from "./_components/QuestionView";
import ResultsView from "./_components/ResultsView";

type Phase = "gate" | "quiz" | "results";

export default function IqTestPage() {
  const [phase, setPhase] = useState<Phase>("gate");
  const [ageBand, setAgeBand] = useState<AgeBand>("adult");
  const [candidateName, setCandidateName] = useState("");
  const [questions, setQuestions] = useState(() => buildSession("adult"));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<ScoreResult | null>(null);

  function handleStart(band: AgeBand, name: string) {
    const session = buildSession(band);
    setAgeBand(band);
    setCandidateName(name);
    setQuestions(session);
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setPhase("quiz");
    logStart(band); // fire-and-forget
  }

  const handleAnswer = useCallback(
    (answer: Answer) => {
      setAnswers((prev) => {
        const updated = [...prev, answer];
        const nextIndex = updated.length;
        if (nextIndex >= questions.length) {
          // All questions done — calculate result
          const scoreResult = calculateScore(updated, ageBand);
          setResult(scoreResult);
          setPhase("results");
          logResult(scoreResult); // fire-and-forget
        } else {
          setCurrentIndex(nextIndex);
        }
        return updated;
      });
    },
    [questions.length, ageBand]
  );

  function handleRetake() {
    setPhase("gate");
    setAnswers([]);
    setResult(null);
    setCurrentIndex(0);
  }

  if (phase === "gate") {
    return <AgeGate onStart={handleStart} />;
  }

  if (phase === "quiz") {
    return (
      <QuestionView
        question={questions[currentIndex]}
        index={currentIndex}
        total={questions.length}
        onAnswer={handleAnswer}
      />
    );
  }

  if (phase === "results" && result) {
    return (
      <ResultsView
        result={result}
        candidateName={candidateName}
        onRetake={handleRetake}
      />
    );
  }

  return null;
}

// ── Optional Supabase logging (non-blocking) ──────────────────────────────────

async function logStart(ageBand: AgeBand) {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
      return;
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.from("iq_test_sessions").insert({
      age_band: ageBand,
      started_at: new Date().toISOString(),
    });
  } catch {
    // Logging is optional — never block the test
  }
}

async function logResult(scoreResult: ScoreResult) {
  try {
    if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
      return;
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const domainScores = Object.fromEntries(
      scoreResult.domains.map((d) => [d.domain, d.iq])
    );
    await supabase.from("iq_test_results").insert({
      age_band: scoreResult.ageBand,
      composite_score: scoreResult.composite,
      score_band: scoreResult.band,
      domain_scores: domainScores,
      completed_at: new Date().toISOString(),
    });
  } catch {
    // Logging is optional — never block the test
  }
}
