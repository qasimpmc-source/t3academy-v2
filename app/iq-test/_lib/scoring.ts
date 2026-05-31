import type { Answer, Domain, AgeBand } from "./questions";
import { ALL_DOMAINS_CHILD, ALL_DOMAINS_ADULT, DOMAIN_LABELS } from "./questions";

// ── IQ scale constants ─────────────────────────────────────────────────────────
const IQ_MEAN = 100;
const IQ_SD = 15;

// Domain weights (must sum to 1.0 per track)
const CHILD_WEIGHTS: Record<Domain, number> = {
  abstract: 0.30,
  workingMemory: 0.20,
  processingSpeed: 0.15,
  verbal: 0.18,
  numerical: 0.12,
  spatial: 0.05,
};

const ADULT_WEIGHTS: Record<Domain, number> = {
  abstract: 0.50,
  workingMemory: 0.30,
  processingSpeed: 0.20,
  verbal: 0,
  numerical: 0,
  spatial: 0,
};

// ── Maths helpers ──────────────────────────────────────────────────────────────

/** Rational approximation of inverse normal CDF (Abramowitz & Stegun).
 *  Accurate to ~4.5e-4 over the full range. */
function normInv(p: number): number {
  if (p <= 0) return -4;
  if (p >= 1) return 4;

  const a = [
    -3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2,
    1.38357751867269e2, -3.066479806614716e1, 2.506628277459239,
  ];
  const b = [
    -5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2,
    6.680131188771972e1, -1.328068155288572e1,
  ];
  const c = [
    -7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838,
    -2.549732539343734, 4.374664141464968, 2.938163982698783,
  ];
  const d = [
    7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996,
    3.754408661907416,
  ];

  const pLow = 0.02425;
  const pHigh = 1 - pLow;

  let q: number, r: number;
  if (p < pLow) {
    q = Math.sqrt(-2 * Math.log(p));
    return (
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  } else if (p <= pHigh) {
    q = p - 0.5;
    r = q * q;
    return (
      ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) *
        q) /
      (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
    );
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    return -(
      (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
      ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
    );
  }
}

/** Map a raw proportion (0-1) to an IQ score via sigmoid normalisation.
 *  At proportion 1.0 → ~134, at 0.5 → 100, at 0.0 → ~66.
 *  Steepness k=4.5 gives realistic spread. */
function proportionToIQ(proportion: number): number {
  // Sigmoid → percentile
  const k = 4.5;
  const percentile = 1 / (1 + Math.exp(-k * (proportion - 0.5)));
  // Clamp to avoid normInv edge cases
  const clamped = Math.max(0.005, Math.min(0.995, percentile));
  const iq = IQ_MEAN + IQ_SD * normInv(clamped);
  return Math.min(145, Math.max(70, Math.round(iq)));
}

// ── Per-domain scoring ─────────────────────────────────────────────────────────

export interface DomainResult {
  domain: Domain;
  label: string;
  correct: number;
  total: number;
  iq: number;        // domain-level IQ equivalent (70-145)
  pct: number;       // 0-100, percentage for chart
}

function scoreDomain(answers: Answer[], domain: Domain): DomainResult {
  const domainAnswers = answers.filter((a) => a.domain === domain);
  const total = domainAnswers.length;
  if (total === 0) {
    return { domain, label: DOMAIN_LABELS[domain], correct: 0, total: 0, iq: IQ_MEAN, pct: 50 };
  }

  const correct = domainAnswers.filter((a) => a.correct).length;
  let proportion = correct / total;

  // Processing speed bonus: reward fast correct answers
  if (domain === "processingSpeed") {
    const correctAnswers = domainAnswers.filter((a) => a.correct);
    if (correctAnswers.length > 0) {
      const avgTimeFraction =
        correctAnswers.reduce((sum, a) => sum + a.timeMs / (a.timeMs + 1), 0) /
        correctAnswers.length;
      // Faster answers get up to +0.08 bonus on the proportion
      const speedBonus = Math.max(0, 0.08 * (1 - avgTimeFraction));
      proportion = Math.min(1, proportion + speedBonus);
    }
  }

  const iq = proportionToIQ(proportion);
  // pct for radar chart: map IQ 70-145 to 10-100
  const pct = Math.round(((iq - 70) / 75) * 90 + 10);
  return { domain, label: DOMAIN_LABELS[domain], correct, total, iq, pct };
}

// ── Composite score ────────────────────────────────────────────────────────────

export interface ScoreResult {
  composite: number;       // The T3 Mind Score
  band: string;
  bandDescription: string;
  domains: DomainResult[];
  ageBand: AgeBand;
}

const BANDS: { min: number; label: string; description: string }[] = [
  { min: 130, label: "Exceptional", description: "Exceptionally high cognitive ability. Top 2% of the population." },
  { min: 115, label: "Above Average", description: "Above average cognitive ability. Top 16% of the population." },
  { min: 100, label: "High Average", description: "High average cognitive ability. Above the population midpoint." },
  { min: 85, label: "Average", description: "Average cognitive ability. Within the normal range." },
  { min: 0, label: "Below Average", description: "Below average. With practice and focus, scores improve significantly." },
];

export function calculateScore(answers: Answer[], ageBand: AgeBand): ScoreResult {
  const domains = ageBand === "adult" ? ALL_DOMAINS_ADULT : ALL_DOMAINS_CHILD;
  const weights = ageBand === "adult" ? ADULT_WEIGHTS : CHILD_WEIGHTS;

  const domainResults = domains.map((d) => scoreDomain(answers, d));

  let weightedSum = 0;
  let totalWeight = 0;
  for (const result of domainResults) {
    const w = weights[result.domain];
    weightedSum += result.iq * w;
    totalWeight += w;
  }

  const composite = Math.round(totalWeight > 0 ? weightedSum / totalWeight : IQ_MEAN);
  const bandEntry = BANDS.find((b) => composite >= b.min) ?? BANDS[BANDS.length - 1];

  return {
    composite,
    band: bandEntry.label,
    bandDescription: bandEntry.description,
    domains: domainResults,
    ageBand,
  };
}
