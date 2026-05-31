"use client";

import { useState } from "react";
import type { ScoreResult } from "../_lib/scoring";
import RadarChart from "./RadarChart";

const S = {
  bg: "#FDFBF7",
  gold: "#B87016",
  dark: "#1A1610",
  muted: "#7A6A52",
  border: "#D4B878",
  cardBg: "#FFFFFF",
  goldBg: "#FEF8EC",
};

const BAND_DETAIL: Record<string, { color: string; bg: string; icon: string }> = {
  "Exceptional":    { color: "#6B21A8", bg: "#F5F0FF", icon: "🏆" },
  "Above Average":  { color: "#1A5E1A", bg: "#F0FAF0", icon: "⭐" },
  "High Average":   { color: "#B87016", bg: "#FEF8EC", icon: "✓" },
  "Average":        { color: "#1D4E8F", bg: "#EEF5FF", icon: "~" },
  "Below Average":  { color: "#7A3A1A", bg: "#FFF4F0", icon: "↑" },
};

interface Props {
  result: ScoreResult;
  candidateName: string;
  onRetake: () => void;
}

export default function ResultsView({ result, candidateName, onRetake }: Props) {
  const [downloading, setDownloading] = useState(false);

  const bandInfo = BAND_DETAIL[result.band] ?? BAND_DETAIL["Average"];
  const displayName = candidateName.trim() || "Anonymous";
  const totalCorrect = result.domains.reduce((s, d) => s + d.correct, 0);
  const totalQ = result.domains.reduce((s, d) => s + d.total, 0);
  const accuracy = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

  const radarSpokes = result.domains.map((d) => ({
    label: d.label,
    pct: d.pct,
  }));

  async function handleDownload() {
    setDownloading(true);
    try {
      const { generateCertificate } = await import("../_lib/certificate");
      await generateCertificate(result, candidateName);
    } catch (err) {
      console.error("Certificate generation failed:", err);
      alert("Sorry, the certificate could not be generated. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: S.bg,
        fontFamily: "Trebuchet MS, system-ui, sans-serif",
        padding: "40px 20px 60px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        {/* T3 Academy header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: S.gold,
              borderBottom: `2px solid ${S.gold}`,
              display: "inline-block",
              paddingBottom: 5,
              marginBottom: 4,
            }}
          >
            T3 Academy
          </div>
        </div>

        {/* Score card */}
        <div
          style={{
            background: S.cardBg,
            border: `2px solid ${S.border}`,
            borderRadius: 20,
            padding: "40px 32px 36px",
            textAlign: "center",
            marginBottom: 20,
            boxShadow: "0 4px 24px rgba(26,22,16,0.08)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Decorative gold corner lines */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              width: 32,
              height: 32,
              borderTop: `2px solid ${S.gold}`,
              borderLeft: `2px solid ${S.gold}`,
              borderRadius: "4px 0 0 0",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              width: 32,
              height: 32,
              borderTop: `2px solid ${S.gold}`,
              borderRight: `2px solid ${S.gold}`,
              borderRadius: "0 4px 0 0",
            }}
          />

          {/* Einstein image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/api/iq-test/einstein"
            alt="Albert Einstein"
            width={70}
            height={85}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              borderRadius: 8,
              border: `1.5px solid ${S.border}`,
              objectFit: "cover",
              opacity: 0.85,
            }}
          />

          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: S.muted,
              marginBottom: 8,
            }}
          >
            T3 Mind Score
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(72px, 14vw, 96px)",
              fontWeight: 700,
              color: S.gold,
              lineHeight: 1,
              marginBottom: 12,
              letterSpacing: "-0.03em",
            }}
          >
            {result.composite}
          </div>

          {/* Band badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 20px",
              background: bandInfo.bg,
              border: `1.5px solid ${bandInfo.color}30`,
              borderRadius: 999,
              marginBottom: 14,
            }}
          >
            <span style={{ fontSize: 16 }}>{bandInfo.icon}</span>
            <span
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                fontSize: 18,
                color: bandInfo.color,
              }}
            >
              {result.band} Intelligence
            </span>
          </div>

          <p style={{ fontSize: 14, color: S.muted, margin: "0 auto", maxWidth: 440, lineHeight: 1.6 }}>
            {result.bandDescription}
          </p>

          {displayName !== "Anonymous" && (
            <p
              style={{
                marginTop: 16,
                fontSize: 13,
                color: S.muted,
                fontStyle: "italic",
              }}
            >
              Result for: <strong style={{ color: S.dark }}>{displayName}</strong>
            </p>
          )}
        </div>

        {/* Quick stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 20,
          }}
        >
          {[
            { label: "Score", value: String(result.composite) },
            { label: "Accuracy", value: `${accuracy}%` },
            { label: "Questions", value: `${totalCorrect}/${totalQ}` },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                background: S.cardBg,
                border: `1.5px solid ${S.border}`,
                borderRadius: 14,
                padding: "18px 12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: S.dark,
                }}
              >
                {value}
              </div>
              <div style={{ fontSize: 11, color: S.muted, marginTop: 3, textTransform: "uppercase", letterSpacing: "0.07em" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Domain breakdown */}
        <div
          style={{
            background: S.cardBg,
            border: `1.5px solid ${S.border}`,
            borderRadius: 20,
            padding: "28px 28px 24px",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 20,
              fontWeight: 700,
              color: S.dark,
              margin: "0 0 24px",
            }}
          >
            Domain Breakdown
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              marginBottom: radarSpokes.length >= 3 ? 32 : 0,
            }}
          >
            {result.domains.map((d) => (
              <div key={d.domain}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 600, color: S.dark }}>
                    {d.label}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: S.gold,
                      fontFamily: "Georgia, serif",
                    }}
                  >
                    IQ {d.iq}
                    <span style={{ fontSize: 11, color: S.muted, fontFamily: "Trebuchet MS, sans-serif", fontWeight: 400 }}>
                      {" "}({d.correct}/{d.total} correct)
                    </span>
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: "#EDE0C4",
                    borderRadius: 999,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${d.pct}%`,
                      background: S.gold,
                      borderRadius: 999,
                      transition: "width 0.8s ease",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Radar chart */}
          {radarSpokes.length >= 3 && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <RadarChart spokes={radarSpokes} size={320} />
            </div>
          )}
        </div>

        {/* What your score means */}
        <div
          style={{
            background: S.goldBg,
            border: `1.5px solid ${S.border}`,
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 15,
              fontWeight: 700,
              color: S.dark,
              margin: "0 0 10px",
            }}
          >
            What does a T3 Mind Score of {result.composite} mean?
          </h3>
          <p style={{ fontSize: 13, color: S.muted, margin: 0, lineHeight: 1.7 }}>
            The T3 Mind Score uses the same scale as a standard IQ test: mean 100, standard deviation 15.
            A score of {result.composite} places you in the{" "}
            <strong style={{ color: S.dark }}>{result.band.toLowerCase()} intelligence</strong> range.
            This assessment covers {result.ageBand === "child" ? "six" : "three"} cognitive domains.
            Scores can improve with practice and may vary day to day.
          </p>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={handleDownload}
            disabled={downloading}
            style={{
              flex: 1,
              minWidth: 200,
              padding: "15px 20px",
              fontFamily: "Georgia, serif",
              fontSize: 15,
              fontWeight: 700,
              color: "#FDFBF7",
              background: downloading ? "#C9B895" : S.gold,
              border: "none",
              borderRadius: 12,
              cursor: downloading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            {downloading ? (
              "Generating PDF..."
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 12l-4.5-4.5 1.06-1.06L7 8.88V1h2v7.88l2.44-2.44L12.5 7.5 8 12z"/>
                  <rect x="2" y="13" width="12" height="2" rx="1"/>
                </svg>
                Download Certificate (PDF)
              </>
            )}
          </button>

          <button
            onClick={onRetake}
            style={{
              flex: 1,
              minWidth: 160,
              padding: "15px 20px",
              fontFamily: "Georgia, serif",
              fontSize: 15,
              fontWeight: 700,
              color: S.dark,
              background: S.cardBg,
              border: `1.5px solid ${S.border}`,
              borderRadius: 12,
              cursor: "pointer",
            }}
          >
            Retake the Test
          </button>
        </div>

        <p
          style={{
            textAlign: "center",
            marginTop: 32,
            fontSize: 12,
            color: S.muted,
          }}
        >
          T3 Academy &nbsp;|&nbsp; t3academy.co.uk &nbsp;|&nbsp; Test. Teach. Test again.
        </p>
      </div>
    </div>
  );
}
