import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

const STATS = [
  { value: "364", label: "exam questions" },
  { value: "26", label: "topics covered" },
  { value: "2", label: "AI tutors" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Subtle radial glow centered behind headline */}
      <div
        aria-hidden="true"
        className="pulse-glow pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[480px] w-[680px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(47,230,196,0.13) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-2xl text-center">

          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-line bg-accent-bg px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            GL Assessment 11 Plus prep
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-text sm:text-6xl md:text-7xl">
            Test. Teach.{" "}
            <span
              className="relative inline-block text-accent"
              style={{
                textShadow: "0 0 40px rgba(47,230,196,0.35)",
              }}
            >
              Test again.
            </span>
          </h1>

          {/* Body */}
          <p className="mx-auto mt-6 max-w-lg text-pretty text-lg leading-relaxed text-text2">
            Verified question banks, timed mock exams, and a trained AI tutor
            that teaches every topic — then tests it until it sticks.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-8 py-4 text-base font-semibold text-accent-ink transition-all hover:bg-accent2 hover:shadow-[0_0_28px_rgba(47,230,196,0.35)]"
            >
              Start free today
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#subjects"
              className="inline-flex items-center gap-2 rounded-xl border border-border2 bg-transparent px-8 py-4 text-base font-semibold text-text2 transition-all hover:border-accent-line hover:text-text"
            >
              Explore platform
            </Link>
          </div>

          {/* Stats row */}
          <div className="mt-12 flex items-center justify-center gap-0 divide-x divide-border2">
            {STATS.map(({ value, label }) => (
              <div key={label} className="px-8 text-center">
                <div
                  className="font-display text-2xl font-bold text-accent"
                  style={{ textShadow: "0 0 20px rgba(47,230,196,0.4)" }}
                >
                  {value}
                </div>
                <div className="mt-0.5 text-xs text-text3">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
