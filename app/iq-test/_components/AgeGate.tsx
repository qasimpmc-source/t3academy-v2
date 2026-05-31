"use client";

import { useState } from "react";
import type { AgeBand } from "../_lib/questions";

interface Props {
  onStart: (ageBand: AgeBand, name: string) => void;
}

const S = {
  bg: "#FDFBF7",
  gold: "#B87016",
  dark: "#1A1610",
  muted: "#7A6A52",
  border: "#D4B878",
  cardBg: "#FFFFFF",
  btnHover: "#9A5C0A",
};

const AGE_OPTIONS: { label: string; sublabel: string; band: AgeBand }[] = [
  { label: "Under 12", sublabel: "48 questions  |  ~18 minutes  |  6 domains", band: "child" },
  { label: "12 to 17", sublabel: "48 questions  |  ~18 minutes  |  6 domains", band: "child" },
  { label: "18 and over", sublabel: "26 questions  |  ~8 minutes  |  3 domains", band: "adult" },
];

export default function AgeGate({ onStart }: Props) {
  const [selected, setSelected] = useState<AgeBand | null>(null);
  const [name, setName] = useState("");

  function handleStart() {
    if (!selected) return;
    onStart(selected, name.trim());
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: S.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40, maxWidth: 560 }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: S.gold,
            marginBottom: 16,
            borderBottom: `2px solid ${S.gold}`,
            paddingBottom: 6,
          }}
        >
          T3 Academy
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(30px, 5vw, 44px)",
            fontWeight: 700,
            color: S.dark,
            margin: "0 0 14px",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
          }}
        >
          T3 Mind Score
        </h1>
        <p
          style={{
            fontSize: 16,
            color: S.muted,
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          A standardised cognitive ability test covering abstract reasoning,
          working memory, processing speed and more. Takes 8 to 18 minutes.
          Results include a full domain breakdown and a downloadable certificate.
        </p>
      </div>

      {/* Name input */}
      <div style={{ width: "100%", maxWidth: 480, marginBottom: 28 }}>
        <label
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: S.muted,
            marginBottom: 8,
          }}
        >
          Your name (optional)
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name for the certificate"
          maxLength={60}
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: 15,
            color: S.dark,
            background: S.cardBg,
            border: `1.5px solid ${S.border}`,
            borderRadius: 10,
            outline: "none",
            fontFamily: "Trebuchet MS, system-ui, sans-serif",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Age selection */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: S.muted,
            marginBottom: 12,
          }}
        >
          Select your age group
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {AGE_OPTIONS.map((opt) => {
            const isActive = selected === opt.band && opt.label !== "12 to 17"
              ? selected === "child"
              : selected === opt.band;
            // Proper check: each option gets its own isActive
            const active =
              selected !== null &&
              opt.band === selected &&
              // If adult selected, only the 18+ option highlights
              (opt.band === "adult"
                ? opt.label === "18 and over"
                : // If child selected, only highlight the one the user last clicked
                  false);
            void isActive;
            return (
              <button
                key={opt.label}
                onClick={() => setSelected(opt.band === "adult" ? "adult" : "child")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  background:
                    selected === opt.band ? "#FEF8EC" : S.cardBg,
                  border: `1.5px solid ${
                    selected === opt.band ? S.gold : S.border
                  }`,
                  borderRadius: 12,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.15s",
                  outline: "none",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 17,
                      fontWeight: 700,
                      color: S.dark,
                      marginBottom: 3,
                    }}
                  >
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 12, color: S.muted }}>{opt.sublabel}</div>
                </div>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `2px solid ${selected === opt.band ? S.gold : "#D4B878"}`,
                    background: selected === opt.band ? S.gold : "transparent",
                    flexShrink: 0,
                  }}
                />
              </button>
            );
            void active;
          })}
        </div>
      </div>

      {/* Instructions */}
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          background: "#FEF8EC",
          border: `1px solid ${S.border}`,
          borderRadius: 10,
          padding: "14px 18px",
          marginBottom: 28,
          fontSize: 13,
          color: S.muted,
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: S.dark }}>Before you start:</strong> Find a quiet place.
        Each question is timed individually. Do not refresh the page mid-test.
        Your results appear immediately and a certificate can be downloaded.
      </div>

      {/* Start button */}
      <button
        onClick={handleStart}
        disabled={!selected}
        style={{
          width: "100%",
          maxWidth: 480,
          padding: "16px",
          fontFamily: "Georgia, serif",
          fontSize: 17,
          fontWeight: 700,
          color: "#FDFBF7",
          background: selected ? S.gold : "#C9B895",
          border: "none",
          borderRadius: 12,
          cursor: selected ? "pointer" : "not-allowed",
          letterSpacing: "-0.01em",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => {
          if (selected) e.currentTarget.style.background = S.btnHover;
        }}
        onMouseLeave={(e) => {
          if (selected) e.currentTarget.style.background = S.gold;
        }}
      >
        Begin the T3 Mind Score Test
      </button>
    </div>
  );
}
