"use client";

import { useEffect, useRef, useState } from "react";
import type { Question, Answer } from "../_lib/questions";
import { DOMAIN_LABELS } from "../_lib/questions";

const S = {
  bg: "#FDFBF7",
  gold: "#B87016",
  dark: "#1A1610",
  muted: "#7A6A52",
  border: "#D4B878",
  cardBg: "#FFFFFF",
  correctBg: "#F0FAF0",
  correctBorder: "#4CAF50",
  wrongBg: "#FFF4F0",
  wrongBorder: "#E53935",
};

interface Props {
  question: Question;
  index: number;
  total: number;
  onAnswer: (answer: Answer) => void;
}

type FeedbackState = "idle" | "correct" | "wrong" | "timeout";

export default function QuestionView({ question, index, total, onAnswer }: Props) {
  const [timeLeft, setTimeLeft] = useState(question.timeLimit);
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");
  const startTimeRef = useRef<number>(Date.now());
  const advancedRef = useRef(false);

  // Reset on each new question
  useEffect(() => {
    setTimeLeft(question.timeLimit);
    setSelected(null);
    setFeedback("idle");
    startTimeRef.current = Date.now();
    advancedRef.current = false;
  }, [question.id, question.timeLimit]);

  // Countdown timer
  useEffect(() => {
    if (feedback !== "idle") return; // Stop ticking after answer
    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  });

  function handleTimeout() {
    if (advancedRef.current) return;
    advancedRef.current = true;
    setFeedback("timeout");
    const timeMs = Date.now() - startTimeRef.current;
    setTimeout(() => {
      onAnswer({
        questionId: question.id,
        domain: question.domain,
        correct: false,
        timeMs,
        skipped: true,
      });
    }, 900);
  }

  function handleSelect(optIndex: number) {
    if (feedback !== "idle" || advancedRef.current) return;
    advancedRef.current = true;
    const isCorrect = optIndex === question.correct;
    setSelected(optIndex);
    setFeedback(isCorrect ? "correct" : "wrong");
    const timeMs = Date.now() - startTimeRef.current;
    setTimeout(() => {
      onAnswer({
        questionId: question.id,
        domain: question.domain,
        correct: isCorrect,
        timeMs,
        skipped: false,
      });
    }, 1000);
  }

  const progress = ((index) / total) * 100;
  const timerPct = (timeLeft / question.timeLimit) * 100;
  const timerColor =
    timerPct > 50 ? S.gold : timerPct > 25 ? "#D4860A" : "#E53935";

  // SVG circle timer
  const R = 20;
  const circ = 2 * Math.PI * R;
  const strokeDash = (timerPct / 100) * circ;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: S.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          background: S.cardBg,
          borderBottom: `1px solid ${S.border}`,
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {/* Progress */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 12,
              color: S.muted,
              marginBottom: 5,
            }}
          >
            <span
              style={{
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: S.gold,
              }}
            >
              {DOMAIN_LABELS[question.domain]}
            </span>
            <span>
              {index + 1} / {total}
            </span>
          </div>
          <div
            style={{
              height: 5,
              background: "#EDE0C4",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: S.gold,
                borderRadius: 999,
                transition: "width 0.4s ease",
              }}
            />
          </div>
        </div>

        {/* Circular timer */}
        <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
          <svg width="52" height="52" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="26" cy="26" r={R} fill="none" stroke="#EDE0C4" strokeWidth={3} />
            <circle
              cx="26"
              cy="26"
              r={R}
              fill="none"
              stroke={timerColor}
              strokeWidth={3}
              strokeDasharray={`${strokeDash} ${circ}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dasharray 0.8s linear, stroke 0.3s" }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: 14,
              color: timerColor,
            }}
          >
            {timeLeft}
          </div>
        </div>
      </div>

      {/* Question body */}
      <div
        style={{
          flex: 1,
          maxWidth: 660,
          width: "100%",
          margin: "0 auto",
          padding: "36px 24px 40px",
        }}
      >
        {/* Timeout banner */}
        {feedback === "timeout" && (
          <div
            style={{
              background: S.wrongBg,
              border: `1px solid ${S.wrongBorder}`,
              borderRadius: 10,
              padding: "12px 16px",
              marginBottom: 20,
              fontSize: 14,
              color: "#C62828",
              fontWeight: 600,
            }}
          >
            Time up. Moving on...
          </div>
        )}

        {/* Question card */}
        <div
          style={{
            background: S.cardBg,
            border: `1.5px solid ${S.border}`,
            borderRadius: 16,
            padding: "28px 28px 24px",
            marginBottom: 20,
            boxShadow: "0 2px 12px rgba(26,22,16,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: S.gold,
              marginBottom: 14,
            }}
          >
            Question {index + 1}
          </div>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(16px, 2.5vw, 20px)",
              fontWeight: 400,
              color: S.dark,
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            {question.question}
          </p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {question.options.map((opt, i) => {
            const isChosen = selected === i;
            const isCorrect = i === question.correct;
            const showFeedback = feedback !== "idle";

            let bg = S.cardBg;
            let border = S.border;
            let textColor = S.dark;

            if (showFeedback) {
              if (isCorrect) {
                bg = S.correctBg;
                border = S.correctBorder;
                textColor = "#2E7D32";
              } else if (isChosen) {
                bg = S.wrongBg;
                border = S.wrongBorder;
                textColor = "#C62828";
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showFeedback}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "15px 18px",
                  background: bg,
                  border: `1.5px solid ${border}`,
                  borderRadius: 12,
                  cursor: showFeedback ? "default" : "pointer",
                  textAlign: "left",
                  fontSize: 15,
                  color: textColor,
                  fontFamily: "Trebuchet MS, system-ui, sans-serif",
                  transition: "border-color 0.1s, background 0.1s",
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!showFeedback) {
                    e.currentTarget.style.borderColor = S.gold;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showFeedback) {
                    e.currentTarget.style.borderColor = S.border;
                  }
                }}
              >
                {/* Letter badge */}
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 8,
                    background: showFeedback && isCorrect
                      ? "#C8E6C9"
                      : showFeedback && isChosen
                      ? "#FFCDD2"
                      : "#F5EDD8",
                    color: textColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {["A", "B", "C", "D"][i]}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {/* Correct answer explanation */}
        {feedback === "correct" && (
          <div
            style={{
              marginTop: 16,
              padding: "12px 16px",
              background: S.correctBg,
              border: `1px solid ${S.correctBorder}`,
              borderRadius: 10,
              fontSize: 14,
              color: "#2E7D32",
              fontWeight: 600,
            }}
          >
            Correct! Moving on...
          </div>
        )}
        {feedback === "wrong" && (
          <div
            style={{
              marginTop: 16,
              padding: "12px 16px",
              background: S.wrongBg,
              border: `1px solid ${S.wrongBorder}`,
              borderRadius: 10,
              fontSize: 14,
              color: "#C62828",
            }}
          >
            <strong>Incorrect.</strong> The correct answer was{" "}
            <strong>{["A", "B", "C", "D"][question.correct]}: {question.options[question.correct]}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
